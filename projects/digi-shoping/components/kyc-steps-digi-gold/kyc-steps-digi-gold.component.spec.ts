import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KycStepsDigiGoldComponent } from './kyc-steps-digi-gold.component';

describe('KycStepsDigiGoldComponent', () => {
  let component: KycStepsDigiGoldComponent;
  let fixture: ComponentFixture<KycStepsDigiGoldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KycStepsDigiGoldComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KycStepsDigiGoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
