import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common'; // Necessários para o HTML
import { RouterLink } from '@angular/router';
import { MenuService } from '../services/menu/menu.service';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink], // Removido FilterModal
  templateUrl: './menu-list-page.component.html',
  styleUrl: './menu-list-page.component.css',
})
export class MenuListPageComponent implements OnInit {

  // Injeção de dependência
  private menuService = inject(MenuService);

  title = 'Listagem de Cardápios';

  total_pages: number = 0;
  total_itens: number = 0;
  current_page: number = 0;
  activeMenu$ = this.menuService.activeMenu$;
  activeMenu: any = null
  menus$ = this.menuService.menu$;

  ngOnInit(): void {
    console.log("Init do List")
    this.loadMenus()
  }

  loadMenus(): void {
    this.menuService.getPaginated(this.current_page).subscribe({
      next: (response: any) => {
        this.total_pages = response.totalPages;
        this.total_itens = response.totalElements || response.items;
      },
      error: (err) => console.error('Erro ao listar menus:', err)
    });

    this.menuService.getActiveMenu().subscribe({
next: (menu) => {
        console.log('CONFIRMAÇÃO: Cardápio Ativo vindo do Back:', menu); 
        
        if (!menu) {
            console.warn('Alerta: Nenhum cardápio ativo encontrado no banco.');
        }
        this.activeMenu = menu
      },
      error: (err) => console.error('Erro ao buscar ativo:', err)
    });
;
    console.log("OI")
    console.log(this.activeMenu$)
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
    this.menuService.deactivateManu().subscribe({
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
}