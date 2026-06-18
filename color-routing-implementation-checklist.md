# Distinctive Color Palette and Instant Routing Checklist

## Palette Feel

The NAFI palette is a quiet corporate system built around deep forest green, muted sage, and dusty rose. It feels stable, senior, and proprietary without leaning on black/gold luxury, generic blue SaaS, or neon tech tropes.

Deep forest green carries trust, stewardship, and systems maturity. Muted sage adds a calm operational layer, while dusty rose gives calls to action a warm, human accent that still feels boardroom-appropriate.

## Light Mode Tokens

| Token | HEX | RGB | HSL | Contrast | Usage rule |
| --- | --- | --- | --- | --- | --- |
| --color-brand-primary | #17483F | rgb(23 72 63) | hsl(169 52% 19%) | 9.55:1 on #F8F6F1 | Primary brand fields, footer, key CTAs, process markers. |
| --color-brand-secondary | #A8B6A1 | rgb(168 182 161) | hsl(100 13% 67%) | 1.97:1 on #F8F6F1 | Supporting washes, ambient depth, non-text decorative layers. |
| --color-accent | #B46F82 | rgb(180 111 130) | hsl(343 32% 57%) | 3.51:1 on #F8F6F1 | One accent for highlights, active states, and soft CTA emphasis. |
| --color-background-page | #F8F6F1 | rgb(248 246 241) | hsl(43 33% 96%) | 1.00:1 self | Page background and first paint color. |
| --color-background-surface | #FCFAF6 | rgb(252 250 246) | hsl(40 50% 98%) | 1.04:1 on #F8F6F1 | Cards, forms, image frames, and nav surface. |
| --color-background-elevated | #F1EDE4 | rgb(241 237 228) | hsl(42 32% 92%) | 1.08:1 on #F8F6F1 | Subtle elevated bands and layered backgrounds. |
| --color-text-primary | #14181C | rgb(20 24 28) | hsl(210 17% 9%) | 16.52:1 on #F8F6F1 | Headlines and body text. |
| --color-text-secondary | #66716C | rgb(102 113 108) | hsl(153 5% 42%) | 4.69:1 on #F8F6F1 | Lead copy, metadata, helper text. |
| --color-text-disabled | #9AA39E | rgb(154 163 158) | hsl(147 5% 62%) | 2.40:1 on #F8F6F1 | Disabled labels and inactive hints only. |
| --color-border-default | #DCE5DE | rgb(220 229 222) | hsl(133 15% 88%) | 1.19:1 on #F8F6F1 | Default quiet separators and card borders. |
| --color-border-strong | #B7C8BE | rgb(183 200 190) | hsl(145 13% 75%) | 1.62:1 on #F8F6F1 | Focus-adjacent dividers and active border emphasis. |
| --color-status-success | #2F7D63 | rgb(47 125 99) | hsl(160 45% 34%) | 4.59:1 on #F8F6F1 | Success validation and positive status text. |
| --color-status-warning | #8A6A2E | rgb(138 106 46) | hsl(39 50% 36%) | 4.65:1 on #F8F6F1 | Warnings that need attention without alarm. |
| --color-status-error | #9F4E62 | rgb(159 78 98) | hsl(345 34% 46%) | 5.20:1 on #F8F6F1 | Errors, invalid fields, destructive warnings. |
| --color-status-info | #466F86 | rgb(70 111 134) | hsl(202 31% 40%) | 5.01:1 on #F8F6F1 | Informational status and neutral alerts. |

## Dark Mode Tokens

