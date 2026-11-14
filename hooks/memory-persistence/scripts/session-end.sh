#!/usr/bin/env bash
# Stop hook: create or refresh today's session-notes file so the next session has somewhere to pick up.
set -euo pipefail

NOTES_DIR="${HOME}/.claude/session-notes"
NOTES_FILE="${NOTES_DIR}/$(date '+%Y-%m-%d').md"
mkdir -p "$NOTES_DIR"

if [ -f "$NOTES_FILE" ]; then
  tmp="$(mktemp)"
  awk -v now="$(date '+%H:%M')" '{sub(/\*\*Last updated:\*\*.*/, "**Last updated:** " now)}1' "$NOTES_FILE" > "$tmp"
  mv "$tmp" "$NOTES_FILE"
else
  cat > "$NOTES_FILE" <<EOF
# Session notes — $(date '+%Y-%m-%d')

**Started:** $(date '+%H:%M')
**Last updated:** $(date '+%H:%M')

## In progress


## Notes for next session

EOF
fi

echo "[memory-persistence] updated $NOTES_FILE" >&2
