import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinrateHistogramComponent } from './winrate-histogram.component';

describe('WinrateHistogramComponent', () => {
  let component: WinrateHistogramComponent;
  let fixture: ComponentFixture<WinrateHistogramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WinrateHistogramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WinrateHistogramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
