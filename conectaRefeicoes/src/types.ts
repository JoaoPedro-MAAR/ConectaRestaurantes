
type StatusSolicitation = (
    "Recebido" | "Cancelado" |
     "Em preparo" | "Enviado" | 
     "Finalizado")



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
    pedidos?: Pedido[];
}


interface PaginatedResponse<T>{
    first: number;
    prev: number | null;
    next: number | null;
    last: number | null;
    pages: number;
    items: number;
    data: T[]
}


export type { Pedido, Solicitation, StatusSolicitation , PaginatedResponse}