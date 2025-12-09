import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RequisicaoService } from '../services/requisicao.service';
import { Solicitation as Order } from '../../types'; // Use o seu tipo Order
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, LowerCasePipe } from '@angular/common';
@Component({
  selector: 'app-order-visualization',
  imports: [RouterLink,AsyncPipe, JsonPipe, LowerCasePipe],
  templateUrl: './order-visualization.component.html',
  styleUrl: './order-visualization.component.css'
})
export class OrderVisualizationComponent implements OnInit {

  order$!: Observable<Order>;

  constructor(
    private route: ActivatedRoute, // Para ler os parâmetros da URL
    private requisicaoService: RequisicaoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.order$ = this.requisicaoService.getByid(id);
    }
  }
}