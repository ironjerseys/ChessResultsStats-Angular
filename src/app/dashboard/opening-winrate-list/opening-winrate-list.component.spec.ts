import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningWinrateListComponent } from './opening-winrate-list.component';

describe('OpeningWinrateListComponent', () => {
    let component: OpeningWinrateListComponent;
    let fixture: ComponentFixture<OpeningWinrateListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [OpeningWinrateListComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OpeningWinrateListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
