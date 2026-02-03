import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { MenuService } from '../services/menu/menu.service';
import { ItemService } from '../services/itens/itens.service';
import { Item } from '../services/itens/model';
import { Menu } from '../services/menu/model';

@Component({
  selector: 'app-menu-visualization',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './menu-visualization.component.html',
  styleUrl: './menu-visualization.component.css'
})
export class MenuVisualizationComponent implements OnInit { 
  private fb = inject(FormBuilder);
  private menuService = inject(MenuService);
  private itemService = inject(ItemService);
  private route = inject(ActivatedRoute); 
  private router = inject(Router);

  menuId: number | null = null;
  isEditMode: boolean = false; 

  menuForm = this.fb.group({
    id: [''],
    nome: ['', Validators.required],
    description: [''],
    categorias: this.fb.array([]) 
  });

  allAvailableItems: Item[] = [];
  
  filteredItems: Item[] = [];
  activeSearchCategoryIndex: number | null = null;

  ngOnInit(): void {
    console.log("Iniciando Menu Component");
    
    this.itemService.findAll().subscribe({
      next: (items) => {
        this.allAvailableItems = items;
      },
      error: (err) => console.error('Erro ao carregar itens:', err)
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam && idParam !== 'new' && !Number.isNaN(Number(idParam))) {
      this.menuId = Number(idParam);
      this.isEditMode = true;
      this.loadMenuData(this.menuId);
    } else {
      this.addCategory();
    }
  }

  get categorias(): FormArray {
    return this.menuForm.get('categorias') as FormArray;
  }

  createCategoryGroup(data?: any): FormGroup {
    return this.fb.group({
      nome: [data?.nome || '', Validators.required],
      limiteMaximoEscolhas: [data?.limiteMaximoEscolhas || 1, [Validators.required, Validators.min(1)]],
      itens: [data?.itens || []],
      isPratoFeitoSection: [false] 
    });
  }

  addCategory(): void {
    this.categorias.push(this.createCategoryGroup());
  }

  removeCategory(index: number): void {
    this.categorias.removeAt(index);
  }

  loadMenuData(id: number) {
    this.menuService.findByid(id).subscribe({
      next: (menu: Menu) => {
        this.menuForm.patchValue({
            id: menu.id?.toString(),
            nome: menu.nome,
            description: menu.descricao
        });

        this.categorias.clear();
        if (menu.categorias && menu.categorias.length > 0) {
            menu.categorias.forEach(cat => {
                this.categorias.push(this.createCategoryGroup({
                    nome: cat.nome,
                    limiteMaximoEscolhas: cat.limiteMaximoEscolhas,
                    itens: (cat as any).itens || [] 
                }));
            });
        }
      },
      error: (err) => alert('Erro ao carregar menu para edição')
    });
  }

  normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); 
  }

  onSearch(event: Event, categoryIndex: number): void {
    const rawValue = (event.target as HTMLInputElement).value;
    this.activeSearchCategoryIndex = categoryIndex;

    const isPfSection = this.categorias.at(categoryIndex).get('isPratoFeitoSection')?.value === true;

    if (!rawValue) {
      this.filteredItems = [];
      return;
    }

    const searchTerm = this.normalizeText(rawValue);
    const currentCategoryItems = this.categorias.at(categoryIndex).get('itens')?.value || [];
    const currentIds = currentCategoryItems.map((x: Item) => x.id);

    this.filteredItems = this.allAvailableItems.filter(item => {
        const tipoCorreto = isPfSection ? (item.isPratoFeito === true) : (!item.isPratoFeito);

        if (!tipoCorreto) return false;

        const nomeNormalizado = this.normalizeText(item.nome);
        const matchesSearch = nomeNormalizado.includes(searchTerm);
        const notAlreadySelected = !currentIds.includes(item.id);

        return matchesSearch && notAlreadySelected;
    });
  }

  selectItem(item: Item, categoryIndex: number, inputRef: HTMLInputElement): void {
    const categoryGroup = this.categorias.at(categoryIndex);
    const currentItems = categoryGroup.get('itens')?.value || [];
    
    categoryGroup.patchValue({
      itens: [...currentItems, item]
    });

    inputRef.value = '';
    this.filteredItems = [];
    this.activeSearchCategoryIndex = null;
  }

  removeItemFromCategory(categoryIndex: number, itemIndex: number): void {
    const categoryGroup = this.categorias.at(categoryIndex);
    const currentItems = categoryGroup.get('itens')?.value || [];
    
    const newItems = currentItems.filter((_: any, i: number) => i !== itemIndex);
    
    categoryGroup.patchValue({ itens: newItems });
  }

  onBlur(): void {
    setTimeout(() => {
      this.activeSearchCategoryIndex = null;
    }, 200);
  }

  saveMenu(): void {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      alert('Preencha todos os campos obrigatórios (Nome do cardápio e Nomes das categorias)');
      return;
    }

    const formVal = this.menuForm.getRawValue(); 

    const menuData: Menu = {
      nome: formVal.nome || '',
      descricao: formVal.description || '',
      ativo: null, 
      categorias: (formVal.categorias || []).map((cat: any) => ({
          nome: cat.nome,
          limiteMaximoEscolhas: cat.limiteMaximoEscolhas,
          itensIds: (cat.itens || []).map((item: Item) => Number(item.id))
      }))
    };

    if (this.isEditMode && this.menuId) {
      alert("Atenção: A edição completa de categorias ainda está em desenvolvimento no servidor.");
    } else {
      this.menuService.create(menuData).subscribe({
        next: () => {
          alert('Menu criado com sucesso!');
          this.router.navigate(['/menu']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao criar menu. Verifique o console.');
        }
      });
    }
  }

  goBack(){
    this.router.navigate(['/menu'])
  }

  clearForm(): void {
    this.menuForm.reset();
    this.categorias.clear();
    this.addCategory(); 
  }

  addPratosFeitosCategory(): void {
    const group = this.fb.group({
      nome: ['Pratos Feitos', Validators.required], 
      limiteMaximoEscolhas: [1, [Validators.required, Validators.min(1)]],
      itens: [[]],
      isPratoFeitoSection: [true] 
    });
    
    group.get('nome')?.disable(); 
    
    this.categorias.push(group);
  }

  
}