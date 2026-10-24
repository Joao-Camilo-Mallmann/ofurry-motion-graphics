# Catálogo de motion — 07-C8VGMvum854 (OFurry Investidor)

Vídeo de 498,8 s (8:19), 25 fps, 1920×1080. Posição 07 por visualizações (o menos visto). A análise usou as folhas `seg-XXX.jpg`, as visões gerais e quadros extras extraídos em `analise/extra-*.jpg`. Os dados completos estão em `catalogo.json`.

## Resumo

### Tempo por tipo de tomada

Cada tomada conta só pela categoria principal. O mascote está em cena em **31,8%** do vídeo, somando as tomadas em que ele divide a tela com gráfico, ícone ou texto.

| Categoria | % do tempo |
|---|---:|
| mascote | 22,5% |
| legenda-cinetica | 18,9% |
| icone | 15,6% |
| broll-tela-cheia | 15,2% |
| grafico | 7,4% |
| transicao | 5,9% |
| broll-moldura | 5,0% |
| meme-clip | 2,0% |
| lista-comparacao | 1,8% |
| numero-contador | 1,7% |
| palavra-destaque | 1,3% |
| texto-efeito | 0,9% |
| nuvem-palavras | 0,9% |
| cta-inscricao | 0,8% |

### Tempo por fundo

| Categoria | % do tempo |
|---|---:|
| gravacao | 27,2% |
| preto-poeira | 23,3% |
| preto-puro | 22,6% |
| grade-perspectiva | 18,4% |
| tunel-grade-candles | 8,5% |

`preto-poeira` é preto com poeira e arranhões de filme (equivale a estrelas/partículas). `tunel-grade-candles` inclui as versões escurecida e desfocada. Somando os dois pretos, 45,9% do vídeo tem fundo preto.

### Ritmo

- 81 tomadas em 498,8 s: uma troca a cada **6,2 s** em média (9,7 cortes de tomada por minuto).
- Legenda cinética: cerca de 151 cartões, um a cada **~0,72 s**, com **1,8 palavras por cartão** em média (1 a 3, raramente 4).
- Somando tomadas e cartões, **~28 mudanças visuais por minuto**.
- Ritmo desigual: blocos de legenda cinética a ~0,7 s por cartão alternam com planos parados de 10 a 27 s (mascote, split-screen, pizza). A detecção automática de cena do ffmpeg (scene > 0,25) achou só 42 cortes, porque cartões sobre preto mudam pouco o quadro; a contagem de tomadas foi feita a olho.

### Receitas recorrentes

**1. Mascote apresentador na grade + título fino que vira diagrama.** Mascote no centro (~30% da largura) sobre um chão de grade que aparece em fade de 1 a 2 s. Fica parado, só mexe a boca e troca de pose. Quando o conceito é nomeado, um título em Montserrat Light aparece sobre o mascote; no corte o mascote some, o título sobe para o topo e um diagrama se monta embaixo.

Exemplos (s): 32,8–42,5 → 42,5 (Risco versus Retorno → gráfico); 295,1–303,2 → 303,2 (diversificação → cestas); 132,9–143,4; 194,3–203,2; 432,4–451,3. Folhas: `seg-005.jpg`, `seg-006.jpg`, `seg-023.jpg`, `seg-024.jpg`, `extra-303-305.jpg`.

**2. Mascote no túnel de candles nas viradas de bloco.** Pose C (punho fechado, boca aberta) sobre o túnel 3D de grade com candles (clipe gerado no Veo, câmera avançando). Aparece nos 'vamos lá' e 'próximo passo'.

Exemplos (s): 12,2–16,3; 51,9–57,8; 175,7–181,2; 282,2–295,1. Folhas: `seg-002.jpg`, `seg-013.jpg`, `seg-023.jpg`.

**3. Legenda cinética no preto com poeira.** 1 a 3 palavras em Montserrat ExtraBold caixa alta branca (ou condensada itálica com glow), no centro, trocando a cada ~0,7 s. Entra subindo com motion blur vertical de 3 quadros e sai em corte. Às vezes um objeto cai atrás da palavra (cédulas em 238,3 s, carteira em 429,6 s) ou um gráfico de linha se desenha por baixo (240,9–248 s).

Exemplos (s): 234,0–248,1; 336,6–346,1; 427,1–431,4; 451,3–482,3. Folhas: `seg-017.jpg`, `seg-018.jpg`, `seg-020.jpg`, `seg-026.jpg`, `extra-25fps-336.jpg`.

**4. Ícone branco central + palavra por cima + rótulo fixo + setas verde e vermelha.** Ícone branco (preenchido ou só contorno) com glow no centro, 10–17% da largura; a palavra cinética passa por cima dele; um rótulo fino fixo fica embaixo; setas 3D verde (sobe, à esquerda) e vermelha (desce, à direita). Variantes: órbita de ícones neon em volta de um escudo, anel com cabeça desenhada em linha, fileira de 3 ícones entrando da esquerda.

Exemplos (s): 57,8–66,3; 97,3–104,9; 149,1–158,0; 168,95–175,7. Folhas: `seg-006.jpg`, `seg-008.jpg`, `seg-012.jpg`, `seg-013.jpg`.

**5. Lista de perfis com foco por desfoque (marcador de capítulo).** Três ícones de pessoa (verde, amarelo, vermelho) com rótulos em caixa alta e tracking largo. O item da vez fica nítido e os outros desfocados. Volta três vezes, uma por perfil.

Exemplos (s): 66,3–68,2; 84,5–88,05; 118,3–122,05. Folhas: `seg-008.jpg`, `seg-010.jpg`.

**6. Ilustração ou B-roll desfocado + legenda cinética + sticker.** Ilustração flat de banco de imagens ou footage desfocada (às vezes dentro de um cartão de borda branca inclinado 2–3° sobre a grade, com zoom out lento), palavras por cima e stickers recortados com contorno branco que entram em pop (feijão com arroz, barra de ouro, chave).

