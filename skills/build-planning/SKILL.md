---
name: build-planning
description: Implement a story, feature, or bug fix end to end — plan, code, review, verify — when the user hands over a ticket or description and leaves the implementation to you. Use for a substantive change the user wants done, not for small mechanical edits (formatting, typos, config hygiene) or user-directed interactive edits.
tags: [sdlc]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Build

Four stages, in order, for a piece of work handed over wholesale rather than walked through interactively.

## 1. Plan
Before writing code, state: what the change touches (files, callers, tests), what "done" looks like concretely, and anything genuinely ambiguous that needs a decision before implementation (not everything — only what actually blocks starting). Keep the plan proportional to the ticket; a one-file bug fix doesn't need the same planning depth as a new feature.

## 2. Code
Implement against the plan. Start with a failing test where the change is testable at all (see the `tdd` skill for the discipline). Stay inside the stated scope — a plan surfaces scope creep by making the boundary explicit; don't drift past it without saying so.

## 3. Review
Re-read the diff as if someone else wrote it before calling it done: does it match the plan, is anything half-finished, did it touch something outside its stated scope. A fresh subagent review (or this project's own `/code-review`) catches more than the author's own second look.

## 4. Verify
Run the actual tests and read the actual output — never report success without having just seen it pass. If a required test dependency is unavailable, say which tests couldn't run rather than claiming a pass.

## Route
Pick (or let the user name) how much ceremony this needs: a small, well-understood change can skip straight through with a light review; a larger or riskier one gets the full four stages with a thorough review. Say which route you're taking and why.

## Report
What was planned, implemented, reviewed, and verified — with the actual command output for verification, not a summary of it.
