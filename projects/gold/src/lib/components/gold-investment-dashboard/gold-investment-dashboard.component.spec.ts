import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GoldInvestmentDashboardComponent } from './gold-investment-dashboard.component';

describe('GoldInvestmentDashboardComponent', () => {
  let component: GoldInvestmentDashboardComponent;
  let fixture: ComponentFixture<GoldInvestmentDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GoldInvestmentDashboardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GoldInvestmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
