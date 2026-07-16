# Janpol Hidalgo Portfolio Design System

## 1. Atmosphere & Identity

A quiet developer notebook with the confidence of a printed calling card. The site is narrow, direct, and content-first. Home uses an offset personal index: direct biography copy faces a compact portrait-and-map rail, followed by sparse experience, project, and account shelves. Design variance is 6, motion intensity is 3, and visual density is 4.

Reference synthesis:

- `andrianllmm.dev`: 52px sticky header, roughly 800px personal column, compact portrait, direct biography, compact navigation, and dark/light system behavior.
- User screenshot: 152px profile-media scale, short introductory stack, plain text links, and no decorative dashboard chrome.
- `timeoutcard.com`: close-tracked medium-weight display type, high headline/body contrast, and decisive monochrome surfaces.
- Existing portfolio: all copy, routes, personal data, project data, note content, and owned imagery remain authoritative.

## 2. Color

| Role | Token | Light | Dark | Usage |
|---|---|---|---|---|
| Canvas | `--surface-primary` | `#F7F7F3` | `#10100F` | Page background |
| Surface | `--surface-secondary` | `#EFEFE9` | `#191918` | Quiet grouped content |
| Elevated | `--surface-elevated` | `#FFFFFF` | `#222220` | Menus and interactive panels |
| Ink | `--text-primary` | `#171715` | `#F0F0EA` | Headings and body |
| Muted ink | `--text-secondary` | `#66665F` | `#A8A89F` | Metadata and supporting copy |
| Faint ink | `--text-tertiary` | `#8C8C84` | `#7D7D76` | Disabled and placeholders |
| Hairline | `--border-default` | `#D8D8D0` | `#333330` | Rules and outlines |
| Quiet hairline | `--border-subtle` | `#E6E6DF` | `#282826` | Internal separators |
| Cobalt | `--accent-primary` | `#1557C0` | `#75A7F7` | Links, focus, selected states |
| Cobalt hover | `--accent-hover` | `#0E469E` | `#9ABFFF` | Hover states |
| Error | `--status-error` | `#A33A32` | `#F09990` | Inline errors |

Rules:

- One page-level theme chosen from system preference. Sections never invert independently.
- Cobalt is only interactive or semantic. It is never decorative.
- All code colors must reference these semantic tokens.

## 3. Typography

Primary font is Geist Sans, self-hosted through the existing `geist` package. Mono is Geist Mono. No third family.

| Level | Size | Weight | Line height | Tracking | Usage |
|---|---:|---:|---:|---:|---|
| Display | `clamp(2.5rem, 7vw, 4.5rem)` | 550 | 0.94 | -0.045em | Home name only |
| H1 | `clamp(2.5rem, 7vw, 5rem)` | 500 | 0.96 | -0.045em | Page titles |
| H2 | `clamp(1.75rem, 4vw, 3rem)` | 500 | 1.02 | -0.035em | Major sections |
| H3 | 1.25rem | 600 | 1.25 | -0.02em | Project and record titles |
| Lead | 1.125rem | 400 | 1.65 | -0.01em | Hero introduction |
| Body | 1rem | 400 | 1.65 | 0 | Default text |
| Body small | 0.875rem | 400 | 1.55 | 0 | Supporting copy |
| Meta | 0.75rem | 500 | 1.4 | 0.04em | Dates, tags, statuses |

Body copy is capped at 65 characters. Display lines are capped at two on desktop. No em dash appears in visible copy.

## 4. Spacing & Layout

Base unit is 4px.

| Token | Value | Usage |
|---|---:|---|
| `--space-1` | 4px | Inline detail |
| `--space-2` | 8px | Tight cluster |
| `--space-3` | 12px | Compact control |
| `--space-4` | 16px | Mobile gutter |
| `--space-5` | 20px | Text grouping |
| `--space-6` | 24px | Component padding |
| `--space-8` | 32px | Section interior |
| `--space-10` | 40px | Mobile section gap |
| `--space-12` | 48px | Desktop component gap |
| `--space-16` | 64px | Standard section gap |
| `--space-20` | 80px | Major section gap |
| `--space-24` | 96px | Hero and page rhythm |

