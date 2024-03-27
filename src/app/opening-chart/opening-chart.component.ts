import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-opening-chart',
  templateUrl: './opening-chart.component.html',
  styleUrls: ['./opening-chart.component.css']
})
export class OpeningChartComponent {

	openingsAccuracyChart: Chart | undefined;
	
	displayOpeningsAccuracyChart(averageAccuracies: any) {
		if (averageAccuracies == undefined) {
		console.log('averageAccuracies = undefined');
		return;
		}
		const ctx = document.getElementById(
		'openingsAccuracyChart'
		) as HTMLCanvasElement;
		if (this.openingsAccuracyChart) this.openingsAccuracyChart.destroy();

		this.openingsAccuracyChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: averageAccuracies.map((a: any) => `${a.opening} (${a.eco})`),
			datasets: [
			{
				label: 'Average Accuracy per Opening',
				data: averageAccuracies.map((a: any) => a.averageAccuracy),
				backgroundColor: 'rgba(75, 192, 192, 0.2)',
				borderColor: 'rgba(75, 192, 192, 1)',
				borderWidth: 1,
			},
			],
		},
		options: {
			scales: {
			y: {
				beginAtZero: true,
				title: {
				display: true,
				text: 'Accuracy (%)',
				},
			},
			},
		},
		});
	}
}
