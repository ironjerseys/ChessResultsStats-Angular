import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuracyChartComponent } from './accuracy-chart.component';

describe('AccuracyChartComponent', () => {
  let component: AccuracyChartComponent;
  let fixture: ComponentFixture<AccuracyChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccuracyChartComponent]
    });
    fixture = TestBed.createComponent(AccuracyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
