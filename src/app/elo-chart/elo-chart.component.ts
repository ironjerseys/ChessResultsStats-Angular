import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-elo-chart',
  template: `<canvas #eloChart></canvas>`,
})
export class EloChartComponent implements AfterViewInit {
  @Input() ratings!: any[]; // Les données du graphique
  @Input() chartLabel!: string; // Label pour le dataset
  @Input() borderColor!: string; // Couleur de la bordure du graphique

  @ViewChild('eloChart') private chartRef!: ElementRef; // Référence au canvas dans le template
  chart!: Chart; // Instance du graphique

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy(); // Détruire l'instance existante pour éviter les superpositions
    }

    const context = this.chartRef.nativeElement.getContext('2d');
    this.chart = new Chart(context, {
      type: 'line',
      data: {
        labels: this.ratings.map((item) => item.date), // Assumer que ratings contient des objets avec une propriété 'date'
        datasets: [
          {
            label: this.chartLabel,
            data: this.ratings.map((item) => item.rating), // Assumer que ratings contient des objets avec une propriété 'rating'
            borderColor: this.borderColor,
            borderWidth: 2,
            fill: false,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scales: {
          y: {
            position: 'right',
            beginAtZero: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
