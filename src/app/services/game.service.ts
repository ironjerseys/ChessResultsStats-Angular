import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private url = 'Game';
  constructor(private http: HttpClient) {}

  public getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(`${environment.apiUrl}/${this.url}`);
    //console.log(this.http.get<Game[]>(`${environment.apiUrl}/${this.url}`));
  }

  // public getGames(): Game[] {
  //   let game = new Game();
  //   game.id = 1;
  //   game.whitePlayer = 'White';
  //   game.blackPlayer = 'Black';
  //   game.result = '1-0';
  //   game.moves = '1. e4 e5';
  //   return [game];
  // }
}
