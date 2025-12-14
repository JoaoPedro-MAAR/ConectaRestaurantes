import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MenuFilters {
  id?: string;
  nome?: string;
  descricao?: string;
  turnoPadrao?: 'CAFE_DA_MANHA' | 'ALMOCO' | 'JANTAR' | '';
}

@Component({
  selector: 'app-menu-filter-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './menu-filter-modal.component.html',
  styleUrl: './menu-filter-modal.component.css'
})
export class MenuFilterModalComponent {
  @Input() isOpen: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() filterApplied = new EventEmitter<MenuFilters>();

  filters: MenuFilters = {
    id: '',
    nome: '',
    descricao: '',
    turnoPadrao: ''
  };

  applyFilters(): void {
    const activeFilters: MenuFilters = {};
    
    if (this.filters.id?.trim()) {
      activeFilters.id = this.filters.id.trim();
    }
    if (this.filters.nome?.trim()) {
      activeFilters.nome = this.filters.nome.trim();
    }
    if (this.filters.descricao?.trim()) {
      activeFilters.descricao = this.filters.descricao.trim();
    }
    if (this.filters.turnoPadrao) {
      activeFilters.turnoPadrao = this.filters.turnoPadrao;
    }

    this.filterApplied.emit(activeFilters);
    this.close();
  }

  clearFilters(): void {
    this.filters = {
      id: '',
      nome: '',
      descricao: '',
      turnoPadrao: ''
    };
    this.filterApplied.emit({});
    this.close();
  }

  close(): void {
    this.closeModal.emit();
  }
}
