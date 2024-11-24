import { WinrateService } from '../../services/winrate-service.service';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
    selector: 'app-winrate-histogram',
    templateUrl: './winrate-histogram.component.html',
    styleUrls: ['./winrate-histogram.component.css'],
})
export class WinrateHistogramComponent implements OnChanges {
    @Input() username: string = '';
    winrateChart: any = null;

    constructor(private winrateService: WinrateService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['username'] && this.username) {
            this.fetchWinrates(this.username);
        }
    }

    fetchWinrates(username: string) {
        this.winrateService.getWinratesByHour(username).subscribe({
            next: (data) => {
                this.updateWinrateChart(data);
            },
            error: (err) => {
                console.error(
                    'Erreur lors de la récupération des winrates:',
                    err
                );
            },
        });
    }

    updateWinrateChart(winrates: any) {
        const ctx = document.getElementById(
            'winrateChart'
        ) as HTMLCanvasElement;

        if (this.winrateChart) {
            this.winrateChart.destroy();
        }

        const labels = Array.from({ length: 24 }, (_, i) => `${i}h`);
        const data = labels.map((_, index) => winrates[`hour_${index}`] * 100);

        this.winrateChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'Winrate (%)',
                        data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Winrate (%)',
                        },
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Heure',
                        },
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
