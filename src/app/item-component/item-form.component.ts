import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Item } from '../services/itens/model';
import { ItemService } from '../services/itens/itens.service';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private itemService = inject(ItemService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEdicao = false;
  itemId: number | null = null;

  form = this.fb.group({
    nome: ['', Validators.required],
    categoria: ['', Validators.required] 
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.itemId = +idParam;
      this.isEdicao = true;
      this.carregarItem(this.itemId);
    }
  }

  carregarItem(id: number) {
    this.itemService.findByid(id).subscribe({
      next: (item: Item) => {
        this.form.patchValue({
          nome: item.nome,
          categoria: item.categoria
        });
      },
      error: (err) => console.error('Erro ao carregar item', err)
    });
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const item: Item = this.form.value as Item;

    if (this.isEdicao && this.itemId) {
      this.itemService.update(this.itemId, item).subscribe({
        next: () => {
          alert('Item atualizado com sucesso!');
          this.router.navigate(['/itens']);
        },
        error: (err) => alert('Erro ao atualizar item')
      });
    } else {
      this.itemService.create(item).subscribe({
        next: () => {
          alert('Item criado com sucesso!');
          this.router.navigate(['/itens']);
        },
        error: (err) => alert('Erro ao criar item')
      });
    }
  }
}