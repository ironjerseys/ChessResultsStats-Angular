import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Game } from '../../models/game';
import { EcoData, CommonEco } from '../../models/eco-data.model';
Chart.register(...registerables);

@Component({
    selector: 'app-opening-chart',
    templateUrl: './opening-chart.component.html',
    styleUrls: ['./opening-chart.component.css'],
})
export class OpeningChartComponent {
    openingsAccuracyChart: Chart | undefined;

    calculateEcoAccuracies(games: Game[]): CommonEco[] {
        // eco is the official id of an opening, we use reduce to split data for each eco
        const ecos = games.reduce(
            (acc: Record<string, EcoData>, game: Game) => {
                // if this eco doesn't exist, we create it
                if (!acc[game.eco]) {
                    acc[game.eco] = {
                        openings: [],
                        totalAccuracy: 0,
                        count: 0,
                    };
                }

                acc[game.eco].openings.push(game.opening);
                acc[game.eco].totalAccuracy += game.accuracy;
                acc[game.eco].count++;
                return acc;
            },
            {},
        );

        // Fonction auxiliaire pour trouver le préfixe commun dans un tableau de strings, maintenant intégrée
        const findCommonPrefix = (strings: string[] | undefined): string => {
            if (!strings || strings.length === 0) return '';

            let prefix = strings[0];
            for (let i = 1; i < strings.length; i++) {
                while (strings[i].indexOf(prefix) !== 0) {
                    prefix = prefix.substring(0, prefix.length - 1);
                    if (prefix === '') return '';
                }
            }
            return prefix;
        };

        const commonEcos: CommonEco[] = Object.entries(ecos).map(
            ([eco, data]) => {
                const commonPrefix = findCommonPrefix(data.openings);
                return {
                    eco,
                    opening: commonPrefix || eco, // Utiliser eco comme fallback si aucun préfixe commun n'est trouvé
                    averageAccuracy: data.totalAccuracy / data.count,
                    count: data.count, // Vous pouvez inclure count si vous prévoyez de l'utiliser pour d'autres traitements
                };
            },
        );
        return commonEcos.sort((a, b) => b.count - a.count).slice(0, 20);
    }

    displayOpeningsAccuracyChart(averageAccuracies: any) {
        if (averageAccuracies == undefined) {
            console.log('averageAccuracies = undefined');
            return;
        }
        const ctx = document.getElementById(
            'openingsAccuracyChart',
        ) as HTMLCanvasElement;
        if (this.openingsAccuracyChart) this.openingsAccuracyChart.destroy();

        this.openingsAccuracyChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: averageAccuracies.map(
                    (a: any) => `${a.opening} (${a.eco})`,
                ),
                datasets: [
                    {
                        label: '',
                        data: averageAccuracies.map(
                            (a: any) => a.averageAccuracy,
                        ),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Accuracy (%)',
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
