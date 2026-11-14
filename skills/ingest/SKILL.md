---
name: ingest
description: Turn a transcript, chat thread, voice memo, or long document into a cited note that can be acted on without re-reading the source. Use when the user says "ingest this", "make notes from this meeting/recording", or "what came out of this thread".
tags: [documentation]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Ingest

The note's reader acts on it without checking the raw, so every item in it must trace to a specific place in the raw, and nothing may appear that the raw doesn't actually say.

## Keep the raw
Preserve the original input (copy it into the project if it came from outside, or just note its path/URL if it's already in-repo) so anyone can go check a note's claim against the source later. Don't paraphrase-and-discard.

## Write the note
- Point every item at where it came from: a timestamp, a section, a speaker and a quote.
- Carry over owners, dates, figures, and conditions ("once X ships", "only if Y") exactly as the raw states them — never rounded or generalized.
- When something said earlier gets corrected or reversed later in the same raw, record only the final state, and note that it changed.
- Quote exactly wherever the wording itself carries the weight — a commitment, a customer's own words.
- Put anything the raw itself leaves genuinely unclear (an inaudible passage, two conflicting accounts, an ambiguous speaker) under its own "Unclear in the source" section rather than silently picking one reading.

## Review before trusting it
A note's author misses what they misread — have a second pass (a fresh subagent, or your own second read) check the note against the raw specifically for: a decision or commitment the note drops or misstates, something merely proposed shown as if decided, a quote attributed to the wrong person, and anything the raw clearly states that never made it in. Check each flagged item against the raw before fixing it — a reviewer can also raise false alarms.

## Report
The note's path, the raw's path, and the count of anything left under "Unclear in the source".
