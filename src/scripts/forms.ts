/**
 * Client-side form validation utility.
 * Validates required fields, email format, and phone format.
 * Integrates anti-spam protection (honeypot, timing, JS token, rate limiting).
 * Shows success/error state on submit.
 */
import { initAntiSpam, validateAntiSpam, recordSubmission } from './anti-spam';

export function validateForm(
  form: HTMLFormElement,
  successId: string,
  errorId: string
): void {
  // Initialize anti-spam protections on this form
  initAntiSpam(form);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const successEl = document.getElementById(successId);
    const errorEl = document.getElementById(errorId);

    // Reset states
    successEl?.classList.add('hidden');
    errorEl?.classList.add('hidden');
    form.querySelectorAll('.form-error').forEach((el) => el.classList.add('hidden'));
    form.querySelectorAll('.border-red-500').forEach((el) => {
      el.classList.remove('border-red-500');
    });

    // --- ANTI-SPAM CHECK (runs before field validation) ---
    const spamCheck = validateAntiSpam(form);
    if (!spamCheck.valid) {
      // Silently block spam: show generic error, do not reveal reason
      if (errorEl) {
        const errorText = errorEl.querySelector('p');
        if (errorText) {
          errorText.textContent = 'Unable to process your submission. Please try again in a moment.';
        }
        errorEl.classList.remove('hidden');
      }
      return;
    }

    let isValid = true;

    // Validate required fields
    const requiredInputs = form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      '[required]'
    );

    requiredInputs.forEach((input) => {
      // Handle radio buttons
      if (input instanceof HTMLInputElement && input.type === 'radio') {
        const name = input.name;
        const checked = form.querySelector<HTMLInputElement>(
          `input[name="${name}"]:checked`
        );
        if (!checked) {
          isValid = false;
          const fieldset = input.closest('fieldset');
          const error = fieldset?.querySelector('.form-error');
          error?.classList.remove('hidden');
        }
        return;
      }

      // Handle checkboxes
      if (input instanceof HTMLInputElement && input.type === 'checkbox') {
        if (!input.checked) {
          isValid = false;
          const wrapper = input.closest('div')?.parentElement;
          const error = wrapper?.querySelector('.form-error');
          error?.classList.remove('hidden');
        }
        return;
      }

      const value = input.value.trim();

      if (!value) {
        isValid = false;
        input.classList.add('border-red-500');
        const error = input.parentElement?.querySelector('.form-error');
        error?.classList.remove('hidden');
        return;
      }

      // Email validation
      if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          input.classList.add('border-red-500');
          const error = input.parentElement?.querySelector('.form-error');
          error?.classList.remove('hidden');
        }
      }

      // Phone validation
      if (input.type === 'tel' && value) {
        const phoneRegex = /^[+]?[\d\s().-]{7,}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          input.classList.add('border-red-500');
          const error = input.parentElement?.querySelector('.form-error');
          error?.classList.remove('hidden');
        }
      }
    });

    if (isValid) {
      // Record submission for rate limiting
      recordSubmission();
      successEl?.classList.remove('hidden');
      form.reset();
      successEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      errorEl?.classList.remove('hidden');
      const firstError = form.querySelector('.border-red-500') as HTMLElement | null;
      firstError?.focus();
    }
  });

  // Clear error on input
  form.addEventListener('input', (e) => {
    const target = e.target as HTMLElement;
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) {
      target.classList.remove('border-red-500');
      const error = target.parentElement?.querySelector('.form-error');
      error?.classList.add('hidden');
    }
  });
}
