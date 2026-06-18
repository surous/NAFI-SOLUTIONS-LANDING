# Premium Software Solution Company Website Blueprint

This document defines the production-ready foundation for a five-page premium software solution company website. It is written for a cross-functional team of product owners, designers, engineers, content strategists, QA, and growth stakeholders who need a shared source of truth before implementation begins.

## 1. Development Roadmap

### Phase 1: Discovery and Planning

| Timeline | Roles | Outcomes |
| --- | --- | --- |
| 1-2 weeks | Product Lead, Design Director, UX Researcher, Technical Lead, Content Strategist | Business goals, user segments, sitemap, content model, wireframes, moodboard, success metrics |

**Workstreams**

- Define primary conversion goals: quote request, consultation booking, service inquiry, talent trust, enterprise credibility.
- Confirm the five-page sitemap: Home, About Us, Services / Solutions, Testimonials & Reviews, Contact / Get a Quote.
- Interview stakeholders and 3-5 target buyers to identify trust triggers, objections, and procurement requirements.
- Create low-fidelity wireframes for desktop, tablet, and mobile.
- Define content hierarchy: executive headline, proof, services, process, testimonials, conversion routes.
- Build a moodboard referencing Stripe for clarity, Linear for restraint, Apple for spatial confidence, Framer for motion, and Pentagram for editorial discipline.

**Exit criteria**

- Approved sitemap and page goals.
- Approved wireframes.
- Approved visual direction.
- Defined performance, accessibility, SEO, and conversion KPIs.

### Phase 2: Premium Design System Setup

| Timeline | Roles | Outcomes |
| --- | --- | --- |
| 2-3 weeks | Design Director, UI Designer, Accessibility Specialist, Frontend Lead | Tokens, components, motion language, accessibility rules, design QA checklist |

**Workstreams**

- Establish light and dark mode tokens for color, typography, spacing, radius, elevation, and motion.
- Define component variants for navigation, buttons, cards, forms, testimonial modules, footer, and mobile menu.
- Build component states: default, hover, focus-visible, active, loading, disabled, error, success.
- Create motion rules for entrance reveals, page transitions, hover behavior, loading states, and reduced-motion fallback.
- Create Figma component library with variants mapped to engineering tokens.

**Exit criteria**

- Token library approved by design and engineering.
- Core components approved across desktop and mobile.
- Accessibility pass for contrast, focus states, touch targets, labels, and reduced motion.

### Phase 3: Frontend Architecture

| Timeline | Roles | Outcomes |
| --- | --- | --- |
| 2-3 weeks | Frontend Lead, Frontend Engineer, Design Engineer, SEO Specialist | Application shell, routing, component architecture, performance budget, baseline SEO |

**Workstreams**

- Build with Next.js App Router using static generation for marketing pages and server actions/API routes for forms.
- Implement token-driven styling through CSS custom properties and Tailwind CSS.
- Create route-level metadata, Open Graph images, sitemap, robots.txt, canonical URLs, and JSON-LD.
- Define performance budgets: LCP under 2.0s, CLS under 0.05, INP under 200ms, total JS under 180KB compressed per first page where feasible.
- Implement responsive layouts with a 12-column desktop grid and 4-column mobile grid.

**Exit criteria**

- Pages route correctly.
- Components consume shared tokens.
- Lighthouse baseline: 95+ performance, 100 accessibility target, 95+ SEO.
- Critical rendering path reviewed.

### Phase 4: Backend / CMS Integration

| Timeline | Roles | Outcomes |
| --- | --- | --- |
| 2 weeks | Backend Engineer, Frontend Engineer, Content Strategist, Security Reviewer | CMS schemas, form handling, email routing, spam protection, draft-preview workflow |

**Workstreams**

- Model CMS content for team members, services, testimonials, office locations, trust logos, and site settings.
- Implement preview mode for editorial review.
- Build contact and quote forms with schema validation, spam protection, rate limiting, and CRM-ready payloads.
- Send transactional emails to the visitor and internal notification emails to sales.
- Store form submissions in a secure backend or CRM, not in email only.

**Exit criteria**

- CMS preview and publishing workflow approved.
- Forms validated server-side and client-side.
- Email and CRM delivery tested.
- Security and privacy checks complete.

### Phase 5: Testing and QA

