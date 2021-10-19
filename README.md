# Minimum Viable Continuous Delivery

> "Continuous delivery improves both delivery performance and quality, and also helps improve culture and reduce burnout and deployment pain."

-- Accelerate

We, [the undersigned](#signatories), believe that a minimal definition of continuous delivery (CD)  is required to improve the flow of delivery. While our contexts may be different, there are universal practices. By defining them we can:

- Introduce new practitioners in a consistent way
- Discuss engineering practices that comprise CD
- Help each other improve current capabilities

Only by implementing core practices do we begin to see the benefits of continuous delivery.

The practices below are the minimum, a starting point. Continuous improvement of the speed, quality, and safety of the delivery pipeline is the expected outcome.

---

## Continuous Delivery

CD is the engineering discipline of delivering all changes in a standard way safely. It covers a broad spectrum of activities depending on what is being delivered. However, there are behaviors and abilities that must be met in every context to qualify as "continuous delivery"

The minimum activities required for CD are:

- [Continuous integration](#continuous-integration)
- The [application
  pipeline](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract)
  is the only path to deploy to production.
- The pipeline decides the releasability of changes, its verdict is [definitive](./faq.md#why-should-the-pipeline-be-definitive-for-deploy)
- Artifacts created by the pipeline always meet the organization's [definition of deployable](./faq.md#what-do-we-mean-by-definition-of-deployable)
- [Immutable artifact](./faq#what-is-an-immutable-artifact). No human changes after commit.
- All feature work stops when the pipeline is red
- Production-like test environment
- Rollback on-demand
- [Application configuration](./faq.md#what-is-application-configuration) deploys with artifact 

## Continuous Integration

CI is the activity of very frequently integrating work to the trunk of version control and verifying that the work is, to the best of our knowledge, releasable.

The minimum activities required for CI are:

- [Trunk-based development](https://trunkbaseddevelopment.com/)
- Work integrates to the trunk at a minimum daily
- Work has automated testing before merge to trunk
- Work is tested with other work automatically on merge
- All feature work stops when the build is red
- New work does not break delivered work

## Trunk-based Development

[Trunk-based development](https://trunkbaseddevelopment.com/) is the branching pattern required to meet the definition
of CI. It prevents lost work, the risk of corruption that comes from merge conflict resolution, and also reduces movement
waste that increases batch size.

- The minimum activities required for TBD are:
  - All changes integrate into the trunk
  - If branches from the trunk are used:
    - They originate from the trunk
    - They re-integrate to the trunk
    - They are short-lived and removed after the merge

## Beyond the Minimums

Minimum CD is not the first step in a maturity model. However, it is still the bare minimum upon which many more practices should be built as appropriate to your context.  To aid your journey in going beyond Minimum CD, we maintain a list of resources that focus on Continuous Delivery which we have found very useful in our own journeys. 

These contain the basics, but also the knowledge needed to become an "Elite" CD organization. They are specific to solving the problem of "why can't we go to production today?"

[Read the list](./references.md).

## Why did we build this?

For more background on Minimum CD and answers to other common questions, please [read the FAQs](./faq.md).

## Translations

- [Finnish](./fi/README.md)

## Want to Contribute or become a signatory?

Read our [contribution guidelines](./CONTRIBUTING.md).

## Signatories

| Name               | Contact                                                     |
|--------------------|-------------------------------------------------------------|
| Dave Farley        | <https://www.linkedin.com/in/dave-farley-a67927>            |
| Bryan Finster      | <https://www.linkedin.com/in/bryan-finster/>                |
| Ferrix Hovi        | <https://www.linkedin.com/in/ferrix/>                       |
| Justin Abrahms     | <https://justin.abrah.ms/>                                  |
| Joe Arrowood       | <https://www.linkedin.com/in/joearrowood/>                  |
| Jerreck McWilliams | <https://www.linkedin.com/in/jerreck/>                      |
| Istvan Bathazi     | <https://www.linkedin.com/in/istvan-bathazi/>               |
| Sara Gramling      | <https://www.linkedin.com/in/saragramling/>                 |
| Tracy Bannon       | <https://www.linkedin.com/in/tracylbannon/>                 |
| Dana Finster       | <https://www.linkedin.com/in/danafinster/>                  |
| Patrick S. Kelso   | <https://www.linkedin.com/in/patrickkelso/>                 |
| Ben Link           | <https://www.linkedin.com/in/benjamindlink/>                |
| Chris Kernaghan    | <https://www.linkedin.com/in/chriskernaghan/>               |
| Chris Gossett      | <https://www.linkedin.com/in/christopher-gossett-03b09347/> |
| Joshua Barton      | <https://www.linkedin.com/in/bartonjoshua/>                 |
| Marc Boudreau      | <https://www.linkedin.com/in/marc-boudreau>                 |
| Courtney Kissler   | <https://www.linkedin.com/in/courtney-kissler-0930681/>     |
| Andrea Laforgia    | <https://www.linkedin.com/in/andrealaforgia/>               |
| Michael Nygard     | <https://www.linkedin.com/in/mtnygard/>                     |
| Aurel Estoup       | <https://www.linkedin.com/in/aurel-estoup/>                 |
| Emiliano Sutil     | <https://www.linkedin.com/in/emiliano-sutil-77a2091b/>      |
| Jason Walker       | <https://github.com/desktophero>                            |
| Thomas J. Sweet    | <https://www.linkedin.com/in/thomasjsweet/>                 |
| Kelly Brownsberger | <https://www.linkedin.com/in/kellybrownsberger/>            |
| Andrew Marshall    | <https://www.linkedin.com/in/ajmarshall2k/>                 |
| Vilas Veeraraghavan| <https://www.linkedin.com/in/vilas-veeraraghavan/>          |
| Javier Lopez       | <https://www.linkedin.com/in/javierlopezfernandez/>         |
| Javier Magana      | <https://www.linkedin.com/in/javier-a-magana-98108/>        |
| Faraz Syed         | <https://www.linkedin.com/in/farazsyed/>                    |
| James Simon        | <https://www.linkedin.com/in/jamesesimon/>                  |
| Nathen Harvey      | <https://twitter.com/nathenharvey>                          |
| Jesse Getzie       | <https://www.linkedin.com/in/jessegetzie/>                  |
| Christophe Chaudier| <https://www.linkedin.com/in/cchaudier/>                    |
| Rosalind Radcliffe | <https://www.linkedin.com/in/rosalind-radcliffe/>           | 
| Austin Abro        | <https://www.linkedin.com/in/austinabro/>                   |
| Ron Forrester      | <https://www.linkedin.com/in/ronforresterpdx/>              |
| David Hawes-Johnson| <https://www.linkedin.com/in/davidhawesjohnson/>            |
| Paul Moore         | <https://www.linkedin.com/in/pdmoore2/>                     |
| Shawn Button       | <https://www.linkedin.com/in/shawnbutton/>                  |
| Jesse Lin          | <https://www.linkedin.com/in/jesse-lin/>                    |
| Markus Mikkolainen | <https://www.linkedin.com/in/itmmti/>                       |
| Alessandro Fardin  | <https://www.linkedin.com/in/alessandro-fardin-61028b28/>   |
| James Moverley     | <https://www.linkedin.com/in/jmoverley/>                    |
| Michael Kingery    | <https://www.linkedin.com/in/kingerymike/>                  |
| Isaac Perez Moncho | <https://www.linkedin.com/in/isaac-perez-moncho-84922b6/>   |
| Igor Gassmann      | <https://igassmann.me/>                                     |
| Wayne Gaskill      | <https://www.linkedin.com/in/waynegaskill/>                 |
| Chris Gallivan     | <https://www.linkedin.com/in/christopher-gallivan-16a2b02/> |
| Alexander Birk     | <https://www.linkedin.com/in/alexander-birk-050625215/>     |
| Kaine Bent         | <https://www.linkedin.com/in/ka1ne/>                        |
| Andrew Ochsner     | <https://www.linkedin.com/in/aochsner/>                     |
| Stephen Magill     | <https://www.linkedin.com/in/stephen-magill-2070a096/>      |
