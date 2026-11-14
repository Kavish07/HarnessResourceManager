---
name: deep-recon
description: Decision-grade research on a topic or on this codebase, with every claim traced to an evidence source rather than recalled from training data. Use for market/domain/competitive/technical research, "research this", "research how X works here", or "why is X built this way" when a quick answer in chat isn't enough.
tags: [research]
harnesses:
  claude-code: native
  cursor: unknown
  codex: unknown
---

# Deep Recon

Every engagement serves a decision (enter a market, pick a stack, understand why code is shaped the way it is) — not research for its own sake. Shape the research by that decision from the first question to the final artifact.

## Two standing rules
1. **Never conclude from training data alone.** What you already know proposes hypotheses and structure; a conclusion needs evidence retrieved or read *this run*. An unverified claim is stated as a belief, or not at all.
2. **Context informs questions, never conclusions.** Prior project context (tickets, code, notes) shapes *what to ask*; it is never itself the evidence. A subagent doing the actual digging gets only its brief — not the surrounding project context — so it can't let ambient assumptions stand in for a checked fact.

## Four shapes
- **Draft** — write a research prompt the user runs in their own external tool (often cheaper and a better gatherer than doing it here).
- **Process** — take a finished report and distill it into a cited summary the rest of the project can read without re-reading the source.
- **Run** — do the research here: fan out parallel subagent searches, each returning a relevance-filtered digest (never the raw results) with a claim-plus-source for everything it reports.
- **Codebase** — same discipline aimed at this repo: answer "why is X built this way" from code and git history, not assumption.

Ask the user Draft vs. Run when it's genuinely their call to make (cost/time trade-off); infer the rest from context.

## Doing a Run
1. State the decision this serves and the specific questions that would move it, before searching.
2. Fan out: one subagent per question/sub-topic, each told only its own question, not the whole conversation.
3. Each returned claim needs a publisher, a date, and an access date — no naked numbers. Thin public data gets reported as thin, not padded.
4. Write findings to a file as they land, not just in conversation — a long research pass that gets interrupted should be resumable from what's already on disk.

## Reporting
State what's verified vs. still assumed, cite every load-bearing claim, and say plainly when the evidence doesn't support a clean answer rather than rounding it into one.
