# Fermor — Quiet Financial Confidence

Fermor is a personal finance homepage and product experience designed around **quiet financial confidence**. It replaces aggressive alarms, high-interest borrowing pitches, and cluttered spreadsheets with calm, structured clarity.

## Overview

Fermor provides an editorial-grade fintech interface where users can:
- **Understand Cashflow**: See their real monthly inflow, outflow, and net surplus broken down into intuitive categories without line-item guilt.
- **Model Rhythmic Savings**: Connect unspent monthly margin directly to tangible goals (e.g., Emergency Cushion, Sabbatical Trek, Ergonomic Studio).
- **Surface Actionable Insights**: Receive calm, contextual observations (such as subtle discretionary upticks or approaching subscription renewals) rather than manufactured urgency.
- **Plan Meaningful Goals**: Use an interactive arithmetic planner with real-time math, dynamic contribution controls, and estimated completion dates.
- **Experience Local Onboarding**: Step through a 3-phase interactive onboarding modal with validated monthly figures, focus selection, and a personalized local blueprint.

*Note: All financial figures (in Indian Rupees, ₹) and user data displayed across the application are illustrative samples calculated client-side in the browser. No real banking credentials or external server storage are used.*

---

## Visual & Creative Identity

- **Palette**:
  - Deep Ink Green: `#0A1713`
  - Forest Green: `#176B4D`
  - Soft Mint: `#92E8B7`
  - Warm Ivory: `#F7F7F1`
  - Pure White: `#FFFFFF`
  - Main Text: `#18231D`
  - Muted Text: `#66716B`
  - Subtle Borders: `#E2E7E0`
- **Typography**: Refined sans-serif (`Plus Jakarta Sans`) paired with tabular figures (`JetBrains Mono` / `font-variant-numeric: tabular-nums`) for currency and numerical alignment.
- **Anti-Slop Restraint**: Zero generic purple gradients, zero excessive glassmorphism, zero floating blobs, zero decorative pulsing dots, zero fake testimonials, and zero mechanical comment headers.

---

## Implemented Architecture & Features

1. **Top Bar Contract (`Navbar.tsx`)**:
   - Single-element geometric wordmark.
   - Clean single-line links (`Product`, `How it works`, `Insights`, `About`) with smooth-scroll handlers.
   - Sign in and primary "Get started" CTA opening the local onboarding flow.
   - Accessible mobile responsive navigation.

2. **First Viewport & Financial Dashboard (`HeroSection.tsx` & `FinancialDashboard.tsx`)**:
   - Editorial headline and value proposition.
   - Live software component preview featuring net surplus (₹37,200 / +33.2%), Inflow vs Outflow, interactive multi-segment category allocation, 6-month rhythmic cashflow view, recent transactions, and contextual insight banner.

3. **Core Philosophy & Asymmetric Benefits (`ProductBenefits.tsx`)**:
   - "See the bigger picture. Find your next step."
   - 01: Understand spending patterns without guilt (interactive allocation profile).
   - 02: Connect today's decisions with future goals.
   - 03: Identify what deserves attention next.

4. **Functional Financial Explorer (`FinancialExplorer.tsx`)**:
   - **Tab 1: Spending**: 7 categories (Housing, Groceries, Dining, Commute, Health, Digital, Discretionary) with interactive category inspection and a live ±30% budget optimization slider recalculating monthly net surplus.
   - **Tab 2: Saving**: 3 goal presets with dynamic contribution slider (₹2,000–₹35,000/mo), live percentage completion, and duration estimates.
   - **Tab 3: Monthly Overview**: Dynamic income/expense sliders simulating cash flow and visual inflow-to-outflow proportion.

5. **Actionable Insights (`InsightsSection.tsx` & `InsightDetailModal.tsx`)**:
   - 3 realistic examples (Discretionary Dining uptick, Emergency reserve milestone, Upcoming quarterly subscriptions).
   - Dedicated interactive detail modal with contextual advice and quick navigation.

6. **Interactive Savings Planner (`GoalPlanner.tsx`)**:
   - Target amount, current saved amount, and monthly contribution controls.
   - Strict edge-case arithmetic: zero/negative values sanitized, instant months-to-completion calculation, daily habit equivalent (~₹500/day), and estimated calendar completion month.

7. **The Three-Stage Rhythm (`HowItWorks.tsx`)**:
   - 01: Understand
   - 02: Decide
   - 03: Grow

8. **Trust, Presentation & User Control (`TrustSection.tsx`)**:
   - Honest, non-promotional pillars: Transparent presentation, no loan selling, client-side privacy.

9. **Conversion & Editorial Footer (`FinalCTA.tsx` & `Footer.tsx`)**:
   - High-contrast ink green closing banner.
   - Complete 4-column footer with working section links, philosophy note, and 2026 copyright.

10. **Functional Local Onboarding (`OnboardingDialog.tsx`)**:
    - 3-step modal with goal selection, monthly income/target inputs, validation, review cadence selector, and summary blueprint. Keyboard accessible (`Escape` to close).

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 with custom color tokens and typography
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans, JetBrains Mono

---

## Getting Started

### Prerequisites

- Node.js (version 18 or newer)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

Run the local Vite development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Type-checking & Linting

```bash
npm run lint
```

### Production Build

```bash
npm run build
```

This compiles optimized production assets into the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Verification & Testing Performed

- [x] TypeScript strict compilation verified with `tsc --noEmit` (0 errors).
- [x] Vite production build tested and verified with `compile_applet` (clean build).
- [x] Responsive layout verified across mobile (320px, 375px), tablet (768px), and desktop (1024px+).
- [x] Math checks: All Indian Rupee calculations, category percentages, surplus equations, and goal durations agree mathematically.
- [x] Interactive states: Tabs, sliders, category selectors, modals, and navigation links all function with verified event handlers.
- [x] Accessibility: Keyboard listeners (`Escape` key for dialogs), visible focus states, semantic landmarks, and WCAG AA contrast.
