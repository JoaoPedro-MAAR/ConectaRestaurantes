import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormPedido } from '../model/pedido.interface';


@Injectable({
  providedIn: 'root'
})

export class RequisicaoService {
  private apiUrl = 'http://localhost:3000/restaurant_orders';
  private http = inject(HttpClient);
  private ordersChanged = new BehaviorSubject<void>(undefined);


  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  postOrder(order: FormPedido) {
    this.http.post<FormPedido>(this.apiUrl, order).subscribe({
      next: () => {
        this.notifyOrdersChanged();
      },
      error: (error) => {
        console.error('Error posting order:', error);
      }
    });
  }

  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  notifyOrdersChanged() {
    this.ordersChanged.next();
  }

  getOrdersChanged(): Observable<void> {
    return this.ordersChanged.asObservable();
  }
  constructor() { }

  

}
