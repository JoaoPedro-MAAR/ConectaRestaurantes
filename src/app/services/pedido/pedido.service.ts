import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from '../InterfaceService'; // Reaproveitando sua config
import { PaginatedResponse } from '../../../types';

export interface ItemPedido {
  id: number;
  nome: string;
  categoria: string;
}

export interface FuncionarioResumo {
  id: number;
  nome: string;
  cpf: string;
}

export interface PedidoDetalhado {
  id: number;
  status: string;
  observacao: string;
  solicitante: FuncionarioResumo;
  itens: ItemPedido[];
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private http = inject(HttpClient);
  private apiUrl = `${baseUrl}/pedidos`;

  getPedidosPorSolicitacao(idSolicitacao: number, page: number = 0): Observable<PaginatedResponse<PedidoDetalhado>> {
    
    const params = new HttpParams()
        .set('page', page.toString())
        .set('size', '5');

    return this.http.get<PaginatedResponse<PedidoDetalhado>>(
        `${this.apiUrl}/solicitacao/${idSolicitacao}`, 
        { params }
    );
  }
}