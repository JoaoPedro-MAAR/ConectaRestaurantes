import { Component, EventEmitter, inject, input, Output, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms'
import { StatusSolicitation } from '../../types';
@Component({
  selector: 'app-filter-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-modal.component.html',
  styleUrl: './filter-modal.component.css'
})
export class FilterModalComponent {
  private formBuilder = inject(FormBuilder);

  isOpen = input.required<boolean>();

  @Output() closeModal = new EventEmitter<void>();
  @Output() filterApplied = new EventEmitter<any>();

  FilterForm = this.formBuilder.group({
    obra: [""],
    gestor: [""],
    maiorQue: [null],
    menorQue: [null],
    status: [null as StatusSolicitation | null],
  });

  private initialForm = {
    obra: "",
    gestor: "",
    maiorQue: null,
    menorQue: null,
    status: null
  };

 handleFilter(): void {
    // Apenas emite os valores do formulário. O pai decide o que fazer.
    this.filterApplied.emit(this.FilterForm.value);
  }

  handleLimpar(): void {
    this.FilterForm.reset(this.initialForm);
    // Emite os valores limpos para o pai atualizar a lista.
    this.filterApplied.emit(this.initialForm);
  }

  // Ao clicar no 'X', avisa o pai que quer fechar.
  requestClose(): void {
    this.closeModal.emit();
  }
}




