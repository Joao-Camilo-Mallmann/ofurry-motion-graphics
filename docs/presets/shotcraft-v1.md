# OFurry Engine — Catálogo de Presets Video-Shotcraft (V1)

Este guia documenta a integração de **31 presets cinematográficos** selecionados do repositório `video-shotcraft`, reconstruídos para o motor editorial **OFurry Motion** com:
- **Transparência Alpha Nativa** (`transparent?: boolean`): Prontos para sobreposição em ProRes 4444 ou WebM em Premiere, DaVinci e CapCut.
- **Identidade Visual Anti-AI Slop**: Preto puro (`#000000`), neon contundente (`#FF9900`), tipografia monumental (`Archivo Black`, `Bebas Neue`, `Space Grotesk`) e zero cards cinzas SaaS.
- **Vídeos de Referência Locais**: 31 arquivos MP4 salvos em `public/presets/videos/` para inspeção visual imediata pelo Diretor Orquestrador.
- **Composições no Remotion Studio**: Visualize todos os presets em sequência via `Shotcraft-V1-Showcase` ou individualmente via `Preset-[XX]-[preset-id]` rodando `bun run studio`.

---

## 🧭 Sumário das Categorias

| Categoria | Quantidade | Foco Editorial |
|---|---|---|
| **1. Câmera 2.5D** | 2 Presets | Profundidade espacial, planos aéreos e sobrevoos táticos |
| **2. Tipografia Cinética** | 11 Presets | Ganchos monumentais, desconstrução de texto e flash editorial |
| **3. Dados & Métricas** | 4 Presets | Números de autoridade, gráficos e linhas temporais de impacto |
| **4. Efeitos & Metáforas** | 13 Presets | Revelação de contratos, armadilhas, carimbos e pilhas de documentos |
| **5. Transição** | 1 Preset | Varreduras físicas de cena motivadas por impacto |

---

## 📹 1. Câmera 2.5D

