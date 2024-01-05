---
title: Minimum Viable CD
description: ""
weight: 1
---


{{% notice %}}
"Continuous delivery improves both delivery performance and quality, and also helps improve culture and reduce burnout and deployment pain."

-- Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations
{{% /notice %}}

![MinimumCD](/images/minimumCD-logo-hex.png?height=150px)

We, [the undersigned](#signatories), believe that a minimal definition of continuous delivery (CD) is required to improve the flow of delivery and achieve the outcomes above. While our contexts may be different, there are universal practices common in all. By defining them we can:

- Introduce new practitioners in a consistent way
- Discuss engineering practices that comprise CD
- Help each other improve current capabilities

Only by implementing core practices do we begin to see the benefits of continuous delivery.

The practices below are the minimum, a starting point. Continuous improvement of the speed, quality, and safety of the delivery pipeline is the expected outcome.

---

## Continuous Delivery

CD is the engineering discipline of delivering all changes in a standard way safely. It covers a broad spectrum of activities depending on what is being delivered. However, there are behaviors and abilities that must be met in every context to qualify as "continuous delivery"

The minimum activities required for CD are:

- Use [Continuous integration](#continuous-integration)
- The [application
  pipeline](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract)
  is the only way to deploy to any environment
- The pipeline decides the releasability of changes, its verdict is [definitive](../faq/#why-should-the-pipeline-be-definitive-for-deploy)
- Artifacts created by the pipeline always meet the organization's [definition of deployable](../faq/#what-do-we-mean-by-definition-of-deployable)
- [Immutable artifact](../minimumcd/immutable/) (no human changes after commit)
- All feature work stops when the pipeline is red
- Production-like test environment
- Rollback on-demand
- [Application configuration](../faq/#what-is-application-configuration) deploys with artifact
  
## Continuous Integration

CI is the activity of very frequently integrating work to the trunk of version control and verifying that the work is, to the best of our knowledge, releasable.

The minimum activities required for CI are:

- [Trunk-based development](#trunk-based-development)
- Work integrates to the trunk at a minimum daily
- Work has automated testing before merge to trunk
- Work is tested with other work automatically on merge
- All feature work stops when the build is red
- New work does not break delivered work

## Trunk-based Development

[Trunk-based development](../minimumcd/tbd) is the branching pattern required to meet the definition
of CI. It prevents lost work, the risk of corruption that comes from merge conflict resolution, and also reduces movement
waste that increases batch size.

The minimum activities required for TBD are:

- All changes integrate into the trunk
- If branches from the trunk are used:
  - They originate from the trunk
  - They re-integrate to the trunk
  - They are short-lived and removed after the merge

## Why did we build this?

For background on Minimum CD and answers to other common questions, please [read the FAQs](../faq).

## Starting the Journey

Questions on where to start? Check out some [recommendations](../journey).

## Contributing

Do you want to submit a translation, good practices, suggestions, or an experience report?

Read our [contribution guidelines](https://github.com/Minimum-CD/cd-manifesto/blob/master/CONTRIBUTING.md).

## Contributors

{{< contributors >}}

## Signatories

{{< signatures >}}
