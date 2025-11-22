---
title: "Migrating to Trunk-Based Development"
linkTitle: 'Migration to TBD'
type: docs
---

Continuous delivery requires continuous integration and CI requires very frequent code integration, at least daily, to
the trunk. Doing that either requires trunk-based development or worthless process overhead to do multiple merges to
accomplish this. So, if you want CI, you're not getting there without trunk-Based development. However, standing up TBD
is not as simple as "collapse all the branches." CD is a quality process, not just automated code delivery.
Trunk-based development is the first step in establishing that quality process and in uncovering the problems in the
current process.

GitFlow, and other branching models that use long-lived branches, optimize for isolation to protect working code from
untested or poorly tested code. They create the illusion of safety while silently increasing risk through long feedback delays. The result is predictable: painful merges, stale assumptions, and feedback that arrives too late
to matter.

TBD reverses that. It optimizes for rapid feedback, smaller changes, and collaborative discovery — the ingredients required for CI and continuous delivery.

This article explains how to move from GitFlow (or any long-lived branch pattern) toward TBD, and what "good" actually looks like along the way.

---

## Why Move to Trunk-Based Development?

Long-lived branches hide problems. TBD exposes them early, when they are cheap to fix.

Think of long-lived branches like storing food in a bunker: it feels safe until you open the door and discover half of it rotting. With TBD, teams check freshness every day.

To do CI, teams need:

- **Small changes integrated at least daily**  
- **Automated tests giving fast, deterministic feedback**  
- **A single source of truth: the trunk**

If your branches live for more than a day or two, you aren't doing continuous integration — you're doing periodic
integration at best. True CI requires at least daily integration to the trunk.

---

## The First Step: Stop Letting Work Age

The biggest barrier isn't tooling. It's habits.

The first meaningful change is simple:

> **Stop letting branches live long enough to become problems.**

Your first goal isn't true TBD. It's shorter-lived branches — changes that live for hours or a couple of days, not weeks.

That alone exposes dependency issues, unclear requirements, and missing tests — which is exactly the point. The pain tells you where improvement is needed.

---

## Before You Start: What to Measure

You cannot improve what you don't measure. Before changing anything, establish baseline metrics, so you can track actual progress.

### Essential Metrics to Track Weekly

#### Branch Lifetime

- Average time from branch creation to merge
- Maximum branch age currently open
- Target: Reduce average from weeks to days, then to hours

#### Integration Health

- Number of merge conflicts per week
- Time spent resolving conflicts
- Target: Conflicts should decrease as integration frequency increases

#### Delivery Speed

- Time from commit to production deployment
- Number of commits per day reaching production
- Target: Decrease time to production, increase deployment frequency

#### Quality Indicators

- Build/test execution time
- Test failure rate
- Production incidents per deployment
- Target: Fast, reliable tests; stable deployments

#### Work Decomposition

- Average pull request size (lines changed)
- Number of files changed per commit
- Target: Smaller, more focused changes

Start with just two or three of these. Don't let measurement become its own project.

The goal isn't perfect data — it's visibility into whether you're actually moving in the right direction.

---

## Path #1: Moving from Long-Lived Branches to Short-Lived Branches

When GitFlow habits are deeply ingrained, this is usually the least-threatening first step.

### 1. Collapse the Branching Model

Stop using:

- `develop`
- release branches that sit around for weeks
- feature branches lasting a sprint or more

Move toward:

- A single `main` (or `trunk`)
- Temporary branches measured in hours or days

### 2. Integrate Every Few Days — Then Every Day

Set an explicit working agreement:

> "Nothing lives longer than 48 hours."

Once this feels normal, shorten it:

> "Integrate at least once per day."

If a change is too large to merge within a day or two, the problem isn't the branching model — the problem is the decomposition of work.

### 3. Test Before You Code

Branch lifetime shortens when you stop guessing about expected behavior.
Bring product, QA, and developers together *before coding*:

- Write acceptance criteria collaboratively
- Turn them into executable tests
- Then write code to make those tests pass

You'll discover misunderstandings upfront instead of after a week of coding.

This approach is called **Behavior-Driven Development (BDD)** — a collaborative practice where teams define expected behavior in plain language before writing code. BDD bridges the gap between business requirements and technical implementation by using concrete examples that become executable tests.

**Key BDD resources:**

