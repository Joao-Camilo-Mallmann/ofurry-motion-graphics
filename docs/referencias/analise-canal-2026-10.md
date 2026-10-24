# Analise de motion do canal OFurry Investidor (outubro de 2026)

Base da skill `ofurry-house-motion`. Os 7 videos longos do canal (@OFurryOficial) foram baixados em 1080p,
segmentados por script (`scripts/reference/extract-motion.py`) e catalogados tomada a tomada por um subagente
por video. Os catalogos completos estao em `docs/referencias/catalogos/`. Os videos, folhas de contato e
`catalogo.json` ficaram fora do repositorio, em `C:\Users\jcami\Videos\ofurry-referencias\`.

## Os videos

| # | Titulo | Views | Duracao | Tomadas | Mudancas/min | Cartao de legenda | Mascote na tela | Preto |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 1 | VOCE tem ate 2030, antes de se arrepender... | 1124 | 8:37 | 95 | ~44 | 0,83-0,95 s | 18% | 13% + 20% estrelas |
| 2 | Voce Esta Ignorando o Aviso do Criador da IA? | 516 | 9:28 | 105 | ~26 | 0,86 s | 44% | 57% |
| 3 | 3 MELHORES Investimentos e (3 BOMBAS) | 117 | 10:58 | 144 | ~26 | 0,95 s | ~50% | 59% |
| 4 | A Janela do Bitcoin Esta se Fechando | 82 | 11:45 | 128 | ~19 | 1,3 s | 32% + 24% mini | 59% |
| 5 | Como INVESTIR MELHOR que 90% das pessoas!! | 66 | 10:56 | 112 | ~23 | 0,45-0,75 s | 22% | 67% |
| 6 | O COE E A Maior M#rD4 | 43 | 11:16 | 106 | ~27 | 0,5 s (Remotion 4,8 s) | 31% | 41% |
| 7 | Esse deve ser o seu primeiro investimento | 29 | 8:19 | 81 | ~28 | 0,72 s | 32% | 46% |

"Mudancas/min" conta tudo que entra na tela: cartao de legenda, icone, pose, print, fundo. Os metodos de
contagem variaram um pouco entre os subagentes; compare a ordem de grandeza, nao a casa decimal.

## O que todos os videos tem (o estilo da casa)

- **Legenda cinetica Montserrat ExtraBold**, caixa alta, branca, no centro, ~2 palavras por cartao.
  E o elemento mais constante do canal.
- **Fundo preto com poeira de pelicula**, alternado com **grade em perspectiva** e **campo de estrelas**.
- **A raposa como apresentadora** (nao ha rosto em camera): sprite com poses trocadas por corte, entrada de
  baixo com desfoque, versao mini no canto.
- **Icones brancos com brilho** que entram um por item falado, com rotulo.
- **Numeros grandes condensados com brilho** e cor pelo sinal (verde ganho, vermelho perda).
- **Prints de prova inclinados em 3D** com marcacao vermelha.
- **B-roll de IA** em tela cheia ou desfocado atras do mascote.

## O que o video 1 (maior retencao) faz diferente

Hipoteses, nao causalidade comprovada (7 videos e pouco para estatistica):

1. **Densidade maior e constante:** ~44 mudancas/min contra 19-28 nos outros. Raramente fica mais de 2 s
   sem algo novo, salvo o mascote de 15,5 s em 189 s (o unico ponto fraco).
2. **Gancho que paga a thumbnail aos 18 s:** pergunta direta digitada, rajada de cartoes, objeto misterioso,
   a propria thumbnail animada, mascote com a tag do canal aos 22 s e prova aos 33 s.
3. **Mascote menos presente (18%)** e usado como respiro entre rajadas, nao como fundo para falas longas.
4. **Fundos variados no mesmo minuto** (grade, estrelas, preto, B-roll desfocado) em vez de 60% de preto.
5. **Icones como diagrama vivo:** se montam e se desmontam com a fala (23% do tempo).
6. **Capitulos com silencio** e o mesmo impacto sonoro, dando estrutura clara.

Contraste: o video 5 abre com 94 s de historia de terceiros sem marca nem mascote (raposa so em 1:34); o
video 6 (COE) tem cartoes Remotion de ~4,8 s, micro-rotulos ilegiveis e 63 s seguidos de mascote.

## Problemas que se repetem

| Problema | Videos |
|---|---|
| 7-9 familias de fonte, sem regra | todos |
| Erros de texto na tela ("COMETA AI", "MINERAÇÂO", "CALL SPRED", "TÚTULO") | 1, 2, 3, 4, 6, 7 |
| Tela preta ou vazia com narracao | todos |
| Planos parados de 15-63 s | todos |
| Marca d'agua de terceiros ou da IA (Veo) | 1, 3, 5, 7 |
| Mini-mascote trocando de canto | 4, 6 |
| Icones de estilos misturados (traco, pixel-art, 3D) | 2, 6 |
| Cor contraria ao sinal ("-R$5000" em verde) | 4 |
| Motion fora de sincronia com a fala | 6 |

## Sobre o motor Remotion atual

No video 6 o Remotion cobre 24% do tempo. E coerente e denso, mas:

- os cartoes ficam ~4,8 s, bem acima do ritmo do resto do canal (0,5-1 s);
- os micro-rotulos de 14 px ficam ilegiveis no celular;
- o mascote nunca entra na composicao, entao as cenas parecem de outro video;
- a tipografia (Archivo Black, Space Grotesk, pills laranja) nao conversa com a legenda Montserrat do editor.

A skill `ofurry-house-motion` corrige isso: mesmas fontes do editor, ritmo do canal, mascote como batida e
lint de densidade.
