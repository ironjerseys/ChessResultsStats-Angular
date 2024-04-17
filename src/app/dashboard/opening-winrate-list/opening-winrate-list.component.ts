import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-opening-winrate-list',
  templateUrl: './opening-winrate-list.component.html',
  styleUrl: './opening-winrate-list.component.css'
})
export class OpeningWinrateListComponent {

	winningOpenings: { opening: string; count: number; }[] = [];	  
	losingOpenings: { opening: string; count: number; }[] = [];	  

	calculateWinningOpenings(games: Game[])
	{
		// We select only won games
		const wonGames = games.filter(game => game.resultForPlayer === 'won');

		// We check the number of won games by opening
		const winsByOpening = wonGames.reduce((acc, game) => {
			if (acc[game.opening]) {
			  acc[game.opening].count++;
			} else {
			  acc[game.opening] = { opening: game.opening, count: 1 };
			}
			return acc;
		  }, {} as Record<string, { opening: string; count: number; }>);

		// transform into object / sort by number of won games, we keep only 5 first
		const sortedOpenings = Object.values(winsByOpening)
		.sort((a, b) => b.count - a.count)
		.slice(0, 5);

		this.winningOpenings = sortedOpenings;
	}
	
	calculateLosingOpenings(games: Game[])
	{
		// We select only won games
		const lostGames = games.filter(game => game.resultForPlayer === 'lost');

		// We check the number of won games by opening
		const losesByOpening = lostGames.reduce((acc, game) => {
			if (acc[game.opening]) {
			  acc[game.opening].count++;
			} else {
			  acc[game.opening] = { opening: game.opening, count: 1 };
			}
			return acc;
		  }, {} as Record<string, { opening: string; count: number; }>);

		// transform into object / sort by number of won games, we keep only 5 first
		const sortedOpenings = Object.values(losesByOpening)
		.sort((a, b) => b.count - a.count)
		.slice(0, 5);

		this.losingOpenings = sortedOpenings;
	}
}
