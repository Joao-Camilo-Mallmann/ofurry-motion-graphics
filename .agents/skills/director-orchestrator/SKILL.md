---
name: director-orchestrator
description: Directs and orchestrates incremental editorial motion design productions for OFurry by transforming script sections into cinematic shot proposals using motion-design and video-shotcraft, enforcing anti-AI/anti-SaaS aesthetics on native alpha with zero premature code.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "2.0.0"
---

# 🎬 Diretor Orquestrador Skill (Trechos Incrementais + Motion Design + Video Shotcraft)

Skill oficial de **Direção Criativa e Curadoria Editorial Cinematográfica** para produção de mini-vídeos em Motion Design com canal Alpha transparente para o canal do YouTube **OFurry**.

---

> [!IMPORTANT]
> **Estilo da casa primeiro.** Antes de propor qualquer plano, leia `.agents/skills/ofurry-house-motion/SKILL.md`.
> Ela descreve o visual que o canal de fato publica (medido nos 7 videos) e vence qualquer regra desta skill
> que entre em conflito (tipografia, tamanho de legenda, uso do mascote, cores). O checkpoint em prosa
> continua obrigatorio; a implementacao passa a ser uma folha de batidas do kit `src/house/`.

## 1. PAPEL DA SKILL

A `director-orchestrator` **NÃO** deve ser uma geradora antecipada de código.

Ela atua prioritariamente como **DIRETOR CRIATIVO / EDITORIAL**.

Sua responsabilidade é analisar o roteiro e transformar cada trecho da narrativa em uma proposta visual cinematográfica e visceral.

> [!CAUTION]
> **PROIBIDO retornar código Remotion / TSX como output principal da skill.**
> O código Remotion só deve existir posteriormente, **depois** que a direção visual for apresentada no Checkpoint Editorial e aprovada pelo usuário.

A resposta principal da skill deve apresentar exclusivamente o **Plano Visual Editorial**:
- Trecho exato da locução
- Ideia central da mensagem
- Metáfora visual física
- Shot cinematográfico
- Câmera e profundidade 2.5D
- Comportamento de Motion e física de springs
- Composição e hierarquia
- Tipografia monumental e métricas
- Continuidade sequencial
- Sound Design (SFX cues)
- Curva de energia
- Lista de elementos proibidos (Anti-UI)

---

## 2. MOTORES VISUAIS OBRIGATÓRIOS

Para criar as propostas visuais, utilize obrigatoriamente a combinação de três skills essenciais:

1. **`motion-design`** (Física e Comportamento Editorial)
2. **`video-shotcraft`** (Cinematografia e Linguagem de Câmera)
3. **`icon-craft`** (Metáforas Físicas, Ícones & Simbolismo de Mercado)

### Divisão de Responsabilidades:

| Motor | Responsabilidade | Ferramental |
|---|---|---|
| **`motion-design`** | Física, dinâmica e autoridade tipográfica | • Damped springs (`snappy`, `smooth`)<br>• Overshoot e settle calibrados<br>• Escala monumental (130-160px texto, 200-240px números)<br>• 3 camadas de movimento (Primary Hero, Secondary Highlight, Ambient Alpha)<br>• Timing de retenção (0-15f snap, 15-final hold com micro-drift) |
| **`video-shotcraft`** | Câmera, espaço e cinematografia | • Câmera 2.5D (tilt, perspective 1000px, parallax drift)<br>• Enquadramentos dinâmicos (push-in, crash zoom, orbit, whip-pan)<br>• Catálogo de 157 shot recipe cards (`references/shots/`)<br>• Ritmo, cadência e cortes motivados por ação<br>• Sound Design com SFX pontuais (`assets/audio/sfx/`) |
| **`icon-craft`** | Metáforas físicas tangíveis e símbolos | • Catálogo de 55 ícones físicos (`public/icons/`)<br>• Alto contraste no canal Alpha via `<AssetIcon />`<br>• Inversão de pretos para branco (`variant="white"`), neon orange (`variant="orange"`), nativo (`variant="original"`)<br>• 1 ícone monumental dominante (140-300px) ou âncora travada à métrica |

