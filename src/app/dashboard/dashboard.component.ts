import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Game } from '../models/game';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class UploadFileComponent {
  constructor(private gameService: GameService, private http: HttpClient) {}
  fileName = '';
  gamesResult = new Game();
  numberOfGames = 0;
  totalNumberOfGames: number = 0;

  selectedValue = 'option1';

  // at the launch of the app
  ngOnInit(): void {
    this.getGames();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const newFileName = 'data.txt';

      const formData = new FormData();

      formData.append('file', file, newFileName);

      const upload$ = this.http.post(
        'https://localhost:7170/api/upload',
        formData
      );

      alert(upload$);
      console.log(upload$);

      upload$.subscribe();

      this.getGames();
    }
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
