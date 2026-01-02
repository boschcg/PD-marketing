# Early Access — Internal Review Process

**Work Order:** WO-EA-003  
**Status:** Approved  
**Last Updated:** 2026-01-XX

## Purpose

This document defines how Early Access requests are reviewed and followed up internally, without exposing this logic to users. This ensures a consistent, professional internal handling process that avoids ad-hoc or sales-driven follow-up and preserves the calm, non-pushy tone established on the site.

## Core Principle

**Early Access is curated, not self-serve.**

## Internal Review Principles (Locked)

Early Access requests must be reviewed with the following principles:

1. **Quality over volume** — Better to have fewer, well-matched firms than many mismatched ones
2. **Fit over speed** — Take time to understand context before responding
3. **Deliberate follow-up, not automated pressure** — Every interaction is considered and personal
4. **Early Access is curated, not self-serve** — This is an invitation, not a conversion funnel

## Review Criteria (Guidance Only)

When reviewing a request, consider:

- **Firm type:** Services / professional services firms (not product companies)
- **Company size:** Within intended operating range (typically 1–150 people, but use judgement)
- **Role:** Leadership, finance, or ops involvement (signals decision-making authority)
- **Indications of margin pressure or growth complexity:** Firms facing the problems Profitdrive solves
- **Signals of thoughtful evaluation:** Evidence they've read the site, understand what Early Access is, and are not "trial hunting"

**Rules:**
- No hard scoring
- No automatic rejection
- Use judgement
- When in doubt, err on the side of inclusion (but still review)

## Follow-Up Expectations

### Timing

- Follow-up should be **considered, not immediate**
- No SLA promises are communicated externally
- Take time to understand the request before responding
- There is no "24-hour response" commitment

### Tone

- **Personal** — Write as a human, not a system
- **Calm** — Match the executive-safe tone of the site
- **Exploratory** — Ask questions, don't pitch
- **No sales script** — Every interaction should feel genuine

### Intent

The purpose of follow-up is to:

1. **Clarify context** — Understand their firm, their situation, their needs
2. **Understand what prompted interest** — What led them to request Early Access?
3. **Decide whether Early Access is appropriate** — Is this a good fit for both parties?

## Explicit Non-Goals

The Early Access process explicitly avoids:

- ❌ Sales funnel behavior
- ❌ Discounting or pricing pressure
- ❌ Urgency framing ("limited spots", "act now")
- ❌ "Book a demo" push
- ❌ Automated drip campaigns
- ❌ Lead scoring algorithms
- ❌ Public commitments on response timing

## Technical Implementation

### Submission Flow

1. User submits form on `/early-access` page
2. Form validates client-side (name, email, company, role, company size required)
3. Submission sent to `/api/early-access` endpoint
4. API validates, rate-limits, and forwards to webhook (if configured)
5. Webhook routes to review system (CRM, email, etc.)
6. **Manual review happens outside the codebase**

### API Endpoint

The `/api/early-access` endpoint:
- Validates input
- Applies rate limiting (3 requests per 15 minutes per IP)
- Forwards to webhook or logs (dev mode)
- Returns generic success message to user

**Important:** The API does not:
- Auto-approve requests
- Send automated emails
- Score or rank requests
- Commit to response timing

### Webhook Configuration

If `EARLY_ACCESS_WEBHOOK_URL` is set, submissions are POSTed to that URL with:

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "company": "Acme Corp",
  "role": "leadership",
  "companySize": "11-30",
  "comment": "Optional message",
  "submittedAt": "2026-01-01T12:00:00.000Z"
}
```

The webhook should route to a system where requests can be manually reviewed.

## Documentation for Future Contributors

**Early Access requests are reviewed manually. Follow-up is deliberate, personal, and exploratory — not sales-led.**

This ensures future contributors understand the intent behind the process and maintain the executive-safe, non-pushy approach that defines Profitdrive's Early Access program.

## Change Control

Any move toward:
- Automation of approval/rejection
- Scoring algorithms
- Sales workflows
- Public commitments on response timing

Requires a new Work Order and explicit approval, as these changes would fundamentally alter the curated, manual nature of Early Access.

---

**Related Documentation:**
- [Early Access Form API](./early-access-api.md) — Technical API documentation
- WO-EA-001 — Early Access page structure
- WO-EA-002 — Form handling and validation

