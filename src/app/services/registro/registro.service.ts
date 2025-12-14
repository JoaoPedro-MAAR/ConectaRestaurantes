import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../InterfaceService'; 
import { RegistroRefeicaoDTO, RegistroRefeicaoResponse } from './model';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private http = inject(HttpClient);
  private apiUrl = `${baseUrl}/registros`;

  consultarFuncionario(cpf: string): Observable<RegistroRefeicaoResponse> {
   
    const cpfLimpo = cpf.replace(/\D/g, ''); 
    return this.http.get<RegistroRefeicaoResponse>(`${this.apiUrl}/consultar/${cpfLimpo}`);
  }

  registrar(dto: RegistroRefeicaoDTO): Observable<RegistroRefeicaoResponse> {
    return this.http.post<RegistroRefeicaoResponse>(this.apiUrl, dto);
  }

  listarUltimos(): Observable<RegistroRefeicaoResponse[]> {
    return this.http.get<RegistroRefeicaoResponse[]>(this.apiUrl);
  }
}