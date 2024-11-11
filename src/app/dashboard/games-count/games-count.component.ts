import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-games-count',
    standalone: true,
    imports: [],
    templateUrl: './games-count.component.html',
    styleUrl: './games-count.component.css',
})
export class GamesCountComponent {
    @Input() numberOfGames: number = 0;
}
