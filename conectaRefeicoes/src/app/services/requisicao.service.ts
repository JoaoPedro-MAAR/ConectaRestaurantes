import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class RequisicaoService {
  private apiUrl = 'http://localhost:3000/restaurant_orders';
  private http = inject(HttpClient);

  getAll(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  constructor() { }

  

}