Exemplos (s): 109,25–118,3; 185,9–194,3; 203,2–221,6; 221,6–234,0; 330,4–336,56. Folhas: `seg-009.jpg`, `seg-015.jpg`, `seg-016.jpg`, `seg-025.jpg`.

**7. B-roll real com notas laterais em itálico colorido.** Clipe de banco de imagens em tela cheia (muitas vezes P&B) com 2 ou 3 linhas de texto num terço lateral, reveladas uma a uma com blur, misturando pesos e cores (a palavra-chave em verde, vermelho ou laranja).

Exemplos (s): 16,3–22,3; 71,45–79,52; 104,9–109,25; 266,7–276,4; 413,6–420,0. Folhas: `extra-016-022.jpg`, `extra-072-079.jpg`, `extra-099-109.jpg`, `extra-266-283.jpg`.

**8. Gráfico que se desenha no ritmo da fala.** Linhas com ponta de seta desenhadas em trim path, eixos que crescem da origem, rótulos com blur-in; pizza 3D cujas fatias crescem quando cada ativo é citado; contador regressivo vermelho.

Exemplos (s): 42,5–51,9; 239,4–248,1; 248,1–256,4; 372,2–399,85. Folhas: `seg-006.jpg`, `seg-020.jpg`, `seg-021.jpg`, `seg-027.jpg`.

### Primeiros 30 s (gancho)

- 0,0–2,0 s: a pergunta do título aparece sendo digitada ('Por onde começar a investir?'), sem logo nem vinheta.
- 2,0–6,5 s: nuvem caótica de ~13 nomes de ativos, cada um numa fonte e cor diferente, no ritmo da fala. Passa a sensação de excesso de opções.
- 6,5–8,2 s: 1,6 s de preto (quebra de padrão).
- 8,2–12,2 s: o mascote sobe de baixo encolhendo os ombros ('É, eu sei... relaxa e vem comigo') e entra o lower third 'OFURRY'.
- 12,2–16,3 s: o fundo vira o túnel de candles e aparece 'GUIA' (promessa: um guia, não uma fórmula mágica).
- 16,3–22,3 s: light leak, depois B-roll P&B emoldurado com 'passo a passo... SEGURA E INTELIGENTE'.
- 22,3–31,7 s: cena 3D gerada no estilo da thumbnail (ouro, porquinho, '?', RENDA FIXA), um emoji apontando para quem assiste e as palavras 'DECISÕES' e 'CONFIANÇA'.
- 31,7–32,8 s: fade para preto; o mascote volta e abre o primeiro conceito.
- Estrutura: pergunta → excesso de opções → empatia (mascote) → promessa (guia, passo a passo, seguro) → 'você' decide com confiança. São ~9 tomadas e ~20 palavras pipocando em 30 s.

### Tipografia

- **Principal:** Montserrat ExtraBold/Bold, caixa alta, branco, sombra escura suave, 1 a 3 palavras por cartão (legenda cinética).
- Montserrat SemiBold Italic: pergunta digitada e notas sobre B-roll.
- Montserrat Light/Thin (caixa baixa ou título, tracking largo): nomes de conceito ('Risco versus Retorno', 'diversificação', 'E NÃO EXISTE', 'PERFIL DE INVESTIMENTO').
- Condensada bold (tipo Bebas Neue/Oswald), reta ou itálica com glow: rótulos de ícones e parte das legendas.
- Serifada bold em caixa alta (tipo Times/Playfair): duas notas de B-roll.
- Fonte de marcador/HQ com contorno branco: rótulos da pizza.
- Nuvem de abertura: ~8 fontes aleatórias.
- **Tamanhos:** Legendas de 8% (fechamento) a 18% (ENTÃO) da largura, sem padrão fixo.

### Paleta

