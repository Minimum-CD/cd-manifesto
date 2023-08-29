---
title: "Português Brasileiro"
description: "Mínimo viável para a Entrega Contínua"
weight: 3
---


## Mínimo viável para a Entrega Contínua

{{% notice %}}

"A entrega contínua não só melhora a qualidade e capacidade de entrega, bem como ajuda na evolução da cultura, reduz a estafa e as dificuldades na implantação."

-- Accelerate: The Science of Lean Software and DevOps: Building and Scaling High Performing Technology Organizations (Tradução não oficial)

{{% /notice %}}

![MinimumCD](/images/minimumCD-logo-hex.png?height=150px)

Nós, [os abaixo-assinados](../../minimumcd/#signatories), acreditamos que é necessária uma definição mínima de entrega contínua (_Continuous Delivery_, CD) para a melhoria do fluxo de entrega e cumprimento dos resultados supracitados. Embora os nossos contextos possam ser diferentes, existem práticas universais consideradas comuns. Ao defini-las, é possível:

- Introduzi-las aos novos praticantes, de forma consistente
- Discutir as práticas de engenharia que abrangem a entrega contínua
- Ajudar-nos mutuamente, melhorando as capacidades atuais

Só através da adoção de práticas elementares é que se torna possível testemunhar os benefícios da entrega contínua.

As práticas descritas em seguida são o mínimo, ou seja, um ponto de partida. O resultado esperado é a melhoria contínua da rapidez, qualidade e segurança da _pipeline_ de entrega.

---

## Entrega Contínua

A entrega contínua (CD) é a disciplina de engenharia que consiste na entrega de todas as alterações, de forma padronizada e segura. Ela cobre um amplo espectro de atividades, dependendo do que está sendo entregue. Porém, há comportamentos e habilidades que devem ser considerados, em todos os contextos, para que o processo possa ser classificado como "entrega contínua".

As atividades mínimas exigidas para o CD são:

- Uso de [Integração contínua](#integração-contínua)
- O [_delivery pipeline_](https://www.informit.com/articles/article.aspx?p=1621865&seqNum=2#:~:text=%EE%94%80Buy-,What%20Is%20a%20Deployment%20Pipeline%3F,-At%20an%20abstract) é a única forma possível de fazer _deploy_ para qualquer ambiente
- O _pipeline_ decide se as mudanças atendem ou não os requisitos para entrada em produção. Esse veredicto é [definitivo](../../faq/#why-should-the-pipeline-be-definitive-for-deploy)
- Os artefatos criados pelo _pipeline_ respeitam sempre a [definição de _deployable_](../../faq/#what-do-we-mean-by-definition-of-deployable) da organização
- [Artefato imutável](../../minimumcd/immutable/) (não existem mudanças manuais após o _commit_)
- Todo o desenvolvimento de funcionalidades é suspenso quando o _pipeline_ falha
- Ambiente de testes semelhante ao ambiente produtivo
- _Rollback_ sob demanda
- A [configuração da aplicação](../../faq/#what-is-application-configuration) é implantada junto com o artefato

## Integração Contínua

A integração contínua (Continuous Integration, CI) é a atividade que consiste em frequentemente integrar o trabalho desenvolvido no _trunk_ do sistema de controle de versões e verificar que esse trabalho, tanto quanto podemos afirmar, é passível de ser _released_.

As atividades mínimas necessárias ao CI são:

- [_Trunk-based development_](#trunk-based-development)
- O trabalho integra em _trunk_, no mínimo, diariamente
- O trabalho tem testes automatizados antes do _merge_ em _trunk_
- O trabalho é testado automaticamente com outras mudanças no _merge_
- Todo o trabalho em funcionalidades é suspenso quando a _build_ falha
- Trabalho novo não quebra trabalho entregue

## Trunk-Based Development

O [_Trunk-based development_](../../minimumcd/tbd/) (versão inglesa) (TBD) é um padrão de _branching_ mandatório para cumprimento dos requisitos de CI. Evita a perda de trabalho, o risco de mudanças corrompidas devido à resolução de conflitos do _merge_ e também reduz o desperdício de movimento que aumenta o tamanho do _batch_ de mudanças.

As atividades mínimas necessárias para o TBD são:

- Todas as mudanças integram em _trunk_
- No caso de serem usados _branches_:
  - Eles têm sempre origem em _trunk_
  - Eles re-integram sempre em _trunk_
  - Eles são de curta-duração e são removidos depois do _merge_

## Por que construímos este manifesto?

Para obter informações acerca do Mínimo CD e respostas a outras questões comuns, por favor [leia o FAQ](../../faq/) (versão inglesa).

## Começando a jornada

Dúvidas sobre como começar? Confira algumas [recomendações](../../journey/) (versão inglesa).

## Contribuindo

Você quer enviar uma tradução, boas práticas, sugestões ou um relato de experiência?

Leia as nossas [diretrizes de contribuição](https://github.com/Minimum-CD/cd-manifesto/blob/master/CONTRIBUTING.md) (versão em inglês).

## Signatários

Os signatários assinaram a [versão original em inglês](../../minimumcd/#signatories) e a lista atual de nomes é publicada apenas nessa versão.

## Tradução

Esta tradução é um esforço de toda a comunidade, que tem como objetivo a disseminação destes conceitos, superando as barreiras linguísticas. Os signatários abstêm-se de afirmar a exatidão da tradução.

Traduzido da versão: _1ba1d25_, _2023-04-18_
