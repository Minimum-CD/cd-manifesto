---
title: Feature Flags
description: When to use, or not use, feature flags
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
    
    Q2 -->|Yes| UseFF1[✓ USE FEATURE FLAG<br/>Enables safe rollout<br/>and quick rollback]
    Q2 -->|No| Q4{Do you need to<br/>test in production<br/>before full release?}
    
    Q3 -->|Yes| Q3A{Can you use an<br/>alternative pattern?}
    Q3 -->|No| Q5{Do different users/<br/>customers need<br/>different behavior?}
    
    Q3A -->|New Feature| NoFF_NewFeature[✗ NO FEATURE FLAG<br/>Connect to tests only,<br/>integrate in final commit]
    Q3A -->|Behavior Change| NoFF_Abstraction[✗ NO FEATURE FLAG<br/>Use branch by<br/>abstraction pattern]
    Q3A -->|New API Route| NoFF_API[✗ NO FEATURE FLAG<br/>Build route, expose<br/>as last change]
    Q3A -->|Not Applicable| UseFF2[✓ USE FEATURE FLAG<br/>Enables trunk-based<br/>development]
    
    Q4 -->|Yes| UseFF3[✓ USE FEATURE FLAG<br/>Dark launch or<br/>beta testing]
    Q4 -->|No| Q6{Is this an<br/>experiment or<br/>A/B test?}
    
    Q5 -->|Yes| UseFF4[✓ USE FEATURE FLAG<br/>Customer-specific<br/>toggles needed]
    Q5 -->|No| Q7{Does change require<br/>coordination with<br/>other teams/services?}
    
    Q6 -->|Yes| UseFF5[✓ USE FEATURE FLAG<br/>Required for<br/>experimentation]
    Q6 -->|No| NoFF1[✗ NO FEATURE FLAG<br/>Simple change,<br/>deploy directly]
    
    Q7 -->|Yes| UseFF6[✓ USE FEATURE FLAG<br/>Enables independent<br/>deployment]
    Q7 -->|No| Q8{Is this a bug fix<br/>or hotfix?}
    
    Q8 -->|Yes| NoFF2[✗ NO FEATURE FLAG<br/>Deploy immediately]
    Q8 -->|No| NoFF3[✗ NO FEATURE FLAG<br/>Standard deployment<br/>sufficient]
    
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
