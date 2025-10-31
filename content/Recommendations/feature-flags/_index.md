---
title: Feature Flag Guidance
description: 'Comprehensive guide to feature flags in continuous delivery. Learn when feature flags are necessary for gradual rollout and experimentation, and when alternative patterns like branch by abstraction are better choices for trunk-based development.'
weight: 1
type: docs
---

Feature flags are a useful tool. However, they are also often misused because people fail to consider other options when
it comes to hiding incomplete features to enable frequent code integration. Below is a chart that covers common
reasons people reach for feature flags and why some of those reasons are wrong. Also, you don't need a complicated tool for
feature flags... until you do. See the section below the decision tree for examples of feature flag implementation based
on use case.

```mermaid
graph TD
    Start[New Code Change] --> Q1{Is this a large or<br/>high-risk change?}

    Q1 -->|Yes| Q2{Do you need gradual<br/>rollout or testing<br/>in production?}
    Q1 -->|No| Q3{Is the feature<br/>incomplete or spans<br/>multiple releases?}

    Q2 -->|Yes| UseFF1[YES - USE FEATURE FLAG<br/>Enables safe rollout<br/>and quick rollback]
    Q2 -->|No| Q4{Do you need to<br/>test in production<br/>before full release?}

    Q3 -->|Yes| Q3A{Can you use an<br/>alternative pattern?}
    Q3 -->|No| Q5{Do different users/<br/>customers need<br/>different behavior?}

    Q3A -->|New Feature| NoFF_NewFeature[NO - NO FEATURE FLAG<br/>Connect to tests only,<br/>integrate in final commit]
    Q3A -->|Behavior Change| NoFF_Abstraction[NO - NO FEATURE FLAG<br/>Use branch by<br/>abstraction pattern]
    Q3A -->|New API Route| NoFF_API[NO - NO FEATURE FLAG<br/>Build route, expose<br/>as last change]
    Q3A -->|Not Applicable| UseFF2[YES - USE FEATURE FLAG<br/>Enables trunk-based<br/>development]

    Q4 -->|Yes| UseFF3[YES - USE FEATURE FLAG<br/>Dark launch or<br/>beta testing]
    Q4 -->|No| Q6{Is this an<br/>experiment or<br/>A/B test?}

    Q5 -->|Yes| UseFF4[YES - USE FEATURE FLAG<br/>Customer-specific<br/>toggles needed]
    Q5 -->|No| Q7{Does change require<br/>coordination with<br/>other teams/services?}

    Q6 -->|Yes| UseFF5[YES - USE FEATURE FLAG<br/>Required for<br/>experimentation]
    Q6 -->|No| NoFF1[NO - NO FEATURE FLAG<br/>Simple change,<br/>deploy directly]

    Q7 -->|Yes| UseFF6[YES - USE FEATURE FLAG<br/>Enables independent<br/>deployment]
    Q7 -->|No| Q8{Is this a bug fix<br/>or hotfix?}

    Q8 -->|Yes| NoFF2[NO - NO FEATURE FLAG<br/>Deploy immediately]
    Q8 -->|No| NoFF3[NO - NO FEATURE FLAG<br/>Standard deployment<br/>sufficient]

    style UseFF1 fill:#90EE90
    style UseFF2 fill:#90EE90
    style UseFF3 fill:#90EE90
    style UseFF4 fill:#90EE90
    style UseFF5 fill:#90EE90
    style UseFF6 fill:#90EE90
    style NoFF1 fill:#FFB6C6
    style NoFF2 fill:#FFB6C6
    style NoFF3 fill:#FFB6C6
    style NoFF_NewFeature fill:#FFB6C6
    style NoFF_Abstraction fill:#FFB6C6
    style NoFF_API fill:#FFB6C6
    style Start fill:#87CEEB
```

## Feature Flag Implementation Approaches

### Static Code-Based

Hardcoded constants, configuration files, environment variables
Changes require deployment or restart
Best for: Stable flags, environment-specific behavior

