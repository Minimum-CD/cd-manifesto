# Continuous Delivery Manifesto

> "Continuous delivery improves both delivery performance and quality, and also helps improve culture and reduce burnout and deployment pain."
     	
-- Accelerate

We believe that it requires a common language to move the conversation forward and to help each other improve the flow of delivery. While our contexts may be different, there are engineering practices that underpin everything we do. It is important that we agree on the definitions of these practices to help those starting the journey to understand the technical problems to solve that bring the expected organizational improvements.

The practices below should be considered the minimums, not "done". Continuous improvement of the speed, quality, and safety of the delivery pipeline is the expected outcome. 

## Continuous Delivery

CD is the engineering discipline of delivering all changes in a standard way safely. It covers a broad spectrum of activities depending on what is being delivered. However, there are behaviors and abilities that must be met in every context to qualify as "continuous delivery"

The minimum activities required for CD are:

- [Continuous integration](#continuous-integration)
- One path to production
- Always meets our definition of deployable 
- Immutable artifact. No human changes after commit.
- All feature work stops when the pipeline is red 
- Production-like test environment
- Rollback on-demand
- Configuration deploys with artifact

## Continuous Integration

CI is the activity of very frequently integrating work to the trunk of version control and verifying that the work is, to the best of our knowledge, releasable.

The minimum activities required for CI are:

- [Trunk-based development](#trunk-based-development)
- Work integrates to the trunk at a minimum daily
- Work is tested before merge to trunk
- All feature work stops when the build is red 
- New work does not break delivered work
- Work is tested with other work automatically on commit

## Trunk-based Development

Trunk-based development is the safest branching pattern. It prevents lost work, the risk of corruption that comes from merge conflict resolution, and also reduces movement waste that increases batch size.

- The minimum activities required for TBD are:
  - All changes integrate into the trunk
  - If branches from the trunk are used:
    - They originate from the trunk
    - The re-integrate to the trunk
    - They are short-lived and removed after the merge

## Signatories

| Name          | Contact                                    |
|---------------|--------------------------------------------|
| Bryan Finster | https://www.linkedin.com/in/bryan-finster/ |
| Joe Arrowood  | https://www.linkedin.com/in/joearrowood/   |
| Jerreck McWilliams | https://www.linkedin.com/in/jerreck/ |
| Patrick S. Kelso | https://www.linkedin.com/in/patrickkelso/ |
| Istvan Bathazi| https://www.linkedin.com/in/ibathazi/      |

## Beyond the Minimums

Resources for improving the delivery pipelines to move from "basic" to "elite"

[Implementing Continuous Delivery](https://cloud.google.com/architecture/devops/devops-tech-continuous-delivery#implementing_continuous_delivery)

[Continuous Delivery Pipelines](https://leanpub.com/cd-pipelines) by Dave Farley

[Engineering the Digital Transformation](https://garygruver.com/engineering-digital-transformation.php) by Gary Gruver

[Continuous Delivery](https://continuousdelivery.com/) by Dave Farley and Jez Humble

## Acknowledgements

This is the outcome of several meetings at the bar at the DevOps Enterprise Summit in October, 2021. It is our consensus
of the bare minimum implementation of CD.
