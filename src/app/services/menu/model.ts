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
    categorias: CategoriaMenu[];
}

