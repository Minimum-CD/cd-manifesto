# Minimum Viable Continuous Delivery

> "Continuous delivery improves both delivery performance and quality, and also helps improve culture and reduce burnout and deployment pain."

-- Accelerate

We, [the undersigned](#signatories), believe that a minimal definition of continuous delivery (CD)  is required to improve the flow of delivery. While our
contexts may be different, there are universal practices. By defining them we can:

- Introduce new practitioners in a consistent way
- Discuss engineering practices that comprise CD
- Help each other improve current capabilities

Only by implementing core practices do we begin to see the benefits of continuous delivery.

The practices below are the minimum, a starting point. Continuous improvement of the speed, quality, and safety of the delivery pipeline is the expected outcome.

## Continuous Delivery

CD is the engineering discipline of delivering all changes in a standard way safely. It covers a broad spectrum of activities depending on what is being delivered. However, there are behaviors and abilities that must be met in every context to qualify as "continuous delivery"

The minimum activities required for CD are:

- [Continuous integration](#continuous-integration)
- One path to production
- [Always meets the organization's definition of deployable](https://www.youtube.com/watch?v=bHKHdp4H-8w)
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
- Work has automated testing before merge to trunk
- Work is tested with other work automatically on merge
- All feature work stops when the build is red
- New work does not break delivered work

## Trunk-based Development

Trunk-based development is the safest branching pattern. It prevents lost work, the risk of corruption that comes from merge conflict resolution, and also reduces movement waste that increases batch size.

- The minimum activities required for TBD are:
  - All changes integrate into the trunk
  - If branches from the trunk are used:
    - They originate from the trunk
    - The re-integrate to the trunk
    - They are short-lived and removed after the merge

## Signatories

| Name               | Contact                                                     |
|--------------------|-------------------------------------------------------------|
| Bryan Finster      | <https://www.linkedin.com/in/bryan-finster/>                |
| Ferrix Hovi        | <https://www.linkedin.com/in/ferrix/>                       |
| Justin Abrahms     | <https://justin.abrah.ms/>                                  |
| Joe Arrowood       | <https://www.linkedin.com/in/joearrowood/>                  |
| Jerreck McWilliams | <https://www.linkedin.com/in/jerreck/>                      |
| Istvan Bathazi     | <https://www.linkedin.com/in/istvan-bathazi/>               |
| Sara Gramling      | <https://www.linkedin.com/in/saragramling/>                 |
| Tracy Bannon       | <https://www.linkedin.com/in/tracylbannon/>                 |
| Patrick S. Kelso   | <https://www.linkedin.com/in/patrickkelso/>                 |
| Ben Link           | <https://www.linkedin.com/in/benjamindlink/>                |
| Chris Kernaghan    | <https://www.linkedin.com/in/chriskernaghan/>               |
| Chris Gossett      | <https://www.linkedin.com/in/christopher-gossett-03b09347/> |
| Joshua Barton      | <https://www.linkedin.com/in/bartonjoshua/>                 |
| Marc Boudreau      | <https://www.linkedin.com/in/marc-boudreau>                 |
| Courtney Kissler   | <https://www.linkedin.com/in/courtney-kissler-0930681/>     |

## [Beyond the Minimums](./references.md)

## [Why did we build this?](./faq.md)
