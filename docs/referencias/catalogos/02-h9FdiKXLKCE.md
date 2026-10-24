# Catálogo de motion: 02-h9FdiKXLKCE

**Vídeo:** "Você Está Ignorando o Aviso do Criador da IA?" (OFurry Investidor), 9:28, 1920x1080 a 25 fps. Posição 02 por visualizações.

Este vídeo é 100% motion: não há gravação de rosto. O apresentador é o mascote (raposa 2D) e todo o resto é texto, ícones, prints e B-roll sobre preto.

## Resumo

### Tempo por tipo de tomada

| Tomada | % do tempo |
|---|---|
| mascote | 23,7% |
| icone | 19,2% |
| legenda-cinetica | 13,6% |
| broll-tela-cheia | 10,9% |
| broll-moldura | 9,2% |
| grafico | 6,0% |
| print-noticia | 3,6% |
| palavra-destaque | 3,1% |
| recorte-pessoa | 2,2% |
| citacao-digitada | 2,1% |
| lista-comparacao | 1,8% |
| transicao | 1,3% |
| texto-efeito | 1,3% |
| objeto-3d | 0,9% |
| cta-card | 0,7% |
| meme-clip | 0,4% |

O mascote está em cena (como tomada principal ou como elemento secundário) em **43,9%** do vídeo. Ele aparece pela primeira vez aos 32 s.

### Tempo por fundo

| Fundo | % do tempo |
|---|---|
| preto-puro | 57,3% |
| grade-perspectiva | 15,9% |
| imagem-tela-cheia | 15,4% |
| broll-desfocado | 8,1% |
| textura-jornal | 1,3% |
| padrao-interrogacao | 1,2% |
| mascote-close | 0,8% |

### Ritmo

- 105 tomadas em 9,5 min: **11,1 tomadas/min**, duração média 5,41 s (mediana 5,1 s).
- Contando as trocas de cartão dentro das tomadas: **~26,2 trocas visuais/min**, ou uma a cada **2,29 s**.
- Legenda-cinética: troca de cartão a cada **0,86 s**; **1,87 palavras por cartão** em média (mediana 2).
- Detecção de cena do ffmpeg: 5,9 cortes fortes/min (limiar 0,3) e 12,3/min (limiar 0,1). Ela subestima as trocas de legenda em fundo preto.
- As entradas duram quase sempre 0,17-0,5 s (1-3 quadros a 6 fps). O corte seco é o padrão para legendas e trocas de pose; os elementos novos entram com slide + motion blur, blur-in ou glitch.

### Receitas recorrentes

1. **Legenda-cinética no preto.** 1-3 palavras em Montserrat ExtraBold caixa alta, branco, pequeno (~3,5% da altura), centralizado, trocando por corte seco a cada ~0,7-0,9 s sobre preto (às vezes com poeira de filme). Variante Bebas Neue (maior, ~6%) e variante itálica. É o 'tapa-buraco' padrão entre imagens.
   - Tempos (s): 56,8-63,0; 164,3-173,2; 197,2-201,0; 250,3-256,5 (Bebas); 317,0-324,0 (Bebas); 516,7-524,6
   - Folhas: `seg-013.jpg`, `seg-014.jpg`, `seg-020.jpg`, `seg-027.jpg`, `seg-045.jpg`
2. **Mascote apresentador na grade.** Raposa recortada (PNG 2D) em pose de apresentador sobre chão de grade wireframe ondulando com profundidade de campo; entra com blur + scale (~0,33 s), troca de pose por corte seco, lip-flap simples. Às vezes recebe ícone ou legenda sobre o peito.
   - Tempos (s): 66,3-70,0; 154,3-161,0; 324,0-342,7; 413,1-421,5; 487,5-502,7
   - Folhas: `seg-005.jpg`, `seg-011.jpg`, `seg-027.jpg`, `seg-033.jpg`, `seg-042.jpg`
3. **Ícone neon + mascote mini.** Ícone de traço branco grosso com glow forte, centro ou centro-alto, sobre preto, com o mascote minúsculo no centro-inferior como 'assinatura'. Ícones são literais (bola de cristal, diploma, usuário, carvão, banco, globo de loteria). Inclui o marcador de capítulo 'pilar' com rótulo desfocado que se revela.
   - Tempos (s): 207,2-231,4 (pilares); 351,0-356,6 (pilar 2); 421,5-427,3 (pilar 3); 478,3-480,9 (banco); 530,0-535,2 (loteria)
   - Folhas: `seg-019.jpg`, `seg-028.jpg`, `seg-035.jpg`, `seg-041.jpg`, `seg-047.jpg`
4. **Card com moldura sobre fundo desfocado.** Imagem ou print dentro de card branco (borda fina ou rasgada, às vezes inclinado 1-3°), entra por slide com motion blur (~0,33 s), Ken Burns lento; o fundo é a cena anterior (grade, mascote ou print) desfocada.
   - Tempos (s): 40,3-43,6 (bolha .com); 52,2-56,7 (logos); 92,3-96,8 (bandeiras); 182,5-197,2 (corrida do ouro); 262,1-268,0 (eólicas); 473,5-478,3
   - Folhas: `seg-003.jpg`, `seg-004.jpg`, `seg-017.jpg`, `seg-040.jpg`
5. **Print de dados com foco e destaque vermelho.** Print de tabela ou gráfico real (ranking de valor de mercado, Google Finance) com zoom, profundidade de campo para isolar uma linha, seta ou caixa vermelha desenhada e mascote mini no canto; muitas vezes recebe legenda-cinética por cima.
   - Tempos (s): 47,9-52,2 (S&P 5 anos); 79,6-102,3 (NVIDIA/Google/Microsoft); 288,6-295,8 (mapa satélite); 508,0-511,0 (Magalu)
   - Folhas: `seg-007.jpg`, `extra-strip-tabela-zoom.jpg`, `extra-strip-mapa.jpg`
6. **Número-choque colorido.** Valor com fonte de destaque e cor semântica (vermelho = perda, verde = valor/ganho), entrando com efeito forte: voo 3D e estilhaço ('-80%'), streak de luz ('$12 BILHÕES'), pop ('$4.1 TRILHÕES', '+1'/'-8').
   - Tempos (s): 35,3-40,2 (-80%); 93,6-96,8 ($4.1 TRILHÕES); 140,3-141,3 ($12 BILHÕES); 144,2-154,3 (+1 / -8); 400,8 (~10 A 15 ANOS)
   - Folhas: `seg-002.jpg`, `seg-009.jpg`, `seg-010.jpg`, `seg-031.jpg`
7. **Citação digitada (prova de autoridade).** Fala de pessoa real aparece letra a letra (decoder ou digitação) em fonte fina ou dentro de caixa arredondada, junto com recorte da pessoa (estilo sticker com contorno branco) ou com o print da notícia de origem.
   - Tempos (s): 7,2-10,7; 10,7-16,9 (recorte Altman); 23,7-32,3 (caixa); 480,9-487,5 (Altman + citação)
   - Folhas: `seg-001.jpg`, `extra-strip-hook-typewriter.jpg`, `extra-strip-quotebox-entrada.jpg`, `extra-strip-altman-quote.jpg`
8. **B-roll tela cheia com legenda por cima.** Clipe ou imagem gerada em tela cheia (drone, data center, xadrez com robô, mina P&B) com a legenda-cinética por cima: fina e cinza (baixo contraste), em caixa preta translúcida ou Montserrat ExtraBold. Trocas de clipe por whip, giro ou dissolve rápidos.
   - Tempos (s): 309,8-317,0 (matriz energética); 356,6-366,0 (A NUVEM); 404,6-411,6 (xadrez); 429,6-435,7 (cobre); 442,0-449,5 (mina)
   - Folhas: `seg-026.jpg`, `seg-031.jpg`, `extra-strip-nuvem-texto.jpg`, `extra-strip-cobre-broll.jpg`

### Primeiros 30 s (gancho)

