/**
 * OFurry Icon Catalog & Semantic Mapping
 * Catalogs 55 physical metaphor icons synced from D:\YT\YT\Icones
 */

export type OFurryIconName =
  | 'arrow-up-down'
  | 'bank'
  | 'basket'
  | 'bitcoin'
  | 'blockchain'
  | 'brain'
  | 'brazil'
  | 'car-electric'
  | 'certificate'
  | 'charcoal'
  | 'chart-gain'
  | 'chart-lose'
  | 'clipboard'
  | 'confidence'
  | 'copper'
  | 'crystal-ball'
  | 'datacenter'
  | 'dollar'
  | 'edit-video'
  | 'egg'
  | 'eggs'
  | 'email'
  | 'family'
  | 'gold'
  | 'gold-bars'
  | 'hand'
  | 'house'
  | 'gamepad'
  | 'key'
  | 'lightning'
  | 'lottery'
  | 'miner'
  | 'money'
  | 'nuclear-plant'
  | 'crash-arrow'
  | 'paper'
  | 'pc'
  | 'pen-drive'
  | 'piggy-bank'
  | 'piggy-bank-line'
  | 'pillar'
  | 'play'
  | 'thief'
  | 'security'
  | 'share'
  | 'silent'
  | 'system'
  | 'smartphone'
  | 'square'
  | 'user'
  | 'wallet'
  | 'warning'
  | 'wind'
  | 'world'
  | 'x-mark';

export interface IconMeta {
  file: string;
  isMonochrome: boolean;
  defaultVariant: 'white' | 'orange' | 'original';
  keywords: string[];
  editorialRole: string;
}

