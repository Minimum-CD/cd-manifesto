---
title: Pipeline Hygiene
description: Advice on keeping delivery pipelines healthy
weight: 1
---

The following are known good practices for maintaining a healthy delivery pipeline

## Canary Builds

A canary build is an execution of a pipeline even when no code changes are made. Performing a scheduled build for a component that is not under active development ensures that there are no surprises when a critical change is needed. It also helps keep applications secure by reporting new vulnerabilities when the security scans are re-run.

True story: A repository for a web API did not require changes for 6 months. A feature was requested that required a new property to be exposed on the API for consumers; normally a 1-2 day effort. When the change was made and the pipeline was triggered, one of the dependencies of the API had a new security issue that required upgrading to the next major version. This required 2 weeks of effort to upgrade the dependency. Had the pipeline been run regularly, then the issue would have been known and fixed and there would not have been both a vulnerability in production for months and a major delay in delivering a new feature to the business.

## Error Budgets

## Certified pipelines