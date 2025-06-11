import { Component, Input } from '@angular/core';
import { input } from '@angular/core';

@Component({
  selector: 'app-order-card',
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.css'
})
export class OrderCardComponent {
  company = input.required<string>();
  applicant = input.required<string>();
  number_of_lunchbox = input.required<string>();



}