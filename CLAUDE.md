# Research Hub — instructions for Claude Code

## What this is

A personal UX research tool for Joe (senior UX designer, Nottingham). He uses it on client and in-house projects to run surveys and prototype tests, bring in interviews, workshops and meetings, and analyse it all with AI help he can check and correct.

Joe is not a developer. He reviews behaviour, not code. Explain what you did and what he should check, in plain English, short. No jargon. UK English everywhere, including UI copy.

## Read first

1. `docs/01-implementation-map.md` — order of work, milestones, "done when"
2. `docs/02-implementation-spec.md` — the detail (sections referenced as "spec §N")
3. `docs/03-verification.md` — checks already run, what was fixed, and Joe's open questions
4. `docs/decisions.md` — decisions made during the build (create it in M0)

The spec wins over your assumptions. If the spec is unclear or seems wrong, stop and ask Joe. Don't guess.

## Skills — load before working on these areas

All of these are in `.claude/skills/` in this repo.

| Area | Skill |
|------|-------|
| Any survey page or survey component (`/app/s/`, `/components/survey/`), survey emails | `accessible-survey-forms` |
| Analysis prompts, jobs, evidence/themes review, evals (`/lib/analysis`) | `research-analysis` |
| Anything that stores, sends, exports or deletes personal data; any new outside service | `research-data-privacy` |
| Prototype tasks, first-click, task events and results (`/lib/prototype`) | `prototype-task-tracking` |
| Admin app look | The admin kit in `design-system/admin-kit/` — read its `README.md` and `RULES.md` first. Use its components and `ak-*` classes; don't invent new ones. Not `mydesignskill` or `frontend-design` for the admin (decision in `docs/decisions.md`). |
| Charts | No chart skill in the repo yet. Follow spec §6.6: simple SVG bars, one accent colour plus greys, a data table beside every chart. |
| UI wording, errors, empty states | `ux-copy` |
| Joe's own skills if present: `ask-dont-guess`, `preflight`, `engineering-standards`, `unit-testing`, `regression-testing`, `debugging`, `accessibility` | Use them as their descriptions say |

## How to work

- **One milestone at a time.** Don't start the next until Joe signs off the current one in `docs/milestones.md`.
- **Plan first for anything bigger than a small fix.** Write the plan (what, which files, how it'll be tested), show Joe, wait for an ok.
- **Spikes in M0 come before anything else.** If a spike fails, report plainly and stop.
- **Check outside services' current docs** (regions, limits, prices, API shapes) before using them. Record what you found, with the date, in `docs/decisions.md`. Don't rely on memory.
- **Tests with every change.** Unit tests for logic, Playwright for flows, axe + keyboard tests for every survey component (spec §9.4).
- **Windows and Mac.** Use npm scripts and Node scripts. No bash-only commands in the repo. Paths via `path.join`.
- **Secrets** only in `.env.local`; keep `.env.example` up to date with names only.
- **Migrations** are reviewed with Joe before running against anything but local.
- **Never use real client data** in tests, evals, fixtures or seed data.

## Working style

- Be honest. If something Joe asks for has a problem, say so and why, then suggest a better way. Don't just agree.
- Say what you checked and what you assumed. "Tests pass" only if you ran them.
- State limits plainly (e.g. Figma click positions are best effort).
- Keep what Joe decided separate from what you suggested.
- When you finish a task, tell Joe in a few lines: what changed, how to try it, anything he needs to decide.

## Definition of done (every task)

- Does what the spec says
- Tests written and passing
- Survey work: axe zero violations, keyboard test passing, works with JavaScript off (except prototype tasks)
- No personal data in logs
- `docs/decisions.md` updated if a decision was made
- Joe told how to check it

## Don't

- Build Stage 2 features (map, "Stage 2 and later") to finish a Stage 1 item — ask first
- Add open-tracking pixels, CAPTCHAs, sliders, date pickers, or tables of radios
- Let the AI produce counts or percentages that end up in reports
- Show unverified quotes in findings or reports
- Soft-delete personal data
