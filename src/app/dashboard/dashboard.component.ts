import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';
import { EcoData, CommonEco } from '../models/eco-data.model';
import { EloChartComponent } from '../elo-chart/elo-chart.component';
import { AccuracyChartComponent } from '../accuracy-chart/accuracy-chart.component';
import { OpeningChartComponent } from '../opening-chart/opening-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit{

	@ViewChild('eloChartRef') eloChartComponent!: EloChartComponent;
	@ViewChild('accuracyChartRef') accuracyChartComponent!: AccuracyChartComponent;
	@ViewChild('openingChartRef') openingChartComponent!: OpeningChartComponent;

	apiData: any;
	username: string = '';
	isLoading: boolean = false;

	constructor(private gameService: GameService) {}
	ngAfterViewInit(): void {
		this.getDataFromApi();
	}

	getNumberOfGames(): number {
		return this.apiData ? this.apiData.length : 0;
	}

	getDataFromApi() {
		// if username empty, we return
		if (this.username == '') {return;}

		// for loading circle
		this.isLoading = true;

		// we call the service to get the data from the API
		this.gameService.getGames(this.username).subscribe({
		next: (data) => {
			this.apiData = data;

			// we split the data by time control for the charts
			const filterRatings = (timeControls: string[]) =>
			data.filter((game: Game) => timeControls.includes(game.timecontrol))
				.map((game: Game) => {
					const date = game.date;
					const rating = game.playerelo;
					return { date, rating };
				});

			// Bullet
			const bulletRatings = filterRatings(['60', '60+1', '120+1']);
			this.eloChartComponent.updateEloChart(bulletRatings, 'eloBulletChart', 'ELO Bullet Rating',	'red');

			// Blitz
			const blitzRatings = filterRatings(['180', '180+2', '300']);
			this.eloChartComponent.updateEloChart(blitzRatings,	'eloBlitzChart', 'ELO Blitz Rating', 'red');

			// Rapid
			const rapidRatings = filterRatings(['600', '900+10', '1800']);
			this.eloChartComponent.updateEloChart(rapidRatings,	'eloRapidChart', 'ELO Rapid Rating', 'red');

			// we split the data by time control for the charts
			const filterAccuracies = (timeControls: string[]) =>
			data.filter(
				(game: Game) =>	timeControls.includes(game.timecontrol) && game.accuracy && game.accuracy > 0)
				.map((game: Game) => {
					const date = game.date;
					const accuracy = game.accuracy;
					return { date, accuracy };
				});

			// Bullet
			const bulletAccuracies = filterAccuracies(['60', '60+1', '120+1']);
			this.accuracyChartComponent.updateAccuracyChart(bulletAccuracies, 'accuracyBulletChart', 'Accuracy Bullet Rating', '#0000b3');

			// Blitz
			const blitzAccuracies = filterAccuracies(['180', '180+2', '300']);
			this.accuracyChartComponent.updateAccuracyChart(blitzAccuracies, 'accuracyBlitzChart', 'Accuracy Blitz Rating',	'#0000b3');

			// Rapid
			const rapidAccuracies = filterAccuracies(['600', '900+10', '1800']);
			this.accuracyChartComponent.updateAccuracyChart(rapidAccuracies, 'accuracyRapidChart', 'Accuracy Rapid Rating','#0000b3');

			// we take all games, except those with empty accuracy
			const allGames = data.filter((game) => game.accuracy && game.accuracy > 0);

			// We calculate accuracy for each eco and display the data on a graph
			const averageAccuracies = this.openingChartComponent.calculateEcoAccuracies(allGames);
			this.openingChartComponent.displayOpeningsAccuracyChart(averageAccuracies);

			// end of loading circle
			this.isLoading = false;
		},
		});
	}
}