### `basic-3d-scene`
- **ID:** `basic-3d-scene`
- **Duração:** 120 frames (4.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/basic-3d-scene.mp4`
- **Conceito:** Câmera tridimensional navegando em perspectiva dramática conectando pontos contratuais no espaço Alpha.
- **Uso:**
```tsx
import { Basic3DScenePreset } from '@/presets';

<Basic3DScenePreset 
  title="CONTRATO COE"
  subtitle="5 ANOS TRAVADO"
  transparent={true}
/>
```

### `cursor-flyover`
- **ID:** `cursor-flyover`
- **Duração:** 120 frames (4.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/cursor-flyover.mp4`
- **Conceito:** Câmera 2.5D rasante com cursor neon inspecionando e clicando em cláusulas de taxa ou pegadinhas financeiras.
- **Uso:**
```tsx
import { CursorFlyoverPreset } from '@/presets';

<CursorFlyoverPreset 
  targetLabel="TAXA DE ADMINISTRAÇÃO: 2.5%"
  transparent={true}
/>
```

---

## 🔤 2. Tipografia Cinética

### `blur-slide`
- **ID:** `blur-slide`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/blur-slide.mp4`
- **Conceito:** Texto monumental que entra em alta velocidade com desfoque de movimento ótico e trava em snap seco.

### `brace-expand`
- **ID:** `brace-expand`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/brace-expand.mp4`
- **Conceito:** Chaves monumentais em neon que se expandem lateralmente revelando o termo de soco no centro.

### `cel-flash-stomp`
- **ID:** `cel-flash-stomp`
- **Duração:** 75 frames (2.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/cel-flash-stomp.mp4`
- **Conceito:** Flash brutal de cor invertida com colisão monumental no frame (stomp seco). Ideal para choque imediato.

### `countdown-arc-scatter`
- **ID:** `countdown-arc-scatter`
- **Duração:** 120 frames (4.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/countdown-arc-scatter.mp4`
- **Conceito:** Contagem regressiva dramática com arco neon de dispersão geométrica.

### `glitch-cycle`
- **ID:** `glitch-cycle`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/glitch-cycle.mp4`
- **Conceito:** Deslocamento cromático e fatiamento analógico de texto para denúncia de armadilhas e fraudes.

### `paper-title-card`
- **ID:** `paper-title-card`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/paper-title-card.mp4`
- **Conceito:** Título técnico diagramado como lâmina documental editorial com selo e tarja neon.

### `text-as-mask`
- **ID:** `text-as-mask`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/text-as-mask.mp4`
- **Conceito:** Tipografia massiva recortada servindo de máscara para revelação do conteúdo interno.

### `title-demote-to-label`
- **ID:** `title-demote-to-label`
- **Duração:** 105 frames (3.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/title-demote-to-label.mp4`
- **Conceito:** O título monumental inicial sofre contração espacial mecânica para o topo, virando micro-label ao entrar um número colossal de 240px.

### `split-text-stagger`
- **ID:** `split-text-stagger`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/split-text-stagger.mp4`
- **Conceito:** Palavras fatiadas em caracteres que entram em cascata milimétrica com spring amortecido.

### `scramble-decode`
- **ID:** `scramble-decode`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/scramble-decode.mp4`
- **Conceito:** Efeito hacker/técnico decodificando caracteres aleatórios até travar na palavra de autoridade.

### `word-relay-filmstrip`
- **ID:** `word-relay-filmstrip`
- **Duração:** 105 frames (3.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/word-relay-filmstrip.mp4`
- **Conceito:** Rolo contínuo vertical de palavras de soco desacelerando bruscamente até cravar o termo decisivo.

---

## 📊 3. Dados & Métricas

### `counter-confetti`
- **ID:** `counter-confetti`
- **Duração:** 105 frames (3.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/counter-confetti.mp4`
- **Conceito:** Número hero animado de 0 a X com explosão sutil de partículas neon no instante exato do lock.

### `ring-diagram-annotation-reveal`
- **ID:** `ring-diagram-annotation-reveal`
- **Duração:** 120 frames (4.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/ring-diagram-annotation-reveal.mp4`
- **Conceito:** Gráfico em anel neon revelando seções de fatiamento de taxas com linhas líderes apontando as perdas.

### `timeline-travel`
- **ID:** `timeline-travel`
- **Duração:** 135 frames (4.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/timeline-travel.mp4`
- **Conceito:** Régua temporal progressiva demonstrando a corrosão do dinheiro ao longo de 5 a 10 anos.

### `value-stagger-gradient`
- **ID:** `value-stagger-gradient`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/value-stagger-gradient.mp4`
- **Conceito:** Valores numéricos escalonados em cascata vertical com contraste de destaque no número crítico.

---

## ⚡ 4. Efeitos & Metáforas Físicas

### `beat-step-list-theme-cycle`
- **ID:** `beat-step-list-theme-cycle`
- **Duração:** 120 frames (4.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/beat-step-list-theme-cycle.mp4`
- **Conceito:** Argumentos que ciclam em sincronia rítmica com a locução, mudando o foco ativo com alta clareza.

### `bezier-source-converge-merge`
- **ID:** `bezier-source-converge-merge`
- **Duração:** 120 frames (4.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/bezier-source-converge-merge.mp4`
- **Conceito:** Múltiplas correntes financeiras (linhas Bézier) convergindo em direção ao bolso do intermediário.

### `panel-to-canvas`
- **ID:** `panel-to-canvas`
- **Duração:** 105 frames (3.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/panel-to-canvas.mp4`
- **Conceito:** Lâmina de documento que se desdobra do plano fechado para o espaço aberto com linhas de grade.

### `card-stack`
- **ID:** `card-stack`
- **Duração:** 105 frames (3.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/card-stack.mp4`
- **Conceito:** Pilha física de fichas ou contratos sendo descartados sucessivamente em perspectiva 2.5D.

### `pop-burst-confirm`
- **ID:** `pop-burst-confirm`
- **Duração:** 75 frames (2.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/pop-burst-confirm.mp4`
- **Conceito:** Carimbo monumental de alerta com anel de choque e ícone físico de aviso.

### `list-reveal`
- **ID:** `list-reveal`
- **Duração:** 105 frames (3.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/list-reveal.mp4`
- **Conceito:** Revelação precisa de 3 cláusulas ou regras com barras neon de numeração.

### `product-card-progressive-assemble`
- **ID:** `product-card-progressive-assemble`
- **Duração:** 120 frames (4.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/product-card-progressive-assemble.mp4`
- **Conceito:** Montagem mecânica progressiva dos componentes estruturais de um investimento complexo.

### `radial-ripple-phone-chips`
- **ID:** `radial-ripple-phone-chips`
- **Duração:** 120 frames (4.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/radial-ripple-phone-chips.mp4`
- **Conceito:** Ondas de rádio/pulso partindo de um centro com nós técnicos em satélite.

### `research-card-stack-scroll`
- **ID:** `research-card-stack-scroll`
- **Duração:** 120 frames (4.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/research-card-stack-scroll.mp4`
- **Conceito:** Deslocamento vertical contínuo de relatórios de auditoria e matérias jornalísticas de denúncia.

### `segmented-thumb-hero`
- **ID:** `segmented-thumb-hero`
- **Duração:** 105 frames (3.5s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/segmented-thumb-hero.mp4`
- **Conceito:** Painel segmentado com divisores de proporção áurea e destaque na célula principal.

### `skeleton-reveal`
- **ID:** `skeleton-reveal`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/skeleton-reveal.mp4`
- **Conceito:** Feixe de luz ou varredura de raio-x que descasca a superfície e expõe a armadilha oculta.

### `svg-shape-morph`
- **ID:** `svg-shape-morph`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/svg-shape-morph.mp4`
- **Conceito:** Metamorfose vetorial fluida transitando de uma promessa geométrica segura para uma trava de risco.

### `icon-flip-bloom`
- **ID:** `icon-flip-bloom`
- **Duração:** 90 frames (3.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/icon-flip-bloom.mp4`
- **Conceito:** Giro tridimensional do ícone físico com rastro luminoso neon e ancoragem rígida.

---

## 🔀 5. Transições

### `bottom-push-stack-wipe`
- **ID:** `bottom-push-stack-wipe`
- **Duração:** 60 frames (2.0s @ 30fps)
- **Vídeo de Referência:** `public/presets/videos/bottom-push-stack-wipe.mp4`
- **Conceito:** Varredura mecânica vertical de baixo para cima empurrando a tomada anterior para fora do quadro.

---

## 🛠️ Como Utilizar em uma Nova Cena Remotion

Para utilizar qualquer preset em um trecho de vídeo (`output/trecho-XX/scenes/01-sua-cena.tsx`):

```tsx
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { CelFlashStompPreset } from '@/presets';

export const Cena01: React.FC = () => {
  return (
    <AbsoluteFill>
      <CelFlashStompPreset
        text="ARMADILHA"
        subtext="COE NÃO É INVESTIMENTO"
        accentColor="#FF9900"
        transparent={true}
      />
    </AbsoluteFill>
  );
};
```

---

## 🎬 Como o Diretor Orquestrador Usa no Checkpoint

No arquivo `output/trecho-XX/concept.md`, o Diretor Orquestrador preenche o campo obrigatório de Câmera & Preset:

```markdown
#### Câmera & Preset Shotcraft (Video Shotcraft)
- Preset Shotcraft: `cel-flash-stomp`
- Movimento de Câmera: Push-in seco de 1.0 para 1.08 com impacto no frame 6
- Preview em Vídeo: `public/presets/videos/cel-flash-stomp.mp4`
```
