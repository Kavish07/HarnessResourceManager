#!/usr/bin/env bash
# PreToolUse hook (matcher: Edit|Write): suggest /compact every COMPACT_THRESHOLD tool calls.
set -euo pipefail

THRESHOLD="${COMPACT_THRESHOLD:-50}"
COUNTER_FILE="${CLAUDE_SESSION_ID:+/tmp/claude-compact-count-${CLAUDE_SESSION_ID}}"
COUNTER_FILE="${COUNTER_FILE:-/tmp/claude-compact-count}"

count=0
[ -f "$COUNTER_FILE" ] && count=$(cat "$COUNTER_FILE")
count=$((count + 1))
echo "$count" > "$COUNTER_FILE"

if [ "$count" -eq "$THRESHOLD" ] || { [ "$count" -gt "$THRESHOLD" ] && [ $(((count - THRESHOLD) % 25)) -eq 0 ]; }; then
  echo "[strategic-compact] $count tool calls this session — if you're at a phase boundary, consider /compact" >&2
fi

exit 0
