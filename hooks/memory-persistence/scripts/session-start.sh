#!/usr/bin/env bash
# SessionStart hook: surface any unfinished session-notes file from the last 7 days.
set -euo pipefail

NOTES_DIR="${HOME}/.claude/session-notes"
mkdir -p "$NOTES_DIR"

recent=$(find "$NOTES_DIR" -name '*.md' -mtime -7 2>/dev/null | sort -r)
if [ -n "$recent" ]; then
  latest=$(echo "$recent" | head -1)
  count=$(echo "$recent" | wc -l | tr -d ' ')
  echo "[memory-persistence] $count recent session-notes file(s); most recent: $latest" >&2
fi
