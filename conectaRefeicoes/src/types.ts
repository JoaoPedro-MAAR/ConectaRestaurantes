interface Pedido {
    id: number
    matricula: number;
    pedido: string;
}

interface Solicitation {
    id: number; 
    obra: string;
    gestor: string;
    qtd_Marmitas: number;
    pedidos: Pedido[];
}



export type { Pedido, Solicitation }