| Timeline | Roles | Outcomes |
| --- | --- | --- |
| 1-2 weeks | QA Engineer, Frontend Engineer, Accessibility Specialist, Design Director | Automated and manual QA, visual regression, accessibility report, performance report |

**Workstreams**

- Unit test utilities, form validation, token helpers, and CMS mappers.
- Integration test page rendering, route metadata, form submission, and error states.
- Run Playwright tests for critical journeys: mobile navigation, quote form, service inquiry, testimonial browsing.
- Run axe, keyboard-only navigation, screen reader smoke tests, and reduced-motion review.
- Run visual regression tests against approved designs.

**Exit criteria**

- No critical or high severity defects.
- No known WCAG 2.1 AA blockers.
- Visual QA approved by design.
- Form submissions confirmed in staging.

### Phase 6: Deployment and Monitoring

| Timeline | Roles | Outcomes |
| --- | --- | --- |
| 1 week initial, ongoing thereafter | DevOps Engineer, Frontend Lead, Growth Lead, Product Lead | CI/CD, production hosting, analytics, monitoring, alerting |

**Workstreams**

- Deploy previews for every pull request.
- Gate production deploys with typecheck, lint, unit tests, Playwright smoke tests, and visual checks.
- Configure analytics, event tracking, error monitoring, uptime checks, and Web Vitals reporting.
- Create rollback procedure and incident contacts.
- Build monthly reporting dashboard for conversion, performance, traffic quality, and form quality.

**Exit criteria**

- Production deployment complete.
- Monitoring and alerts active.
- Analytics verified.
- Rollback tested.

## 2. Technology Stack

| Layer | Recommendation | Why It Fits | Trade-offs |
| --- | --- | --- | --- |
| Frontend framework | Next.js 15+ with React and App Router | Strong static rendering, route metadata, image optimization, server actions, excellent Vercel path | Framework conventions must be followed carefully; upgrades need regression checks |
| Language | TypeScript | Safer component contracts, CMS typing, form validation confidence | Adds upfront typing discipline |
| Styling | Tailwind CSS plus CSS custom properties | Fast DX, token-driven theming, low runtime cost, predictable responsive work | Requires design-token discipline to avoid utility sprawl |
| Component primitives | Radix UI | Accessible menus, dialogs, accordions, tabs, and form controls | Visual styling is still custom work |
| Motion | Framer Motion for React UI; GSAP only for complex timeline scenes | Framer Motion is ideal for page transitions and component micro-interactions; GSAP remains optional for advanced hero choreography | Framer can add JS weight; use motion only where it improves comprehension |
| CMS | Sanity | Strong editorial workflow, structured content, real-time preview, flexible schemas | Hosted SaaS dependency; schema governance matters |
| Validation | Zod | Shared schemas for client, server, and form payloads | Requires thoughtful error mapping for polished UX |
| Forms | React Hook Form plus server action/API route | Fast, accessible, minimal re-rendering, robust validation path | Needs careful handling of async states |
| Email | Resend | Clean API, good DX, React email templates | Delivery reputation and domain setup must be monitored |
| CRM routing | HubSpot or Salesforce integration layer | Enterprise sales teams need owned pipeline data | Adds API complexity and data governance requirements |
| Hosting/CDN | Vercel Edge Network | Excellent Next.js support, deploy previews, image optimization, global CDN | Platform coupling; budget review needed at scale |
| Analytics | PostHog plus Vercel Analytics | Product events, funnels, session insights, and Web Vitals | Privacy configuration must be explicit |
| Error monitoring | Sentry | Client/server error visibility, source maps, release tracking | Needs alert tuning to avoid noise |
| Uptime | Better Stack | Uptime checks, incident timeline, status page | Another vendor in the stack |
| Visual testing | Chromatic or Percy with Playwright | Catches premium UI regressions before production | Requires stable snapshots and design ownership |
| Accessibility testing | axe-core, Playwright, manual screen reader QA | Automated and manual coverage for WCAG 2.1 AA | Automated checks cannot replace manual judgment |

### Modern Stack and Advanced Animation Requirement

The production build must use exclusively modern, premium-grade technologies current to the 2024-2025 implementation window. The stack is mandatory unless a stakeholder-approved architecture decision record documents a specific exception.

