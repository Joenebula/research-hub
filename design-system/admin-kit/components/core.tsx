/**
 * THE ADMIN KIT — core parts (D-075). Styles: `app/admin/admin-kit.css`.
 *
 * Ported from Joe's App Admin design (PeopleFirstAdminDesignSystem): same
 * props, same sizes, but as CSS classes rather than inline styles, so every
 * part here renders on the server. Interactive parts live in `client.tsx`.
 */
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { CircleCheck, Info, OctagonAlert, TriangleAlert, Inbox, ChevronRight } from 'lucide-react';

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ');

/* ── Button ─────────────────────────────────────────────────────────────── */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonLook = {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  loading?: boolean;
  block?: boolean;
};
function btnClass({ variant = 'secondary', size = 'md', block }: ButtonLook, extra?: string) {
  return cx(
    'ak-btn',
    variant !== 'secondary' && `ak-btn--${variant}`,
    size !== 'md' && `ak-btn--${size}`,
    block && 'ak-btn--block',
    extra,
  );
}

export function Button({
  variant,
  size,
  icon: Icon,
  loading,
  block,
  className,
  children,
  disabled,
  type = 'button',
  onClick,
  ...rest
}: ButtonLook & ComponentPropsWithoutRef<'button'>) {
  // Working, but still focusable: `disabled` would blur it and drop a keyboard
  // user's place on every Save (WCAG 2.4.3; preflight item 27, carried over
  // from the old Button — Joe, 2026-10-16: "yes"). Extra clicks, and Enter in
  // the form (which clicks the default button), are swallowed instead, so a
  // double click still sends one request.
  const busy = !!loading && !disabled;
  return (
    <button
      type={type}
      className={btnClass({ variant, size, block }, className)}
      disabled={disabled}
      aria-disabled={busy || undefined}
      aria-busy={loading || undefined}
      // ⚠ ONLY WHEN NEEDED. This file also renders on the server, and a page
      // drawn there cannot carry a function: an always-on handler crashed the
      // audit log, the first server page with a plain submit Button.
      onClick={
        busy || onClick
          ? (e) => {
              if (busy) {
                e.preventDefault();
                return;
              }
              onClick?.(e);
            }
          : undefined
      }
      {...rest}
    >
      {loading ? (
        <span className="ak-spin" aria-hidden="true" />
      ) : (
        Icon && <Icon size={size === 'lg' ? 16 : 14} aria-hidden="true" />
      )}
      {children}
    </button>
  );
}

/** A link that looks like a button: "New advert", "Cancel". */
export function ButtonLink({
  variant,
  size,
  icon: Icon,
  block,
  className,
  children,
  href,
  ...rest
}: ButtonLook & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  return (
    <Link href={href} className={btnClass({ variant, size, block }, className)} {...rest}>
      {Icon && <Icon size={size === 'lg' ? 16 : 14} aria-hidden="true" />}
      {children}
    </Link>
  );
}

/**
 * Link tabs (Joe, 2026-10-19 — preflight D1). `line` says which SCREEN of a
 * section is open; `pill` is a small choice inside a screen (a window, a
 * breakdown). Links, not buttons: each choice is an address. The chosen one
 * carries `aria-current` — "page" for a screen, "true" for a choice inside one
 * (only one "current page" per screen) — and a non-colour cue in the CSS.
 */
