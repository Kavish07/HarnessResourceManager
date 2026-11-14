---
name: receiving-code-review
description: Evaluate code review feedback technically before implementing it, instead of agreeing reflexively or implementing blind. Use when receiving review comments, especially ones that seem unclear, overbroad, or technically questionable.
tags: [review]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Receiving Code Review

Code review feedback needs evaluation, not a performance of agreement. Treat every comment as a claim to check against the actual codebase, not an instruction to execute immediately.

## The response order

1. **Read the whole comment** before reacting to any part of it.
2. **Restate the requirement in your own words** (or ask, if it doesn't resolve to one).
3. **Check it against the codebase** — does the thing it describes actually work the way the reviewer assumed?
4. **Judge whether it's technically right for this codebase specifically**, not whether it's generically good advice.
5. **Respond** — a technical acknowledgment, or reasoned pushback if it's wrong.
6. **Implement one item at a time**, each proven by its own test.

Skip straight to step 6 and you implement misunderstandings instead of fixes.

## Don't perform agreement

Drop reflexive affirmations ("great point", "you're absolutely right") before you've verified anything — they commit you to a claim before you know if it's true. Prefer silence followed by action, or a plain technical restatement, over enthusiasm.

## Unclear feedback stops implementation, not just the unclear item

If part of a multi-item review is unclear, don't implement the clear parts and ask about the rest later — items are often related, and partial understanding produces a partial, possibly wrong, implementation. Ask about everything unclear before touching any of it.

## External reviewers get more scrutiny than the user

Feedback from the person who owns the decision can generally be trusted once understood, though scope still gets clarified when it's ambiguous. Feedback from an external reviewer (an automated review tool, a teammate with less context) needs an extra pass first:

- Is this actually correct for this codebase, or does it assume a different one?
- Would it break something that currently works, and is there a reason the current code is the way it is?
- Does the reviewer appear to have the same context you do?

If a suggestion looks wrong after that check, push back with the specific technical reason, not a vague disagreement. If you can't verify it, say exactly what's missing rather than guessing either way.

## Don't gold-plate on a reviewer's say-so

If a reviewer asks you to "do this properly" or add a more complete implementation than the task needs, check whether the thing in question is actually used before building it out. An unused endpoint or option doesn't get hardened on a reviewer's hunch — remove it or ask, rather than implementing speculative generality because a review comment suggested it.