- **0,0-7,15 s:** Montagem-alarme: 11 palavras gigantes (COLAPSO, ALERTA, BOLHA, RISCO…) com glitch sobre jornal sépia, ~0,65 s cada, enquanto a narração faz a pergunta 'Você já parou para pensar…'. As palavras não são ditas: criam clima de crise.
- **7,15-10,65 s:** Respiro: preto com a citação 'Talvez a gente tenha exagerado' digitada em fonte fina, junto com a fala.
- **10,7-16,85 s:** Autoridade: recorte P&B do Sam Altman (sticker), nome deslizando, logo OpenAI gigante atrás, 'CEO' e ícone do ChatGPT.
- **16,85-23,7 s:** Prova: print da notícia inclinado em 3D, rolando, e texto 3D '“isso tudo pode ser uma' que deixa a palavra 'bolha' só na voz.
- **23,7-32,25 s:** Prova 2: caixa com a citação traduzida, digitada sobre o print.
- **32,25-40,2 s:** Entra o mascote (1ª vez, com a tag OFURRY) e o '-80%' 3D que explode: primeiro dado-choque.
- Estrutura: choque emocional (palavras) → citação → autoridade → prova documental → personagem → número. Em 30 s há ~20 trocas visuais e o mascote só aparece depois de todo o bloco de prova.

Folhas: `extra-strip-hook-0-4.jpg`, `extra-strip-hook-4-8.jpg`, `extra-strip-hook-typewriter.jpg`, `seg-001.jpg`, `extra-strip-texto3d-entrada.jpg`, `extra-strip-quotebox-entrada.jpg`, `seg-002.jpg`.

### Tipografia

| Papel | Fonte aparente | Caixa | Cor | Efeito | Tamanho |
|---|---|---|---|---|---|
| legenda-cinética padrão | sans geométrica bold tipo Montserrat ExtraBold | alta | #FFFFFF | sombra/brilho sutil | ~3,5% da altura (pequeno) |
| legenda alternativa / palavra-destaque | condensada tipo Bebas Neue | alta | #FFFFFF (palavras-chave em verde #2EE04A ou amarelo #F5E81B) | glow | ~6-10% da altura |
| legenda narrativa | Montserrat Bold Italic | alta | #FFFFFF | slide vertical com blur | ~4% |
| legenda sobre B-roll / rótulos de diagrama | condensada fina tipo Oswald Light / Montserrat Light (itálicas) | alta | cinza/branco com baixa opacidade | eco, caixa preta translúcida | 2,5-5% |
| números de impacto | pincel/marcador itálico (tipo Permanent Marker) | alta | vermelho #E01B1B, verde #2EE04A, branco | streak de luz | ~45% da largura |
| gancho | grotesca black tipo Roboto Black | alta | vermelho/amarelo/branco | glitch RGB, textura de jornal | 85-95% da largura |
| citações | Montserrat Light (decoder) / Montserrat SemiBold em caixa | mista | branco ou preto sobre branco | digitação | ~2,5-3% |
| marca | display arredondada bold itálica (logo 'OFURRY'/'OFurry') | alta/mista | laranja #E39A2D | caixa com contorno | ~13% da largura |

### Paleta

- Base: preto `#000000`, branco `#FFFFFF`, cinza da grade `#9A9A9A`.
- Mascote: laranja `#E39A2D`, creme `#F3D9A6`, jaqueta `#121A24`, olhos `#3FA7B5`.
- Cores semânticas: perda/alerta `#E01B1B`, ganho/valor `#2EE04A`, energia/destaque `#F5E81B`, glitch `#D63AF0`, azul tech `#1E3CFF`.
- O fundo é preto puro em ~57% do tempo e quase todo texto é branco; a cor vem do mascote, de logos e das cores semânticas pontuais. B-rolls de drone puxam laranja/azul-petróleo; vários B-rolls são P&B.

### Poses do mascote

- **A:** de frente, boca aberta, mão erguida gesticulando, outra no bolso (fala direta)
- **B:** 3/4 virada à direita, mão aberta apresentando (explicação; mais usada)
- **C:** de frente, shrug com as duas mãos (conclusão/'é isso')
- **D:** mão atrás da cabeça, olhar de lado (dúvida/constrangimento)
- **variantes:** perfil em mapa térmico 'em fogo'; close de reação com chamas; avatar sorrindo no CTA; versão mini (~5-8% da largura)

### Assinaturas deste vídeo

- Mascote 2D (raposa de jaqueta preta) como apresentador recortado, com 4 poses fixas trocadas por corte seco e lip-flap; versão minúscula no centro-inferior como 'marca d'água' em cenas de ícone.
- Chão de grade wireframe ondulado com profundidade de campo como 'estúdio' do mascote.
- Ícones de traço branco com glow forte (estilo neon) sobre preto, quase sempre literais à palavra dita.
- Pilar como marcador de capítulo (3 pilares de investimento) com rótulos desfocados que só se revelam quando o capítulo começa (213 s, 351 s, 421 s).
- Poeira e arranhões de filme sobre os pretos.
- Recortes de pessoas reais estilo sticker (contorno branco grosso).
- Segunda voz ('>>' na legenda automática) com visual próprio: mascote de perfil em mapa térmico sobre padrão de interrogações (173 s) e close de reação com chamas (282 s).
- Elementos em pixel-art de jogo (carvão, explosão, pão) misturados aos ícones neon.
- CTA final com card de perfil 'OFurry' e cursor clicando 'CLICA AIII' → 'VALLEEUUU <33'.
- Callback da analogia da padaria no fim ('preço do pão da padaria da OpenAI').

### O que pode segurar a retenção

- HIPÓTESE: a troca visual a cada ~2 s (tomada ou cartão de legenda) impede que o olho 'descanse'; fora das cenas do mascote, poucos planos ficam parados mais de 5 s.
- HIPÓTESE: o gancho de 7 s com palavras-alarme e glitch cria tensão antes de qualquer informação, e a sequência autoridade + print segura quem chegou cético.
- HIPÓTESE: anunciar '3 pilares' com rótulos desfocados abre uma pergunta que só fecha aos 7 min (efeito Zeigarnik).
- HIPÓTESE: números-choque com cor semântica (vermelho/verde) e efeito forte funcionam como 'picos' de atenção a cada 30-60 s.
- HIPÓTESE: a voz do espectador (objeção 'mas tem como ganhar dinheiro com isso?') no meio do vídeo renova a promessa e marca a virada do problema para a solução.
- HIPÓTESE: analogias concretas ilustradas (corrida do ouro, PowerPoint com mascote, Magalu) dão humor e memória para um tema abstrato.

### O que parece amador ou inconsistente (padronizar)

- Tipografia sem regra: pelo menos 7 famílias/estilos de legenda (Montserrat ExtraBold, Bold Italic, Light, Bebas, Oswald Light, condensada caixa baixa, pincel). Padronizar: 1 fonte de legenda + 1 de destaque + 1 de número.
- Legenda principal pequena demais (~3,5% da altura) para celular; o texto fino cinza sobre B-roll (262-271 s, 434 s, 468-471 s) quase some.
- Caixa alta e baixa misturadas e erros de transcrição nos cartões ('é' solto, 'openIA', 'DE AR', 'MAIAR', ponto final só em 'CONCRETO.').
- Pretos vazios e quadros quase vazios: 63-66 s, 141-142 s, 202-207 s (mascote minúsculo ~5 s), 344-351 s (mascote minúsculo ~7 s), 472,5-473,5 s e a despedida 564-568 s sobre preto.
- Mascote parado em tela por muito tempo sem apoio visual (324-337 s, 487-503 s); a analogia da padaria (154-161 s) e o 'tijolo de cimento' (419 s) ficam sem imagem.
- Estilos de ícone misturados (neon de traço, pixel-art, logos 3D, fotos de notas); escolher um sistema e manter.
- Poeira de filme aparece em alguns pretos e não em outros (164-173 s e 516-524 s são limpos).
- B-roll genérico que não bate com a fala (notas de euro/casinhas para 'mineradora', 473 s; gato-meme sem relação, 77 s).
- Tag de marca 'OFURRY' aparece uma única vez (32-34 s); o CTA usa outra grafia ('OFurry'). Definir lower-third fixo.
- Bloco de texto jurídico minúsculo e ilegível (402-404 s) e glitch de grade que parece acidental (496,8 s).

