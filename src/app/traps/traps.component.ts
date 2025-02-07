import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import trapsData from 'src/assets/data/traps.json';

interface MoveData {
    move: string;
    image: string;
}

interface TrapsData {
    [trap: string]: {
        [variation: string]: MoveData[];
    };
}

@Component({
    selector: 'app-traps',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './traps.component.html',
    styleUrl: './traps.component.css',
})
export class TrapsComponent implements OnInit {
    traps: TrapsData = trapsData;
    selectedTrap: string = '';
    selectedVariation: string = '';
    moves: MoveData[] = [];
    currentMoveIndex: number = 0;
    currentImage: string = 'assets/chess_images/start.png';
    trapsData = trapsData as Record<string, any>;

    constructor() {}

    ngOnInit(): void {}

    get movesSoFar(): string {
        return this.moves
            .slice(0, this.currentMoveIndex + 1)
            .map((m) => m.move)
            .join(' ');
    }

    updateMoves(): void {
        if (this.selectedTrap && this.selectedVariation) {
            this.moves =
                this.traps[this.selectedTrap][this.selectedVariation] || [];
            this.currentMoveIndex = 0;
            this.currentImage =
                this.moves.length > 0
                    ? 'assets/chess_images/' + this.moves[0].image
                    : 'assets/chess_images/start.png';
        }
    }

    previousMove(): void {
        if (this.currentMoveIndex > 0) {
            this.currentMoveIndex--;
            this.currentImage =
                'assets/chess_images/' +
                this.moves[this.currentMoveIndex].image;
        }
    }

    nextMove(): void {
        if (this.currentMoveIndex < this.moves.length - 1) {
            this.currentMoveIndex++;
            this.currentImage =
                'assets/chess_images/' +
                this.moves[this.currentMoveIndex].image;
        }
    }
}
