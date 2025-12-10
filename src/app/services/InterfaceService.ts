import { Observable } from "rxjs"
import { PaginatedResponse } from "../../types";
import { environment } from "../../environments/environment";

export interface BaseService<T>{
    delete(id: number): Observable<T>;
    findByid(id: number): Observable<T>;
    create(object: T): Observable<T>;
    update(id: number, object: T): Observable<T>;
    findAll(): Observable<T>;
    getPaginated?(page: number): Observable<PaginatedResponse<T>>;
    extractData(res: any): T[] | null;
}

export const baseUrl = environment.apiUrl;
