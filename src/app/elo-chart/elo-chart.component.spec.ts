import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EloChartComponent } from './elo-chart.component';

describe('EloChartComponent', () => {
  let component: EloChartComponent;
  let fixture: ComponentFixture<EloChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EloChartComponent]
    });
    fixture = TestBed.createComponent(EloChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
