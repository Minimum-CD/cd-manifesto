---
title: "Migrating to Trunk-Based Development"
linkTitle: 'Migration to TBD'
type: docs
---

A common misunderstanding I see is the belief that *Trunk-Based Development (TBD) **is** continuous integration (CI).*  
It isn't.  
But if you want CI, you're not getting there without Trunk-Based Development. This guide aims to provide tips to migrate
from wherever you re to TBD.

GitFlow and other branching models built around long-lived branches optimize for isolation, not integration. They create the illusion of safety while silently increasing risk through long delays between merge points. The result is predictable: painful merges, stale assumptions, and feedback that arrives too late to matter.

TBD reverses that. We optimize for rapid feedback, smaller changes, and collaborative discovery — the ingredients required for CI and continuous delivery.

This article explains how to move from GitFlow (or any long-lived branch pattern) toward TBD, and what "good" actually looks like along the way.

---

# Why Move to Trunk-Based Development?

Long-lived branches hide problems. TBD exposes them early, when they are cheap to fix.

Think of long-lived branches like storing food in a bunker: it feels safe until you open the door and discover half of it rotting. With TBD, we check freshness every day.

To do CI, we need:

- **Small changes integrated at least daily**  
- **Automated tests giving fast, deterministic feedback**  
- **A single source of truth: the trunk**

If your branches live for weeks, you aren't integrating — you're doing periodic big-bang merges. CI is impossible.

---

# The First Step: Stop Letting Work Age

The biggest barrier isn't tooling. It's habits.

The first meaningful change is simple:

> **Stop letting branches live long enough to become problems.**

Your first goal isn't true TBD. It's shorter-lived branches — changes that live for hours or a couple of days, not weeks.

That alone exposes dependency issues, unclear requirements, and missing tests — which is exactly the point. The pain tells you where improvement is needed.

---

# Path #1: Moving from Long-Lived Branches to Short-Lived Branches

When GitFlow habits are deeply ingrained, this is usually the least-threatening first step.

## 1. Collapse the Branching Model

Stop using:

- `develop`
- release branches that sit around for weeks
- feature branches lasting a sprint or more

Move toward:

- A single `main` (or `trunk`)
- Temporary branches measured in hours or days

## 2. Integrate Every Few Days — Then Every Day

Set an explicit working agreement:

> "Nothing lives longer than 48 hours."

Once this feels normal, shorten it:

> "Integrate at least once per day."

If a change is too large to merge within a day or two, the problem isn't the branching model — the problem is the decomposition of work.

## 3. Test Before You Code

Branch lifetime shortens when you stop guessing about expected behavior.  
Bring product, QA, and developers together *before coding*:

- Write acceptance criteria collaboratively  
- Turn them into executable tests  
- Then write code to make those tests pass  

You'll discover misunderstandings upfront instead of after a week of coding.

## 4. Invest in Contract Tests

Most merge pain isn't from your code — it's from the *interfaces* between services.  
Define interface changes early and codify them with provider/consumer contract tests.

This lets teams integrate frequently without surprises.

## 5. Make Smaller Changes the Default

A three-day branch is still a large batch. Aim for:

- One-day changes  
- Single-responsibility updates  
- No "feature-complete" branches  

Small changes force clarity and accelerate feedback.

Short-lived branches get you close to TBD. But the end goal isn't "short."  
It's **continuous**.

---

# Path #2: Committing Directly to the Trunk

This is the cleanest and most powerful version of TBD.  
It requires discipline, but it produces the most stable delivery pipeline and the least drama.

If the idea of committing straight to `main` makes people panic, that's a signal about your current testing process — not a problem with TBD.

## 1. Build (and Validate) the Pipeline First

Before any production code lands:

1. Deploy a trivial "heartbeat" application  
2. Validate the pipeline can deploy it end-to-end  
3. Break something on purpose to confirm the pipeline catches it  

If you cannot deploy and validate a heartbeat reliably, you cannot safely deploy features.

Feature work comes **after** the pipeline works.

## 2. Use Feature Flags the Right Way

Feature flags are not a testing strategy.  
They are a **release** strategy.

Every commit to trunk must:

- Build  
- Test  
- Deploy safely  

Flags let you deploy incomplete work without exposing it prematurely. They don't excuse poor test discipline.

## 3. Commit Small and Commit Often

If a change is too large to commit today, split it.

Large commits are failed design upstream, not failed integration downstream.

## 4. Use TDD and ATDD to Keep Refactors Safe

Refactoring must not break tests.  
If it does, you're testing implementation, not behavior — something I've publicly warned about many times. Behavioral tests are what keep trunk commits safe.

## 5. Prioritize Interfaces First

Always start by defining and codifying the contract:

- What is the shape of the request?
- What is the response?
- What error states must be handled?

Interfaces are the highest-risk area. Drive them with tests first. Then work inward.

---

# How to Choose Your Path

Use this rule of thumb:

- **If your team fears "breaking everything," start with short-lived branches.**  
- **If your team collaborates well and writes tests first, go straight to trunk commits.**

Both paths require the same skills:

- Smaller work  
- Better requirements  
- Shared understanding  
- Automated tests  
- A reliable pipeline  

The difference is pace.

---

# What Will Hurt (At First)

When you migrate to TBD, you'll expose every weakness you've been avoiding:

- Slow tests  
- Unclear requirements  
- Fragile integration points  
- Architecture that resists small changes  
- Gaps in automated validation  
- Long manual processes in the value stream  

This is not a regression.  
This is the **point**.

Problems you discover early are problems you can fix cheaply.

---

# What "Good" Looks Like

You know TBD is working when:

- Branches live for hours, not days  
- Developers collaborate early instead of merging late  
- Product participates in defining behaviors, not just writing stories  
- Tests run fast enough to integrate frequently  
- Deployments are boring  
- You can fix production issues with the same process you use for normal work  

When your deployment process enables emergency fixes without special exceptions, you've reached the real payoff:  
**lower cost of change**, which makes everything else faster, safer, and more sustainable.

---

# Final Thought

Migrating from GitFlow to TBD isn't a matter of changing your branching strategy.  
It's a matter of changing your *thinking*.

Stop optimizing for isolation.  
Start optimizing for feedback.

Small, tested, integrated changes — delivered continuously — will always outperform big batches delivered occasionally.

That's why we migrate to TBD.  
Not because it's trendy, but because it's the only path to real continuous integration and continuous delivery.
