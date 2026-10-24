# OFurry Motion Engine - Agent Guidelines

## 🎬 Project Mission
This project (`ofurry-motion`) is a programmatic Editorial Motion Design engine for the **OFurry** YouTube channel, built with **Remotion**, **React**, **TypeScript**, and **Bun**. It generates transparent Alpha Channel mini-videos (ProRes 4444 and WebM) to be overlaid on real video footage in Premiere Pro, DaVinci Resolve, or CapCut.

---

## ⚡ Mandatory Directives for AI Agents

### 0. Producao em duas skills + estilo da casa
- **Organizar o video** (`.agents/skills/ofurry-organizar-video/SKILL.md`): pasta do video, transcricao com tempo por palavra, corte em trechos, `plano.md` em prosa para aprovacao. Comandos `bun run video:novo | video:transcrever | video:buscar | video:cortar | video:status`.
- **Fazer as cenas** (`.agents/skills/ofurry-fazer-cenas/SKILL.md`): so com `plano.md` APROVADO. Escreve `beats.json`, `bun run hf:build <video> <XX>` gera o projeto **HyperFrames** (HTML + GSAP, motor padrao para videos novos), `bun run hf:render <video> <XX>` entrega MP4 preto + MOV transparente. Skills oficiais do HyperFrames em `.agents/skills/hyperframes*` (contrato de render).

### 0.1 Estilo da casa primeiro (`ofurry-house-motion`)
- **Fonte de verdade do visual do canal**: `.agents/skills/ofurry-house-motion/SKILL.md`, medida nos 7 videos publicados (`docs/referencias/analise-canal-2026-10.md`).
- **Em conflito, ela vence**: tipografia Montserrat + Bebas Neue (nao Archivo/Space Grotesk), legenda de 84 px com 1-2 palavras (nao 130-160 px), mascote como batida, cores por significado (verde ganho, vermelho perda, amarelo destaque, laranja marca).
- **Fluxo**: narracao -> `ofurry-organizar-video` (trechos + plano aprovado) -> `ofurry-fazer-cenas` (beats.json -> HyperFrames -> MP4 + MOV alpha). O kit Remotion `src/house/` le o mesmo beats e fica para os trechos antigos.
- **Icones**: Lucide (estatico) e Lucide Animated deterministico (`src/lucide-animated/`, `<AnimatedLucide>`).

### 1. Act as the Diretor Orquestrador (`/director-orchestrator`)
Whenever processing script narration or building motion scenes:
- **Creative Director First, Never a Code Dumper**: PROIBIDO retornar código Remotion/TSX como output principal da skill. A resposta primária deve ser exclusivamente o **Plano Visual Editorial / Checkpoint** estruturado em prosa. O código só existe após a aprovação humana.
- **Incremental & Independent Trechos (`output/trecho-XX/`)**: O projeto nunca é tratado como um monólito. O vídeo é construído trecho a trecho de forma incremental. Cada execução cria um novo trecho isolado.
- **Roteiro Como Única Fonte Persistente de Contexto**: A skill lê `videos/<video>/roteiro.md` para identificar o próximo trecho a ser produzido. **NÃO consome o código ou implementações dos trechos anteriores.** Continuidade narrativa e vetorial sem dependência de código.
- **Granularidade Cinematográfica**: Cada trecho é composto por tomadas de 3s a 5s (90-150 frames) que formam uma corrente audiovisual contínua com a locução.

### 2. Legado Remotion: `/motion-design` + presets de câmera + `icon-craft`
Para os trechos antigos em Remotion (COE trecho-01 a 04). Em videos novos, o estilo da casa (seção 0.1) vence.
- **`motion-design` (Física & Comportamento)**: Damped springs (`snappy`, `smooth`), timing 0-15f punch / 15-final hold com micro-drift, 3 camadas de movimento, tipografia monumental (130px-160px) e métricas (200px-240px).
- **Presets de câmera (`src/presets/`, ver `docs/presets/shotcraft-v1.md`)**: Câmera 2.5D (tilt, perspective 1000px, parallax drift), enquadramentos dinâmicos (push-in, crash zoom, orbit, whip). Vieram da skill `video-shotcraft`, removida do projeto em 2026-10 (reinstalável com `npx skills add Vincentwei1021/video-shotcraft`).
  - **Catálogo de 31 Presets V1 (`src/presets/`)**: Usar os 31 presets auditados (`basic-3d-scene`, `cel-flash-stomp`, `countdown-arc-scatter`, `title-demote-to-label`, etc.) com preview em vídeo em `public/presets/videos/[preset-id].mp4` e composições isoladas `Preset-[XX]-[id]` no Studio.
- **`icon-craft` (Metáforas Físicas & Ícones)**: Catálogo de 55 ícones físicos (`public/icons/`). Renderização com alto contraste sobre canal Alpha via `<AssetIcon />`: inversão de pretos para branco puro (`variant="white"`), colorização neon `#FF9900` (`variant="orange"`), ou cores nativas (`variant="original"`). Proibido ícones como mini-badges ou em cards SaaS; sempre como 1 metáfora dominante (140px-300px) ou âncora rígida.
- **Core Question**: *"Qual plano cinematográfico e metáfora física melhor comunicam esta frase?"* (e não *"Qual layout colocar?"*).

