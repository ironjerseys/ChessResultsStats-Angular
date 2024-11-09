import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCountComponent } from './games-count.component';

describe('GamesCountComponent', () => {
    let component: GamesCountComponent;
    let fixture: ComponentFixture<GamesCountComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GamesCountComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(GamesCountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