| Area | Required Choice | Implementation Notes |
| --- | --- | --- |
| Framework | Next.js 15 App Router | Use React Server Components, static generation where suitable, and Partial Prerendering for high-value landing routes. |
| Language | TypeScript 5 strict mode | `strict: true` with no file-level opt-outs. |
| Styling | Tailwind CSS v4 plus CSS custom properties | CSS variables remain the source for design tokens; Tailwind consumes them. |
| Primary animation | GSAP 3 with ScrollTrigger, SplitText, and Flip | Use for timeline choreography, scroll-linked motion, pinned sections, and text reveals. |
| Declarative animation | Framer Motion v11 | Use for route transitions, layout animation, and React state-driven component transitions. |
| 3D / WebGL | Three.js or React Three Fiber | Use for hero background scenes or lightweight interactive visual systems. Lazy-load heavy scenes. |
| Smooth scrolling | Lenis | Initialize client-side only; respect reduced motion. |
| State | Zustand | Use for lightweight UI state such as menu, theme, cursor mode, and page transition state. |
| CMS | Sanity v3 | Model team profiles, services, testimonials, trust logos, locations, and site settings with GROQ queries. |
| Forms | React Hook Form plus Zod | Share schemas between client validation and server-side submission validation. |
| Email | Resend | Send visitor confirmation and internal sales notification emails. |
| Hosting | Vercel | Enable Analytics and Speed Insights. |
| Version control and CI/CD | GitHub and GitHub Actions | Gate deploys with typecheck, lint, Vitest, Playwright, and accessibility checks. |
| Testing | Vitest, Playwright, axe-core | Cover unit behavior, critical journeys, accessibility, and regression-prone UI states. |
| Package manager | pnpm | Use committed lockfile and workspace scripts. |

#### Required Animation and Interaction Patterns

- Scroll-driven section entrances: fade and translate upward on viewport entry, with staggered children.
- Horizontal scroll sections: GSAP ScrollTrigger pinned panels that move horizontally through solution or case-study content.
- Hero parallax: background depth layer moves at 0.3x scroll speed while foreground content remains near 1x.
- Scroll progress: top-of-page progress indicator tied to document scroll.
- Counter animations: metric values count up once when visible.
- Text reveal: headline words or characters reveal line by line with GSAP SplitText.
- Hero background: animated mesh gradient or particle field using Three.js or React Three Fiber.
- CTA load motion: primary CTA pulses subtly once, then settles.
- Floating UI mockup: hero device or product frame gently bobs and rotates using transform-only animation.
- Magnetic buttons: CTA buttons follow the cursor inside a small interaction radius.
- Service cards: hover lift to `translateY(-8px)`, glow border, and icon scale.
- Navigation links: underline enters from the left with `scaleX`.
- Team cards: overlay slides from the bottom to reveal social links.
- Logo strip: infinite marquee, paused on hover.
- Page transitions: Framer Motion `AnimatePresence` clip-path wipe or opacity dissolve between routes, with a short branded overlay.
- First load sequence: logo, navigation, headline, CTA, and background animate in as a coordinated timeline.
- Desktop cursor: custom lerp-follow circle that morphs on links, images, and CTAs; disabled on touch devices.
- Loading states: branded preloader capped at 1.5 seconds, CMS skeleton states, optimistic form submission, animated success state.
- Form interactions: floating labels, real-time validation, animated success/error state, submit loading spinner, success checkmark, and quote form slide-in from the CTA.

#### Animation Performance Rules

- Animate only GPU-friendly properties: `transform` and `opacity`.
- Use `will-change` only on elements that are actively animating.
- Kill all GSAP `ScrollTrigger` instances and timelines on component unmount.
- Wrap motion behavior in a `prefers-reduced-motion` check and provide static alternatives.
- Lazy-load Three.js, React Three Fiber, GSAP plugins, and other heavy animation modules with `dynamic import()`.
- Target 60fps. Audit animation-heavy pages with Chrome DevTools Performance before release.

#### Code Example: GSAP Scroll Entrance

```tsx
"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !scope.current) return;

    const context = gsap.context(() => {
      gsap.from("[data-reveal]", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: scope.current,
          start: "top 78%",
          once: true,
        },
      });
    }, scope);

    return () => context.revert();
  }, []);

  return <div ref={scope}>{children}</div>;
}
```

#### Code Example: Magnetic Button

