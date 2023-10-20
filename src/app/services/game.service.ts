import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private http: HttpClient) {}

  // API call
  public getGames(): Observable<Game> {
    return this.http.get<Game>(`${environment.apiUrl}`);
  }
}