A `director-orchestrator` funde esses três motores:
> **A pergunta principal da skill nunca é:** *"Qual layout devo colocar?"*
> **A pergunta principal é sempre:** *"Qual plano cinematográfico e metáfora física melhor comunicam esta frase?"*

---

## 3. ANTI-AI / ANTI-SaaS VISUAL DIRECTIVE

A identidade visual do canal OFurry deve permanecer brutalista, editorial e cinematográfica.
**NÃO transforme as cenas em interfaces de software.**

### 🚫 PROIBIDO como composição padrão:
- Cards cinzas (`rgba(20,20,20,...)`) ou brancos
- Chips, pills e badges arredondados flutuantes
- Painéis de dashboards e métricas agrupadas em caixinhas
- Grids de informação estilo template de SaaS
- Múltiplos containers e caixas informativas
- Excesso de labels, subtítulos explicativos e legendas redundantes
- UI fictícia de aplicativo ou web
- Tabelas estilizadas
- Excesso de bordas, divisórias e contornos decorativos
- Tags sci-fi clichês ("SYS.SCAN", "DATA.LOG // 01")
- **LAYOUT MONÓTONO EM COLUNA VERTICAL REPETIDA**: Proibido montar todas as cenas com a mesma receita "tag no topo → ícone no meio → título → tarja laranja no rodapé". Isso gera sensação de template genérico sem dinamismo.

### 🎨 ARQUÉTIPOS VISUAIS OFICIAIS DO OFURRY (Baseados em `docs/RefFurry/`):

Cada cena deve obrigatoriamente adotar um dos 4 arquétipos e **VARIAR ENTRE CENAS CONSECUTIVAS**:

1. **Arquétipo A: Ficha Técnica Neon / Blueprint (`ref1.png`)**:
   - Ícone outline em neon elétrico vibrante (`variant="green"` `#00FF00` ou `variant="orange"` `#FF9900`).
   - Título do ativo em caixa alta diretamente abaixo do ícone (ex: `CDB`, `COE`, `LCI`).
   - Lista limpa de specs em tipografia branca sólida com sinal de igual (`=`), sem caixas ou cards:
     ```text
     Taxa = 100% CDI
     Prazo = 5 anos
     Condições = Liquidez diária
     ```
2. **Arquétipo B: Layered Text Stash / Intersect (`ref2.png`)**:
   - Métrica ou palavra monumental com preenchimento preto e traço neon espesso de assinatura:
     `-webkit-text-stroke: 4px #FF9900; color: #000000; font-family: 'Archivo Black';`
   - O ícone físico (dinheiro, barras de ouro, alarme) fica posicionado **atrás ou intercalado** entre as letras (`zIndex: 0` sob o texto com `zIndex: 1`), espiando com profundidade 2.5D.
3. **Arquétipo C: Crash Zoom / Word Slam**:
   - Câmera frontal em crash zoom violento (45 graus), escala monumental extrema (ocupando 85%–90% da largura útil).
   - Palavra visceral única (`CUSTA CARO`, `PRESO`, `NÃO É GRÁTIS`), colisão mecânica e silêncio tenso.
4. **Arquétipo D: Split de Tensão / Assimetria (50/50 ou 70/30)**:
   - Divisão espacial que confronta dois polos (Promessa vs Realidade, Mercado Livre vs Teto Artificial, Entrada vs Deságio).

> [!IMPORTANT]
> **REGRA DA NÃO-REPETIÇÃO ESTRUTURAL:**
> Duas cenas consecutivas NUNCA podem ter o mesmo arquétipo de composição. Se a Cena 1 for um *Layered Text Stash*, a Cena 2 deve ser uma *Ficha Técnica Neon* ou um *Crash Word Slam*.

---

## 4. TRECHOS INCREMENTAIS

O projeto não deve ser tratado como um bloco único ou vídeo monolítico que precisa ser conhecido por inteiro para ser produzido. O vídeo é construído de forma **incremental e modular**:

