---
name: retrospective
description: Review a finished body of work against the evidence it left behind — its plan, its diffs, its commits, its tickets — and produce sourced findings, action items, and an accept/reject decision. Use when asked to run a retrospective on a completed epic, milestone, or finished piece of work.
tags: [review, planning]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Retrospective

A retrospective judges what actually happened against what was planned, using the evidence left behind — not the participants' memory of how it went.

## Gather the evidence
Before forming any opinion, collect: the original ticket/plan and its stated acceptance criteria, every story/sub-ticket under it and their individual plans, the actual diffs and commits that implemented them, and the test/review results from along the way. A finding not traceable to one of these is an impression, not a finding — say so if that's all you have.

## What to look for
- **Plan vs. outcome drift:** where the delivered work diverges from what the ticket said, and whether that drift was a deliberate, logged decision or happened silently.
- **Process friction:** steps that took materially longer than their ticket implied, rework that wasn't planned for, a review cycle that caught something late that an earlier check would have caught cheaper.
- **What worked:** don't only hunt problems — note what went cleanly and why, so it's repeated rather than rediscovered next time.

## Findings and action items
Each finding: what happened, the evidence for it (a commit, a diff, a ticket comment), and whether it's worth a concrete action item (a process change, a checklist addition) or just worth recording. Not every observation needs an action item; a retrospective that produces ten action items for one epic has probably padded the list.

## The decision
Close with an explicit accept/reject (or accept-with-follow-ups) on whether the finished work meets its original acceptance criteria — don't leave that as an implied conclusion the reader has to infer from the findings list.

## Report
The evidence reviewed, findings (with sources), action items (ranked, not just listed), and the acceptance decision.
