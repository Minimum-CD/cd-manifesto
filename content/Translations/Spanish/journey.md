---
title: Comenzando el Viaje
linkTitle: "Comenzando"
description: Caminos de mejora sugeridos
weight: 1
draft: false
type: docs
menu:
  main:
    weight: 20
---

Entonces, ¿por dónde empezamos? Es mala idea pasar de "no podemos hacer commits seguros en el trunk" a "desplegar inmediatamente cada cambio en producción" en un solo paso. Es un viaje que requiere resolver metódicamente problemas en el contexto de tu organización. Aquí discutiremos algunos de los desafíos comunes que frecuentemente necesitan ser superados.

## Definiendo Desplegable y Publicable

¿Qué cosas deben ser verdaderas antes de que podamos publicar cambios? ¿Qué debe ser verdadero antes de que podamos desplegar cambios? Necesitamos ver estos como dos problemas diferentes para resolver y solucionarlos individualmente. No te quedes atascado en un proyecto a largo plazo definiendo esto. No pensarás en todo en el primer intento. Además, algunas cosas en tu lista pueden ser simplemente heridas del proceso y no algo que realmente se requiera.

Algunos ejemplos comunes:

- Sin "code smells" críticos o bloqueantes
- Sin problemas de seguridad conocidos
- Todas las pruebas de aceptación pasando
- Cumple con los umbrales de rendimiento
- Cumple con los umbrales de fiabilidad
- etc.

Puede que tengas otros elementos en la lista que, a medida que comiences a implementar, entrarán en conflicto con los objetivos:

- Documentación para el Comité de Asesoramiento de Cambios (CAB) en orden
- Pull request revisada por revisores de primer y segundo nivel

Cada proceso que agregamos debe añadir valor. Hay un valor obvio en realizar pruebas de rendimiento, a menos que estemos exigiendo un rendimiento a un nivel que no es necesario para el caso de uso. Sin embargo, antes de definir la documentación del CAB como requisito para ser "desplegable", ¿por qué existe ese proceso? Una razón común para la realización de esa condición es por una regla de cumplimiento de "dos pares de ojos en cada cambio". Sin embargo, eso puede ser validado por automatización sin la necesidad de agrupar cambios y esperar un acuerdo.

{{% alert %}}
Queríamos investigar el impacto de los procesos de aprobación de cambios en el rendimiento de la entrega de software. Por lo tanto, nos preguntamos acerca de cuatro escenarios posibles:

- Todos los cambios en producción deben ser aprobados por un organismo externo (como un gerente o CAB).
- Solo los cambios de alto riesgo, como cambios en la base de datos, requieren aprobación.
- Confiamos en la revisión por pares para gestionar los cambios.
- No tenemos proceso de aprobación de cambios.

Los resultados fueron sorprendentes. Descubrimos que la aprobación solo para cambios de alto riesgo no se correlacionaba con un rendimiento 
en la entrega de software. Los equipos que informaron no tener proceso de aprobación o que utilizaban revisión por pares lograron un mayor rendimiento en la entrega de software.
Finalmente, los equipos que requerían la aprobación por un organismo externo lograron menor rendimiento.

__-- *Accelerate* por Nicole Forsgren Ph.D., Jez Humble y Gene Kim__
{{% /alert %}}

## Resolviendo el Desafío de la CI

