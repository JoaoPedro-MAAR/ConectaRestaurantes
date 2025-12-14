import { CommonModule } from '@angular/common';
import { Component, inject, OnInit  } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroRefeicaoDTO } from '../services/registro/model';
import { RegistroService } from '../services/registro/registro.service';
import { RegistroRefeicaoResponse } from '../services/registro/model';

@Component({
  selector: 'app-registro-presencial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-presencial.component.html',
  styleUrl: './registro-presencial.component.css'
})
export class RegistroPresencialComponent implements OnInit {
  
  private fb = inject(FormBuilder);
  private registroService = inject(RegistroService);

  ultimosRegistros: RegistroRefeicaoResponse[] = [];

  ngOnInit(): void {
    this.carregarUltimos();
  }

  carregarUltimos(): void {
    this.registroService.listarUltimos().subscribe({
      next: (lista) => this.ultimosRegistros = lista,
      error: (err) => console.error('Erro ao carregar lista', err)
    });
  }

  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  form = this.fb.group({
    turno: ['', Validators.required],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    
    nomeFuncionario: [{value: '', disabled: true}], 
    nomeEmpresa: [{value: '', disabled: true}]
  });

  buscarFuncionario(): void {
    const cpf = this.form.get('cpf')?.value;
    
    if (!cpf || cpf.length < 11) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.form.patchValue({ nomeFuncionario: '', nomeEmpresa: '' });

    this.registroService.consultarFuncionario(cpf).subscribe({
      next: (dados) => {
        this.isLoading = false;
        this.form.patchValue({
          nomeFuncionario: dados.nomeFuncionario,
          nomeEmpresa: dados.nome
        });
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        this.errorMessage = 'Funcionário não encontrado ou CPF inválido.';
      }
    });
  }

  confirmarRegistro(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.form.get('nomeFuncionario')?.value) {
      this.errorMessage = "Por favor, verifique o CPF antes de registrar.";
      return;
    }

    const dadosEnvio: RegistroRefeicaoDTO = {
      cpfFuncionario: this.form.get('cpf')?.value || '',
      turno: this.form.get('turno')?.value as 'CAFE_DA_MANHA' | 'ALMOCO' | 'JANTAR'
    };

    this.isLoading = true;
    this.registroService.registrar(dadosEnvio).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.successMessage = `Refeição registrada com sucesso para ${res.nomeFuncionario}!`;
        this.errorMessage = null;
        this.carregarUltimos();
        
        const turnoAtual = this.form.get('turno')?.value;
        this.form.reset(); 
        this.form.get('turno')?.setValue(turnoAtual ?? null);
        
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = "Erro ao registrar refeição. Tente novamente.";
      }
    });
  }

  validarEntradaNumerica(event: any): void {
    const input = event.target as HTMLInputElement;
    
    let novoValor = input.value.replace(/\D/g, '');

    if (novoValor.length > 11) {
      novoValor = novoValor.slice(0, 11);
    }

    this.form.get('cpf')?.setValue(novoValor, { emitEvent: false });
  }
}