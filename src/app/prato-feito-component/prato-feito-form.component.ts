import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ItemService } from '../services/itens/itens.service';
import { Item } from '../services/itens/model';

@Component({
  selector: 'app-prato-feito-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="form-wrapper">
      
      <div class="header-form">
        <h1>Novo Prato Feito</h1>
      </div>

      <form [formGroup]="form" (ngSubmit)="salvar()">
        
        <div class="card-section">
          <h3>Dados do Prato</h3>
          
          <div class="form-group">
            <label for="nome">Nome do Prato <span class="text-danger">*</span></label>
            <input 
                id="nome" 
                type="text" 
                formControlName="nome" 
                placeholder="Ex: Executivo de Frango"
                [class.invalid-border]="form.get('nome')?.invalid && form.get('nome')?.touched"
            >
            <small class="error-message" *ngIf="form.get('nome')?.invalid && form.get('nome')?.touched">
                Nome obrigatório.
            </small>
          </div>

          <div class="divider"></div>

          <div class="form-group position-relative">
            <label>Composição do Prato (Busque e adicione): <span class="text-danger">*</span></label>
            
            <input 
                #inputSearch
                type="text" 
                placeholder="Digite para buscar itens (ex: Arroz, Feijão)..." 
                (input)="onSearch($event)"
                (blur)="onBlur()"
                autocomplete="off"
            >

            <div class="tag-container">
                <div *ngFor="let item of selectedItems; let i = index" class="tag">
                    <span>{{ item.nome }}</span>
                    <span class="remove-btn" (click)="removeItem(i)">&times;</span>
                </div>
                <div *ngIf="selectedItems.length === 0" class="empty-tags">
                    Nenhum item adicionado à composição ainda.
                </div>
            </div>

            <ul *ngIf="filteredItems.length > 0" class="dropdown-list">
                <li 
                    *ngFor="let option of filteredItems" 
                    (mousedown)="selectItem(option, inputSearch)"
                >
                    {{ option.nome }} <small>({{ option.categoria }})</small>
                </li>
            </ul>
            
            <small class="info-text" *ngIf="selectedItems.length > 0">
               {{ selectedItems.length }} item(s) selecionado(s).
            </small>
          </div>

        </div>

        <div class="button-group sticky-footer">
            <button type="button" class="btn-back" routerLink="/pratos-feitos">Cancelar</button>
            <button type="submit" class="btn-save">Salvar Prato</button>
        </div>

      </form>
    </div>
  `,
  styleUrls: ['../prato-feito-component/prato-feito-form.component.css']
})
export class PratoFeitoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private itemService = inject(ItemService);
  private router = inject(Router);

  allItems: Item[] = [];      // Todos os itens do banco (cache)
  filteredItems: Item[] = []; // Itens filtrados pela busca
  selectedItems: Item[] = []; // Itens já selecionados (tags)

  form = this.fb.group({
    nome: ['', Validators.required]
  });

  ngOnInit() {
    this.itemService.findAll().subscribe(itens => {
        // Carrega itens, excluindo pratos feitos (para evitar Prato dentro de Prato)
        this.allItems = itens.filter(i => !i.isPratoFeito); 
    });
  }

  normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); 
  }

  onSearch(event: Event): void {
    const rawValue = (event.target as HTMLInputElement).value;
    
    if (!rawValue) {
      this.filteredItems = [];
      return;
    }

    const searchTerm = this.normalizeText(rawValue);
    
    // Pega os IDs já selecionados para não mostrar no dropdown
    const selectedIds = this.selectedItems.map(i => i.id);

    this.filteredItems = this.allItems.filter(item => {
        const nomeNormalizado = this.normalizeText(item.nome);
        const matchesSearch = nomeNormalizado.includes(searchTerm);
        const notSelected = !selectedIds.includes(item.id);

        return matchesSearch && notSelected;
    });
  }

  selectItem(item: Item, inputRef: HTMLInputElement): void {
    this.selectedItems.push(item);
    
    // Limpa busca e input
    this.filteredItems = [];
    inputRef.value = '';
  }

  removeItem(index: number): void {
    this.selectedItems.splice(index, 1);
  }

  onBlur(): void {
    setTimeout(() => {
      this.filteredItems = [];
    }, 200);
  }

  salvar() {
    if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    if (this.selectedItems.length === 0) {
        alert('Adicione pelo menos um item à composição do prato.');
        return;
    }
    
    // Extrai apenas os IDs para enviar ao backend
    const idsParaSalvar = this.selectedItems.map(i => i.id!);

    this.itemService.createPratoFeito(this.form.value.nome!, idsParaSalvar).subscribe({
        next: () => {
            alert('Prato Feito criado com sucesso!');
            this.router.navigate(['/pratos-feitos']);
        },
        error: (err) => alert('Erro ao criar.')
    });
  }
}