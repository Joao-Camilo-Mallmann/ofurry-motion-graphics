---
name: ofurry-house-motion
description: Estilo de motion da casa do canal OFurry Investidor, medido nos 7 videos publicados (legenda cinetica Montserrat no preto, grade em perspectiva, estrelas, mascote como respiro, icones Lucide/Lucide Animated, numeros com cor pelo sinal, prints de prova, capitulos). Use para transformar uma narracao (SRT/VTT) em uma folha de batidas e renderizar a faixa de motion em fundo preto ou transparente com o kit src/house.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "1.0.0"
  fonte: docs/referencias/analise-canal-2026-10.md
---

# OFurry House Motion

Esta skill e a fonte de verdade do **visual do canal**. Ela nasceu da analise quadro a quadro dos 7 videos
publicados (95 a 144 tomadas por video). O objetivo e fazer sempre o que o canal ja faz de melhor, de forma
consistente, e cortar o que se repetiu como erro.

Quando houver conflito com regras antigas do `director-orchestrator` (tipografia monumental de 130-160 px,
Archivo Black, "zero mascote"), **esta skill vence**: ela descreve o que o publico do canal de fato viu e reteve.

## 1. Fluxo de trabalho

Esta skill define o **visual**. A producao acontece em duas skills que a seguem:

1. **`ofurry-organizar-video`**: cria a pasta do video, transcreve a narracao com tempo por palavra, corta em
   trechos e monta o `plano.md` de cada trecho (checkpoint em prosa, aprovado pelo usuario).
2. **`ofurry-fazer-cenas`**: transforma o plano aprovado em `beats.json`, gera o projeto **HyperFrames**
   (`bun run hf:build <video> <XX>`), checa, revisa e renderiza MP4 preto + MOV transparente
   (`bun run hf:render <video> <XX>`).

O formato da folha de batidas (`src/house/beats.ts`) e o mesmo nos dois motores: HyperFrames (padrao para
videos novos, kit em `hf/kit/`) e Remotion (`src/house/`, para os trechos antigos do COE).
`bun run house:lint <video> <XX>` checa a folha contra as regras abaixo antes de qualquer render.

## 2. As 10 regras da casa

1. **Algo novo a cada 1-2 s.** O video de maior retencao troca algo na tela a cada 1,0-1,4 s (44 mudancas/min).
   Nenhum plano fica mais de 4 s sem novidade (troca de cartao, pose, icone, marcacao, fundo).
2. **Legenda cinetica e a espinha.** Montserrat ExtraBold, CAIXA ALTA, branco `#FDFDFD`, centro, 1-2 palavras
   (media medida 2,0), 0,5-0,95 s por cartao, palavra-chave segura ~1 s. Fica em ~30% do tempo, inclusive por
   cima de icones e B-roll. Tamanho padrao 84 px (o canal usava 2-8% da altura sem regra; padronizado).
3. **Duas familias, nada mais.** Montserrat (800 legenda, 300 sussurro cinza `#8C8C8C`, 600 italico para titulo
   de secao e citacao) e Bebas Neue (numeros, valores, numeral de capitulo). Os videos tinham 7-9 fontes.
4. **Cor = significado.** Verde `#2EE04A` ganho, vermelho `#E3141B` perda (sempre com o sinal "-"), amarelo
   `#F4E812` palavra-chave/ouro, laranja `#FF9900` marca/Bitcoin, ciano `#22D3EE` apoio. Nunca "-R$" em verde.
5. **Fundos da casa.** Preto com poeira de pelicula (~60% do tempo), grade em perspectiva (13-19%), campo de
   estrelas, B-roll desfocado como placa atras do mascote/icones. Saida tambem em alpha.
6. **Mascote e o respiro, nao o conteudo.** A raposa aparece em 20-30% do tempo, depois de rajadas densas e
   antes de uma explicacao nova. Entra de baixo com desfoque (8 qd), troca de pose por corte seco a cada 2-4 s,
   nunca parada mais que 4 s, e encolhe para o canto quando o conteudo volta. Use os PNGs do proprio canal em
   `public/mascote/` (o kit so carrega o arquivo; sem arquivo mostra um marcador cinza).
7. **Um icone por substantivo falado.** Icones de traco brancos (Lucide) com brilho, entram em pop na palavra
   exata, grandes (sozinho 380 px, ~20% da largura; em fila 320/260/200 px), com rotulo curto embaixo. Relacoes por posicao e simbolo (`>`, `=`, seta). Se a fala
   nega ou elimina algo, risque o icone em vermelho ou tire-o da tela. Movimento especial: Lucide Animated.
8. **Prova na tela.** Print de noticia/site inclinado em 3D que endireita com drift lento, marcacao vermelha
   desenhada na parte que importa e saida em glitch. So prints proprios ou de fontes citadas; nunca marca
   d'agua (Veo, "Low Budget Stories") nem aviso de software queimado na imagem.
9. **Gancho denso, capitulo com silencio.** Primeiros 30 s com 9+ mudancas (o melhor video tem ~40):
   pergunta direta digitada -> rajada de cartoes -> primeiro objeto sem nome -> payoff da thumbnail ->
   mascote com a tag OFurry -> prova. Capitulos: 1 s de preto em silencio, numeral + titulo, impacto sonoro.
10. **Zero tela vazia com voz.** Tela preta com narracao apareceu em todos os videos (ate 40 s somados).
    No maximo 0,6 s de preto, e so como respiro antes de capitulo ou virada.

