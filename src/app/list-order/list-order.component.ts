import { Component, signal } from '@angular/core';
import {Solicitation, StatusSolicitation} from "../../types"
import { RequisicaoService } from '../services/requisicao.service';
import { first, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {FilterModalComponent } from '../filter-modal/filter-modal.component'
import { RouterLink } from '@angular/router';

@Component({
 selector: 'app-list-order',
 imports: [FilterModalComponent,RouterLink ],
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
   allStatuses: StatusSolicitation[] = ["Recebido", "Em preparo", "Enviado", "Finalizado", "Cancelado"]; 
      
   isFilterOpen = signal(false);
   private currentFilters: any = {};

   constructor(private requisicaoService: RequisicaoService) {
   this.current_page = 0
   this.orders$ = this.requisicaoService.orders$
   this.requisicaoService.fetchPaginated(this.current_page).subscribe(response => { 
   this.total_itens=response.items
   this.total_pages = response.totalPages
   });

  }
    onStatusChange(order: Solicitation, statusValue: string): void {
        const newStatus = statusValue as StatusSolicitation;

        this.requisicaoService.updateOrderStatus(order.id, newStatus).subscribe({
            next: () => {
                order.status = newStatus;
            },
            error: (err) => {
                console.error('Erro ao atualizar status:', err);
                alert('Erro ao atualizar status. Por favor, tente novamente.');
                this.recarregarDados(); 
            }
        });
    }

    nextPage(){
      if (this.current_page != this.total_pages -1 ){       
      this.current_page++
        if(this.currentFilters){
            this.requisicaoService.fetchWithFilterPaginated(this.currentFilters,this.current_page).subscribe()
        }
        else{
          this.requisicaoService.fetchPaginated(this.current_page).subscribe()
        }
      

    }
    }
    prevPage(){
      if (this.current_page != 0){   
        this.current_page--  
        if(this.currentFilters){
            this.requisicaoService.fetchWithFilterPaginated(this.currentFilters,this.current_page).subscribe()
        }
        else{
          this.requisicaoService.fetchPaginated(this.current_page).subscribe()
        }
      

    }
    }


    getCurrentOrders(){
      return (this.orders$)
    }

    toggleFilterModal(): void {
      this.isFilterOpen.set(!this.isFilterOpen());
    }

    handleFilterApplied(filters: any): void {
    this.current_page = 0
    this.currentFilters = filters
    this.requisicaoService.fetchWithFilterPaginated(this.currentFilters).subscribe(response => { 
      this.total_itens=response.items
      this.total_pages = response.totalPages
      }); 
    this.isFilterOpen.set(false); 


  }

deleteOrder(id: number): void {
        this.requisicaoService.delete(id).subscribe(() => {
            console.log(`Pedido com ID ${id} deletado com sucesso!`);
            
            this.recarregarDados();

})
alert(`Pedido com ID ${id} foi deletado com sucesso!`);
}

private recarregarDados(): void {
    if (Object.keys(this.currentFilters).length > 0) {
        this.requisicaoService.fetchWithFilterPaginated(this.currentFilters, this.current_page).subscribe();
    } else {
        this.requisicaoService.fetchPaginated(this.current_page).subscribe();
    }
}
  }    