```text
videos/<video-name>/
│
├── roteiro.md                 ← ÚNICA FONTE PERSISTENTE DE CONTEXTO
│
└── output/
    │
    ├── trecho-01/
    │   ├── concept.md         ← Direção editorial aprovada (Sem código)
    │   ├── scenes/            ← Código Remotion das cenas (01-*.tsx, index.ts)
    │   └── render/            ← Arquivos renderizados (.webm, .mov, full.webm)
    │
    ├── trecho-02/
    │   ├── concept.md
    │   ├── scenes/
    │   └── render/
    │
    ├── trecho-03/
    │   └── ...
    │
    └── trecho-XX/
        └── ...
```

- Cada execução da skill foca em **um novo trecho independente**.
- **Nunca sobrescrever** um trecho existente.
- **Nunca modificar automaticamente** um trecho anterior.

---

## 5. ROTEIRO COMO ÚNICA FONTE DE CONTEXTO

O arquivo `roteiro.md` é a **única fonte persistente de contexto narrativo** entre as execuções da skill.

1. A skill lê `roteiro.md` a cada invocação.
2. Identifica qual trecho da narração ainda não foi produzido (verificando as pastas existentes em `output/`).
3. **NÃO consome o contexto criativo ou o código dos trechos anteriores.**

> [!TIP]
> **Sem Bola de Neve de Contexto:**
> A skill NÃO deve abrir os arquivos `.tsx` do `trecho-01` para produzir o `trecho-02`. Ela não herda layouts como templates nem precisa de imports dos trechos anteriores. A continuidade narrativa deve ser derivada exclusivamente do texto do roteiro e da posição do trecho dentro da história.

---

## 6. CONTINUIDADE SEM DEPENDÊNCIA

Os trechos são tecnicamente e computacionalmente isolados, mas devem possuir **continuidade audiovisual perceptível**:

- **Continuidade de Vetores de Movimento**:
  - Se o `trecho-01` encerra com um elemento sendo arremessado para a direita, o `trecho-02` pode iniciar com a câmera recebendo esse impulso da esquerda.
  - Se o `trecho-02` termina com uma expansão colidindo com a tela, o `trecho-03` pode iniciar aproveitando essa expansão como revelação.
- **Continuidade Dramática e de Conflito**:
  - Cada trecho responde ao conflito anterior (Premissa $\to$ Revelação da Taxa $\to$ Colisão no Teto $\to$ Impacto no Bolso).
- **Sem Dependência de Código**:
  - A conexão é puramente conceitual e descrita no plano visual, sem requerer que o arquivo de código anterior seja importado ou conhecido.

---

## 7. ESTRUTURA INTERNA DE CADA TRECHO

Cada pasta de trecho gerada deve conter estritamente:

```text
output/trecho-XX/
├── concept.md     # Plano visual editorial detalhado e aprovado
├── scenes/        # Implementação Remotion das cenas (01-*.tsx, 02-*.tsx, index.ts)
└── render/        # Arquivos de saída renderizados (.webm, .mov, full.webm)
```

- `concept.md`: Registro permanente da direção de fotografia, enquadramentos, tipografia e sound design.
- `scenes/`: Código modular Remotion com Alpha nativo.
- `render/`: Destino dos renders. Permite apagar e recriar renders a qualquer momento sem perder a direção criativa.

---

## 8. CHECKPOINT EDITORIAL (PADRÃO OBRIGATÓRIO)

Antes de gerar qualquer linha de código TSX, apresente a proposta visual no formato scan-friendly:

