import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { PaginatedResponse } from '../../../types';
import { BaseService, baseUrl } from '../InterfaceService';
import { Item } from './model';
@Injectable({
  providedIn: 'root',
})
export class ItemService implements BaseService<Item> {
  delete(id: number) {
    return this.http.delete<Item>(`${this.apiUrl}/${id}`);
  }
  findByid(id: number) {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }
  create(object: Item) {
    console.log(object)
    return this.http.post<Item>(this.apiUrl, object)
  }
  update(id: number, object: Item) {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, object);
  }
 
  findAll(){
      return this.http.get<Item[]>(`${this.apiUrl}/all`) 
  }

  extractData(res: any): Item[] | null {
    return res.content as Item[] || null
  }

getPaginated(page?: number): Observable<PaginatedResponse<Item>> {
  const url = page != null ? `${this.apiUrl}?page=${page}` : this.apiUrl;
   console.log(this.itemSubject)
   const result = this.http.get<PaginatedResponse<Item>>(url).pipe(
    tap(item => this.itemSubject.next(item.content))
  );
  console.log(result)
  return result 

}






  private apiUrl = `${baseUrl}/item`;
  private http = inject(HttpClient);
  private itemSubject = new BehaviorSubject<any[]>([]);
  items$ = this.itemSubject.asObservable();

  

  
}
