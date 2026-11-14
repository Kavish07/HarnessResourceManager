---
name: ai-prompt-research
description: Find the questions people actually ask an AI assistant about a market, how it answers them, and which sites get cited. Use when asked what people ask AI about a niche, for prompt ideas, or where a brand is missing before deciding which prompts to track long-term. Research only — it doesn't set up ongoing tracking.
tags: [seo, ai-visibility]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# AI prompt research

## Goal

Answer "what are people asking an AI assistant about my market, and who gets cited when they do?" Keyword research finds what people type into a search box; this finds what they ask a conversational assistant instead — a genuinely different demand signal, not a rebrand of the same one.

The deliverable is a short ranked list of prompt themes worth caring about: where the brand already appears, where it's missing, and which domains own the citations. Deciding to track those prompts long-term is a separate decision.

## Workflow

1. Build 5-15 candidate head terms (one to three words: the product category, the problems it solves, the use cases it names). A short, broad term returns more usable prompts than an exact long phrase — "crm" beats "best crm for small agencies."
2. Research prompts per chosen term using whatever AI-prompt/citation research tool is available. Keep to two or three terms per pass unless asked for more.
3. Group the returned prompts by intent, not by wording: learning (how something works), choosing (best-of, comparisons, alternatives), doing (how-to), and branded (names the brand or a competitor — track separately, since these measure reputation, not discovery).
4. Merge near-duplicate prompts across terms before counting, and normalize citation domains to their registrable domain (a subdomain isn't a separate source).
5. For each group, record how many distinct prompts, how many cite the project's own domain, how many mention the brand, and the handful of domains cited most often.

Be explicit about data coverage: most practical tools surface prompt/citation data for a single engine and a single market/language at a time — say which, and don't present it as universal AI demand. Never attach a search-volume-style demand number to a prompt; nobody can actually observe how often a question is asked inside a conversational assistant.

## Output

Lead with the prompt themes that matter most and where the brand is already showing up vs. missing. A table per theme: prompt count, own-domain citation rate, brand-mention rate, top citing domains. Deliver through the `seo-report` skill.

## Guardrails

- These are discovered questions and their citations, not logged real-world assistant usage — don't imply a frequency you can't observe.
- A prompt already being tracked shouldn't be re-presented as a new idea.
