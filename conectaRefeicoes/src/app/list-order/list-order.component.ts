import { Component } from '@angular/core';
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
    orders: Solicitation[] = []
    constructor(private requisicaoService: RequisicaoService) {
      this.requisicaoService.getAll().subscribe((dados: Solicitation[]) => {
        this.orders = dados;
      });
    }  

  currentPage = 1;
  itemsPerPage = 10;

  get paginatedOrders() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.orders.slice(start, start + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.orders.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
