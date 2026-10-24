import { BeatSheet } from './HouseTimeline';
import { ganchoVideo01, receitasDemo } from './demo/ganchoVideo01';

/**
 * Folhas de batidas registradas. Cada uma vira duas composicoes no Studio:
 * `<id>` com fundo preto e `<id>-Alpha` transparente (para editar por cima da gravacao).
 * Para um video novo: crie videos/<video>/beats.ts exportando um BeatSheet e adicione aqui.
 */
export const HOUSE_SHEETS: BeatSheet[] = [ganchoVideo01, receitasDemo];
