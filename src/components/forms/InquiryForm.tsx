import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Info,
  Loader2,
} from 'lucide-react';
import { Field } from '../ui/Field';
import { buttonClasses } from '../ui/Button';
import { submitInquiry } from '../../lib/inquiry';
import type { InquiryResult } from '../../lib/inquiry';
import {
  budgetOptions,
  locationOptions,
  siteConfig,
} from '../../data/site';
import { cn } from '../../lib/utils';

type FormValues = {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  area: string;
  budget: string;
  message: string;
  consent: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  fullName: '',
  email: '',
  countryCode: '+971',
  phone: '',
  area: '',
  budget: '',
  message: '',
  consent: false,
};

const countryCodes = [
  { code: '+971', label: 'UAE +971' },
  { code: '+44', label: 'UK +44' },
  { code: '+1', label: 'US/CA +1' },
  { code: '+33', label: 'France +33' },
  { code: '+49', label: 'Germany +49' },
  { code: '+91', label: 'India +91' },
  { code: '+966', label: 'Saudi Arabia +966' },
  { code: '+974', label: 'Qatar +974' },
  { code: '+965', label: 'Kuwait +965' },
  { code: '+973', label: 'Bahrain +973' },
  { code: '+968', label: 'Oman +968' },
];

const inputClasses =
  'h-12 w-full border border-line bg-white px-3.5 text-sm text-charcoal placeholder:text-stone/40 transition-colors focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/30';

const inputErrorClasses =
  'border-red-300 focus:border-red-500 focus:ring-red-200';

const areaOptions = ['Not sure yet', ...locationOptions.slice(1)];
const formBudgetOptions = [
  'Not sure yet',
  ...budgetOptions.slice(1).map((option) => option.label),
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!/^[0-9\s\-()]{7,15}$/.test(values.phone)) {
    errors.phone = 'Enter a valid phone number (7–15 digits).';
  }

  if (!values.area) {
    errors.area = 'Please select an area of interest.';
  }

  if (!values.budget) {
    errors.budget = 'Please select a budget range.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Please share a little more detail (at least 10 characters).';
  }

  if (!values.consent) {
    errors.consent = 'Please confirm you agree to be contacted.';
  }

  return errors;
}

type FormSelectProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  error?: string;
};

function FormSelect({
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
}: FormSelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          inputClasses,
          'appearance-none pr-9',
          error && inputErrorClasses
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </div>
  );
}

export function InquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle'
  );
  const [result, setResult] = useState<InquiryResult | null>(null);

  const demoMode = !import.meta.env.VITE_INQUIRY_ENDPOINT?.trim();

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0];
      if (firstKey) {
        document.getElementById(firstKey)?.focus();
      }
      return;
    }

    setStatus('submitting');
    const response = await submitInquiry({ ...values });
    setResult(response);
    setStatus(response.ok ? 'success' : 'error');
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setResult(null);
    setStatus('idle');
  }

  if (status === 'success') {
    return (
      <div
        className="border border-line bg-ivory-50 p-6 shadow-soft sm:p-8 lg:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-champagne/15 text-champagne">
          <Check className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-serif text-3xl leading-tight text-charcoal">
          Thank you, {values.fullName.split(' ')[0]}.
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-stone">
          {result?.demo
            ? `This demo is not connected to an email service, so your inquiry has not been sent. To reach us directly, email ${siteConfig.email}.`
            : 'Your inquiry has been received. We will be in touch shortly.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className={buttonClasses('secondary', 'md', 'mt-6')}
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={status === 'submitting'}
      className="border border-line bg-ivory-50 p-6 shadow-soft sm:p-8 lg:p-10"
    >
      {demoMode ? (
        <div className="mb-6 flex items-start gap-3 border border-champagne/30 bg-champagne/[0.06] p-4 text-[11px] leading-relaxed text-stone">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
            aria-hidden="true"
          />
          <p>
            <span className="font-medium text-charcoal">Demo form.</span> This
            portfolio site is not connected to an email service, so submissions
            are not delivered. Connect{' '}
            <code className="rounded bg-ivory-200 px-1 py-0.5 text-[10px]">
              VITE_INQUIRY_ENDPOINT
            </code>{' '}
            to enable delivery.
          </p>
        </div>
      ) : null}

      {status === 'error' && result?.message ? (
        <div
          role="alert"
          className="mb-6 border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          {result.message}
        </div>
      ) : null}

      <fieldset
        disabled={status === 'submitting'}
        className="m-0 min-w-0 border-0 p-0"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="fullName" label="Full name" error={errors.fullName}>
            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              placeholder="Your full name"
              value={values.fullName}
              onChange={(event) => update('fullName', event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? 'fullName-error' : undefined
              }
              className={cn(
                inputClasses,
                errors.fullName && inputErrorClasses
              )}
            />
          </Field>

          <Field id="email" label="Email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(event) => update('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={cn(inputClasses, errors.email && inputErrorClasses)}
            />
          </Field>

          <Field
            id="phone"
            label="Phone number"
            error={errors.phone}
            className="sm:col-span-2"
          >
            <div className="flex gap-2">
              <select
                aria-label="Country code"
                value={values.countryCode}
                onChange={(event) => update('countryCode', event.target.value)}
                className="h-12 w-[112px] shrink-0 border border-line bg-white px-2 text-sm text-charcoal focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/30"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.label}
                  </option>
                ))}
              </select>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="50 123 4567"
                value={values.phone}
                onChange={(event) => update('phone', event.target.value)}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                className={cn(
                  inputClasses,
                  'w-full',
                  errors.phone && inputErrorClasses
                )}
              />
            </div>
          </Field>

          <Field id="area" label="Interested area" error={errors.area}>
            <FormSelect
              id="area"
              value={values.area}
              onChange={(value) => update('area', value)}
              options={areaOptions}
              placeholder="Select an area"
              error={errors.area}
            />
          </Field>

          <Field id="budget" label="Budget range" error={errors.budget}>
            <FormSelect
              id="budget"
              value={values.budget}
              onChange={(value) => update('budget', value)}
              options={formBudgetOptions}
              placeholder="Select a budget"
              error={errors.budget}
            />
          </Field>

          <Field
            id="message"
            label="Message"
            error={errors.message}
            className="sm:col-span-2"
          >
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Tell us about your plans, preferred areas, and timing."
              value={values.message}
              onChange={(event) => update('message', event.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={cn(
                'min-h-[120px] w-full resize-y border border-line bg-white px-3.5 py-3 text-sm text-charcoal placeholder:text-stone/40 transition-colors focus:border-champagne focus:outline-none focus:ring-1 focus:ring-champagne/30',
                errors.message && inputErrorClasses
              )}
            />
          </Field>

          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 text-[11px] leading-relaxed text-stone">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                checked={values.consent}
                onChange={(event) => update('consent', event.target.checked)}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? 'consent-error' : undefined}
                className="mt-0.5 h-4 w-4 shrink-0 accent-charcoal"
              />
              <span>
                I agree to be contacted by Maniesta Real Estate about my inquiry.
              </span>
            </label>
            {errors.consent ? (
              <p id="consent-error" className="mt-1 text-[11px] text-red-700" role="alert">
                {errors.consent}
              </p>
            ) : null}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === 'submitting'}
              className={buttonClasses('primary', 'lg', 'w-full')}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending inquiry…
                </>
              ) : (
                <>
                  Request a consultation
                  <ArrowRight
                    className="h-4 w-4"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </>
              )}
            </button>
          </div>
        </div>
      </fieldset>
    </form>
  );
}