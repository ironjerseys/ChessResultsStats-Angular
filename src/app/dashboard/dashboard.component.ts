import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { Game } from '../models/game';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  apiData: any;
  username: string = '';
  winningGamesList: any[] = [];

  eloChart: any = null;
  accuracyChart: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    if (this.username == '') {
      return;
    }

    // const apiUrl = `https://api.chess.com/pub/player/${this.username}/games/2023/10`;

    const apiUrl =
      'https://chessresultsstatsbackendjava.azurewebsites.net/games';

    this.http.get<Game[]>(apiUrl).subscribe({
      next: (data) => {
        console.log(data);
        this.apiData = data;

        const ratings = data.map((game: Game) => {
          const date = game.date; // Assurez-vous que le format de date correspond à celui attendu par vos graphiques
          const rating =
            game.playerusername.toLowerCase() === this.username.toLowerCase()
              ? game.whiteelo
              : game.blackelo;
          return { date, rating };
        });

        this.updateEloChart(ratings);
        // this.updateAccuracyChart(accuracies);

        // Filtrer les parties gagnées où le joueur a gagné
        // this.winningGamesList = data.games.filter(
        //   (game: any) =>
        //     (game.white.result === 'win' &&
        //       game.white.username.toLowerCase() === this.username) ||
        //     (game.black.result === 'win' &&
        //       game.black.username.toLowerCase() === this.username)
        // );
      },
    });
  }

  getNumberOfGames(): number {
    // return this.apiData ? this.apiData.games.length : 0;
    return this.apiData ? this.apiData.length : 0;
  }

  updateEloChart(ratings: any[]) {
    const ctxElo = document.getElementById('eloChart') as HTMLCanvasElement;
    if (this.eloChart) {
      this.eloChart.destroy();
    }

    this.eloChart = new Chart(ctxElo, {
      type: 'line',
      data: {
        labels: ratings.map((item) => item.date),
        datasets: [
          {
            label: 'ELO Rating',
            data: ratings.map((item) => item.rating),
            borderColor: 'blue',
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
