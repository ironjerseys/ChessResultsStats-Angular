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

  public getGames(
    opening: string,
    color: string,
    endgame: string
  ): Observable<Game> {
    return this.http.get<Game>(
      `${environment.apiUrl}/${this.url}?opening=${opening}&color=${color}&endgame=${endgame}`
    );
  }
}