- **fundo:** #000000 com poeira branca; grade cinza #2A2A2A a #8A8A8A
- **texto:** #FFFFFF
- **mascote:** #E0952A laranja, #F2D6A0 creme, #121821 jaqueta, #2FA3A3 olhos
- **positivo:** #1FC81F / #22E01F verde
- **negativo:** #E01414 vermelho
- **intermediário/proteção:** #F5E10F amarelo
- **apoio:** #1E8FF0 azul (FII), #2EE6C8 ciano (destaque), #E8892B laranja (notas), #D4A017 ouro
- **túnel:** candles #26A69A (teal) e #EF5350 (vermelho) sobre preto, linhas #8A8A8A
- **marca:** laranja do mascote no lower third 'OFURRY' (#E39A2E) e no nome do cartão de inscrição (#D4972F)

### Assinaturas deste vídeo

- Mascote OFurry com 4 poses (A apresentando, B encolhendo os ombros, C punho animado, D mão atrás da cabeça) e boca animada; costuma entrar subindo com motion blur.
- Túnel 3D de grade com candles (clipe gerado, marca 'Veo' visível) como fundo de energia.
- Poeira e arranhões de filme sobre os fundos pretos.
- Abre e fecha com a mesma pergunta digitada (0,25 s e 448,7 s).
- Metáfora dos ovos e cestas: X vermelho pincelado, ovos nas cestas, explosão com sticker de meme (303–323 s).
- Contador negativo de -8804 $ até -0$ num cartão bege com mão em colagem meio-tom (248–256 s).
- Cartão de inscrição com avatar, botão 'Clica aí', cursor clicando e 'VALLEU <33' (468,5 s).
- Humor com meme: vídeo do 'tigrinho' (127 s) e meme do gato 'Dormiu bem?' (420 s).
- Lista de perfis verde/amarelo/vermelho com foco por desfoque, usada como marcador de capítulo.

### O que segura a retenção (hipóteses)

- HIPÓTESE: a sincronia literal quase total (o substantivo dito aparece na tela no mesmo instante) prende quem assiste sem som e reforça a compreensão.
- HIPÓTESE: os blocos de legenda a ~0,7 s por cartão criam novidade constante; contando cartões, são ~28 mudanças visuais por minuto.
- HIPÓTESE: os respiros pretos de 1 a 2 s antes do mascote voltar funcionam como reset de atenção.
- HIPÓTESE: o mascote como âncora recorrente (~32% do tempo em cena) cria familiaridade e marca as viradas de bloco.
- HIPÓTESE: as piadas (tigrinho, explosão com sticker, gato) caem a cada 2 ou 3 minutos e aliviam a densidade do conteúdo.
- HIPÓTESE: a lista de perfis revisitada e o callback da pergunta inicial dão sensação de progresso e de fechamento.
- HIPÓTESE: os planos parados longos (16 s de mascote em 432–449 s, 15 s de split-screen em 357–372 s, 5,8 s de preto vazio em 276–282 s) e os 16,5 s pretos do final são onde a retenção mais cai.

### Amador ou inconsistente

- Aviso de erro de render queimado no vídeo: 'This effect requires GPU acceleration' no glitch de 57,78 s (extra-57.7-barra.jpg).
- Legendas tiradas da transcrição automática sem revisão: 'FORMAL' em vez de 'for mal' (334,6 s), 'dos investimento' (19 s), 'GANANCIA' sem til (270 s).
- Textos em inglês num vídeo em português: 'Growth' (100 s), 'RISK'/'RETURN' (150 s), 'Investment Diversification' com 'Real Estote' e 'Blondts' (323 s). Parecem imagens geradas sem revisão.
- Marca d'água 'Veo' visível no túnel de candles e na cena estilo thumbnail.
- Fontes demais (7 ou mais) e troca de fonte no meio de uma sequência (112,5 s e 227,8 s).
- Tamanho de legenda sem padrão: de 18% da largura até 8% no fechamento, que também perde a poeira e a sombra.
- Transições sem padrão: light leak, zoom blur, slide espelhado, glitch em blocos, giro radial, whip pan, wipe ondulado, fade.
- Entradas do mascote variam (subida com blur, fade, pop, corte seco) e o fundo dele alterna entre grade e preto puro.
- Estilos gráficos misturados: ícones brancos de linha, ícones neon 3D, ilustrações flat de banco, colagem meio-tom, renders 3D de IA, emoji, memes.
- Camadas confusas: ícone de gráfico por cima do corpo do mascote (408–413 s).
- Planos longos sem novidade: 16 s de mascote parado (432–449 s), 15 s de split-screen (357–372 s), 5,8 s de preto vazio (276–282 s), 16,5 s pretos no fim.
- Conceitos-chave e números não visualizados: 'reserva de emergência' (178 s) e 'seis meses' (196 s) não aparecem na tela.

### O que padronizar na skill

- Uma família só (Montserrat) em 3 pesos: ExtraBold caixa alta (legenda), Light (título de conceito), SemiBold Italic (pergunta e notas).
- Legenda cinética com tamanho fixo (~14% da largura), sombra fixa e uma entrada só (subida de 3 quadros com motion blur).
- No máximo 2 transições: corte seco e zoom blur (ou glitch curto), sem efeitos que dependam de GPU.
- Mascote sempre sobre a mesma grade e com a mesma entrada (subida de 12 quadros).
- Ícones só Lucide brancos com glow; cores semânticas fixas (verde #1FC81F sobe, vermelho #E01414 cai, amarelo #F5E10F meio-termo).
- Revisar todo texto contra o roteiro: nada vindo da transcrição automática e nada em inglês.

### Termos novos (NOVO) usados aqui

- `nuvem-palavras` (tomada): muitas palavras em fontes e cores diferentes acumulando na tela (abertura, 2,0–6,5 s).
- `tunel-grade-candles` (fundo): túnel 3D de linhas de grade com candles verdes e vermelhos e câmera avançando; clipe gerado, com marca 'Veo'.
- `cta-inscricao` (tomada): cartão de inscrição com avatar, botão e cursor clicando (468,5 s).
- Variante `split-screen` de broll-tela-cheia (356,9–372,2 s).
- `preto-poeira` (fundo): o mesmo papel de estrelas/partículas, mas com poeira e arranhões de filme.

## Tomadas

Tempos em m:ss,s. Entrada em quadros a 25 fps (q). Ícones com o nome Lucide mais próximo. Detalhes completos (posição, escala, tipografia, cores, fala) no JSON.

| id | início–fim | dur (s) | tomada | fundo | o que está na tela | entrada | saída | ícones (Lucide) | relação | folha |
|---|---|---:|---|---|---|---|---|---|---|---|
| T01 | 0:00,0–0:02,0 | 2,0 | texto-efeito | grade-perspectiva | pergunta 'Por onde começar a investir?'; chão de grade escuro (linhas ~15% opacidade) + poeira branca | digitação (letra a letra) (21 q) | nuvem de palavras começa por cima (sem corte) | — | literal | seg-001.jpg |
| T02 | 0:02,0–0:06,5 | 4,5 | nuvem-palavras (NOVO) | grade-perspectiva | ~13 nomes de ativos espalhados e sobrepostos (RENDA FIXA, OURO, AÇÕES, PREVIDÊNCIA PRIVADA, fundos, IMOBILIÁRIOS, BITCOIN, debêntures, DOLAR, criptomoedas, COEs, Tesouro… | pop/glitch por palavra (3 q) | corte seco para preto (6.52) | — | literal | seg-001.jpg |
| T03 | 0:06,5–0:08,2 | 1,6 | transicao | preto-puro | tela preta | corte seco | mascote sobe de baixo | — | nenhuma (respiro) | extra-006-008.jpg |
| T04 | 0:08,2–0:12,2 | 4,0 | mascote | grade-perspectiva | mascote OFurry pose B (encolhe os ombros, duas mãos abertas); lower third 'OFURRY' (caixa contorno laranja); chão de grade (fade-in ~1.5 s) | slide de baixo + scale-up + motion blur (12 q) | corte seco com troca de fundo para o túnel | — | personagem | seg-002.jpg / extra-25fps-008.jpg |
| T05 | 0:12,2–0:16,3 | 4,1 | mascote | tunel-grade-candles (NOVO) | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre) (enquadrado mais perto, cortado na cintura); palavra 'GUIA'; túnel de grade 3D com candles verde… | corte seco; 'GUIA' entra em pop (3 q) | light leak laranja/branco (16.29, ~3 quadros) | — | literal + personagem | seg-002.jpg |
| T06 | 0:16,3–0:22,3 | 6,0 | broll-moldura | gravacao | clipe stock P&B de mãos contando dólares, dentro de moldura com borda escura granulada + contorno fino branco; notas: 'Passo a Passo' / 'para entrar neste mundo' / 'dos… | light leak laranja que vira P&B (5 q) | zoom blur para a cena seguinte (22.3, 2 quadros) | — | literal | extra-016-022.jpg |
| T07 | 0:22,3–0:26,0 | 3,7 | broll-tela-cheia | gravacao | cena 3D gerada (estilo thumbnail): pilha de barras de ouro, porquinho rosa com ícone de gráfico, '?' branco gigante, textos 3D 'OURO' dourado, 'AÇÃO' vermelho, 'RENDA FI… | zoom blur (3 q) | continua (emoji entra por cima) | — | metáfora (ativos) + literal | seg-003.jpg / extra-023-026.jpg |
| T08 | 0:26,0–0:31,7 | 5,7 | palavra-destaque + icone | gravacao | emoji de mão apontando para a câmera (amarelo 3D); palavras 'COMO TOMAR' / 'AS SUAS PRÓPRIAS' / 'DECISÕES' / 'CONFIANÇA' | emoji: sobe de baixo + scale (pop) (4 q) | fade para preto (31.3-31.7, ~10 quadros) | pointer | personagem (você) + literal | seg-004.jpg |
| T09 | 0:31,7–0:32,8 | 1,1 | transicao | preto-puro | tela preta | fade (10 q) | mascote sobe com blur | — | nenhuma (respiro) | extra-031-033.jpg |
| T10 | 0:32,8–0:42,5 | 9,7 | mascote | grade-perspectiva | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre); chão de grade (fade-in de 33.0 a 35.3); título 'Risco versus Retorno' (41.5) | slide de baixo + motion blur (4 q) | mascote some e título sobe ao topo | — | personagem + literal | seg-005.jpg |
| T11 | 0:42,5–0:51,9 | 9,4 | grafico | preto-poeira | título 'Risco versus Retorno'; eixos com setas + rótulos 'RETORNO'/'RISCO'; linha verde e linha amarela com seta, pontos brancos nos vértices, faíscas amarelas; rótulos… | título move/encolhe para o topo; eixos crescem da origem (17 q) | corte seco para mascote no túnel | chart-line | dado | seg-006.jpg / extra-042-050.jpg |
| T12 | 0:51,9–0:57,8 | 5,9 | mascote | tunel-grade-candles (NOVO) | mascote OFurry pose C (punho fechado erguido, boca aberta mostrando dentes, animado); túnel de grade com candles (Veo) | corte seco | glitch digital em blocos (57.75-57.85) com texto de erro de render visível | — | personagem | seg-006.jpg / extra-052-061.jpg |
| T13 | 0:57,8–1:06,3 | 8,5 | icone + legenda-cinetica | preto-poeira | ícone de usuário branco preenchido com glow/spot; palavra cinética sobreposta ao ícone; rótulo fixo 'PERFIL DE INVESTIMENTO'; seta verde 3D para cima / seta vermelha 3D… | glitch de entrada; palavras em corte seco; setas slide vertical (3 q) | elementos apagam (66.0) e corte | user-round, arrow-big-up, arrow-big-down | literal + metáfora | seg-006.jpg / extra-052-061.jpg / extra-060-072.jpg |
| T14 | 1:06,3–1:08,2 | 1,9 | lista-comparacao + icone | tunel-grade-candles (escurecido) | 3 ícones de pessoa empilhados: verde, amarelo, vermelho; rótulos 'PERFIL CONSERVADOR' / 'PERFIL INTERMEDIÁRIO' / 'PERFIL VIDA LOUCA' | fade + blur-in escalonado (12 q) | fade para preto | user-round | literal (capítulo) | extra-060-072.jpg |
| T15 | 1:08,2–1:11,5 | 3,2 | mascote | preto-puro | mascote OFurry pose C (punho fechado erguido, boca aberta mostrando dentes, animado); palavra 'PREVISÍVEIS' só contorno | corte seco | dissolve cruzado para B-roll (71.4, ~5 quadros) | — | personagem + literal | extra-060-072.jpg |
| T16 | 1:11,5–1:19,5 | 8,1 | broll-tela-cheia | gravacao | clipe stock colorido: mãos escrevendo em caderno, calculadora, notas de dólar; notas: 'Objetivo Principal' / 'Não perde DINHEIRO' / 'rentabilidade mínima' | dissolve; linhas com blur-in escalonado (5 q) | zoom blur (79.5, 2 quadros) | — | literal | extra-072-079.jpg |
| T17 | 1:19,5–1:24,5 | 5,0 | legenda-cinetica | tunel-grade-candles (desfocado) | palavra/termo central; subtítulo explicativo da sigla (CERTIFICADO DE DEPÓSITO BANCÁRIO etc.) | 1º cartão: zoom-in com blur (escala ~130%->100%); seguintes: pop de ~60%->100% (4 q) | fade para preto | — | literal | seg-007.jpg / extra-25fps-079.jpg |
| T18 | 1:24,5–1:28,0 | 3,5 | lista-comparacao | tunel-grade-candles (escurecido) | mesma lista de 3 perfis; foco passa para 'PERFIL INTERMEDIÁRIO' (86.6) | fade + blur-in escalonado (12 q) | zoom blur + RGB split, depois slide espelhado (mirror tile) ~8 quadros | user-round | literal (capítulo) | seg-008.jpg / extra-084-089.jpg |
| T19 | 1:28,0–1:31,9 | 3,9 | mascote | grade-perspectiva | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre); chão de grade | slide espelhado (mirror) com motion blur (8 q) | ícones entram ao lado (sem corte) | — | personagem | seg-008.jpg / extra-089-099.jpg |
| T20 | 1:31,9–1:37,3 | 5,4 | icone + mascote | grade-perspectiva | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre); ícone pessoa com raios (confiança), branco contorno com glow; ícone cérebro branco contorno com… | glitch/blur-in (3 q) | glitch para escudo (97.3) | person-standing, brain | metáfora | seg-008.jpg / extra-089-099.jpg |
| T21 | 1:37,3–1:39,3 | 2,0 | icone | preto-puro | escudo verde brilhante dentro de círculo fino branco | glitch (2 q) | zoom out revelando órbita | shield | literal | extra-089-099.jpg |
| T22 | 1:39,3–1:44,9 | 5,6 | icone | preto-puro | escudo no centro + ícones neon coloridos em órbita elíptica: gráfico de barras azul, casa laranja, barras de ouro, broto verde 'Growth', bitcoin roxo | zoom out da câmera + ícones aparecem com blur (15 q) | corte seco para B-roll | chart-column-increasing, house, gem, sprout, bitcoin | metáfora | seg-008.jpg / extra-099-109.jpg |
| T23 | 1:44,9–1:49,2 | 4,3 | broll-tela-cheia | gravacao | clipe stock: mãos femininas contando notas de 20 dólares (vista de cima); 'MIX ENTRE' (topo), 'ENTRE CRESCER' (esq.), 'NÃO SE DESCABELAR' (dir.) | corte seco; textos blur-in (5 q) | whip pan horizontal com rastro do texto (109.2, ~3 quadros) | — | literal | extra-099-109.jpg |
| T24 | 1:49,2–1:55,4 | 6,2 | legenda-cinetica + icone | gravacao | ilustração stock flat (pessoas, moedas, prédios rosa) totalmente desfocada; sticker colher de arroz + tigela de feijão (contorno branco); sticker barra de ouro cartoon c… | stickers em pop (1-2 quadros); palavras em corte seco (2 q) | corte (mesma ilustração, outro plano) | soup, gem | metáfora | seg-009.jpg |
| T25 | 1:55,4–1:58,3 | 2,9 | legenda-cinetica | gravacao | ilustração stock (gangorras com moedas) desfocada; palavra cinética | corte seco | fade para preto (~0.3 s) | — | literal | extra-115-119.jpg |
| T26 | 1:58,3–2:02,0 | 3,8 | lista-comparacao | tunel-grade-candles (escurecido) | lista de 3 perfis; 'PERFIL VIDA LOUCA' revelado em 120.3 | fade + blur-in escalonado (12 q) | corte seco | user-round | literal (capítulo) | seg-010.jpg |
| T27 | 2:02,0–2:05,6 | 3,5 | broll-tela-cheia | gravacao | clipe: moeda de 25 centavos girando e caindo sobre mesa (câmera lenta) | corte seco | corte para preto | — | metáfora (aposta) | visao-geral-02.jpg / extra-122-133.jpg |
| T28 | 2:05,6–2:07,2 | 1,6 | transicao | preto-puro | tela preta | corte seco | corte para meme | — | nenhuma (respiro antes da piada) | extra-122-133.jpg |
| T29 | 2:07,2–2:12,9 | 5,7 | meme-clip | gravacao | vídeo vertical de rede social (rapaz + pessoa fantasiada de tigre), 2 planos; cópia ampliada e desfocada do mesmo vídeo preenchendo as laterais | corte seco | corte para preto | — | metáfora (humor: 'jogo do tigrinho') | visao-geral-02.jpg / extra-122-133.jpg |
| T30 | 2:12,9–2:23,4 | 10,5 | mascote | grade-perspectiva | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre) -> troca para pose C em ~140.5; chão de grade | corte seco (aparece inteiro de uma vez) | mascote desfoca (sem corte) | — | personagem | seg-011.jpg |
| T31 | 2:23,4–2:29,1 | 5,7 | legenda-cinetica | grade-perspectiva | mascote OFurry pose C (punho fechado erguido, boca aberta mostrando dentes, animado) desfocado (blur gaussiano) como fundo; palavra cinética | slide horizontal com motion blur (3 q) | transição de giro (spin blur radial, 149.1-149.45, ~9 quadros) | — | literal | seg-011.jpg / extra-141-149.jpg / extra-149-150.jpg |
| T32 | 2:29,1–2:38,0 | 8,9 | icone | preto-poeira | anel branco com glow; perfil de cabeça desenhado em linha e depois preenchido; rótulos 'RISK' / 'RETURN'; ícones pequenos $, casa, capelo em arco acima; seta curva de ra… | anel cresce do centro (scale) + RISK/RETURN fade (15 q) | corte seco para B-roll | dollar-sign, house, graduation-cap, brain | metáfora | seg-012.jpg |
| T33 | 2:38,0–2:43,1 | 5,1 | broll-tela-cheia | gravacao | clipe: motociclistas de trilha na floresta (câmera de ação); legenda 2 linhas 'normalmente tem mais disposição / tempo e até oportunidade para arriscar' | corte seco | corte seco | — | metáfora (juventude/aventura) | visao-geral-02.jpg / extra-158-169.jpg |
| T34 | 2:43,1–2:47,5 | 4,4 | broll-tela-cheia | gravacao | clipe P&B: homem com mão na cabeça olhando notebook com gráfico | corte seco | corte para preto | — | metáfora (peso/responsabilidade) | extra-158-169.jpg |
| T35 | 2:47,5–2:48,9 | 1,4 | transicao | preto-puro | tela preta | corte seco | ícones deslizam da esquerda | — | nenhuma | extra-158-169.jpg |
| T36 | 2:48,9–2:52,9 | 4,0 | icone | preto-puro | ícone família (3 pessoas) branco preenchido; ícone banco 'BANK'; ícone carteira; rótulos 'FAMÍLIA' / 'TRABALHO' / 'ESTABILIDADE' | slide da esquerda com motion blur, escalonado (3 q) | ícones desfocam (sem corte) | users, landmark, wallet | literal | seg-013.jpg |
| T37 | 2:52,9–2:55,7 | 2,8 | icone + legenda-cinetica | preto-puro | ícones anteriores desfocados ao fundo; sticker barra de ouro cartoon (contorno preto, brilhos); seta verde 3D para cima; palavra cinética | pop (scale) (3 q) | corte seco para mascote | gem, arrow-big-up | metáfora | seg-013.jpg |
| T38 | 2:55,7–3:01,2 | 5,5 | mascote | tunel-grade-candles (NOVO) | mascote OFurry pose C (punho fechado erguido, boca aberta mostrando dentes, animado); túnel de candles | corte seco | corte seco para B-roll | — | personagem | seg-013.jpg |
| T39 | 3:01,2–3:05,9 | 4,7 | broll-tela-cheia | gravacao | clipe 3D/stock: porquinho vermelho e bolas azul/amarela sobre fundo bege | corte seco | continua com texto | — | metáfora (poupança) | visao-geral-03.jpg / extra-181-195.jpg |
| T40 | 3:05,9–3:14,3 | 8,4 | legenda-cinetica + icone | gravacao | porquinho desfocado ao fundo; ícone chave branco; palavra cinética pequena | corte seco; chave em pop (2 q) | glitch de deslocamento (193.9-194.3) | key-round | literal + metáfora | extra-181-195.jpg |
| T41 | 3:14,3–3:23,2 | 8,9 | mascote | grade-perspectiva | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre); chão de grade (fade-in ~1 s) | corte seco após glitch | light leak laranja/roxo + flash branco (203.15-203.35, ~5 quadros) | — | personagem | seg-014.jpg |
| T42 | 3:23,2–3:33,0 | 9,8 | broll-moldura | grade-perspectiva | cartão com borda branca inclinado ~3 graus, com animação stock flat (mala, mãos, pincel pintando moedas de dourado; depois nota de dinheiro entrando em portal); textos '… | flash branco + cartão entra já inclinado e assenta (4 q) | mascote entra na frente | — | literal + metáfora | seg-015.jpg / seg-016.jpg / extra-203-205.jpg / extra-210-212.jpg |
| T43 | 3:33,0–3:38,4 | 5,4 | mascote | grade-perspectiva | mascote OFurry pose C (punho fechado erguido, boca aberta mostrando dentes, animado); cartão inclinado com animação (cartão de crédito; depois céu com castelos) | slide de baixo + motion blur (pop) (3 q) | mascote some em corte seco | — | personagem | seg-016.jpg |
| T44 | 3:38,4–3:41,6 | 3,2 | broll-moldura | grade-perspectiva | cartão com ilustração de castelos flutuantes ligados por linhas tracejadas | corte seco | cartão escala até tela cheia e dessatura para P&B | — | metáfora | extra-218-236.jpg |
| T45 | 3:41,6–3:54,0 | 12,4 | legenda-cinetica | gravacao | ilustração stock P&B (castelos, globo-cidade, prédios e pessoas) desfocada; palavra cinética | corte seco | escurece para preto (233.9-234.7) | — | literal | extra-218-236.jpg |
| T46 | 3:54,0–3:58,3 | 4,3 | legenda-cinetica | preto-poeira | palavra cinética; poeira/arranhões de filme brancos | corte seco | corte (cartão seguinte) | — | literal | seg-017.jpg |
| T47 | 3:58,3–3:59,4 | 1,1 | icone + legenda-cinetica | preto-poeira | pilha de cédulas verdes cartoon; palavra cinética | cai de cima com motion blur (2 q) | corte seco | banknote | literal | seg-018.jpg |
| T48 | 3:59,4–4:08,1 | 8,7 | legenda-cinetica + grafico | preto-poeira | palavra cinética; duas linhas (verde e vermelha) subindo com seta verde, desenhando da esquerda para a direita | corte seco; linha desenha (trim path) | corte para preto | trending-up | literal + dado | seg-019.jpg / seg-020.jpg / seg-021.jpg |
| T49 | 4:08,1–4:16,4 | 8,3 | numero-contador | preto-poeira | cartão bege arredondado; número vermelho '-8804 $' contando até '-0$'; mão recortada em meio-tom P&B segurando papel 'BILLS' (colagem com contorno branco); partículas '-… | contorno do cartão aparece e preenche (15 q) | ícone vermelho cobre a mão | receipt | metáfora (dinheiro indo embora) | visao-geral-03.jpg / extra-248-264.jpg |
| T50 | 4:16,4–4:23,6 | 7,2 | icone | preto-poeira | ícone de pessoa vermelho preenchido com contorno branco; cartão bege com '-0$' | pop (scale) (3 q) | mascote entra na frente | user-round | metáfora | visao-geral-03.jpg / extra-248-264.jpg |
| T51 | 4:23,6–4:26,7 | 3,1 | mascote | preto-poeira | mascote OFurry pose B (encolhe os ombros, duas mãos abertas); cartão bege com ícone vermelho atrás | pop (não visível em detalhe) | corte seco para B-roll | — | personagem | seg-022.jpg |
| T52 | 4:26,7–4:36,4 | 9,7 | broll-tela-cheia | gravacao | clipe P&B: mãos segurando cartas de baralho (pôquer), grão de filme; notas 'Movido pela' / 'GANANCIA' / 'ENCONTROU FRUSTRAÇÃO' | corte seco; linhas blur-in (5 q) | corte para preto | — | metáfora (aposta) + literal | visao-geral-04.jpg / extra-266-283.jpg |
| T53 | 4:36,4–4:42,2 | 5,8 | transicao | preto-poeira | preto com poeira, sem elementos | corte seco | dissolve do mascote (~0.7 s) | — | nenhuma | extra-266-283.jpg |
| T54 | 4:42,2–4:55,1 | 12,9 | mascote | tunel-grade-candles (NOVO) | mascote OFurry pose C (punho fechado erguido, boca aberta mostrando dentes, animado); túnel de candles | fade do preto (17 q) | corte seco (troca de pose e de fundo) | — | personagem | seg-023.jpg |
| T55 | 4:55,1–5:03,2 | 8,1 | mascote | preto-puro | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre); título 'diversificação' (302.5) | corte seco | mascote some; título sobe ao topo (~0.6 s, ease) | — | personagem + literal | seg-023.jpg / extra-303-305.jpg |
| T56 | 5:03,2–5:08,9 | 5,7 | icone | preto-puro | título 'diversificação'; 3 cestas de contorno branco (a do meio cinza) | fade-in escalonado (8 q) | X vermelho por cima | shopping-basket | metáfora | seg-024.jpg / extra-303-305.jpg |
| T57 | 5:08,9–5:11,0 | 2,1 | icone | preto-puro | X vermelho pincelado gigante sobre a cesta do meio | pop (scale) / carimbo (3 q) | corte | x | metáfora | seg-024.jpg |
| T58 | 5:11,0–5:16,0 | 5,0 | icone | preto-puro | ovo de contorno amarelo dentro de cada uma das 3 cestas | pop (3 q) | explosão na cesta da direita | egg | metáfora | seg-024.jpg |
| T59 | 5:16,0–5:23,0 | 7,0 | icone + meme-clip | preto-puro | explosão de fogo realista (sprite) na cesta da direita; sticker meme de personagem cartoon assustado; 2 cestas restantes com ovos | corte seco / pop (1 q) | corte seco | — | literal + humor | seg-024.jpg |
| T60 | 5:23,0–5:30,4 | 7,4 | icone | preto-poeira | título 'Investment Diversification'; círculo branco com glow contendo formas: quadrado azul 'Stocks', círculo amarelo 'Bonds', losango vermelho 'Real Estote', triângulo… | formas em pop escalonado (3 q) | corte seco | shapes | metáfora/dado | seg-024.jpg |
| T61 | 5:30,4–5:36,6 | 6,2 | broll-moldura + legenda-cinetica | preto-poeira | cartão com borda branca inclinado ~2 graus com ilustração flat (escada de cubos de dinheiro, engrenagens, barras vermelhas/laranja); palavra cinética | corte seco | corte seco para preto | — | metáfora + literal | seg-025.jpg |
| T62 | 5:36,6–5:46,1 | 9,5 | legenda-cinetica | preto-poeira | palavra cinética | slide para cima com motion blur vertical (3 q) | corte seco | — | literal | seg-026.jpg / extra-25fps-336.jpg |
| T63 | 5:46,1–5:56,4 | 10,3 | broll-tela-cheia | gravacao | infográfico stock branco/cinza animado (gráfico de linha, pizza, barras, palavra 'Diversificação' em script, '?', X e check); seta verde 3D para cima / seta vermelha 3D… | corte seco; elementos do template se montam; setas pop (3 q) | escurece + glitch de linha (356.0-356.9) | arrow-up-down | metáfora/dado | visao-geral-04.jpg / extra-346-359.jpg |
| T64 | 5:56,4–5:56,9 | 0,5 | transicao | preto-puro | preto com risco branco de glitch | corte | corte para split-screen | — | nenhuma | extra-346-359.jpg |
| T65 | 5:56,9–6:12,2 | 15,3 | broll-tela-cheia | gravacao | tela dividida: clipe homem estressado em mesa de trading (esq.); clipe casa moderna (dir.); rótulos 'ALTO POTENCIAL' / 'MAIS CONSERVADOR' | corte seco | glitch em blocos (372.2-372.5) | — | metáfora | visao-geral-05.jpg / extra-359-372.jpg |
| T66 | 6:12,2–6:39,9 | 27,6 | grafico + mascote | preto-poeira | mascote OFurry pose C (punho fechado erguido, boca aberta mostrando dentes, animado); gráfico de pizza 3D (espessura visível) com fatias verde/vermelha/azul/amarela; rót… | glitch; fatias varrem no sentido horário (10 q) | corte via preto (1 quadro) + whip slide | chart-pie | dado | seg-027.jpg |
| T67 | 6:39,9–6:41,1 | 1,2 | mascote | gravacao | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre); ilustração vermelha (barras de fogo + homem com chifres) desfocada | whip slide da direita com motion blur (5 q) | wipe ondulado para o céu | — | personagem | seg-028.jpg / extra-398-403.jpg |
| T68 | 6:41,1–6:48,4 | 7,3 | mascote | gravacao | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre); ilustração de céu azul claro com balões (bandeira EUA) subindo, desfocada | wipe com borda ondulada (4 q) | dissolve escuro + ícone | — | personagem + metáfora | seg-028.jpg |
| T69 | 6:48,4–6:53,6 | 5,2 | icone | preto-puro | ícone grande de barras com seta para cima, branco com glow; mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre) escurecido atrás do ícone | fade (13 q) | corte seco | chart-no-axes-combined | metáfora/dado | seg-029.jpg |
| T70 | 6:53,6–7:00,0 | 6,4 | broll-tela-cheia | gravacao | clipe P&B vista de cima: mãos organizando papéis com gráficos; notas 'DIVERSIFICAR' (preto condensado) / 'FORMA INTELIGENTE' / 'EXCELENTE RENTABILIDADE' (verde fino itál… | corte seco; linhas blur-in (5 q) | meme entra por cima | — | literal | visao-geral-05.jpg / extra-413-425.jpg |
| T71 | 7:00,0–7:04,4 | 4,4 | meme-clip + print-noticia | gravacao | cartão branco levemente inclinado com meme ('Dormiu bem?' + foto de gato de olhos arregalados) | pop (scale) (3 q) | escurece para preto (424.0-424.5) | — | metáfora (humor) | visao-geral-05.jpg / extra-413-425.jpg |
| T72 | 7:04,4–7:05,0 | 0,6 | transicao | preto-puro | preto | fade (12 q) | corte | — | nenhuma | extra-413-425.jpg |
| T73 | 7:05,0–7:07,1 | 2,1 | mascote | preto-puro | mascote OFurry pose D (mão atrás da cabeça, sem graça) | corte seco | scale-down até sumir | — | personagem (sem graça) | seg-030.jpg |
| T74 | 7:07,1–7:11,4 | 4,3 | legenda-cinetica | preto-puro | palavra cinética; ícone carteira branco atrás de 'CARTEIRA' | slide para cima com motion blur vertical (3 q) | corte seco | wallet | literal | seg-030.jpg / extra-25fps-429.jpg |
| T75 | 7:11,4–7:12,4 | 1,0 | palavra-destaque | preto-puro | 'E NÃO EXISTE' | corte seco | corte para mascote com fade | — | literal | extra-431-433.jpg |
| T76 | 7:12,4–7:28,7 | 16,3 | mascote | grade-perspectiva | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre); chão de grade | fade (5 q) | texto digitado por cima | — | personagem | seg-031.jpg |
| T77 | 7:28,7–7:31,3 | 2,6 | texto-efeito + mascote | grade-perspectiva | mascote OFurry pose A (mão direita aberta apresentando, boca fecha/abre); 'Por onde começar a investir?' digitado (callback do início) | digitação (20 q) | corte seco para preto | — | literal (callback) | seg-031.jpg / visao-geral-06.jpg |
| T78 | 7:31,3–7:48,5 | 17,2 | legenda-cinetica | preto-puro | palavra cinética pequena | corte seco | corte seco | — | literal | seg-032.jpg / seg-033.jpg / seg-034.jpg / extra-451-482.jpg |
| T79 | 7:48,5–7:52,4 | 3,9 | cta-inscricao (NOVO) | preto-puro | cartão branco arredondado com avatar circular do mascote, nome 'OFurry' e botão vermelho 'Clica aí'; cursor de mão clicando; botão vira rosa 'VALLEU <33' com sino | pop (3 q) | fade | mouse-pointer-click, bell | literal (CTA) | seg-034.jpg |
| T80 | 7:52,4–8:02,3 | 9,9 | legenda-cinetica | preto-puro | palavra cinética pequena | corte seco | corte para preto | — | literal | seg-035.jpg / seg-036.jpg |
| T81 | 8:02,3–8:18,8 | 16,5 | transicao | preto-puro | preto vazio (área da tela final do YouTube; elementos não estão no arquivo) | corte seco | fim | — | nenhuma | visao-geral-06.jpg / extra-482-499.jpg |