### Vocabulário novo usado

- Tomada **citacao-digitada** (NOVO): citação de pessoa real aparecendo letra a letra (decoder/digitação), solta ou em caixa
- Tomada **recorte-pessoa** (NOVO): foto recortada de pessoa real estilo sticker (contorno branco), com nome e logos
- Tomada **cta-card** (NOVO): card de perfil com botão de inscrição e cursor clicando
- Fundo **textura-jornal** (NOVO): colagem de jornal sépia com vinheta (gancho)
- Fundo **imagem-tela-cheia** (NOVO): print ou B-roll ocupando a tela inteira como fundo
- Fundo **broll-desfocado** (NOVO): cena/print anterior desfocado atrás de card ou texto
- Fundo **padrao-interrogacao** (NOVO): preto com pontos de interrogação brancos espalhados
- Fundo **mascote-close** (NOVO): close extremo do rosto do mascote preenchendo a tela
- Não há gravação de rosto/câmera neste vídeo; o fundo 'gravacao' do vocabulário não ocorre.

## Tomadas

Tempos em m:ss. "Entrada" traz o tipo e a duração. A coluna Folha aponta a melhor referência visual em `analise/`.

| # | Início–fim | Dur (s) | Tomada | Fundo | Fala (curta) | Visual principal | Entrada | Ícone (Lucide) | Relação | Folha |
|---|---|---|---|---|---|---|---|---|---|---|
| T001 | 0:00.00–0:07.15 | 7,15 | texto-efeito | textura-jornal (NOVO) | Você já parou para pensar que, se hoje o homem mais importante da tecnologia mundial olha… | 11 palavras-alarme gigantes, uma por vez, centralizadas (~85-95% da largura): COLAPSO, ALERTA, BOLHA, RISCO, RUPTURA, COLAPSO, ALERTA, VOLATIL, SISTEMA, QUEDA, FALHA. Fu… | glitch (RGB split + fatias deslocadas/datamosh) entre palavras (0,17-0,33 s) | — | metáfora (palavras de clima; nenhuma é… | `extra-strip-hook-0-4.jpg` |
| T002 | 0:07.15–0:10.65 | 3,5 | citacao-digitada (NOVO) | preto-puro | …talvez a gente tenha exagerado. | Frase entre aspas "Talvez a gente tenha exagerado" em uma linha, centro-esquerda, ~55% da largura. | digitação tipo decoder (caracteres aleatórios trocam até fixar) (~2,7 (≈1 carac… | — | literal (citação) | `extra-strip-hook-typewriter.jpg` |
| T003 | 0:10.70–0:16.85 | 6,15 | recorte-pessoa (NOVO) | preto-puro → logo gigante desfocado | Sam Altman, o CEO da Open AI, ou a mente e o pai do ChatGPT… | Foto P&B recortada do Sam Altman com contorno branco grosso (estilo sticker), centro-direita, ~35% da largura, cortada no peito. Nome 'Sam Altman' no terço esquerdo. A p… | recorte: corte seco; nome: slide da esquerda com motion blur; logo: blur-in/dis… | logo ChatGPT (marca): `bot` | personagem (pessoa real) + literal (nom… | `seg-001.jpg` |
| T004 | 0:16.85–0:20.90 | 4,05 | print-noticia | imagem-tela-cheia (NOVO) | acabou de basicamente admitir isso casualmente, que é… | Print de notícia de site de tecnologia sobre Altman dizer que a IA está numa bolha (foto dele + manchete + corpo), inclinado em 3D (~5°), ocupando ~100% da largura. | corte a partir de flash branco (~0,17 s) | — | prova | `extra-strip-print-entrada.jpg` |
| T005 | 0:20.90–0:23.70 | 2,8 | palavra-destaque | broll-desfocado (NOVO) | isso tudo pode apenas ser uma bolha. | '“isso tudo / pode ser uma' em duas linhas, centro, ~70% da largura, sobre o print que continua rolando e clareia para branco. A palavra 'bolha' não aparece (frase fica… | glitch de pixels + motion blur horizontal (~0,33 s) | — | literal | `extra-strip-texto3d-entrada.jpg` |
| T006 | 0:23.70–0:32.25 | 8,55 | citacao-digitada (NOVO) | broll-desfocado (NOVO) | Ele disse aos repórteres que, quando bolhas acontecem, pessoas muito inteligentes ficam s… | Caixa retangular arredondada com borda preta grossa (~55% da largura), centro-esquerda, com a citação traduzida em 3 blocos; atrás, o print com motion blur. | caixa nasce como linha e expande na vertical; texto digitado (0,33 / ~1,7 s) | — | prova | `extra-strip-quotebox-entrada.jpg` |
| T007 | 0:32.25–0:35.25 | 3,0 | mascote | preto-puro | Ele até comparou o momento atual que a gente vive com a bolha dos anos 2000… | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso), terço esquerdo, ~35% da largura. Tag 'OFURRY' no canto inferior direito (caixa com conto… | blur + scale-in (começa menor e desfocado) (~0,33 s) | — | personagem | `seg-002.jpg` |
| T008 | 0:35.25–0:40.25 | 5,0 | palavra-destaque | preto-puro | …naquela época divertida em que o Nasdaq caiu apenas 80% | '-80%' branco extrudado em 3D (~40% da largura) centro-direita + faixa de cotações 3D inclinada ('NASDAQ 0.85x 124%…') no topo; mascote segue à esquerda. | voo 3D do alto-direita com motion blur (~0,6 s) | — | dado | `seg-002.jpg` |
| T009 | 0:40.25–0:43.60 | 3,35 | broll-moldura | preto-puro | porque o mercado descobriu que a maioria das empresas de internet era apenas um… | Imagem de bolha de sabão com '.com' sendo furada por alfinete, em card branco de borda rasgada (~60% da largura), centro. | zoom-out: começa em tela cheia desfocada e encolhe até o card (~0,33 s) | — | metáfora (bolha pontocom) | `seg-003.jpg` |
| T010 | 0:43.60–0:46.50 | 2,9 | icone | preto-puro | …PowerPoint com um mascote bonitinho por trás. | Logo do PowerPoint (~30% da largura) à esquerda sobre o card; em 45,0 s imagem do Clippy (assistente-clipe do Office) à direita. | slide de baixo-esquerda com motion blur (~0,33 s) | logo PowerPoint (marca): `presentation` | literal + piada (Clippy = 'mascote boni… | `seg-003.jpg` |
| T011 | 0:46.50–0:47.85 | 1,35 | mascote | preto-puro | E honestamente, ele até pode estar certo. | raposa minúscula (~5-8% da largura) no centro-inferior (pose B, ~9%). | blur-in (~0,25 s) | — | personagem | `extra-strip-ppt-para-grafico.jpg` |
| T012 | 0:47.85–0:52.20 | 4,35 | grafico | preto-puro | O mercado de ações americanas quase dobrou nesses últimos cinco anos… | Print do Google Finance de um ETF do S&P 500 (linha verde, 5 anos) em card escuro (~65% da largura), centro; caixa vermelha de destaque desenhada sobre a variação de +77… | slide de baixo para cima com motion blur (0,2-0,3 s) | — | dado / prova | `visao-geral-01.jpg` |
| T013 | 0:52.20–0:56.80 | 4,6 | broll-moldura | broll-desfocado (NOVO) | …um punhado de empresas gigantes prometeu que a IA ia mudar literalmente tudo. | Imagem de parede de logos neon das big techs (Google, Apple, Amazon, NVIDIA, OpenAI, Tesla etc.) em card de borda branca fina (~60% da largura), centro; gráfico anterior… | slide de cima para baixo com motion blur (~0,33 s) | — | literal (empresas gigantes) | `seg-004.jpg` |
| T014 | 0:56.80–1:03.00 | 6,2 | legenda-cinetica | preto-puro | Então, aí fica uma pergunta, se isso tudo é uma bolha, por que tem gente que compra essa… | Cartões centralizados; o primeiro ('Então aí fica uma pergunta') em caixa mista com glow, ~40% da largura; os demais 10-25% da largura. Cartões: Então aí fica uma pergun… | corte seco por cartão (0 s) | — | literal | `seg-004.jpg` |
| T015 | 1:03.00–1:06.25 | 3,25 | transicao | preto-puro | (silêncio de ~3,7 s depois de 'verdade ainda?') | Tela preta vazia. | corte seco (0 s) | — | pausa | `extra-1fps-040.jpg` |
| T016 | 1:06.25–1:10.00 | 3,75 | mascote | grade-perspectiva | E para entender o tamanho da alucinação hoje que a gente tá vivendo, não precisa… | raposa pose A (de frente, boca aberta, mão erguida gesticulando, outra no bolso), centro, ~30% da largura, enquadrada da orelha à coxa. Fundo: chão de grade wireframe br… | blur + scale-in (~0,33 s) | — | personagem | `seg-005.jpg` |
| T017 | 1:10.00–1:12.25 | 2,25 | icone | grade-perspectiva | …ter uma bola de cristal… | Ícone de bola de cristal (traço branco + glow + brilhos) sobre o peito do mascote, ~15% da largura. | pop (~0,33 s) | bola de cristal: `sparkles (não há bola de cristal)` | literal | `extra-1fps-040.jpg` |
| T018 | 1:12.25–1:13.10 | 0,85 | icone | grade-perspectiva | …ou algum doutorado em economia. | Ícone de certificado/diploma com fita (traço branco + glow), ~25% da largura, sobre o mascote. | corte/pop (~0,17 s) | diploma/certificado: `file-badge (ou award)` | literal | `seg-006.jpg` |
| T019 | 1:13.10–1:15.25 | 2,15 | mascote | grade-perspectiva | É só olhar a lista das empresas mais valiosas do mundo… | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso), centro-direita, ~30%. | blur-in após whip (~0,4 s) | — | personagem | `seg-006.jpg` |
| T020 | 1:15.25–1:17.40 | 2,15 | print-noticia | grade-perspectiva (desfocada) | …hoje e perceber que o topo já virou uma pirâmide… | Print de tabela de ranking de valor de mercado (NVIDIA, Alphabet, Microsoft, Apple, Amazon…) em card escuro de borda branca (~90% da largura). | corte/slide rápido (~0,17 s) | — | prova / dado | `seg-006.jpg` |
| T021 | 1:17.40–1:19.60 | 2,2 | meme-clip | grade-perspectiva (desfocada) | …sobre inteligência artificial. Bom, em primeiro lugar… | Clipe de gato preto e branco em pé (meme) em card vertical à direita (~22% da largura), sobre o print da tabela. | pop/slide da direita (~0,25 s) | — | humor (sem relação literal clara) | `seg-006.jpg` |
| T022 | 1:19.60–1:32.30 | 12,7 | grafico | imagem-tela-cheia (NOVO) | …isolada, temos apenas a Nvidia, valendo sozinha absurdos 4.3 trilhões de dólares. Isso s… | A tabela em tela cheia com zoom forte; linha da NVIDIA em foco e o resto desfocado (profundidade de campo); barras pretas em cima. Seta vermelha entra em 86 s apontando… | whip-zoom: borrão radial + barras de luz branca (~0,5 s) | seta de destaque: `arrow-right` | dado / prova | `extra-strip-tabela-zoom.jpg` |
| T023 | 1:32.30–1:36.80 | 4,5 | broll-moldura | broll-desfocado (NOVO) | …como a da Alemanha, que vale 4.1 trilhões… | Colagem de bandeiras europeias em card de borda rasgada (~45% da largura), centro; '$4.1 TRILHÕES' em condensada verde (~30% da largura) abaixo do card a partir de 93,6… | card: slide do canto superior direito com motion blur; número: pop (0,33 / 0,17… | — | dado + metáfora (bandeiras = países) | `extra-strip-bandeiras-4tri.jpg` |
| T024 | 1:36.80–1:42.25 | 5,45 | grafico | imagem-tela-cheia (NOVO) | …o Google valendo seus 3.8 trilhões e a Microsoft valendo 3.6 | Mesma tabela; o foco desce para a linha do Google (97 s) e depois da Microsoft (100 s); mascote mini no canto inferior esquerdo. | rack focus + pan vertical (~0,5 s) | — | dado | `visao-geral-02.jpg` |
| T025 | 1:42.25–1:46.20 | 3,95 | legenda-cinetica | broll-desfocado (NOVO) | Basicamente, o PIB do planeta tá focado em cinco empresas… | Cartões centralizados sobre a tabela nítida (que fica atrás). Cartões: BASICAMENTE / O PIB / EM CINCO / ESTÁ FOCADO / EMPRESAS | corte seco por cartão (0 s) | — | literal | `seg-007.jpg` |
| T026 | 1:46.20–1:47.85 | 1,65 | legenda-cinetica | preto-puro | …que vendem a promessa de IA. | Cartões centralizados. Cartões: QUE VENDEM / IA | corte seco (0 s) | — | literal | `seg-007.jpg` |
| T027 | 1:47.85–1:54.10 | 6,25 | mascote | grade-perspectiva | O mercado basicamente precifica tudo acreditando que essas empresas vão dominar não só te… | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso), centro, ~30% (107,9-112 s); depois pose D (mão atrás da cabeça, olhando de lado). | blur-in (~0,5 s) | — | personagem | `seg-007.jpg` |
| T028 | 1:54.10–1:59.20 | 5,1 | broll-tela-cheia | imagem-tela-cheia (NOVO) | …mas a agricultura, a medicina, o transporte e a vida nos próximos anos. | Tríptico: 3 painéis verticais lado a lado (agricultor com drone e tablet; médica com cérebro holográfico; passageira em veículo autônomo), imagens geradas com leve anima… | corte seco (0 s) | — | literal (um painel por palavra) | `extra-strip-triptico.jpg` |
| T029 | 1:59.25–2:05.40 | 6,15 | icone | preto-puro | Mas aí vem um [detalhe que] nenhuma das empresas gosta de falar sobre e sempre tentam var… | Ícone de rosto pedindo silêncio (dedo nos lábios), traço branco com glow, centro-alto (~22% da largura); legenda pequena embaixo. Cartões: MAS AÍ VEM / O DETALHE / QUE /… | ícone: pop com blur; legenda: slide-up curto/fade (~0,17 s) | rosto pedindo silêncio (segredo): `volume-x (aprox.; não há rosto 'shh')` | metáfora (segredo) | `seg-008.jpg` |
| T030 | 2:05.40–2:06.40 | 1,0 | palavra-destaque | preto-puro | …a conta não fecha. | 'A CONTA' (A branco, CONTA verde com glitch magenta) e depois 'NÃO FECHA' (NÃO vermelho, FECHA branco), ~45% da largura, sobre o ícone. Cartões: A CONTA / NÃO FECHA | glitch RGB (~0,17 s) | — | literal | `seg-008.jpg` |
| T031 | 2:06.40–2:10.10 | 3,7 | icone | broll-desfocado (NOVO) | Enquanto a Nvidia vale seus 4 trilhões e vendendo a pá… | Logo da NVIDIA (olho verde + wordmark, ~35% da largura), centro. Em 127,5 s o fundo vira foto P&B desfocada com moedas douradas caindo (bokeh). | glitch/slide da esquerda (~0,25 s) | logo NVIDIA (marca): `cpu` | literal + metáfora (moedas = lucro de q… | `extra-strip-nvidia.jpg` |
| T032 | 2:10.10–2:16.20 | 6,1 | broll-tela-cheia | imagem-tela-cheia (NOVO) | …quem está realmente cavando o buraco está sangrando até a morte. É só olhar para a maior… | Close P&B de notas de 1 dólar; uma mão coloca moedas (vídeo); seta vermelha grande para baixo à esquerda (~10% da largura, metade da altura). | whip horizontal (~0,17 s) | seta para baixo (perda): `arrow-big-down` | metáfora (perder dinheiro) | `extra-strip-dolar-seta.jpg` |
| T033 | 2:16.20–2:17.20 | 1,0 | icone | preto-puro | …a OpenAI. | Logo branco da OpenAI + wordmark (~60% da largura), centro. | zoom/blur-in (~0,33 s) | logo OpenAI (marca): `bot` | literal | `seg-009.jpg` |
| T034 | 2:17.20–2:20.25 | 3,05 | mascote | preto-puro | Em um único trimestre, eles tiveram basicamente um prejuízo de… | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso), terço esquerdo, ~22%; legenda fina e pequena à direita. Cartões: EM UM ÚNICO / TRIMESTRE… | mascote: corte; legenda: streak de luz horizontal/fade (~0,25 s) | — | personagem + literal | `seg-009.jpg` |
| T035 | 2:20.25–2:22.00 | 1,75 | palavra-destaque | preto-puro | …12 bilhões de dólares. | '$12 BILHÕES' vermelho em fonte de pincel itálica (~45% da largura) à direita do mascote. Depois ~0,7 s de preto. | revelação por streak de luz horizontal vermelho (wipe) (~0,33 s) | — | dado | `extra-strip-doze-bilhoes.jpg` |
| T036 | 2:22.00–2:24.20 | 2,2 | icone | preto-puro | Analistas descobriram que para cada… | Silhueta de usuário preenchida branca com glow (~25% da largura), centro. | revelação por máscara diagonal (wipe) (~0,25 s) | analista: `user` | metáfora | `seg-010.jpg` |
| T037 | 2:24.20–2:34.30 | 10,1 | lista-comparacao | preto-puro | …um dólar que entra de receita no caixa da OpenAI… ChatGPT Plus, a empresa gasta quase 8… | Diagrama em 4 cantos: nota de 100 dólares (superior esquerdo, ~22%) com '+1' verde; logo OpenAI + 'PLUS' (entra grande e fantasma no centro e encolhe para o inferior esq… | cada elemento faz pop no ritmo da fala (~0,25 s) | dinheiro entrando/saindo: `banknote` | dado | `seg-010.jpg` |
| T038 | 2:34.30–2:41.00 | 6,7 | mascote | grade-perspectiva | E pense aqui comigo, meu pequeno gafanhoto, se você tivesse uma padaria e gastasse 8 reai… | raposa pose A (de frente, boca aberta, mão erguida gesticulando, outra no bolso), centro, ~30% da largura, enquadrada da orelha à coxa. | blur/fade-in (~0,33 s) | — | personagem | `seg-011.jpg` |
| T039 | 2:41.00–2:44.30 | 3,3 | legenda-cinetica | grade-perspectiva | …quanto tempo você acha que demoraria até falir? | 'QUANTO TEMPO' sobre o peito do mascote; o mascote sai e os outros cartões ficam sobre a grade vazia. Cartões: QUANTO TEMPO / VOCÊ ACHA QUE / DEMORARIA ATÉ FALIR? | corte seco (0 s) | — | literal | `seg-012.jpg` |
| T040 | 2:44.30–2:53.20 | 8,9 | legenda-cinetica | preto-puro | E quando o mercado perceber que essa conta não fecha, muitos investidores podem perder mi… | Cartões centralizados pequenos (16-35% da largura) em preto limpo (sem poeira). Cartões: E QUANDO / O MERCADO PERCEBER / QUE ESSA CONTA / NÃO FECHA / MUITOS INVESTIDORES… | corte seco por cartão (0 s) | — | literal | `seg-013.jpg` |
| T041 | 2:53.20–2:59.80 | 6,6 | mascote | padrao-interrogacao (NOVO) | >> Tá certo, eu entendi a desgraça. O topo da pirâmide está em fogo, a conta da padaria n… | Raposa de perfil (virada à direita) colorida com mapa térmico vermelho/amarelo/preto, ~35% da largura, esquerda-centro; fundo preto com dezenas de pontos de interrogação… | corte seco (0 s) | — | personagem (voz do espectador/objeção)… | `seg-016.jpg` |
| T042 | 2:59.80–3:02.50 | 2,7 | mascote | grade-perspectiva | >> É só olhar como foi a corrida do ouro. | raposa pose A (de frente, boca aberta, mão erguida gesticulando, outra no bolso), centro, ~30% da largura, enquadrada da orelha à coxa. | grade aparece escura, mascote faz blur-in (~0,5 s) | — | personagem | `seg-016.jpg` |
| T043 | 3:02.50–3:17.20 | 14,7 | broll-moldura | broll-desfocado (NOVO) | Quem ficou rico… nunca foi o garimpeiro… foi o cara esperto que vendeu a pá, a calça jean… | ~6 imagens fotorrealistas geradas (garimpeiro enlameado; vendedor de pás/calças/água apertando a mão; mão com moedas de ouro e notas; mesa com pás, calças e garrafas) em… | slide lateral com leve rotação e motion blur (~0,17 s) | — | literal / metáfora (corrida do ouro) | `seg-017.jpg` |
| T044 | 3:17.20–3:21.00 | 3,8 | legenda-cinetica | preto-puro | E na nossa situação atual, agora, a água tem um nome um pouco diferente e ela se chama… | Cartões centralizados. Cartões: AGORA / TEM UM NOME / A ÁGUA / UM / POUCO DIFERENTE / ELA SE CHAMA | slide vertical curto com motion blur/eco (~0,17 s) | — | literal | `seg-018.jpg` |
| T045 | 3:21.00–3:22.30 | 1,3 | palavra-destaque | preto-puro | …infraestrutura física. | 'INFRAESTRUTURA FÍSICA' em Bebas branco com glow (~33% da largura), centro. Cartões: INFRAESTRUTURA FÍSICA | eco vertical (rastro de cópias desfocadas) (~0,25 s) | — | literal | `seg-018.jpg` |
| T046 | 3:22.30–3:27.20 | 4,9 | mascote | preto-puro | Então, por agora, a ideia é você mudar o jeito que você enxerga tudo isso. | raposa minúscula (~5-8% da largura) no centro-inferior (pose B, ~6%). Nada mais na tela por ~5 s. | corte seco (0 s) | — | personagem | `extra-1fps-200.jpg` |
| T047 | 3:27.20–3:33.20 | 6,0 | icone | preto-puro | Em vez de ficar preso nessa promessa que a tecnologia vai ser milagrosa e vai mudar tudo… | Ícone de pessoa com mãos na cintura e raios (confiança), traço branco com glow, centro-alto (~20%); mascote mini embaixo. | pop (~0,17 s) | pessoa confiante: `person-standing` | metáfora | `seg-019.jpg` |
| T048 | 3:33.20–3:51.40 | 18,2 | icone | preto-puro | …vamos olhar para quem sustenta todo esse jogo… o dinheiro… está indo para três lugares b… | Pilares (coluna clássica, traço branco com glow, ~10% da largura): 1 → 2 → fileira que desliza para a esquerda → 3 pilares fixos com rótulos DESFOCADOS embaixo (216-225… | pilares surgem com pop + blur (~0,17 s) | pilar (capítulo/estrutura): `landmark (aprox.)` | metáfora + estrutura (anuncia 3 capítul… | `seg-019.jpg` |
| T049 | 3:51.40–3:52.60 | 1,2 | legenda-cinetica | preto-puro | Pensa comigo… | Cartão centralizado. Cartões: PENSA COMIGO | corte seco (0 s) | — | literal | `extra-1fps-200.jpg` |
| T050 | 3:52.60–4:01.90 | 9,3 | icone | preto-puro | …não importa se o Gemini, o Grok, o GPT, qual IA vai vencer a luta. Todos eles, sem exceç… | Ícone de app do Gemini (quadrado branco arredondado, esquerda, ~13%), logo do Grok (centro), logo do ChatGPT (direita), em linha; legenda sobre o centro. Cartões: NÃO IM… | cada logo entra com slide curto e motion blur (Gemini da esquerda; Grok voa do… | logos de IA (marcas): `bot` | literal | `seg-019.jpg` |
| T051 | 4:01.90–4:04.75 | 2,85 | icone | preto-puro | …que é basicamente consomem muita energia elétrica. | Raio amarelo grande (~25% da largura) no centro com palavras azuis sobre ele; logos laterais desfocam (profundidade de campo). Cartões: CONSOMEM / ENERGIA / ELÉTRICA | raio entra de baixo com blur (~0,33 s) | energia: `zap` | literal / metáfora | `seg-019.jpg` |
| T052 | 4:04.75–4:10.30 | 5,55 | mascote | preto-puro | É estranho de pensar que às vezes um comando como apenas obrigado gasta muito mais energi… | raposa pose C (de frente, 'shrug' com as duas mãos abertas), centro (~30%); a partir de 247 s um print escuro de interface de chat de IA (e depois de busca) aparece atrá… | mascote: corte; print: slide/fade atrás (~0,17 s) | — | prova / literal | `extra-strip-print-chat.jpg` |
| T053 | 4:10.30–4:16.45 | 6,15 | legenda-cinetica | preto-puro | Então, aqui vem o grande problema das Big Techs atuais. Elas se vendem como [verdes]. | Cartões centralizados; 'VERDES' em verde. Cartões: ENTÃO / O GRANDE / PROBLEMA / DAS BIG TECHS ATUAIS / ELAS SE VENDEM / COMO “VERDES” | corte seco (0 s) | — | literal | `seg-020.jpg` |
| T054 | 4:16.45–4:22.05 | 5,6 | icone | preto-puro | Elas, na teoria, não poderiam queimar carvão para alimentar esses robôs. >> Por que isso… | Pedaço de carvão em pixel-art (~10% da largura) com halo, centro; X vermelho carimbado por cima em 257,8 s; em ~260 s tudo dessatura para cinza e o mascote mini aparece… | carvão desce do alto com fade; X entra por corte seco (0,5 / 0 s) | carvão proibido: `x` | literal | `extra-strip-carvao-x.jpg` |
| T055 | 4:22.05–4:28.00 | 5,95 | broll-moldura | preto-puro | Mas elas precisam muito dessa energia limpa. E o mais importante para elas, precisam que… | Vídeo aéreo P&B de turbinas eólicas em card de borda rasgada (~85% da largura); legenda fina cinza dentro do card. Cartões: MAS / ELAS PRECISAM / MUITO DESSA / ENERGIA L… | corte seco (0 s) | — | literal | `extra-strip-eolica-card.jpg` |
| T056 | 4:28.00–4:31.25 | 3,25 | broll-tela-cheia | imagem-tela-cheia (NOVO) | Os data centers que hospedam isso não podem parar de uma hora para outra. | Rack de servidores com cabos azuis e LEDs verdes, desfoque raso; legenda fina sobre a imagem. Cartões: OS DATACENTERS / NÃO PODEM / PARAR | corte seco (0 s) | — | literal | `visao-geral-04.jpg` |
| T057 | 4:31.25–4:34.75 | 3,5 | mascote | broll-desfocado (NOVO) | Isso coloca um peso gigantesco em cima das empresas de energia. | raposa pose A (de frente, boca aberta, mão erguida gesticulando, outra no bolso), centro, ~30% da largura, enquadrada da orelha à coxa; fundo = servidores azuis desfocad… | zoom-out: começa em close grande e encolhe ao tamanho normal com blur (~0,33 s) | — | personagem | `seg-021.jpg` |
| T058 | 4:34.75–4:42.00 | 7,25 | icone | preto-puro | A coisa já está tão séria que a própria Microsoft já conseguiu fechar uma curva para ativ… | Logo da Microsoft em card branco de cantos arredondados irregulares (~38% da largura), centro; ícone de usina nuclear (traço branco com glow) no canto inferior direito d… | slide da esquerda com motion blur (~0,33 s) | usina nuclear: `factory (ou radiation)` | literal | `seg-022.jpg` |
| T059 | 4:42.00–4:46.80 | 4,8 | mascote | mascote-close (NOVO) | >> E sim, vai ser ligado uma usina nuclear para garantir que um servidor da Amazon não se… | Close extremo do rosto do mascote (olhos e focinho, >100% da largura) com filtro laranja/sépia e overlay de chamas (estilo meme de reação). | corte seco (0 s) | — | personagem (reação irônica / segunda vo… | `seg-023.jpg` |
| T060 | 4:46.80–4:48.55 | 1,75 | mascote | preto-puro | >> A própria Amazon já fez a mesma coisa… | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso), esquerda (~20%). | corte seco (0 s) | — | personagem | `seg-024.jpg` |
| T061 | 4:48.55–4:55.75 | 7,2 | print-noticia | preto-puro | …comprando um data center colado em uma usina nuclear. Lá fora, basicamente, as empresas… | Imagem de satélite em card de borda branca (~70% da largura) à direita; setas vermelhas desenhadas à mão + rótulos 'DATACENTER' e 'USINA'; mascote pose B na frente, à es… | zoom com borrão radial; setas com draw-on (0,17 / ~0,33 s) | seta de apontamento: `redo (seta curva)` | prova | `extra-strip-mapa.jpg` |
| T062 | 4:55.75–5:01.00 | 5,25 | broll-tela-cheia | imagem-tela-cheia (NOVO) | Por que elas têm a única coisa que a Microsoft não consegue programar, energia elétrica à… | Monitor com código/terminal colorido, primeiro plano desfocado; 'Energia elétrica à vontade' em condensada fina branca no centro a partir de 298,9 s (~45% da largura). | corte seco; texto por fade (0 / 0,33 s) | — | metáfora (programar) | `extra-strip-terminal.jpg` |
| T063 | 5:01.00–5:04.30 | 3,3 | mascote | preto-puro | E beleza, como é que fica nossa situação aqui no Brasil? | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso), centro (~30%). | fade-in a partir do preto (~0,5 s) | — | personagem | `seg-025.jpg` |
| T064 | 5:04.30–5:09.75 | 5,45 | broll-moldura | preto-puro | Já que nós somos vistos lá por fora como a Arábia Saudita da energia verde. | Bandeira do Brasil (card plano ~45% da largura), centro, por cima do mascote; em 307 s troca para a bandeira da Arábia Saudita. | pop/corte; troca por dissolve com blur (0,17 / 0,33 s) | — | literal | `visao-geral-04.jpg` |
| T065 | 5:09.75–5:17.00 | 7,25 | broll-tela-cheia | imagem-tela-cheia (NOVO) | Bom, nossa matriz energética é basicamente composta de hidráulica, eólica e solar. E o cu… | 3 clipes de drone em golden hour: barragem hidrelétrica, turbina eólica, campo solar. | transição de giro (spin) com borrão rotacional e cunhas pretas (~0,33 s) | — | literal | `seg-026.jpg` |
| T066 | 5:17.00–5:24.00 | 7,0 | legenda-cinetica | preto-puro | Então, grandes empresas de geração e transmissão de energia aqui no Brasil já estão esper… | Cartões centralizados; em 322,2 s ícone de prancheta com check (com 'CONTRATOS' dentro, ~20% da largura); 'VALIOSOS' em amarelo. Cartões: ENTÃO / GRANDES / EMPRESAS / DE… | corte seco (0 s) | contrato: `clipboard-check` | literal | `seg-027.jpg` |
| T067 | 5:24.00–5:42.65 | 18,65 | mascote | grade-perspectiva | Você não precisa só apostar no robô que vai dar certo. É só ver, todos gastam luz… aqui a… | raposa pose A (de frente, boca aberta, mão erguida gesticulando, outra no bolso), centro, ~30% da largura, enquadrada da orelha à coxa (324-333 s), depois pose B (333,6-… | blur-in (~0,33 s) | — | personagem + literal | `seg-027.jpg` |
| T068 | 5:42.65–5:44.00 | 1,35 | legenda-cinetica | preto-puro | …sem medo de perder a rede. | Cartão centralizado. Cartões: A REDE | corte seco (0 s) | — | literal | `visao-geral-05.jpg` |
| T069 | 5:44.00–5:51.00 | 7,0 | mascote | preto-puro | Bom, agora você já sabe que a energia é a comida que os robôs precisam para poder pensar. | raposa minúscula (~5-8% da largura) no centro-inferior (~5%). Tela vazia por ~7 s. | corte seco (0 s) | — | personagem | `visao-geral-04.jpg` |
| T070 | 5:51.00–5:56.55 | 5,55 | icone | preto-puro | Isso leva para o nosso segundo pilar, ou então as nuvens. | Pilar no centro-alto com rótulo desfocado que se revela 'AS NUVENS' (354 s); mascote mini embaixo; 354,5-356,5 s só o mascote mini. | pilar: pop; rótulo: desfocado → nítido (0,17 / 0,33 s) | pilar (capítulo 2): `landmark (aprox.)` | estrutura (capítulo) | `seg-028.jpg` |
| T071 | 5:56.55–6:06.00 | 9,45 | broll-tela-cheia | imagem-tela-cheia (NOVO) | …a nuvem basicamente não fica no céu. Ela é basicamente um galpão gigante, gigantesco mes… | Imagem P&B dramática (cidade de racks sob tempestade com raios) e, a partir de 360,3 s, corredor de data center com névoa; legenda em caixa. Cartões: A NUVEM / BASICAMEN… | corte seco a partir do preto (0 s) | — | literal / metáfora | `extra-strip-nuvem-texto.jpg` |
| T072 | 6:06.00–6:15.30 | 9,3 | icone | preto-puro | E para poder conseguir construir um data center, você primeiro precisa de uma licença amb… | Diagrama: ícone de data center (servidores + nuvem) no centro-alto (~20%); linha desenhada até prancheta com escudo (inferior esquerdo) + 'LICENÇA AMBIENTAL'; linha até… | ícone: pop após máscara; linhas: draw-on; rótulos: fade (0,17 / 0,5 / 0,33 s) | data center / licença / refrigeração: `server + cloud / clipboard-check / fan` | literal | `seg-029.jpg` |
| T073 | 6:15.30–6:19.45 | 4,15 | mascote | preto-puro | E isso dá um poder de cobrar um aluguel extremamente caro em quase qualquer preço que voc… | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso), centro, na frente do diagrama (ícones atrás, um pouco apagados). | blur-in (~0,33 s) | — | personagem | `seg-029.jpg` |
| T074 | 6:19.45–6:28.30 | 8,85 | broll-moldura | grade-perspectiva | Lá fora esses data centers são extremamente [valiosos]. Mas aqui no Brasil a gente tem um… | Vídeo de racks de servidores (câmera na mão) primeiro em tela cheia; em ~383,5 s encolhe para card de borda branca (~75%) sobre a grade; 'Rio AI' → 'Rio AI City' (~35% d… | corte; depois zoom-out para o card (0 / 0,5 s) | — | literal | `extra-strip-servidores-card.jpg` |
| T075 | 6:28.30–6:35.45 | 7,15 | print-noticia | preto-puro | …que quer transformar o Rio de Janeiro em um hub global de dados para aproveitar a energi… | Print do site do projeto (texto + render aéreo verde), inclinado em 3D, sobe de baixo e rola; legenda fina pequena abaixo. Cartões: QUER TRANSFORMAR / O RIO DE JANEIRO | slide de baixo para cima (máscara) (~0,33 s) | — | prova | `seg-030.jpg` |
| T076 | 6:35.45–6:44.55 | 9,1 | mascote | preto-puro | E o melhor dessa tese é a segurança que a gente vai ter aqui. Esses contratos de aluguel… | Transição de partículas brancas voando (warp) + blur-in do mascote; raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso), terço esquerdo (~22%… | partículas (warp) + blur-in; ícone e número: pop (0,5 / 0,17 s) | segurança: `shield + lock` | dado / prova | `seg-031.jpg` |
| T077 | 6:44.55–6:51.55 | 7,0 | broll-tela-cheia | imagem-tela-cheia (NOVO) | Ou seja, mesmo que essa bolha de IA estoure amanhã ou que ninguém mais queira saber de um… | Vídeo de braço robótico jogando xadrez contra uma mulher; legenda centralizada. Cartões: OU SEJA / MESMO QUE / DE AR / AMANHÃ / NINGUÉM MAIS / DE UM CHATBOT … | corte seco (0 s) | — | metáfora (IA x humano) | `seg-031.jpg` |
| T078 | 6:51.55–6:53.10 | 1,55 | legenda-cinetica | preto-puro | …o contrato já está assinado. | Cartão centralizado. Cartões: ESTÁ ASSINADO | fade (~0,33 s) | — | literal | `extra-1fps-400.jpg` |
| T079 | 6:53.10–7:01.50 | 8,4 | mascote | grade-perspectiva | O Google e a Meta vão ter que pagar um aluguel do mesmo jeito. É basicamente um tijolo de… | raposa pose A (de frente, boca aberta, mão erguida gesticulando, outra no bolso), centro, ~30% da largura, enquadrada da orelha à coxa (413-416 s), depois raposa pose C… | corte seco (0 s) | — | personagem | `seg-032.jpg` |
| T080 | 7:01.50–7:07.25 | 5,75 | icone | preto-puro | E por fim, a gente tem que ir para a raiz do problema. Que é a tabela periódica. | Pilar no centro-alto com rótulo desfocado → 'A TABELA PERIÓDICA' (~426,5 s); mascote mini embaixo. | pilar: fade-in; rótulo: desfocado → nítido (0,5 / 0,33 s) | pilar (capítulo 3): `landmark (aprox.)` | estrutura (capítulo) | `seg-035.jpg` |
| T081 | 7:07.25–7:09.60 | 2,35 | legenda-cinetica | preto-puro | Commodities são extremamente críticas em todo o mundo… | Cartões centralizados. Cartões: COMMODITIES / EXTREMAMENTE CRÍTICAS / EM TODO O MUNDO | corte seco; último cartão com eco vertical (escada de cópias) (0 / 0,17 s) | — | literal | `seg-035.jpg` |
| T082 | 7:09.60–7:15.65 | 6,05 | broll-tela-cheia | imagem-tela-cheia (NOVO) | …especificamente o cobre. Você não treina uma inteligência artificial com pixels, né? Voc… | Sequência rápida: metal fundido com faíscas (429,6 s) → bobinas de cobre (430,2 s) → chip sobre fios de cobre (432,2 s) → estrada desfocada ao pôr-do-sol com texto fino… | corte seco; trocas por whip/motion blur (0 / 0,17 s) | — | literal | `extra-strip-cobre-broll.jpg` |
| T083 | 7:15.65–7:22.00 | 6,35 | icone | preto-puro | Um data center em si já usa toneladas de cobre. E a rede elétrica… tem que usar milhões d… | Ícone de data center no centro (~40% da largura); tiles de elemento químico 'Cu 29' (contorno cor de cobre) se empilham da esquerda; raio amarelo entra de baixo (438,6 s… | tiles: pop + blur (vários por segundo); raio: slide de baixo (0,17 / 0,33 s) | cobre (tile de elemento) / data center / energia: `atom (aprox.) / server / zap` | literal / dado (quantidade) | `seg-036.jpg` |
| T084 | 7:22.00–7:29.45 | 7,45 | broll-tela-cheia | imagem-tela-cheia (NOVO) | E o problema aqui é geológico. As minas atuais já são velhas. O teor de cobre no mundo ve… | Vídeo aéreo P&B de mina a céu aberto; legenda no centro-inferior com efeito de eco (cópias empilhadas). Cartões: AQUI É / GEOLÓGICO / JÁ SÃO / O TEOR / VEM CAINDO / MAIS… | corte seco (0 s) | — | literal | `visao-geral-05.jpg` |
| T085 | 7:29.45–7:36.40 | 6,95 | mascote | grade-perspectiva | E para abrir uma nova mina não é tão simples assim. Pode demorar tempo até achar ou até c… | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso) (449,5-454,5 s) → pose A. | whip horizontal com blur (~0,25 s) | — | personagem | `seg-037.jpg` |
| T086 | 7:36.40–7:45.00 | 8,6 | grafico | preto-puro | Então isso sozinho já cria um cenário clássico da oferta e procura, onde a demanda tende… | Eixos P×Q se desenhando (456,5-458,4 s); seta verde para cima à esquerda (458,7 s); curvas de demanda/oferta se desenhando (459,5-461,6 s); 'IA' em pincel itálico branco… | draw-on das linhas; seta e ícones: pop (~2 / 0,17 s) | alta / carro elétrico: `arrow-big-up / car-front` | dado | `extra-strip-grafico-oferta.jpg` |
| T087 | 7:45.00–7:48.00 | 3,0 | icone | preto-puro | …e em contrapartida a quantidade de cobre vem diminuir com o tempo. | Seta vermelha para baixo (esquerda) + tiles 'Cu' diminuindo de 3 para 1 (direita). | pop (~0,17 s) | queda: `arrow-big-down` | dado | `extra-1fps-440.jpg` |
| T088 | 7:48.00–7:50.95 | 2,95 | legenda-cinetica | preto-puro | E o resultado disso é que o preço do material do cobre… | Cartões no centro-inferior, cinza, com eco. Cartões: O RESULTADO / É QUE / COBRE | fade com eco (~0,33 s) | — | literal | `extra-1fps-440.jpg` |
| T089 | 7:50.95–7:53.50 | 2,55 | objeto-3d | preto-puro | …irá subir. | Explosão em pixel-art (laranja/branco) crescendo do centro até ~60% da tela; depois ~1 s de preto. | scale-up rápido (~0,4 s) | — | metáfora (preço explode) | `seg-039.jpg` |
| T090 | 7:53.50–7:58.25 | 4,75 | broll-moldura | preto-puro | Investir em uma mineradora é basicamente uma das contas mais seguras que você pode fazer… | Foto de notas de euro, calculadora e casinhas em miniatura em card arredondado que cresce de ~45% para ~65% da largura; mascote mini embaixo. | pop (~0,17 s) | — | metáfora genérica (não mostra minerador… | `seg-040.jpg` |
| T091 | 7:58.25–8:00.90 | 2,65 | icone | preto-puro | Afinal o governo pode imprimir dinheiro à vontade. | Ícone de banco ('BANK') em traço branco com glow (~33% da largura), centro. | smear horizontal (~0,17 s) | governo/banco: `landmark` | literal / metáfora | `seg-041.jpg` |
| T092 | 8:00.90–8:07.50 | 6,6 | recorte-pessoa (NOVO) | preto-puro | E como o próprio Sam Altman disse, criar código a IA consegue, mas ninguém sabe como impr… | Recorte colorido do Sam Altman com contorno branco no terço esquerdo (~35%); banco desfocado atrás à direita; citação digitada à direita ('“CRIAR” CÓDIGO A IA CONSEGUE /… | recorte: slide da esquerda com motion blur; texto: digitação (0,33 / ~2 s) | — | prova / personagem (citação) | `extra-strip-altman-quote.jpg` |
| T093 | 8:07.50–8:22.70 | 15,2 | mascote | grade-perspectiva | Resumo da ópera meus amigos, eu acho que de fato o Sam Altman pode estar certo… qualquer… | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso) (487,5-497,6 s) → raposa pose C (de frente, 'shrug' com as duas mãos abertas) (497,6-502,… | blur-in (~0,33 s) | — | personagem | `seg-042.jpg` |
| T094 | 8:22.70–8:28.00 | 5,3 | broll-tela-cheia | imagem-tela-cheia (NOVO) | E se você tentar apostar de qual vai ser a IA que vai dar [certo]… | Parede de ícones 3D de apps de IA sobre gradiente arco-íris. | zoom-in com motion blur (~0,25 s) | — | literal (várias IAs = apostas) | `seg-043.jpg` |
| T095 | 8:28.00–8:31.00 | 3,0 | grafico | imagem-tela-cheia (NOVO) | …bem capaz que você vire o próximo investidor da Magalu, que acabou perdendo tudo. | Logo Magalu (quadrado azul arredondado, ~30% da largura) faz pop no centro; em 509 s o fundo vira print do Google Finance da ação caindo ~-95% em 5 anos. | pop com motion blur; fundo por corte (~0,17 s) | — | dado / prova / piada | `extra-strip-magalu.jpg` |
| T096 | 8:31.00–8:36.70 | 5,7 | palavra-destaque | preto-puro | Mas a revolução da estrutura física que foi construída durante esse tempo não vai sumir d… | 'INFRAESTRUTURA FÍSICA' em Bebas branco com glow (~65% da largura), centro; o mascote (pose C) surge na frente em 515,3 s. Cartões: INFRAESTRUTURA FÍSICA | scale-down de gigante + motion blur horizontal (~0,5 s) | — | literal | `seg-044.jpg` |
| T097 | 8:36.70–8:44.60 | 7,9 | legenda-cinetica | preto-puro | Então a energia do claro, os data centers e as mineradoras de cobre é isso é concreto. Is… | Cartões centralizados em preto limpo. Cartões: ENTÃO / A ENERGIA / OS / DATACENTERS / E / AS MINERADORAS … | corte seco (0 s) | — | literal | `seg-045.jpg` |
| T098 | 8:44.60–8:47.10 | 2,5 | objeto-3d | preto-puro | Mesmo que o mundo a partir de amanhã… | Globo terrestre 3D girando (~13% da largura), centro, com varredura de luz. | pop/fade (~0,33 s) | mundo: `earth` | literal | `seg-046.jpg` |
| T099 | 8:47.10–8:50.00 | 2,9 | icone | preto-puro | …afirme que a humanidade não precisa mais de um ChatGPT. | Logo do ChatGPT branco (~12% da largura) que é coberto por X/risco vermelho com glitch. | corte; X entra com glitch (0 / 0,17 s) | ChatGPT descartado: `ban (ou x)` | literal | `seg-047.jpg` |
| T100 | 8:50.00–8:55.20 | 5,2 | icone | preto-puro | Não tente acertar na loteria qual vai ser o próximo Google ou qual vai ser a próxima IA q… | Ícone de globo de sorteio/loteria (traço branco com glow, ~25%) no centro; card do logo do Google faz pop à esquerda (532,4 s); ícone do Gemini à direita (534 s). | pop (~0,17 s) | loteria: `dices (semântico) / ferris-wheel (visual)` | literal / metáfora | `seg-047.jpg` |
| T101 | 8:55.20–9:01.30 | 6,1 | mascote | preto-puro | E é melhor você investir num setor que garanta que o Google vai conseguir ficar de pé nos… | raposa pose B (3/4 virada à direita, mão aberta 'apresentando', outra no bolso), centro (~30%), sem grade. | corte seco (0 s) | — | personagem | `seg-047.jpg` |
| T102 | 9:01.30–9:08.30 | 7,0 | legenda-cinetica | preto-puro | …assim que o dinheiro se posiciona. >> Enquanto a manada discute o preço do pão da padari… | Cartões centralizados; 'do pão' com um pão em pixel-art atrás (544,5 s). Cartões: assim que o dinheiro / se posiciona / Enquanto a manada / do pão / da padaria / da open… | corte seco (0 s) | pão: `croissant (aprox.)` | literal (callback da padaria) | `seg-048.jpg` |
| T103 | 9:08.30–9:20.25 | 11,95 | legenda-cinetica | preto-puro | Bom, se você viu esse vídeo até aqui e considera que eu consegui te ensinar alguma coisa… | Cartões centralizados. Cartões: BOM / ESSE VÍDEO / ATÉ AQUI / E CONSIDERA / TE ENSINAR / ALGUMA COISA … | corte seco (0 s) | — | literal | `visao-geral-07.jpg` |
| T104 | 9:20.25–9:24.30 | 4,05 | cta-card (NOVO) | preto-puro | >> …considera deixar um like e se inscrever e ativar o [sininho] | Card branco arredondado (~17% da largura) no centro, com avatar circular do mascote, nome 'OFurry' (laranja) e botão cinza 'CLICA AIII'; cursor de mão entra por baixo e… | pop/scale com leve overshoot (~0,17 s) | sino / cursor: `bell / pointer` | literal (CTA) | `seg-049.jpg` |
| T105 | 9:24.30–9:28.50 | 4,2 | transicao | preto-puro | Bom, eu sou o Furry e a gente se vê por aí. | Tela preta até o fim. | corte seco (0 s) | — | nenhuma (despedida sem visual) | `extra-1fps-560.jpg` |

Detalhes completos (tipografia, movimento, saída, cores, ícone Lucide, notas) estão em `catalogo.json`.
