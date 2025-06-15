import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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



  constructor() { }


  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  fetchAll(): Observable<Solicitation[]> {
    return this.http.get<Solicitation[]>(this.apiUrl).pipe(
      tap( orders => this.ordersSubject.next(orders))
    );
  }

  fetchWithFilter(
        filtros: {obra?: string; gestor?: string; 
        maiorQue? :number, menorQue?:number,
        estado?:StatusSolicitation}){
          let parametros_url = []
          if (filtros.obra){
            parametros_url.push(`obra_like=${filtros.obra}`)
          }
          if (filtros.gestor){
            parametros_url.push(`gestor_like=${filtros.gestor}`)
          }
          if (filtros.estado){
            parametros_url.push(`status=${filtros.estado}`)
          } 
          const url_com_params = `${this.apiUrl}?${parametros_url.join('&')}`        
          return this.http.get<Solicitation[]>(url_com_params).pipe(
              map(orders => orders.filter(o =>
                (filtros.maiorQue == null || o.qtd_Marmitas > filtros.maiorQue) &&
                (filtros.menorQue == null || o.qtd_Marmitas < filtros.menorQue)
              )),
              tap(filteredOrders => this.ordersSubject.next(filteredOrders))
            );
        }


fetchPaginated(page: number): Observable<PaginatedResponse<Solicitation>> {
  return this.http.get<PaginatedResponse<Solicitation>>(
    `${this.apiUrl}?_page=${page}`
  ).pipe(
    tap(item => this.ordersSubject.next(item.data))
  );
}

getAllOrdenado(orderBy: string, order: 'asc' | 'desc'): Observable<Solicitation[]> {
  return this.http.get<Solicitation[]>(
    `${this.apiUrl}?_sort=${orderBy}&_order=${order}`
  );
}


getAllWithFilter(filter: { obra?: string; gestor?: string; maiorQue?: number; menorQue?: number, status?: StatusSolicitation }): Observable<Solicitation[]> {
  return this.http.get<Solicitation[]>(this.apiUrl).pipe(
    map(solicitations =>
      solicitations.filter(solicitacao => {
        const matchObra = !filter.obra || solicitacao.obra.toLowerCase().includes(filter.obra.toLowerCase());
        const matchGestor = !filter.gestor || solicitacao.gestor.toLowerCase().includes(filter.gestor.toLowerCase());
        const matchMaior = filter.maiorQue == null || solicitacao.qtd_Marmitas > filter.maiorQue;
        const matchMenor = filter.menorQue == null || solicitacao.qtd_Marmitas < filter.menorQue;
        const matchStatus = !filter.status || solicitacao.status === filter.status;
        return matchObra && matchGestor && matchMaior && matchMenor && matchStatus;
      })
    )
  );
}
  

}
