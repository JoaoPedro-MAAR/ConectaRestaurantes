import { Component, Input } from '@angular/core';
import { input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-card',
  imports: [RouterLink],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {
  obra = input.required<string>();
  gestor = input.required<string>();
  qtdRefeicoes = input.required<string>();
  id = input.required<string>();
}