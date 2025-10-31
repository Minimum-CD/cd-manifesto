---
title: Pipeline Visibility & Health Metrics
description: Monitor CI health through key metrics including commit frequency, build success rate, and time to fix failures. Learn what to measure and why it matters.
weight: 3
type: docs
---

CI pipeline visibility ensures the entire team can see the health of the integration process and respond quickly to issues. Combined with the right metrics, visibility drives continuous improvement.

## Why Visibility Matters

When pipeline status is visible to everyone:

- **Faster response**: Team sees failures immediately
- **Shared accountability**: Everyone owns the build
- **Better collaboration**: Team coordinates on fixes
- **Continuous improvement**: Metrics highlight bottlenecks
- **Quality culture**: Green builds become a team priority

## Making the Pipeline Visible

### Real-Time Status Display

Make build status impossible to ignore:

- **Build radiators**: Large displays showing current status
- **Team dashboards**: Shared screens with pipeline health
- **Status indicators**: Visual signals (traffic lights, etc.)
- **Browser extensions**: Build status in developer tools
- **Desktop notifications**: Alerts when builds break

The key is making status **ambient**—visible without requiring effort to check.

### Notification Systems

Automated notifications ensure the team knows when action is needed:

#### When to notify

- Build failures on trunk
- Flaky test detection
- Long-running builds
- Security vulnerabilities found
- Quality gate failures

#### How to notify

- Team chat channels (Slack, Teams)
- Email for critical failures
- SMS/phone for extended outages
- Dashboard alerts
- Version control integrations

#### Notification best practices

- Notify the whole team, not individuals
- Include failure details and logs
- Link directly to failed builds
- Suggest next actions
- Avoid notification fatigue with smart filtering

## CI Health Metrics

Track these metrics to understand and improve CI effectiveness:

### Commits per Day per Developer

**What**: How frequently the team integrates code to trunk

**How to measure**: Total commits to trunk ÷ number of developers ÷ days

**Good**: ≥ 1 commit per developer per day (team average)

**Why it matters**:

- Indicates true CI practice adoption
- Shows work breakdown effectiveness
- Reveals integration discipline
- Predicts integration conflict frequency

**Important**: Never compare individuals—this is a **team metric**. Use it to understand team behavior, not to rank developers.

#### If the number is low

- Work is too large to integrate daily
- Team needs better work decomposition
- Fear of breaking the build
- Missing evolutionary coding skills

### Development Cycle Time

**What**: Time from when work begins to completion (merged to trunk)

**How to measure**: Time from first commit on branch to merge to trunk

**Good**: < 2 days on average

**Why it matters**:

- Indicates effective work breakdown
- Shows CI practice maturity
- Predicts batch size and risk
- Correlates with deployment frequency

#### If cycle time is high

- Stories are too large
- Rework due to late feedback
- Waiting for code reviews
- Complex approval processes
- Poor work decomposition

### Build Success Rate

**What**: Percentage of trunk builds that pass all tests

**How to measure**: (Successful builds ÷ total builds) × 100

**Good**: > 95%

**Why it matters**:

- Indicates pre-merge testing quality
- Shows team discipline
- Predicts trunk stability
- Reflects testing effectiveness

#### If success rate is low

- Pre-merge tests insufficient
- Team not running tests locally
- Flaky tests creating false failures
- Missing stop-the-line discipline

### Time to Fix Broken Build

**What**: How quickly the team resolves build failures on trunk

**How to measure**: Time from build failure to successful build

**Good**: < 1 hour

**Why it matters**:

- Shows team commitment to CI
- Indicates stop-the-line practice
- Reflects debugging capability
- Predicts integration delays

#### If fix time is high

- Team continues feature work during failures
- Difficult to diagnose failures
- Complex, slow build process
- Lack of build ownership
- Poor error messages in tests

### Defect Rate

**What**: Critical guardrail metric to ensure speed doesn't sacrifice quality

**How to measure**: Defects found per unit of time or per deployment

**Good**: Stable or decreasing as CI improves

**Why it matters**:

- Quality validation
- Prevents speed over quality
- Shows testing effectiveness
- Builds stakeholder confidence

#### If defect rate increases

- Tests don't cover critical paths
- Team skipping testing discipline
- Poor test quality (coverage without value)
- Speed prioritized over quality
- Missing acceptance criteria

## Dashboard Design

Effective CI dashboards show the right information at the right time:

### Essential Information

#### Current status

- Trunk build status (green/red)
- Currently running builds
- Recent commit activity
- Failed test names

#### Trends over time

- Commit frequency
- Build success rate
- Average fix time
- Cycle time trends

#### Team health

- Number of active branches
- Age of oldest branch
- Flaky test count
- Test execution time

### Dashboard Anti-Patterns

#### Avoid

- Individual developer comparisons
- Vanity metrics (total commits, lines of code)
- Too much detail (cognitive overload)
- Metrics without context
- Stale data (not real-time)

## Using Metrics for Improvement

Metrics are tools for learning, not weapons for management.

### Good Uses

- Team retrospectives on CI effectiveness
- Identifying bottlenecks in the process
- Validating improvements (A/B comparisons)
- Celebrating progress and wins
- Guiding focus for improvement efforts

### Bad Uses

- Individual performance reviews
- Team comparisons or rankings
- Setting arbitrary targets without context
- Gaming metrics to look good
- Punishing teams for honest reporting

### Improvement Cycle

1. **Measure current state**: Establish baseline metrics
2. **Identify bottleneck**: What's the biggest constraint?
3. **Hypothesize improvement**: What change might help?
4. **Experiment**: Try the change for a sprint
5. **Measure impact**: Did metrics improve?
6. **Standardize or iterate**: Keep or adjust the change

## Common Visibility Challenges

### "Metrics Can Be Gamed"

Yes, any metric can be gamed. The solution isn't to avoid metrics—it's to:

- Use metrics for learning, not punishment
- Track multiple metrics (gaming one reveals problems in others)
- Focus on outcomes (quality, speed) not just outputs (commits)
- Build a culture of honesty and improvement

### "Too Many Notifications Create Noise"

True. Combat notification fatigue:

- Only notify on trunk failures (not branch builds)
- Aggregate related failures
- Auto-resolve when fixed
- Use severity levels
- Allow custom notification preferences

### "Dashboards Become Wallpaper"

Dashboards lose impact when ignored. Keep them relevant:

- Update regularly with fresh data
- Rotate what's displayed
- Discuss in stand-ups
- Celebrate improvements
- Remove stale metrics

## Additional Resources

- [Accelerate: Measuring Performance](https://itrevolution.com/articles/accelerate-book/) - Nicole Forsgren, Jez Humble, Gene Kim
- [Metrics That Matter](https://dojoconsortium.org/docs/metrics/) - DevOps Dojo Consortium
- [Code Coverage](https://dojoconsortium.org/docs/metrics/code-coverage/)
