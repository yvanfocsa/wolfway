/**
 * Anti-Spam Protection Suite for WolfWay Logistics LLC
 * Multiple client-side layers to block automated form submissions.
 * Designed to work alongside Cloudflare Turnstile (to be added later).
 */

// --- LAYER 1: HONEYPOT ---
export const HONEYPOT_FIELD_NAME = 'website_url';

// --- LAYER 2: TIMESTAMP VALIDATION ---
const MIN_FILL_TIME_MS = 3000;
const TIMESTAMP_FIELD_NAME = '_form_loaded_at';

// --- LAYER 3: JS CHALLENGE TOKEN ---
const TOKEN_FIELD_NAME = '_sec_token';

// --- LAYER 4: RATE LIMITING ---
const RATE_LIMIT_KEY = 'ww_form_submissions';
const MAX_SUBMISSIONS_PER_HOUR = 5;

export function initAntiSpam(form: HTMLFormElement): void {
  const honeypot = document.createElement('input');
  honeypot.type = 'text';
  honeypot.name = HONEYPOT_FIELD_NAME;
  honeypot.id = `hp_${form.id}`;
  honeypot.setAttribute('autocomplete', 'off');
  honeypot.setAttribute('tabindex', '-1');
  honeypot.setAttribute('aria-hidden', 'true');
  honeypot.style.cssText = 'position:absolute;left:-9999px;top:-9999px;height:0;width:0;overflow:hidden;opacity:0;pointer-events:none;';
  form.appendChild(honeypot);

  const timestampField = document.createElement('input');
  timestampField.type = 'hidden';
  timestampField.name = TIMESTAMP_FIELD_NAME;
  timestampField.value = Date.now().toString();
  form.appendChild(timestampField);

  const tokenField = document.createElement('input');
  tokenField.type = 'hidden';
  tokenField.name = TOKEN_FIELD_NAME;
  const rawToken = `ww_${form.id}_${timestampField.value}_wolfway2024`;
  tokenField.value = btoa(rawToken);
  form.appendChild(tokenField);
}

export function validateAntiSpam(form: HTMLFormElement): { valid: boolean; reason?: string } {
  const honeypot = form.querySelector<HTMLInputElement>(`[name="${HONEYPOT_FIELD_NAME}"]`);
  if (honeypot && honeypot.value.trim() !== '') {
    return { valid: false, reason: 'spam_honeypot' };
  }

  const timestampField = form.querySelector<HTMLInputElement>(`[name="${TIMESTAMP_FIELD_NAME}"]`);
  if (timestampField) {
    const loadedAt = parseInt(timestampField.value, 10);
    const elapsed = Date.now() - loadedAt;
    if (elapsed < MIN_FILL_TIME_MS) {
      return { valid: false, reason: 'spam_too_fast' };
    }
  }

  const tokenField = form.querySelector<HTMLInputElement>(`[name="${TOKEN_FIELD_NAME}"]`);
  if (!tokenField || !tokenField.value) {
    return { valid: false, reason: 'spam_no_token' };
  }
  try {
    const decoded = atob(tokenField.value);
    if (!decoded.startsWith('ww_') || !decoded.includes('wolfway2024')) {
      return { valid: false, reason: 'spam_invalid_token' };
    }
  } catch {
    return { valid: false, reason: 'spam_token_decode' };
  }

  try {
    const now = Date.now();
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const submissions: number[] = stored ? JSON.parse(stored) : [];
    const recentSubmissions = submissions.filter((t: number) => now - t < 3600000);
    if (recentSubmissions.length >= MAX_SUBMISSIONS_PER_HOUR) {
      return { valid: false, reason: 'spam_rate_limit' };
    }
  } catch {
    // localStorage unavailable
  }

  return { valid: true };
}

export function recordSubmission(): void {
  try {
    const now = Date.now();
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const submissions: number[] = stored ? JSON.parse(stored) : [];
    submissions.push(now);
    const recent = submissions.filter((t: number) => now - t < 3600000);
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
  } catch {
    // localStorage unavailable
  }
}
