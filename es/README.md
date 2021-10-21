# Minimum Viable Continuous Delivery

> "La entrega continua mejora el rendimiento de entrega y la calidad también ayda a mejorar la cultura, reduce el agotamiento y el dolor de la implementación."

-- Accelerate (Unofficial translation)

Nosotros, los abajo firmantes, creemos que se requiere una definición mínima de entrega continua para mejorar el flujo de entrega. Si bien nuestros contextos pueden ser diferentes, existen prácticas universales. Al definirlos podemos:

- Introducir a los nuevos profesionales de forma coherente
- Discutir las prácticas de ingeniería que abarca la entrega continua
- Ayudarse mutuamente a mejorar las capacidades actuales

Solo mediante la implementación de prácticas básicas comenzamos a ver los beneficios de la entrega continua.

Las siguientes prácticas son el requerimiento mínimo, un punto de partida. El resultado esperado es la mejora continua de la velocidad, la calidad y la seguridad de la tubería de entrega. 

---

## Entrega Continua

La entrega continua es la disciplina de ingeniería que consiste en realizar todos los cambios de forma estándar y segura. Cubre un amplio espectro de actividades dependiendo de lo que se entregue. Sin embargo, hay comportamientos y habilidades que deben cumplirse en todos los contextos para calificar como "entrega continua".

Las actividades mínimas requeridas para la entrega continua son:

- [Integración continua](#integración-continua).
- El [pipeline de la aplicación](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract) es la unica forma de  implementar cambios en producción.
- El pipeline decide la posibilidad de publicación de los cambios, su veredicto es [definitivo](../faq.md#why-should-the-pipeline-be-definitive-for-deploy).
- Los artefactos creados por el pipeline siempre cumplen con la [definición de implementable](../faq.md#what-do-we-mean-by-definition-of-deployable).
- [Artefacto inmutable](../faq#what-is-an-immutable-artifact). No hay cambios hechos por personas después de la confirmación.
- Todo el trabajo de funciones se detiene cuando el  pipeline está en rojo.
- Entorno de prueba similar a Producción.
- Revertir bajo demanda.
- [Configuración de la aplicación](../faq.md#what-is-application-configuration) se implementa junto con el artefacto.

## Integración Continua

Integración continua es la actividad de integrar muy frecuentemente el trabajo al tronco del controlador de versiones y verificar que el trabajo sea, según nuestro leal saber y entender, liberable.

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

## Want to Contribute or become a signatory?

Read our [contribution guidelines](./CONTRIBUTING.md).
