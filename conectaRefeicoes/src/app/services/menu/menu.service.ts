import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { BaseService, baseUrl } from '../InterfaceService';
import { Menu } from './model';
@Injectable({
  providedIn: 'root',
})
export class MenuService implements BaseService<Menu> {
  delete(id: number) {
    return this.http.delete<Menu>(`${this.apiUrl}/${id}`);
  }
  findByid(id: number) {
    return this.http.get<Menu>(`${this.apiUrl}/${id}`);
  }
  create(object: Menu): boolean {
    console.log(object)
    this.http.post<Menu>(this.apiUrl, object).subscribe({
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
      return this.http.get<Menu>(`${this.apiUrl}`) 
  }

  extractData(res: any): Menu[] | null {
    return null
  }



  private apiUrl = `${baseUrl}/menu`;
  private http = inject(HttpClient);
  private menuSubject = new BehaviorSubject<any[]>([]);
  menu$ = this.menuSubject.asObservable();

  

  
}
