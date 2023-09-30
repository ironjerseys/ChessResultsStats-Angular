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

  // at the launch of the app
  ngOnInit(): void {
    this.getGames();
  }

  getGames(): void {
    // call the service
    this.gameService
      .getGames(this.selectedOpening, this.selectedColor, this.selectedEndgame)
      .subscribe((result) => {
        this.gamesResult = result;
        this.totalNumberOfGames =
          result.numberOfGamesWon +
          result.numberOfGamesDrawn +
          result.numberOfGamesLost;
      });
  }

  selectedOpening = 'All openings';
  onOpeningSelected(opening: string): void {
    this.selectedOpening = opening;
    this.getGames();
  }

  selectedColor = 'All colors';
  onColorSelected(color: string): void {
    this.selectedColor = color;
    this.getGames();
  }

  selectedEndgame = 'All end of game';
  onEndgameSelected(endgame: string): void {
    this.selectedEndgame = endgame;
    this.getGames();
  }
}
