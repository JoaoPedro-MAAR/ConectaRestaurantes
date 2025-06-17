import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { RequisicaoService } from '../services/requisicao.service';
import { FormPedido } from '../model/pedido.interface';


@Component({
  selector: 'create-pedido-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.css',
  standalone: true,
})
export class FormComponentComponent {

  private refeicaoFormBuilder = inject(FormBuilder)
  private requisicaoService = inject(RequisicaoService)
  
  refeicaoForm = this.refeicaoFormBuilder.group({
      obra: [""],
      gestor: [""],
      qtd_Marmitas: [0],
      status:["Recebido"]
  })


  handleSubmit() {


    const pedido = this.refeicaoForm.value;
    this.requisicaoService.postOrder(pedido as FormPedido);

  }
};
