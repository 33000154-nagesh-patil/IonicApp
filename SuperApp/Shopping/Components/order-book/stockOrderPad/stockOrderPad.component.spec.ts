import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockOrderPadComponent } from './stockOrderPad.component';

describe('StockOrderPadComponent', () => {
    let component: StockOrderPadComponent;
    let fixture: ComponentFixture<StockOrderPadComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ StockOrderPadComponent ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StockOrderPadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});