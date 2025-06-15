import { Component } from '@angular/core';
import {Solicitation} from "./../../types"
import { RequisicaoService } from '../services/requisicao.service';
import { first, map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-list-order',
  imports: [AsyncPipe],
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


    
  }
