---
name: keyword-research
description: Discover keyword opportunities from seed topics, evaluate their metrics and SERPs, and prioritize which to target. Use when asked for keyword research, keyword opportunities, or what to target for a topic, product, or page.
tags: [seo]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Keyword research

## Goal

Turn seed topics into a prioritized keyword opportunity set that says what to target, what to save, and what to research next.

## Inputs

One or more seed topics, products, pages, competitors, or audience problems, plus the target market/location/language if it would materially change the metrics.

## Workflow

1. If first-party search-console data is connected, start there: pull queries already earning impressions, especially ones ranking in the 5-20 range with decent impressions — that "striking distance" set is the fastest opportunity, since you're already partially visible for it. Hydrate those with keyword-metrics data (volume, difficulty, intent) before anything else.
2. Expand from the seeds using whatever keyword-discovery tool is available, in a small number of batched calls rather than one-at-a-time.
3. Hydrate every candidate with volume, difficulty, and search intent before judging it. Don't prioritize on volume alone.
4. If a target domain or page is in scope, pull its actual ranking keywords for near-miss and competitor-owned terms.
5. Remove irrelevant, duplicate, branded-only, and off-intent terms.
6. Prioritize by practical opportunity: fit to the actual product/page, clear intent, reasonable difficulty, a SERP the site can plausibly compete in — not raw volume.
7. For the highest-potential or most ambiguous terms, check the live SERP before committing — intent drifts, and a metric alone can mislead.
8. Present a short shortlist plus a longer opportunity table. Ask before saving anything to a tracked list.

## Output

Lead with the best theme and why it's winnable now. A table of keyword / intent / volume / difficulty / target page for the shortlist, then the same columns for the longer list. A risks section naming anything metric-derived rather than verified. Deliver through the `seo-report` skill rather than narrating the findings in chat.

## Guardrails

- Don't invent a metric a tool didn't return — write "unknown."
- Don't save anything without explicit confirmation.
- Prefer business-fit and intent-fit over chasing the largest volume term.
