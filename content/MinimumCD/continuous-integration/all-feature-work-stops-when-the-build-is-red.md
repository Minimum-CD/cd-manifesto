---
title: All Feature Work Stops When the Build Is Red
description: Why continuous delivery requires stopping all feature work when the build breaks—not just blocking merges. Learn the team mindset, practices, and working agreements that make this discipline effective.
weight: 4
type: docs
---

When the trunk build breaks, the entire team stops feature work and collaborates to fix it immediately. This practice, borrowed from lean manufacturing's [Andon Cord](https://itrevolution.com/articles/kata/), prevents defects from propagating and maintains an always-releasable trunk.

Every team member shifts focus to:
1. Understanding what broke
2. Fixing the broken build
3. Learning why it happened
4. Preventing similar failures

No new feature work begins until the build is green again.

## Why ALL Work Stops, Not Just Merges

A common objection is: "Why stop all feature work? Just block merging until the pipeline is green."

This misses the point. Continuous Delivery is not just technology and workflow—it is a **mindset**. Part of that mindset is that individuals on the team do not have individual priorities. The **team** has priorities.

### Work Closer to Production Is Always More Valuable

Work that is closer to production is always more valuable than work that is further away. A broken pipeline is halting the most important work: getting tested, integrated changes to users. It is also blocking any hotfix the team may need to deploy.

When the build is red, fixing it is the team's highest priority. Not your feature. Not your story. The pipeline.

### "Just Block Merges" Creates a False Sense of Progress

If developers continue writing feature code while the build is broken:

- They are building on a foundation they cannot verify
- Their work is accumulating integration risk with every passing minute
- They are individually productive but the **team** is not delivering
- The broken build becomes someone else's problem instead of everyone's priority
- The incentive to fix the build urgently is removed—it can wait until someone wants to merge

This is the difference between individual activity and team effectiveness. A team where everyone is typing but nothing is shipping is not productive.

### This Is a Team Organization Problem

If the team is not organized to enable everyone to swarm on a broken build, that is a fundamental dysfunction. CD requires teams that:

- **Share ownership** of the pipeline and the codebase
- **Prioritize collectively** rather than protecting individual work streams
- **Can all contribute** to diagnosing and fixing build failures
- **Treat the pipeline as the team's most critical asset**

A team that says "I'll keep working on my feature while someone else fixes the build" has not adopted the CD mindset. They are a group of individuals sharing a codebase, not a team practicing Continuous Delivery.

## What This Looks Like in Practice

### When the Team Stops

```
09:15 - Build fails on trunk
09:16 - Automated notification to team chat
09:17 - Team acknowledges
09:18 - Feature work pauses
09:20 - Quick huddle: what broke?
09:25 - Two devs pair on fix
09:40 - Fix committed
09:45 - Build green
09:46 - Team resumes feature work
09:50 - Quick retro: why did it break?
```

**Total impact**: 30 minutes of paused feature work
**Team learned**: Missing test case for edge condition
**Outcome**: Better tests, faster next time

### When the Team Doesn't Stop

```
09:15 - Build fails on trunk
09:30 - Someone notices
10:00 - "We'll look at it later"
11:00 - Another commit on a red build
12:00 - Third failure, harder to diagnose
14:00 - "This is too complex, we need help"
16:00 - Multiple devs debugging
17:30 - Finally fixed
```

**Total impact**: 8+ hours of broken trunk, multiple devs blocked
**Team learned**: Nothing systematic
**Outcome**: Same failures likely to recur

When developers continue working on a broken build, new work may depend on broken code, multiple changes pile up making diagnosis harder, and the broken state becomes the new baseline. Stopping immediately contains the problem.

## When the Fix Takes Too Long

If the fix will take more than 15 minutes, prefer reverting:

**Option 1: Revert immediately**
- Roll back the commit that broke the build
- Get trunk green
- Fix properly offline
- Re-integrate with the fix

**Option 2: Forward fix with a time limit**
- Set a timer (15 minutes)
- Work on forward fix
- If the timer expires: revert
- Fix offline and re-integrate

Choose revert bias when unsure. The goal is a green trunk, not a heroic fix.

## Team Working Agreements

Effective stop-the-line requires clear agreements:

### Fast Build Feedback

**Agreement**: "Our builds complete in < 10 minutes"

Developers can't respond to failures they don't know about. If builds are slow, parallelize test execution, move slow tests post-merge, or invest in faster infrastructure.

### Visible Build Status

**Agreement**: "Build status is visible to the entire team at all times"

You can't stop for failures you don't see. Use build radiators, chat notifications, and desktop alerts. See [Pipeline Visibility](../pipeline-visibility/) for detailed guidance.

### Team Owns the Fix

**Agreement**: "When the build breaks, the team owns the fix"

**Not**: "Whoever broke it fixes it"
**Instead**: "The team fixes it together"

Individual blame prevents collaboration. The person who triggered the failure may not have the expertise or context to fix it quickly. Rally the team.

### Fixed Means Green

**Agreement**: "Fixed means green build on trunk, not just a fix committed"

Fixed includes: root cause identified, fix implemented, tests passing on trunk, and a plan to prevent recurrence.

### No Bypassing

**Agreement**: "We will not bypass CI to deploy during red builds"

Not for critical hotfixes (fix the build first, or revert). Not for small changes (small doesn't mean safe). Not for "known failures" (then they should be fixed or removed). Not for executive pressure (protect the team).

## Common Objections

**"We can't afford to stop feature work"**

You can't afford not to. Every hour the build stays broken compounds future integration issues, blocks other developers, erodes deployment confidence, and increases fix complexity. Stopping is cheaper.

**"Stopping kills our velocity"**

Short term, stopping might feel slow. Long term, stopping accelerates delivery. Broken builds that persist block developers, create integration debt, and compound failures. Stopping maintains velocity by preventing these compounding costs.

**"We stop all the time"**

If builds break frequently, the problem isn't stopping—it's insufficient testing before merge. Improve pre-merge testing, require local test runs, and fix flaky tests. Stopping reveals the problem. Better testing solves it.

**"It's a known flaky test"**

Then remove it from the build. Either fix the flaky test immediately, remove it from trunk builds, or quarantine it for investigation. Non-deterministic tests are broken tests. See [Deterministic Tests](/minimumcd/deterministic/) for guidance.

**"Management doesn't support stopping"**

Educate stakeholders on the economics: show time saved by early fixes, demonstrate deployment confidence, track defect reduction, and measure cycle time improvement. If leadership demands features over quality, you're not empowered to do CI.

## The Cultural Shift

This practice represents a fundamental change:

**From**: "Individual productivity" **To**: "Team effectiveness"

**From**: "Ship features at all costs" **To**: "Maintain quality while shipping features"

**From**: "Move fast and break things" **To**: "Move fast by not breaking things"

This shift is uncomfortable but essential for sustainable high performance.

## Metrics

- **Time to fix**: Time from build failure to green build. Target < 15 minutes median, < 1 hour average.
- **Stop rate**: Percentage of build failures that trigger full stop. Target 100%.
- **Failure frequency**: Build failures per week. Should decrease over time.

Track patterns in why builds break (flaky tests, missing pre-merge tests, environment differences, integration issues) to identify systemic improvement opportunities.

## Additional Resources

- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) - Martin Fowler
- [The Andon Cord](https://itrevolution.com/articles/kata/) - Lean Manufacturing principle
- [Pipeline Visibility](../pipeline-visibility/)
- [Deterministic Tests](/minimumcd/deterministic/)
