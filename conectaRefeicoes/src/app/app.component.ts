import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderCardComponent } from './order-card/order-card.component';
import { RequisicaoService } from './services/requisicao.service';
import { FormComponentComponent } from './form-component/form-component.component'
import {ListOrderComponent} from './list-order/list-order.component'
import {FilterModalComponent} from './filter-modal/filter-modal.component'


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, OrderCardComponent, FormComponentComponent, ListOrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
 export class AppComponent {
  title = 'conectaRefeicoes';
   List_of_card_order: any[] = [];
  constructor(private requisicaoService: RequisicaoService) {
    this.requisicaoService.getAll().subscribe((dados) => {
      this.List_of_card_order = dados;
    });
  }  

  ola() {
    console.log("Ola mundo")
    
  }

/* List_of_card_order = [
  {
    obra: 'Restaurante Sabor Caseiro',
    gestor: 'João Silva',
    qtdRefeicoes: '15'
  },
  {
    obra: 'Delícias da Vó',
    gestor: 'Maria Souza',
    qtdRefeicoes: '8'
  },
  {
    obra: 'Comida Express',
    gestor: 'Carlos Pereira',
    qtdRefeicoes: '20'
  }
]; */

} 
