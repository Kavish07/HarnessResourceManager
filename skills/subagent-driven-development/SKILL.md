---
name: subagent-driven-development
description: Execute an implementation plan by dispatching a fresh implementer subagent per task, with a review after each task and one broad review at the end. Use when running a multi-task plan with mostly independent tasks and a subagent-dispatch tool is available.
tags: [workflow, subagents]
harnesses:
  claude-code: native
  cursor: unknown
  codex: unknown
---

# Subagent-Driven Development

Give each task in an approved plan to a fresh implementer subagent — isolated context, precisely crafted instructions, no inherited session history — then review that task (spec compliance and quality) before moving to the next, and run one broad review across the whole branch at the end. This buys a fresh context and a second pair of eyes per task, at the cost of re-reading the codebase from zero each time; prefer `executing-plans` when that cost isn't worth paying for this plan.

## When this applies

- There's an approved plan and tasks are mostly independent — tightly coupled tasks should be executed manually or re-planned, not split across isolated subagents that can't see each other's half-finished work.
- A subagent-dispatch tool is actually available. If not, use `executing-plans` instead rather than faking isolation you don't have.

## Running the loop

For each task: dispatch a fresh subagent with only what that task needs (the task description, the relevant plan excerpt, the files it touches) — never your running session history. Require it to prove the task with a test it watched fail, then pass. Review the result for spec compliance and quality before starting the next task.

- **Narrate minimally** between dispatches — one short line; the ledger and subagent reports carry the detail.
- **Don't stop between tasks to check in.** The plan was approved to be executed, not re-approved task by task. Progress-summary prompts cost the user's attention for no decision they need to make.
- **Rule, don't stall, on ambiguity.** When a task is underspecified or the plan has a defect, decide using the spec as the binding authority, record the decision as a ruling (what, why, what it costs if wrong), and continue. A bad ruling is visible and cheap to undo in the diff; a session parked on an avoidable question costs the whole run.
- **Only stop for:** an irreversible or destructive operation, a security-sensitive action, a side effect outside this workspace that norms require a yes for first (a merge, a push to a shared branch, a publish), or completion of every task.

## After the last task

Run one broad, fresh-context review across the entire branch — not just the last task's diff — before calling the plan done. This is the review that catches drift accumulated across tasks that each individually looked fine.
