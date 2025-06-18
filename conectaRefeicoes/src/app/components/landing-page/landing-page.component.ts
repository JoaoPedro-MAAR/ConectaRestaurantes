import { Component } from '@angular/core';
import { RequisicaoService } from '../../services/requisicao.service';
import { OrderCardComponent } from '../../order-card/order-card.component';

@Component({
  selector: 'app-landing-page',
  imports: [OrderCardComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
    List_of_card_order: any[] = [];
    constructor(private requisicaoService: RequisicaoService) {
      this.requisicaoService.getAll().subscribe((dados) => {
        this.List_of_card_order = dados;
      });
    }  
  
}
