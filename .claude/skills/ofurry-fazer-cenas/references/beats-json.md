# Formato do beats.json

Tipo completo: `src/house/beats.ts` (`BeatSheet`). Caminhos sao relativos a pasta do trecho.
Tempos em segundos do audio do trecho. Exemplo real e completo: `videos/demo-gancho/output/trecho-01/beats.json`.

```json
{
  "id": "coe-trecho-02",
  "duration": 25.4,
  "fps": 30,
  "audio": "midia/narracao.wav",
  "subtitlePath": "midia/narracao.json",
  "cardOptions": { "maxWords": 2, "maxChars": 16 },
  "captions": [
    { "from": 0.0, "until": 6.2, "entry": "whip" },
    { "from": 9.0, "until": 14.0, "entry": "pop", "y": 0.72 }
  ],
  "backdrops": [
    { "at": 0, "backdrop": "grid" },
    { "at": 6.2, "backdrop": "stars" },
    { "at": 14, "backdrop": "black" },
    { "at": 18, "backdrop": { "blur": "../../acervo/imagens/predio-banco.jpg" } }
  ],
  "beats": []
}
```

- `captions`: janelas em que a legenda cinetica aparece. Fora delas so aparecem as batidas.
  `entry`: `pop` (padrao), `whip` (rajada/gancho), `rise`, `glitch` (troca sobre o mascote), `cut`, `blur`.
  `y`: centro vertical (0.5 meio, 0.72 sobre o peito do mascote). `whisper: true` para fala de ponte.
- `backdrops`: `black`, `grid`, `stars`, `transparent` ou `{ "blur": "<imagem>" }` (desfocada no build).
- `filmDust: false` desliga a poeira de pelicula.
- Palavra entre `*asteriscos*` na transcricao vira destaque amarelo; numeros, % e R$ viram destaque sozinhos.

## Batidas (`beats[]`)

Todas tem `kind`, `at` e `until`.

```json
{ "kind": "type-on", "at": 0.25, "until": 4.3, "text": "Quanto custa a sua liberdade?", "eraseAt": 3.25 }
```
H2. Digita a ~22 caracteres/s; `eraseAt` apaga em backspace.

```json
{ "kind": "icon", "at": 11.6, "until": 12.7, "icon": "bitcoin", "tone": "brand", "label": "bitcoin", "y": 0.36 }
```
H3. `icon`: nome kebab-case do Lucide. Usa o Lucide Animated se existir (`"animated": false` forca o
estatico). `tone`: `neutral` | `gain` | `loss` | `highlight` | `brand` | `info`. `strikeAt` risca em vermelho.
`x`/`y` em fracao da tela.

```json
{ "kind": "icons", "at": 7, "until": 12, "relation": ">",
  "items": [
    { "icon": "landmark", "label": "banco", "at": 7 },
    { "icon": "hand-coins", "label": "taxa", "at": 8.2, "tone": "highlight" },
    { "icon": "wallet", "label": "voce", "at": 9.4, "strikeAt": 10.6 }
  ] }
```
H3. 2 a 4 icones entrando um por item falado (`items[].at` = quando a palavra e dita).

```json
{ "kind": "number", "at": 2.2, "until": 4.6, "value": "-80%", "caption": "em 2 anos" }
{ "kind": "number", "at": 4.6, "until": 7, "value": "R$ 50.000", "countFrom": 0, "tone": "gain" }
```
H5. Cor pelo sinal (`-` vermelho, `+` verde) se `tone` nao vier. `countFrom` conta ate o valor em 0,8 s.

```json
{ "kind": "mascot", "at": 22.4, "until": 26.7, "placement": "center", "nameTag": true,
  "poses": [ { "at": 22.4, "pose": "../../../../public/mascote/explicando.png" },
             { "at": 25.0, "pose": "../../../../public/mascote/apontando.png" } ],
  "shrinkAt": 26.2 }
```
H4/H10. `placement`: `center`, `left-third`, `right-third`, `corner-left`, `corner-right`.
Pose sem arquivo vira marcador cinza (o build avisa). `shrinkAt` encolhe para o canto direito.

```json
{ "kind": "proof", "at": 32.7, "until": 37.6, "src": "../../acervo/prints/reserva-eua.png",
  "highlight": [0.08, 0.12, 0.7, 0.18], "highlightAt": 34 }
```
H6. `highlight` = [x, y, largura, altura] em fracao da imagem.

```json
{ "kind": "chapter", "at": 72.9, "until": 76.5, "number": 1, "title": "O Bitcoin" }
{ "kind": "section", "at": 325, "until": 350, "text": "Portabilidade" }
{ "kind": "thumb", "at": 17.7, "until": 21.5, "src": "../../acervo/imagens/thumb.jpg" }
{ "kind": "broll", "at": 40, "until": 44, "src": "../../acervo/broll/cafe.mp4", "video": true }
```
H7 (1 s de preto antes do titulo), H8 (titulo fixo no topo), H9 (thumbnail com push-in), B-roll em tela cheia.

## Camadas (de baixo para cima)

fundo -> batidas (na ordem do arquivo) -> legenda cinetica -> poeira. Legenda e batida podem conviver
(ex.: icone em `y: 0.36` + legenda em `y: 0.72`).
