---
name: ofurry-fazer-cenas
description: Faz as cenas de motion de um trecho ja organizado do canal OFurry Investidor, no estilo da casa, usando HyperFrames (HTML + GSAP) - escreve o beats.json a partir do plano aprovado, gera o projeto HyperFrames com o kit da casa (legenda cinetica, grade, estrelas, icones Lucide e Lucide Animated, numeros, mascote, prints, capitulos), checa, revisa por snapshot, ajusta a mao e renderiza MP4 preto + MOV transparente. Use quando o usuario pedir para fazer, animar, gerar, ajustar ou renderizar as cenas de um trecho.
license: MIT
metadata:
  author: OFurry Motion Lab
  version: "1.0.0"
---

# Fazer cenas (OFurry + HyperFrames)

Segunda skill de producao. Entrada: um trecho com `plano.md` **APROVADO** (skill `ofurry-organizar-video`).
Saida: `render/<video>-trecho-XX.mp4` (fundo preto, com narracao, para conferir) e
`render/<video>-trecho-XX-alpha.mov` (ProRes 4444 transparente, para por em cima da gravacao no editor).

Antes de comecar, leia:
1. `.agents/skills/ofurry-house-motion/SKILL.md`: regras e receitas H1-H10 (o visual do canal).
2. `.agents/skills/hyperframes/SKILL.md`: o contrato de render do HyperFrames. Ele vale para toda edicao
   feita a mao no projeto gerado.

Se o plano do trecho nao estiver APROVADO, pare e use a `ofurry-organizar-video`.

## 1. Passo a passo

1. **Escrever `beats.json`** em `videos/<id>/output/trecho-XX/`, traduzindo cada linha da tabela do
   `plano.md` numa batida. Formato e exemplos de cada tipo: `references/beats-json.md`.
   Tempos em segundos do audio do trecho, copiados de `midia/narracao.json` (nunca estimados).
2. **Lint da casa:** `bun run house:lint <id> <XX>`. Corrija ate zero avisos (tela parada > 4 s, preto com
   voz, cartao curto/longo, gancho lento).
3. **Gerar o projeto:** `bun run hf:build <id> <XX>` escreve `hf/` (index.html, compositions/, assets/).
   Cada batida vira uma cena `compositions/bNN-<tipo>.html`; mais `fundo`, `legendas` e `poeira`.
4. **Checar:** dentro de `hf/`, `npx hyperframes@0.8.193 check --json`. Zero erros. Avisos esperados:
   `timeline_track_too_dense` na cena de legendas (o HyperFrames pede todas as legendas num host so).
5. **Revisar por snapshot:** `npx hyperframes@0.8.193 snapshot --at <t1,t2,...>` nos tempos de cada batida e
   olhe as imagens. Confira: texto certo e legivel, cor pelo sinal, nada cortado na borda, mascote e
   prints no lugar, nenhum quadro vazio com voz.
6. **Preview com o usuario:** `npx hyperframes@0.8.193 preview` dentro de `hf/` abre o Studio no navegador
   (o "app do HyperFrames"); ele pode ajustar ali. Renderize so depois do ok, ou se ele pediu o arquivo.
7. **Renderizar:** `bun run hf:render <id> <XX>` (roda o check e gera MP4 + MOV). `--draft` para um
   rascunho rapido, `--so-preto` ou `--so-alpha` para so um dos dois.

## 2. Ajustes a mao (depois do build)

O build gera um primeiro corte; o refinamento e editar os arquivos de `hf/compositions/` seguindo o contrato
do HyperFrames. Regras que mais importam aqui:

- **Rodar `hf:build` de novo apaga `compositions/`.** Ajuste fino a mao so depois que o `beats.json` estiver
  fechado. Mudanca estrutural (tempo, tipo de batida): edite o `beats.json` e gere de novo.
- Todo elemento com tempo tem `class="clip"`, `data-start`, `data-duration` (segundos, locais a cena).
- Anime um filho do `.clip`, nunca o proprio `.clip`; nada de `transform` no CSS de algo que o GSAP move.
- Sempre `tl.fromTo` (nunca `from`); nada de `Math.random`, `Date.now`, `repeat: -1`.
- Movimento calculado por funcao do tempo: `House.drive(tl, inicio, duracao, function (t) {...})`.
- Icone animado: `House.lucide(tl, elementoDoSvg, inicio, duracao, { delay, loopEvery, speed })`.
- Entradas da casa: `House.entry(tl, el, "pop" | "whip" | "rise" | "glitch" | "blur" | "cut", tempo, { dir })`.
- Efeito que o kit nao tem (transicao especial, grafico, textura): procure antes no registro
  (`/hyperframes-registry`, `npx hyperframes catalog --query "..." --json`) e restilize com os tokens da casa.
- Fontes: so Montserrat (embutida no HyperFrames) e Bebas Neue (`assets/fonts`, ja copiada pelo build).

## 3. O kit da casa no HyperFrames

| Arquivo | O que e |
|---|---|
| `hf/kit/house.css` | tokens (cores por significado, fontes, tamanhos) e classes `.house-*` |
| `hf/kit/house-runtime.js` | `House.entry`, `House.drive`, `House.lucide`, `House.rng`, `House.fit` |
| `scripts/hf/build-trecho.ts` | beats.json -> projeto HyperFrames |
| `scripts/hf/lucide-svg.ts` | SVG dos icones: Lucide estatico e Lucide Animated com a animacao gravada |
| `scripts/hf/render-trecho.ts` | check + render MP4 preto e MOV transparente |

O fundo e a poeira somem no MOV porque o `index.html` le a variavel `transparente` (o render passa
`--variables '{"transparente":true}'`). No Studio, a mesma variavel aparece no painel Variables.

O kit Remotion (`src/house/`) le o mesmo formato de folha de batidas e continua disponivel para os trechos
antigos do COE; videos novos usam HyperFrames.

## 4. Checklist antes de entregar

- [ ] `house:lint` sem avisos e `hyperframes check` sem erros.
- [ ] Snapshots revisados: texto igual a fala, sem erro de digitacao, sem marca d'agua no acervo.
- [ ] Mascote com PNG real (nao o marcador cinza) quando o plano pede mascote.
- [ ] MP4 conferido com o audio (sincronia legenda x fala).
- [ ] MOV transparente entregue e o caminho dele informado ao usuario.
- [ ] `bun run video:status <id>` mostra o trecho como renderizado.
