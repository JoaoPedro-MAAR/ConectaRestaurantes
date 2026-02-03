import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormPedido } from '../model/pedido.interface';

import { map, tap } from 'rxjs/operators';
import { Solicitation, StatusSolicitation, PaginatedResponse } from '../../types';
import { baseUrl } from './InterfaceService';

@Injectable({
  providedIn: 'root'
})

export class RequisicaoService {
  private apiUrl = `${baseUrl}/order`;
  private http = inject(HttpClient);
  private ordersSubject = new BehaviorSubject<Solicitation[]>([])
  orders$ = this.ordersSubject.asObservable()
  private currentPage: number = 1;
  
// EU QUERO COMMITAR 



  constructor() { }

  delete(id:number){
    console.log("Estou sendo chamado parte 3")
    return this.http.delete<void>(`${this.apiUrl}/${id}`)  
  }


  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`);
  }

  postOrder(order: FormPedido) {
    console.log(order)
    this.http.post<FormPedido>(this.apiUrl, order).subscribe({
      next: () => {
        console.log('Order posted successfully');
        this.fetchPaginated(this.currentPage).subscribe(); 
      },
      error: (error) => {
        console.error('Error posting order:', error);
      }
    });
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getOrdersChanged(): Observable<Solicitation[]> {
    return this.ordersSubject.asObservable();
  }

  fetchAll(): Observable<Solicitation[]> {
    return this.http.get<Solicitation[]>(`${this.apiUrl}/all`).pipe(
      tap( orders => this.ordersSubject.next(orders))
    );
  }

  updateOrderStatus(id: number | string, newStatus: StatusSolicitation): Observable<Solicitation> {
    const payload = { status: newStatus };
    
    return this.http.patch<Solicitation>(`${this.apiUrl}/${id}`, payload).pipe(
      tap(() => {
        console.log(`Status do pedido ${id} atualizado para ${newStatus}. Recarregando dados.`);
        this.fetchPaginated(this.currentPage).subscribe(); 
      })
    );
  }

fetchWithFilterPaginated(
  filtros: {
    id?:string;
    obra?: string;
    gestor?: string;
    maiorQue?: number;
    menorQue?: number;
    status?: StatusSolicitation;
  },
  page:number=0
): Observable<PaginatedResponse<Solicitation>> {
  let params = new HttpParams().set('page', page);
  if (filtros.id){
    params = params.append('id', filtros.id);
  }
  if (filtros.obra) {
    params = params.append('obra_like', filtros.obra);
  }
  if (filtros.gestor) {
    params = params.append('gestor_like', filtros.gestor);
  }
  if (filtros.status) {
    params = params.append('status', filtros.status.toUpperCase());
  }
  if (filtros.maiorQue != null) {
    params = params.append('qtd_Marmitas_gte', filtros.maiorQue.toString());
  }
  if (filtros.menorQue != null) {
    params = params.append('qtd_Marmitas_lte', filtros.menorQue.toString());
  }
  return this.http.get<PaginatedResponse<Solicitation>>(`${this.apiUrl}/all`, { params }).pipe(
    tap(responseWithFilteredData => {

        this.ordersSubject.next(responseWithFilteredData.content);
    })
  );
}


fetchPaginated(page: number): Observable<PaginatedResponse<Solicitation>> {

  this.currentPage = page; 
  return this.http.get<PaginatedResponse<Solicitation>>(
    `${this.apiUrl}/all?page=${page}`
  ).pipe(
    tap(item => this.ordersSubject.next(item.content))
  );
}


fetchPaginatedwithURL(url: string, page: number): Observable<PaginatedResponse<Solicitation>> {

  this.currentPage = page; 
  return this.http.get<PaginatedResponse<Solicitation>>(
    `${this.apiUrl}?page=${page}&${url}`
  ).pipe(
    tap(item => this.ordersSubject.next(item.content))
  );
}

getAllOrdenado(orderBy: string, order: 'asc' | 'desc'): Observable<Solicitation[]> {
  return this.http.get<Solicitation[]>(
    `${this.apiUrl}?_sort=${orderBy}&_order=${order}`
  );
}


getByid(id:number){
  return this.http.get<Solicitation>(`${this.apiUrl}/${id}`)
}



  

}
