import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';

Chart.register(...registerables);

@Component({
    selector: 'app-accuracy-chart',
    templateUrl: './accuracy-chart.component.html',
    styleUrls: ['./accuracy-chart.component.css'],
    providers: [DatePipe],
})
export class AccuracyChartComponent {
    accuracyBulletChart: any = null;
    accuracyBlitzChart: any = null;
    accuracyRapidChart: any = null;

    constructor(private datePipe: DatePipe) {}

    updateAccuracyChart(
        accuracies: any[],
        chartRef:
            | 'accuracyBulletChart'
            | 'accuracyBlitzChart'
            | 'accuracyRapidChart',
        label: string,
        borderColor: string
    ) {
        if (
            accuracies == undefined ||
            accuracies == null ||
            accuracies.length === 0
        ) {
            console.log('accuracies = empty');
            return;
        }

        const ctx = document.getElementById(chartRef) as HTMLCanvasElement;

        if (this[chartRef]) {
            this[chartRef].destroy();
        }

        const accuracyValues = accuracies.map((item) => item.accuracy);
        const accuracyMin = Math.min(...accuracyValues);
        const accuracyMax = Math.max(...accuracyValues);

        const formattedDates = accuracies.map((item) =>
            this.datePipe.transform(item.date, 'dd/MM/yyyy')
        );

        this[chartRef] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: formattedDates,
                datasets: [
                    {
                        label: label,
                        data: accuracyValues,
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
                        suggestedMin: accuracyMin * 0.9,
                        suggestedMax: accuracyMax * 1.1,
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
