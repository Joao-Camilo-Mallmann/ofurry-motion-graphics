---
name: icon-craft
description: Manages, curates, and styles physical metaphor icon assets (from D:\YT\YT\Icones / public/icons/) for OFurry editorial motion design videos, enforcing anti-AI slop principles, high-contrast inversion for black icons, and neon orange colorization over transparent alpha.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "1.0.0"
---

# 🎨 Icon Craft Skill (Editorial Metaphors & Asset Styling)

Skill oficial de **Curadoria e Estilização de Metáforas Físicas em Ícones** para produção de mini-vídeos em Motion Design com canal Alpha transparente para o canal do YouTube **OFurry**.

---

## 1. PAPEL DA SKILL

A `icon-craft` não serve para espalhar ícones decorativos ou criar layouts no estilo template web.
Ela atua como curadora de **Metáforas Físicas Viscerais**:
- Traduzir conceitos financeiros abstratos (liquidez, deságio, intermediação, risco, teto, assimetria) em objetos físicos tangíveis.
- Garantir alto contraste e visibilidade nítida sobre filmagens reais ou fundos escuros, resolvendo o problema de ícones com traços pretos.
- Fornecer parâmetros precisos de escala monumental, física de spring e iluminação neon.

---

## 2. ETAPA OBRIGATÓRIA: CONSULTA AO ICON-CRAFT ANTES DE MONTAR A CENA

> [!IMPORTANT]
> **Ordem de Operações: NENHUMA cena é concebida sem antes consultar o acervo do `icon-craft`!**
> Antes de propor qualquer shot ou layout, o Diretor deve executar o passo a passo:
> 1. **Identificar o Núcleo Dramático da Frase**: Qual é a dor ou conceito concreto? (ex: "custo alto" $\to$ `thief`, "vencimento/prazo" $\to$ `certificate` ou `wallet`, "queda/deságio" $\to$ `chart-lose`, "pergunta oculta" $\to$ `silent`).
> 2. **Selecionar a Metáfora Física no Catálogo**: Escolher 1 ícone específico do acervo de 55 itens.
> 3. **Escolher o Arquétipo de Arte (Baseado nas Referências OFurry em `docs/RefFurry/`)**:
>    - **Arquétipo 1 — Ficha Técnica Neon (`ref1.png`)**: Ícone em contorno neon (`variant="green"` ou `variant="orange"`) + Título do ativo logo abaixo + Lista limpa de specs em texto branco com sinal de igual (`=`).
>    - **Arquétipo 2 — Text Stash / Layered Intersect (`ref2.png`)**: Número/Métrica monumental vazada com traço neon (`-webkit-text-stroke: 4px #FF9900; color: #000000;`) com o ícone físico (ex: notas de dinheiro, ouro) posicionado atrás ou intercalado entre os números.
>    - **Arquétipo 3 — Hero Monumental Dominante**: Ícone isolado gigante (180px–260px) com shockwave laser ring em colisão com a tela.
> 4. **Definir o Modo de Cor (`variant`)**: Escolher o contraste ideal para a cena.

---

## 3. TRATAMENTO DE CORES & ALTO CONTRASTE (RESOLUÇÃO DE ÍCONES PRETOS)

Como o acervo de ícones (`D:\YT\YT\Icones` / `public/icons/`) possui ilustrações com traços ou silhuetas em preto puro, utilizá-los crus sobre vídeo ou fundo escuro os tornaria invisíveis. A skill padroniza os modos de renderização através do componente `<AssetIcon />`:

| Modo (`variant`) | Comportamento Visual | CSS / Mecânica Interna | Referência / Quando Usar |
|---|---|---|---|
| **`green`** | Coloriza o contorno para Verde Neon Elétrico `#00FF00` + glow vibrante | Matriz CSS calibrada para `#00FF00` + drop-shadow | **Referência `ref1.png`**: Ficha técnica, CDB, garantias, liquidez positiva |
| **`orange`** | Coloriza o contorno para Laranja Neon Assinatura `#FF9900` + glow | Matriz CSS calibrada para `#FF9900` + drop-shadow | Destaque máximo, alerta de custos, taxas, traço de assinatura OFurry |
| **`white`** *(Padrão para pretos)* | Inverte o preto para branco puro `#FFFFFF` de alto contraste + sutil glow neon | `filter: brightness(0) invert(1) drop-shadow(...)` | Traços finos e silhuetas pretas sobre vídeo escuro (`bank`, `wallet`, `thief`, `silent`) |
| **`original`** | Preserva 100% das cores nativas do arquivo | Mantém o original + glow opcional | Ícones multicores nativos (`bitcoin`, `gold`, `warning`, `brazil`, `X`, `crash-arrow`) |
| **`custom`** | Aplica qualquer cor arbitrária via máscara vetorial | `mask-image` com `backgroundColor: hex` | Quando a narrativa exigir uma cor temática específica (ex: azul, amarelo) |