## 3. Receitas (o que colocar em cada tipo de fala)

| Receita | Quando a fala... | Batida / componente | Tempos medidos |
|---|---|---|---|
| H1 Rajada de legenda | faz uma afirmacao em sequencia, ritmo alto | janela `captions` com `entry: 'whip'` (gancho) ou `'pop'` | 0,55-0,85 s/cartao, entrada 4 qd |
| H2 Pergunta digitada | pergunta direto ao espectador (abertura/fecho) | `type-on` (+ `eraseAt` para apagar em backspace) | ~22 caracteres/s |
| H3 Icone que monta a fala | cita objetos, atores, etapas | `icon` / `icons` (+ `relation`, `strikeAt`) | 1 icone por substantivo, pop 4 qd |
| H4 Mascote-respiro | opina, ironiza, faz transicao de bloco | `mascot` (+ `poses`, `shrinkAt`, `nameTag`) | 2-6 s, pose nova a cada 2-4 s |
| H5 Numero-chave | da um valor, %, prazo, quantidade | `number` (+ `countFrom`, `caption`) | segura 1,5-3 s |
| H6 Prova na tela | cita noticia, dado oficial, extrato | `proof` (+ `highlight`) | 3-6 s, marcacao ~1,3 s depois |
| H7 Capitulo | muda de bloco do roteiro | `chapter` | 1 s silencio + 3 s titulo |
| H8 Titulo de secao fixo | explica 3+ itens de um mesmo topico | `section` + `icon`/`broll` trocando embaixo | titulo fica 15-30 s |
| H9 Payoff da thumbnail | entrega a promessa do clique (~15-20 s) | `thumb` | 3-4 s, dissolve + push-in |
| H10 Legenda sobre o mascote | fala longa do proprio apresentador | `mascot` + janela `captions` com `y: 0.72` | troca seca ou `glitch` |

Detalhes, parametros e exemplos em `references/receitas.md`. Exemplos reais do canal em `exemplos/`.

## 4. Gancho padrao (0-30 s)

| Tempo | Batida | Exemplo do video 1 |
|---|---|---|
| 0,2-4 s | H2 pergunta direta digitada sobre a grade | "QUANTO CUSTA A SUA LIBERDADE?" |
| 4-12 s | H1 rajada no campo de estrelas, whip alternando direcao | "PODE / PARECER / UMA PERGUNTA / FILOSOFICA" |
| ~12 s | H3 primeiro objeto, ainda sem nome | moeda subindo em "UM UNICO ATIVO" |
| 12-18 s | H1 no preto puro: o inimigo comum | "QUE NAO DEPENDE / DE POLITICO" |
| 18-21 s | H9 a propria thumbnail animada | "NOVO OURO" |
| 22-27 s | H4 mascote com a tag OFurry | primeira aparicao |
| 27-33 s | H1 promessa do video | "O QUE OS GRANDES PLAYERS JA SABEM" |
| 33-38 s | H6 prova | print da noticia |

A folha `src/house/demo/ganchoVideo01.ts` reproduz exatamente isso e serve de modelo.

## 5. Icones: Lucide e Lucide Animated

- **Estatico (padrao):** qualquer icone do Lucide pelo nome kebab-case (`landmark`, `piggy-bank`, `bitcoin`).
  Veja `references/icones-financas.md` para o mapa conceito -> icone.
- **Animado:** 468 icones do Lucide Animated adaptados para o Remotion em `src/lucide-animated/`
  (`bun run sync:lucide-animated` atualiza). O `IconBeat` usa a versao animada sempre que existir.
  Confira o que a animacao faz antes: `lock` abre o cadeado, por exemplo; para "dinheiro preso" use
  `animated: false`. Mostruario: composicao `LucideAnimated-Showcase`.
- Proibido: icone pixel-art, emoji, clip-art 3D e icones de estilos diferentes na mesma cena.

## 6. Checklist de entrega

- [ ] `bun run house:lint <id>` sem avisos.
- [ ] Texto revisado: nenhuma palavra errada ou cortada na tela (compare com a fala, nao com a transcricao).
- [ ] Nenhuma marca d'agua de terceiros, aviso de software ou legenda em ingles ilegivel em B-roll.
- [ ] Cores de ganho e perda coerentes com o sinal.
- [ ] So Montserrat e Bebas Neue.
- [ ] Mascote nunca parado > 4 s; mini-mascote sempre no mesmo canto (direito) no video inteiro.
- [ ] Render conferido em `<id>` (preto) e entregue em `<id>-Alpha` quando for por cima da gravacao.

## 7. Arquivos

- Kit HyperFrames: `hf/kit/` (house.css + house-runtime.js) e `scripts/hf/` (build, icones, render).
- Kit Remotion: `src/house/` (tokens em `theme.ts`, legenda em `captions.ts` + `KineticCaptions.tsx`, elementos em
  `elements.tsx`, fundos em `backdrops.tsx`, motor em `HouseTimeline.tsx`, regras em `lint.ts`).
- Icones animados: `src/lucide-animated/` (MIT, atribuicao em `LICENSE-lucide-animated.md`).
- Analise do canal: `docs/referencias/analise-canal-2026-10.md` e catalogos por video em
  `docs/referencias/catalogos/`.
- Reanalisar um video novo: `bun run reference:extract <pasta-com-video.mp4>` gera folhas de contato e
  `segmentos.json` para catalogar.
