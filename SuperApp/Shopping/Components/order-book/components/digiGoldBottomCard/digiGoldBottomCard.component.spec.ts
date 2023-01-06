import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigiGoldBottomCardComponent } from './digiGoldBottomCard.component';

describe('DigiGoldBottomCardComponent', () => {
    let component: DigiGoldBottomCardComponent;
    let fixture: ComponentFixture<DigiGoldBottomCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DigiGoldBottomCardComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DigiGoldBottomCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});