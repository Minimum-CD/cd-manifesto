---
title: Português
description: "Mínimo viável para a Entrega Contínua"
weight: 3
---

# Mínimo viável para a Entrega Contínua

{{% notice %}}
"A entrega contínua não só melhora a qualidade e capacidade de entrega, bem como ajuda na evolução da cultura, reduz o cansaço e as dores do desenvolvimento/release."

-- Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations (Tradução não oficial)
{{% /notice %}}

Nós, [os abaixo-assinados](../../minimumcd/signatures/), acreditamos que é necessária uma definição mínima de entrega contínua (Continuous Delivery, CD) para a melhoria do fluxo de entrega e cumprimento dos resultados supracitados. Embora os nossos contextos possam ser diferentes, existem práticas universais consideradas comuns. Ao defini-las, é possível:

- Introduzi-las aos novos praticantes, de forma consistente
- Discutir as práticas de engenharia que abrangem a entrega contínua
- Ajudar-nos mutuamente, melhorando as capacidades atuais

Só através da adoção de práticas elementares é que começamos a testemunhar os benefícios da entrega contínua.

As práticas descritas em seguida são o mínimo, ou seja, um ponto de partida. O resultado esperado é a melhoria da rapidez, qualidade e segurança da _pipeline_ de entrega.

---

# Entrega Contínua

A entrega contínua (CD) é a disciplina de engenharia que consiste na entrega de todas as alterações, de forma padronizada, com segurança. Ela cobre um extenso espetro de atividades, dependendo do que está a ser entregue. Porém, há comportamentos e habilidades que devem ser considerados, em todos os contextos, para que o processo possa ser classificado como "entrega contínua".

As atividades mínimas exigidas para o CD são:

- Uso de [Integração contínua](#integração-contínua)
- A [_pipeline_ aplicational](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract) é a única forma possível de fazer _deploy_ para qualquer ambiente
- A _pipeline_ decide a possibilidade dessas mudanças serem replicadas para o ambiente produtivo. Esse veredicto é [definitivo](../../faq/#why-should-the-pipeline-be-definitive-for-deploy)
- Os artefactos criados pela _pipeline_ respeitam sempre a [definição de _deployable_](../../faq/#what-do-we-mean-by-definition-of-deployable) da organização
- [Artefacto imutável](../../faq/#what-is-an-immutable-artifact). Não existem mudanças manuais depois do _commit_
- Todo o desenvolvimento de funcionalidades é suspenso quando a _pipeline_ se encontra em falha (em vermelho)
- Ambientes de teste semelhantes a ambiente produtivo
- _Rollback_ conforme necessário
- A [configuração da aplicação](../../faq/#what-is-application-configuration) é _deployed_ com o artefacto.
