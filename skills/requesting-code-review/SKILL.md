---
name: requesting-code-review
description: Dispatch an isolated reviewer (subagent or separate pass) with precisely scoped context instead of reviewing your own diff inline. Use after finishing a task or feature, and before merging to main.
tags: [review]
harnesses:
  claude-code: native
  cursor: native
  codex: unknown
---

# Requesting Code Review

Reviewing your own diff inline burns the context you need to keep driving the work, and it's the session that just wrote the code checking its own output. Dispatch review to an isolated reviewer with exactly the context it needs — never your whole session history — and act on what comes back.

## When to request it

Always: after each task in a multi-task plan, after finishing a feature, before merging to the base branch. Worth it even when not strictly required: when you're stuck and want a fresh read, before a risky refactor (to establish a baseline), after fixing a gnarly bug.

## How to request it

1. **Pin the exact range**: the base commit/SHA the change started from, and the current HEAD. The reviewer evaluates that diff, not "the current state of things."
2. **Give it precisely crafted context**, not your session transcript: what was built, what it's supposed to do (the relevant plan or requirement), and the two SHAs. The reviewer should be able to form its own judgment without inheriting your assumptions.
3. **Dispatch it as an isolated pass** — a subagent with no access to your conversation, or at minimum a review done against the diff and requirements alone.

## Acting on the result

- Fix anything critical immediately.
- Fix anything important before moving on to the next task.
- Note minor issues and decide later whether they're worth the churn.
- Push back with technical reasoning, and evidence (the code, the tests), if the reviewer is wrong — don't implement a suggestion just because it arrived labeled "review."

## What this isn't an excuse to skip

Don't skip the dispatch because the change "is simple" — simple changes still ship with reviewable mistakes. Don't ignore critical findings, proceed with unresolved important ones, or argue with technically sound feedback just because it's inconvenient.
