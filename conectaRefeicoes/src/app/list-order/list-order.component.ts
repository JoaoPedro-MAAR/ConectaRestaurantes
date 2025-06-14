import { Component, signal } from '@angular/core';
import {Solicitation} from "./../../types"
import { RequisicaoService } from '../services/requisicao.service';
import { first, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {FilterModalComponent } from '../filter-modal/filter-modal.component'

@Component({
  selector: 'app-list-order',
  imports: [AsyncPipe,FilterModalComponent ],
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css',
  standalone: true,
})
export class ListOrderComponent {
    title = 'Listagem';
      total_pages!: number;
      total_itens!: number;
      current_page: number;
      orders$: any;

      isFilterOpen = signal(false);
      private currentFilters: any = {};

      constructor(private requisicaoService: RequisicaoService) {
      this.current_page = 1
      this.orders$ = this.requisicaoService.orders$
      this.requisicaoService.fetchPaginated(this.current_page).subscribe(response => { 
      this.total_itens=response.items
      this.total_pages = response.pages
      });
      console.log(this.orders$) 

    }

    nextPage(){
      if (this.current_page != this.total_pages){       
      this.current_page++
      this.requisicaoService.fetchPaginated(this.current_page).subscribe();

    }
    }
    prevPage(){
      if (this.current_page != 1){      
      this.current_page--
      this.requisicaoService.fetchPaginated(this.current_page).subscribe();

    }
    }

    getCurrentOrders(){
      return (this.orders$)
    }

    toggleFilterModal(): void {
      this.isFilterOpen.set(!this.isFilterOpen());
    }

    handleFilterApplied(filters: any): void {
    console.log('Pai recebeu os filtros:', filters);
    this.current_page = 1; // Sempre volta para a página 1 ao aplicar um novo filtro
    this.currentFilters = filters; // Armazena os novos filtros
    this.requisicaoService.fetchWithFilterPaginated(this.currentFilters).subscribe(); // Busca os dados com base nos novos filtros
    this.isFilterOpen.set(false); // Fecha o modal
  }
  }
