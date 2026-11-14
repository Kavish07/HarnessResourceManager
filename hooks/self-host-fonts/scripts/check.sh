#!/usr/bin/env bash
# PreToolUse hook for Edit/Write: blocks direct links to Google's (or other) font/style CDNs.
set -euo pipefail

input=$(cat)
text=$(echo "$input" | jq -r '[.tool_input.content, .tool_input.new_string] | map(select(. != null)) | join("\n")')

if echo "$text" | grep -qiE '(fonts\.googleapis\.com|fonts\.gstatic\.com|ajax\.googleapis\.com)'; then
  echo "Blocked: direct reference to a Google Fonts/CDN URL. Download the font file(s) into the project (e.g. assets/fonts/) and reference them with a local @font-face instead of linking fonts.googleapis.com/fonts.gstatic.com live." >&2
  exit 2
fi

exit 0
