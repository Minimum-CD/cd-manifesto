# Domande Frequenti (FAQ)

## Motivazioni

Nell'Ottobre 2021 durante il summit DevOps Enterprise, molti di noi si sono ritrovati per discutere il problema della non completa comprensione
della Continuous Delivery, è stato quindi deciso di condurre un esperimento per miglirarnel la comprensione.

Nel libro "Accelerate" del 2017, gli autori osservavano che:
> "La Continuous Delivery migliora sia la velocità di rilascio che la qualità del software ed aiuta a migliorare la cultura, riduce i burnout e gli sforzi tipici legati al rilascio del software in produzione".

Tali osservazioni erano basate sulla loro esperienza e sui dati raccolti in anni dai questionari "Stato della DevOps". 
Noi stessi abbiamo osservato gli stessi risultati, ma soltanto utilizzando in modo appropriato un set di pratiche fondamentali. 
Quando queste pratiche non vengono utilizzate e un'organizzazione fraintende o tenta di prendere scorciatoie, 
i risultati non ariivano e allora tende a dire che la CD è una moda passeggere o che non sia adatta al proprio contesto. 
Nessuna delle due affermazioni corrisponde a verità.
Defininendo una baseline, speriamo di fornire una chiara roadmap di abilità fondamentali che devono essere implemenate.
Proviamo a chiederci: "Perchè non possiamo implementare queste pratiche" e quindi risolvere questi problemi? 
Dovremmo vedere realizzarsi gli stessi benefici che le altre organizzazioni stanno riportando.


## Perchè firmare?
Se pratichi la CD e sei d'accordo con con questi obiettivi, sentiti libero di inviare una pull request per aggiungere la tua firma.

### Cosa fare se cambio idea?

Non vogliamo tenere nessuno in ostaggio, Il nostro obiettivo è elevare il confronto atraverso un linguaggio comune.
Basta aprire una issue o inviare un nuovo PR. La firma sarà rimossa prontamente.

## Come viene aggiornata la lista delle pratiche?

Operiamo attraverso il consenso. Per essere inserita nella lista, ciascuna pratica deve essere essenziale a prescindere dal contesto
Se una pratica non è nella lista significa che, o non fa parte delle prtaiche di base o è in conflitto con una delle pratiche elencate.
Il miglior modo per suggerire una modifica o un'aggiunta alla lista è creare una "issue" su github.

## E' solo questo ciò di cui abbiamo bisogno per implemntare la CD?

Oh, no, questo è il minimo indispensabile.

## Come possiamo utilizzare questi contenuti per migliorare?

La CD necessita dela Continuous Integration (CI) e la CI necessita della Trunk-Based Development. Comincia dal fondo e lavora verso l'alto. 
Chiediti, "perchè non risuciamo ancora a fare questa cosa?" La risposta a questa domanda è il motore che traina il miglioramento delle organizzazioni.
Non abbiamo visto un singolo contesto in cui la CD non possa essere applicata.
In alcune contesti la CD potrebbe impiegare più tempo a risolvere problemi specifi. Ne vale comunque la pena. La CD migliora tutto.

## Perché la pipeline dovrebbe essere definitiva per il deploy?

"Se il risultato della pipeline è: tutto semba funzionare, questo è sufficiente" - questo ci forza a focalizzarci su cosa significa "rilasciabile." -
Dave Farley

## Cos'è l'Application Configuration?

Il termine "Configuration" (Configurazione) è sovra utilizzato e non ha una definizione chiara. Noi sposiamo la definizione
[The Twelve-Factor Appconfig](https://12factor.net/config) nella quale "configurazione" dipende dell'ambiente di installazione,
mentre "Application config" è interna all'applicazione e non dipende dall'ambiente di installazione.

## Cosa significa artifatti immutabili?

Centrale alla CD è la validazione degli artefatti (eseguibili) attravero la pipeline. 
Lo stesso atrtefatto viene compilato un volta e poi distribuito in tutti gli ambienti.
Un comune anti-pattern è compilare eseguibili diversi per ambienti diversi.
Questo è il motivo per cui il trunk-based development è così importante.

## What do we mean by definition of deployable?

For every organization there should be non-negotiables in place for delivery. These may included security, compliance, stability, responsiveness, etc. The pipeline should be that final word for this. See Dave Farley's video [Real Example of a Deployment Pipeline in the Fintech Industry](https://www.youtube.com/watch?v=bHKHdp4H-8w))
