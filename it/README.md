# Implementazione minima della Continuous Delivery

> "La Continuous Delivery migliora sia la velocità di rilascio che la qualità del software ed aiuta a migliorare la cultura, riduce i burnout e gli sforzi tipici legati al rilascio del software in produzione".

-- Accelerate `(Unofficial translation)`

Noi, [i firmatari](#Firmatari), riteniamo che la definizione di un'implementazione minima della Continuous Delivery (CD) sia necessaria per migliorare il flusso di rilascio del software. Sebbene i nostri contesti possano essere diversi, esistono pratiche universali. Definendo tali pratiche possiamo:

- Introdurre alla Continuous Delivery nuovi praticanti in modo coerente
- Discutere le pratiche ingegneristiche che costituiscono CD
- Aiutarci a vicenda a migliorare le nostre conoscenze e capacità attuali

Soltanto partendo da questo set minimo di pratiche essenziali potremmo iniziare a vedere i vantaggi della Continuous Delivery.

Le pratiche sotto elencate costituiscono un'implementazione minima, un punto di partenza. Il risultato atteso è il miglioramento continuo della velocità, della qualità e della sicurezza della pipeline di rilascio.

---

## Continuous Delivery

La CD è la disciplina ingegneristica che consente di rilasciare nuove funzionalità e modifiche software in modo standard e sicuro. La CD copre un ampio spettro di attività a seconda di cosa deve essere rilasciato. Tuttavia, ci sono comportamenti ed abilità che devono essere rispettati in qualsivoglia contesto, perché si possa parlare di "Continuous Delivery".

Il set minimo di attività richieste per la CD sono:

- [Continuous integration](#continuous-integration) (Integrazione Continua)
- La [application pipeline](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract) è l'unico percorso per il rilascio in produzione
- La pipeline decide la rilasciabilità delle modifiche software, e il suo verdetto è [definitivo](./faq.md#why-should-the-pipeline-be-definitive-for-deploy)
- Gli artefatti creati dalla pipeline soddisfano sempre la definizione di rilasciabilità [definition of deployable](https://www.youtube.com/watch?v=bHKHdp4H-8w) della specifica organizzazione
- Artefatti immutabili ()[Immutable artifact](../faq#what-is-an-immutable-artifact)). Nessuna modifica manuale dopo i commit
- Tutto il lavoro si ferma se la pipeline fallisce
- Utilizzare ambienti di test il più possibile simili all'ambiente di produzione
- Rollback su richiesta
- [La configurazione dell'applicazione](../faq.md#what-is-application-configuration) viene distribuita assieme agli artefatti

## Continuous Integration (Integrazione continua)

La CI è l'attività che ci consente di integrare continuamente il lavoro di ciascun membro del team nel trunk del repository e verificare che questo sia sempre, al meglio delle nostre conoscenze, funzionante e rilasciabile.

Le attività minime richieste dalla CI sono:

- [Trunk-based development](https://trunkbaseddevelopment.com/)
- Il lavoro viene integrato nel trunk almeno una volta al giorno
- Una suite di test automatici verifica il lavoro prima che venga integrato nel trunk
- Una suite di test automatici verifica il lavoro dopo essere stato integrato nel trunk
- Tutto il lavoro si ferma se la pipeline fallisce
- Il nuovo lavoro non deve causare malfunzionamenti alle funzionalità già rilasciate

## Trunk-based Development

Il [Trunk-based Development](https://trunkbaseddevelopment.com/) è il modello di branching necessario a soddisfare la definizione della CI. La CI evita la perdita delle modifiche, il rischio di corruzione che deriva dall'integrazione e dalla risoluzione dei conflitti, e riduce lo spreco di movimento che aumenta la dimensione dei lotti di lavorazione.

- Le attività minime richieste dal TBD sono:
  - Tutte le modifiche devono essere integrate nel trunk
  - Se si utilizzano i branch:
    - Devono nascere dal trunk
    - Devono essere reintegrati nel trunk
    - Devono essere di breve durata e rimossi dopo l'integrazione

## Oltre il minimo

La CD minima non è il primo passo in un modello di maturità, tuttavia è il minimo indispensabile su cui dovrebbero essere costruite molte altre pratiche, come richiesto dal proprio contesto. Per facilitare il vostro percorso oltre la CD minima, manteniamo di seguito una lista di risorse relative alla Continuous Delivery che abbiamo trovato molto utili nel nostro percorso.

Queste risorse contengono sia conoscenze di base, sia conoscenze necessarie a farvi diventare un'organizzazione CD "d'élite".
Sono specifiche per risolvere il problema "Cosa ci impedisce di andare in produzione oggi?"

[Vedi la lista](../references.md).

## Perche abbiamo costruito questa lista?

Per maggiori dettagli sulla CD minima e risposte su altre domande comuni, vi rimandiamo alle [FAQs](../faq.md).

## Per contribuire o diventare firmatari

Vedere [linee guida per contribuire](../CONTRIBUTING.md).

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
