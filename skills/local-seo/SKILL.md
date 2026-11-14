---
name: local-seo
description: Work out why a business does or doesn't show up in local map/local-pack results near its customers, and what to fix first. Use for rankings that depend on a physical location or service area; for national organic work, use competitor-analysis or keyword-research instead.
tags: [seo]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Local SEO

## Goal

Diagnose local-pack / map visibility for a specific business and location, and what to fix first.

## Inputs

The business and its location (or service-area radius), and one to three keywords real customers actually search — "emergency plumber," not the brand name.

## Workflow

1. Pull local-pack/map results for the target keywords around the business's actual location — don't substitute national organic SERP data for local-pack evidence; they can disagree sharply.
2. Compare the business's listing completeness and category accuracy against the businesses that actually appear in the local pack for those terms.
3. Identify the local competitors (by proximity and category, not just by brand recognition) and what their listings/pages do that the target doesn't.
4. Separate what's fixable on the business's own listing (categories, completeness, reviews signal) from what's about the website itself (is there a page that actually answers the local query).

## Output

Lead with the one or two reasons the business isn't showing up where it should. A table of keyword / local-pack position (or absent) / leading competitor. What to fix, split into listing fixes vs. website fixes. Deliver through the `seo-report` skill.

## Guardrails

- Don't infer local-pack strength from national organic domain metrics — use actual local/map data.
- Distinguish organic-page winners from local-pack winners; they're frequently different domains.