- Reading column: 640px.
- Portfolio column: 864px on Home and 1040px on index pages.
- Desktop grid: 12 columns with 24px gutters.
- Breakpoints: 640px, 768px, 1024px, 1280px.
- Every grid collapses to one column below 768px. Primary content never scrolls horizontally.
- Full-height regions use `min-height: 100dvh`.

## 5. Components

### Site Header

- Structure: brand link, primary navigation, CV link. About points to the Home biography anchor.
- States: current route uses ink and an underline; hover uses cobalt; focus uses a 2px cobalt outline; active translates 1px.
- Layout: 52px sticky cluster inside the portfolio column. Mobile navigation remains one line and may horizontally scroll only inside the nav list.

### Text Link

- Variants: inline, nav, arrow link.
- States: default, hover, active, focus, visited. Disabled is not used.
- Motion: color and underline offset, 200ms standard timing.

### Project Index

- Structure: status rail, title, description, technology list, source and demo links. Feature bullet grids are intentionally omitted; project rows scan like note rows.
- States: default, hover, focus-within. Empty state says no projects are published. No loading state because data is build-time JSON. Error state fails the build through schema validation.
- Layout: compact 2/10 index row on desktop, one readable column on mobile.

### Note Row

- Structure: date, read time, title, description, tags.
- States: default, hover, active, focus. Empty state is plain explanatory text. Content errors fail the build through the MDX schema.
- Motion: title and arrow shift with transform only.

### Profile Intro

- Structure: identity copy, 152px square portrait, location map, and icon-only CV/email/GitHub/LinkedIn links.
- Layout: fluid text column plus compact portrait-and-map rail on desktop; one column below 768px.
- Image: `152px by 152px`, grayscale, 8px radius, fixed aspect ratio, eager-loaded.
- Map: local SVG locator map using the real coordinates, linked to OpenStreetMap, with a visible location caption; no client map library or tracking script.
- Icon links: custom 20px SVGs inside 44px targets, each with an accessible name and visible focus state.

### Experience Index

- Structure: role, company, period, location, and one plain description.
- Layout: compact date rail plus content; borders separate groups without cards.
- Current roles appear first. Education and certifications share one tonal credential group and the same row anatomy.

### Account Shelf

- Structure: one GitHub region and one Spotify region, each with a 56px account image, profile link, account facts, and a short activity list.
- Spotify shows current playback plus exactly three deduplicated recent tracks when available.
- GitHub failure returns an available-false payload with HTTP 200, so the page degrades quietly instead of logging a 503.
- States: loading, loaded, empty, inline unavailable. Shelves use hairlines and negative space, never floating cards.
- Accessibility: live results use polite status regions; external links use account or track names.

### Logbook Form

- Structure: label, text input, native stamp select, helper/error text, submit button, recent entries.
- States: default, hover, focus, disabled, submitting, success, error, empty.
- Accessibility: native form controls, 44px minimum targets, visible focus, error linked with `aria-describedby`.

### Theme Control

- Structure: one button toggling light and dark preferences.
- States: default, hover, focus, active.
- Motion: none beyond color transition. Preference persists locally.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---:|---|---|
| Micro | 120ms | ease-out | Press feedback |
| Standard | 200ms | ease-in-out | Hover and focus |
| Emphasis | 500ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Initial content reveal |

- Motion communicates hierarchy or feedback only.
- Initial sections reveal once using IntersectionObserver.
- Only transform and opacity animate.
- `prefers-reduced-motion: reduce` removes reveal and transform movement.

## 7. Depth & Surface

Strategy is borders plus tonal shift. Cards do not float.

- Default rule: `1px solid var(--border-default)`.
- Quiet rule: `1px solid var(--border-subtle)`.
- Elevated menus use `--surface-elevated` with a border and no shadow.
- Corner system: 0px for structural regions, 6px for controls, 999px only for compact tags.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA, with 4.5:1 body contrast and 3:1 large text contrast.
- Full keyboard reachability and visible focus on every interactive element.
- Touch targets are at least 44px.
- Landmarks, one H1 per page, useful alt text, and descriptive external-link labels.
- System color scheme, reduced motion, and reduced transparency preferences are respected.

### Personas

- Recruiter scanning experience and projects in under two minutes.
- Technical peer reading MDX notes with keyboard navigation and code zoom.
- Mobile visitor on a narrow, low-bandwidth connection.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| None | N/A | No accepted accessibility or design debt | Record here before deferring |