```markdown
### 🎬 TRECHO [XX]: [Nome do Trecho / Bloco]

#### Locução
"[Trecho exato da narração extraído de roteiro.md]"

#### Ideia
[O que o espectador deve entender visceralmente em 1 frase direta]

#### Metáfora Visual
[Como a ideia é representada fisicamente na tela — ex: um fluxo de dinheiro sofrendo desvio mecânico lateral]

#### Ícone Editorial (Icon Craft)
- Ícone: `[nome-do-icone | nenhum]` (ex: `bank`, `thief`, `chart-lose`, `wallet`, `warning`, `crash-arrow`)
- Modo de Cor: `[green (#00FF00) | orange (#FF9900) | white (invert) | original | custom]`
- Escala & Papel: `[Hero Monumental (200px) | Âncora da Métrica | Carimbo de Alerta | Text Stash]`

#### Arquétipo Visual OFurry (docs/RefFurry/)
- Arquétipo: `[Ficha Técnica Neon (ref1.png) | Layered Text Stash (ref2.png) | Crash Word Slam | Split Tensão]` *(Obrigatório: DIFERENTE da cena anterior)*

#### Shot
[Descrição cinematográfica do enquadramento — ex: Plano médio com câmera 2.5D e deslocamento horizontal]

#### Câmera & Preset Shotcraft (Video Shotcraft)
- Preset Shotcraft: `[ID exato de um dos 31 presets da V1 — ex: cel-flash-stomp | basic-3d-scene | title-demote-to-label | pop-burst-confirm | bottom-push-stack-wipe]`
- Movimento de Câmera: [Receita do Shotcraft: push-in, crash-zoom, tilt 2.5D, parallax drift, orbit sutil]
- Preview em Vídeo: `public/presets/videos/[preset-id].mp4` (para validação visual)

#### Motion (Motion Design)
[Física de damped spring, timing 0-15f punch, 15-final hold com micro-drift, zero wobble senoidal]

#### Composição
[Disposição no frame: 1 elemento dominante, assimetria, 80% espaço negativo sobre Alpha nativo. Zero cards.]

#### Tipografia
- Hero: `[1 a 3 PALAVRAS EM CAIXA ALTA]` (130px–160px em Archivo Black / Bebas Neue)
- Métrica: `[NÚMERO OU PERCENTUAL]` (200px–240px em Space Grotesk)
- Destaque: Tarja sólida neon `#FF9900` com texto preto `#000000`

#### Continuidade
[Como este trecho termina e prepara o vetor de movimento para o próximo trecho do roteiro]

#### Sound Design (SFX Cues)
[Quem entra e quando: whoosh inicial → silêncio de tensão → impact mecânico no lock do número]

#### Energia
[Barra de intensidade do trecho: ████████░░ (8/10)]

#### Elementos Proibidos
[Lista explícita de armadilhas evitadas: sem cards cinzas, sem containers, sem dashboards, sem mini-labels]
```

> [!IMPORTANT]
> **Aguarde a validação do usuário antes de criar os arquivos `.tsx` ou executar renderizações.**

---

## 8.1. CATÁLOGO OFICIAL DOS 31 PRESETS DO VIDEO-SHOTCRAFT (V1)

O Diretor Orquestrador deve selecionar obrigatoriamente um destes **31 presets cinematográficos pré-implementados e auditados** para nortear a cinematografia e o código de cada tomada em `concept.md` e em `scenes/`:

| Preset ID | Categoria | Arquétipo OFurry | Papel Narrativo & Metáfora | Preview em Vídeo |
|---|---|---|---|---|
| `basic-3d-scene` | Câmera | A (Blueprint) | Voo de câmera 2.5D conectando premissas de contrato no espaço vazio | `public/presets/videos/basic-3d-scene.mp4` |
| `cursor-flyover` | Câmera | A (Blueprint) | Câmera 2.5D rasante com cursor neon inspecionando pontos de taxa/contrato | `public/presets/videos/cursor-flyover.mp4` |
| `blur-slide` | Tipografia | C (Crash Slam) | Revelação suave com blur progressivo e subida de 1 a 3 palavras massivas | `public/presets/videos/blur-slide.mp4` |
| `brace-expand` | Tipografia | C (Crash Slam) | Chaves `{}` monumentais se abrem em cortina revelando o termo central | `public/presets/videos/brace-expand.mp4` |
| `cel-flash-stomp` | Tipografia | C (Crash Slam) | Três palavras de soco carimbadas com flashes neon de alto contraste | `public/presets/videos/cel-flash-stomp.mp4` |
| `countdown-arc-scatter` | Tipografia | B (Layered) | Varredura de números em arco que freia bruscamente no número hero | `public/presets/videos/countdown-arc-scatter.mp4` |
| `glitch-cycle` | Tipografia | C (Crash Slam) | Ciclo rápido de glitches denunciando distorção de mercado até cravar a verdade | `public/presets/videos/glitch-cycle.mp4` |
| `paper-title-card` | Tipografia | A (Blueprint) | Cartão com carimbo letterpress editorial e grifo neon sólido | `public/presets/videos/paper-title-card.mp4` |
| `text-as-mask` | Tipografia | C (Crash Slam) | Tipografia massiva recortada como máscara com zoom 2.5D atravessando a letra | `public/presets/videos/text-as-mask.mp4` |
| `title-demote-to-label` | Tipografia | B (Layered) | Título massivo encolhe e vira micro-tag enquanto o número 240px emerge | `public/presets/videos/title-demote-to-label.mp4` |
| `split-text-stagger` | Tipografia | C (Crash Slam) | Mask reveal da baseline por caractere individual saindo do chão | `public/presets/videos/split-text-stagger.mp4` |
| `scramble-decode` | Tipografia | A (Blueprint) | Decodificador alfanumérico rápido travando caractere por caractere com flash | `public/presets/videos/scramble-decode.mp4` |
| `word-relay-filmstrip` | Tipografia | D (Split Tensão) | Split 50/50 com sujeito estático e carretel vertical de verbos de impacto | `public/presets/videos/word-relay-filmstrip.mp4` |
| `counter-confetti` | Métricas | B (Layered) | Contador de alta velocidade que dispara choque e faíscas neon no lock-in | `public/presets/videos/counter-confetti.mp4` |
| `ring-diagram-annotation-reveal` | Métricas | A (Blueprint) | Anéis concêntricos SVG de partição de capital deslizando e abrindo anotações | `public/presets/videos/ring-diagram-annotation-reveal.mp4` |
| `timeline-travel` | Métricas | A (Blueprint) | Câmera horizontal percorrendo anos de contrato com freadas em marcos críticos | `public/presets/videos/timeline-travel.mp4` |
| `value-stagger-gradient` | Métricas | B (Layered) | Cascata de barras em gradiente demonstrando erosão e degradação de retorno | `public/presets/videos/value-stagger-gradient.mp4` |
| `beat-step-list-theme-cycle` | Efeitos | D (Split Tensão) | Avanço vertical ritmado no beat com captura em tarja neon sólida e squash pop | `public/presets/videos/beat-step-list-theme-cycle.mp4` |
| `bezier-source-converge-merge` | Efeitos | A (Blueprint) | Fontes de capital convergem por curvas neon num único ralo financeiro | `public/presets/videos/bezier-source-converge-merge.mp4` |
| `panel-to-canvas` | Efeitos | B (Layered) | Linha de contrato se desprende e materializa um bloco de alerta físico 2.5D | `public/presets/videos/panel-to-canvas.mp4` |
| `card-stack` | Efeitos | B (Layered) | Pilha de opções de ativos pop in e se abrem em leque 3D com destaque no COE | `public/presets/videos/card-stack.mp4` |
| `pop-burst-confirm` | Efeitos | B (Layered) | Ícone monumental sofre compressão física e estoura com anel de choque e partículas | `public/presets/videos/pop-burst-confirm.mp4` |
| `list-reveal` | Efeitos | A (Blueprint) | Ficha técnica Blueprint com linhas surgindo em scale outBack e micro-drift contínuo | `public/presets/videos/list-reveal.mp4` |
| `product-card-progressive-assemble` | Efeitos | A (Blueprint) | Ficha de produto com redaction de ganho prometido e revelação do ganho real | `public/presets/videos/product-card-progressive-assemble.mp4` |
| `radial-ripple-phone-chips` | Efeitos | B (Layered) | Ondas acústicas neon concêntricas disparando tags de alerta lateral | `public/presets/videos/radial-ripple-phone-chips.mp4` |
| `research-card-stack-scroll` | Efeitos | A (Blueprint) | Pilha descendente de provas forenses empilhadas com profundidade de campo | `public/presets/videos/research-card-stack-scroll.mp4` |
| `segmented-thumb-hero` | Efeitos | D (Split Tensão) | Seletor monumental alternando de Promessa para Realidade com estalo neon | `public/presets/videos/segmented-thumb-hero.mp4` |
| `skeleton-reveal` | Efeitos | A (Blueprint) | Ossatura técnica em linhas tracejadas que se cristaliza em evidência neon sólida | `public/presets/videos/skeleton-reveal.mp4` |
| `svg-shape-morph` | Efeitos | B (Layered) | Metamorfose orgânica contínua de contorno neon ilustrando a transmutação do risco | `public/presets/videos/svg-shape-morph.mp4` |
| `icon-flip-bloom` | Efeitos | B (Layered) | Ícone gira em 3D no eixo Y, atinge a lâmina zero e desabrocha no logo OFURRY com bloom | `public/presets/videos/icon-flip-bloom.mp4` |
| `bottom-push-stack-wipe` | Transição | Transição | Nova cena empurra fisicamente a anterior de baixo para cima como cremalheira mecânica | `public/presets/videos/bottom-push-stack-wipe.mp4` |

> [!TIP]
> **Como Implementar uma Tomada a partir do Preset:**
> Quando o usuário aprovar o Checkpoint Editorial, a implementação em `scenes/0X-nome.tsx` pode instanciar diretamente o preset de `src/presets` (ex: `<CelFlashStompPreset words={[...]} />` ou `<TitleDemoteToLabelPreset hookTitle="..." heroMetric="..." />`) ou customizá-lo mantendo seus parâmetros de câmera e física.

---

## 9. DIAGRAMA OPERACIONAL

O fluxo de pensamento e produção segue a linha contínua:

```
ROTEIRO (roteiro.md)
  │
  ▼
IDEIA & TENSÃO NARRATIVA
  │
  ▼
METÁFORA FÍSICA
  │
  ▼
SHOT CINEMATOGRÁFICO
  │
  ├─► MOTION DESIGN (Física, Tipografia Monumental, Damped Springs)
  │
  └─► VIDEO SHOTCRAFT (Câmera 2.5D, Parallax, Ritmo, SFX Cues)
  │
  ▼
CONTINUIDADE SEQUENCIAL
  │
  ▼
CHECKPOINT EDITORIAL EM PROSA (Sem código preliminar)
  │
  ▼
APROVAÇÃO DO USUÁRIO
  │
  ▼
IMPLEMENTAÇÃO REMOTION (output/trecho-XX/scenes/)
  │
  ▼
RENDER TRANSPARENTE ALPHA (output/trecho-XX/render/)
```

---

## 10. REGRAS DE ESCALA E ESPAÇO

- **Tipografia Principal**: `130px a 160px` (ocupa 70%–90% da largura útil).
- **Números e Métricas Hero**: `200px a 240px`.
- **Micro-Tags Técnicas**: Máximo 1 tag de alta precisão (14px) rigidamente amarrada ao número hero.
- **Espaço Vazio Dramático**: Não tente preencher os cantos da tela. O espaço negativo comanda a atenção para a sobreposição de vídeo.

---

## 11. COMANDOS DE EXECUÇÃO RÁPIDA

- **Remotion Studio**: `bun run studio`
- **Renderizar Trecho Específico em WebM**:
  `bun run render:trecho <video-id> <numero-trecho>`
  *(Exemplo: `bun run render:trecho coe 01` salva automaticamente em `videos/coe/output/trecho-01/render/`)*
- **Renderizar Trecho em ProRes 4444**:
  `bun run render:trecho <video-id> <numero-trecho> --format=prores`
- **Renderizar Todas as Cenas de um Vídeo**:
  `bun run render:video <video-id> --format=webm`
- **Verificar Tipos TypeScript**: `bun run build`
