import { Observable } from "rxjs"

export interface BaseService<T>{
    delete(id: number): Observable<T>,
    findByid(id: number): Observable<T>,
    create(object: T): boolean
    findAll(): Observable<T> 
}

export const baseUrl = "http://localhost:8081/conecta-restaurante"