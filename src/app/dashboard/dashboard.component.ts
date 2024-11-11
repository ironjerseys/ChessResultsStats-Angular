import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { EloChartComponent } from './elo-chart/elo-chart.component';
import { AccuracyChartComponent } from './accuracy-chart/accuracy-chart.component';
import { OpeningChartComponent } from './opening-chart/opening-chart.component';
import { OpeningWinrateListComponent } from './opening-winrate-list/opening-winrate-list.component';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
    @ViewChild('eloChartRef') eloChartComponent!: EloChartComponent;
    @ViewChild('accuracyChartRef')
    accuracyChartComponent!: AccuracyChartComponent;
    @ViewChild('openingChartRef') openingChartComponent!: OpeningChartComponent;
    @ViewChild('openingWinrateListRef')
    openingWinrateListComponent!: OpeningWinrateListComponent;

    apiData: any;
    username: string = '';
    isLoading: boolean = false;
    isChartVisible: boolean = false;
    numberOfGames: number = 0;

    constructor(private gameService: GameService) {}
    ngAfterViewInit(): void {
        this.getDataFromApi();
    }

    getDataFromApi() {
        // si pas d'username on quitte
        if (this.username == '') {
            return;
        }

        // on affiche l'icone de chargement
        this.isLoading = true;

        // on appelle le service pour avoir les données de l'API .NET
        this.gameService.getGames(this.username).subscribe({
            next: (data) => {
                this.apiData = data;
                this.numberOfGames = data.length;

                // on sépare les données par cadence pour les graphiques
                const filterRatings = (timeControls: string[]) =>
                    data
                        .filter((game: Game) =>
                            timeControls.includes(game.timeControl)
                        )
                        .map((game: Game) => {
                            const date = game.date;
                            const rating = game.playerElo;
                            return { date, rating };
                        });

                // Bullet
                const bulletRatings = filterRatings(['60', '60+1', '120+1']);
                this.eloChartComponent.updateEloChart(
                    bulletRatings,
                    'eloBulletChart',
                    'ELO Bullet Rating',
                    'red'
                );

                // Blitz
                const blitzRatings = filterRatings(['180', '180+2', '300']);
                this.eloChartComponent.updateEloChart(
                    blitzRatings,
                    'eloBlitzChart',
                    'ELO Blitz Rating',
                    'red'
                );

                // Rapid
                const rapidRatings = filterRatings(['600', '900+10', '1800']);
                this.eloChartComponent.updateEloChart(
                    rapidRatings,
                    'eloRapidChart',
                    'ELO Rapid Rating',
                    'red'
                );

                // on sépare les données par cadence pour les graphiques
                const filterAccuracies = (timeControls: string[]) =>
                    data
                        .filter(
                            (game: Game) =>
                                timeControls.includes(game.timeControl) &&
                                game.accuracy &&
                                game.accuracy > 0
                        )
                        .map((game: Game) => {
                            const date = game.date;
                            const accuracy = game.accuracy;
                            return { date, accuracy };
                        });

                // Bullet
                const bulletAccuracies = filterAccuracies([
                    '60',
                    '60+1',
                    '120+1',
                ]);
                this.accuracyChartComponent.updateAccuracyChart(
                    bulletAccuracies,
                    'accuracyBulletChart',
                    'Accuracy Bullet Rating',
                    '#0000b3'
                );

                // Blitz
                const blitzAccuracies = filterAccuracies([
                    '180',
                    '180+2',
                    '300',
                ]);
                this.accuracyChartComponent.updateAccuracyChart(
                    blitzAccuracies,
                    'accuracyBlitzChart',
                    'Accuracy Blitz Rating',
                    '#0000b3'
                );

                // Rapid
                const rapidAccuracies = filterAccuracies([
                    '600',
                    '900+10',
                    '1800',
                ]);
                this.accuracyChartComponent.updateAccuracyChart(
                    rapidAccuracies,
                    'accuracyRapidChart',
                    'Accuracy Rapid Rating',
                    '#0000b3'
                );

                // on prend toutes les parties sauf celles sans accuracy
                const allGames = data.filter(
                    (game) => game.accuracy && game.accuracy > 0
                );

                this.openingWinrateListComponent.calculateWinningOpenings(
                    allGames
                );
                this.openingWinrateListComponent.calculateLosingOpenings(
                    allGames
                );

                // on calcule l'accuracy pour chaque ouverture ECO
                const averageAccuracies =
                    this.openingChartComponent.calculateEcoAccuracies(allGames);
                this.openingChartComponent.displayOpeningsAccuracyChart(
                    averageAccuracies
                );

                // on cache l'icone de chargement
                this.isLoading = false;

                // on affiche les graphiques
                this.isChartVisible = true;
            },
        });
    }
}
