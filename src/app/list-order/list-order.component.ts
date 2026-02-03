import { Component, signal, inject } from '@angular/core';
import { Solicitation, StatusSolicitation } from "../../types";
import { RequisicaoService } from '../services/requisicao.service';
import { AsyncPipe, CommonModule } from '@angular/common'; // <--- 1. IMPORTAR AQUI
import { FilterModalComponent } from '../filter-modal/filter-modal.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-order',
  standalone: true,
  imports: [FilterModalComponent, RouterLink, AsyncPipe, CommonModule], // <--- 2. ADICIONAR AQUI
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css',
})
export class ListOrderComponent {
  
  private requisicaoService = inject(RequisicaoService);

  title = 'Listagem';
  
  // Inicializamos com valores padrão
  total_pages: number = 1; 
  total_itens: number = 0;
  current_page: number = 0;
  
  // Usamos observable direto do serviço
  orders$ = this.requisicaoService.orders$;
  
  allStatuses: StatusSolicitation[] = ["Recebido", "Em preparo", "Enviado", "Finalizado", "Cancelado"]; 
  isFilterOpen = signal(false);
  private currentFilters: any = {};

  constructor() {
    this.carregarDados();
  }

  carregarDados() {
    const temFiltro = this.currentFilters && Object.values(this.currentFilters).some(v => v !== null && v !== '');

    const request$ = temFiltro
      ? this.requisicaoService.fetchWithFilterPaginated(this.currentFilters, this.current_page)
      : this.requisicaoService.fetchPaginated(this.current_page);

    request$.subscribe({
      next: (response: any) => {
        console.log("Dados recebidos:", response); // Debug

        // Mapeamento à prova de falhas
        if (response) {
            this.total_itens = response.totalElements ?? response.items ?? 0;
            this.total_pages = response.totalPages ?? 1;
        }
      },
      error: (err) => console.error('Erro ao carregar:', err)
    });
  }

  onStatusChange(order: Solicitation, statusValue: string): void {
    const newStatus = statusValue as StatusSolicitation;
    this.requisicaoService.updateOrderStatus(order.id, newStatus).subscribe({
      next: () => { order.status = newStatus; },
      error: () => { alert('Erro ao atualizar status.'); this.carregarDados(); }
    });
  }

  nextPage() {
    if (this.current_page < this.total_pages - 1) {       
      this.current_page++;
      this.carregarDados();
    }
  }

  prevPage() {
    if (this.current_page > 0) {   
      this.current_page--;  
      this.carregarDados();
    }
  }

  toggleFilterModal(): void { this.isFilterOpen.set(!this.isFilterOpen()); }

  handleFilterApplied(filters: any): void {
    this.current_page = 0;
    this.currentFilters = filters;
    this.carregarDados();
    this.isFilterOpen.set(false); 
  }

  deleteOrder(id: number): void {
    if(confirm(`Tem certeza que deseja excluir o pedido #${id}?`)) {
      this.requisicaoService.delete(id).subscribe(() => {
        alert('Deletado com sucesso!');
        this.carregarDados();
      });
    }
  }
}