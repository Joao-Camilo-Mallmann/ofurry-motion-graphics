---
name: ofurry-organizar-video
description: Organiza um video novo do canal OFurry Investidor antes de qualquer cena - cria a pasta, transcreve a narracao com tempo por palavra, divide em trechos alinhados ao roteiro, monta o plano editorial em prosa de cada trecho (checkpoint para aprovacao) e o inventario de acervo (poses do mascote, prints, b-roll). Use quando o usuario chegar com roteiro e/ou narracao gravada, pedir para organizar, dividir, planejar ou ver o andamento de um video. Nao gera cenas; a skill ofurry-fazer-cenas pega daqui.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "1.0.0"
---

# Organizar video (OFurry)

Primeira das duas skills de producao. Ela transforma **roteiro + narracao gravada** em **trechos prontos para
virar cena**: cada trecho tem seu audio, suas palavras com tempo e um plano editorial aprovado.
A skill `ofurry-fazer-cenas` so comeca num trecho com `plano.md` em estado **APROVADO**.

O visual e as receitas vem de `.agents/skills/ofurry-house-motion/SKILL.md`. Leia antes de planejar.

## 1. Estrutura de um video

```text
videos/<id>/
  video.json            manifesto: titulo, narracao, transcricao, lista de trechos com inicio/fim
  roteiro.md            roteiro completo (unica fonte de contexto entre trechos)
  midia/
    narracao.wav        locucao completa
    transcricao.json    palavras com tempo (revisada)
    transcricao.vtt     mesma coisa, uma palavra por cue
  acervo/
    prints/  broll/  imagens/
  output/
    trecho-01/
      midia/narracao.wav   audio do trecho (tempo 0 = inicio do trecho)
      midia/narracao.json  palavras do trecho
      plano.md             checkpoint editorial (RASCUNHO -> APROVADO)
      beats.json           folha de batidas (escrita pela ofurry-fazer-cenas)
      hf/                  projeto HyperFrames gerado
      render/              MP4 preto + MOV transparente
```

Poses do mascote ficam em `public/mascote/` (compartilhadas por todos os videos), em PNG transparente.

## 2. Passo a passo

1. **Criar o video.**
   `bun run video:novo <id> --titulo "..." --roteiro <roteiro.md> --audio <narracao.wav|mp3|mp4>`
   O `<id>` e curto, minusculo, com hifens (`coe`, `bitcoin-2030`).
2. **Transcrever.** `bun run video:transcrever <id>` usa o **Parakeet** local do HyperFrames
   (parakeet-tdt-0.6b-v3, multilingue, roda no computador, ~1 min para 9 min de narracao). Instalacao unica,
   ja feita nesta maquina: `npx hyperframes@0.8.193 models install parakeet`. Alternativas:
   `--motor whisper --modelo medium` (precisa do runtime do Whisper) ou, se o usuario ja tem legenda do
   CapCut/Premiere/YouTube, `--importar legenda.srt`.
3. **Revisar a transcricao.** Compare `midia/transcricao.json` com o roteiro e corrija nomes, numeros e
   termos ("COE", "call spread", "R$"). Erro de transcricao virou erro na tela em 6 dos 7 videos analisados.
   O Parakeet erra palavras parecidas em som (no teste: "a sua liberdade" saiu "a solidariedade",
   "ganhar" saiu "engar"): leia o texto inteiro contra o roteiro, so troque o campo `text`, nunca os tempos.
   Nao reescreva a fala: o texto tem que ser o que foi dito.
4. **Dividir em trechos.** Um trecho = 20 a 60 s de fala com uma ideia so, normalmente um bloco do roteiro
   ou metade dele. O gancho (0-30 s) e sempre o trecho-01. Para achar os tempos:
   `bun run video:buscar <id> "primeira frase do trecho" "ultima frase do trecho"`
   e depois o comando que ele imprime:
   `bun run video:cortar <id> <XX> <inicio> <fim> --titulo "..." --bloco "BLOCO 3"`
5. **Plano editorial (checkpoint).** Preencha `output/trecho-XX/plano.md`: a ideia do trecho em 1 frase, a
   tabela de batidas (o `video:cortar` ja escreve as falas com tempo; complete receita H1-H10 e elemento),
   fundos, acervo necessario e continuidade com o proximo trecho. Regras para montar a tabela:
   - algo novo na tela a cada 1-2 s; nada parado mais que 4 s;
   - legenda cinetica (H1) e o padrao; troque por icone (H3), numero (H5) ou prova (H6) quando a fala
     citar objeto, valor ou fonte;
   - mascote (H4) depois de rajada densa ou em opiniao/ironia, nunca mais que 4 s sem pose nova;
   - trecho-01 segue o gancho padrao da `ofurry-house-motion` (pergunta digitada, rajada, objeto sem nome,
     thumbnail, mascote com tag, prova);
   - todo icone com nome do Lucide (`references/icones-financas.md` da house-motion).
6. **Apresentar e aprovar.** Mostre o plano ao usuario em prosa/tabela, sem codigo. So com o ok explicito
   dele troque `Estado: RASCUNHO` por `Estado: APROVADO`. Ajustes pedidos voltam para o passo 5.
7. **Acervo.** Liste o que falta (poses, prints, b-roll) e diga onde colocar. Print de noticia: recorte so
   a parte util, sem marca d'agua. B-roll de IA: sem marca d'agua (Veo) nem texto em ingles ilegivel.
8. **Andamento.** `bun run video:status <id>` mostra cada trecho: sem plano, rascunho, aprovado, batidas
   escritas, cenas geradas, renderizado.

## 3. Regras

- Um trecho por vez, na ordem do roteiro. O plano de um trecho nao le o codigo de outros trechos, so o
  `roteiro.md` e o `plano.md` do trecho anterior (para continuidade).
- Tempos sempre do audio do trecho (comecam em 0). Nunca escreva tempos "de cabeca": use a tabela gerada.
- Se a narracao mudar (regravacao, corte), rode de novo `video:transcrever` e `video:cortar` para os
  trechos afetados e avise que os `beats.json` desses trechos precisam ser revistos.
- Nao invente falas, numeros ou fontes que nao estejam no roteiro/narracao.

## 4. Entrega desta skill

Para cada trecho: `midia/` cortada, `plano.md` APROVADO, lista de acervo resolvida ou pendente.
Depois: chamar a skill `ofurry-fazer-cenas` para o trecho.
