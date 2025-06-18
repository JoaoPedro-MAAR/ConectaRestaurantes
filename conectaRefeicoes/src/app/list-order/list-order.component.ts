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
      params: string[] = [];
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

    }

    nextPage(){
      if (this.current_page != this.total_pages){       
      this.current_page++
        if(this.currentFilters){
            // this.requisicaoService.fetchPaginatedwithURL(pre_url,this.current_page).subscribe()
            this.requisicaoService.fetchWithFilterPaginated(this.currentFilters,this.current_page).subscribe()
        }
        else{
          this.requisicaoService.fetchPaginated(this.current_page).subscribe()
        }
      

    }
    }
    prevPage(){
      if (this.current_page != 1){   
        this.current_page--  
        if(this.currentFilters){
            this.requisicaoService.fetchWithFilterPaginated(this.currentFilters,this.current_page).subscribe()
        }
        else{
          this.requisicaoService.fetchPaginated(this.current_page).subscribe()
        }
      

    }
    }

    private currentFilterToURLString(filters:any){
      return Object.entries(filters)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    }

    getCurrentOrders(){
      return (this.orders$)
    }

    toggleFilterModal(): void {
      this.isFilterOpen.set(!this.isFilterOpen());
    }

    handleFilterApplied(filters: any): void {
    this.current_page = 1
    this.currentFilters = filters
    this.requisicaoService.fetchWithFilterPaginated(this.currentFilters).subscribe(response => { 
      this.total_itens=response.items
      this.total_pages = response.pages
      }); 
    this.isFilterOpen.set(false); 


  }
  }    