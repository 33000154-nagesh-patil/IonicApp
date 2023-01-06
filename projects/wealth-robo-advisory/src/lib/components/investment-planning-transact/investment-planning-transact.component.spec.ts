import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InvestmentPlanningTransactComponent } from './investment-planning-transact.component';

describe('InvestmentPlanningTransactComponent', () => {
  let component: InvestmentPlanningTransactComponent;
  let fixture: ComponentFixture<InvestmentPlanningTransactComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentPlanningTransactComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentPlanningTransactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
