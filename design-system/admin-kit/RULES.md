# VibeHQ admin — the rules

**Read before building or changing any `/admin` page.** The admin is NOT the public site in a
darker colour. It is its own kit: calm, dense, functional — no glows, no scanlines, no
gradients. **The live gallery:** Storybook's **Admin**
section (https://vibehq-storybook.vercel.app) — every kit part in every state, with a Styles table of
its classes and tokens. Open one before building.

| Layer | Where |
|---|---|
| Styles | `app/admin/admin-kit.css` (`ak-*`), tokens `app/admin/admin-kit.tokens.css` |
| Components | `components/ak/` — `core.tsx`, `forms.tsx`, `client.tsx`, `RecordCards.tsx`, `MultiPicker.tsx`, `SocialFields.tsx` |
| Shell and menu | `app/admin/AdminShell.tsx`, `app/admin/nav.ts`; who sees what: `lib/auth/screens.ts` (D-076) |

`ui_kits/admin/` in this folder is the **early prototype** — do not copy from it.

## 1. Every page has the same frame

```
PageWrap → PageHeader (eyebrow = menu group, title, description, actions) → Page (form? for edit pages) → Card(s)
```

- A **list** is one `Card padding="none"` holding a `DataTable` (search, filters, sort, 25 a
  page); the row's name is a `RowLink` to the item's **own page** (D-075).
- An **item's own page**: cards in reading order. To read and decide (Claims, Night
  submissions): *what was sent → warnings → correct → Decision*. To edit a record: the record's
  fields, then `UndoCard`, then `DeleteCard`.
- **Sub-pages** of a busy screen: `LinkTabs` with `?show=` (Advert prices).
- A **decision** card: a reason box (`TextareaField`), the action buttons in one row, and ONE
  `Outcome` region **outside** the open/decided branch, so the answer is always read out.

## 2. Components — use these, in this order

| Need | Use |
|---|---|
| Buttons | `Button`, `ButtonLink`, `IconButton` (never a raw `<button class>`) |
| Status | `Badge tone=` by meaning (D-073): waiting `warning`, done `success`, refused `danger`, other `neutral` |
| Fields | `Fields` (stack), `FieldRow` (two side by side), `TextField`, `SelectField`, `TextareaField`, `FileField`, `Checkbox`, `ChoiceGroup`, `MultiPicker` |
| Saying what happened | `Outcome` (after an action), `Toast` (after a redirect), `Alert` (about the page) |
| Nothing / failed | `EmptyState`, `ErrorState` (with the database's words as `code`) |
| Lists inside a card | `ak-rows__list` / `ak-rows__item` |
| Delete | `ConfirmDialog` (typing the name for anything that cannot come back) |
| A page's foot | `ActionBar` on every New/Edit page |

## 3. Rules the code enforces, and the ones it does not

Enforced: every page and action calls `requireAdmin(path, screen)`; every write goes through
`writeWithAudit` (CLAUDE.md non-negotiable 4); a new screen is a migration + `lib/auth/screens.ts`
+ `scripts/grant-admin.mjs` (`e2e/unit/screens.spec.ts` checks all three agree).

Not enforced — check by hand: a menu count for every queue that waits for a person
(`lib/admin/waiting.ts` + `nav.ts` + `layout.tsx`); the audit log's label
(`lib/admin/audit-filters.ts`); the measurements in [measure.md](measure.md).

## 4. Known debt

Done 2026-10-28:
- ~~11 kit components not in the gallery~~ — all now on `/admin/kit` (section after "Delete this
  event"): ButtonLink, IconButton, Breadcrumbs, RowLink, Field, Switch, MultiPicker,
  SocialFields, Outcome, UndoCard, DeleteCard. Samples save nothing and say so.
- 2026-10-29: `/admin/kit` retired (D-118). Every kit part has its stories in Storybook, and
  `npm run test:storybook` measures them in CI.
- ~~The kit page crashed (500)~~ — G-109.
- The old `ad-*` admin classes: the 12 dead `@addition` blocks are removed (rules/web.md §4).

- ~~The old admin shell~~ — `ui_kits/admin/admin.css` is no longer loaded; its overrides are
  removed (rules/web.md §4). The file stays in this folder as the early prototype.

Still open:
- `Switch` is shown in the gallery but used on no screen; `Tag` only in the gallery.
