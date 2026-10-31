# Skills plan

What Claude Code needs to know to build Research Hub well, what already exists, what needs updating, and what's new.

---

## 1. Skills you already have, and how they're used

| Skill | Where it lives | Use in this build | State |
|------|----------------|-------------------|-------|
| `public-service-website` | Claude skills | Its accessibility references (`accessibility-core`, `-keyboard`, `-speech`), `compliance` (UK GDPR, cookies) and `acceptance-criteria` template are the best accessibility material you have. Survey skill below points at them. | Good. Already WCAG 2.2. Bootstrap parts not needed here. |
| `accessibility-review` (design plugin) | Claude skills | Audit format for the M3/M5 manual audits | **Out of date** — see §3 |
| `user-research` (design plugin) | Claude skills | Discussion guide structure | **Thin** — no survey or task-writing guidance |
| `research-synthesis` (design plugin) | Claude skills | Output shape for findings/themes and report sections | **Thin** — no rules on traceability or confidence |
| `ux-copy` (design plugin) | Claude skills | Error messages, empty states, button labels, email copy | Fine |
| `mydesignskill` | Claude skills | ~~Admin app look~~ Replaced by the admin kit (`docs/decisions.md`, 31 Oct 2026) | Not used for the admin |
| `frontend-design` | Claude skills | ~~Admin app UI quality~~ Replaced by the admin kit | Not used for the admin |
| `dataviz` | Claude skills | Survey results and task charts | Fine. Make sure every chart has a table. |
| `design-system` / `design-handoff` | Claude skills | Tokens and component docs for the admin app | Fine |
| `critical-thinking-partner` | Claude skills | Copied into `CLAUDE.md` as always-on behaviour, as its own note recommends | Fine |
| `skill-creator` | Claude skills | To build and test the new skills, with evals | Fine |
| Your Claude Code skills: accessibility, regression testing, unit testing, engineering standards, debugging, ask-dont-guess, preflight | Your machine | Use all of them in this repo. `ask-dont-guess` and `preflight` matter most because you're not reviewing code line by line. | **Not checked** — your computer was linked but no folders were shared, so I couldn't read them. See §5. |
| `ecommerce-security-audit` | Claude skills | Its auth, upload and headers checks are reusable for the M5 security pass | Partly relevant (e-commerce focus) |

Not needed for the build: docx/pdf/xlsx/pptx skills (those make files in chat; the app uses code libraries instead), Figma design-to-code skills (only if you design screens in Figma first — then use `figma-design-to-code`).

---

## 2. New skills to add (in the repo, under `.claude/skills/`)

Drafts are included in this pack and have been brought in line with the reviewed spec. They're starting points; test them with `skill-creator` before relying on them.

Also copied into the pack, because Claude Code can only use skills inside the repo: `mydesignskill` (with the form-control exception already added), `frontend-design`, `ux-copy`, and the accessibility and compliance references from `public-service-website` (inside `accessible-survey-forms/references/`). `dataviz` wasn't available to copy; spec §6.6 covers charts until it is.

### 2.1 `accessible-survey-forms` — most important
Patterns and tests for every survey question type: fieldsets, error summary, matrix, ranking, rating, date, consent, prototype task alternatives, WCAG 2.2 new criteria, the manual screen reader test script. Points to `public-service-website` references for depth.

### 2.2 `research-analysis`
How the analysis engine must behave: evidence schema, verbatim quote rule and verification, tagging, confidence calculated in code, client meeting mode, prompt-injection safety, eval set rules, cost control.

### 2.3 `research-data-privacy`
UK GDPR for research data: controller/processor, consent types, pseudonymisation before AI, retention jobs, erasure and access requests, sub-processor list, what never goes in logs.

### 2.4 `prototype-task-tracking`
Figma Embed API setup and events, image hotspot prototypes, first-click tests, metric definitions, the event-store approach.

---

## 3. Updates to existing skills

### `accessibility-review` — must fix
- It audits against **WCAG 2.1**. Update to **2.2**.
- It lists **2.5.5 Target size (44×44)** as AA. That's **AAA**. The AA criterion is **2.5.8 Target size (minimum), 24×24**. (Keep 44×44 as your own house rule, but label it correctly.)
- Add the 2.2 AA/A criteria: 2.4.11 Focus not obscured (minimum), 2.5.7 Dragging movements, 2.5.8 Target size (minimum), 3.2.6 Consistent help, 3.3.7 Redundant entry, 3.3.8 Accessible authentication (minimum).
- Note 4.1.1 Parsing is obsolete in 2.2.
- Add testing steps it's missing: voice control, Windows high contrast/forced colours, 320 px reflow (1.4.10), text spacing (1.4.12).
- Add a forms section (it barely covers them): fieldset/legend, error summary, no placeholder-as-label, autocomplete (1.3.5).

### `user-research` — should fix
Add:
- Survey design: one idea per question, avoid leading/loaded wording, balanced scales, when to use matrix (rarely), "prefer not to say", order effects, length vs drop-off.
- Usability task writing: realistic scenarios, don't use the words on the button, clear end point, success criteria set before testing.
- Consent and recording basics, with a pointer to `research-data-privacy`.
- Sample sizes are rules of thumb, not stats — say so.

### `research-synthesis` — should fix
Add:
- Every insight must cite evidence (person + source + quote). No uncited claims.
- Quotes copied exactly; mark any that are paraphrase.
- Show contradicting evidence, not just supporting.
- Prevalence as "X of Y people" with the base stated, and no percentages on tiny samples.
- Separate client/stakeholder statements from user evidence.

### `mydesignskill` — small clarification (done in the repo copy; still to do in your main copy)
Add: "No-border rule applies to containers, not form controls. Inputs, selects, checkboxes and radios keep a visible 3:1 border (WCAG 1.4.11)." Otherwise Claude Code may strip input borders following the house rule.

### `public-service-website` — optional
It's the strongest accessibility source you have but is tied to civic/Bootstrap work. Consider splitting its accessibility references into a standalone `accessibility-wcag22` skill that both it and `accessible-survey-forms` point to. Saves duplicating them.

---

## 4. How to make the updates

1. In Claude (chat), ask: "Use skill-creator to update accessibility-review to WCAG 2.2 using the notes in 04-skills-plan.md." Do one skill at a time.
2. For each, have it write 3–5 test prompts (e.g. "audit this form HTML") and run them before/after, so you can see it's better, not just longer.
3. For plugin skills you can't edit directly (the design plugin ones), skill-creator should create your own copy under a new name, e.g. `a11y-audit-wcag22`, with a description saying to use it instead of the original.
4. Copy the four new skills from this pack into the repo's `.claude/skills/` folder. Test each with skill-creator the same way.

---

## 5. Your Claude Code skills (to check)

I couldn't see these. When you next start this, share the folder they're in (in the desktop app, add the folder to the chat) and ask me to check them against:
- WCAG 2.2, not 2.1
- Windows + Mac (no bash-only commands)
- Playwright + axe for accessibility tests
- That `preflight` covers: tests pass, accessibility checks pass, no secrets in code, migrations reviewed

Or copy them into the repo's `.claude/skills/` and Claude Code will use them directly.
