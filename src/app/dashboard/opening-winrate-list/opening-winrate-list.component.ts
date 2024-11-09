import { Component } from '@angular/core';
import { Game } from '../../models/game';

@Component({
    selector: 'app-opening-winrate-list',
    templateUrl: './opening-winrate-list.component.html',
    styleUrl: './opening-winrate-list.component.css',
})
export class OpeningWinrateListComponent {
    winningOpenings: { opening: string; count: number; winRate: number }[] = [];
    losingOpenings: { opening: string; count: number; winRate: number }[] = [];

    calculateWinningOpenings(games: Game[]) {
        const openingStats = games.reduce(
            (acc, game) => {
                // Initialise openings stats
                if (!acc[game.opening]) {
                    acc[game.opening] = {
                        opening: game.opening,
                        wins: 0,
                        total: 0,
                    };
                }
                // Increment the number of games played with this opening
                acc[game.opening].total++;

                // Increment the number of games won
                if (game.resultForPlayer === 'won') {
                    acc[game.opening].wins++;
                }
                return acc;
            },
            {} as Record<
                string,
                { opening: string; wins: number; total: number }
            >,
        );

        // Calculate the winrate for each opening
        const openingsWithWinRate = Object.values(openingStats).map((o) => ({
            opening: o.opening,
            count: o.wins,
            winRate: (o.wins / o.total) * 100,
        }));

        // Sort openings and keep only 5 firsts
        const sortedOpenings = openingsWithWinRate
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
        this.winningOpenings = sortedOpenings;
    }

    calculateLosingOpenings(games: Game[]) {
        const openingStats = games.reduce(
            (acc, game) => {
                // Initialise openings stats
                if (!acc[game.opening]) {
                    acc[game.opening] = {
                        opening: game.opening,
                        losses: 0,
                        total: 0,
                    };
                }
                // Increment the number of games played with this opening
                acc[game.opening].total++;

                // Increment the number of games lost
                if (game.resultForPlayer === 'lost') {
                    acc[game.opening].losses++;
                }
                return acc;
            },
            {} as Record<
                string,
                { opening: string; losses: number; total: number }
            >,
        );

        const openingsWithWinRate = Object.values(openingStats).map((o) => ({
            opening: o.opening,
            count: o.losses,
            winRate: 100 - (o.losses / o.total) * 100,
        }));

        const sortedOpenings = openingsWithWinRate
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);
        this.losingOpenings = sortedOpenings;
    }
}
