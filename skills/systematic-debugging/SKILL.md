---
name: systematic-debugging
description: Find the root cause before proposing any fix. Use for any bug, test failure, or unexpected behavior — especially under time pressure, when a "quick fix" seems obvious, or after a previous fix didn't actually work.
tags: [debugging]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Systematic Debugging

A fix that isn't traced to a root cause is a guess that happened to change behavior. No fix gets proposed before the investigation below is done — not because the bug is always complex, but because skipping the investigation is exactly how simple bugs come back.

## Phase 1: Root cause investigation

Before attempting anything:

1. **Read the full error**, including the whole stack trace — line numbers, file paths, and error codes usually point straight at the problem.
2. **Reproduce it reliably.** If you can't, that's a data-gathering problem, not a guessing opportunity — get more evidence before touching code.
3. **Check what actually changed recently** — diff, recent commits, new dependencies, environment differences.
4. **In a multi-component system** (CI → build → sign, API → service → database), add boundary instrumentation before guessing which layer is at fault: log what enters and leaves each component, run once, and let that evidence point at the failing layer before you dig into it specifically.
5. **If the bad value surfaces deep in a call stack**, trace backward from where it's used to where it originates, and fix it at the source rather than where it happens to surface.

## Phase 2: Pattern analysis

Before writing a fix, understand the shape of a correct one:

- Find a working example of the same pattern elsewhere in the codebase.
- If you're matching a reference implementation, read it completely — not skimmed — before applying it.
- List every difference between the working and the broken version, including ones that look too small to matter.
- Note what the working version depends on (config, environment, assumptions) that the broken one might be missing.

## Phase 3: Hypothesis and testing

- State one specific hypothesis ("X is the root cause because Y"), not a vague hunch.
- Test it with the smallest possible change, one variable at a time — don't bundle several candidate fixes together.
- If it doesn't confirm the hypothesis, form a new one; don't stack another fix on top of the failed one.
- If you genuinely don't understand the mechanism, say so rather than proceeding on a guess.

## Phase 4: Implementation

1. Write a failing test that reproduces the bug — the smallest reproduction that fails, before any fix exists. Use the `tdd` skill for this.
2. Make one change that addresses the root cause. No unrelated cleanup riding along, no bundled refactor.
3. Confirm the fix with evidence: the new test passes, nothing else broke, and the original symptom is actually gone — see `verification-before-completion`.
4. If the fix doesn't work, stop and count attempts. Fewer than three: go back to Phase 1 with what you just learned. Three or more failed fixes on the same symptom is a signal the architecture itself is wrong, not that you haven't found the right patch yet — raise that explicitly instead of attempting a fourth.
