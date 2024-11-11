import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EloChartComponent } from './dashboard/elo-chart/elo-chart.component';
import { AccuracyChartComponent } from './dashboard/accuracy-chart/accuracy-chart.component';
import { OpeningChartComponent } from './dashboard/opening-chart/opening-chart.component';
import { CommonModule } from '@angular/common';
import { OpeningWinrateListComponent } from './dashboard/opening-winrate-list/opening-winrate-list.component';
import { GamesCountComponent } from './dashboard/games-count/games-count.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DashboardComponent,
        EloChartComponent,
        AccuracyChartComponent,
        OpeningChartComponent,
        OpeningWinrateListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        CommonModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: !isDevMode(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
        GamesCountComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
