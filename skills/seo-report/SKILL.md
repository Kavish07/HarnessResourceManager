---
name: seo-report
description: Turn finished SEO research into one disciplined, scannable deliverable instead of a chat wall of text. Use when an SEO research skill has finished and needs to hand off its findings, or whenever the user asks for a report, check-in, or summary of research.
tags: [seo, writing]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# SEO report

Chat gets three things: the verdict, the leading recommendation with its expected benefit, and a link or pointer to the full deliverable. The deliverable gets everything else. Every SEO research skill that produces a recommendation hands off through this discipline rather than narrating its findings into chat.

## Writing rules

- **Notes, not essays.** The reader scans. A recommendation is a heading and three short bullets: **Problem** (what's true, with evidence), **Change** (the step, and how it addresses the problem), **Expected effect** (what could improve, why it matters, and the likely scale and uncertainty). No paragraph runs past two sentences.
- **Make the reasoning visible.** Cite numbers and specific pages, not vague claims. Explain the mechanism in plain language instead of a generic phrase like "builds trust." Distinguish a measured outcome from an estimate from a hypothesis.
- **Be honest about confidence.** Say which numbers came from a tool and which you verified by hand. Something you couldn't check gets a one-line caveat, not silence.
- **Plain language.** Gloss any term of art on first use. No filler, no drama words.
- **One spine.** Lead with the verdict and its business implication, then the material findings. If the research doesn't establish a worthwhile action, say that plainly instead of padding to twenty findings — a report with twenty findings has failed.
- **Print the numbers next to any chart.** A chart that carries a value not also written out in text is not trustworthy on its own.

## Structure

1. A one-line verdict and its business implication.
2. One to three prioritized recommendations in the Problem / Change / Expected effect shape above — or, for a purely descriptive finding, whichever subset of that shape applies. Don't invent a fix where none is warranted.
3. Supporting evidence as compact tables — five columns or fewer, numeric columns right-aligned, long text in the last column.
4. A short "what else we checked" list for real candidates that didn't make the cut, each with the one-line reason.
5. A closing note on how the report was made: what tool or source produced which numbers, and what you verified yourself.

## Guardrails

- Don't restate the report's content in chat — three bullets and a pointer is the ceiling.
- Don't invent a number to fill a gap. Write "unknown" and say why.
- Don't save a near-duplicate report for research you're merely correcting — replace the existing one instead of piling up copies for the same subject and period.
