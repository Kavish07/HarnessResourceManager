---
name: link-prospecting
description: Find realistic link prospects and contact paths, then draft outreach, from SERP and backlink signals. Use when asked to find link-building prospects, backlink opportunities, or draft outreach for a page or asset.
tags: [seo]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Link prospecting

## Goal

Find realistic pages, sites, and authors that might reasonably reference the target page, product, study, or tool — not a generic list of "high authority" sites.

## Inputs

The target domain/page, the linkable asset (page, study, tool, guide), and ideally known competitors whose backlink profiles are worth mining.

## Workflow

1. Find ranking articles, listicles, resource pages, and comparisons for queries related to the asset — these are prospect pages, not just competitor content.
2. Inspect competitor backlink/referring-domain patterns for who already links to similar assets.
3. Qualify important prospect domains (traffic/authority sanity check) before spending outreach effort on them.
4. For each good prospect, find a real contact path using web search/browsing: author byline pages, contact pages, editorial guidelines, about/team pages, professional profiles, masthead pages. Only record a contact detail you actually found, with its source URL.
5. Draft outreach per prospect type (listicle inclusion request vs. resource-page addition vs. guest contribution) rather than one generic template.

## Output

A prospect table: site / why it fits / contact path found / outreach angle. Deliver through the `seo-report` skill.

## Guardrails

- A prospect without a real, findable contact path is a dead end — don't pad the list with unreachable sites.
- Match the outreach angle to what the page actually does (a listicle wants an addition, a resource page wants a link, a guest post wants a pitch) rather than one generic ask.
