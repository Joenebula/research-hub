'use client';

/**
 * THE ADMIN KIT — interactive parts (D-075): the error summary, the delete
 * dialog, the list table, and the "saved" toast.
 */
import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronsUpDown,
  CircleCheck,
  OctagonAlert,
  Search,
  X,
} from 'lucide-react';
import { Button, IconButton } from './core';

/* ── Error summary ──────────────────────────────────────────────────────── */
export type FieldError = { id: string; message: string };

/**
 * At the top of a form after a refused save. Lists EVERY problem (not just
 * the first), each a link that moves focus to its field. Takes focus itself
 * when it appears, so it is read aloud and the page scrolls to it.
 *
 * `attempt` changes on every save, so pressing Save again with the same
 * problems still moves focus back here.
 */
export function ErrorSummary({ errors, attempt }: { errors: FieldError[]; attempt?: unknown }) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (errors.length) ref.current?.focus();
  }, [errors.length, attempt]);
  if (!errors.length) return null;
  return (
    <div ref={ref} tabIndex={-1} className="ak-errsum" role="alert" aria-labelledby={titleId}>
      <h2 id={titleId}>
        {errors.length === 1 ? 'There is a problem' : `There are ${errors.length} problems`}
      </h2>
      <ul>
        {errors.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              onClick={(ev) => {
                const el = document.getElementById(e.id);
                if (!el) return;
                ev.preventDefault();
                el.scrollIntoView({ block: 'center' });
                // A fieldset cannot take focus; its first control can.
                const target = el.matches('input,select,textarea,button')
                  ? el
                  : el.querySelector<HTMLElement>('input,select,textarea,button');
                target?.focus();
              }}
            >
              {e.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Confirm dialog (delete) ────────────────────────────────────────────── */
/**
 * Says what will be lost, and for the worst cases asks for the item's name to
 * be typed first. A native <dialog>: focus is trapped and Escape closes it.
 *
 * The confirm button is a SUBMIT of `formId` when given, so the delete runs
 * through the page's own server action.
 */
export function ConfirmDialog({
  trigger,
  title,
  description,
  consequences = [],
  confirmText,
  confirmLabel = 'Delete',
  formId,
  busy,
}: {
  trigger: (open: () => void) => ReactNode;
  title: string;
  description?: ReactNode;
  consequences?: string[];
  confirmText?: string;
  confirmLabel?: string;
  formId?: string;
  busy?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [typed, setTyped] = useState('');
  const titleId = useId();
  const inputId = useId();
  const ok = !confirmText || typed.trim() === confirmText;
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);
  const open = () => {
    setTyped('');
    setIsOpen(true);
  };
  const close = () => setIsOpen(false);
  return (
    <>
      {trigger(open)}
      <dialog
        ref={ref}
        className="ak-dialog"
        aria-labelledby={titleId}
        onClose={() => setIsOpen(false)}
      >
        <div className="ak-dialog__head">
          <h2 id={titleId} className="ak-dialog__title">
            {title}
          </h2>
          <span className="ak-dialog__close">
            <IconButton icon={X} label="Close" onClick={close} disabled={busy} />
          </span>
        </div>
        <div className="ak-dialog__body">
          {description && <p>{description}</p>}
          {consequences.length > 0 && (
            <ul className="ak-dialog__list">
              {consequences.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
          {confirmText && (
            <div className="ak-field">
              <label htmlFor={inputId} className="ak-dialog__confirm-label">
                Type <code>{confirmText}</code> to confirm
              </label>
              <input
                id={inputId}
                className="ak-input"
                value={typed}
                autoComplete="off"
                onChange={(e) => setTyped(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="ak-dialog__foot">
          <Button onClick={close} disabled={busy}>
            Cancel
          </Button>
          <Button
            variant="danger"
            type={formId ? 'submit' : 'button'}
            form={formId}
            // The submit goes first (the click's default); then the box closes,
            // and the page's own outcome region says what happened.
            onClick={formId ? () => requestAnimationFrame(close) : undefined}
            disabled={!ok}
            loading={busy}
          >
            {confirmLabel}
          </Button>
        </div>
      </dialog>
    </>
  );
}

/* ── List table ─────────────────────────────────────────────────────────── */
export type Column = {
  key: string;
  label: string;
  sortable?: boolean;
  align?: 'left' | 'right';
  /** The column that names the row (bold; first on a phone, without a label). */
  primary?: boolean;
};
export type Row = {
  id: string;
  /** What each cell shows. Built on the server. */
  cells: Record<string, ReactNode>;
  /** What each sortable column sorts by. */
  sort?: Record<string, string | number | null>;
  /** Everything the search box matches against, lower-cased. */
  text: string;
  /** Filter values, by filter key. */
  filters?: Record<string, string>;
};
export type Filter = {
  key: string;
  /** The first, "all" choice shown in the box ("All statuses", "Everyone"). */
  label: string;
  /**
   * What the box IS, for a screen reader ("Status"). Without it the box was
   * named by its "all" choice, so "Everyone" said nothing about what it does.
   */
  name: string;
  options: { value: string; label: string }[];
};

const PAGE = 25;

/**
 * The table that opens every list page: search, filter drop-downs, sort by
 * a column, 25 to a page, "1–25 of 128" and the arrows. Every row is in the
 * browser (admin lists are small), so the count is the real count — never a
 * capped page passed off as a total.
 */
export function DataTable({
  columns,
  rows,
  filters = [],
  searchLabel = 'Search',
  noun = { one: 'row', many: 'rows' },
  defaultSort,
  empty,
}: {
  columns: Column[];
  rows: Row[];
  filters?: Filter[];
  searchLabel?: string;
  noun?: { one: string; many: string };
  defaultSort?: { key: string; dir: 'asc' | 'desc' };
  /** Shown instead of the table when there are no rows at all. */
  empty?: ReactNode;
}) {
  const [q, setQ] = useState('');
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [sort, setSort] = useState(defaultSort);
  const [page, setPage] = useState(1);
  const searchId = useId();

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = rows.filter(
      (r) =>
        (!needle || r.text.includes(needle)) &&
        Object.entries(chosen).every(([k, v]) => !v || r.filters?.[k] === v),
    );
    if (sort) {
      const dir = sort.dir === 'asc' ? 1 : -1;
      out = [...out].sort((a, b) => {
        const x = a.sort?.[sort.key] ?? null;
        const y = b.sort?.[sort.key] ?? null;
        if (x === y) return 0;
        if (x === null) return 1;
        if (y === null) return -1;
        return x < y ? -dir : dir;
      });
    }
    return out;
  }, [rows, q, chosen, sort]);

  if (rows.length === 0 && empty) return <>{empty}</>;

  const pages = Math.max(1, Math.ceil(shown.length / PAGE));
  const at = Math.min(page, pages);
  const slice = shown.slice((at - 1) * PAGE, at * PAGE);
  const from = shown.length ? (at - 1) * PAGE + 1 : 0;
  const to = Math.min(at * PAGE, shown.length);
  const word = shown.length === 1 ? noun.one : noun.many;

  return (
    <>
      <div className="ak-toolbar">
        <div className="ak-toolbar__search">
          <label htmlFor={searchId} className="ak-sr">
            {searchLabel}
          </label>
          <div className="ak-control">
            <span className="ak-control__icon">
              <Search size={15} aria-hidden="true" />
            </span>
            <input
              id={searchId}
              type="search"
              className="ak-input ak-input--icon"
              placeholder={searchLabel}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
        {filters.map((f) => (
          <div key={f.key} className="ak-toolbar__filter">
            <label htmlFor={`${searchId}-${f.key}`} className="ak-sr">
              {f.name}
            </label>
            <div className="ak-control">
              <select
                id={`${searchId}-${f.key}`}
                className="ak-select"
                value={chosen[f.key] ?? ''}
                onChange={(e) => {
                  setChosen((c) => ({ ...c, [f.key]: e.target.value }));
                  setPage(1);
                }}
              >
                <option value="">{f.label}</option>
                {f.options.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="ak-select-chev">
                <ChevronDown size={15} aria-hidden="true" />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="ak-tablewrap">
        <table className="ak-table">
          <thead>
            <tr>
              {columns.map((c) => {
                const on = sort?.key === c.key;
                const Arrow = on ? (sort!.dir === 'asc' ? ChevronUp : ChevronDown) : ChevronsUpDown;
                return c.sortable ? (
                  <th
                    key={c.key}
                    scope="col"
                    aria-sort={on ? (sort!.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                    className={c.align === 'right' ? 'ak-table__num' : undefined}
                  >
                    <button
                      type="button"
                      className="ak-table__sort"
                      onClick={() =>
                        setSort((s) =>
                          s?.key === c.key
                            ? { key: c.key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
                            : { key: c.key, dir: 'asc' },
                        )
                      }
                    >
                      {c.label}
                      <Arrow size={12} aria-hidden="true" style={{ opacity: on ? 1 : 0.5 }} />
                    </button>
                  </th>
                ) : (
                  <th
                    key={c.key}
                    scope="col"
                    className={c.align === 'right' ? 'ak-table__num' : undefined}
                  >
                    {c.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {slice.length === 0 ? (
              <tr>
                <td className="ak-table__empty" colSpan={columns.length}>
                  Nothing matches. Try another search or filter.
                </td>
              </tr>
            ) : (
              slice.map((r) => (
                <tr key={r.id}>
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      data-label={c.label}
                      className={
                        [c.primary && 'ak-table__first', c.align === 'right' && 'ak-table__num']
                          .filter(Boolean)
                          .join(' ') || undefined
                      }
                    >
                      {r.cells[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="ak-pager">
        <span className="ak-pager__count" role="status">
          {shown.length === 0 ? `0 ${noun.many}` : `${from}–${to} of ${shown.length} ${word}`}
          {shown.length !== rows.length && ` (of ${rows.length})`}
        </span>
        <div className="ak-pager__nav">
          <IconButton
            icon={ChevronLeft}
            label="Previous page"
            size="sm"
            disabled={at <= 1}
            onClick={() => setPage(at - 1)}
          />
          <span>
            {at} / {pages}
          </span>
          <IconButton
            icon={ChevronRight}
            label="Next page"
            size="sm"
            disabled={at >= pages}
            onClick={() => setPage(at + 1)}
          />
        </div>
      </div>
    </>
  );
}

/** A row's name as the link to its edit page. */
export function RowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="ak-table__rowlink">
      {children}
    </Link>
  );
}

/* ── Toast ──────────────────────────────────────────────────────────────── */
/**
 * "Advert created", after a save sends the person back to the list. The page
 * passes the message (from `?done=`); it goes after 6 seconds or on ×.
 */
export function Toast({
  message,
  tone = 'success',
}: {
  message: string | null;
  tone?: 'success' | 'danger';
}) {
  // Hidden once dismissed or timed out — for THIS message; a new one shows.
  const [gone, setGone] = useState<string | null>(null);
  const shown = !!message && gone !== message;
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setGone(message), 6000);
    return () => clearTimeout(t);
  }, [message]);
  return (
    <div className="ak-toasts" role="status" aria-live="polite">
      {shown && message && (
        <div className={tone === 'danger' ? 'ak-toast ak-toast--danger' : 'ak-toast'}>
          <span className="ak-toast__icon">
            {tone === 'danger' ? (
              <OctagonAlert size={16} aria-hidden="true" />
            ) : (
              <CircleCheck size={16} aria-hidden="true" />
            )}
          </span>
          <span className="ak-toast__msg">{message}</span>
          <IconButton icon={X} label="Dismiss" size="sm" onClick={() => setGone(message)} />
        </div>
      )}
    </div>
  );
}
