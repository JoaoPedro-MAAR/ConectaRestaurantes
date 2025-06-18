import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormPedido } from '../model/pedido.interface';

import { map, tap } from 'rxjs/operators';
import { Solicitation, StatusSolicitation, PaginatedResponse } from '../../types';

@Injectable({
  providedIn: 'root'
})

export class RequisicaoService {
  private apiUrl = 'http://localhost:3000/restaurant_orders';
  private http = inject(HttpClient);
  private ordersSubject = new BehaviorSubject<Solicitation[]>([])
  orders$ = this.ordersSubject.asObservable()
  private currentPage: number = 1;




  constructor() { }


  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
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
    return this.http.get<Solicitation[]>(this.apiUrl).pipe(
      tap( orders => this.ordersSubject.next(orders))
    );
  }

fetchWithFilterPaginated(
  filtros: {
    id?:string;
    obra?: string;
    gestor?: string;
    maiorQue?: number;
    menorQue?: number;
    estado?: StatusSolicitation;
  },
  page:number=1
): Observable<PaginatedResponse<Solicitation>> {
  let params = new HttpParams().set('_page', page);


  if (filtros.id){
    params = params.append('id', filtros.id);
  }
  if (filtros.obra) {
    params = params.append('obra_like', filtros.obra);
  }
  if (filtros.gestor) {
    params = params.append('gestor_like', filtros.gestor);
  }
  if (filtros.estado) {
    params = params.append('status', filtros.estado);
  }
  if (filtros.maiorQue != null) {
    params = params.append('qtd_Marmitas_gte', filtros.maiorQue.toString());
  }
  if (filtros.menorQue != null) {
    params = params.append('qtd_Marmitas_lte', filtros.menorQue.toString());
  }
  return this.http.get<PaginatedResponse<Solicitation>>(this.apiUrl, { params }).pipe(
    tap(responseWithFilteredData => {

        this.ordersSubject.next(responseWithFilteredData.data);
    })
  );
}


fetchPaginated(page: number): Observable<PaginatedResponse<Solicitation>> {

  this.currentPage = page; 
  return this.http.get<PaginatedResponse<Solicitation>>(
    `${this.apiUrl}?_page=${page}`
  ).pipe(
    tap(item => this.ordersSubject.next(item.data))
  );
}


fetchPaginatedwithURL(url: string, page: number): Observable<PaginatedResponse<Solicitation>> {

  this.currentPage = page; 
  return this.http.get<PaginatedResponse<Solicitation>>(
    `${this.apiUrl}?_page=${page}&${url}`
  ).pipe(
    tap(item => this.ordersSubject.next(item.data))
  );
}

getAllOrdenado(orderBy: string, order: 'asc' | 'desc'): Observable<Solicitation[]> {
  return this.http.get<Solicitation[]>(
    `${this.apiUrl}?_sort=${orderBy}&_order=${order}`
  );
}



  

}
