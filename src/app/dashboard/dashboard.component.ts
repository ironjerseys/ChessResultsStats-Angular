import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  currentView: 'bullet' | 'blitz' | 'rapid' = 'bullet';

  apiData: any;
  username: string = '';

  eloBulletChart: any = null;
  eloBlitzChart: any = null;
  eloRapidChart: any = null;

  accuracyBulletChart: any = null;
  accuracyBlitzChart: any = null;
  accuracyRapidChart: any = null;

  openingsAccuracyChart: Chart | undefined;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.getDataFromApi();
  }

  getNumberOfGames(): number {
    return this.apiData ? this.apiData.length : 0;
  }

  getDataFromApi() {
    console.log(this.username);
    if (this.username == '') {
      return;
    }
    this.gameService.getGames(this.username).subscribe({
      next: (data) => {
        console.log(data);
        this.apiData = data;

        // Filter and prepare data for each chart
        const filterRatings = (timeControls: string[]) =>
          data
            .filter((game: Game) => timeControls.includes(game.timecontrol))
            .map((game: Game) => {
              const date = game.date;
              const rating = game.playerelo;
              return { date, rating };
            });

        // Bullet
        const bulletRatings = filterRatings(['60', '60+1', '120+1']);
        this.updateEloChart(
          bulletRatings,
          'eloBulletChart',
          'ELO Bullet Rating',
          'red'
        );

        // Blitz
        const blitzRatings = filterRatings(['180', '180+2', '300']);
        this.updateEloChart(
          blitzRatings,
          'eloBlitzChart',
          'ELO Blitz Rating',
          'red'
        );

        // Rapid
        const rapidRatings = filterRatings(['600', '900+10', '1800']);
        this.updateEloChart(
          rapidRatings,
          'eloRapidChart',
          'ELO Rapid Rating',
          'red'
        );

        // Filter and prepare data for each chart
        const filterAccuracies = (timeControls: string[]) =>
        data
          .filter((game: Game) => timeControls.includes(game.timecontrol) && game.accuracy && game.accuracy > 0)
          .map((game: Game) => {
            const date = game.date;
            const accuracy = game.accuracy;
            return { date, accuracy };
          });

        // Bullet
        const bulletAccuracies = filterAccuracies(['60', '60+1', '120+1']);
        this.updateAccuracyChart(
          bulletAccuracies,
          'accuracyBulletChart',
          'Accuracy Bullet Rating',
          '#0000b3'
        );

        // Blitz
        const blitzAccuracies = filterAccuracies(['180', '180+2', '300']);
        this.updateAccuracyChart(
          blitzAccuracies,
          'accuracyBlitzChart',
          'Accuracy Blitz Rating',
          '#0000b3'
        );

        // Rapid
        const rapidAccuracies = filterAccuracies(['600', '900+10', '1800']);
        this.updateAccuracyChart(
          rapidAccuracies,
          'accuracyRapidChart',
          'Accuracy Rapid Rating',
          '#0000b3'
        );

        const allGames = data.filter(game => game.accuracy && game.accuracy > 0);
        const averageAccuracies = this.calculateOpeningsAccuracies(allGames);
        this.displayOpeningsAccuracyChart(averageAccuracies);

        // const showOpeningsAccuracies = (timeControls: string[]) =>
        // data
        //   .filter((game: Game) => timeControls.includes(game.timecontrol) && game.accuracy && game.accuracy > 0)
        //   .map((game: Game) => {
        //     const opening = game.opening;
        //     const accuracy = game.accuracy;
        //     return { opening, accuracy };
        //   });

        

          




      },
    });
  }

  calculateOpeningsAccuracies(games : Game[]) {
    const openingsAccuracies = games.reduce((acc: {[key: string]: {sum: number, count: number}}, game: Game) => {      
      if (!acc[game.opening]) {
        acc[game.opening] = { sum: 0, count: 0 };
      }
      acc[game.opening].sum += game.accuracy;
      acc[game.opening].count += 1;
      return acc;
    }, {});
  
    return Object.entries(openingsAccuracies).map(([opening, data]) => ({
      opening,
      averageAccuracy: data.sum / data.count
    }));
  }



  updateEloChart(
    ratings: any[],
    chartRef: 'eloBulletChart' | 'eloBlitzChart' | 'eloRapidChart',
    label: string,
    borderColor: string
  ) {
    const ctx = document.getElementById(chartRef) as HTMLCanvasElement;
    if (this[chartRef]) {
      this[chartRef].destroy();
    }

    
    this[chartRef] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ratings.map(item => item.date),
        datasets: [
          {
            label: label,
            data: ratings.map(item => item.rating),
            borderColor: borderColor,
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
          }
        }
      },
    });
  }

  updateAccuracyChart(
    accuracies: any[],
    chartRef: 'accuracyBulletChart' | 'accuracyBlitzChart' | 'accuracyRapidChart',
    label: string,
    borderColor: string
  ) {
    const ctx = document.getElementById(chartRef) as HTMLCanvasElement;
    if (this[chartRef]) {
      this[chartRef].destroy();
    }

    this[chartRef] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: accuracies.map((item) => item.date),
        datasets: [
          {
            label: label,
            data: accuracies.map((item) => item.accuracy),
            borderColor: borderColor,
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
          }
        }
      },
    });
  }

  displayOpeningsAccuracyChart(averageAccuracies : any) {

    const canvas = document.getElementById('openingsAccuracyChart') as HTMLCanvasElement;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      // Gérer le cas où le contexte n'est pas disponible
      console.error('Unable to get the context of the canvas');
      return;
    }

    if (this.openingsAccuracyChart) {
      this.openingsAccuracyChart.destroy(); // Détruire le graphique existant si nécessaire
    }
  
    this.openingsAccuracyChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: averageAccuracies.map((a: any) => a.opening),
        datasets: [{
          label: 'Average Accuracy per Opening',
          data: averageAccuracies.map((a: any) => a.averageAccuracy),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Accuracy (%)'
            }
          }
        }
      }
    });
  }



  switchView(newView: 'bullet' | 'blitz' | 'rapid') {
    this.currentView = newView;
  }


}
