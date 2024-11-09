import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningChartComponent } from './opening-chart.component';

describe('OpeningChartComponent', () => {
    let component: OpeningChartComponent;
    let fixture: ComponentFixture<OpeningChartComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [OpeningChartComponent],
        });
        fixture = TestBed.createComponent(OpeningChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
