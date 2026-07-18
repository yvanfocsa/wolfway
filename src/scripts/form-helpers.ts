// src/scripts/form-helpers.ts
import { attachUSLocationAutocomplete } from './us-locations';

/**
 * Smart Form Helpers for WolfWay Logistics
 * Provides:
 * 1. Complete US City & State Autocomplete (Offline dataset + Live API query)
 * 2. Email Domain Suggestions
 * 3. Live US Phone Number Auto-Formatter ((XXX) XXX-XXXX)
 */

const EMAIL_DOMAINS = [
  '@gmail.com',
  '@icloud.com',
  '@yahoo.com',
  '@outlook.com',
  '@hotmail.com',
  '@aol.com',
];

function initEmailDomainSuggestions() {
  const emailInputs = document.querySelectorAll<HTMLInputElement>('input[type="email"], input[name="email"], input[id*="email"]');
  emailInputs.forEach((input) => {
    const listId = `email-list-${Math.random().toString(36).substr(2, 5)}`;
    let datalist = document.getElementById(listId) as HTMLDataListElement | null;
    if (!datalist) {
      datalist = document.createElement('datalist');
      datalist.id = listId;
      document.body.appendChild(datalist);
    }

    input.setAttribute('list', listId);

    input.addEventListener('input', () => {
      const val = input.value;
      if (!val) {
        datalist!.innerHTML = '';
        return;
      }

      const atIndex = val.indexOf('@');
      const prefix = atIndex >= 0 ? val.substring(0, atIndex) : val;

      datalist!.innerHTML = '';
      if (prefix.length > 0) {
        EMAIL_DOMAINS.forEach((domain) => {
          const option = document.createElement('option');
          option.value = `${prefix}${domain}`;
          datalist!.appendChild(option);
        });
      }
    });
  });
}

function formatPhoneNumber(val: string): string {
  const digits = val.replace(/\D/g, '').substring(0, 10);
  if (digits.length === 0) return '';
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.substring(0, 3)}) ${digits.substring(3)}`;
  return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
}

function initPhoneFormatting() {
  const phoneInputs = document.querySelectorAll<HTMLInputElement>('input[type="tel"], input[name*="phone"], input[id*="phone"]');
  phoneInputs.forEach((input) => {
    input.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      const formatted = formatPhoneNumber(target.value);
      target.value = formatted;
    });
  });
}

export function initSmartFormHelpers() {
  attachUSLocationAutocomplete();
  initEmailDomainSuggestions();
  initPhoneFormatting();
}

// Auto-run on page load and view transitions
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initSmartFormHelpers);
  document.addEventListener('astro:page-load', initSmartFormHelpers);
}
