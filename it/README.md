# Implementazione minima della Continuous Delivery

> "La Continuous delivery migliora sia, la velocità di rilascio che la qualità del software ed aiuta a migliorare la cultura, riduce i burnout e il panico da rilascio."

-- Accelerate `(Unofficial translation)`

Noi, [i firmatari](#Firmatari), crediamo che la definizione di un'implemtazione minima della continuous Delivery sia necessaria per migliorare il flusso di rilascio SW. Il contesto in cui operiamo può essere differente, ma esistono pratiche universali. Definendo tali pratice possiamo:

- Introdurre alla Continuous Delivery nuovi praticanti con una modalità più consistente e lineare
- Discutere le pratiche ingegneristiche che compongono la CD
- Aiutare a migliorare le nostre conoscenze attuali

Soltanto partendo da questo set minimo di pratiche essenziali potremmo iniziare a vedere i vantaggi della Continuous Delivery.

Le pratiche sotto elencate sono lo scheletro fondante, il punto di partenza per poter ottenere i risultati attesi: il continuo miglioramento della velocità, qualità e sicurezza della delivery pipeline.

---

## Continuous Delivery

La CD è la disciplina ingegneristica che consente di rilasciare nuove funzionalità e modifiche SW in una modalità standardizzata e sicura. La CD copre un ampio spettro di attività che dipende da cosa deve essere rilasciato. Tuttavia ci sono comportamenti ed abilità che devono essere rispettati in qualsivoglia contesto, per potersi definire "Continuous Delivery"

Il set minimo di attività richieste per la CD sono:

- [Continuous integration](#continuous-integration)
- The [application
  pipeline](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract)
  è l'unico percorso per il rilascio in produzione.
- E' La pipeline che decide lo stato di rilasciabilità delle modifiche SW, e il suo verdetto è [definitivo](./faq.md#why-should-the-pipeline-be-definitive-for-deploy)
- Gli artefatti creati dalla pileline ottemperano sempre alla definizione di rilasciabilità [definition of deployable](https://www.youtube.com/watch?v=bHKHdp4H-8w)
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
- La suite di test verifica sempre il SW che contiene ed integra il contributo di tutto il team
- Il lavoro viene fermto se la pipeline fallisce.
- Il nuovo lavoro non deve causare malfunzionamenti al software rilasciato.

## Trunk-based Development

[Trunk-based development](https://trunkbaseddevelopment.com/) è il modello di branching necessario a soddisfare la definizione della CI. La CI previene dal lavoro perso, il rischio di corruione che deriva dall'integrazione derivante dalla risoluzione dei conflitti, e che riduce lo spreco di movimento che aumenta la dimensione dei lotti di lavorazione.

- Le attività minime richieste dalla CI sono:
  - Tutte le modifiche devono essere integrate nel trunk
  - Se si utilizzano i branch:
    - Devono essere originati dal trunk
    - Devono essere reintegrati nel trunk
    - Devono essere di breve durata e rimossi dopo l'integrazione

## Oltre il minimo

La CD minima non è il primo passo nel modello di maturità, tuttavia è il minimo indispensibile sul quale costruire tutte le pratiche appropriate al proprio contesto. Per aiutarvi ad andare oltre ala CD minima, manteniamo di seguito una lista di risorse relative alla Continuous Delivery che abbiamo trovato molto utili nel nostro percorso.

Queste risorse contengono sia conoscenze di base, sia conoscenze necessarie a farvi diventare organizzazioni CD d'Elite.
Sono specifici nel risolvere il problema "Cosa ci impedisce di andare in produzione oggi?"

[Vedi la lista](./references.md).

## Perche abbiamo costruito questa lista?

Per maggiori dettagli sulla CD minima e risposte su altre domande comuni, vi rimandiamo alle [FAQs](./faq.md).

## Per contribuire o diventare firmatari

Vedere [linne guida per contribuire](./CONTRIBUTING.md).

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
