---
title: Stop-the-Line Culture
description: Build quality discipline by stopping all feature work when the build breaks. Learn why this practice is essential for continuous integration and how to implement it effectively.
weight: 4
type: docs
---

Stop-the-line is a core discipline in continuous integration: when the trunk build breaks, the entire team stops feature work and collaborates to fix it immediately.

This practice, borrowed from lean manufacturing, prevents defects from propagating through the system and maintains an always-releasable trunk.

## The Principle

**When the build is red, all feature work stops.**

Every team member shifts focus to:
1. Understanding what broke
2. Fixing the broken build
3. Learning why it happened
4. Preventing similar failures

No new feature work begins until the build is green again.

## Why Stop-the-Line Matters

### Prevents Cascading Failures

When developers continue working on a broken build:
- New work may depend on broken code
- Multiple changes pile up, making diagnosis harder
- The broken state becomes the new baseline
- Integration issues compound
- Blame becomes diffuse

Stopping immediately contains the problem.

### Maintains Releasability

Continuous Integration means the trunk is **always** in a releasable state. Every broken build violates this promise.

If you can't release from trunk:
- You're not doing CI, you're doing "continuous building"
- Emergency fixes become complicated
- Deployment confidence drops
- Feature flags and evolutionary coding fail

Stop-the-line maintains the core CI value proposition: **we can release at any time**.

### Builds Quality Culture

Stop-the-line demonstrates that **quality is everyone's responsibility**:

- Team over individual: We share ownership
- Quality over features: We won't sacrifice stability for velocity
- Rapid response: We fix problems immediately
- Continuous improvement: We learn from failures

Teams that stop-the-line build stronger cultures.

### Provides Fast Feedback on Testing

If the build breaks frequently:
- Pre-merge tests are insufficient
- Developers aren't running tests locally
- Tests are flaky or non-deterministic
- Team needs testing skill development

The pain of stopping reveals testing gaps, creating pressure to improve.

## The Team Working Agreement

Effective stop-the-line requires clear team agreements:

### 1. Fast Build Feedback

**Agreement**: "Our builds complete in < 10 minutes"

**Why**: Developers can't respond to failures they don't know about. Fast feedback enables stop-the-line.

#### If builds are slow
- Parallelize test execution
- Move slow tests post-merge
- Optimize test data setup
- Invest in faster infrastructure

### 2. Visible Build Status

**Agreement**: "Build status is visible to the entire team at all times"

**Why**: You can't stop for failures you don't see.

#### Implementation
- Build radiators on team displays
- Chat notifications for failures
- Desktop alerts
- Email for critical failures
- Status badges in dashboards

See [Pipeline Visibility](./pipeline-visibility/) for detailed guidance.

### 3. Clear Ownership

**Agreement**: "When the build breaks, the team owns the fix"

**Why**: Blame prevents collaboration. Shared ownership encourages it.

**Not**: "Whoever broke it fixes it"
**Instead**: "The team fixes it together"

The person who triggered the failure may not be best positioned to fix it. Rally the team's expertise.

### 4. Definition of "Fixed"

**Agreement**: "Fixed means green build on trunk, not just a fix committed"

**Why**: Prevents false confidence and cascade failures.

#### Fixed includes
- Root cause identified
- Fix implemented
- Tests passing on trunk
- Understanding what went wrong
- Plan to prevent recurrence

### 5. No Bypassing

**Agreement**: "We will not bypass CI to deploy during red builds"

**Why**: Bypassing destroys trust in the process.

