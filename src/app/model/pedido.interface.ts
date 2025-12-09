export interface FormPedido {
    id?: number | string,
    obra: string,
    gestor: string,
    qtd_Marmitas: number,
    pedidos?: Array<{
        id?: number,
        matricula: number,
        pedido: string,
    }>
    status?: string,
}