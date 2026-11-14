---
name: review-brief
description: Produce a scannable review brief for a branch or PR so a maintainer can approve without reading the whole diff. Use when asked "how do I review this", "summarize the changes", "what should I look at", or to understand a PR in under two minutes.
tags: [sdlc, review]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Review brief

The reader won't read the diff. They'll skim for thirty seconds, then read only the code that could hurt them. Write for that.

## Process

1. Get the diff and read every non-trivial changed file in full.
2. Find the one-sentence invariant: what was broken, what is true now.
3. Classify every hunk against the crucial-code criteria below. Anything that matches goes into the brief as real code, verbatim. Everything else gets one table row, or gets folded into a single row.
4. Write the brief in the layout below. Verify every cited line number against the working tree.
5. Have a second, fresh-context pass review the *code*, not your prose: "what's wrong, overstated, or missing?" Fix real bugs before delivering, and say that you did.

## Crucial code criteria

A hunk is crucial — show it as real code — if it touches: a schema or persisted shape, a database write (especially inside a retried or scheduled job), an auth/permission check, the actual branch or expression that decides the outcome the change is about, or anything you'd be embarrassed to defend in review (a string-matched error message driving UI copy, a regex standing in for a real parser, a swallowed catch, a magic timeout, a silent behavior change).

Show each as a short trimmed excerpt with one sentence above saying what to notice and one line below naming the failure mode if it's wrong. Three to six excerpts is normal — more than that, the PR should probably be split; say so.

## Layout

- **One sentence**: what was broken, what's true now.
- **The code that matters**: the crucial excerpts, in reading order by risk. This section *is* the brief — don't defer it to a follow-up answer.
- **Everything else, one table**: file, what it does, the one thing to check. Fold renames/formatting/fixtures into a single row.
- **What does NOT exist**: things a reader would assume were added and weren't (no migration, no new dependency, no new auth path).
- **Decisions you might disagree with**: two to four bullets, each the choice, the alternative, and the cost — no defense longer than one sentence.
- **Status**: whatever numbers gate the merge (tests, a dry-run count).
- **Try it in two minutes**: the two or three commands that exercise the change.

## Rules

No paragraph over two sentences. Code goes in fences, never described in prose — show the actual `WHERE` clause or auth check instead of narrating it. Cut rejected-alternatives history unless asked. Never simplify into inaccuracy: a detail that changes what the reader would do stays, as one line.