### Dynamic In-Process

Database queries, cache lookups, file watching
Changes take effect without restart
Best for: Simple dynamic flags within a single application

### Centralized Service

Dedicated flag service (self-hosted or SaaS)
HTTP/RPC calls to fetch flag state
Best for: Multiple applications, complex targeting, team collaboration

### Infrastructure Routing

Load balancer rules, reverse proxy logic, service mesh routing
Traffic directed based on headers, cookies, or user attributes
Best for: Routing to entirely different services/versions

### Edge/Gateway Level

API gateway, CDN, edge computing platforms
Flag evaluation at the network edge before reaching application
Best for: Global scale, minimal latency impact, frontend routing

### Hybrid/Multi-Layer

Combination of application logic + infrastructure routing
Different layers for different concerns (kill switch vs. granular logic)
Best for: Complex systems requiring defense in depth

Key Decision Factors

- Dynamism: How quickly must flags change? (deployment vs. runtime)
- Scope: Single service vs. multiple services vs. entire infrastructure
- Targeting complexity: Boolean vs. user segments vs. percentage rollouts
- Performance: Acceptable latency for flag evaluation
- Operational burden: What infrastructure can your team maintain?
- Cost: Build vs. buy tradeoffs

## Temporary Feature Flag Lifecycle

Most feature flags should be temporary. Leaving flags in place indefinitely creates technical debt, increases complexity, and makes the codebase harder to maintain. Follow this lifecycle for temporary feature flags:

### 1. Create Flag with Removal Plan

**Before writing any code**, create the flag with a clear removal strategy:

**Create backlog items:**

- Story: Implement feature behind flag
- **Cleanup story: Remove feature flag** (add this immediately to backlog)

**Document the flag:**

```javascript
// TEMPORARY FLAG - Remove after rollout complete
// Removal ticket: PROJ-1234
// Created: 2025-01-15
// Expected removal: 2025-02-15 (30 days after rollout)
const ENABLE_NEW_CHECKOUT = featureFlags.get('new-checkout')
```

**Set an expiration date** - Most flags should be removed within 2-4 weeks after full rollout.

### 2. Deploy Flag in OFF State

**Initial deployment validates the flag mechanism:**

```javascript
// Day 1: Deploy flag infrastructure
if (featureFlags.get('new-checkout')) {
  return renderNewCheckout() // Not yet accessible
}
return renderOldCheckout() // Current behavior
```

**Commit and deploy with flag OFF:**

- Validates flag can be toggled without code changes
- Confirms flag infrastructure is working
- No user-facing changes yet

### 3. Build Feature Incrementally

**Integrate code to trunk daily while flag is OFF:**

```javascript
// Day 2-5: Build feature behind flag
function NewCheckout() {
  // New implementation being built
  // Can be integrated daily because flag is OFF
}

if (featureFlags.get('new-checkout')) {
  return <NewCheckout /> // Still OFF in production
}
return <OldCheckout />
```

Each commit:

- Has passing tests for the new feature
- Doesn't affect production users (flag is OFF)
- Integrates to trunk daily

### 4. Test in Production (Dark Launch)

**Turn flag ON for internal users only:**

```javascript
// Enable for employees, beta testers, or specific test accounts
const newCheckoutEnabled = featureFlags.get('new-checkout', {
  userId: currentUser.id,
  userGroups: currentUser.groups,
})
```

**Validation checklist:**

- Feature works as expected in production environment
- No performance degradation
- Error rates remain normal
- Monitoring and alerts functioning

### 5. Gradual Rollout

**Progressively increase user exposure:**

```javascript
// Day 6: Enable for 1% of users
// Day 7: Enable for 5% of users
// Day 8: Enable for 25% of users
// Day 9: Enable for 50% of users
// Day 10: Enable for 100% of users
```

**Monitor at each stage:**

- Error rates
- Performance metrics
- User feedback
- Business metrics

**Rollback immediately if issues detected** - This is the primary value of the flag.

### 6. Complete Rollout

