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
        'http://127.0.0.1:8080/api/upload',
        formData
      );

      upload$.subscribe(() => {
        // After l'upload OK, we call getGames()
        this.getGames();
      });
    }
  }

  getGames(): void {
    // call the service
    this.gameService.getGames().subscribe((result) => {
      this.gamesResult = result;
      console.log(result);
    });
  }
}
