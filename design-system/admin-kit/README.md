# Admin kit

The design system for the Research Hub **admin** side. Surveys do not use it (they follow spec D9).

Copied from Vibe HQ on 31 October 2026 (vibehq commit `c2b6111`). This is now Research Hub's own copy. Changes in Vibe HQ do not reach it, and changes here do not go back.

## What is here

| File | What it is | Where it goes in the app (M0) |
|---|---|---|
| `admin-kit.tokens.css` | Colours, spacing, type (`--ak-*`) | `app/admin/admin-kit.tokens.css` |
| `admin-kit.css` | The `ak-*` classes | `app/admin/admin-kit.css` |
| `components/core.tsx`, `forms.tsx`, `client.tsx`, `RecordCards.tsx`, `MultiPicker.tsx` | The React components | `components/ak/` |
| `components/*.stories.tsx` | Storybook stories: each part in each state | Beside the components |
| `RULES.md` | How to build an admin page with the kit | Read before any admin page |

## Needs

React, Next.js (`next/link`), `lucide-react`, and the `@/` path alias.

## Changes from the Vibe HQ copy

- `SocialFields` left out. It is for event social links and needs Vibe HQ code.

## Read RULES.md with this in mind

`RULES.md` is the Vibe HQ text, unchanged. It names Vibe HQ screens (Claims, Advert prices, Night submissions), Vibe HQ decisions (D-0xx) and the Vibe HQ Storybook. The **patterns** apply here: page frame, components, list and item pages, badges by meaning. The Vibe HQ names and links do not.

Research Hub rules win where they differ. Spec §9.6: every input has a visible border. The kit already does this.
