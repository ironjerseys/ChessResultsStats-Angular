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
		if (this.username == '') {return;}
		this.isLoading = true;
		this.gameService.getGames(this.username).subscribe({
		next: (data) => {
			this.apiData = data;

			// Filter and prepare data for each chart
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

			// Filter and prepare data for each chart
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

			const allGames = data.filter((game) => game.accuracy && game.accuracy > 0);
			const averageAccuracies = this.calculateOpeningsAccuracies(allGames);
			this.openingChartComponent.displayOpeningsAccuracyChart(averageAccuracies);

			this.isLoading = false;
		},
		});
	}

	calculateEcoAccuracies(games: Game[]): CommonEco[] {
		const ecos = games.reduce((acc: Record<string, EcoData>, game: Game) => {
		if (!acc[game.eco]) {
			acc[game.eco] = { openings: [], totalAccuracy: 0, count: 0 };
		}
		acc[game.eco].openings.push(game.opening);
		acc[game.eco].totalAccuracy += game.accuracy;
		acc[game.eco].count++;
		return acc;
		}, {});

		const commonEcos: CommonEco[] = Object.entries(ecos).map(([eco, data]) => {
		const commonPrefix = this.findCommonPrefix(data.openings);
		return {
			eco,
			opening: commonPrefix || eco, // Utiliser eco comme fallback si aucun préfixe commun n'est trouvé
			averageAccuracy: data.totalAccuracy / data.count,
			count: data.count, // Vous pouvez inclure count si vous prévoyez de l'utiliser pour d'autres traitements
		};
		});
		return commonEcos.sort((a, b) => b.count - a.count).slice(0, 20);
	}

	calculateOpeningsAccuracies(games: Game[]): void {
		let ecoAccuracies = this.calculateEcoAccuracies(games);
		this.openingChartComponent.displayOpeningsAccuracyChart(ecoAccuracies);
	}

	// Fonction auxiliaire pour trouver le préfixe commun dans un tableau de strings
	findCommonPrefix(strings: string[] | undefined): string {
		if (!strings || strings.length === 0) return '';

		let prefix = strings[0];
		for (let i = 1; i < strings.length; i++) {
		while (strings[i].indexOf(prefix) !== 0) {
			prefix = prefix.substring(0, prefix.length - 1);
			if (prefix === '') return '';
		}
		}
		return prefix;
	}
}
