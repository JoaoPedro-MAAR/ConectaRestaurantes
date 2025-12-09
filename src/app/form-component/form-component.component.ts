import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
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
  enviado = signal(false);
  refeicaoForm = this.refeicaoFormBuilder.group({
      obra: ["", Validators.required, Validators.minLength(3)],
      gestor: ["", Validators.required, Validators.minLength(3)],
      qtd_Marmitas: [0, [Validators.required, Validators.min(1)]],
      status:["Recebido"]
  })


  handleSubmit() {

    if (this.refeicaoForm.invalid) {
      this.refeicaoForm.markAllAsTouched();
      return;
    }


    const pedido = this.refeicaoForm.value;
    this.requisicaoService.postOrder(pedido as FormPedido);
    this.enviado.set(true);
    this.refeicaoForm.reset();
    setTimeout(() => {
      this.enviado.set(false);
    }, 5000);
  }
};
