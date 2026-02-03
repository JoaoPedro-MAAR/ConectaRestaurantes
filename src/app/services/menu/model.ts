export enum DiaSemana {
    SEGUNDA = 'SEGUNDA',
    TERCA = 'TERCA',
    QUARTA = 'QUARTA',
    QUINTA = 'QUINTA',
    SEXTA = 'SEXTA',
    SABADO = 'SABADO',
    DOMINGO = 'DOMINGO'
}

export interface CategoriaMenu{
    nome: string;
    limiteMaximoEscolhas: number;
    itensIds: number[];
}

export interface Menu {
    id?: number;
    nome: string;
    descricao: string;
    ativo?: boolean | null;
    turnoPadrao?: string | null;
    diaSemana?: DiaSemana | null;
    categorias: CategoriaMenu[];
    
}

