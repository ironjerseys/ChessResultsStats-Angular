import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AverageMovesService } from '../../services/average-moves-service';
import { AverageMoves } from 'src/app/models/average-moves';

@Component({
    selector: 'app-moves-by-pieces',
    templateUrl: './moves-by-pieces.component.html',
    styleUrl: './moves-by-pieces.component.css',
})
export class MovesByPiecesComponent implements OnChanges {
    @Input() username: string = '';
    averageMoves: AverageMoves | null = null;

    constructor(private averageMovesService: AverageMovesService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['username'] && this.username) {
            this.fetchWinrates(this.username);
        }
    }

    fetchWinrates(username: string) {
        this.averageMovesService.getAverageMoves(username).subscribe({
            next: (data) => {
                this.updateAverageMovesTable(data);
                this.averageMoves = data;
            },
            error: (err) => {
                console.error(
                    'Erreur lors de la récupération des average moves:',
                    err
                );
            },
        });
    }

    updateAverageMovesTable(averageMoves: any) {}
}