- [Behavior-Driven Development - Dojo Consortium](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/) - Comprehensive guide to BDD practices
- ["Specification by Example"](https://gojko.net/books/specification-by-example/) by Gojko Adzic - Foundational text on collaborative specification

#### How to Run a Three Amigos Session

**Participants:** Product Owner, Developer, Tester (15-30 minutes per story)

**Process:**

1. Product describes the user need and expected outcome
2. Developer asks questions about edge cases and dependencies
3. Tester identifies scenarios that could fail
4. Together, write acceptance criteria as examples

**Example:**

```gherkin
Feature: User password reset

Scenario: Valid reset request
  Given a user with email "user@example.com" exists
  When they request a password reset
  Then they receive an email with a reset link
  And the link expires after 1 hour

Scenario: Invalid email
  Given no user with email "nobody@example.com" exists
  When they request a password reset
  Then they see "If the email exists, a reset link was sent"
  And no email is sent

Scenario: Expired link
  Given a user has a reset link older than 1 hour
  When they click the link
  Then they see "This reset link has expired"
  And they are prompted to request a new one
```

These scenarios become your automated acceptance tests *before* you write any implementation code.

#### From Acceptance Criteria to Tests

Turn those scenarios into executable tests in your framework of choice:

```javascript
// Example using Jest and Supertest
describe('Password Reset', () => {
  it('sends reset email for valid user', async () => {
    await createUser({ email: 'user@example.com' });

    const response = await request(app)
      .post('/password-reset')
      .send({ email: 'user@example.com' });

    expect(response.status).toBe(200);
    expect(emailService.sentEmails).toHaveLength(1);
    expect(emailService.sentEmails[0].to).toBe('user@example.com');
  });

  it('does not reveal whether email exists', async () => {
    const response = await request(app)
      .post('/password-reset')
      .send({ email: 'nobody@example.com' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('If the email exists, a reset link was sent');
    expect(emailService.sentEmails).toHaveLength(0);
  });
});
```

Now you can write the minimum code to make these tests pass. This drives smaller, more focused changes.

### 4. Invest in Contract Tests

Most merge pain isn't from your code — it's from the *interfaces* between services.  
Define interface changes early and codify them with provider/consumer contract tests.

This lets teams integrate frequently without surprises.

---

## Path #2: Committing Directly to the Trunk

This is the cleanest and most powerful version of TBD.
It requires discipline, but it produces the most stable delivery pipeline and the least drama.

If the idea of committing straight to `main` makes people panic, that's a signal about your current testing process — not a problem with TBD.

{{< alert title="Note on regulated environments" >}}
If you work in a regulated industry with compliance requirements (SOX, HIPAA, FedRAMP, etc.), **Path #1 with short-lived branches** is usually the better choice. Short-lived branches provide the audit trails, separation of duties, and documented approval workflows that regulators expect—while still enabling daily integration. See [TBD in Regulated Environments](#tbd-in-regulated-environments) for detailed guidance on meeting compliance requirements, and [Address Code Review Concerns](#address-code-review-concerns) for how to maintain fast review cycles with short-lived branches.
{{< /alert >}}

---

## How to Choose Your Path

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

## Essential TBD Practices

These practices apply to **both paths**—whether you're using short-lived branches or committing directly to trunk.

### Use Feature Flags the Right Way

Feature flags are one of several **evolutionary coding practices** that allow you to integrate incomplete work safely. Other methods include branch by abstraction and connect-last patterns. For a comprehensive guide on when to use each approach, see [Evolutionary Coding Practices](/continuous-integration/evolutionary-coding-practices/).

Feature flags are not a testing strategy.
They are a **release** strategy.

Every commit to trunk must:

- Build
- Test
- Deploy safely

Flags let you deploy incomplete work without exposing it prematurely. They don't excuse poor test discipline.

#### Start Simple: Boolean Flags

You don't need a sophisticated feature flag system to start. Begin with environment variables or simple config files.

**Simple boolean flag example:**

```javascript
// config/features.js
module.exports = {
  newCheckoutFlow: process.env.FEATURE_NEW_CHECKOUT === 'true',
  enhancedSearch: process.env.FEATURE_ENHANCED_SEARCH === 'true',
};

// In your code
const features = require('./config/features');

app.get('/checkout', (req, res) => {
  if (features.newCheckoutFlow) {
    return renderNewCheckout(req, res);
  }
  return renderOldCheckout(req, res);
});
```

This is enough for most TBD use cases.

#### Testing Code Behind Flags

Critical: You must test **both** code paths — flag on and flag off.

```javascript
describe('Checkout flow', () => {
  describe('with new checkout flow enabled', () => {
    beforeEach(() => {
      features.newCheckoutFlow = true;
    });

    it('shows new checkout UI', () => {
      // Test new flow
    });
  });

  describe('with new checkout flow disabled', () => {
    beforeEach(() => {
      features.newCheckoutFlow = false;
    });

    it('shows legacy checkout UI', () => {
      // Test old flow
    });
  });
});
```

If you only test with the flag on, you'll break production when the flag is off.

#### Two Types of Feature Flags

Feature flags serve two fundamentally different purposes:

**Temporary Release Flags** (should be removed):

- Control rollout of new features
- Enable gradual deployment
- Allow quick rollback of changes
- Test in production before full release
- **Lifecycle**: Created for a release, removed once stable (typically 1-4 weeks)

**Permanent Configuration Flags** (designed to stay):

- User preferences and settings (dark mode, email notifications, etc.)
- Customer-specific features (enterprise vs. free tier)
- A/B testing and experimentation
- Regional or regulatory variations
- Operational controls (read-only mode, maintenance mode)
- **Lifecycle**: Part of your product's configuration system

**The distinction matters**: Temporary release flags create technical debt if not removed. Permanent configuration flags are part of your feature set and belong in your configuration management system.

Most of the feature flags you create for TBD migration will be **temporary release flags** that must be removed.

#### Release Flag Lifecycle Management

**Temporary release flags are scaffolding, not permanent architecture.**

Every temporary release flag should have:

1. A creation date
2. A purpose
3. An expected removal date
4. An owner responsible for removal

**Track your flags:**

```javascript
// flags.config.js
module.exports = {
  flags: [
    {
      name: 'newCheckoutFlow',
      created: '2024-01-15',
      owner: 'checkout-team',
      jiraTicket: 'SHOP-1234',
      removalTarget: '2024-02-15',
      purpose: 'Progressive rollout of redesigned checkout'
    }
  ]
};
```

**Set reminders to remove flags.** Permanent flags multiply complexity and slow you down.

#### When to Remove a Flag

Remove a flag when:

- The feature is 100% rolled out and stable
- You're confident you won't need to roll back
- Usually 1-2 weeks after full deployment

**Removal process:**

1. Set flag to always-on in code
2. Deploy and monitor
3. If stable for 48 hours, delete the conditional logic entirely
4. Remove the flag from configuration

#### Common Anti-Patterns to Avoid

**Don't:**

- Let temporary release flags become permanent (if it's truly permanent, it should be a configuration option)
- Let release flags accumulate without removal
- Skip testing both flag states
- Use flags to hide broken code
- Create flags for every tiny change

**Do:**

- Use release flags for large or risky changes
- Remove release flags as soon as the feature is stable
- Clearly document whether each flag is temporary (release) or permanent (configuration)
- Test both enabled and disabled states
- Move permanent feature toggles to your configuration management system

### Commit Small and Commit Often

If a change is too large to commit today, split it.

Large commits are failed design upstream, not failed integration downstream.

### Use TDD and ATDD to Keep Refactors Safe

Refactoring must not break tests.
If it does, you're testing implementation, not behavior. Behavioral tests are what keep trunk commits safe.

### Prioritize Interfaces First

Always start by defining and codifying the contract:

- What is the shape of the request?
- What is the response?
- What error states must be handled?

Interfaces are the highest-risk area. Drive them with tests first. Then work inward.

---

## Getting Started: A Tactical Guide

The initial phase sets the tone. Focus on establishing new habits, not perfection.

### Step 1: Team Agreement and Baseline

- Hold a team meeting to discuss the migration
- Agree on initial branch lifetime limit (start with 48 hours if unsure)
- Document current baseline metrics (branch age, merge frequency, build time)
- Identify your slowest-running tests
- Create a list of known integration pain points
- Set up a visible tracker (physical board or digital dashboard) for metrics

### Step 2: Test Infrastructure Audit

**Focus:** Find and fix what will slow you down.

- Run your test suite and time each major section
- Identify slow tests
- Look for:
  - Tests with sleeps or arbitrary waits
  - Tests hitting external services unnecessarily
  - Integration tests that could be contract tests
  - Flaky tests masking real issues

Fix or isolate the worst offenders. You don't need a perfect test suite to start — just one fast enough to not punish frequent integration.

### Step 3: First Integrated Change

**Pick the smallest possible change:**

- A bug fix
- A refactoring with existing test coverage
- A configuration update
- Documentation improvement

The goal is to validate your process, not to deliver a feature.

**Execute:**

1. Create a branch (if using Path #1) or commit directly (if using Path #2)
2. Make the change
3. Run tests locally
4. Integrate to trunk
5. Deploy through your pipeline
6. Observe what breaks or slows you down

### Step 4: Retrospective

Gather the team:

**What went well:**

- Did anyone integrate faster than before?
- Did you discover useful information about your tests or pipeline?

**What hurt:**

- What took longer than expected?
- What manual steps could be automated?
- What dependencies blocked integration?

**Ongoing commitment:**

- Adjust branch lifetime limit if needed
- Assign owners to top 3 blockers
- Commit to integrating at least one change per person

The initial phase won't feel smooth. That's expected. You're learning what needs fixing.

---

## Getting Your Team On Board

Technical changes are easy compared to changing habits and mindsets. Here's how to build buy-in.

### Acknowledge the Fear

When you propose TBD, you'll hear:

- "We'll break production constantly"
- "Our code isn't good enough for that"
- "We need code review on branches"
- "This won't work with our compliance requirements"

These concerns are valid signals about your current system. Don't dismiss them.

Instead: "You're right that committing directly to trunk *with our current test coverage* would be risky. That's why we need to improve our tests first."

### Start with an Experiment

Don't mandate TBD for the whole team immediately. Propose a time-boxed experiment:

**The Proposal:**
> "Let's try this for two weeks with a single small feature. We'll track what goes well and what hurts. After two weeks, we'll decide whether to continue, adjust, or stop."

**What to measure during the experiment:**

- How many times did we integrate?
- How long did merges take?
- Did we catch issues earlier or later than usual?
- How did it feel compared to our normal process?

**After two weeks:**
Hold a retrospective. Let the data and experience guide the decision.

### Pair on the First Changes

Don't expect everyone to adopt TBD simultaneously. Instead:

1. Identify one advocate who wants to try it
2. Pair with them on the first trunk-based changes
3. Let them experience the process firsthand
4. Have them pair with the next person

Knowledge transfer through pairing works better than documentation.

### Address Code Review Concerns

"But we need code review!" Yes. TBD doesn't eliminate code review.

**Options that work:**

- Pair or mob programming (review happens in real-time)
- Commit to trunk, review immediately after, fix forward if issues found
- Very short-lived branches (hours, not days) with rapid review SLA
- Pairing on code review and review change

The goal is **fast feedback**, not zero review.

{{< alert title="Important" color="warning" >}}
If you're using short-lived branches that must merge within a day or two, asynchronous code review becomes a bottleneck. Even "fast" async reviews with 2-4 hour turnaround create delays: the reviewer reads code, leaves comments, the author reads comments later, makes changes, and the cycle repeats. Each round trip adds hours or days.

Instead, use **synchronous code reviews** where the reviewer and author work together in real-time (screen share, pair at a workstation, or mob). This eliminates communication delays through review comments. Questions get answered immediately, changes happen on the spot, and the code merges the same day.

If your team can't commit to synchronous reviews or pair/mob programming, you'll struggle to maintain short branch lifetimes.
{{< /alert >}}

### Handle Skeptics and Blockers

You'll encounter people who don't want to change. Don't force it.

**Instead:**

- Let them observe the experiment from the outside
- Share metrics and outcomes transparently
- Invite them to pair for one change
- Let success speak louder than arguments

Some people need to see it working before they believe it.

### Get Management Support

Managers often worry about:

- Reduced control
- Quality risks
- Slower delivery (ironically)

**Address these with data:**

- Show branch age metrics before/after
- Track cycle time improvements
- Demonstrate faster feedback on defects
- Highlight reduced merge conflicts

Frame TBD as a risk *reduction* strategy, not a risky experiment.

---

## Working in a Multi-Team Environment

Migrating to TBD gets complicated when you depend on teams still using long-lived branches. Here's how to handle it.

### The Core Problem

You want to integrate daily. Your dependency team integrates weekly or monthly. Their API changes surprise you during their big-bang merge.

You can't force other teams to change. But you can protect yourself.

### Strategy 1: Consumer-Driven Contract Tests

Define the contract you need from the upstream service and codify it in tests that run in *your* pipeline.

**Example using Pact:**

```javascript
// Your consumer test
const { pact } = require('@pact-foundation/pact');

describe('User Service Contract', () => {
  it('returns user profile by ID', async () => {
    await provider.addInteraction({
      state: 'user 123 exists',
      uponReceiving: 'a request for user 123',
      withRequest: {
        method: 'GET',
        path: '/users/123',
      },
      willRespondWith: {
        status: 200,
        body: {
          id: 123,
          name: 'Jane Doe',
          email: 'jane@example.com',
        },
      },
    });

    const user = await userService.getUser(123);
    expect(user.name).toBe('Jane Doe');
  });
});
```

This test runs against your expectations of the API, not the actual service. When the upstream team changes their API, your contract test fails *before* you integrate their changes.

**Share the contract:**

- Publish your contract to a shared repository
- Upstream team runs provider verification against your contract
- If they break your contract, they know before merging

### Strategy 2: API Versioning with Backwards Compatibility

If you control the shared service:

```javascript
// Support both old and new API versions
app.get('/api/v1/users/:id', handleV1Users);
app.get('/api/v2/users/:id', handleV2Users);

// Or use content negotiation
app.get('/api/users/:id', (req, res) => {
  const version = req.headers['api-version'] || 'v1';
  if (version === 'v2') {
    return handleV2Users(req, res);
  }
  return handleV1Users(req, res);
});
```

**Migration path:**

1. Deploy new version alongside old version
2. Update consumers one by one
3. After all consumers migrated, deprecate old version
4. Remove old version after deprecation period

### Strategy 3: Strangler Fig Pattern

When you depend on a team that won't change:

1. Create an anti-corruption layer between your code and theirs
2. Define your ideal interface in the adapter
3. Let the adapter handle their messy API

```javascript
// Your ideal interface
class UserRepository {
  async getUser(id) {
    // Your clean, typed interface
  }
}

// Adapter that deals with their mess
class LegacyUserServiceAdapter extends UserRepository {
  async getUser(id) {
    const response = await fetch(`https://legacy-service/users/${id}`);
    const messyData = await response.json();

    // Transform their format to yours
    return {
      id: messyData.user_id,
      name: `${messyData.first_name} ${messyData.last_name}`,
      email: messyData.email_address,
    };
  }
}
```

Now your code depends on *your* interface, not theirs. When they change, you only update the adapter.

### Strategy 4: Feature Toggles for Cross-Team Coordination

When multiple teams need to coordinate a release:

1. Each team develops behind feature flags
2. Each team integrates to trunk continuously
3. Features remain disabled until coordination point
4. Enable flags in coordinated sequence

This decouples development velocity from release coordination.

### When You Can't Integrate with Dependencies

If upstream dependencies block you from integrating daily:

**Short term:**

- Use contract tests to detect breaking changes early
- Create adapters to isolate their changes
- Document the integration pain as a business cost

**Long term:**

- Advocate for those teams to adopt TBD
- Share your success metrics
- Offer to help them migrate

You can't force other teams to change. But you can demonstrate a better way and make it easier for them to follow.

---

## TBD in Regulated Environments

Regulated industries face legitimate compliance requirements: audit trails, change traceability, separation of duties, and documented approval processes. These requirements often lead teams to believe trunk-based development is incompatible with compliance. This is a misconception.

TBD is about **integration frequency**, not about eliminating controls. You can meet compliance requirements while still integrating at least daily.

### The Compliance Concerns

Common regulatory requirements that seem to conflict with TBD:

#### Audit Trail and Traceability

- Every change must be traceable to a requirement, ticket, or change request
- Changes must be attributable to specific individuals
- History of what changed, when, and why must be preserved

#### Separation of Duties

- The person who writes code shouldn't be the person who approves it
- Changes must be reviewed before reaching production
- No single person should have unchecked commit access

#### Change Control Process

- Changes must follow a documented approval workflow
- Risk assessment before deployment
- Rollback capability for failed changes

#### Documentation Requirements

- Changes must be documented before implementation
- Testing evidence must be retained
- Deployment procedures must be repeatable and auditable

### Short-Lived Branches: The Compliant Path to TBD

**Path #1 from this guide—short-lived branches—directly addresses compliance concerns while maintaining the benefits of TBD.**

Short-lived branches mean:

- Branches live for **hours to 2 days maximum**, not weeks or months
- Integration happens **at least daily**
- Pull requests are **small, focused, and fast to review**
- Review and approval happen **within the branch lifetime**

This approach satisfies both regulatory requirements and continuous integration principles.

### How Short-Lived Branches Meet Compliance Requirements

**Audit Trail:**

Every commit references the change ticket:

```bash
git commit -m "JIRA-1234: Add validation for SSN input

Implements requirement REQ-445 from Q4 compliance review.
Changes limited to user input validation layer.

🤖 Generated with Claude Code
Co-Authored-By: Claude <noreply@anthropic.com>"
```

Modern Git hosting platforms (GitHub, GitLab, Bitbucket) automatically track:

- Who created the branch
- Who committed each change
- Who reviewed and approved
- When it merged
- Complete diff history

**Separation of Duties:**

Use pull request workflows:

1. Developer creates branch from trunk
2. Developer commits changes (same day)
3. Second person reviews and approves (within 24 hours)
4. Automated checks validate (tests, security scans, compliance checks)
5. Merge to trunk after approval
6. Automated deployment with gates

This provides stronger separation of duties than long-lived branches because:

- Reviews happen while context is fresh
- Reviewers can actually understand the small changeset
- Automated checks enforce policies consistently

**Change Control Process:**

Branch protection rules enforce your process:

```yaml
# Example GitHub branch protection for trunk
required_reviews: 1
required_checks:
  - unit-tests
  - security-scan
  - compliance-validation
dismiss_stale_reviews: true
require_code_owner_review: true
```

This ensures:

- No direct commits to trunk (except in documented break-glass scenarios)
- Required approvals before merge
- Automated validation gates
- Audit log of every merge decision

**Documentation Requirements:**

Pull request templates enforce documentation:

```markdown
## Change Description
[Link to Jira ticket]

## Risk Assessment
- [ ] Low risk: Configuration only
- [ ] Medium risk: New functionality, backward compatible
- [ ] High risk: Database migration, breaking change

## Testing Evidence
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed (attach screenshots if UI change)
- [ ] Security scan passed

## Rollback Plan
[How to rollback if this causes issues in production]
```

### What "Short-Lived" Means in Practice

**Hours, not days:**

- Simple bug fixes: 2-4 hours
- Small feature additions: 4-8 hours
- Refactoring: 1-2 days

**Maximum 2 days:**
If a branch can't merge within 2 days, the work is too large. Decompose it further or use feature flags to integrate incomplete work safely.

**Daily integration requirement:**
Even if the feature isn't complete, integrate what you have:

- Behind a feature flag if needed
- As internal APIs not yet exposed
- As tests and interfaces before implementation

### Compliance-Friendly Tooling

**Modern platforms provide compliance features built-in:**

**Git Hosting (GitHub, GitLab, Bitbucket):**

- Immutable audit logs
- Branch protection rules
- Required approvals
- Status check enforcement
- Signed commits for authenticity

**CI/CD Platforms:**

- Deployment approval gates
- Audit trails of every deployment
- Environment-specific controls
- Automated compliance checks

**Feature Flag Systems:**

- Change deployment without code deployment
- Gradual rollout controls
- Instant rollback capability
- Audit log of flag changes

**Secrets Management:**

- Vault, AWS Secrets Manager, Azure Key Vault
- Audit log of secret access
- Rotation policies
- Environment isolation

### Example: Compliant Short-Lived Branch Workflow

**Monday 9 AM:**
Developer creates branch `feature/JIRA-1234-add-audit-logging` from trunk.

**Monday 9 AM - 2 PM:**
Developer implements audit logging for user authentication events. Commits reference JIRA-1234. Automated tests run on each commit.

**Monday 2 PM:**
Developer opens pull request:

- Title: "JIRA-1234: Add audit logging for authentication events"
- Description includes risk assessment, testing evidence, rollback plan
- Automated checks run: tests, security scan, compliance validation
- Code owner automatically assigned for review

**Monday 3 PM:**
Code owner reviews (5-10 minutes—change is small and focused). Suggests minor improvement.

**Monday 3:30 PM:**
Developer addresses feedback, pushes update.

**Monday 4 PM:**
Code owner approves. All automated checks pass. Developer merges to trunk.

**Monday 4:05 PM:**
CI/CD pipeline deploys to staging automatically. Automated smoke tests pass.

**Monday 4:30 PM:**
Deployment gate requires manual approval for production. Tech lead approves based on risk assessment.

**Monday 4:35 PM:**
Automated deployment to production. Audit log captures: what deployed, who approved, when, what checks passed.

**Total time: 7.5 hours from branch creation to production.**

Full compliance maintained. Full audit trail captured. Daily integration achieved.

### When Long-Lived Branches Hide Compliance Problems

Ironically, long-lived branches often create compliance risks:

**Stale Reviews:**
Reviewing a 3-week-old, 2000-line pull request is performative, not effective. Reviewers rubber-stamp because they can't actually understand the changes.

**Integration Risk:**
Big-bang merges after weeks introduce unexpected behavior. The change that was reviewed isn't the change that actually deployed (due to merge conflicts and integration issues).

**Delayed Feedback:**
Problems discovered weeks after code was written are expensive to fix and hard to trace to requirements.

**Audit Trail Gaps:**
Long-lived branches often have messy commit history, force pushes, and unclear attribution. The audit trail is polluted.

### Regulatory Examples Where Short-Lived Branches Work

**Financial Services (SOX, PCI-DSS):**

- Short-lived branches with required approvals
- Automated security scanning on every PR
- Separation of duties via required reviewers
- Immutable audit logs in Git hosting platform
- Feature flags for gradual rollout and instant rollback

**Healthcare (HIPAA):**

- Pull request templates documenting PHI handling
- Automated compliance checks for data access patterns
- Required security review for any PHI-touching code
- Audit logs of deployments
- Environment isolation enforced by CI/CD

**Government (FedRAMP, FISMA):**

- Branch protection requiring government code owner approval
- Automated STIG compliance validation
- Signed commits for authenticity
- Deployment gates requiring authority to operate
- Complete audit trail from commit to production

### The Real Choice

The question isn't "TBD or compliance."

The real choice is: compliance theater with long-lived branches and risky big-bang merges, or actual compliance with short-lived branches and safe daily integration.

Short-lived branches provide:

- Better audit trails (small, traceable changes)
- Better separation of duties (reviewable changes)
- Better change control (automated enforcement)
- Lower risk (small, reversible changes)
- Faster feedback (problems caught early)

That's not just compatible with compliance. That's better compliance.

---

## What Will Hurt (At First)

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

## Common Pitfalls to Avoid

Teams migrating to TBD often make predictable mistakes. Here's how to avoid them.

### Pitfall 1: Treating TBD as Just a Branch Renaming Exercise

**The mistake:**
Renaming `develop` to `main` and calling it TBD.

**Why it fails:**
You're still doing long-lived feature branches, just with different names. The fundamental integration problems remain.

**What to do instead:**
Focus on integration frequency, not branch names. Measure time-to-merge, not what you call your branches.

### Pitfall 2: Merging Daily Without Actually Integrating

**The mistake:**
Committing to trunk every day, but your code doesn't interact with anyone else's work. Your tests don't cover integration points.

**Why it fails:**
You're batching integration for later. When you finally connect your component to the rest of the system, you discover incompatibilities.

**What to do instead:**
Ensure your tests exercise the boundaries between components. Use contract tests for service interfaces. Integrate at the interface level, not just at the source control level.

### Pitfall 3: Skipping Test Investment

**The mistake:**
"We'll adopt TBD first, then improve our tests later."

**Why it fails:**
Without fast, reliable tests, frequent integration is terrifying. You'll revert to long-lived branches because trunk feels unsafe.

**What to do instead:**
Invest in test infrastructure *first*. Make your slowest tests faster. Fix flaky tests. Only then increase integration frequency.

### Pitfall 4: Using Feature Flags as a Testing Escape Hatch

**The mistake:**
"It's fine to commit broken code as long as it's behind a flag."

**Why it fails:**
Untested code is still untested, flag or no flag. When you enable the flag, you'll discover the bugs you should have caught earlier.

**What to do instead:**
Test both flag states. Flags hide features from users, not from your test suite.

### Pitfall 5: Keeping Flags Forever

**The mistake:**
Creating feature flags and never removing them. Your codebase becomes a maze of conditionals.

**Why it fails:**
Every permanent flag doubles your testing surface area and increases complexity. Eventually, no one knows which flags do what.

**What to do instead:**
Set a removal date when creating each flag. Track flags like technical debt. Remove them aggressively once features are stable.

### Pitfall 6: Forcing TBD on an Unprepared Team

**The mistake:**
Mandating TBD before the team understands why or how it works.

**Why it fails:**
People resist changes they don't understand or didn't choose. They'll find ways to work around it or sabotage it.

**What to do instead:**
Start with volunteers. Run experiments. Share results. Let success create pull, not push.

### Pitfall 7: Ignoring the Need for Small Changes

**The mistake:**
Trying to do TBD while still working on features that take weeks to complete.

**Why it fails:**
If your work naturally takes weeks, you can't integrate daily. You'll create work-in-progress commits that don't add value.

**What to do instead:**
Learn to decompose work into smaller, independently valuable increments. This is a skill that must be developed.

### Pitfall 8: No Clear Definition of "Done"

**The mistake:**
Integrating code that "works on my machine" without validating it in a production-like environment.

**Why it fails:**
Integration bugs don't surface until deployment. By then, you've integrated many other changes, making root cause analysis harder.

**What to do instead:**
Define "integrated" as "deployed to a staging environment and validated." Your pipeline should do this automatically.

### Pitfall 9: Treating Trunk as Unstable

**The mistake:**
"Trunk is where we experiment. Stable code goes in release branches."

**Why it fails:**
If trunk can't be released at any time, you don't have CI. You've just moved your integration problems to a different branch.

**What to do instead:**
Trunk must always be production-ready. Use feature flags for incomplete work. Fix broken builds immediately.

### Pitfall 10: Forgetting That TBD is a Means, Not an End

**The mistake:**
Optimizing for trunk commits without improving cycle time, quality, or delivery speed.

**Why it fails:**
TBD is valuable because it enables fast feedback and low-cost changes. If those aren't improving, TBD isn't working.

**What to do instead:**
Measure outcomes, not activities. Track cycle time, defect rates, deployment frequency, and time to restore service.

---

## When to Pause or Pivot

Sometimes TBD migration stalls or causes more problems than it solves. Here's how to tell if you need to pause and what to do about it.

### Signs You're Not Ready Yet

**Red flag 1: Your test suite takes hours to run**
If developers can't get feedback in minutes, they can't integrate frequently. Forcing TBD now will just slow everyone down.

**What to do:**
Pause the TBD migration. Invest 2-4 weeks in making tests faster. Parallelize test execution. Remove or optimize the slowest tests. Resume TBD when feedback takes less than 10 minutes.

**Red flag 2: More than half your tests are flaky**
If tests fail randomly, developers will ignore failures. You'll integrate broken code without realizing it.

**What to do:**
Stop adding new features. Spend one sprint fixing or deleting flaky tests. Track flakiness metrics. Only resume TBD when you trust your test results.

**Red flag 3: Production incidents increased significantly**
If TBD caused a spike in production issues, something is wrong with your safety net.

**What to do:**
Revert to short-lived branches (48-72 hours) temporarily. Analyze what's escaping to production. Add tests or checks to catch those issues. Resume direct-to-trunk when the safety net is stronger.

**Red flag 4: The team is in constant conflict**
If people are fighting about the process, frustrated daily, or actively working around it, you've lost the team.

**What to do:**
Hold a retrospective. Listen to concerns without defending TBD. Identify the top 3 pain points. Address those first. Resume TBD migration when the team agrees to try again.

### Signs You're Doing It Wrong (But Can Fix It)

**Yellow flag 1: Daily commits, but monthly integration**
You're committing to trunk, but your code doesn't connect to the rest of the system until the end.

**What to fix:**
Focus on interface-level integration. Ensure your tests exercise boundaries between components. Use contract tests.

**Yellow flag 2: Trunk is broken often**
If trunk is red more than 5% of the time, something's wrong with your testing or commit discipline.

**What to fix:**
Make "fix trunk immediately" the top priority. Consider requiring local tests to pass before pushing. Add pre-commit hooks if needed.

**Yellow flag 3: Feature flags piling up**
If you have more than 5 active flags, you're not cleaning up after yourself.

**What to fix:**
Set a team rule: "For every new flag created, remove an old one." Dedicate time each sprint to flag cleanup.

### How to Pause Gracefully

If you need to pause:

1. **Communicate clearly:**
   "We're pausing TBD migration for two weeks to fix our test infrastructure. This isn't abandoning the goal."

2. **Set a specific resumption date:**
   Don't let "pause" become "quit." Schedule a date to revisit.

3. **Fix the blockers:**
   Use the pause to address the specific problems preventing success.

4. **Retrospect and adjust:**
   When you resume, what will you do differently?

Pausing isn't failure. Pausing to fix the foundation is smart.

---

## What "Good" Looks Like

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

## Concrete Examples and Scenarios

Theory is useful. Examples make it real. Here are practical scenarios showing how to apply TBD principles.

### Scenario 1: Breaking Down a Large Feature

**Problem:**
You need to build a user notification system with email, SMS, and in-app notifications. Estimated: 3 weeks of work.

**Old approach (GitFlow):**
Create a `feature/notifications` branch. Work for three weeks. Submit a massive pull request. Spend days in code review and merge conflicts.

**TBD approach:**

**Week 1:**

- Day 1: Define notification interface, commit to trunk

  ```typescript
  // notifications/NotificationService.ts
  interface NotificationService {
    send(userId: string, message: NotificationMessage): Promise<void>;
  }

  interface NotificationMessage {
    title: string;
    body: string;
    priority: 'low' | 'normal' | 'high';
  }
  ```

  This compiles but doesn't do anything yet. That's fine.

- Day 2: Add in-memory implementation for testing

  ```typescript
  class InMemoryNotificationService implements NotificationService {
    private notifications: NotificationMessage[] = [];

    async send(userId: string, message: NotificationMessage) {
      this.notifications.push(message);
    }
  }
  ```

  Now other teams can use the interface in their code and tests.

- Day 3-5: Implement email notifications behind a feature flag

  ```typescript
  class EmailNotificationService implements NotificationService {
    async send(userId: string, message: NotificationMessage) {
      if (!features.emailNotifications) {
        return; // No-op when disabled
      }
      // Real implementation
    }
  }
  ```

  Commit daily. Deploy. Flag is off in production.

**Week 2:**

- Add SMS notifications (same pattern: interface, implementation, feature flag)
- Enable email notifications for internal users only
- Iterate based on feedback

**Week 3:**

- Add in-app notifications
- Roll out email and SMS to all users
- Remove flags for email once stable

**Result:** Integrated 12-15 times instead of once. Each integration was small and low-risk.

### Scenario 2: Database Schema Change

**Problem:**
You need to split the `users.name` column into `first_name` and `last_name`.

**Old approach:**
Update schema, update all code, deploy everything at once. Hope nothing breaks.

**TBD approach (expand-contract pattern):**

**Step 1: Expand (Day 1)**
Add new columns without removing the old one:

```sql
ALTER TABLE users ADD COLUMN first_name VARCHAR(255);
ALTER TABLE users ADD COLUMN last_name VARCHAR(255);
```

Commit and deploy. Application still uses `name` column. No breaking change.

**Step 2: Dual writes (Day 2-3)**
Update write path to populate both old and new columns:

```javascript
async function createUser(name) {
  const [firstName, lastName] = name.split(' ');
  await db.query(
    'INSERT INTO users (name, first_name, last_name) VALUES (?, ?, ?)',
    [name, firstName, lastName]
  );
}
```

Commit and deploy. Now new data populates both formats.

**Step 3: Backfill (Day 4)**
Migrate existing data in the background:

```javascript
async function backfillNames() {
  const users = await db.query('SELECT id, name FROM users WHERE first_name IS NULL');
  for (const user of users) {
    const [firstName, lastName] = user.name.split(' ');
    await db.query(
      'UPDATE users SET first_name = ?, last_name = ? WHERE id = ?',
      [firstName, lastName, user.id]
    );
  }
}
```

Run this as a background job. Commit and deploy.

**Step 4: Read from new columns (Day 5)**
Update read path behind a feature flag:

```javascript
async function getUser(id) {
  const user = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  if (features.useNewNameColumns) {
    return {
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }
  return { name: user.name };
}
```

Deploy and gradually enable the flag.

**Step 5: Contract (Week 2)**
Once all reads use new columns and flag is removed:

```sql
ALTER TABLE users DROP COLUMN name;
```

**Result:** Five deployments instead of one big-bang change. Each step was reversible. Zero downtime.

### Scenario 3: Refactoring Without Breaking the World

**Problem:**
Your authentication code is a mess. You want to refactor it without breaking production.

**TBD approach:**

**Day 1: Characterization tests**
Write tests that capture current behavior (warts and all):

```javascript
describe('Current auth behavior', () => {
  it('accepts password with special characters', () => {
    // Document what currently happens
  });

  it('handles malformed tokens by returning 401', () => {
    // Capture edge case behavior
  });
});
```

These tests document how the system *actually* works. Commit.

**Day 2-3: Strangler fig pattern**
Create new implementation alongside old one:

```javascript
class LegacyAuthService {
  // Existing messy code (don't touch it)
}

class ModernAuthService {
  // Clean implementation
}

class AuthServiceRouter {
  constructor(private legacy: LegacyAuthService, private modern: ModernAuthService) {}

  async authenticate(credentials) {
    if (features.modernAuth) {
      return this.modern.authenticate(credentials);
    }
    return this.legacy.authenticate(credentials);
  }
}
```

Commit with flag off. Old behavior unchanged.

**Day 4-7: Migrate piece by piece**
Enable modern auth for one endpoint at a time:

```javascript
if (features.modernAuth && endpoint === '/api/users') {
  return modernAuth.authenticate(credentials);
}
```

Commit daily. Monitor each endpoint.

**Week 2: Remove old code**
Once all endpoints use modern auth and it's been stable for a week:

```javascript
class AuthService {
  async authenticate(credentials) {
    // Just the modern implementation
  }
}
```

Delete the legacy code entirely.

**Result:** Continuous refactoring without a "big rewrite" branch. Production was never at risk.

### Scenario 4: Working with External API Changes

**Problem:**
A third-party API you depend on is changing their response format next month.

**TBD approach:**

**Week 1: Adapter pattern**
Create an adapter that normalizes both old and new formats:

```javascript
class PaymentAPIAdapter {
  async getPaymentStatus(orderId) {
    const response = await fetch(`https://api.payments.com/orders/${orderId}`);
    const data = await response.json();

    // Handle both old and new format
    if (data.payment_status) {
      // Old format
      return {
        status: data.payment_status,
        amount: data.total_amount,
      };
    } else {
      // New format
      return {
        status: data.status.payment,
        amount: data.amounts.total,
      };
    }
  }
}
```

Commit. Your code now works with both formats.

**Week 2-3:**
Wait for the third-party API to migrate. Your code keeps working.

**Week 4 (after API migration):**
Simplify adapter to only handle new format:

```javascript
async getPaymentStatus(orderId) {
  const response = await fetch(`https://api.payments.com/orders/${orderId}`);
  const data = await response.json();
  return {
    status: data.status.payment,
    amount: data.amounts.total,
  };
}
```

**Result:** No coupling between your deployment schedule and the external API migration. Zero downtime.

---

## References and Further Reading

### Trunk-Based Development

**Core Resources:**

- [trunkbaseddevelopment.com](https://trunkbaseddevelopment.com/) - Comprehensive guide by Paul Hammant
- ["Continuous Delivery"](https://continuousdelivery.com) by Jez Humble and David Farley - Foundational text on CD practices
- [Martin Fowler on Feature Toggles](https://martinfowler.com/articles/feature-toggles.html) - Deep dive into feature flag patterns

### Testing Practices

**ATDD and BDD:**

- ["Specification by Example"](https://gojko.net/books/specification-by-example/) by Gojko Adzic - Collaborative test writing
- "The Cucumber Book" by Matt Wynne and Aslak Hellesøy - Practical BDD guide
- [Three Amigos sessions](https://www.agilealliance.org/glossary/three-amigos/) - Collaborative requirements discovery

**Test-Driven Development:**

- "Test-Driven Development: By Example" by Kent Beck - TDD fundamentals
- "Growing Object-Oriented Software, Guided by Tests" by Steve Freeman and Nat Pryce - TDD at scale

**Contract Testing:**

- [Pact Documentation](https://docs.pact.io/) - Consumer-driven contract testing
- [Spring Cloud Contract](https://spring.io/projects/spring-cloud-contract) - For JVM ecosystems

### Patterns for Incremental Change

**Database Migrations:**

- "Refactoring Databases" by Scott Ambler and Pramod Sadalage - Expand-contract pattern
- [Evolutionary Database Design](https://martinfowler.com/articles/evodb.html) - Martin Fowler

**Legacy Code:**

- "Working Effectively with Legacy Code" by Michael Feathers - Characterization tests and strangler patterns
- [Strangler Fig Application](https://martinfowler.com/bliki/StranglerFigApplication.html) - Incremental rewrites

### Team Dynamics and Change Management

- "Accelerate" by Nicole Forsgren, Jez Humble, and Gene Kim - Data on what drives software delivery performance
- "Team Topologies" by Matthew Skelton and Manuel Pais - Organizing teams for fast flow
- [State of DevOps Reports](https://dora.dev/) - Annual research on delivery practices

### Continuous Integration

- "Continuous Integration: Improving Software Quality and Reducing Risk" by Paul Duvall
- [ThoughtWorks on CI](https://www.thoughtworks.com/continuous-integration) - Foundational practices
- [Continuous Delivery Foundation](https://cd.foundation/) - Community and standards

### Communities and Discussions

- [DevOps subreddit](https://www.reddit.com/r/devops/) - Practitioner discussions
- [Continuous Delivery Slack](https://continuousdelivery.slack.com/) - Active community
- [Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/) - Q&A on practices

---

## Final Thought

Migrating from GitFlow to TBD isn't a matter of changing your branching strategy.
It's a matter of changing your *thinking*.

Stop optimizing for isolation.  
Start optimizing for feedback.

Small, tested, integrated changes — delivered continuously — will always outperform big batches delivered occasionally.

That's why teams migrate to TBD.
Not because it's trendy, but because it's the only path to real continuous integration and continuous delivery.
