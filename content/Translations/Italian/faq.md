---
title: Domande Frequenti (FAQ)
description: "Implementazione minima della Continuous Delivery"
---

## Motivazioni

Nell'ottobre 2021, durante il summit DevOps Enterprise, molti di noi si sono incontrati per discutere il problema del costante fraintendimento della Continuous Delivery. Abbiamo quindi deciso di condurre un esperimento per migliorarne la comprensione.

Nel libro "Accelerate" del 2017, gli autori osservavano che:
> "La Continuous Delivery migliora sia la velocità di rilascio che la qualità del software ed aiuta a migliorare la cultura, riduce i burnout e gli sforzi tipici legati al rilascio del software in produzione".

Tale osservazione è basata sulla loro esperienza e sui dati raccolti negli anni tramite i questionari "State of DevOps" ("Stato della DevOps").
Noi stessi abbiamo constatato gli stessi risultati, ma soltanto utilizzando in modo appropriato un set di pratiche fondamentali.
Quando queste pratiche non vengono utilizzate, vengono fraintese o un'organizzazione tenta di prendere scorciatoie,
i risultati non arrivano e allora si tende a dire che la CD è una moda passeggera o che non è adatta al proprio, speciale, contesto.
Nessuna delle due affermazioni corrisponde a verità.

Stabilendo una linea di partenza, speriamo di fornire una chiara tabella di marcia di azioni fondamentali che devono essere messe in pratica. Se ci chiedessimo "perché non possiamo farlo anche noi?" e quindi procedessimo a risolvere quei problemi, riusciremmo ad ottenere gli stessi benefici di cui dicono di godere le altre organizzazioni.

## Perché firmare?

Se pratichi la CD e sei d'accordo con con questi obiettivi, sentiti libero di inviare una Pull Request per aggiungere la tua firma.

### Cosa fare se cambio idea?

Non vogliamo tenere nessuno in ostaggio. Il nostro obiettivo è elevare il confronto attraverso un linguaggio comune.
Basta quindi aprire una issue o inviare una nuova PR. La firma sarà rimossa prontamente.

## Come viene aggiornata la lista delle pratiche?

I manutentori della lista operano attraverso il consenso. Per essere inserita nella lista, ciascuna pratica deve essere essenziale a prescindere dal contesto. Se una pratica non è nella lista significa che, o non soddisfa lo standard minimo assoluto in ogni contesto, o è in conflitto con una delle pratiche elencate.
Il miglior modo per suggerire una modifica o un'aggiunta alla lista è creare una "issue" su GitHub.

## È solo questo ciò di cui abbiamo bisogno per implementare la CD?

Oh, no, questo è il minimo indispensabile.

## Come possiamo utilizzare questi contenuti per migliorare?

La CD richiede la CI (Continuous Integration) e la CI richiede il Trunk-based Development. Comincia dal fondo e procedi verso l'alto. Chiediti: "perché non riusciamo ancora a realizzare questa o quell'altra cosa?". Risolvere quel problema è il motore del miglioramento dell'organizzazione. Non abbiamo ancora constatato un singolo caso in cui la CD non potesse essere applicata. In alcuni contesti, potrebbe solo volerci più tempo per risolvere certi problemi. Ne vale comunque la pena. La CD migliora tutto.

## Perché la pipeline dovrebbe dettare legge per il rilascio?

"Se la pipeline riporta che tutto è funzionante, ciò è quanto basta - ci spinge a concentrarci su cosa significa "rilasciabile." -
Dave Farley

## Cos'è la configurazione dell'applicazione (Application Configuration)?

Il termine "Configurazione" è abusato e non ha una definizione standard in tutto il nostro settore. Noi sposiamo la definizione
[The Twelve-Factor Appconfig](https://12factor.net/config) in cui "configurazione" dipende dell'ambiente di installazione (varia in base al rilascio) e "configurazione dell'applicazione" è interna all'applicazione e NON varia in base all'ambiente di installazione.

## Cosa significa artefatti immutabili?

Fondamentale per CD è che che gli artefatti distribuiti tramite la pipeline vengano validati. Lo stesso artefatto viene creato una volta e distribuito in tutti gli ambienti. Una cattiva pratica comune è costruire un artefatto per ogni ambiente. Questo è il motivo per cui il trunk-based development è così importante.

## Che cosa intendiamo per "rilasciabile" (deployable)?

Ogni organizzazione dovrebbe adottare criteri non negoziabili per i rilasci software. Questi potrebbero includere i controlli di sicurezza, conformità, stabilità, reattività, ecc. La pipeline dovrebbe avere l'ultima parola per tutto ciò. 
Raccomandiamo il video di Dave Farley [Esempio reale di una pipeline di rilascio nel settore Fintech](https://www.youtube.com/watch?v=bHKHdp4H-8w)

