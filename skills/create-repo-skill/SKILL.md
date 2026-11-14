---
name: create-repo-skill
description: Create or update a skill in this repository the right way — one canonical file, a consistent frontmatter shape, and every place that lists skills kept in sync. Use whenever adding a new skill, converting a workflow into a skill, or when the manifest looks out of date with the skills folder.
tags: [meta, skills]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Create a repo skill

## The layout invariant

A skill has exactly one canonical home: `skills/<kebab-name>/SKILL.md`. Every other place a skill shows up — a generated manifest, a plugin bundle, a docs page, a nav entry — is a *registration*, not a second copy. The moment a skill's content exists in two places, they drift: someone fixes a typo in the registered copy and the canonical file never learns about it, or the reverse. Treat the canonical file as the only one anyone hand-edits.

## Creating a skill

1. `mkdir skills/<kebab-name>` and write `SKILL.md` with frontmatter matching this repo's existing skills:

   ```yaml
   ---
   name: <kebab-name>            # must match the directory name
   description: <what it does, plus explicit "use when ..." triggers — this is the only field most harnesses read to decide whether to auto-load it>
   tags: [<short topic tags>]
   harnesses:
     claude-code: native
     cursor: native|shim|unknown
     codex: native|shim|unknown
   ---
   ```

2. Decide the harness compatibility by hand, per harness, not by copying the row above — judge whether the skill's technique depends on something specific to one harness (a particular tool, a particular delegation primitive) or works identically anywhere that reads a Markdown skill file.

3. Write the body to the depth the technique actually needs. A short mechanical skill is a page; a rich technique with real judgment calls can run longer. Padding to look thorough is worse than being short and correct.

4. Register it everywhere skills are listed in this repo (a generated manifest, an index page, a bundle list) — and run whatever regeneration step keeps that registry in sync, so the registration is never hand-typed out of date with the file that produced it.

## Sync check

If a skill's registered description or frontmatter ever looks like it disagrees with its own `SKILL.md`, the canonical file wins. Fix the registration by regenerating it from the file, never by hand-editing the registry to match what you think the file says.
