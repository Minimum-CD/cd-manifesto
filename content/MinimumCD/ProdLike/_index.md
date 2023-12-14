---
title: Prod-Like Test Environment
description: Leveraging production-like test environments in your CI/CD pipeline enables reliable testing.
weight: 5
---
## Definition
It is crucial to leverage pre-production environments in your CI/CD to run all of your tests [Unit / Integration / UAT / Manual QA / E2E] early and often.
- **Staging environment**: Ideally this is the last environment that teams will run automated tests against prior to a deployment, particularly for testing interaction between all new features after a merge. Its infrastructure will reflect production as closely as possible.
- **Ephemeral environments (collected from [EphemeralEnvironments.io](https://ephemeralenvironments.io))**: These are full-stack, on-demand environments that are spun up on every code change. Each ephemeral environment should be leveraged in your CI pipeline, which will run E2E, unit, and integration tests against them on every code change. These environments should be fully GitOps-enabled and their lifecycle should be automated. They are short-lived by definition but should closely resemble production; they are intended to replace long lived “static” environments, ie. “development”, “QA1”, “QA2”, “testing”, etc.

## What is Improved
- **Infrastructure is kept consistent**: Test environments deliver results that reflect real-world performance. Few unprecedented bugs sneak into production since using prod-like data and dependencies allows you to run your entire test suite earlier against multiple prod-like environments.
- **Test against latest changes**: These environments will rebuild upon code changes with no DevOps team intervention.
- **Test before merge**: Attaching an ephemeral environment to every PR enables E2E testing in your CI before code changes get deployed to staging. New features get tested in parallel, avoiding the dreaded “waiting to run my tests” blocking your entire SDLC.