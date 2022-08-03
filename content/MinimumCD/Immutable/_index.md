---
title: Immutable Artifact
description: No human changes after commit.
weight: 5
draft: true
---

## Definition

An immutable, versioned artifact cannot be changed after the pipeline creates it and must not be manipulated outside of the pipeline after the pipeline begins. The pipeline must be treated as a black box.

## Recommended practices

- Any failure of a pipeline that requires a change should be changed in version control and the entire pipeline should be rerun. We should not address issues locally in the pipeline and re-start.
- Package management systems such as Maven allow SNAPSHOT versions to be added to the artifact repository that can be updated as release candidates. We should avoid this in a CD workflow. We need the ability to confidently re-build an existing artifact. If our artifact depends on a SNAPSHOT that someone else is updating, then we have no control over the repeatability of our pipeline's output.
- In the beginning, it's not uncommon to have flaky tests. However, it's bad practice to retry until the test passes. Prioritize identifying the reasons for the failures and correct them.

## Forcing Functions

- **Improved Test Architecture**:
- **Repeatable Builds**:

## Health Metrics

## FAQ