---

## 3. CATÁLOGO SEMÂNTICO DOS 55 ÍCONES

### A. Sistema Financeiro, Bancos & Custódia
- `bank`: Instituição emissora, muralha regulatória, banco tradicional.
- `wallet`: Carteira do investidor, liquidez imediata, dinheiro disponível.
- `piggy-bank` / `piggy-bank-line`: Poupança tradicional, reserva acumulada, falsa segurança.
- `pilar`: Fundamentos inabaláveis, base institucional.
- `confidence`: Aperto de mão, confiança cega no gerente/assessor.
- `thief` (`roube.png`): Taxas embutidas, deságio abusivo, transferência de riqueza oculta.
- `money`: Capital líquido, dinheiro em circulação.

### B. Mercado, Oscilação & Queda
- `chart-gain`: Alta livre, valorização de mercado, bull market.
- `chart-lose`: Queda livre, perda patrimonial, bear market, deságio no resgate antecipado.
- `crash-arrow` (`OMGGG.png`): Queda vertical brutal, colapso repentino.
- `arrow-up-down`: Volatilidade, oscilação de spread, arbitragem bidirecional.

### C. Riscos, Contratos & Burocracia
- `warning`: Alerta crítico, perigo iminente de perda de capital.
- `silent`: Informação omitida, pergunta não feita, letra miúda silenciada.
- `clipboard`: Documento DIE, prospecto complexo que ninguém lê.
- `paper`: Contrato em papel, promessa jurídica frágil.
- `crystal-ball`: Promessas futuristas, previsão de falsos gurus, adivinhação.
- `lottery`: Estrutura com assimetria de cassino, aposta contra a banca.
- `x-mark`: Negação violenta, corte de mito, desmistificação.
- `square`: Bloqueio geométrico, carência contratual, dinheiro trancado.

### D. Criptoativos, Tecnologia & Transição
- `bitcoin`: BTC, soberania digital, reserva descentralizada.
- `blockchain`: Rede descentralizada, blocos imutáveis.
- `datacenter`: Servidores de inteligência artificial, nuvem.
- `pen-drive`: Cold storage, custódia própria offline.
- `pc`: Terminal de trading, execução técnica.
- `smartphone`: Assinatura rápida e descuidada em app de banco.
- `car-electric`: Transição energética, tendências tecnológicas.

### E. Commodities & Recursos Físicos
- `gold` / `gold-bars`: Ouro, reserva de valor histórica, hedge inflacionário.
- `copper`: Cobre, economia real, demanda industrial.
- `nuclear-plant`: Energia nuclear, urânio, alta densidade energética.
- `wind`: Energia eólica, ventos da volatilidade.
- `charcoal`: Matriz fóssil pesada.

### F. Psicologia, Família & Soberania
- `brain`: Vieses cognitivos, ganância, medo e heurísticas do investidor.
- `family`: O verdadeiro patrimônio em risco (sucessão, segurança familiar).
- `user`: O investidor pessoa física na ponta mais fraca da corda.
- `hand`: A mão da instituição segurando ou travando o dinheiro.
- `key`: Chave de acesso, soberania sobre seus recursos.
- `basket` / `eggs` / `egg`: Princípio da diversificação vs. risco concentrado.

---

## 4. EXEMPLO DE USO NO REMOTION

```tsx
import { AssetIcon } from '../../../../../src/primitives';

// 1. Ícone de banco invertido para branco puro com glow neon sobre Alpha
<AssetIcon
  name="bank"
  variant="white"
  size={160}
  glow={true}
  showRing={true}
  delay={5}
/>

// 2. Metáfora de roubo/taxa na cor laranja neon
<AssetIcon
  name="thief"
  variant="orange"
  size={200}
  delay={10}
/>

// 3. Ícone com cores nativas (Bitcoin, Ouro, Alerta)
<AssetIcon
  name="warning"
  variant="original"
  size={180}
  glow={true}
  glowColor="#FFE600"
/>
```

---

## 5. COMANDO DE SINCRONIZAÇÃO
Sempre que novos ícones forem adicionados à pasta `D:\YT\YT\Icones`, execute:
```bash
bun run sync:icons
```
