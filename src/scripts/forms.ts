/**
 * Client-side form validation utility.
 * Validates required fields, email format, and phone format.
 * Integrates anti-spam protection (honeypot, timing, JS token, rate limiting).
 * Shows success/error state on submit.
 */
import { initAntiSpam, validateAntiSpam, recordSubmission } from './anti-spam';

function getFieldError(
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
): Element | null {
  const describedBy = input.getAttribute('aria-describedby')?.split(/\s+/) ?? [];
  const linkedError = describedBy
    .map((id) => document.getElementById(id))
    .find((el) => el?.classList.contains('form-error'));

  return linkedError
    ?? input.parentElement?.querySelector('.form-error')
    ?? input.closest('div')?.querySelector('.form-error')
    ?? null;
}

function setFieldInvalid(
  input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  isInvalid: boolean
): void {
  input.classList.toggle('border-red-500', isInvalid);
  input.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
  getFieldError(input)?.classList.toggle('hidden', !isInvalid);
}

export function validateForm(
  form: HTMLFormElement,
  successId: string,
  errorId: string
): void {
  if (form.dataset.validationBound === 'true') return;
  form.dataset.validationBound = 'true';

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
    form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[aria-invalid]').forEach((input) => {
      input.setAttribute('aria-invalid', 'false');
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
    const invalidFields: HTMLElement[] = [];

    requiredInputs.forEach((input) => {
      // Handle radio buttons
      if (input instanceof HTMLInputElement && input.type === 'radio') {
        const name = input.name;
        const checked = form.querySelector<HTMLInputElement>(
          `input[name="${name}"]:checked`
        );
        if (!checked) {
          isValid = false;
          invalidFields.push(input);
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
          invalidFields.push(input);
          input.setAttribute('aria-invalid', 'true');
          const wrapper = input.closest('div')?.parentElement;
          const error = getFieldError(input) ?? wrapper?.querySelector('.form-error');
          error?.classList.remove('hidden');
        }
        return;
      }

      const value = input.value.trim();

      if (!value) {
        isValid = false;
        invalidFields.push(input);
        setFieldInvalid(input, true);
        return;
      }

      // Email validation
      if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          invalidFields.push(input);
          setFieldInvalid(input, true);
        }
      }

      // Phone validation
      if (input.type === 'tel' && value) {
        const phoneRegex = /^[+]?[\d\s().-]{7,}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          invalidFields.push(input);
          setFieldInvalid(input, true);
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
      invalidFields[0]?.focus();
    }
  });

  // Clear error on input
  form.addEventListener('input', (e) => {
    const target = e.target as HTMLElement;
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement) {
      target.classList.remove('border-red-500');
      target.setAttribute('aria-invalid', 'false');
      getFieldError(target)?.classList.add('hidden');
    }
  });
}