| Token | HEX | RGB | HSL | Contrast | Usage rule |
| --- | --- | --- | --- | --- | --- |
| --color-brand-primary | #9BC8B7 | rgb(155 200 183) | hsl(157 29% 70%) | 9.86:1 on #13151A | Brand color in dark mode, links, and CTA text accents. |
| --color-brand-secondary | #6F7E76 | rgb(111 126 118) | hsl(148 6% 46%) | 4.28:1 on #13151A | Secondary UI depth and supporting tint. |
| --color-accent | #D69AAC | rgb(214 154 172) | hsl(342 42% 72%) | 7.89:1 on #13151A | Dark-mode highlight and active emphasis. |
| --color-background-page | #13151A | rgb(19 21 26) | hsl(223 16% 9%) | 1.00:1 self | Dark page background, never pure black. |
| --color-background-surface | #1B2024 | rgb(27 32 36) | hsl(207 14% 12%) | 1.11:1 on #13151A | Dark cards, nav, forms, and framed media. |
| --color-background-elevated | #242B2E | rgb(36 43 46) | hsl(198 12% 16%) | 1.27:1 on #13151A | Elevated dark bands and layered surfaces. |
| --color-text-primary | #F3F1EA | rgb(243 241 234) | hsl(47 27% 94%) | 16.16:1 on #13151A | Primary dark-mode text. |
| --color-text-secondary | #B7BEB8 | rgb(183 190 184) | hsl(129 5% 73%) | 9.63:1 on #13151A | Secondary dark-mode text. |
| --color-text-disabled | #78817B | rgb(120 129 123) | hsl(140 4% 49%) | 4.54:1 on #13151A | Disabled dark-mode labels and inactive text. |
| --color-border-default | #2D3A36 | rgb(45 58 54) | hsl(162 13% 20%) | 1.54:1 on #13151A | Quiet separators in dark mode. |
| --color-border-strong | #475A54 | rgb(71 90 84) | hsl(161 12% 32%) | 2.49:1 on #13151A | Stronger dividers and active border states. |
| --color-status-success | #74C69D | rgb(116 198 157) | hsl(150 42% 62%) | 8.96:1 on #13151A | Success status in dark mode. |
| --color-status-warning | #D2B16A | rgb(210 177 106) | hsl(41 54% 62%) | 8.90:1 on #13151A | Warning status in dark mode. |
| --color-status-error | #E08BA0 | rgb(224 139 160) | hsl(345 58% 71%) | 7.28:1 on #13151A | Error status in dark mode. |
| --color-status-info | #91B8CC | rgb(145 184 204) | hsl(200 37% 68%) | 8.64:1 on #13151A | Informational status in dark mode. |

## Palette Rules

- Do use forest green for authority and primary actions; do not introduce pure blue as a competing brand color.
- Do use dusty rose as the only accent; do not add red, orange, yellow, neon, or electric accents.
- Do keep surfaces one subtle step away from the page background; do not use pure white or pure black.
- Do use status colors only for status; do not reuse error or warning colors as decorative accents.
- Do keep borders quiet and brand-tinted; do not add harsh neutral gray rules.

## Implemented Static Routing Checklist

- Internal `.html` links are intercepted in `assets/js/main.js`.
- Route content is fetched with `fetch()`, parsed with `DOMParser`, and swapped by replacing only `<main>`.
- Browser history is updated with `history.pushState()` and back/forward navigation is handled with `popstate`.
- Page title and meta description are updated after each swap.
- Header navigation `aria-current` state is synchronized after each route change.
- The View Transitions API is used when available for a 200ms opacity transition.
- Browsers without View Transitions fall back to instant content replacement.
- Main navigation, nav CTA, and hero CTA pages are prefetched during idle time.
- Scroll resets instantly to the top after route changes.
- Page-level behaviors re-initialize after swaps: reveals, stats, logo marquee, form validation, magnetic buttons, and visual tilt.
- First paint background is set inline in every HTML head and in CSS on `html`/`body`.

## Next.js Migration Checklist

This repo is currently static HTML, so the Next.js-specific items are not applicable until the project is migrated to Next.js 15 App Router.

- Use the Next.js App Router exclusively.
- Use `next/link` for all route links.
- Use `useRouter()` from `next/navigation` only for programmatic navigation.
- Do not call `router.refresh()` for ordinary route changes.
- Add `experimental.viewTransition = true` in `next.config.ts`.
- Wrap page content in a route keyed Framer Motion `AnimatePresence` layer.
- Keep route transitions to a short opacity fade around 200ms.
- Use `next/font` with `display: "optional"`.
- Keep `prefetch={true}` on critical navigation links.
- Use route-segment `loading.tsx` skeletons only where async data can be slow.

## Common Reload Mistakes To Avoid

- Using plain external-style navigation for internal pages when JavaScript routing is expected.
- Calling `window.location` or `location.assign()` for in-site navigation.
- Binding buttons that submit a form accidentally instead of using `type="button"`.
- Adding `target="_self"` handlers that bypass the router.
- Replacing the entire document body and losing global state.
- Animating scroll-to-top instead of resetting it instantly.
- Adding dark or light theme backgrounds only after hydration, which causes a flash.
