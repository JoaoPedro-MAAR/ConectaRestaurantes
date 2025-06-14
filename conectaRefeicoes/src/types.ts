
type StatusSolicitation = "Recebido" | "Cancelado" | "Em preparo" | "Enviado" | "Finalizado"



interface Pedido {
    id: number
    matricula: number;
    pedido: string;
}

interface Solicitation {
    id: number; 
    obra: string;
    gestor: string;
    status: StatusSolicitation; 
    qtd_Marmitas: number;
    pedidos: Pedido[];
}


export type { Pedido, Solicitation }