export type LinkTab = { href: string; label: ReactNode; current: boolean };
export function LinkTabs({
  label,
  items,
  variant = 'line',
}: {
  /** Names the group for a screen reader, e.g. "Insights screens". */
  label: string;
  items: LinkTab[];
  variant?: 'line' | 'pill';
}) {
  const list = variant === 'line' ? 'ak-tabs' : 'ak-pills';
  return (
    <nav aria-label={label}>
      <ul className={list}>
        {items.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className={`${list}__link`}
              aria-current={t.current ? (variant === 'line' ? 'page' : 'true') : undefined}
            >
              {t.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Icon only. `label` is required: it is the only name a screen reader gets. */
export function IconButton({
  icon: Icon,
  label,
  size = 'md',
  outline,
  className,
  type = 'button',
  ...rest
}: {
  icon: LucideIcon;
  label: string;
  size?: 'sm' | 'md';
  outline?: boolean;
} & ComponentPropsWithoutRef<'button'>) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cx(
        'ak-iconbtn',
        size === 'sm' && 'ak-iconbtn--sm',
        outline && 'ak-iconbtn--outline',
        className,
      )}
      {...rest}
    >
      <Icon size={size === 'sm' ? 14 : 16} aria-hidden="true" />
    </button>
  );
}

/* ── Badge (status pill), Tag ───────────────────────────────────────────── */
export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
export function Badge({
  tone = 'neutral',
  dot,
  children,
}: {
  tone?: Tone;
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <span className={cx('ak-badge', tone !== 'neutral' && `ak-badge--${tone}`)}>
      {dot && <i className="ak-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
export function Tag({ children }: { children: ReactNode }) {
  return <span className="ak-tag">{children}</span>;
}

/* ── Card, StatCard ─────────────────────────────────────────────────────── */
export function Card({
  title,
  subtitle,
  actions,
  footer,
  padding = 'md',
  headingLevel = 2,
  children,
  className,
  id,
}: {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  padding?: 'md' | 'tight' | 'none';
  headingLevel?: 2 | 3;
  children?: ReactNode;
  className?: string;
  id?: string;
}) {
  const H = headingLevel === 3 ? 'h3' : 'h2';
  return (
    <section className={cx('ak-card', className)} id={id}>
      {(title || actions) && (
        <header className="ak-card__head">
          <div style={{ minWidth: 0 }}>
            {title && <H className="ak-card__title">{title}</H>}
            {subtitle && <p className="ak-card__sub">{subtitle}</p>}
          </div>
          {actions && <div className="ak-card__actions">{actions}</div>}
        </header>
      )}
      <div className={cx('ak-card__body', padding !== 'md' && `ak-card__body--${padding}`)}>
        {children}
      </div>
      {footer && <footer className="ak-card__foot">{footer}</footer>}
    </section>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone,
  href,
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: 'danger';
  href?: string;
}) {
  const body = (
    <>
      <p className="ak-eyebrow">{label}</p>
      <b className={cx('ak-stat__value', tone === 'danger' && 'ak-stat__value--danger')}>{value}</b>
      {hint && <p className="ak-stat__hint">{hint}</p>}
    </>
  );
  return href ? (
    <Link href={href} className="ak-stat">
      {body}
    </Link>
  ) : (
    <div className="ak-stat">{body}</div>
  );
}

/* ── Page, PageHeader, Breadcrumbs ──────────────────────────────────────── */
/**
 * Every converted screen's root. `.ak-page-wrap` is also how the shell knows
 * a screen is converted (old screens get padding; these bring their own).
 */
export function PageWrap({ children }: { children: ReactNode }) {
  return <div className="ak-page-wrap">{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="ak-page-head">
      <div className="ak-page-head__text">
        {eyebrow && <p className="ak-eyebrow">{eyebrow}</p>}
        <h1 className="ak-page-title">{title}</h1>
        {description && <p className="ak-page-lede">{description}</p>}
      </div>
      {actions && <div className="ak-page-head__actions">{actions}</div>}
    </header>
  );
}

export function Page({ form, children }: { form?: boolean; children: ReactNode }) {
  return <div className={cx('ak-page', form && 'ak-page--form')}>{children}</div>;
}

export type Crumb = { label: string; href?: string };
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="ak-crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`}>
              {last || !c.href ? (
                <span aria-current={last ? 'page' : undefined}>{c.label}</span>
              ) : (
                <Link href={c.href}>{c.label}</Link>
              )}
              {!last && <ChevronRight size={13} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* ── Alert ──────────────────────────────────────────────────────────────── */
const ALERT_ICON: Record<Tone, LucideIcon> = {
  neutral: Info,
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: OctagonAlert,
};
/**
 * A message about the page or a known, ongoing problem. `live`: say it aloud
 * when it appears (an outcome); leave it off for something already on the page.
 */
export function Alert({
  tone = 'info',
  title,
  children,
  action,
  live,
}: {
  tone?: Tone;
  title?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  live?: 'polite' | 'assertive';
}) {
  const Icon = ALERT_ICON[tone];
  return (
    <div
      className={cx('ak-alert', tone !== 'info' && tone !== 'neutral' && `ak-alert--${tone}`)}
      role={live === 'assertive' ? 'alert' : live === 'polite' ? 'status' : undefined}
    >
      <span className="ak-alert__icon">
        <Icon size={16} aria-hidden="true" />
      </span>
      <div className="ak-alert__body">
        {title && <p className="ak-alert__title">{title}</p>}
        {children && <div className="ak-alert__text">{children}</div>}
        {action && <div className="ak-alert__action">{action}</div>}
      </div>
    </div>
  );
}

/* ── Empty state, error state ───────────────────────────────────────────── */
export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actions,
}: {
  icon?: LucideIcon;
  title: string;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="ak-state">
      <span className="ak-state__icon">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h2 className="ak-state__title">{title}</h2>
      {description && <p className="ak-state__text">{description}</p>}
      {actions && <div className="ak-state__actions">{actions}</div>}
    </div>
  );
}

/**
 * Something failed to load (`danger`), or is not allowed / not found
 * (`neutral` — nothing is broken). `code` is the database's own words or a
 * reference (D-059: admins see the real error).
 */
export function ErrorState({
  icon: Icon = TriangleAlert,
  title,
  description,
  code,
  actions,
  compact,
  tone = 'danger',
}: {
  icon?: LucideIcon;
  title: string;
  description?: ReactNode;
  code?: string;
  actions?: ReactNode;
  compact?: boolean;
  tone?: 'danger' | 'neutral';
}) {
  return (
    <div
      className={cx(
        'ak-state',
        compact && 'ak-state--compact',
        tone === 'danger' && 'ak-state--danger',
      )}
      role="alert"
    >
      <span className="ak-state__icon">
        <Icon size={20} aria-hidden="true" />
      </span>
      <h2 className="ak-state__title">{title}</h2>
      {description && <p className="ak-state__text">{description}</p>}
      {actions && <div className="ak-state__actions">{actions}</div>}
      {code && <p className="ak-state__code">{code}</p>}
    </div>
  );
}

/* ── Action bar (the foot of every New / Edit page) ─────────────────────── */
export function ActionBar({ status, children }: { status?: ReactNode; children: ReactNode }) {
  return (
    <div className="ak-actionbar">
      <div className="ak-actionbar__status">
        {status ?? (
          <span>
            Fields marked <span style={{ color: 'var(--ak-danger)' }}>*</span> are required
          </span>
        )}
      </div>
      <div className="ak-actionbar__buttons">{children}</div>
    </div>
  );
}
