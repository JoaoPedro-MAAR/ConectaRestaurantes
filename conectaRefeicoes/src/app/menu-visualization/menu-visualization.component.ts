import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { MenuService } from '../services/menu/menu.service';

export interface Item{
  id: string;
  name: string;
}


@Component({
  selector: 'app-menu-visualization',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './menu-visualization.component.html',
  styleUrl: './menu-visualization.component.css'
})
export class MenuVisualizationComponent {
  
    private menuService: MenuService = inject(MenuService);

    menuForm = new FormGroup({
      id : new FormControl(''),
      nome: new FormControl(''),
      description: new FormControl(''),
      items : new FormControl(<Item[]>([])),
    });

    allItems : Item[] = [
      {id: '1', name: 'Item 1'},
      {id: '2', name: 'Item 2'},
      {id: '3', name: 'Item 3'},
    ];

    filteredItems: Item[] = [];
    showDropdown: boolean = false;

    onSearch(event: Event): void {
      const value = (event.target as HTMLInputElement).value.toLowerCase()
      if (!value){
        this.showDropdown = false;
        return;
      }

      const currentIds = (this.menuForm.controls.items.value || []).map(x => x.id)

      this.filteredItems = this.allItems.filter(
        item => item.name.toLowerCase().includes(value) && 
        !currentIds.includes(item.id)
      )

      this.showDropdown = true
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
        ItensID: (this.menuForm.value.items || []).map(item => Number(item.id))
    }
      this.menuService.create(menuData);
  }

    clearForm(): void {
      this.menuForm.reset();
    }

}