**Once 100% of users have the new feature:**

```javascript
// All users now see new feature
const newCheckoutEnabled = featureFlags.get('new-checkout') // Returns true
```

**Wait for stability period:**

- Run at 100% for 3-7 days
- Confirm no issues emerge
- Verify rollback is no longer needed

### 7. Remove the Flag (CRITICAL)

**This step must not be skipped:**

**Week 1-2 after 100% rollout:**

- Prioritize the cleanup story
- Remove flag checks from code
- Delete flag configuration
- Remove flag from flag management system

**Before:**

```javascript
if (featureFlags.get('new-checkout')) {
  return <NewCheckout />
}
return <OldCheckout />
```

**After:**

```javascript
// Flag removed - new checkout is now standard behavior
return <NewCheckout />
```

**Complete cleanup:**

- Remove old implementation code
- Remove flag-related tests
- Remove flag documentation
- Update monitoring/alerts if needed

### Lifecycle Timeline Example

| Day   | Action                                             | Flag State  |
| ----- | -------------------------------------------------- | ----------- |
| 1     | Deploy flag infrastructure + create removal ticket | OFF         |
| 2-5   | Build feature behind flag, integrate daily         | OFF         |
| 6     | Enable for internal users (dark launch)            | ON for 0.1% |
| 7     | Enable for 1% of users                             | ON for 1%   |
| 8     | Enable for 5% of users                             | ON for 5%   |
| 9     | Enable for 25% of users                            | ON for 25%  |
| 10    | Enable for 50% of users                            | ON for 50%  |
| 11    | Enable for 100% of users                           | ON for 100% |
| 12-18 | Stability period (monitor)                         | ON for 100% |
| 19-21 | **Remove flag from code**                          | DELETED     |

**Total lifecycle: ~3 weeks from creation to removal**

## Long-Lived Feature Flags

Some flags are intentionally permanent and should be managed differently:

### Operational Flags (Kill Switches)

**Purpose:** Disable expensive features under load
**Lifecycle:** Permanent
**Management:** Treat as system configuration, document clearly

```javascript
// PERMANENT FLAG - System operational control
// Used to disable expensive features during incidents
const enableRecommendations = featureFlags.get('enable-recommendations')
```

### Customer-Specific Toggles

**Purpose:** Different customers get different features
**Lifecycle:** Permanent (tied to customer contracts)
**Management:** Part of customer configuration system

```javascript
// PERMANENT FLAG - Customer entitlement
// Controlled by customer subscription level
const hasAdvancedAnalytics = customer.subscription.includes('analytics')
```

### Experimentation Flags

**Purpose:** A/B testing and experimentation
**Lifecycle:** Permanent flag, temporary experiments
**Management:** Experiment metadata has expiration, flag infrastructure is permanent

```javascript
// PERMANENT FLAG - Experimentation platform
// Individual experiments expire, platform remains
const variant = experiments.get('checkout-optimization')
```

**Mark permanent flags clearly:**

- Document why they're permanent
- Different naming convention (e.g., `KILL_SWITCH_*`, `ENTITLEMENT_*`)
- Separate from temporary flags in management system
- Regular review to confirm still needed

## Anti-Patterns to Avoid

**Don't skip the removal ticket:**

- WRONG: "We'll remove it later when we have time"
- RIGHT: Create removal ticket when creating the flag

**Don't leave flags indefinitely:**

- WRONG: Flag still in code 6 months after 100% rollout
- RIGHT: Remove within 2-4 weeks of full rollout

**Don't create nested flags:**

- WRONG: `if (featureA && featureB && featureC)`
- RIGHT: Each feature has independent flag, removed promptly

**Don't forget to remove the old code:**

- WRONG: Flag removed but old implementation still in codebase
- RIGHT: Remove flag AND old implementation together

**Don't make all flags permanent "just in case":**

- WRONG: "Let's keep it in case we need to rollback in the future"
- RIGHT: After stability period, rollback is via deployment, not flag
