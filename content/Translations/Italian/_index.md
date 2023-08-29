---
title: Italiano
description: "Implementazione minima della Continuous Delivery"
weight: 3
---

# Implementazione minima della Continuous Delivery

> "La Continuous Delivery migliora sia la velocità di rilascio che la qualità del software ed aiuta a migliorare la cultura, riduce i burnout e gli sforzi tipici legati al rilascio del software in produzione".

-- Accelerate `(Unofficial translation)`

Noi, [i firmatari](../../minimumcd/#signatories), riteniamo che la definizione di un'implementazione minima della Continuous Delivery (CD) sia necessaria per migliorare il flusso di rilascio del software. Sebbene i contesti in cui lavoriamo possano essere diversi, esistono pratiche universali. Definendo tali pratiche possiamo:

- Introdurre alla Continuous Delivery nuovi praticanti in modo coerente
- Discutere le pratiche ingegneristiche che costituiscono CD
- Aiutarci a vicenda a migliorare le nostre conoscenze e capacità attuali

Soltanto partendo da questo set minimo di pratiche essenziali potremmo iniziare a vedere i vantaggi della Continuous Delivery.

Le pratiche sotto elencate costituiscono un'implementazione minima, un punto di partenza. Il risultato atteso è il miglioramento continuo della velocità, della qualità e della sicurezza della pipeline di rilascio.

---

## Continuous Delivery

La CD è la disciplina ingegneristica che consente di rilasciare nuove funzionalità e modifiche software in modo standard e sicuro. La CD copre un ampio spettro di attività a seconda di cosa deve essere rilasciato. Tuttavia, ci sono comportamenti ed abilità che devono essere rispettati in qualsivoglia contesto, perché si possa parlare di "Continuous Delivery".

Il set minimo di attività richieste per la CD sono:

- [Continuous integration](#continuous-integration-integrazione-continua) (Integrazione Continua)
- La [application pipeline](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract) è l'unico percorso per il rilascio in produzione
- La pipeline decide la rilasciabilità delle modifiche software, e il suo verdetto è [definitivo](./faq/#perch%C3%A9-la-pipeline-dovrebbe-dettare-legge-per-il-rilascio)
- Gli artefatti creati dalla pipeline soddisfano sempre la definizione di rilasciabilità [definition of deployable](https://www.youtube.com/watch?v=bHKHdp4H-8w) della specifica organizzazione
- Artefatti immutabili ([Immutable artifact](./faq/#cosa-significa-artefatti-immutabili)): nessuna modifica manuale dopo i commit
- Tutto il lavoro si ferma se la pipeline fallisce
- Utilizzare ambienti di test il più possibile simili all'ambiente di produzione
- Rollback su richiesta
- La [configurazione dell'applicazione](./faq/#cosa-significa-artefatti-immutabili) viene distribuita assieme agli artefatti
  
## Continuous Integration (Integrazione continua)

La CI è l'attività che ci consente di integrare continuamente il lavoro di ciascun membro del team nel trunk del repository e verificare che questo sia sempre, al meglio delle nostre conoscenze, funzionante e rilasciabile.

Le attività minime richieste dalla CI sono:

- [Trunk-based development](../../minimumcd/tbd/)
- Il lavoro viene integrato nel trunk almeno una volta al giorno
- Una suite di test automatici verifica il lavoro prima che venga integrato nel trunk
- Una suite di test automatici verifica il lavoro dopo essere stato integrato nel trunk
- Tutto il lavoro si ferma se la pipeline fallisce
- Il nuovo lavoro non deve causare malfunzionamenti alle funzionalità già rilasciate

## Trunk-based Development

Il [Trunk-based Development](../../minimumcd/tbd/) è il modello di branching necessario a soddisfare la definizione della CI. La CI evita la perdita delle modifiche, il rischio di corruzione che deriva dall'integrazione e dalla risoluzione dei conflitti, e riduce lo spreco dovuto ad attività che potrebbero aumentare la dimensione degli insiemi di modifiche.

- Le attività minime richieste dal TBD sono:
  - Tutte le modifiche devono essere integrate nel trunk
  - Se si utilizzano i branch:
    - Devono nascere dal trunk
    - Devono essere reintegrati nel trunk
    - Devono essere di breve durata e rimossi dopo l'integrazione

## Oltre il minimo

La CD minima non è il primo passo in un modello di maturità, tuttavia è il minimo indispensabile su cui dovrebbero essere costruite molte altre pratiche, come richiesto dal proprio contesto. Per facilitare il vostro percorso oltre la CD minima, manteniamo di seguito una lista di risorse relative alla Continuous Delivery che abbiamo trovato molto utili nel nostro percorso.

Queste risorse contengono sia conoscenze di base, sia conoscenze necessarie a farvi diventare un'organizzazione CD "d'élite".
Sono risposte specifiche alla domanda "Cosa ci impedisce di andare in produzione oggi?"

[Vedi la lista](../../references/).

## Perche abbiamo costruito questa lista?

Per maggiori dettagli sulla CD minima e risposte su altre domande comuni, vi rimandiamo alle [FAQs](./faq/).

## Per contribuire o diventare firmatari

Vedere [linee guida per contribuire](https://github.com/Minimum-CD/cd-manifesto/blob/master/CONTRIBUTING.md).

## Firmatari

I firmatari hanno firmato la [versione originale in inglese](../../minimumcd/#signatories) e la lista corrente dei nomi è pubblicata solo in quella versione

## Traduzione

Questa traduzione è uno sforzo della comunità per facilitare la diffusione dei concetti legati alla CD oltre la barriera linguistica. I firmatari non possono confermare la correttezza della traduzione.

Tradotto dalla versione: 4de610d, 2021-10-19
