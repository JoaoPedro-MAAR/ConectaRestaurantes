import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-filter-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {

private FilterFormBuilder = inject(FormBuilder)

FilterForm = this.FilterFormBuilder.group({
  obra: [""],
  gestor: [""],
  maiorQue: [0],
  menorQue: [100],
  status:[""]
})
  handleFilter(): void{
    console.log(this.FilterForm.value)
  }
  handleLimpar():void{
    console.log(this.FilterForm.value)
  }

}
