import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'


@Component({
  selector: 'create-pedido-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form-component.component.html',
  styleUrl: './form-component.component.css',
  standalone: true,
})
export class FormComponentComponent {

  private refeicaoFormBuilder = inject(FormBuilder)
  
  refeicaoForm = this.refeicaoFormBuilder.group({
      obra: [""],
      gestor: [""],
      qtdRefeicoes: [0]
  })

  handleSubmit():void {
    console.log(this.refeicaoForm.value);
  }
};
