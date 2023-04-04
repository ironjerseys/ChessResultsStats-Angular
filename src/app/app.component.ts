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
  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService
      .getGames()
      .subscribe((result: Game[]) => (this.games = result));
  }

  // ngOnInit(): void {
  //   this.games = this.gameService.getGames();
  // }
}
