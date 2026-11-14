---
name: keyword-clustering
description: Cluster keywords by search intent and map each cluster to an existing or proposed page. Use when asked to group keywords, map keywords to pages, or find keyword cannibalization.
tags: [seo]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Keyword clustering

## Goal

This is a page-mapping workflow, not a semantic-grouping exercise: group keywords into clusters and decide which existing or new page should own each one.

## Inputs

A keyword list (saved, researched, or pulled from a target domain's existing rankings), and ideally the site's existing key pages to map against.

## Workflow

1. Gather the candidate set — from a saved list, fresh research on a seed topic, or a target domain's actual ranking keywords. If first-party search-console data is connected, query it by query+page together: that's both a map of what already ranks where, and the fastest way to spot cannibalization (one query splitting clicks across multiple URLs).
2. Remove duplicates, irrelevant terms, and anything that clearly needs a different page type entirely.
3. Build clusters around intent and SERP type, not lexical similarity: same intent and similar ranking pages belong together; different intent, buyer stage, or SERP format should be split even if the words look similar.
4. For borderline terms, spot-check the live SERP for real overlap before merging or splitting a cluster.
5. Assign each cluster to an existing URL if one fits, a new-page recommendation if none does, or a do-not-target bucket if it's weak or off-strategy.
6. Call out cannibalization risk explicitly wherever the data shows it.
7. Ask before applying any tags or labels in a tracked system.

## Output

Lead with the cluster count, how many pages to create vs. update, and any cannibalization found. A table of cluster / primary keyword / intent / target page / priority. A short brief per cluster: the page type, the searcher's actual problem, and what the page needs to cover. Deliver through the `seo-report` skill.

## Guardrails

- Don't over-cluster a tiny keyword set — under ~10 usable terms, a simple map beats a forced taxonomy.
- SERP intent wins over lexical similarity, every time they disagree.
- If you don't have real URL data, label target pages as proposed, not confirmed.
