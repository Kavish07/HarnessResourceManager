---
name: ux-flow-design
description: Elicit the user's UX vision into two companion documents — visual identity (how it looks) and behavior/information architecture (how it works) — rather than inventing a direction and asking them to react to it. Use when the user wants to plan or specify UX/UI before a build, without a visual mockup already driving the decisions.
tags: [design]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# UX Flow Design

Draw out the user's vision; never impose your own. Don't volunteer colors, patterns, or a visual direction unless the user already has a theme in mind and is confirming it, not discovering it.

## Two separate documents
- **Visual identity** (how it looks): colors, typography, spacing, components — the visual language.
- **Behavior / information architecture** (how it works): navigation, states, interactions, accessibility, user journeys.

Keep them separate and have the behavior document reference the visual one by name rather than restating it — a color choice belongs in exactly one place. On conflict, both documents win over any mockup or import that contradicts them; a visual reference informs the spec, it doesn't silently override it.

## Discovery
1. Read whatever planning document already exists for this work in full before asking anything — don't re-derive requirements that are already settled elsewhere.
2. Name the form factor (mobile/web/desktop/multi-surface) before the information architecture can close; it's often implied by a described user journey rather than needing a direct question.
3. Walk real journeys with a named, specific user ("Mary, checking in from her phone between meetings" — not "the user") structured into steps with a clear climax beat, not a generic happy path.
4. Name the surrounding concerns relevant to this project (accessibility, dark mode, offline, internationalization, motion) as an open list, not a fixed checklist — invent sections the product actually needs rather than forcing every project into the same template.

## Closing the architecture
Every stated need should land on some screen, and every screen should serve a need a journey actually reaches — if either direction doesn't close, that's a gap to ask about, not one to quietly invent an answer for.

## Report
Both documents' paths, open questions, and anything marked as an assumption pending the user's confirmation.
