---
name: mobile-uiux
description: Design, generate, or audit a native or cross-platform mobile app UI (Flutter, React Native, SwiftUI, Jetpack Compose, native iOS/Android). Use when building or reviewing a mobile screen — distinct from the web-focused skills/accessibility and skills/designer, which don't cover touch ergonomics, platform HIG/Material conventions, or foldable layouts.
tags: [design, mobile, accessibility]
harnesses:
  claude-code: native
  cursor: native
  codex: native
---

# Mobile UI/UX

Before emitting any mobile screen, reason through this checklist out loud (platform/framework choice, then generate, then self-audit against the same list) rather than designing first and checking later.

## Pre-generation checklist

1. **User goal** — what is this screen for, and what's the one primary action?
2. **Platform paradigm** — iOS (HIG, Liquid Glass) vs. Android (Material 3 Expressive) vs. a deliberately adaptive cross-platform look. Don't default to one platform's conventions on the other.
3. **Thumb reach** — primary actions sit in the bottom natural thumb zone; destructive actions sit outside the resting-thumb arc and require confirmation.
4. **Touch targets** — minimum 44pt (iOS) / 48dp (Android), at least 8dp apart.
5. **All seven states** — ideal, empty (first-use, no-results, cleared), loading, error, offline, success, permission-denied. A screen with only the happy-path state isn't done.
6. **Accessibility** — contrast ratios (4.5:1 text, 3:1 large text/UI), labels + roles + state on every control, a sane focus order, Dynamic Type support, a reduce-motion path, and no meaning conveyed by color alone.
7. **Dark mode** — every token resolves correctly in both themes; check contrast per theme, not just once.
8. **Motion** — purposeful durations/easing, always with a reduce-motion fallback.
9. **Gestures and safe areas** — never override the system back/home gesture; read safe-area insets dynamically; no critical action that's gesture-only with no visible alternative.
10. **Localization and RTL** — no string concatenation (breaks translation); layout and directional icons mirror under RTL; leave ~30% text-expansion headroom.
11. **Responsive/foldable** — behave correctly across compact (<600dp), medium (600–839dp), and expanded (≥840dp, typically two-pane) size classes.
12. **Tokens, not literals** — reference the project's semantic design tokens for color/spacing/radius; zero hardcoded values.
13. **Performance** — reuse platform-native components, virtualize long lists, animate only `transform`/`opacity` to hold the 16ms frame budget.

## Rule

A screen that only covers the ideal/happy-path state, or that hardcodes a color/spacing value instead of using a token, isn't finished — treat both as a blocking gap, not a nice-to-have.

## Report

Platform/framework choice and why, which of the 13 checklist points required a real decision (not just "satisfied by default"), and anything intentionally deferred (e.g. RTL out of scope for this project) with a one-line reason.
