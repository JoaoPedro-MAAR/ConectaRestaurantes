import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequisicaoService, RelatorioMetrics } from '../services/requisicao.service'; // Ajuste o caminho

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {
  private service = inject(RequisicaoService);
  
  metrics: RelatorioMetrics | null = null;
  statusKeys: string[] = [];

  ngOnInit() {
    this.carregarMetricas();
  }

  carregarMetricas() {
    this.service.getMetricas().subscribe({
      next: (data) => {
        this.metrics = data;
        // Transforma as chaves do Map em array para usar no *ngFor
        this.statusKeys = Object.keys(data.pedidosPorStatus);
      },
      error: (err) => console.error("Erro ao carregar métricas", err)
    });
  }

  exportarCsv() {
    this.service.downloadCsv().subscribe({
      next: (blob) => {
        // Cria um link invisível para forçar o download
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `relatorio_pedidos_${new Date().getTime()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => alert("Erro ao baixar CSV")
    });
  }
}