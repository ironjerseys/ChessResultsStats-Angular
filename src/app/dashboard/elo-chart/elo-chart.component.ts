import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
    selector: 'app-elo-chart',
    templateUrl: './elo-chart.component.html',
    styleUrls: ['./elo-chart.component.css'],
})
export class EloChartComponent {
    eloBulletChart: any = null;
    eloBlitzChart: any = null;
    eloRapidChart: any = null;

    updateEloChart(
        ratings: any[],
        chartRef: 'eloBulletChart' | 'eloBlitzChart' | 'eloRapidChart',
        label: string,
        borderColor: string,
    ) {
        const ctx = document.getElementById(chartRef) as HTMLCanvasElement;

        if (this[chartRef]) {
            this[chartRef].destroy();
        }

        const eloValues = ratings.map((item) => item.rating);
        const eloMin = Math.min(...eloValues);
        const eloMax = Math.max(...eloValues);

        this[chartRef] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ratings.map((item) => item.date),
                datasets: [
                    {
                        label: label,
                        data: eloValues,
                        borderColor: borderColor,
                        borderWidth: 2,
                        fill: true,
                        pointRadius: 0,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        position: 'right',
                        beginAtZero: false,
                        suggestedMin: eloMin * 0.9,
                        suggestedMax: eloMax * 1.1,
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