### 3. Always Incorporate `/no-ai-slop` & Anti-SaaS Visual Directive
- **Zero Cards / Zero Dashboards**: Proibido cards cinzas, chips, pills, badges, painéis de dashboard, grids de informação, UI fictícia, excesso de labels e divisórias.
- **1 Objeto Dominante & Espaço Vazio Dramático**: Letras monumentais flutuando no canal Alpha real, alto contraste neon `#FF9900` com texto `#000000`.
- **Golden Rule**: *"Se uma cena puder ser resolvida com um elemento grande se movendo bem, não introduza três elementos pequenos."*
- **Concrete Over Abstract**: Cortar rodeios ("O que ninguém te conta"). Extrair 1 a 3 palavras-chave viscerais por cena ("TAXA 2.5%", "85% PRESO").

### 4. Incremental Workspace Organization (`videos/<video>/`)
Every video project is structured incrementally:
```text
videos/<video-name>/
  ├── roteiro.md                 # Full script narration (Única fonte persistente de contexto)
  └── output/
      ├── trecho-01/
      │   ├── concept.md         # Direção editorial aprovada (Sem código)
      │   ├── scenes/            # Implementação Remotion modular (01-*.tsx, index.ts)
      │   └── render/            # Arquivos renderizados (.webm, .mov, full.webm)
      ├── trecho-02/
      │   ├── concept.md
      │   ├── scenes/
      │   └── render/
      └── trecho-XX/
          └── ...
```

---

## 🏆 The 10 Golden Rules of the OFurry Engine

1. **Strategic Punch Text (1-3 Words & Zero Faux-Web Clutter)**: Never display full sentences, paragraphs, or dense tickers. Maximum 1 micro-tag (14px) tied to the hero metric. Pure visual authority.
2. **Monumental Scale**: Hero titles occupy 70%-90% screen width (130px-160px). Numbers reach 200px-240px.
3. **Typography by Role**:
   - `archivo` (`Archivo Black`) or `bebas` (`Bebas Neue`): Hero hook titles.
   - `syne` (`Syne`): Conceptual modern editorial titles.
   - `space-grotesk` (`Space Grotesk`): Metrics, numbers, currencies, technical data.
   - `jakarta` (`Plus Jakarta Sans`): Micro-labels de alta precisão (14px).
4. **Anti-"AI Slop" / Zero Cards**: High contrast solid black (#000000), solid neon orange blocks (#FF9900) with pure black text (#000000), zero grey background cards (`rgba(20,20,20,...)`), zero container boxes, zero generic blur clouds, zero default grids.
5. **Native Alpha Channel**: Transparent background output in ProRes 4444 (`.mov`) or WebM.
6. **Cinematography & 2.5D Camera**: Use camera moves dos presets em `src/presets/` (push-in, crash-zoom, subtle 2.5D tilt/orbit, parallax drift). Proibido rotação senoidal amadora (`amplitudeRotate: 0`).
7. **Impact & Full-Timeline Fluidity (Anti-Freeze)**:
   - **Entrada (0-15 frames):** Mask Reveal da linha de base (`overflow: hidden`) ou snap seco com spring firme.
   - **Fluidez Contínua (15-final):** Movimento orgânico contínuo (pulsação suave, ondas de luz/gradiente e micro-flutuação visível), sem estagnação.
8. **Anchored Composition (Zero Orphans)**: Every secondary element must declare `anchorTo` and `compositionBridge` tied to the dominant anchor element.
9. **Continuidade Audiovisual Sem Dependência de Código**: O fim do trecho $N$ motiva a entrada do trecho $N+1$ por vetor de movimento e tensão dramática, descritos conceitualmente no plano visual.
10. **Sound Design Cirúrgico**: Toda ação física relevante é pontuada por SFX (`impact`, `whoosh`, `riser`, `silence`).

---

## 🔄 Incremental Production Workflow

1. **Leitura do Roteiro**: Inspecionar `videos/<video>/roteiro.md` e identificar o próximo trecho a ser produzido.
2. **Concepção Cinematográfica**: Fundir `ofurry-house-motion` + `motion-design` + presets de câmera (`src/presets/`) + `no-ai-slop`.
3. **Checkpoint Editorial em Prosa**: Apresentar ao usuário o plano cinematográfico detalhado (Locução, Ideia, Metáfora, Shot, Câmera, Motion, Composição, Tipografia, Continuidade, SFX, Energia, Elementos Proibidos). **NÃO gerar código.**
4. **Geração Modular Pós-Aprovação**: Criar `output/trecho-XX/concept.md` e os arquivos Remotion em `output/trecho-XX/scenes/`.
5. **Alpha Render**: Renderizar as cenas em `output/trecho-XX/render/` via `bun run render:trecho <video> <XX> --format=webm|prores`.

---

## 🚀 Quick Execution Commands

- **Launch Remotion Studio**: `bun run studio` (Opens at `http://localhost:3000`)
- **Render Trecho Específico (WebM Alpha)**: `bun run render:trecho <video-id> <numero-trecho>`
- **Render Trecho Específico (ProRes 4444 Alpha)**: `bun run render:trecho <video-id> <numero-trecho> --format=prores`
- **Render Video Scenes (WebM Alpha)**: `bun run render:video <video-id> --format=webm`
- **Render Video Scenes (ProRes 4444 Alpha)**: `bun run render:video <video-id> --format=prores`
- **Check TypeScript Types**: `bun run build`
- **Lint da folha de batidas (estilo da casa)**: `bun run house:lint [id]`
- **Render de uma folha (preto / alpha)**: `bun run render:house <id> out/<id>.mp4` e `bun run render:house <id>-Alpha out/<id>.mov --codec=prores --prores-profile=4444 --pixel-format=yuva444p10le --image-format=png`
- **Atualizar icones animados**: `bun run sync:lucide-animated`
- **Analisar um video de referencia**: `bun run reference:extract <pasta-com-video.mp4>`
