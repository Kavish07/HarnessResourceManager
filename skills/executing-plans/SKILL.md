---
name: executing-plans
description: Execute an already-approved implementation plan yourself, task by task, in the current session, instead of dispatching a fresh subagent per task. Use when the user chose inline execution or no subagent-dispatch tool is available.
tags: [workflow]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Executing Plans

Run the plan written by the `writing-plans` skill yourself, one task at a time, in this session — no fresh implementer subagent per task, no per-task reviewer. Pay for one context (yours) plus a single fresh-context review at the end, instead of a fresh implementer and reviewer per task.

## When to use this over subagent-driven development

- The plan is already approved and the user chose inline execution at handoff, usually because the plan is short enough, or the cost of a fresh subagent per task isn't worth it here.
- No subagent-dispatch tool exists in this harness. Never fake a dispatch by just "imagining" a fresh context — run the plan directly instead.
- Tasks are mostly independent (the same precondition subagent-driven development needs).

Prefer `subagent-driven-development` when the user wants a review gate on every single task, or the plan is long enough that later tasks would otherwise be decided with a context window full of earlier work.

## What replaces the fresh context and the second reviewer

Inline execution gives up a fresh context per task and a second pair of eyes per task. Make up for both:

- **The plan is the spec.** Follow it exactly; it already did the design thinking.
- **A running ledger is your memory.** Note what you did and why as you go, so a later compaction or handoff doesn't lose decisions.
- **TDD is the per-task gate.** Prove each task with a test you watched fail, then watched pass — that's the check a per-task reviewer would otherwise provide.
- **One reviewer at the end** does the job a per-task reviewer did piecemeal, now against the whole diff.

## Execution discipline

- **Narrate minimally.** One short line between tool calls at most — the ledger and the tool output carry the record, not a running commentary.
- **Don't stop between tasks to check in.** The user picked inline execution to spend less, not to approve every task. Work through the whole plan.
- **Rule, don't stall, on ambiguity.** When the plan is unclear or wrong on some point, decide using the spec as the binding authority and record it in the ledger as a ruling (what you decided, why, what it costs if you're wrong), then continue. A ledgered wrong call is cheap to spot and undo; a session paused on a question nobody's watching costs the whole session.
- **Only stop for:** an irreversible or destructive operation, a security-sensitive action, a side effect outside this workspace that norms say needs a yes first (a merge, a push to a shared branch, a publish), or a plan broken enough that every path forward is a guess.

A fully specified plan reduces inline execution to transcription plus verification — it doesn't need the most capable available model for every task, only for the final review.
