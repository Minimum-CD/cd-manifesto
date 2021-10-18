# Implementazione minima della Continuous Delivery

> "La Continuous delivery migliora sia, la velocità di rilascio che la qualità del software ed aiuta a migliorare la cultura, riduce i burnout e il panico da rilascio."

-- Accelerate `(Unofficial translation)`

Noi, [i firmatari](#Firmatari), crediamo che la definizione di un'implemtazione minima della continuous Delivery sia necessaria per migliorare il flusso di rilascio SW. Il contesto in cui operiamo può essere differente, ma esistono pratiche universali. Definendo tali pratice possiamo:

- Introdurre alla Continuous Delivery nuovi praticanti con una modalità più consistente e lineare
- Discutere le pratiche ingegneristiche che compongono la CD
- Aiutare a migliorare le nostre conoscenze attuali

Soltanto partendo da questo set minimo di pratiche essenziali potremmo iniziare a vedere i vantaggi della Continuous Delivery.

Le pratiche sotto elencate sono lo scheletro minimo, un punto di partenza. Il continuo miglioramento della velocità, qualità e sicurezza della delivery pipeline sono i risultati attesi.

---

## Continuous Delivery

La CD è la disciplina ingegneristica di rilasciare tutte le modifiche SW in una modalità standardizzata e sicura. La CD copre un ampio spettro di attività che dipende da cosa deve essere rilasciato. Tuttavia ci sono comportamenti ed abilità che devono essere rispettati in qualsivoglia contesto, per potersi definire "Continuous Delivery"

Il set minimo si attività richieste per la CD sono:

- [Continuous integration](#continuous-integration)
- The [application
  pipeline](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract)
  è l'unico percorso per il rilascio in produzione.
- E' La pipeline che decide lo stato di rilasciabilità delle modifiche SW, e il suo verdetto è [definitivo](./faq.md#why-should-the-pipeline-be-definitive-for-deploy)
- Artefatti creati dalla pileline ottemperano sempre alla definizione di rilasciabilità [definition of deployable](https://www.youtube.com/watch?v=bHKHdp4H-8w)
- [Immutable artifact](./faq#what-is-an-immutable-artifact). nessuna modifica manuale dopo i commit.
- In caso di fallimento della pipeline, il lavoro in corso deve essere fermato la priorità di tutti deve essere quella di far tornare il software in uno stato stabile
- Utilizzare ambienti di test il più possibile simili al campo
- Deve sempre essere possibile un eventuale roll back
- [La configurazione](./faq.md#what-is-application-configuration) deve essere rialsciata assieme agli artefatti.

## Continuous Integration

La CI è l'attività che ci consente di integrare continuamnte il lavoro di ciascun membro del team nel trunk del repository e verificare che questo sia sempre, al meglio delle nostra conoscenze, funzionante e rilasciabile.

Le attività minime richieste dalla CI sono:

- [Trunk-based development](https://trunkbaseddevelopment.com/)
- Il lavoro viene integrato nel trunk almeno una volta al giorno
- Il lavoro ha una suite di test quando viene eseguito il merge nel trunk
- la suite di test verifica sempre il SW che contiene ed integra il contributo di tutto il team
- Il lavoro viene fermto se la pipeline fallisce.
- Il nuovo lavoro non deve causare malfunzionamenti al software rilasciato.

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

## Want to Contribute or become a signatory?

Read our [contribution guidelines](./CONTRIBUTING.md).

## Firmatari

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
