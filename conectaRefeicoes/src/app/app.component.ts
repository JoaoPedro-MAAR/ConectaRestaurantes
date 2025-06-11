import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OrderCardComponent } from './order-card/order-card.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, OrderCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'conectaRefeicoes';
List_of_card_order = [
  {
    company: 'Restaurante Sabor Caseiro',
    applicant: 'João Silva',
    number_of_lunchbox: '15'
  },
  {
    company: 'Delícias da Vó',
    applicant: 'Maria Souza',
    number_of_lunchbox: '8'
  },
  {
    company: 'Comida Express',
    applicant: 'Carlos Pereira',
    number_of_lunchbox: '20'
  }
];

} 
