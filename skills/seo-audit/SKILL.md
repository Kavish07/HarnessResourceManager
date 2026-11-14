---
name: seo-audit
description: Audit a website, investigate its real search opportunities, and deliver a short data-backed report on the few changes most likely to grow organic traffic that converts. Use when asked for an SEO audit or review of a domain, especially for a shareable report. For expert-facing analysis of a competitor or market, use competitor-analysis or competitive-landscape instead.
tags: [seo]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# SEO audit

## Goal

Find the work that would most improve a site's *useful* organic traffic, then explain it so a non-expert can act on it. Research broadly; recommend selectively — the report leads with one to three recommendations that capture meaningfully more qualified demand or stop a real loss.

## Workflow

### 1. Orient

Start a site crawl. While it runs, pull a backlink/domain overview and a sample of current ranking keywords, and map the site's actual page families from its sitemap and navigation (product, pricing, comparison, guides, categories — whatever the site actually has, not a generic template). If the crawl comes back broken or nearly empty, investigate that first — a certificate error or a dead domain with a live successor flips the whole recommendation to "fix the redirect," and nothing downstream matters until that's resolved.

### 2. Investigate every family that matters to the goal

For each page family that could plausibly bring in buyers, read at least two pages' real content: the one performing best in the ranking data, and one performing worst or typical. For each, ask: what decision does its searcher have, and does the page answer it with specific, sourced information — or does it just substitute a name or keyword into a shared template? Compare against what's actually ranking for that query today.

Read siblings side by side rather than assuming they behave the same way — uneven visibility between near-identical pages (a comparison page vs. a pricing page, for instance) is common and usually explainable. A sibling already ranking near the top is something to protect, not rewrite.

Run the live SERP check for a candidate page's query cluster *during* investigation, not after you've already drafted the recommendation — re-run anything that decides the leading recommendation right before writing, since rankings shift. One snapshot is not a baseline; if two checks disagree, report both with the date.

### 3. Shortlist before deciding

Write down five to ten serious candidates, drawn from at least three different kinds: an underperforming existing page, real demand with no page that answers it, a winning page to protect, an access/indexing/redirect defect costing visits, or a conversion gap for visitors already arriving. For each: the evidence (query, volume, current position, date), the proposed change, who searches it and why they matter to this business, the plausible benefit, the effort, and the main uncertainty.

If a candidate's ranking in this list would change with one more lookup you haven't done, do that lookup before finalizing the order.

### 4. Choose

Prefer a bounded change that directly fixes a demonstrated problem for searchers likely to become customers, over a larger raw-volume opportunity with a weaker diagnosis. A genuine access/indexing blocker or a measured traffic loss jumps the queue ahead of anything else.

## Output

Lead with the verdict and the leading recommendation. One to three recommendations in Problem / Change / Expected-effect form. A table of the full shortlist, including the ones that didn't make the cut and why. Deliver through the `seo-report` skill.

## Guardrails

- A ranking claim behind a recommendation needs a live check made during *this* audit, not a stale cached number.
- Traffic/keyword-count estimates from third-party tools are estimates with no single observation date — say so, don't present them as measured visits.
- A page missing from a limited crawl/ranking sample is not proof it has no rankings.
