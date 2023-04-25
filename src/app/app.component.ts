import { Component } from '@angular/core';
import { Game } from './models/game';
import { GameService } from './services/game.service';

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

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    // this.gameService
    //   .getGames()
    //   .subscribe((result: Game) => (this.gamesResult = result));

    this.gameService.getGames().subscribe((result) => {
      this.gamesResult = result;
      this.totalNumberOfGames =
        result.numberOfGamesWonWithWhite +
        result.numberOfGamesDrawnWithWhite +
        result.numberOfGamesLostWithWhite +
        result.numberOfGamesWonWithBlack +
        result.numberOfGamesDrawnWithBlack +
        result.numberOfGamesLostWithBlack;
    });
  }
}
