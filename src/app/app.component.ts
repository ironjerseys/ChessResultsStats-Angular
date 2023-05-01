import { Component } from '@angular/core';
import { Game } from './models/game';
import { GameService } from './services/game.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ChessGameAnalyzer.IU';

  gamesResult = new Game();
  numberOfGames = 0;
  totalNumberOfGames: number = 0;

  selectedValue = 'option1';

  constructor(private gameService: GameService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    // call the service
    this.gameService.getGames(this.selectedOpening).subscribe((result) => {
      this.gamesResult = result;
      this.totalNumberOfGames =
        result.numberOfGamesWon +
        result.numberOfGamesDrawn +
        result.numberOfGamesLost;
    });
  }

  selectedOpening = 'All openings';
  onSelected(opening: string): void {
    this.selectedOpening = opening;
    this.getGames();
  }

  fileName = '';

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const newFileName = 'data.txt';

      //this.fileName = file.name;

      const formData = new FormData();

      formData.append('file', file, newFileName);

      const upload$ = this.http.post(
        'https://localhost:7170/api/upload',
        formData
      );

      upload$.subscribe();
      this.getGames();

      // attendre 1 seconde et appeler getGames()
      // setTimeout(() => {
      //   this.getGames();
      // }, 1000);
    }
  }
}
