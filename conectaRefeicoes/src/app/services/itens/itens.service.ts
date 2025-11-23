import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BaseService, baseUrl } from '../InterfaceService';
import { Item } from './model';
import { Observable, tap } from 'rxjs';
import { PaginatedResponse } from '../../../types';
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
  create(object: Item): boolean {
    console.log(object)
    this.http.post<Item>(this.apiUrl, object).subscribe({
      next: () => {
        console.log('Order posted successfully');
        // this.fetchPaginated(this.currentPage).subscribe(); 
        return true
      },
      error: (error) => {
        console.error('Error posting order:', error);
        return false
      }
    });  
    return true
  }
  findAll(){
      return this.http.get<Item>(`${this.apiUrl}`) 
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
