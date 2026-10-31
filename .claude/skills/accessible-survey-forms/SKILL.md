---
name: accessible-survey-forms
description: Use whenever building, changing or testing any participant-facing survey page or survey question component in Research Hub (anything under /app/s/ or /components/survey/), including question types, validation and errors, consent, prototype task wrappers, survey emails and survey branding. Sets WCAG 2.2 AA as the floor plus house rules, gives the pattern for each question type, and the tests that must pass.
---

# Accessible survey forms

Survey participants are the most important users of Research Hub. Any age, any ability, any device, any connection. If a survey page isn't accessible, it isn't done.

For depth on general accessibility, keyboard and screen reader behaviour, read `references/accessibility-core.md`, `references/accessibility-keyboard.md` and `references/accessibility-speech.md` (copied from Joe's `public-service-website` skill; ignore their Bootstrap and civic-site specifics). This skill is the survey-specific layer on top.

## Non-negotiables

1. Native HTML first. `<input>`, `<fieldset>`, `<legend>`, `<label>`, `<select>`, `<textarea>`, `<button>`. ARIA only when native can't do it.
2. Server-rendered forms that post and redirect. Every question type works with JavaScript off, except Figma prototype tasks. First-click and image hotspot tasks use `<input type="image">` so they work without JavaScript too.
3. Every input has a visible `<label>`. Placeholder is never the label.
4. Groups of radios/checkboxes are in a `<fieldset>` with a `<legend>`. On one-question pages the legend is the page heading (`<legend class="…"><h1>…</h1></legend>`).
5. Hint text sits between label and input and is linked with `aria-describedby`.
6. Validate on submit only. Never disable Continue.
7. Controls at least 44×44 px (WCAG 2.5.8 needs 24; 44 is house rule). Focus outline at least 3 px, visible on every background.
8. Inputs, radios, checkboxes, selects keep a visible border at 3:1 contrast — the house "no borders" rule is for containers only.
9. Nothing sticky that can cover the focused element (2.4.11).
10. No time-outs that lose answers. No passwords, codes or puzzles for participants (3.3.8). No CAPTCHA.
11. Never ask for the same thing twice in one survey (3.3.7). Prefilling from the person record only for fields Joe has marked safe (spec §6.3).
12. Help/contact link in the same place on every page (3.2.6).
13. `lang="en-GB"`. Page title format: `Question 3 of 12 – {survey}`; add `Error: ` prefix when errors show.
14. Works at 320 px wide, 400% zoom, text spacing overrides, forced colours (Windows high contrast), reduced motion.

## Errors

- Error summary at the top of the main content: heading "There is a problem", list of links to each field with the error. Use `role="alert"` on the summary container, move focus to it on load.
- Inline error message above the input inside the form group, starting with visually hidden "Error:", included in `aria-describedby`.
- Messages say what to do: "Enter your email address in the right format, like name@example.com" — not "Invalid input".
- Keep what the person entered when showing errors.

## Question type patterns

| Type | Pattern |
|------|---------|
| Short text | `label` + `input`. Set `autocomplete` for name, email, organisation. Width matches expected answer. |
| Long text | `label` + `textarea`. Character limit: show remaining count in a polite live region updated after typing pauses; allow typing past the limit and show error on submit. |
| Number | `input type="text" inputmode="numeric"` with pattern validation server-side. Not `type="number"`. |
| Email | `type="email" autocomplete="email" spellcheck="false"` |
| Date | Fieldset with three inputs: Day, Month, Year (`inputmode="numeric"`). No date pickers. |
| Single choice | Fieldset + radios. "Other": conditional text input revealed below the option, still reachable without JS (always rendered, hidden with CSS only when JS confirms). |
| Multiple choice | Fieldset + checkboxes, hint "Select all that apply". Exclusive "None of these" separated by an "or" divider; with JS unticks others; server validates. |
| Dropdown | Native `select` only. Prefer radios under 8 options. |
| Yes/No | Inline radios in fieldset. |
| Rating | Fieldset + radios. Each radio label includes the number and, for end points, the meaning ("1 – Very difficult", "7 – Very easy"); middle points just the number. Visual layout can be a row; must wrap at 320 px. Never a slider. |
| Matrix | Each row = its own fieldset, legend = row statement, radios = columns. Wide screens: CSS grid with column headings shown once visually (`aria-hidden` on the visual header row) and each radio label containing the column name visually hidden. Narrow screens: stacked. Max 7 columns. Do not use a `<table>` of radios. |
| Ranking | No JS: one `select` per item for its position, server checks for duplicates with a clear error. With JS: ordered list, each item has "Move up"/"Move down" buttons with names like "Move Payslips up"; polite live region announces "Payslips moved to position 2 of 5"; focus stays on the moved item's button. Drag only as an extra (2.5.7). |
| Consent | Checkboxes with the full wording visible, not hidden behind a link. Link to privacy notice opens in the same tab with a back route, or states "(opens in new tab)". |
| Content block | Heading and text. Images need alt text; decorative images `alt=""`. |

## Prototype and first-click tasks

- Intro page states a visual task is coming.
- Task wording stays visible during the task, beside or above the prototype, never overlapping it. Below about 600 px wide or at high zoom it becomes a collapsible "Show task" panel that isn't fixed in place.
- Buttons always available: "I've finished", "I'm stuck, skip", "I can't do this task". The last opens an optional "Tell us what got in the way" text box.
- Figma iframe has a `title` ("Prototype for task: {task name}").
- Image hotspot prototypes: hotspots are real `<button>`s with names Joe set; a list of the buttons is available as text for screen reader users.
- First-click: a keyboard alternative listing regions with neutral labels in reading order ("Area 3: top right") that don't give the answer away.
- Time limits off by default. If on, tell the person before they start and offer more time.

## Branding

- Optional logo (needs alt text = organisation name) and one accent colour.
- Accent colour must reach 4.5:1 against white for text/buttons and 3:1 for focus/borders; block publishing if not. Don't let branding change form control styles beyond the accent.

## Emails

- `lang="en-GB"`. Real HTML text, not images. Single column, max 600 px. Body text at least 16 px. Works in dark mode. Link text says where it goes ("Start the survey"), with the full link shown as plain text below. Say who it's from, what it's for, how long it takes and the close date. Plain text version always sent.

## Tests that must pass

Automated (Playwright + `@axe-core/playwright`), for every question type, in states: empty, filled, error, 320 px:
- axe: zero violations (tags `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`)
- keyboard: tab order matches visual order; arrow keys move within radio groups; space toggles checkboxes; no traps; focus visible (check computed outline)
- error flow: submit empty required → focus lands on summary; summary links move focus to the field
- JS disabled run of the whole survey (except prototype tasks)

Manual (record in `docs/a11y-audits/YYYY-MM-DD-{survey or milestone}.md`):
- NVDA + Firefox, NVDA + Chrome (Windows)
- VoiceOver + Safari (Mac), VoiceOver (iPhone)
- Keyboard only
- 400% zoom; 320 px
- Windows high contrast
- Voice control (at M3 and M5): say each control's visible label and it activates

For each question type, note what the screen reader announces for: the group, each option, hint, error. Compare with the expected announcement and fix differences.

## When unsure

Follow the GOV.UK Design System pattern for that component; it has been tested with real assistive technology users. Ask Joe before inventing a new pattern.
