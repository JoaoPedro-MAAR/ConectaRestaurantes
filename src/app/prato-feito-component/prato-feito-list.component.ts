import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ItemService } from '../services/itens/itens.service';
import { Item } from '../services/itens/model';

@Component({
  selector: 'app-prato-feito-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h2>Gerenciar Pratos Feitos</h2>
        <div class="d-flex gap-2">
            <button class="btn btn-secondary" routerLink="/itens" style="margin-right: 10px;">Voltar para Itens</button>
            <button class="btn btn-primary" routerLink="/pratos-feitos/novo">Novo Prato Feito</button>
        </div>
      </div>

      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Composição</th>
            <th class="text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let pf of pratosFeitos">
            <td>{{ pf.id }}</td>
            <td>{{ pf.nome }}</td>
            <td>
                <span *ngFor="let item of pf.composicao; let last = last">
                    {{ item.nome }}<span *ngIf="!last">, </span>
                </span>
            </td>
            <td class="text-end">
              <button class="btn btn-sm btn-outline-danger" (click)="excluir(pf.id!)">Excluir</button>
            </td>
          </tr>
          <tr *ngIf="pratosFeitos.length === 0">
            <td colspan="4" class="text-center">Nenhum prato feito cadastrado.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrls: ['../item-component/item-list.component.css'] 
})
export class PratoFeitoListComponent implements OnInit {
  private itemService = inject(ItemService);
  pratosFeitos: Item[] = [];

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    this.itemService.getPratosFeitos().subscribe(data => this.pratosFeitos = data);
  }

  excluir(id: number) {
    if (confirm('Excluir este prato feito?')) {
      this.itemService.delete(id).subscribe(() => this.carregarDados());
    }
  }
}