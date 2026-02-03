import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PedidoService, PedidoDetalhado } from '../services/pedido/pedido.service';

@Component({
  selector: 'app-solicitacao-pedidos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './solicitacao-pedidos.component.html',
  styleUrl: './solicitacao-pedidos.component.css'
})
export class SolicitacaoPedidosComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pedidoService = inject(PedidoService);

  listaPedidos: PedidoDetalhado[] = [];
  idSolicitacao: number | null = null;
  isLoading = true;

  // Variáveis de Paginação
  currentPage: number = 0;
  totalPages: number = 0;
  totalItems: number = 0;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idSolicitacao = Number(idParam);
      this.carregarPedidos(this.idSolicitacao, 0); // Começa na página 0
    }
  }

  carregarPedidos(id: number, page: number) {
    this.isLoading = true;
    this.pedidoService.getPedidosPorSolicitacao(id, page).subscribe({
      next: (dados) => {
        // O Spring retorna 'content' com a lista e metadados de página
        this.listaPedidos = dados.content; 
        this.totalPages = dados.totalPages;
        this.totalItems = dados.items || dados.totalElements; // Depende de como seu PaginatedResponse mapeia
        this.currentPage = page;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  // Controles de Navegação
  nextPage() {
    if (this.idSolicitacao && this.currentPage < this.totalPages - 1) {
      this.carregarPedidos(this.idSolicitacao, this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.idSolicitacao && this.currentPage > 0) {
      this.carregarPedidos(this.idSolicitacao, this.currentPage - 1);
    }
  }


  // Helper para formatar lista de itens numa string bonita
  formatarItens(itens: any[]): string {
    if (!itens || itens.length === 0) return '-';
    return itens.map(i => i.nome).join(', ');
  }
}