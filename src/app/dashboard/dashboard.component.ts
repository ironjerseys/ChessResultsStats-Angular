import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { Game } from '../models/game';
import { environment } from '../../environments/environment';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  apiData: any;
  username: string = '';

  eloBulletChart: any = null;
  eloBlitzChart: any = null;
  eloRapidChart: any = null;

  accuracyChart: any = null;

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
              const rating =
                game.playerusername.toLowerCase() ===
                this.username.toLowerCase()
                  ? game.whiteelo
                  : game.blackelo;
              return { date, rating };
            });

        // Bullet
        const bulletRatings = filterRatings(['60', '60+1', '120+1']);
        this.updateEloChart(
          bulletRatings,
          'eloBulletChart',
          'ELO Bullet Rating',
          '#0000b3'
        );

        // Blitz
        const blitzRatings = filterRatings(['180', '180+2', '300']);
        this.updateEloChart(
          blitzRatings,
          'eloBlitzChart',
          'ELO Blitz Rating',
          'green'
        );

        // Rapid
        const rapidRatings = filterRatings(['600', '900+10', '1800']);
        this.updateEloChart(
          rapidRatings,
          'eloRapidChart',
          'ELO Rapid Rating',
          'red'
        );
      },
    });
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
        labels: ratings.map((item) => item.date),
        datasets: [
          {
            label: label,
            data: ratings.map((item) => item.rating),
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
            beginAtZero: false,
          },
        },
      },
    });
  }

  updateAccuracyChart(accuracies: any[]) {
    const ctxAcc = document.getElementById(
      'accuracyChart'
    ) as HTMLCanvasElement;
    if (this.accuracyChart) {
      this.accuracyChart.destroy();
    }

    this.accuracyChart = new Chart(ctxAcc, {
      type: 'line',
      data: {
        labels: accuracies.map((item) => item.date),
        datasets: [
          {
            label: 'Accuracy',
            data: accuracies.map((item) => item.accuracy),
            borderColor: 'red',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }
}
