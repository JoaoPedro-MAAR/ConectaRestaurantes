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