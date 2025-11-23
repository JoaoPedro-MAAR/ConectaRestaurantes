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
  create(object: Menu) {
    console.log(object)
    return this.http.post<Menu>(this.apiUrl, object)
  }
  findAll(){
      return this.http.get<Menu>(`${this.apiUrl}`) 
  }

  update(id: number, object: Menu) {
    return this.http.put<Menu>(`${this.apiUrl}/${id}`, object);
  }

  extractData(res: any): Menu[] | null {
    return null
  }



  private apiUrl = `${baseUrl}/menu`;
  private http = inject(HttpClient);
  private menuSubject = new BehaviorSubject<any[]>([]);
  menu$ = this.menuSubject.asObservable();

  

  
}
