# Commercial Narrative Reflections

## 1. Purpose

This document captures reflections and emerging clarity about Profitdrive's commercial narrative and product positioning. It serves as a structured thinking space where insights can be documented without immediately triggering website changes.

**Key principles:**
- This document is **non-binding** — entries here do not automatically require site updates
- It prevents hindsight rewriting by preserving a snapshot of what was intentionally live
- It legitimises not acting on every insight immediately
- It provides a historical record for understanding why changes were made (or not made) in the future

Use this document to:
- Capture observations about messaging effectiveness
- Document terminology evolution
- Track tensions between current site copy and emerging clarity
- Establish governance rules for when reflections become canonical

---

## 2. Current Canonical Position

*Snapshot of what is currently live and intentional (as of document creation)*

### Homepage Hero Statement

**Headline:** "Clarity on future profit. Confidence in today's decisions."

**Subhead:** "Profitdrive gives services firms a clear forward profit outlook — showing how pipeline, pricing, and delivery choices will move revenue and margin before the month closes."

**Insight line:** "Profit is shaped as much by delivery mix and utilisation as by revenue."

### Product Page Core Framing

**Opening statement:** "From future profit visibility to confident decisions"

**System description:** "Profitdrive exists to make future profit visible early enough to act on it. Not as a report, and not as a spreadsheet — but as a live, shared view of how commercial decisions shape revenue and margin before they're locked in."

**The Five Connected Realities:**
1. **Pipeline** — What work is likely to land, when, and on what terms.
2. **Pricing** — The commercial assumptions behind deals and extensions.
3. **People** — Who delivers the work — internal capacity, utilisation, and cost.
4. **Projects** — How work is actually delivered and extended over time.
5. **Outlook vs Actuals** — A continuous check that planned profit remains aligned to accounting reality — with variances surfaced early, not after the month closes.

**System concept:** "Profitdrive brings these realities together into a single commercial decision system — so leaders can see the impact of pricing, staffing, and delivery choices before those decisions are locked into the P&L."

### Key Accepted Terms

- **"Outlook"** — Forward-looking profit visibility (preferred over "forecast" or "projection")
- **"Profit"** — Used consistently (not "margin" or "profitability" interchangeably)
- **"Commercial decisions"** — The framing for what Profitdrive supports
- **"Priorities"** — Used in context of decision-making (e.g., "margin vs growth priorities")
- **"Actuals"** — Framed as validation/alignment mechanism, not standalone domain

### End-to-End Flow (WO-PROD-002)

**Framing:** "Profit is decided before work begins"

**Step 5 (current):** "Outlook confirmed" — "Actuals validate the outlook. Small variances confirm discipline; larger variances feed learning back into future decisions."

**Reinforcing line:** "When Profitdrive is used well, actuals hold few surprises — they confirm what leadership already knew."

---

## 3. Emerging Reflections

*Dated entries capturing observations and their implications*

### [2024-12] — Actuals as alignment, not domain

**Observation:**
Actuals were previously framed as a standalone "reality" or domain (the fifth connected reality). The reframing positions actuals as a continuous alignment check between outlook and accounting reality, rather than a separate domain to manage. This shifts the mental model from "five separate things" to "four realities plus a quality loop."

**Why it matters:**
- Prevents actuals from being treated as a reporting/accounting function
- Emphasises that alignment is the success state, not reconciliation after the fact
- Positions variances as learning signals, not surprises
- Reduces perception of Profitdrive as a finance tool

**Implications:**
- **Website:** Already reflected in WO-PROD-011 (Outlook vs Actuals card, Step 5 reframing, reinforcing line)
- **Product:** UI should surface alignment status, not just actuals data
- **Language / terminology:** "Outlook vs Actuals" (not just "Actuals"); "validate" and "confirm" (not "reconcile" or "report")

---

### [2024-12] — Shift decisions left

**Observation:**
The core value proposition is about making profit visible "early enough to act on it" — before decisions are locked in. This is a "shift left" concept applied to commercial decisions. The emphasis is on timing: seeing impact while there are still options, not after the fact.

**Why it matters:**
- Distinguishes Profitdrive from reporting/analytics tools
- Clarifies the "when" of value delivery (before, not after)
- Positions Profitdrive as a decision-support system, not a retrospective tool
- Aligns with the "profit is decided before work begins" framing

**Implications:**
- **Website:** Current messaging already emphasises "before they're locked in" — maintain this emphasis
- **Product:** Features should surface decisions at decision points, not just aggregate data
- **Language / terminology:** "Early enough to act" is canonical; "shift left" is internal framing, not customer-facing

---

### [2024-12] — One commercial model across lifecycle

