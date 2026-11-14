---
name: competitor-analysis
description: Analyze one named competitor's organic footprint, ranking keywords, content themes, and backlinks to decide what to learn from, counter-position against, or outrank. Use for a single named competitor; for finding who the market leaders even are first, use competitive-landscape instead.
tags: [seo]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Competitor analysis

## Goal

Go deep enough on one competitor to decide what to learn from, avoid, counter-position against, or outrank — not just describe them.

## Inputs

The competitor's domain, and the user's own domain if a direct comparison is wanted.

## Workflow

1. Get the competitor's baseline organic footprint (traffic/keyword-count estimate). If comparing to the user and first-party search-console data is connected, use that as the user's real baseline instead of a third-party estimate for their own site.
2. Pull the competitor's actual ranking keywords, filtered to relevant rows (exclude branded terms, filter by minimum volume) rather than taking a raw dump.
3. Group competitor keywords into themes: product/category terms, alternatives/comparisons, tools/templates/calculators, educational guides, branded demand.
4. Check backlink/referring-domain strength if authority looks like it's explaining the rankings — continue without it if that data isn't available.
5. For the handful of keywords that matter most, check the live SERP to compare actual positioning rather than relying on metrics alone.
6. Produce an actionable read: what they're doing well, where they're vulnerable, which pages/keywords to pursue, and what *not* to copy.

## Output

A snapshot table (traffic estimate, keyword count, referring domains — plus the user's own row if comparing). The single biggest lesson. Where they're vulnerable, ordered by how winnable it looks. A keyword-themes table. Deliver through the `seo-report` skill.

## Guardrails

- Not every competitor keyword is worth chasing — filter for actual business fit.
- Separate evidence from inference; don't infer page-content patterns from keyword rows alone without checking the actual page.
- Recommend a stronger angle or better answer, never "copy this."
- If the user's own domain data isn't available, frame the analysis as competitor-only rather than forcing a comparison.
