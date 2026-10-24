# Receitas da casa: parametros e exemplos

Tempos em segundos do audio; "qd" = quadros a 30 fps. Cada receita cita onde apareceu nos videos analisados
(numero do video pela ordem de visualizacoes, ver `docs/referencias/analise-canal-2026-10.md`).

## H1 Rajada de legenda cinetica

- **Quando:** qualquer trecho de fala sem objeto claro para mostrar. E a camada padrao.
- **Batida:** janela em `captions: [{ from, until, entry }]`. Os cartoes saem da legenda da narracao
  (`cardOptions: { maxWords: 2, maxChars: 16 }`).
- **Entradas:** `whip` no gancho e em rajadas (alternando direcao, 4 qd, video 1); `pop` 45% -> 105% -> 100%
  em 4 qd no resto (video 3); `rise` com desfoque vertical sobre mascote (video 7); `glitch` de 2 qd de listras
  na cor de destaque para trocar palavra sobre o mascote (video 3).
- **Destaque:** numeros, valores e `*palavras*` marcadas na legenda ficam amarelos e 25% maiores.
- **Sussurro:** `whisper: true` para falas de ponte ou reflexao (Montserrat 300, cinza, menor).
- **Exemplos:** `exemplos/legenda-pop-no-preto-e-mascote.jpg`, video 1 em 4,4-17,7 s e 26,7-32,7 s.

## H2 Pergunta digitada

- **Quando:** abertura e fechamento; pergunta que o espectador faria a si mesmo.
- **Batida:** `{ kind: 'type-on', text, eraseAt? }`. ~22 caracteres/s, cursor piscando, backspace 1,6x mais rapido.
- **Exemplos:** video 1 (0,25-4,25 s), video 7 abre e fecha com a mesma pergunta.

## H3 Icone que monta a fala

- **Quando:** a fala cita objetos, atores ou etapas ("o banco", "a taxa", "voce").
- **Batida:** `icon` para um, `icons` para 2-4 entrando um por item (`items[].at` = segundo em que a palavra e dita).
  `relation: '>' | '=' | '→'` desenha o simbolo entre eles. `strikeAt` risca em vermelho quando a fala nega.
- **Tamanho:** sozinho 380 px (o canal usa 20-35% da largura); em fila 320 px (2), 260 px (3), 200 px (4+). Rotulo de 1 palavra em Montserrat 800, 40 px.
- **Exemplos:** `exemplos/icones-que-montam-a-fala.jpg`; video 1 (113-141 s), video 4 (2:32 casa/cesta/raio).

## H4 Mascote-respiro

- **Quando:** opiniao, ironia, transicao de bloco, ou logo depois de uma rajada densa.
- **Batida:** `{ kind: 'mascot', poses: [{ at, pose: 'mascote/<pose>.png' }], placement, shrinkAt, nameTag }`.
- **Posicoes:** `center` (padrao), `left-third` sobre a grade com texto a direita, `corner-right` mini-mascote.
- **Regras:** pose nova a cada 2-4 s; nunca > 4 s parado; mini-mascote sempre no canto direito;
  `nameTag` so na primeira aparicao do video. Combine com legenda em `y: 0.72` (H10).
- **Assets:** exporte as poses do mascote do canal como PNG transparente em `public/mascote/`
  (ex.: `explicando.png`, `apontando.png`, `rindo.png`, `bracos-cruzados.png`, `chocado.png`).
- **Exemplos:** `exemplos/legenda-sobre-mascote-na-grade.jpg`; video 3 (35-44 s), video 4 (seg-001).

## H5 Numero-chave

- **Quando:** a fala da um valor, porcentagem, prazo ou quantidade.
- **Batida:** `{ kind: 'number', value: '-80%', caption?, countFrom? }`. Bebas Neue 260 px com brilho.
  A cor sai do sinal (`-` vermelho, `+` verde); force com `tone`. `countFrom: 0` conta ate o valor em 24 qd.
- **Exemplos:** `exemplos/numero-cor-pelo-sinal.jpg`, `exemplos/objeto-e-numero-chave.jpg`; video 2 ("-80%" aos 35 s).

## H6 Prova na tela

- **Quando:** cita noticia, dado oficial, extrato ou print de rede social.
- **Batida:** `{ kind: 'proof', src: '<video>/prints/x.png', highlight: [x, y, w, h], highlightAt }`
  (retangulo em fracoes da imagem). Entra inclinado em 3D com desfoque, endireita em 10 qd, push-in lento,
  marcacao vermelha desenhada, sai com glitch nos ultimos 3 qd.
- **Regras:** recorte o print so na parte util; sem marca d'agua; texto do print legivel no celular.
- **Exemplos:** video 1 (32,7 s reserva dos EUA; 251 s calculadora do Banco Central).

## H7 Capitulo numerado

- **Quando:** troca de bloco do roteiro.
- **Batida:** `{ kind: 'chapter', number, title }`. 1 s de preto em silencio, numeral Bebas laranja 300 px,
  titulo Montserrat 800. Mesmo SFX de impacto em todos os capitulos do video.
- **Exemplos:** video 1 (72,9 s, 248,2 s, 397 s). Padronizado: o video 1 misturava serifada e Montserrat.

## H8 Titulo de secao fixo

- **Quando:** explicacao de um topico com 3+ exemplos ("PORTABILIDADE", "LIQUIDEZ").
- **Batida:** `section` cobrindo o bloco inteiro + `icon`/`broll` trocando embaixo a cada frase.
- **Exemplos:** video 1 (325-390 s).

## H9 Payoff da thumbnail

- **Quando:** ~15-20 s, quando a fala entrega a promessa do titulo.
- **Batida:** `{ kind: 'thumb', src: '<video>/thumb.jpg' }` 3-4 s com dissolve de 1 s e push-in.
- **Exemplos:** video 1 (17,7-21,5 s "NOVO OURO").

## H10 Legenda sobre o mascote

- **Quando:** o apresentador fala por mais de 4 s sem objeto para mostrar.
- **Batida:** `mascot` + janela `captions` com `y: 0.72` e `entry: 'cut'` ou `'glitch'`.
- **Exemplos:** `exemplos/legenda-sobre-mascote-na-grade.jpg`; video 3 (163-168 s).

## O que nao repetir (achados dos 7 videos)

| Problema | Onde apareceu | Regra |
|---|---|---|
| 7-9 familias de fonte | todos | so Montserrat + Bebas Neue |
| Palavra errada na tela | 6 de 7 videos | revisar a legenda antes do lint |
| Tela preta com narracao | todos (ate 40 s somados) | lint `preto-com-voz` |
| Plano parado 15-63 s | todos | lint `parado` (max 4 s) |
| Marca d'agua (Veo, terceiros) | 1, 3, 5, 7 | cortar ou regerar o B-roll |
| "-R$5000" em verde | 4 | cor pelo sinal |
| Mini-mascote trocando de canto | 4, 6 | sempre `corner-right` |
| Icones em 3 estilos | 2, 6 | so Lucide (estatico ou animado) |
| Cena Remotion fora de sincronia com a fala | 6 | tempos da folha vem da legenda do audio final |