**Observation:**
Profitdrive uses a single commercial model from pipeline through delivery to actuals. This is different from tools that require re-entering assumptions or translating between systems. The same assumptions that drive pipeline decisions also drive delivery planning and validate against actuals.

**Why it matters:**
- Reduces handover friction between sales, delivery, and finance
- Prevents assumption drift (what was priced vs what was delivered)
- Creates a single source of truth for commercial logic
- Enables extensions/change requests to flow naturally without sales process dependency

**Implications:**
- **Website:** WO-PROD-010 (Extensions section) already reflects this — extensions create opportunities automatically
- **Product:** Architecture should maintain model continuity across lifecycle stages
- **Language / terminology:** "Single commercial decision system" is canonical; "one model" is internal framing

---

### [2024-12] — Constant outlook as success state

**Observation:**
The ideal state is not "accurate forecasting" but "constant outlook" — a continuously updated view that leadership trusts. When actuals arrive, they confirm what was already known, not reveal surprises. This positions variance as a learning signal (for future decisions) rather than a reporting outcome.

**Why it matters:**
- Shifts success metric from "accuracy" to "alignment and trust"
- Reduces pressure on forecasting precision
- Emphasises continuous updating over periodic reporting
- Positions Profitdrive as a quality loop, not a prediction engine

**Implications:**
- **Website:** Reinforcing line in WO-PROD-002 already captures this ("actuals hold few surprises")
- **Product:** UI should emphasise continuous updates and early variance signals
- **Language / terminology:** "Outlook" (ongoing) preferred over "forecast" (point-in-time); "confirm" preferred over "match"

---

## 4. Tension Log

*Explicitly capturing where reflections differ from current site, and why changes may wait*

### What's better now vs later

**Current state:** Some reflections (e.g., "Actuals as alignment") have already been promoted to site copy (WO-PROD-011). This was appropriate because:
- The app capability exists (outlook vs actuals alignment)
- It simplified messaging (removed standalone "Actuals" domain framing)
- It replaced existing language cleanly

**Future considerations:**
- "One commercial model" messaging could be stronger, but may wait until app UI more clearly demonstrates model continuity
- "Constant outlook" concept is partially reflected but could be more explicit — may wait until we have more customer validation of this mental model

### What might wait until app capability is more visible

**Extensions as commercial signals (WO-PROD-010):**
- Currently positioned as a "quiet capability"
- Could become more prominent once UI clearly shows extension → opportunity flow
- Risk of over-promising if UI doesn't yet demonstrate seamless integration

**Quality loop concept:**
- "Outlook vs Actuals" framing is live, but the "loop" concept (learning feeding back) is implicit
- May wait until app shows explicit feedback mechanisms (variance → decision adjustment)

### What should not be changed yet

**"Commercial decision system" terminology:**
- This is canonical and working well
- Alternative framings ("commercial engine", "commercial model") exist in content but "system" is the primary positioning
- No need to consolidate until there's clear evidence one term is confusing

**"Five connected realities" structure:**
- Recently updated to "Outlook vs Actuals" (WO-PROD-011)
- Structure is stable and clear
- No need to restructure further unless new domain emerges

**Homepage hero:**
- Locked per WO-HERO-003
- Current framing is effective
- No changes unless significant market feedback indicates confusion

---

## 5. Promotion Rules

*Governance for when reflections become canonical website copy*

A reflection may be promoted to canonical website copy only when **all** of the following conditions are met:

### 1. App clearly demonstrates it
- The capability exists in the product, not just in concept
- UI/UX supports the narrative claim
- Customer usage validates the framing

### 2. It simplifies (not complicates) messaging
- Removes ambiguity or confusion
- Consolidates parallel language rather than adding alternatives
- Makes the value proposition clearer, not more nuanced

### 3. It replaces existing language, not adds parallel language
- Replaces outdated or less accurate framing
- Does not create competing narratives
- Maintains consistency across pages

### 4. It aligns with product strategy
- Supports the intended product positioning
- Does not over-promise capabilities
- Aligns with go-to-market messaging

### 5. It has been validated (where possible)
- Customer feedback supports the framing
- Internal team alignment on the change
- No significant risk of confusion or misinterpretation

**Process:**
1. Document reflection in this document
2. Add to Tension Log if not ready to promote
3. Create work order (WO) when ready to promote
4. Update this document's "Current Canonical Position" section after promotion
5. Archive reflection or mark as "promoted" with date

---

## Document History

- **2024-12** — Initial document creation
- **2024-12** — WO-PROD-011 promoted: "Actuals as alignment" reflection → site copy
- **2024-12** — WO-PROD-010 promoted: "Extensions as commercial signals" reflection → site copy
