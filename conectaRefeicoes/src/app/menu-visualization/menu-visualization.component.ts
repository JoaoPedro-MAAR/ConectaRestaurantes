import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MenuService } from '../services/menu/menu.service';
import { ItemService } from '../services/itens/itens.service';
import { Item } from '../services/itens/model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-menu-visualization',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './menu-visualization.component.html',
  styleUrl: './menu-visualization.component.css'
})
export class MenuVisualizationComponent {
  
    private menuService: MenuService = inject(MenuService);
    private itemService = inject(ItemService);

    menuForm = new FormGroup({
      id : new FormControl(''),
      nome: new FormControl(''),
      description: new FormControl(''),
      items : new FormControl(<Item[]>([])),
    });


    allItems$!: Observable<Item[]>;    
    filteredItems: Item[] = [];
    showDropdown: boolean = false;

    constructor() {
      console.log("Iniciando Menu Visualization Component")
      this.allItems$ = this.itemService.items$
      this.itemService.getPaginated().subscribe()
      
      console.log(this.allItems$)

    }

    onSearch(event: Event): void {
      const value = (event.target as HTMLInputElement).value.toLowerCase()
      if (!value){
        this.showDropdown = false;
        return;
      }

      const currentIds = (this.menuForm.controls.items.value || []).map(x => x.id)

      
this.allItems$.subscribe(items => {
    console.log(items)
    this.filteredItems = items.filter(item => 
        item.nome.toLowerCase().includes(value.toLowerCase()) && 
        !currentIds.includes(item.id)
    );
    console.log(this.filteredItems)
    this.showDropdown = true;
    }
)
    }


    selectItem(item: Item, inputRef: HTMLInputElement): void {
      const currentItems = this.menuForm.controls.items.value || [];

      this.menuForm.controls.items.setValue([...currentItems, item])
      inputRef.value = '';
      this.showDropdown = false;
      this.filteredItems = []
    }


    removeItem(index: number): void {
      const currentItems = this.menuForm.controls.items.value || []
      const newItems = currentItems.filter((_, i) => i !== index)
      this.menuForm.controls.items.setValue(newItems)
    }


    saveMenu(): void {
      console.log(this.menuForm.value);
      const menuData = {
        nome: this.menuForm.value.nome || '',
        descricao: this.menuForm.value.description || '',
        itensIds: (this.menuForm.value.items || []).map(item => Number(item.id))
    }
      this.menuService.create(menuData);
  }

    clearForm(): void {
      this.menuForm.reset();
    }

}
