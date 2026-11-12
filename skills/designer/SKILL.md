---
name: designer
description: Checklist for producing an implementable UI spec (screens, flows, dashboards, forms, charts) with wireframes, every component state, role-based visibility and WCAG 2.1 AA accessibility. Use when asked to design, wireframe, lay out or improve the UX of a screen, dashboard, form or component, or before a frontend task whose screen has no spec.
tags: [design, ui]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Designer

A screen spec is what a frontend developer builds against instead of inventing layout, copy and data
bindings on the fly. This is the checklist for producing (or updating) one that stays consistent with the
project's own design system and API contract — not a substitute for reading either.

Ground truth, in order: the project's design-system doc (tokens, components, content rules, accessibility
baseline) → the API/DTO contract for the feature (the architect's design doc) → any recorded design
decisions → the existing screen-spec index, if the project keeps one → the individual screen spec being
extended. If a screen needs a field the contract doesn't have, that's an **API gap** — list it, don't
invent the field.

## 1. Start from the contract, not from imagination
- Every field a screen shows or submits must trace to a named field in the matching API/design doc. A field
  the contract doesn't have is an API gap, recorded in the spec and in your report for the architect — never
  invented to make the mock look complete.
- Labels, names and help text that are already defined elsewhere (a glossary, a PRD, an API's own
  description field) are fixed — reuse them verbatim rather than writing new copy for the same concept.
- Reuse the project's own documented components and tokens by name; a new visual pattern needs a reason (and
  an addition to the design-system doc), not a one-off.

## 2. Role-based visibility
- Apply the project's actual role model — don't invent tiers it doesn't have, and don't collapse tiers it
  does have.
- A role that shouldn't see certain data gets **no path to it at all** — not a hidden field reachable via a
  different route: the whole screen or record is out of reach, and list columns with restricted data are
  absent from the DOM, not just CSS-hidden. Where a column must appear structurally but the value can't be
  shown, use a masked-value pattern (e.g. "Hidden" + an icon + a tooltip explaining why).
- Actions a role can't perform are hidden, not shown disabled with no explanation — say which roles see which
  actions in the spec's action table.
- Exports carry the same role-based masking as the screen they export from — say so explicitly rather than
  assuming it follows.

## 3. Every component needs every state
For each bound component (tile, table, chart, form), specify: loading (a skeleton, never a full-page
spinner), empty (no filters applied vs. filtered to nothing — different copy and action), error (an inline
banner with retry, never silent), any domain-specific edge state the contract defines (low-sample, not
applicable, pending), and the happy path. A spec that only shows the happy-path mock is incomplete.

## 4. Status, colour and charts
- Status is never colour alone: pair it with an icon and a text label every time.
- Chart series colours are assigned in a fixed, documented order, never auto-generated; pick the chart type
  that matches the question being answered (a breakdown is bars, a trend is a line with a dashed
  target/reference where one exists). Give every chart a "view as table" fallback.
- Derived values (percentages, deltas, durations) are **never computed in the spec's binding** — they come
  from the API, already computed and formatted; the spec says what field to print, not how to derive it.

## 5. Content and accessibility
- Follow the project's own content rules verbatim where they exist: date/number/currency formats, button
  verb conventions ("Save request", not "OK"/"Submit"), and its synthetic-example convention for any example
  data shown in a spec or mockup — never real-looking personal data.
- WCAG 2.1 AA baseline applies to every new screen: skip link, visible focus ring, `aria-label` on icon-only
  buttons, status never colour-only, live regions for async results, 24×24px minimum target size, usable at
  200% zoom / 320px width. (See the `accessibility` and `ui-slop` skills for the fuller checklists this
  summarizes.)
- State the accessible name for any composite component you introduce, matching the pattern of an existing
  one if the project has a comparable component already.

## 6. Writing the spec
- Specs live wherever this project keeps them (commonly `docs/design/ui/<screen>.md`), bound to a route and
  a priority, with wireframes (ASCII box diagrams are fine), a table of bindings to API fields, the component
  states from section 3, and role-based behaviour from section 2.
- If the project maintains a screens index or design-system doc, update it when a screen is added, retired or
  renamed — follow its existing convention for marking a renamed/retired entry rather than deleting history.
- Never edit the architect's own design doc (the API contract) — list a needed contract change as "Changes
  needed elsewhere: architect" instead.

## How to apply this
- New screen: read the matching design doc's fields first, then the closest existing spec for structure, then
  write sections 1–5 before drawing anything.
- Extending a screen: update the existing spec file in place and date the change; don't fork a second file for
  the same route.
- Can't ask the user directly: list open UX decisions in your report with a recommended option first, same as
  any other agent working without direct access to the user.
