import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MFPaymentConfimationComponent } from './mfpayment-confimation.component';

describe('MFPaymentConfimationComponent', () => {
  let component: MFPaymentConfimationComponent;
  let fixture: ComponentFixture<MFPaymentConfimationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MFPaymentConfimationComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MFPaymentConfimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
