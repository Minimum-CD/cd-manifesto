---
title: Immutable Artifact
description: No human changes after commit.
weight: 5
---

Central to CD is that we are validating the artifact with the pipeline. It is built once and deployed to all environments. A common anti-pattern is building an artifact for each environment. The pipeline should generate immutable, versioned artifacts.

## Definition

- **Immutable Pipeline**: In the beginning, it may seem that the obvious way to address a failure in the pipeline is to go to the failure point, make some adjustments in the environment, test data, or whatever else failed, and then to re-start the pipeline from that point. However, that transforms a repeatable quality process into an untrustworthy custom build. Failures should be addressed by changes in version control so that two executions with the same configuration will always yield the same results.
- **Immutable Artifacts**: Some package management systems will allow the creation of release candidate versions. For example, it is common to find `-SNAPSHOT` versions used for this in Java. However, this means we have an artifact where the behavior can be changed without modifying the version. Version numbers are cheap. If we are to have an immutable pipeline, it must produce an immutable artifact. We should never have dependencies that use `-SNAPSHOT` versions and we should never produce `-SNAPSHOT` versions.

Immutability provides us with the confidence to know that the results from the pipeline are real and repeatable.

## What is Improved

- **Everything must be version controlled**: source code, environment configurations, application configurations, and even test data. This reduces variability and improves the quality process.
  