El primer desafío para el equipo es la [integración continua](https://www.martinfowler.com/articles/continuousIntegration.html). CD requiere CI y CI es muy efectiva para descubrir la mayoría de los problemas que muchos equipos tienen que afectan la calidad. Martin Fowler tiene una [excelente publicación de blog sobre la introducción de CI](https://www.martinfowler.com/articles/continuousIntegration.html#IntroducingContinuousIntegration) en el flujo de trabajo. A lo largo de los años, hemos visto muchos problemas comunes que tienen los equipos.

Puede que encontres más. Ten en cuenta que las herramientas rara vez son el problema. Siempre, "¿Por qué no podemos entregar los cambios funcionales de hoy?", es el objetivo de los problemas a resolver.

### La revisión de código lleva demasiado tiempo / tiene demasiados aprobadores

Tener más de un revisor en un PR es un indicio de problemas con el proceso de calidad. Si un revisor no es suficiente, pregunta por qué. Esos son defectos. La revisión de código, si no estamos programando en parejas/mobs, debería ser un esfuerzo de minutos, no de horas. El conjunto de cambios debería ser pequeño, incluir todas las pruebas esperadas, y la mayor parte del trabajo pesado de la revisión tradicional del código debería automatizarse con linters y formateadores. El proceso de revisión de código agrega fricción al proceso que fomenta cambios más grandes. Queremos mantener los cambios pequeños. Concéntrate en mejorar el flujo de comunicación para reducir la resistencia.

- Peor: Las revisiones de código se realizan en solitario y los comentarios se envían de vuelta al desarrollador. Esto añade la mayor resistencia.
- Menos malo: El revisor y el autor se reúnen para revisar y corregir problemas. Todavía hay un tiempo de espera para esa reunión, pero es más eficiente.
- Mejor: [Pair programming](https://martinfowler.com/bliki/PairProgramming.html) integra la revisión de código en el flujo.

### Las pruebas se posponen o se omiten

Debemos tratar las pruebas como ciudadanos de primera clase. Son más importantes que el código que estamos probando. No pueden ser una ocurrencia tardía y necesitamos asegurarnos de que las estamos utilizando para aumentar nuestra confianza en lugar de cumplir con alguna ["métrica de cobertura"](https://dojoconsortium.org/docs/metrics/code-coverage/) arbitraria. No necesitamos que todo el código legacy tenga un 100% de pruebas, ni siquiera un 1% de pruebas para comenzar CI. Necesitamos comprometernos a "nunca subir cambios sin probar". Los plazos son irrelevantes si entregamos cosas a tiempo que están rotas.

### El equipo carece de conocimientos sobre cómo escribir pruebas para CI

Profundiza en las pruebas. [Aprende patrones efectivos de prueba](https://bdfinst.medium.com/5-minute-devops-testing-101-4698b6464172). Muchas personas comienzan probando la implementación y luego luchan por mantener las pruebas actualizadas a medida que cambia la implementación. Evita las pruebas de implementación. Prueba comportamientos. Si no podemos refactorizar el código sin cambiar la prueba, entonces estamos probando incorrectamente. Concéntrate en BDD para definir pruebas y TDD para implementar pruebas. Las personas a menudo rechazan TDD, pero eso es más comúnmente porque nunca aprendieron a hacerlo correctamente. BDD fue creado para ayudar. Apóyate en ello.

Hay capas de pruebas en un conjunto de pruebas CI correctamente arquitecturado. El libro [*xUnit Test Patterns*](http://xunitpatterns.com/) es un gran lugar para comenzar.

Los equipos inicialmente no son buenos en pruebas por la misma razón que no lo son buenos en cualquier otra habilidad el primer día. Lleva tiempo. Comienza ahora.

### Las tareas individuales son demasiado grandes

CI significa que estamos integrando características parcialmente completadas continuamente. TDD nos ayuda a aprender cómo descomponer tareas en cambios muy pequeños y publicables que no rompen los comportamientos existentes. Sin embargo, el hábito inicial a menudo es esperar para integrar cambios hasta que estén "completos". Esto resulta en conjuntos de cambios grandes que son más difíciles de revisar. Esto hace que la revisión de código tome más tiempo, requiera más reelaboración y reduzca la capacidad del revisor para detectar problemas. Con los [métodos de codificación evolutivos](/minimumcd/ci/#recommended-practices) podemos publicar características que aún no están terminadas hasta que lo estén, y así reducir el tamaño de los cambios. Al centrarnos como equipo en descomponer las tareas en horas de trabajo en lugar de días y usar técnicas de ingeniería para controlar el lanzamiento, hemos mejorado la claridad, reducido los conjuntos de cambios y aumentado la calidad.

### Las historias de usuario son demasiado grandes y carecen de criterios de aceptación comprobables

El verdadero desarrollo guiado por pruebas (TDD) comienza con la conversación del equipo sobre la historia de usuario. Es común que a los equipos se les entreguen historias y se espere que las "estimen" y las codifiquen. Eso impacta negativamente la calidad porque el equipo carece de la información necesaria para entregar un buen resultado. En su lugar, una historia sin refinar debería ser el comienzo de la conversación sobre los objetivos del producto, la implementación y la validación.

La [descomposición del trabajo](https://dojoconsortium.org/docs/work-decomposition/work-breakdown/) y las pruebas son habilidades fundamentales para CI. Esto se hace mejor centrándose en el [Desarrollo Guiado por Comportamiento (BDD)](https://dojoconsortium.org/docs/work-decomposition/behavior-driven-development/) en lugar de "formateando historias". Necesitamos criterios de aceptación que impulsen hagan de las pruebas unas sentencias declarativas sobre exactamente cómo debería comportarse el cambio. Más allá de proporcionar la claridad requerida, también reduce la carga cognitiva de escribir pruebas, mejora el trabajo en equipo y nos da segmentos naturales para "dividir" así podemos reducir las historias a 1-2 días de esfuerzo. Esto también nos protege de aquellos cambios en las prioridades que fuerzan a "aparcar" un trabajo incompleto; otro importante contribuyente a la mala calidad.

### El equipo utiliza un sistema push para el trabajo

Un equipo nunca asigna trabajo. Un equipo trabaja en conjunto para entregar la tarea de mayor prioridad en el backlog. Si hay un proceso donde el trabajo se asigna al comienzo de una iteración, entonces cada persona solo se enfoca en su trabajo asignado en lugar de en los objetivos del equipo. Esto trae un impacto negativo en todo nuestro flujo de trabajo. Todos en el equipo deberían estar involucrados en todo lo que hace el equipo. Eso hace que la descomposición del trabajo, la revisión del código, las pruebas y todo lo demás sea mucho más efectivo.

## Reemplazar lo manual con la automatización

Teniendo en cuenta nuestras definiciones de "desplegable" y "publicable", necesitamos comenzar a reemplazar la verificación manual con automatizada. Esto lleva tiempo. También necesitamos cambiar los flujos de trabajo. Por ejemplo, algunas cosas manuales hoy, seguiran siendo manuales siempre. Ninguna de estas deberían ser verificaciones de reglas o de checklists. Podemos automatizar esas.

Las Pruebas de Aceptación de Usuario (UAT) es una actividad común previa a la publicación. Sin embargo, generalmente podemos reemplazar esto con pruebas continuas de usabilidad, pruebas exploratorias y demostraciones frecuentes. Todas estas deberían estar ocurriendo paralelamente a la entrega, no como compuertas de etapa. En algunos casos, hay razones regulatorias por las que las UAT existen como una compuerta de etapa. Sin embargo, debemos tener en cuenta que cualquier cosa que agregue fricción aumentará el tamaño de partida, reducirá la retroalimentación y aumentará las tasas de creación de defectos. ¿Cómo podemos optimizar ese proceso de UAT para hacerlo más pequeño y más frecuente con el fin de reducir este riesgo?

Mejora y sustituye procesos de forma implacable mediante la automatización. Sigue reduciendo el tamaño de las publicaciones para descubrir más desafíos a resolver. Este proceso crea un efecto bola de nieve donde estamos descubriendo y mitigando problemas en nuestros procesos que impactan la calidad mientras automatizamos los pasos manuales que quitan tiempo al desarrollo. Esto a su vez nos da más tiempo para centrarnos en los objetivos del producto y en mejoras adicionales del flujo de entrega. Los resultados de esto son mejoras drásticas en la cultura de equipo, una excelencia en ingeniería y objetivos de negocio.

Un muy buen estudio de caso para esto es [El trabajo de Gary Gruver en HP Laserjet](https://itrevolution.com/the-amazing-devops-transformation-of-the-hp-laserjet-firmware-team-gary-gruver/)

<!-- markdownlint-disable-next-line no-trailing-punctuation -->
## ¡PRUEBA!

Esto no se puede recalcar lo suficiente. El propósito del pipeline es validar completamente que un artefacto es digno de producción o rechazarlo. No corras hacia la entrega diaria sin primero construir confianza en tu capacidad para detectar fallos. Mueve la validación rápida al escritorio y ejecútala nuevamente cuando intentes fusionar código al trunk y nuevamente cuando se realicen cambios en el trunk.

Las pruebas no se limitan a pruebas funcionales. Necesitamos probar la seguridad, el cumplimiento y todo lo necesario para validar el artefacto en nuestro contexto.

Establece márgenes de errores y no los excedas. Si estamos implementando características y nuestro márgen de error está roto, necesitamos centrarnos en fortalecer nuestros pipelines. Cuando las cosas se rompen en producción, fortalecemos nuestros pipelines. Cuando encontramos un caso límite en pruebas exploratorias, fortalecemos el pipeline. Nuestro objetivo principal es construir puertas de calidad eficientes y efectivas. Solo entonces podremos movernos rápidamente.

## Recursos Adicionales

- [Engineering the Digital Transformation](https://www.amazon.com/Engineering-Digital-Transformation-Gary-Gruver/dp/1543975267) - Gary Gruver
- [Continuous Delivery](https://continuousdelivery.com/) - Dave Farley & Jez Humble
- [Continuous Delivery Pipelines](https://www.amazon.com/Continuous-Delivery-Pipelines-Better-Software/dp/B096TTQHYM) - Dave Farley
- [Dojo Consortium Playbooks](https://dojoconsortium.org/) - Enterprise Dojo Consortium
- [5 Minute DevOps: Testing 101](https://bdfinst.medium.com/5-minute-devops-testing-101-4698b6464172)