export const ICON_CATALOG: Record<OFurryIconName, IconMeta> = {
  'arrow-up-down': {
    file: 'arrow-up-down.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['volatilidade', 'spread', 'arbitragem', 'oscilação', 'duas vias'],
    editorialRole: 'Metáfora de variação bidirecional e incerteza de mercado',
  },
  bank: {
    file: 'bank.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['banco', 'instituição', 'estruturador', 'governo', 'sistema financeiro'],
    editorialRole: 'Representação de poder institucional, barreira bancária e emissor',
  },
  basket: {
    file: 'basket.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['cesta de ativos', 'alocação', 'carteira', 'reunião de ativos'],
    editorialRole: 'Metáfora da cesta de investimentos e contenção de patrimônio',
  },
  bitcoin: {
    file: 'bitcoin.png',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['btc', 'bitcoin', 'criptomoeda', 'descentralização', 'reserva digital'],
    editorialRole: 'Símbolo máximo de criptoativos e finanças descentralizadas',
  },
  blockchain: {
    file: 'blockchain.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['rede', 'blocos', 'protocolo', 'tecnologia', 'registro imutável'],
    editorialRole: 'Metáfora de nós distribuídos e estrutura de dados',
  },
  brain: {
    file: 'brain.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['psicologia', 'vieses', 'comportamento', 'racionalidade', 'medo', 'ganância'],
    editorialRole: 'Metáfora de tomada de decisão, heurísticas mentais e ilusão do investidor',
  },
  brazil: {
    file: 'brazil.png',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['brasil', 'selic', 'cenário nacional', 'risco brasil', 'título público'],
    editorialRole: 'Âncora contextual para macroeconomia e política monetária nacional',
  },
  'car-electric': {
    file: 'car-electric.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['transição energética', 'ev', 'inovação', 'automotivo', 'futuro'],
    editorialRole: 'Metáfora de tendências de mercado, ESG e tecnologia verde',
  },
  certificate: {
    file: 'certificate.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['garantia', 'contrato', 'certificado', 'regulação', 'promessa'],
    editorialRole: 'Metáfora de promessa formal de garantia de capital',
  },
  charcoal: {
    file: 'charcoal.webp',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['carvão', 'combustível', 'energia térmica', 'commodities'],
    editorialRole: 'Símbolo da velha matriz energética e indústria pesada',
  },
  'chart-gain': {
    file: 'chart-gain.png',
    isMonochrome: true,
    defaultVariant: 'orange',
    keywords: ['alta', 'valorização', 'bull market', 'ganho', 'lucro'],
    editorialRole: 'Metáfora de ascensão de preço e expectativa otimista',
  },
  'chart-lose': {
    file: 'chart-lose.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['queda', 'perda', 'bear market', 'desconto', 'desvalorização', 'prejuízo'],
    editorialRole: 'Metáfora de sangria patrimonial, deságio e quebra de mercado',
  },
  clipboard: {
    file: 'clipboard.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['regulamento', 'die', 'prospecto', 'auditoria', 'letras miúdas'],
    editorialRole: 'Metáfora do documento burocrático que quase ninguém lê',
  },
  confidence: {
    file: 'confidence.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['confiança', 'aperto de mão', 'acordo', 'parceria', 'promessa'],
    editorialRole: 'Metáfora da relação de confiança ingênua com intermediários',
  },
  copper: {
    file: 'copper.png',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['cobre', 'metal industrial', 'commodities', 'infraestrutura'],
    editorialRole: 'Símbolo da economia real e condutividade tecnológica',
  },
  'crystal-ball': {
    file: 'crystal-ball.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['adivinhação', 'previsão', 'falso guru', 'bola de cristal', 'futuro'],
    editorialRole: 'Metáfora da falácia preditiva e promessas irrealistas de retorno',
  },
  datacenter: {
    file: 'datacenter.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['infraestrutura', 'servidores', 'ia', 'nuvem', 'computação'],
    editorialRole: 'Metáfora do hardware por trás da inteligência artificial',
  },
  dollar: {
    file: 'dollar.webp',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['dólar', 'moeda global', 'câmbio', 'fed', 'reserva'],
    editorialRole: 'Símbolo da liquidez global e hegemonia cambial',
  },
  'edit-video': {
    file: 'edit-video.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['edição', 'criação', 'mídia', 'youtube', 'narrativa'],
    editorialRole: 'Metáfora dos bastidores da produção de conteúdo',
  },
  egg: {
    file: 'egg.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['ovo único', 'fragilidade', 'concentração de risco', 'falha única'],
    editorialRole: 'Metáfora do risco fatal de apostar tudo em um único ativo',
  },
  eggs: {
    file: 'eggs.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['ovos na cesta', 'diversificação', 'gestão de risco', 'proteção'],
    editorialRole: 'Metáfora clássica da prudência na distribuição de capital',
  },
  email: {
    file: 'email.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['comunicação', 'notificação', 'oferta', 'spam', 'aviso'],
    editorialRole: 'Metáfora do canal de distribuição de propostas de investimento',
  },
  family: {
    file: 'family.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['família', 'patrimônio familiar', 'sucessão', 'futuro', 'responsabilidade'],
    editorialRole: 'Âncora emocional para o destino real das economias de uma vida',
  },
  gold: {
    file: 'gold.png',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['ouro', 'reserva de valor', 'hedge', 'escassez', 'proteção contra inflação'],
    editorialRole: 'Símbolo de valor intrínseco imutável e proteção contra derretimento fiduciário',
  },
  'gold-bars': {
    file: 'gold-bars.png',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['barras de ouro', 'tesouro', 'reserva física', 'fortuna'],
    editorialRole: 'Metáfora visual monumental de riqueza sólida',
  },
  hand: {
    file: 'hand.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['mão invisível', 'intervenção', 'segurar', 'travar', 'controle', 'resgate'],
    editorialRole: 'Metáfora da mão que segura o capital ou intervém no mercado',
  },
  house: {
    file: 'house.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['imóveis', 'fii', 'teto', 'patrimônio imobiliário', 'segurança física'],
    editorialRole: 'Metáfora do ativo tangível e conservadorismo patrimonial',
  },
  gamepad: {
    file: 'gamepad.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['gamificação', 'cassino', 'jogo', 'especulação lúdica'],
    editorialRole: 'Metáfora da transformação do investimento em jogo viciante',
  },
  key: {
    file: 'key.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['chave', 'acesso', 'segurança', 'chave privada', 'cofre'],
    editorialRole: 'Metáfora do controle de acesso e soberania sobre os próprios fundos',
  },
  lightning: {
    file: 'lightning.png',
    isMonochrome: true,
    defaultVariant: 'orange',
    keywords: ['energia', 'velocidade', 'choque', 'rapidez', 'impacto'],
    editorialRole: 'Acento visual de eletricidade, urgência e força cinética',
  },
  lottery: {
    file: 'lottery.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['loteria', 'aposta', 'azar', 'sorteio', 'probabilidade baixa'],
    editorialRole: 'Metáfora de produtos financeiros que operam com assimetria predatória',
  },
  miner: {
    file: 'miner.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['mineração', 'prova de trabalho', 'trabalho bruto', 'extração'],
    editorialRole: 'Metáfora de esforço computacional e base da rede blockchain',
  },
  money: {
    file: 'money.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['dinheiro', 'moeda', 'liquidez', 'capital', 'saldo'],
    editorialRole: 'Metáfora básica de dinheiro em espécie e fluxo monetário',
  },
  'nuclear-plant': {
    file: 'nuclear-plant.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['energia nuclear', 'urânio', 'energia de base', 'alta densidade'],
    editorialRole: 'Metáfora de energia massiva concentrada e segurança operacional',
  },
  'crash-arrow': {
    file: 'crash-arrow.png',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['crash', 'queda brutal', 'colapso', 'flecha descendente vermelha'],
    editorialRole: 'Símbolo visual visceral de queda vertical súbita',
  },
  paper: {
    file: 'paper.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['documento', 'contrato', 'papel', 'burocracia'],
    editorialRole: 'Metáfora da fragilidade de acordos em papel',
  },
  pc: {
    file: 'pc.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['computador', 'terminal', 'trading', 'home broker', 'plataforma'],
    editorialRole: 'Metáfora da interface técnica entre o investidor e o mercado',
  },
  'pen-drive': {
    file: 'pen-drive.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['cold wallet', 'armazenamento offline', 'hardware wallet', 'custódia própria'],
    editorialRole: 'Metáfora da custódia física de ativos digitais',
  },
  'piggy-bank': {
    file: 'piggy-bank.png',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['poupança', 'reserva', 'cofrinho', 'acumulação'],
    editorialRole: 'Símbolo tradicional de economia e cautela financeira',
  },
  'piggy-bank-line': {
    file: 'piggy-bank-line.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['poupança linha', 'reserva', 'custódia'],
    editorialRole: 'Versão em linha monocromática do cofre de reserva',
  },
  pillar: {
    file: 'pillar.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['pilar', 'fundamento', 'alicerce', 'base estrutural'],
    editorialRole: 'Metáfora dos princípios inabaláveis de uma boa carteira',
  },
  play: {
    file: 'play.png',
    isMonochrome: true,
    defaultVariant: 'orange',
    keywords: ['início', 'execução', 'gatilho', 'start'],
    editorialRole: 'Disparador de ação ou início de ciclo de investimento',
  },
  thief: {
    file: 'thief.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['roubo', 'taxa oculta', 'comissão abusiva', 'assalto silencioso', 'deságio'],
    editorialRole: 'Metáfora visceral para taxas embutidas que drenam patrimônio',
  },
  security: {
    file: 'security.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['escudo', 'proteção', 'blindagem', 'segurança', 'garantia'],
    editorialRole: 'Metáfora da falsa blindagem ou da real proteção de risco',
  },
  share: {
    file: 'share.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['distribuição', 'rede', 'conexão', 'divisão'],
    editorialRole: 'Metáfora da cadeia de repasse entre intermediários',
  },
  silent: {
    file: 'silent.webp',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['silêncio', 'omissão', 'falta de transparência', 'segredo', 'letra miúda'],
    editorialRole: 'Metáfora da pergunta não feita ou da informação intencionalmente omitida',
  },
  system: {
    file: 'system.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['sistema', 'engrenagem', 'mecanismo', 'estrutura oculta'],
    editorialRole: 'Metáfora do mecanismo de incentivos perversos do mercado',
  },
  smartphone: {
    file: 'smartphone.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['app bancário', 'notificação', 'acesso rápido', 'facilidade enganosa'],
    editorialRole: 'Metáfora da facilidade perigosa de assinar produtos no celular em 1 clique',
  },
  square: {
    file: 'square.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['bloqueio', 'fronteira', 'limite geométrico'],
    editorialRole: 'Metáfora de aprisionamento e restrição contratual',
  },
  user: {
    file: 'user.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['investidor', 'pessoa física', 'cliente', 'indivíduo vulnerável'],
    editorialRole: 'O protagonista vulnerável na ponta final da cadeia financeira',
  },
  wallet: {
    file: 'wallet.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['carteira', 'bolso', 'custódia', 'patrimônio disponível', 'liquidez'],
    editorialRole: 'Metáfora do bolso do investidor e da disponibilidade de liquidez',
  },
  warning: {
    file: 'warning.png',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['alerta', 'perigo', 'risco elevado', 'atenção crítica', 'cuidado'],
    editorialRole: 'Sinal universal de alto risco e armadilha iminente',
  },
  wind: {
    file: 'wind.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['vento', 'volatilidade', 'energia eólica', 'vento contrário'],
    editorialRole: 'Metáfora de forças externas e intempéries do mercado',
  },
  world: {
    file: 'world.png',
    isMonochrome: true,
    defaultVariant: 'white',
    keywords: ['mercado global', 'geopolítica', 'macroeconomia', 'internacional'],
    editorialRole: 'Metáfora da escala global e exposição cambial',
  },
  'x-mark': {
    file: 'x-mark.png',
    isMonochrome: false,
    defaultVariant: 'original',
    keywords: ['erro', 'falso', 'proibição', 'rejeição', 'não'],
    editorialRole: 'Impacto visual de negação dura, corte ou desmistificação',
  },
};

/**
 * Resolves static path for Remotion staticFile()
 */
export function getIconStaticPath(name: OFurryIconName): string {
  const meta = ICON_CATALOG[name];
  if (!meta) {
    throw new Error(`Icon name "${name}" not found in ICON_CATALOG`);
  }
  return `icons/${meta.file}`;
}
