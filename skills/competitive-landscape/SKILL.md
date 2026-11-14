---
name: competitive-landscape
description: Map who's winning an SEO market, what content is working for them, keyword coverage, and the strategic gaps. Use for a market-level view across several competitors; for a deep dive on one named domain, use competitor-analysis instead.
tags: [seo]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Competitive landscape

## Goal

Answer "who's winning this SEO market, what's working for them, and where are the openings?" at the market level, not the single-competitor level.

## Inputs

A topic, seed keywords, or a market/category, plus any already-known competitors.

## Workflow

1. Build a representative query set for the market — 5 to 10 queries covering mixed intent (informational, commercial, comparison), from provided keywords or fresh discovery.
2. Use that query set to find recurring ranking domains across all of it, at scale, rather than manually counting SERPs one query at a time.
3. Group recurring domains by type: direct product competitors, publishers/media, marketplaces/directories, communities/forums, documentation. Mislabeling a publisher as a product competitor is a common, avoidable mistake — keep types explicit.
4. For the strongest 3-5 recurring domains, pull their organic footprint and ranking keywords.
5. Check backlink authority only when it looks like it's explaining why a domain wins; continue without it otherwise.
6. Synthesize the pattern: content types, themes, SERP formats, and the underserved angles nobody's covering well.

## Output

Lead with the leaders, the most winnable area, and the biggest barrier. A "who's winning" table: domain / type / organic footprint / winning theme / the gap. A "why they win" section, one finding per pattern, each paired with what the user should do instead. A gaps-and-openings table. Deliver through the `seo-report` skill, and if the query set was small, call the read directional rather than conclusive.

## Guardrails

- Distinguish SEO competitors from business competitors explicitly.
- Don't overstate exact traffic from estimate-based tools.
- A small query set produces a directional read, not a conclusion — say so.
