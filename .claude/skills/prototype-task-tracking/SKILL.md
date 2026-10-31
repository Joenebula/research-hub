---
name: prototype-task-tracking
description: Use whenever building or changing prototype tasks, image hotspot prototypes, first-click tests, task event capture, or task results in Research Hub (/lib/prototype, task question components, task results screens). Covers Figma Embed API setup and events, the event store, metric definitions and click maps.
---

# Prototype task tracking

## Approach

Capture raw events, store them append-only in `task_events`, calculate metrics later. Never calculate metrics in the browser and store only the result.

Event batching: send events to `/api/task-events` every 2 seconds and on page hide (`navigator.sendBeacon`). Each event has a client timestamp and a sequence number; server adds its own timestamp.

## Figma prototypes

Check Figma's current Embed API docs before building (developers.figma.com/docs/embeds). As of Oct 2026:

Setup:
- A Figma OAuth app → client ID. Add the survey site's origin(s) as allowed embed origins (production and preview URLs).
- Embed URL: `https://embed.figma.com/proto/{fileKey}/{name}?node-id={start}&embed-host={host}&client-id={clientId}` (check the exact form in the docs). Iframe `title="Prototype for task: {task}"`. Prototype must be viewable by anyone with the link.

Listen:
```ts
window.addEventListener("message", (e) => {
  if (e.origin !== "https://www.figma.com") return;
  const { type, data } = e.data ?? {};
  // INITIAL_LOAD, PRESENTED_NODE_CHANGED, MOUSE_PRESS_OR_RELEASE, NEW_STATE,
  // LOGIN_SCREEN_SHOWN, PASSWORD_SCREEN_SHOWN, REQUEST_CLOSE
});
```

Send (target origin `https://www.figma.com`): `RESTART`, `NAVIGATE_TO_FRAME_AND_CLOSE_OVERLAYS {nodeId}`, `NAVIGATE_FORWARD`, `NAVIGATE_BACKWARD`, `CHANGE_COMPONENT_STATE`.

Use:
- `PRESENTED_NODE_CHANGED.presentedNodeId` → path, success detection
- `MOUSE_PRESS_OR_RELEASE.handled === false` → misclick. Fires on press **and** release: count one per pair (de-duplicate same screen, same position, within 500 ms). Confirm in spike M0.6 how press vs release is shown.
- position fields (`targetNodeMousePosition`, `nearestScrollingFrameMousePosition`, offsets) → click maps, **best effort**; some prototypes return nulls. Record whether positions were present per attempt; the results screen only draws click maps for screens with enough positioned clicks and says so.
- `LOGIN_SCREEN_SHOWN` / `PASSWORD_SCREEN_SHOWN` in the builder test run → block publishing with a fix-it message.

Screen names/thumbnails: Figma REST API (file nodes + images endpoints) with Joe's personal access token, stored encrypted, fetched in the builder and cached.

## Image hotspot prototypes

- Screens = uploaded images. Hotspots = rectangles stored as percentages of image size (so they scale).
- Render as `<input type="image">` inside a form so it works without JavaScript (the browser sends click x/y; server finds the hotspot). With JavaScript, add positioned `<button>`s with accessible names for keyboard and screen reader users. Clicks recorded with x/y as percentages.
- Hotspot targets: another screen, or success.

## First-click

- Record first pointer click (x/y %) and time from task start; or the region chosen via the keyboard list (record `method: "keyboard"`).

## Metrics

| Metric | Rule |
|--------|------|
| direct_success | ended on a success screen and path equals one of the expected paths |
| indirect_success | ended on a success screen, other path |
| wrong_end | "I've finished" on a non-success screen |
| gave_up | "I'm stuck, skip" |
| cant_do | "I can't do this task" |
| timed_out | limit reached (only if set) |
| time_on_task | later of (Start task, `INITIAL_LOAD`) → ending event, seconds |
| misclicks | count of unhandled clicks |
| path | ordered screen IDs (collapse repeats of the same screen in a row) |
| drop_off | last screen for gave_up, wrong_end, timed_out |

Success detection for Figma: reaching a success screen ends the attempt automatically after 1 second (so a final click registers), unless the task is set to "participant confirms".

## Results

- Report medians and ranges for time, not means alone.
- Always show n. Under 5 attempts: show counts, not percentages.
- Split by device class.
- Click maps: rendered on the screen image, with a table of the top 5 click areas beneath for non-visual access.
