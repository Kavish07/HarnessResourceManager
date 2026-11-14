#!/usr/bin/env bash
# PreCompact hook: stamp today's session-notes file so it's clear context was summarized.
set -euo pipefail

NOTES_DIR="${HOME}/.claude/session-notes"
NOTES_FILE="${NOTES_DIR}/$(date '+%Y-%m-%d').md"
mkdir -p "$NOTES_DIR"

if [ -f "$NOTES_FILE" ]; then
  printf '\n---\n**[compacted at %s]**\n' "$(date '+%H:%M')" >> "$NOTES_FILE"
fi

echo "[memory-persistence] noted compaction in $NOTES_FILE" >&2