#### Even for
- Critical hotfixes (fix the build first, or revert)
- Small changes (small doesn't mean safe)
- "Known failures" (then they should be fixed or removed)
- Executive pressure (protect the team)

## Implementation Strategies

### Starting Stop-the-Line

If your team isn't currently practicing stop-the-line:

**Week 1: Measure**
- Track build failures
- Measure time to fix
- Note team response patterns
- Identify common failure types

**Week 2: Agree**
- Discuss stop-the-line in retrospective
- Draft working agreement
- Commit to trying for one sprint
- Set success criteria

**Week 3-4: Practice**
- Stop on first failure
- Hold brief stand-ups when builds break
- Celebrate successful stops
- Document learnings

**Week 5: Retrospect**
- What improved?
- What was difficult?
- How can we get better?
- Continue or adjust?

### Handling Resistance

**"We can't afford to stop feature work"**

Response: You can't afford NOT to. Every hour the build stays broken:
- Compounds future integration issues
- Blocks other developers
- Erodes deployment confidence
- Increases fix complexity

Stopping is cheaper.

**"The person who broke it should fix it"**

Response: Individual blame prevents collaboration. The team owns the build. The person who triggered the failure may not:
- Have the expertise to fix it quickly
- Understand the failing component
- Be available to fix it

Team ownership gets builds green faster.

**"It's a known flaky test"**

Response: Then remove it from the build. Flaky tests that cause stops create stop-the-line fatigue. Either:
- Fix the flaky test immediately
- Remove it from trunk builds
- Quarantine it for investigation

Never accept "known flaky tests" in trunk builds.

**"It only fails sometimes"**

Response: Non-deterministic tests are broken tests. They don't reliably indicate system status. Fix or remove them.

See [Deterministic Tests](/minimumcd/deterministic/) for guidance.

## Stop-the-Line in Practice

### The Build Breaks

```
09:15 - Build fails on trunk
09:16 - Automated notification to team chat
09:17 - Team acknowledges in stand-up
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

### The Anti-Pattern

```
09:15 - Build fails on trunk
09:30 - Someone notices
10:00 - "We'll look at it later"
11:00 - Another commit breaks on red build
12:00 - Third failure, harder to diagnose
14:00 - "This is too complex, we need help"
16:00 - Multiple devs debugging
17:30 - Finally fixed
```

**Total impact**: 8+ hours of broken trunk, multiple devs blocked
**Team learned**: Nothing systematic
**Outcome**: Same failures likely to recur

## Advanced Practices

### Gradual Rollback

If fix will take > 15 minutes:

**Option 1: Revert immediately**
- Roll back the commit that broke the build
- Get trunk green
- Fix properly offline
- Re-integrate with fix

**Option 2: Forward fix with time limit**
- Set a timer (15 minutes)
- Work on forward fix
- If timer expires: revert
- Fix offline and re-integrate

Choose revert bias when unsure.

### Post-Fix Retrospective

After every build break:

#### 5 minutes, right away
1. What broke?
2. Why didn't pre-merge tests catch it?
3. How can we prevent this?
4. What test should we add?

Document learnings. Track patterns. Improve systematically.

### Failure Categories

Track why builds break to identify improvement opportunities:

#### Common categories
- Flaky tests (fix or remove)
- Missing pre-merge tests (add them)
- Environment differences (fix environment parity)
- Integration issues (improve integration tests)
- Merge conflicts (improve work breakdown)

## Metrics

### Time to Fix

**What**: Time from build failure to green build

**Good**: < 1 hour average, < 15 minutes median

**Track**: Daily, with trend over time

### Stop Rate

**What**: Percentage of build failures that trigger stop-the-line

**Good**: 100%

**Track**: Validate team discipline

### Failure Frequency

**What**: Build failures per day/week

**Good**: Decreasing over time

**Track**: Measure improvement effectiveness

## The Cultural Shift

Stop-the-line represents a fundamental cultural change:

**From**: "Move fast and break things"
**To**: "Move fast by not breaking things"

**From**: "Ship features at all costs"
**To**: "Maintain quality while shipping features"

**From**: "Individual productivity"
**To**: "Team effectiveness"

**From**: "Heroic debugging"
**To**: "Systematic prevention"

This shift is uncomfortable but essential for sustainable high performance.

## Common Challenges

### "We stop all the time"

**If builds break frequently**, the problem isn't stop-the-line—it's insufficient testing before merge.

#### Fix
- Improve pre-merge testing
- Require local test runs before commit
- Add missing test cases
- Fix flaky tests
- Improve test coverage

Stop-the-line reveals the problem. Better testing solves it.

### "Stopping kills our velocity"

**Short term**: Stopping might feel slow
**Long term**: Stopping accelerates delivery

Broken builds that persist:
- Block other developers
- Create integration debt
- Compound failures
- Erode confidence

Stopping maintains velocity by preventing these compounding costs.

### "Management doesn't support stopping"

**Educate stakeholders** on the economics:

- Show time saved by early fixes
- Demonstrate deployment confidence
- Track defect reduction
- Measure cycle time improvement

If leadership demands features over quality, you're not empowered to do CI.

## Additional Resources

- [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html) - Martin Fowler
- [The Andon Cord](https://itrevolution.com/articles/kata/) - Lean Manufacturing principle
- [Pipeline Visibility](./pipeline-visibility/)
- [Deterministic Tests](/minimumcd/deterministic/)
