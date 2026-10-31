'use client';

/**
 * PICK SEVERAL FROM A LONG LIST BY TYPING — genres, cities (Joe, 2026-10-16:
 * "all genres need to be as the venue search style. The check box full list
 * is too long."). The same keyboard as the public location box
 * (`components/site/CityPicker.tsx`): type to narrow, arrows to move, Enter to
 * pick, Escape to close. What is picked shows as chips, each with ×;
 * Backspace in an empty box removes the last one.
 *
 * Each pick is a hidden input named `name`, so a server action reads the
 * values with `formData.getAll(name)` exactly as it read the tick boxes.
 */
import { useId, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import type { Option } from './forms';

export function MultiPicker({
  id,
  name,
  label,
  options,
  defaultValue = [],
  hint,
  error,
  noun = { one: 'item', many: 'items' },
  placeholder = 'Type to search',
}: {
  id: string;
  name: string;
  label: string;
  options: Option[];
  defaultValue?: string[];
  hint?: string;
  error?: string | null;
  noun?: { one: string; many: string };
  placeholder?: string;
}) {
  const [picked, setPicked] = useState<string[]>(() =>
    defaultValue.filter((v) => options.some((o) => o.value === v)),
  );
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  const byValue = useMemo(() => new Map(options.map((o) => [o.value, o.label])), [options]);

  const matches = useMemo(() => {
    const q = text.trim().toLowerCase();
    return options.filter(
      (o) => !picked.includes(o.value) && (!q || o.label.toLowerCase().includes(q)),
    );
  }, [options, picked, text]);

  const pick = (v: string) => {
    setPicked((p) => [...p, v]);
    setText('');
    setActive(0);
    input.current?.focus();
  };
  const drop = (v: string) => {
    setPicked((p) => p.filter((x) => x !== v));
    input.current?.focus();
  };
  const said = `${picked.length} ${picked.length === 1 ? noun.one : noun.many} chosen`;
  const describedBy = [error ? `${id}-error` : hint ? `${id}-hint` : '', `${id}-count`]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="ak-field">
      <label htmlFor={id} className="ak-field__label">
        {label}
      </label>
      <div className="ak-picker" data-invalid={error ? 'true' : undefined}>
        {picked.length > 0 && (
          <ul className="ak-picker__chips" aria-label={`Chosen ${noun.many}`}>
            {picked.map((v) => (
              <li key={v} className="ak-picker__chip">
                {byValue.get(v)}
                <button
                  type="button"
                  aria-label={`Remove ${byValue.get(v)}`}
                  onClick={() => drop(v)}
                >
                  <X size={13} aria-hidden="true" />
                </button>
                <input type="hidden" name={name} value={v} />
              </li>
            ))}
          </ul>
        )}
        <div className="ak-control">
          <span className="ak-control__icon">
            <Search size={15} aria-hidden="true" />
          </span>
          <input
            ref={input}
            id={id}
            className="ak-input ak-input--icon"
            role="combobox"
            aria-expanded={open && matches.length > 0}
            aria-controls={listId}
            aria-activedescendant={open && matches[active] ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            autoComplete="off"
            placeholder={placeholder}
            value={text}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            onChange={(e) => {
              setText(e.target.value);
              setOpen(true);
              setActive(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setOpen(true);
                setActive((a) => Math.min(a + 1, matches.length - 1));
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === 'Enter') {
                // Never submits the form from here: Enter picks.
                e.preventDefault();
                if (open && matches[active]) pick(matches[active].value);
              } else if (e.key === 'Escape') {
                setOpen(false);
              } else if (e.key === 'Backspace' && !text && picked.length) {
                setPicked((p) => p.slice(0, -1));
              }
            }}
          />
        </div>
        {open && matches.length > 0 && (
          <ul id={listId} role="listbox" className="ak-picker__list" aria-label={label}>
            {matches.slice(0, 50).map((o, i) => (
              <li
                key={o.value}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                className={i === active ? 'ak-picker__opt ak-picker__opt--on' : 'ak-picker__opt'}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(o.value)}
              >
                {o.label}
              </li>
            ))}
          </ul>
        )}
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
      {/* Said aloud as picks change; also the visible count. */}
      <p id={`${id}-count`} className="ak-field__hint" role="status" aria-live="polite">
        {picked.length ? said : ''}
      </p>
    </div>
  );
}
