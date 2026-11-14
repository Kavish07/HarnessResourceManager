---
name: walkthrough
description: Guide a human through reviewing a commit, PR, file, or directory interactively, instead of dumping a static review report. Use when the user wants to walk through a change together rather than just receive a written review.
tags: [review]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Walkthrough

A written review report gets skimmed; a walkthrough keeps the reviewer's attention on one thing at a time and lets them steer. Use this when the point is the human actually understanding the change, not just receiving a verdict on it.

## Structure the pass
1. Open with a one-paragraph orientation: what changed, why (the ticket/intent if known), and the rough shape of the diff (how many files, which areas), before looking at any code.
2. Walk file by file, or logical chunk by logical chunk for one large file — never the whole diff dumped in one message.
3. For each chunk: what it does, why it does it that way (if non-obvious), and anything worth flagging (a risk, a simplification, a question) — then pause for the user's reaction before moving on.
4. Let the user redirect at any point: jump to a different file, go deeper on one chunk, or skip ahead when something is obviously fine.

## What to flag vs. let pass
Flag: anything that changes behavior in a way the stated intent doesn't explain, anything risky (auth, data loss, a migration), and anything that would confuse a future reader. Let pass without comment: pure formatting, renames, and anything that's clearly just mechanical.

## Close
Summarize what was walked, what (if anything) still needs a change before merging, and anything the user decided to accept as-is during the walkthrough.
