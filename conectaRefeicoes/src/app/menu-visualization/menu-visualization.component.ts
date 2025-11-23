import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'; 
import { MenuService } from '../services/menu/menu.service';
import { ItemService } from '../services/itens/itens.service';
import { Item } from '../services/itens/model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-visualization',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './menu-visualization.component.html',
  styleUrl: './menu-visualization.component.css'
})
export class MenuVisualizationComponent implements OnInit { 
  private menuService = inject(MenuService);
  private itemService = inject(ItemService);
  private route = inject(ActivatedRoute); 
  private originalMenuState: any = null;
  private router = inject(Router)

  menuId: number | null = null;
  isEditMode: boolean = false; 

  menuForm = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl(''),
    description: new FormControl(''),
    items: new FormControl(<Item[]>([])),
  });

  allItems$!: Observable<Item[]>;
  filteredItems: Item[] = [];
  showDropdown: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    console.log("Iniciando Menu Component");
    
    this.allItems$ = this.itemService.items$;
    this.itemService.getPaginated().subscribe();


    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam && !Number.isNaN(Number(idParam))) {
      this.menuId = Number(idParam);
      this.isEditMode = true;
      this.loadMenuData(this.menuId);
    }
  }

  loadMenuData(id: number) {
    this.menuService.findByid(id).subscribe({
      next: (menu: any) => {
    const formData = {
              id: menu.id,
              nome: menu.nome,
              description: menu.descricao, 
              items: menu.itens || []
            };
            this.originalMenuState = formData; 
            this.menuForm.patchValue(formData);
          },
      error: (err) => alert('Erro ao carregar menu para edição')
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    if (!value) {
      this.showDropdown = false;
      return;
    }

    const currentIds = (this.menuForm.controls.items.value || []).map(x => x.id);

    this.allItems$.subscribe(items => {
      this.filteredItems = items.filter(item =>
        item.nome.toLowerCase().includes(value.toLowerCase()) &&
        !currentIds.includes(item.id)
      );
      this.showDropdown = true;
    });
  }

  selectItem(item: Item, inputRef: HTMLInputElement): void {
    const currentItems = this.menuForm.controls.items.value || [];
    this.menuForm.controls.items.setValue([...currentItems, item]);
    inputRef.value = '';
    this.showDropdown = false;
    this.filteredItems = [];
  }

  removeItem(index: number): void {
    const currentItems = this.menuForm.controls.items.value || [];
    const newItems = currentItems.filter((_, i) => i !== index);
    this.menuForm.controls.items.setValue(newItems);
  }

  saveMenu(): void {
    const menuData = {
      nome: this.menuForm.value.nome || '',
      descricao: this.menuForm.value.description || '',
      itensIds: (this.menuForm.value.items || []).map(item => Number(item.id))
    };

    if (this.isEditMode && this.menuId) {
      this.menuService.update(this.menuId, menuData).subscribe({
        next: () => alert('Menu atualizado com sucesso!'),
        error: (err) => alert('Erro ao atualizar.')
      });
    } else {
      this.menuService.create(menuData).subscribe({
        next: () => {
          alert('Menu criado com sucesso!');
          this.clearForm();
        },
        error: (err) => alert('Erro ao criar.')
      });
    }
    this.router.navigate(['/menu'])
  }

  goBack(){
    this.router.navigate(['/menu'])
  }

clearForm(): void {
    if (this.isEditMode && this.originalMenuState) {
      this.menuForm.reset(this.originalMenuState);
    } else {
      this.menuForm.reset();
      
      this.menuForm.controls.items.setValue([]); 
    }
  }
  
}