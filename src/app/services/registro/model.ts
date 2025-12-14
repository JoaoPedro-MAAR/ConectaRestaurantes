export interface RegistroRefeicaoDTO {
    cpfFuncionario: string;
    turno: 'CAFE_DA_MANHA' | 'ALMOCO' | 'JANTAR';
}

export interface RegistroRefeicaoResponse {
    id: number;
    nomeFuncionario: string;
    cpfFuncionario: string;
    nome: string; 
    turno: string;
    dataHora: string;
}