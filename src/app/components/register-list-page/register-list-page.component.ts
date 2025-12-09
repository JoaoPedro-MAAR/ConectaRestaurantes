import { Component } from '@angular/core';
import { FormComponentComponent } from '../../form-component/form-component.component';
import { ListOrderComponent } from '../../list-order/list-order.component';

@Component({
  selector: 'app-register-list-page',
  imports: [FormComponentComponent,ListOrderComponent],
  templateUrl: './register-list-page.component.html',
  styleUrl: './register-list-page.component.css'
})
export class RegisterListPageComponent {

}
