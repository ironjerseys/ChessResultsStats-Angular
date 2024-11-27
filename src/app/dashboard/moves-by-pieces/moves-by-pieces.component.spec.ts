import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovesByPiecesComponent } from './moves-by-pieces.component';

describe('MovesByPiecesComponent', () => {
    let component: MovesByPiecesComponent;
    let fixture: ComponentFixture<MovesByPiecesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MovesByPiecesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MovesByPiecesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
