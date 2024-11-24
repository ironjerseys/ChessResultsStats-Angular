import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class WinrateService {
    constructor(private http: HttpClient) {}

    // API call
    getWinratesByHour(username: string): Observable<any> {
        const params = new HttpParams().set('username', username);
        const url = `${environment.apiBaseUrl}${environment.routes.games}${environment.routes.winrates}`;
        return this.http.get<any>(url, { params });
    }
}
