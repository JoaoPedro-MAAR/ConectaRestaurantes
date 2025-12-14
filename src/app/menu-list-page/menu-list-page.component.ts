import { Component, inject, OnInit, signal } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';
import { MenuService } from '../services/menu/menu.service';
import { MenuFilterModalComponent } from './menu-filter-modal/menu-filter-modal.component';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, MenuFilterModalComponent], 
  templateUrl: './menu-list-page.component.html',
  styleUrl: './menu-list-page.component.css',
})
export class MenuListPageComponent implements OnInit {

  private menuService = inject(MenuService);

  title = 'Listagem de Cardápios';

  total_pages: number = 0;
  total_itens: number = 0;
  current_page: number = 0;
  activeMenu$ = this.menuService.activeMenu$;
  activeMenu: any = null
  menus$ = this.menuService.menu$;
  isFilterOpen = signal(false);
  currentFilters: any = {};

  // Variáveis do Modal
  showStandardModal: boolean = false;
  selectedMenuForStandard: any = null;

  ngOnInit(): void {
    console.log("Init do List")
    this.loadMenus()
  }

  loadMenus(): void {
    const request = Object.keys(this.currentFilters).length > 0 
      ? this.menuService.getPaginatedWithFilter(this.currentFilters, this.current_page)
      : this.menuService.getPaginated(this.current_page);

    request.subscribe({
      next: (response: any) => {
        this.total_pages = response.totalPages;
        this.total_itens = response.totalElements || response.items;
      },
      error: (err) => console.error('Erro ao listar menus:', err)
    });

    this.menuService.getActiveMenu().subscribe({
      next: (menu) => {
        if (!menu) {
            console.warn('Alerta: Nenhum cardápio ativo encontrado no banco.');
        }
        this.activeMenu = menu
      },
      error: (err) => console.error('Erro ao buscar ativo:', err)
    });
  }

  nextPage(): void {
    if (this.current_page < this.total_pages - 1) {
      this.current_page++;
      this.loadMenus();
    }
  }

  prevPage(): void {
    if (this.current_page > 0) {
      this.current_page--;
      this.loadMenus();
    }
  }

  onPublish(menuParaAtivar: any): void {
    if (this.activeMenu && this.activeMenu.id === menuParaAtivar.id) {
      alert('Este cardápio já está ativo!');
      return;
    }
    if (this.activeMenu) {
      const confirmacao = confirm(
        `ATENÇÃO: O cardápio "${this.activeMenu.nome}" está ativo atualmente.\n\n` +
        `Deseja desativá-lo e ativar o "${menuParaAtivar.nome}"?`
      );
      if (!confirmacao) return;
    }

    this.menuService.activateMenu(menuParaAtivar.id).subscribe({
      next: () => {
        alert(`Sucesso! O cardápio "${menuParaAtivar.nome}" agora é o ativo.`);
        this.loadMenus(); 
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao ativar o cardápio.');
      }
    });
  }

  onUnpublish(): void{
     const confirmacao = confirm(
        `ATENÇÃO: O cardápio "${this.activeMenu.nome}" está ativo atualmente.\n\n` +
        `Deseja desativá-lo"?`
      );

      if (!confirmacao) return;
    this.menuService.deactivateMenu().subscribe({
      next: () => {
        alert(`Sucesso! O cardapio foi desativado`)
        this.loadMenus()
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao desativar o cardápio.');
      }
    })
  }

  deleteMenu(id: number): void {
    if (!confirm(`Tem certeza que deseja deletar o menu ID ${id}?`)) {
      return;
    }
    this.menuService.delete(id).subscribe({
      next: () => {
        alert(`Menu com ID ${id} foi deletado com sucesso!`);
        this.loadMenus();
      },
      error: (err) => {
        console.error(err);
        alert('Ocorreu um erro ao tentar deletar o menu.');
      }
    });
  }


  openStandardModal(menu: any): void {
    this.selectedMenuForStandard = menu;
    this.showStandardModal = true;
  }

  closeStandardModal(): void {
    this.showStandardModal = false;
    this.selectedMenuForStandard = null;
  }

  confirmSetStandard(turno: string): void {
    if (!this.selectedMenuForStandard) return;

    this.menuService.setStandardMenu(this.selectedMenuForStandard.id, turno).subscribe({
        next: () => {
            alert(`Cardápio definido como padrão para ${this.formatTurno(turno)}!`);
            this.closeStandardModal();
            this.loadMenus(); 
        },
        error: (err) => alert('Erro ao definir padrão.')
    });
  }

  confirmRemoveStandard(): void {
    if (!this.selectedMenuForStandard) return;
    if(!confirm('Remover status de padrão deste cardápio?')) return;

    this.menuService.removeStandardMenu(this.selectedMenuForStandard.id).subscribe({
        next: () => {
            alert('Removido dos padrões.');
            this.closeStandardModal();
            this.loadMenus();
        },
        error: (err) => alert('Erro ao remover padrão.')
    });
  }

  formatTurno(turno: string): string {
    switch(turno) {
        case 'CAFE_DA_MANHA': return 'Café';
        case 'ALMOCO': return 'Almoço';
        case 'JANTAR': return 'Jantar';
        default: return turno;
    }
  }

  toggleFilterModal(): void {
      this.isFilterOpen.set(!this.isFilterOpen());
      console.log("Toggled Filter Modal. Now open:", this.isFilterOpen());
    }

  closeFilterModal(): void {
    this.isFilterOpen.set(false);
  }

  handleFilterApplied(filters: any): void {
    console.log('Filtros aplicados:', filters);
    this.current_page = 0;
    this.currentFilters = filters;
    this.loadMenus();
    this.isFilterOpen.set(false); 
  }
  
  clearFilters(): void {
    this.current_page = 0;
    this.currentFilters = {};
    this.loadMenus();
    this.isFilterOpen.set(false); 
  }
}