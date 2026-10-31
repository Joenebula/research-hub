# Decisions

## 31 Oct 2026 — Admin look uses the Vibe HQ admin kit

- **Decided by:** Joe.
- **What:** The admin side uses the admin kit, copied from Vibe HQ into `design-system/admin-kit/`. This replaces spec D8's first plan (`mydesignskill` house style).
- **Surveys:** not changed. They still follow spec D9 (GOV.UK-style patterns).
- **§9.6 check:** kit inputs have `border: 1px solid var(--ak-border-field)`, so the visible-border rule holds.
- **Open:** wire the kit into the app and run Storybook for it in M0. Check its contrast with axe when the first admin page exists.
