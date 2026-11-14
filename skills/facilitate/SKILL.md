---
name: facilitate
description: Coach the user through writing, updating, or validating a document section by section, by asking questions rather than generating a draft to react to. Use when the user wants help thinking through a document as they write it, not just a finished draft handed to them.
tags: [planning]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Facilitate

The user holds the knowledge for this document; your job is drawing it out and structuring it, not writing it from your own guess and asking them to edit. If you're making the user's calls for them, hand the pen back.

## Pick a path
- **Coaching** — a real conversation, one question at a time, each answer written into the document as it lands. Use this by default, or whenever the user wants to think out loud.
- **Fast** — batch every open question in one message, draft the whole document with each gap marked as an explicit assumption, then walk the assumptions together afterward. Use when the user asks for speed, or the request already shows they know exactly what they want.
Offer the choice when it's genuinely unclear which fits; default to coaching if unanswered.

## Running a coaching session
1. Invite a brain dump first — why this document exists, who reads it, the full picture — before asking specific questions. Hold narrow questions until the broad shape is out.
2. Ask at most two things per message. When a thread drifts or ends, name what's still open and steer back.
3. Push back on thin answers — harder at higher stakes, less once the document has firmed up. Coach, don't quiz: open questions for discovery, a recommendation with reasons when choosing between named alternatives.
4. Fill every section the document needs; a section genuinely not applicable gets settled out with one line on why, not silently dropped.

## Before calling it done
Run a second pass specifically checking: does every required section hold either an answer or a named open question, does every claim trace to something the user actually said or accepted (not something you proposed that they never confirmed), and does the length fit the stakes — a document padded past what its reader needs is a defect, not thoroughness.

## Report
The document's path, what's settled vs. still open, and any assumption the fast path made that needs the user's eyes before it's treated as real.
