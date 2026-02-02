import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../services/itens/model';
import { ItemService } from '../services/itens/itens.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  private itemService = inject(ItemService);
  private router = inject(Router);

  items$: Observable<Item[]> = this.itemService.items$;
  
  currentPage: number = 0;

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    this.itemService.getPaginated(this.currentPage).subscribe();
  }

  editar(id: number) {
    this.router.navigate(['/itens/editar', id]);
  }

  excluir(id: number) {
    if (confirm('Deseja realmente excluir este item?')) {
      this.itemService.delete(id).subscribe({
        next: () => {
          this.carregarDados();
        },
        error: (err) => console.error('Erro ao excluir', err)
      });
    }
  }

  proximaPagina() {
    this.currentPage++;
    this.carregarDados();
  }

  paginaAnterior() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.carregarDados();
    }
  }
}