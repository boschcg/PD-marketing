# Profitdrive Marketing Website – Information Architecture

Version: v1  
Date: 02 Jan 2026  
Status: Agreed baseline for Cursor build

---

## 1. Purpose of the Marketing Website

The Profitdrive marketing website exists to:

- Clearly position Profitdrive as a **commercial decision system** for IT & professional services firms
- Make the **value of forward profit clarity** immediately understandable
- Support **self-qualification** by founders, CEOs, and operators
- Enable **low-friction trial and early access**
- Establish **credibility and depth** through playbooks, not feature lists

This site is **not** a documentation site and **not** a sales-heavy funnel.  
It is a calm, confident decision surface.

---

## 2. Primary Navigation (Top-Level)

Top navigation should remain intentionally small.

### Top Nav Items
1. **Product**
2. **How It Works**
3. **Playbook**
4. **Roadmap**
5. **Early Access** (Primary CTA)
6. **Login** (Secondary right-aligned nav item, present now even if it routes to a placeholder)

**Login Label Guidance:**
- Use "Login" (not "Sign in") unless/until product copy dictates otherwise

### Header/Top Bar Behaviour

**Left Side:**
- Profitdrive wordmark lockup per Design Intent
- Exact format: "Profitdrive␠␠//" (two spaces before "//")
- Exact colours: Brand Navy (`#3730A3`) for "Profitdrive", Action Green (`#56D384`) for "//"
- Never black, never grey approximations

**Centre/Right:**
- Navigation items as specified above
- Login placement: right-aligned secondary nav item

**Active State Behaviour:**
- Active nav item must use app-style underline behaviour
- Brand Navy text (`#3730A3`) + underline (same thickness and offset as app tabs)
- Explicitly maintains parity with app tab interaction (see Design Intent 3.4)

**Inactive State:**
- Neutral grey text
- No underline

**Hover State:**
- Subtle transition only
- No colour noise

---

## 3. Page-Level Information Architecture

### `/` – Homepage

**Primary Job**
- Create immediate clarity: what Profitdrive is and why it exists

**Primary Content Source**
- `01_pages/homepage.md`

**Sections**
- Hero: Profit clarity without complexity
- Problem framing: The complexity trap
- Core pillars (summary)
- Who it’s for (personas summary)
- How it fits into daily operations
- Set up speed and simplicity
- Playbook preview
- Early Access CTA

---

### `/product` – Product Overview

**Primary Job**
- Show how Profitdrive works end-to-end without diving into UI detail

**Primary Content Source**
- `01_pages/product_overview.md`

**Supporting Sources**
- Pillar summaries (excerpted only)

**Sections**
- The unified commercial engine
- From pipeline to profit
- Guardrails without friction
- Operational simplicity
- What Profitdrive replaces (silently)
- What it deliberately does not do

---

### `/how-it-works` – Operating Model

**Primary Job**
- Explain how Profitdrive fits into a real services firm week-to-week

**Primary Content Sources**
- `01_pages/maturity_roadmap.md`
- Pillar summaries

**Sections**
- The maturity model (Levels 1–4)
- What changes at each level
- Why this is not a “big transformation”
- How firms typically adopt Profitdrive

---

### `/playbook` – Profit Clarity Playbook

**Primary Job**
- Establish authority and depth without overwhelming

**Primary Content Sources**
- `03_narratives/*`
- Selected `04_claims_and_evidence/*`

**Structure**
- Grid of playbook articles
- Each article opens as its own page

**Featured Articles**
- Protect margins without hiring a CFO
- Why profit is lost before work begins
- Five commercial metrics that matter
- Mastering the profit boundary
- The truth about your bench
- M&A readiness through operational clarity

---

### `/playbook/[slug]` – Individual Playbook Article

**Primary Job**
- Build conviction and trust

**Content Rules**
- No selling language
- No product screenshots unless strictly illustrative
- Clear link back to Product or Early Access

---

### `/roadmap` – Product Direction

**Primary Job**
- Show intent and seriousness without committing to timelines

**Primary Content Source**
- Extract from roadmap sections in content

**Sections**
- What exists today
- What is coming next
- What Profitdrive will deliberately never become

---

### `/early-access` – Trial & Adoption

**Primary Job**
- Convert intent into action with minimal friction

**Primary Content Sources**
- `how_to_trial.md`
- `how_to_adopt_and_buy.md`

**Sections**
- Who Early Access is for
- What you get in trial
- What setup looks like
- How adoption typically unfolds
- Pricing posture (principles, not numbers)
- Early Access form

---

### `/about` – Vision & Origin

**Primary Job**
- Provide confidence in the thinking behind the product

**Primary Content Source**
- `01_pages/team_vision.md`

**Sections**
- Why Profitdrive exists
- The operating philosophy
- What experience informed the design
- Why discipline beats complexity

---

## 4. Footer Architecture

### Footer Sections
- Product
- Playbook
- Company
- Legal

### Footer Links
- Product Overview
- How It Works
- Playbook
- Roadmap
- Early Access
- About
- Privacy Policy
- Terms

---

## 5. Content Governance Rules

- Every page must answer **one primary question**
- Long-form thinking lives in Playbook, not core pages
- No feature sprawl on the homepage
- No CFO-replacement claims
- No dashboards-as-hero imagery
- Calm, restrained, precise language only

---

## 6. Cursor Build Guardrails

When building:
- Follow `PD_UI_UX_Design_Intent.md` strictly
- Do not invent copy or features
- Render `.md` files faithfully
- Prefer whitespace over density
- Prefer clarity over persuasion

### Non-Functional Guardrails for Marketing Site

**Analytics:**
- Analytics is disabled by default
- No consent UI elements
- No floating widgets (including the "N" badge or any analytics indicators)
- If analytics is later enabled, it must be non-invasive and never add persistent UI elements

**Site Polish Baseline:**
- Favicon must be applied (site polish baseline requirement)

---

## 7. Status

This document is the **source of truth** for:
- Routing
- Page responsibility
- Content placement
- Cursor Work Orders

Changes should be intentional and versioned.
