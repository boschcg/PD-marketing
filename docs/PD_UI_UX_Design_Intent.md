# Profitdrive UI/UX Design Intent

Date: 2 January 2026  
Status: Canonical Design Guidance  
Audience: Product, Design, Engineering, Cursor (Implementation)

---

## 1. Purpose of This Document

This document defines the **design intent** for Profitdrive across both:
- The **Marketing Website**
- The **Product Application**

Its role is to prevent design drift by explicitly stating:
- What is shared and non‑negotiable
- What is allowed to vary
- Why those differences exist

This document sits **above** the detailed UI/UX Playbook and should be read first by anyone implementing UI.

---

## 2. Core Design Principle

**One design system. Two density modes.**

Profitdrive uses a **single visual language and component system**, expressed in two intentional ways:

1. **Marketing Density Mode**  
   Narrative‑led, low cognitive load, first‑impression focused.

2. **Application Density Mode**  
   Data‑led, high signal‑to‑noise, decision‑support focused.

The user should feel continuity and trust when moving from marketing → product, not a visual reset.

---

## 3. What Is Shared (Non‑Negotiable)

The following elements are **identical across marketing and product**:

### 3.1 Brand and Visual Language
- Primary colour palette (Brand Navy, Action Green)
- Neutral greys and background tones
- No decorative or novelty colours
- No gradients that obscure data or meaning

#### Brand Lockup Spec (Marketing + App)

The Profitdrive wordmark lockup is **identical** across marketing website and product application.

**Exact Format:**
- Wordmark: "Profitdrive"
- Separator: "//"
- Spacing: Two spaces between "Profitdrive" and "//" (exact: "Profitdrive␠␠//")

**Exact Colour Values:**
- Brand Navy: `#3730A3` (wordmark "Profitdrive")
- Action Green: `#56D384` (separator "//")

**Usage Rules:**
- Wordmark always uses Brand Navy (`#3730A3`); never black, never grey
- Separator "//" always uses Action Green (`#56D384`)
- No opacity tricks, no "close enough" shades
- This lockup must match the app implementation exactly

### 3.2 Typography
- Same font family across all surfaces
- Clear hierarchy: Headline → Section → Body → Meta
- No playful, casual, or promotional typography

### 3.3 Semantic Meaning
- Green always indicates **action or confirmation**
- Blue / navy indicates **structure or framing**
- Grey indicates **supporting or contextual information**
- No colour used purely for decoration

### 3.4 Components
- Buttons, cards, inputs, tables, badges
- Icon style (simple, restrained, functional)
- Border radius, shadows, and elevation rules

#### Navigation Interaction Parity (Website ↔ App)

The website top navigation must mirror the app tab behaviour to preserve the "no visual reset" principle.

**Active State:**
- Brand Navy text (`#3730A3`)
- Underline (same thickness and offset as app tabs)
- No colour noise or decorative effects

**Inactive State:**
- Neutral grey text
- No underline

**Hover State:**
- Subtle transition only
- No colour noise

**Rationale:** Users moving from marketing → product should experience visual continuity, not a jarring change in interaction patterns.

### 3.5 Tone
- Calm, confident, professional
- No hype language
- No fear‑based selling
- No “growth hacks” or marketing jargon

---

## 4. What Intentionally Differs

The following differences are **intentional and required**.

### 4.1 Marketing Density Mode

Used on:
- Homepage
- Product overview
- Feature summaries
- Playbook / thought leadership pages

Characteristics:
- More whitespace
- Larger headings
- Short narrative blocks
- Card‑based layout
- Slower visual rhythm

Purpose:
- Establish credibility
- Communicate outcomes
- Reduce initial cognitive load
- Invite exploration

Marketing pages should **explain the system**, not demonstrate it in full detail.

---

### 4.2 Application Density Mode

Used in:
- Profitdrive app UI
- Dashboards
- Tables
- Configuration screens
- Decision views

Characteristics:
- Tighter spacing
- Higher information density
- Grids over cards where appropriate
- Minimal explanatory copy
- Data first, decoration last

Purpose:
- Support real decisions
- Reduce navigation friction
- Maximise signal‑to‑noise
- Enable fast scanning and comparison

The application should feel like a **commercial control surface**, not a presentation.

---

## 5. Explicit Design Guardrails

The following are **not allowed** anywhere in Profitdrive:

- Decorative animations
- Marketing illustrations that add no meaning
- Stock imagery
- Excessive gradients or shadows
- Gamification elements
- "Fun" UI at the expense of clarity

Profitdrive optimises for **trust and judgement**, not delight.

### Analytics Default-Off (No UI Artifacts)

Analytics is **disabled by default** on the marketing website until an explicit go-live decision is made.

**Required Behaviour:**
- No consent banners
- No floating widgets (including the "N" badge or any analytics UI indicators)
- No persistent UI elements related to analytics

**If Analytics Is Later Enabled:**
- It must be non-invasive
- It must never add persistent UI elements
- It must not require consent banners or floating widgets

The marketing site should remain clean and uncluttered regardless of analytics state.

---

## 6. Relationship to the UI/UX Playbook

- This document defines **intent and boundaries**
- The UI/UX Playbook defines **implementation rules**
- If a conflict appears, this document governs *why*, the playbook governs *how*

Cursor and implementers should:
1. Read this document first
2. Apply the UI/UX Playbook second
3. Ask explicitly before deviating

---

## 7. Mental Model to Use

Think of Profitdrive as:

- **A CFO‑grade instrument panel**
- Wrapped in a **founder‑friendly narrative shell**
- With zero visual disconnect between promise and product

Marketing earns trust.  
The product keeps it.

---

## 8. Summary for Cursor

- One design system
- Two density modes
- No improvisation on brand, colour, or semantics
- Marketing explains outcomes
- Product supports decisions

If in doubt: **reduce, clarify, and remove.**
