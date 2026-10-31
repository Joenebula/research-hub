/**
 * THE ADMIN KIT — form fields (D-075). Server-safe: plain inputs with names,
 * read by server actions from FormData.
 *
 * ONE SHAPE FOR EVERY FIELD (Joe: "every form field has to have borders …
 * all forms follow the same design"): a mono capital label above, the control
 * with a visible border, then the error OR the hint below. An error replaces
 * the hint, turns the border red, sets aria-invalid, and is what the control's
 * aria-describedby points at — so a screen reader hears it with the field.
 *
 * The `id` is required: the error summary links to it (design-pass step 2).
 */
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronDown } from 'lucide-react';

type FieldBits = {
  id: string;
  label: ReactNode;
  required?: boolean;
  hint?: ReactNode;
  error?: string | null;
};

function described(id: string, hint?: ReactNode, error?: string | null) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

/** The wrapper alone, for a control that is not one of the ones below. */
export function Field({
  id,
  label,
  required,
  hint,
  error,
  children,
}: FieldBits & { children: ReactNode }) {
  return (
    <div className="ak-field">
      <label htmlFor={id} className="ak-field__label">
        {label}
        {required && (
          <span className="ak-field__req" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="ak-field__error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="ak-field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  id,
  label,
  required,
  hint,
  error,
  icon: Icon,
  ...input
}: FieldBits & { icon?: LucideIcon } & Omit<ComponentPropsWithoutRef<'input'>, 'id'>) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <div className="ak-control">
        {Icon && (
          <span className="ak-control__icon">
            <Icon size={15} aria-hidden="true" />
          </span>
        )}
        <input
          id={id}
          className={Icon ? 'ak-input ak-input--icon' : 'ak-input'}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={described(id, hint, error)}
          {...input}
        />
      </div>
    </Field>
  );
}

export type Option = { value: string; label: string };

export function SelectField({
  id,
  label,
  required,
  hint,
  error,
  options,
  placeholder,
  ...select
}: FieldBits & {
  options: Option[];
  /** A first, empty choice ("Choose a venue…"). */
  placeholder?: string;
} & Omit<ComponentPropsWithoutRef<'select'>, 'id'>) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <div className="ak-control">
        <select
          id={id}
          className="ak-select"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={described(id, hint, error)}
          {...select}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="ak-select-chev">
          <ChevronDown size={15} aria-hidden="true" />
        </span>
      </div>
    </Field>
  );
}

export function TextareaField({
  id,
  label,
  required,
  hint,
  error,
  rows = 4,
  ...area
}: FieldBits & Omit<ComponentPropsWithoutRef<'textarea'>, 'id'>) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <textarea
        id={id}
        className="ak-textarea"
        rows={rows}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={described(id, hint, error)}
        {...area}
      />
    </Field>
  );
}

/** A file picker, bordered like every other field. */
export function FileField({
  id,
  label,
  required,
  hint,
  error,
  ...input
}: FieldBits & Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type'>) {
  return (
    <Field id={id} label={label} required={required} hint={hint} error={error}>
      <input
        id={id}
        type="file"
        className="ak-input"
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={described(id, hint, error)}
        {...input}
      />
    </Field>
  );
}

/** One tick box, with an optional line under its label. */
export function Checkbox({
  id,
  label,
  description,
  error,
  ...input
}: {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  error?: string | null;
} & Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type'>) {
  return (
    <div className="ak-field">
      <label className="ak-check" htmlFor={id}>
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : description ? `${id}-desc` : undefined}
          {...input}
        />
        <span className="ak-check__text">
          <span className="ak-check__label">{label}</span>
          {description && (
            <span id={`${id}-desc`} className="ak-check__desc">
              {description}
            </span>
          )}
        </span>
      </label>
      {error && (
        <p id={`${id}-error`} className="ak-field__error">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * A group of tick boxes or radios under one label: a fieldset, so the label is
 * read with every choice. `stack` puts them one under another.
 */
export function ChoiceGroup({
  id,
  label,
  required,
  hint,
  error,
  type,
  name,
  options,
  defaultValue,
  stack,
}: FieldBits & {
  type: 'radio' | 'checkbox';
  name: string;
  options: (Option & { description?: string })[];
  /** Radio: the value. Checkbox: the values ticked. */
  defaultValue?: string | string[];
  stack?: boolean;
}) {
  const on = (v: string) =>
    Array.isArray(defaultValue) ? defaultValue.includes(v) : defaultValue === v;
  return (
    <fieldset
      className="ak-field"
      id={id}
      aria-invalid={error ? true : undefined}
      aria-describedby={described(id, hint, error)}
    >
      <legend className="ak-field__label" style={{ marginBottom: 8 }}>
        {label}
        {required && (
          <span className="ak-field__req" aria-hidden="true">
            *
          </span>
        )}
      </legend>
      <div className={stack ? 'ak-choices ak-choices--stack' : 'ak-choices'}>
        {options.map((o) => (
          <label key={o.value} className="ak-check">
            <input
              type={type}
              name={name}
              value={o.value}
              defaultChecked={on(o.value)}
              aria-invalid={error ? true : undefined}
            />
            <span className="ak-check__text">
              <span className="ak-check__label">{o.label}</span>
              {o.description && <span className="ak-check__desc">{o.description}</span>}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p id={`${id}-error`} className="ak-field__error">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="ak-field__hint">
          {hint}
        </p>
      ) : null}
    </fieldset>
  );
}

/** An on/off switch: a checkbox with role="switch". */
export function Switch({
  id,
  label,
  ...input
}: { id: string; label: ReactNode } & Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'type'>) {
  return (
    <label className="ak-switch" htmlFor={id}>
      <input id={id} type="checkbox" role="switch" {...input} />
      <span>{label}</span>
    </label>
  );
}

/** Two fields side by side; one column on a phone. */
export function FieldRow({ children }: { children: ReactNode }) {
  return <div className="ak-fields--2">{children}</div>;
}
export function Fields({ children }: { children: ReactNode }) {
  return <div className="ak-fields">{children}</div>;
}
