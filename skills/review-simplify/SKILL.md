---
name: review-simplify
description: Review a PR or branch specifically for code that can be deleted or simplified. Use when asked to review for simplicity, or for unnecessary edge-case overengineering.
tags: [sdlc, review]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Review for simplicity

Review this branch. Make sure you understand every product decision and behavior change first — you can't tell what's unnecessary without knowing what it's for.

Then ask: given the end state of the branch, is there anything that can be deleted or simplified? Did an edge case that's unlikely to truly affect real users lead to overengineering?

Prefer deleting code over defending it.