```tsx
"use client";

import { useRef } from "react";
import type { ComponentProps, PointerEvent } from "react";
import gsap from "gsap";

type MagneticButtonProps = ComponentProps<"button">;

export function MagneticButton({ children, ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function handlePointerMove(event: PointerEvent<HTMLButtonElement>) {
    const button = buttonRef.current;
    if (!button || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * 0.18,
      y: y * 0.24,
      duration: 0.35,
      ease: "power3.out",
      overwrite: true,
    });
  }

  function handlePointerLeave() {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.45, ease: "elastic.out(1, 0.45)" });
  }

  return (
    <button ref={buttonRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} {...props}>
      {children}
    </button>
  );
}
```

#### Code Example: App Router Page Transition

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
        animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
        exit={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
```

## 3. Premium UI/UX Design System

### A. Premium Color Palette

Color is distinctive, calm, and proprietary. The palette uses deep forest green, muted sage, dusty rose, warm off-whites, and dark slate surfaces; it avoids black/gold luxury cues, navy/gold corporate cliches, pure white, pure black, royal blue, and neon tech accents.

The complete token table, contrast ratios, psychology notes, and usage rules live in `color-routing-implementation-checklist.md`.

**Accessibility rules**

- Body text must use Text on Background or Text on Surface.
- Accent may be used for text only where the table shows 4.5:1 or higher.
- Borders used as control boundaries must meet 3:1 against adjacent surfaces.
- Error, warning, and success states must include icon, label, and explanatory copy.
- Validate final pairings in Colour Contrast Analyser and axe after implementation.

#### CSS Token Snippet

```css
:root {
  color-scheme: light dark;
  --color-brand-primary: #17483f;
  --color-brand-secondary: #a8b6a1;
  --color-accent: #b46f82;
  --color-background-page: #f8f6f1;
  --color-background-surface: #fcfaf6;
  --color-background-elevated: #f1ede4;
  --color-text-primary: #14181c;
  --color-text-secondary: #66716c;
  --color-text-disabled: #9aa39e;
  --color-border-default: #dce5de;
  --color-border-strong: #b7c8be;
  --color-status-success: #2f7d63;
  --color-status-warning: #8a6a2e;
  --color-status-error: #9f4e62;
  --color-status-info: #466f86;
}

[data-theme="dark"] {
  color-scheme: dark;
  --color-brand-primary: #9bc8b7;
  --color-brand-secondary: #6f7e76;
  --color-accent: #d69aac;
  --color-background-page: #13151a;
  --color-background-surface: #1b2024;
  --color-background-elevated: #242b2e;
  --color-text-primary: #f3f1ea;
  --color-text-secondary: #b7beb8;
  --color-text-disabled: #78817b;
  --color-border-default: #2d3a36;
  --color-border-strong: #475a54;
  --color-status-success: #74c69d;
  --color-status-warning: #d2b16a;
  --color-status-error: #e08ba0;
  --color-status-info: #91b8cc;
}
```

### B. Luxury Typography System

**Recommended pairing**

- Editorial serif: Canela, Editorial New, or Tiempos Headline.
- Geometric sans-serif: Satoshi, Plus Jakarta Sans, or Söhne.
- Monospace: IBM Plex Mono or Berkeley Mono.

Use licensed fonts for production. If budget or legal review delays licensing, use `Fraunces` for the serif and `Plus Jakarta Sans` for UI as an open-source fallback.

| Level | Font | Size | Weight | Line Height | Letter Spacing |
| --- | --- | --- | --- | --- | --- |
| Display | Editorial serif | clamp(3.75rem, 8vw, 7.5rem) | 500 | 0.95 | 0 |
| H1 | Editorial serif | clamp(3rem, 6vw, 5.75rem) | 500 | 1.00 | 0 |
| H2 | Editorial serif | clamp(2.25rem, 4vw, 4rem) | 500 | 1.05 | 0 |
| H3 | Editorial serif | clamp(1.75rem, 3vw, 2.75rem) | 500 | 1.12 | 0 |
| H4 | Geometric sans | 1.5rem | 650 | 1.25 | 0 |
| Body | Geometric sans | 1rem | 400 | 1.65 | 0 |
| Body Large | Geometric sans | 1.125rem | 400 | 1.65 | 0 |
| Caption | Geometric sans | 0.875rem | 500 | 1.45 | 0 |
| Label | Geometric sans | 0.875rem | 650 | 1.2 | 0.02em |
| Mono | Monospace | 0.875rem | 500 | 1.5 | 0 |

**Page-specific usage**

- Homepage: serif for the hero and major proof statements; sans-serif for CTAs, service cards, and trust metrics.
- About Us: serif for mission and values; sans-serif for team profiles and operational clarity.
- Services / Solutions: sans-serif leads for scannability; serif reserved for section openers and strategic positioning.
- Testimonials & Reviews: serif for large client quotes; sans-serif for attribution, rating details, and filters.
- Contact / Get a Quote: sans-serif dominant for speed and clarity; serif only for a concise trust headline.

```css
:root {
  --font-serif: "Canela", "Editorial New", "Fraunces", Georgia, serif;
  --font-sans: "Satoshi", "Plus Jakarta Sans", Inter, system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;

  --type-display: clamp(3.75rem, 8vw, 7.5rem);
  --type-h1: clamp(3rem, 6vw, 5.75rem);
  --type-h2: clamp(2.25rem, 4vw, 4rem);
  --type-h3: clamp(1.75rem, 3vw, 2.75rem);
  --type-body: 1rem;
  --type-caption: 0.875rem;
}
```

### C. Motion and Interaction Design

**Motion language**

- Principle: motion reveals structure, confirms action, and creates spatial continuity.
- Default ease: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Entrance duration: 500-700ms.
- Micro-interaction duration: 120-220ms.
- Page transition duration: 280-420ms.
- Stagger: 55-90ms between related items.

**Motion patterns**

- Section reveal: opacity 0 to 1, y 24px to 0, once per viewport entry.
- Hero background: subtle light sweep or slow mesh movement, never more than 8 percent opacity shift.
- Counters: count up only when visible; show final value instantly for reduced motion.
- Cards: translateY(-4px), border color shift, shadow increase, no dramatic scaling.
- Buttons: 1px lift, subtle sheen on primary variant, loading spinner with accessible label.
- Nav links: underline grows from 0 to 100 percent with 180ms duration.
- Images: reveal through soft clip-path or opacity, with alt text present.
- Page transitions: fade plus 8px vertical movement; avoid full-screen blocking transitions.
- Cursor effects: optional only on desktop pointer devices; magnetic buttons must be mild and disabled for reduced motion.

```ts
export const motion = {
  ease: [0.16, 1, 0.3, 1],
  durations: {
    micro: 0.16,
    reveal: 0.62,
    page: 0.34,
  },
  reveal: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
};
```

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

### D. Premium Component Design Rules

**Navigation**

- Use a sticky bar with an opaque fallback and restrained glass effect only after scroll.
- Desktop: logo left, primary links center or left-aligned after logo, CTA right.
- Mobile: 44x44px menu trigger, full-height menu sheet, visible close button, focus trap.
- Keyboard: tab order follows visual order; Escape closes menus; current page uses `aria-current="page"`.

**Hero**

- Full first viewport with the main headline, strategic subcopy, CTA pair, and trust signal.
- Use editorial serif for the headline.
- Use an animated abstract technical background or real office/product image treatment with dark/light overlay.
- The next section should be slightly visible on common desktop and mobile heights to encourage scrolling.

**Buttons**

- Primary: filled, high contrast, used for quote and consultation actions.
- Secondary: outlined or tonal, used for learn-more paths.
- Ghost: navigation or low-emphasis actions.
- Icon-only: minimum 44x44px, always with `aria-label` and tooltip.
- Loading state: disable duplicate submission, preserve width, show spinner plus text for non-icon buttons.
- Focus state: visible ring using `--focus-ring`, never remove outline without replacement.

**Cards**

- Radius: 8px maximum unless a brand refresh explicitly changes it.
- Service cards: concise title, outcome-led copy, technology tags, icon.
- Team cards: portrait, name, role, concise bio, LinkedIn icon.
- Testimonial cards: quote, rating, client name, company, role, logo.
- Hover: slight lift, border refinement, media brightening; no large scale jumps.

**Forms**

- Use floating or persistent labels; never placeholder-only labels.
- Validate inline after blur and on submit.
- Error state: red tone, icon, short message, `aria-describedby`.
- Success state: confirmation message, expected response time, alternate contact route.
- Inputs have 44px minimum height and clear focus states.
- Contact form fields: name, work email, company, budget range, service interest, project timeline, message, consent checkbox.

**Testimonials**

- Lead with one large editorial quote.
- Use visible rating labels such as "5.0 out of 5" rather than icons alone.
- Include client logo strip with accessible text alternatives.
- Add trust signals: delivery metrics, security badges, platform certifications, case-study links.

**Footer**

- Structured columns: Company, Services, Resources, Contact, Legal.
- Include newsletter input only if there is a real publishing plan.
- Include social icons with text labels for screen readers.
- Legal links: Privacy Policy, Terms, Cookie Policy, Accessibility Statement.

### E. Spacing, Grid, and Layout Rules

| Token | Value | Usage |
| --- | --- | --- |
| 0 | 0 | Reset and flush alignment |
| 1 | 4px | Hairline gaps, compact icon spacing |
| 2 | 8px | Base unit, small component gaps |
| 3 | 12px | Input internals, small clusters |
| 4 | 16px | Standard component padding |
| 6 | 24px | Card padding, form groups |
| 8 | 32px | Section subgroups |
| 12 | 48px | Compact section rhythm |
| 16 | 64px | Standard section rhythm |
| 24 | 96px | Premium section spacing |
| 32 | 128px | Major page breaks |

**Layout**

- Max content width: 1280px.
- Desktop grid: 12 columns, 24px gutters.
- Tablet grid: 8 columns, 20px gutters.
- Mobile grid: 4 columns, 16px gutters.
- Mobile side padding: 20px minimum.
- Section vertical padding: 96-128px desktop, 64-96px tablet, 48-72px mobile.
- Avoid cards inside cards; use full-width bands or unframed content groups for sections.

```ts
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  12: "3rem",
  16: "4rem",
  24: "6rem",
  32: "8rem",
};
```

### F. Universal Accessibility Rules

- Meet WCAG 2.1 AA for text contrast, control contrast, keyboard support, labels, and error identification.
- Every interactive element must have a visible label or accessible name.
- Use semantic HTML first: `header`, `nav`, `main`, `section`, `article`, `footer`, `button`, `form`.
- Add ARIA only when native semantics are insufficient.
- Focus order must match visual order.
- Focus rings are always visible.
- Touch targets must be at least 44x44px.
- All images need meaningful alt text, decorative empty alt, or caption context.
- Form errors must be announced with `aria-live` or field-level associations.
- All motion must respect `prefers-reduced-motion`.
- Do not communicate status by color alone.
- Run axe, Lighthouse, keyboard-only testing, screen reader smoke testing, and Colour Contrast Analyser before launch.

## 4. Folder and Component Structure

```txt
src/
  app/
    (marketing)/
      page.tsx
      about/
        page.tsx
      services/
        page.tsx
      testimonials/
        page.tsx
      contact/
        page.tsx
    api/
      contact/
        route.ts
    layout.tsx
    globals.css
    sitemap.ts
    robots.ts
  components/
    atoms/
      button.tsx
      icon-button.tsx
      input.tsx
      textarea.tsx
      badge.tsx
      logo.tsx
    molecules/
      nav-link.tsx
      service-card.tsx
      team-card.tsx
      testimonial-card.tsx
      quote-form-field.tsx
      rating.tsx
    organisms/
      site-header.tsx
      mobile-menu.tsx
      hero-section.tsx
      service-overview.tsx
      testimonial-feature.tsx
      quote-form.tsx
      logo-strip.tsx
      site-footer.tsx
    layouts/
      marketing-shell.tsx
      section.tsx
      grid.tsx
  content/
    page-copy.ts
    navigation.ts
  hooks/
    use-prefers-reduced-motion.ts
    use-mounted.ts
  lib/
    analytics.ts
    cms.ts
    email.ts
    seo.ts
    validation.ts
  styles/
    tokens/
      colors.ts
      typography.ts
      spacing.ts
      motion.ts
      radius.ts
      shadows.ts
    theme.css
  assets/
    images/
    logos/
    icons/
  tests/
    e2e/
      contact-form.spec.ts
      navigation.spec.ts
    accessibility/
      axe.spec.ts
