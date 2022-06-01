---
title: Definition of Deployable
description: Pipeline artifacts always meet the organization's definition of deployable
weight: 5
draft: true
---

## Definition

Once the organization's definition of "deployable" is determined, those checks are incorporated into the pipeline so that the pipeline can continuously verify that the definition is met. The pipeline's job is to prevent changes that do not meet that defimition from deploying.

## Recommended practices

- Start by defining the rules that must be met for code quality, functional testing, security, compliance, performance, etc.
- Automate the low hanging fruit and being using the pipeline to verify those.
- Continue manually verifying the remaining items until they are automated, but relentlessly reduce the number of manual checks.
- Manual inspection that cannot be automated should be removed as a release decision. For example, usability testing requires a human. It should be a continuous process and not an inspection activity prior to release.
- If a quality issue is discovered in production, we need to find the most efficient way to add a check for that in the pipeline. We won't think of everything to test for. The automation doesn't make this less likely, but it does make it far easier to prevent reoccurrences.

## Forcing Functions

- Requires defining "releasable" in an objective way.
- Standardizes quality gates.
- Relentlessly improves the efficiency and effectiveness of the quality process.

## Health Metrics

- **Pipeline cycle time**: The time from when a change is made to the trunk until the change is released.
- **Defect creation rate**: The number and severity of defects 

## FAQ
