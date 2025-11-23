import { Observable } from "rxjs"
import { PaginatedResponse } from "../../types";

export interface BaseService<T>{
    delete(id: number): Observable<T>;
    findByid(id: number): Observable<T>;
    create(object: T): boolean;
    findAll(): Observable<T>;
    getPaginated?(page: number): Observable<PaginatedResponse<T>>;
    extractData(res: any): T[] | null;
}

export const baseUrl = "http://localhost:8081/conecta-restaurante"