```

**Naming conventions**

- Files: kebab-case, for example `service-card.tsx`.
- React components: PascalCase, for example `ServiceCard`.
- Hooks: camelCase export with `use` prefix, file in kebab-case.
- Tokens: named exports from domain files.
- Tests: colocate small unit tests or place journey tests under `tests/e2e`.

**Component hierarchy**

```txt
MarketingShell
  SiteHeader
    Logo
    NavLink
    Button
    MobileMenu
  main
    HeroSection
      Button
      LogoStrip
    Section
      ServiceOverview
        ServiceCard
          Badge
      TestimonialFeature
        TestimonialCard
        Rating
      QuoteForm
        QuoteFormField
        Input
        Textarea
        Button
  SiteFooter
    Logo
    NavLink
    NewsletterForm
```

**Design token structure**

```ts
// styles/tokens/colors.ts
export const colors = {
  light: {
    primary: "#071A2E",
    secondary: "#335C81",
    accent: "#72522A",
    background: "#F8F5EF",
    surface: "#FFFFFF",
    text: "#111827",
    border: "#8A8174",
  },
  dark: {
    primary: "#F4F1EA",
    secondary: "#D8DDE6",
    accent: "#D6B16A",
    background: "#06080C",
    surface: "#10151D",
    text: "#F4F1EA",
    border: "#667085",
  },
} as const;
```

```ts
// styles/tokens/typography.ts
export const typography = {
  font: {
    serif: "var(--font-serif)",
    sans: "var(--font-sans)",
    mono: "var(--font-mono)",
  },
  scale: {
    display: "clamp(3.75rem, 8vw, 7.5rem)",
    h1: "clamp(3rem, 6vw, 5.75rem)",
    h2: "clamp(2.25rem, 4vw, 4rem)",
    h3: "clamp(1.75rem, 3vw, 2.75rem)",
    body: "1rem",
    caption: "0.875rem",
  },
} as const;
```

```ts
// styles/tokens/motion.ts
export const motionTokens = {
  ease: "cubic-bezier(0.16, 1, 0.3, 1)",
  duration: {
    micro: "160ms",
    reveal: "620ms",
    page: "340ms",
  },
  stagger: {
    tight: "55ms",
    default: "80ms",
  },
} as const;
```

## 5. Premium Design Principles

1. **Every empty space is intentional.** Use spacing to signal hierarchy, calm, and confidence. Never fill space because it is available.
2. **Motion reveals, never distracts.** Animation must clarify state, sequence, or relationship. Decorative motion must be subtle and removable.
3. **Typography carries the brand personality.** Serif creates authority and editorial distinction; sans-serif creates operational clarity.
4. **Trust is visible before it is claimed.** Show proof through logos, quotes, certifications, metrics, case-study links, and polished interaction quality.
5. **Luxury is restraint plus precision.** Use fewer colors, fewer effects, tighter alignment, stronger copy, and better spacing.
6. **Every action has a clear next step.** CTA language, form feedback, and navigation labels should reduce decision friction.
7. **Accessibility is part of the premium experience.** High-end design is readable, keyboard-friendly, screen-reader compatible, and respectful of motion preferences.

## Page-Level Content Architecture

### Homepage

- Hero: strategic positioning, primary CTA, secondary CTA, trust signal.
- Value proposition: 3-4 outcome-led pillars.
- Service overview: software engineering, product strategy, cloud architecture, AI integration, support.
- Proof band: logos, metrics, certifications.
- Featured testimonial.
- Final CTA.

### About Us

- Mission and vision.
- Company story.
- Values.
- Leadership and team profiles.
- Operating principles and delivery model.
- Culture proof: certifications, community, hiring standards.

### Services / Solutions

- Service categories with outcomes, deliverables, timelines, and technology stack.
- Process overview: discover, design, build, launch, optimize.
- Technology stack section: frontend, backend, cloud, data, AI, security.
- Engagement models: project, retainer, dedicated team, advisory.
- CTA for quote or consultation.

### Testimonials & Reviews

- Featured executive quote.
- Review grid with rating, company, role, service category, and result.
- Logo strip.
- Measurable outcomes.
- Case-study links where available.
- CTA for references or consultation.

### Contact / Get a Quote

- Quote form with progressive disclosure if needed.
- Direct email and phone.
- Office locations with local time and maps link.
- Live chat entry point.
- Response time expectation.
- Privacy and consent statement.

## Implementation Quality Bar

- LCP under 2.0s on key pages.
- CLS under 0.05.
- INP under 200ms.
- Lighthouse accessibility target: 100.
- All forms work without JavaScript enhancement where practical or provide robust fallback.
- No text below 12px; body minimum is 16px.
- No color-only communication.
- No unlabelled icon buttons.
- No nested cards.
- No animation without reduced-motion fallback.
- No production launch without visual regression and keyboard QA.
