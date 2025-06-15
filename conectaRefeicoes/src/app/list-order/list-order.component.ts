import { Component, signal } from '@angular/core';
import {Solicitation} from "./../../types"
import { RequisicaoService } from '../services/requisicao.service';

@Component({
  selector: 'app-list-order',
  imports: [],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css',
  standalone: true,
})
export class ListOrderComponent {
    title = 'Listagem';
    orders = signal<Solicitation[]>([]);
    constructor(private requisicaoService: RequisicaoService) {
      this.loadOrders();

      this.requisicaoService.getOrdersChanged().subscribe(() => {
        this.loadOrders();
      });
    }  

    currentPage = 1;
    itemsPerPage = 10;

    loadOrders() {
      this.requisicaoService.getAll().subscribe((dados: Solicitation[]) => {
        this.orders.set(dados);
      });
    }

    get paginatedOrders() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.orders().slice(start, start + this.itemsPerPage);
    }

    nextPage() {
      if (this.currentPage * this.itemsPerPage < this.orders().length) {
        this.currentPage++;
      }
    }

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
}
