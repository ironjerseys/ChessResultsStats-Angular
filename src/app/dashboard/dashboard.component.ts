import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private http: HttpClient) {}

  apiData: any;
  username: string = '';
  winningGamesList: any[] = [];

  ngOnInit() {
    this.getDataFromApi();
  }

  getDataFromApi() {
    if (this.username == '') {
      return;
    }

    // const apiUrl = `https://api.chess.com/pub/player/${this.username}/games/2023/10`;

    const apiUrl = 'http://localhost:8080/games';

    this.http.get(apiUrl).subscribe((data: any) => {
      console.log(data);
      this.apiData = data;

      // Filtrer les parties gagnées où le joueur a gagné
      // this.winningGamesList = data.games.filter(
      //   (game: any) =>
      //     (game.white.result === 'win' &&
      //       game.white.username.toLowerCase() === this.username) ||
      //     (game.black.result === 'win' &&
      //       game.black.username.toLowerCase() === this.username)
      // );
    });
  }

  getNumberOfGames(): number {
    // return this.apiData ? this.apiData.games.length : 0;
    return this.apiData ? this.apiData.length : 0;
  }
}