### Observações por tomada

- **T01 (0:00,0):** Gancho: a pergunta do título é a primeira coisa na tela, sem logo/intro.
- **T02 (0:02,0):** Caos tipográfico intencional = 'sobrecarga de opções'.
- **T03 (0:06,5):** Pausa preta de 1.6 s antes do mascote: quebra de padrão.
- **T06 (0:16,3):** Erro de texto: 'dos investimento'.
- **T12 (0:51,9):** AMADOR: no glitch aparece queimado na imagem o aviso 'This effect requires GPU acceleration' (extra-57.7-barra.jpg).
- **T17 (1:19,5):** ~8 cartões em 5 s (0.6 s/cartão).
- **T22 (1:39,3):** Rótulo em inglês ('Growth') num vídeo PT-BR.
- **T24 (1:49,2):** Troca de fonte no meio da sequência.
- **T32 (2:29,1):** Rótulos em inglês ('RISK', 'RETURN').
- **T38 (2:55,7):** 'reserva de emergência' (conceito-chave) não aparece escrito.
- **T41 (3:14,3):** Número 'seis meses' não vira gráfico/número na tela.
- **T45 (3:41,6):** Segunda troca de fonte no meio de uma sequência.
- **T52 (4:26,7):** 'GANANCIA' sem til.
- **T53 (4:36,4):** 5.8 s de tela vazia sobre uma frase-chave (moral). Possível respiro intencional, mas longo.
- **T55 (4:55,1):** Mesmo mascote, mas sem a grade (inconsistente com 32.8 s).
- **T60 (5:23,0):** AMADOR: texto em inglês e com erros ('Real Estote', 'Blondts'), provável imagem gerada sem revisão.
- **T61 (5:30,4):** ERRO: cartão mostra 'FORMAL' (transcrição automática de 'for mal').
- **T62 (5:36,6):** ~12 cartões em 9.5 s.
- **T65 (5:56,9):** Variante split-screen (NOVO). 15 s sem trocar nada.
- **T69 (6:48,4):** Ícone colocado por cima do corpo do mascote (camadas confusas).
- **T76 (7:12,4):** 16 s de mascote parado sem nenhum elemento.
- **T78 (7:31,3):** ~24 cartões; pausa vazia 456.5-458.2.
- **T81 (8:02,3):** 16.5 s pretos; o nome 'Furry' e o vídeo recomendado só existem na tela final da plataforma.

## Arquivos extras gerados nesta análise

Em `analise/`: `extra-AAA-BBB.jpg` (mini-strips dos trechos não detectados, com o tempo no canto), `extra-25fps-*.jpg` (entradas quadro a quadro em 7,9 s, 79,5 s, 336,6 s e 429,6 s) e `extra-57.7-barra.jpg` (o aviso de erro de render queimado no glitch).
