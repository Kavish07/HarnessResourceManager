---
name: brainstorming
description: Clarify intent and produce a short design before building anything new — a feature, a component, a plan outside code. Use before any creative or open-ended request, especially when the ask is vague ("build me X") or non-trivial parts are left unsaid.
tags: [planning]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Brainstorming

An agent that starts coding on the first message builds what it assumes the user wants, and that assumption is usually thinner than it feels. This skill is for surfacing what they actually want, and why, before anything gets built — not for interrogating requests that already say everything that matters.

## Decide whether to ask at all

Before replying, check what the request already answers:

- **Everything non-trivial is already stated** ("make the icon cornflower blue", a request with a spec or detailed plan attached). Do it, and say what you did. Asking here just adds friction.
- **Something non-trivial is missing** (the shape of the feature, who it's for, a tradeoff the user hasn't weighed). Open a short conversation before writing code.

Never ask what the project or the user's own context already answers. Read the files, specs, or earlier messages they pointed at first; reopening a decision they already made wastes their time and signals you didn't look.

## Lay out the approaches, don't just ask open questions

Once something is missing, don't fire a list of open-ended questions. Instead:

1. State what you understood the request to be, in your own words, so a mismatch surfaces immediately.
2. Note anything you found that changes the ask — a constraint, a conflict, a cheaper path — before discussing how to build it.
3. If there's more than one reasonable way to do this, lay out 2-3 concrete approaches with their tradeoffs and let the user pick one. Don't silently pick for them when the choice is material.
4. Only after the approach is picked, write the plan (see the `writing-plans` skill) and get it approved before touching code.

If there's genuinely one sensible approach and nothing is open, steps 1-3 happen in a single first message instead of a back-and-forth.

## What isn't "implementing"

Two things can happen before the plan is approved without violating this skill:

- **A spike the user explicitly agreed to**, to feel out a technical unknown before committing to an approach.
- **Doing exactly what was asked**, once the user has explicitly said to skip the questions and just build it.

Everything else — writing real application code before the approach and plan are agreed — skips the step that makes the other hundred small decisions land the way the user would have made them.
