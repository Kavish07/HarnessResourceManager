---
name: continuous-learning
description: Mine a finished session's transcript for a technique, workaround, or correction worth keeping, and propose it as a new skill or CLAUDE.md note for the user's approval. Use at natural session boundaries, or when asked to capture what was just learned.
tags: [meta, learning]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Continuous Learning

A session that solved a real problem often contains a reusable technique that will just as quickly be forgotten once the session ends. This skill is the habit of noticing one before it's gone.

## When something is worth extracting

Look for: a bug whose fix generalizes beyond this one instance, a user correction that revealed a standing preference ("don't do X, do Y, because Z"), a workaround for a framework/library quirk that will recur, or a project convention that wasn't written down anywhere until you had to rediscover it mid-session.

Not worth extracting: one-off typo fixes, issues caused by a flaky external service, anything so specific to this exact task that it won't recur.

## What to do with it

Don't silently write a new skill file. Propose it: show the user the pattern you noticed, in one or two sentences, and the form you'd save it in — a new small skill, an addition to an existing skill, or a line in the project's CLAUDE.md/feedback memory if it's a standing preference rather than a technique. Let them confirm, adjust, or decline before anything gets written.

## Where it goes

A technique reusable across projects belongs in a skill. A preference specific to this project belongs in its CLAUDE.md. A preference about how to collaborate with this particular user belongs in memory (see feedback-type memory, if this harness has one) — not duplicated into all three.

## Rule

Never invent a pattern to have something to report. If nothing in the session clears the bar above, say so plainly instead of extracting something thin just to produce output.
