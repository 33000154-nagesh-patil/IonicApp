import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AadharOnboardKycComponent } from './aadhar-onboard-kyc.component';

describe('AadharOnboardKycComponent', () => {
  let component: AadharOnboardKycComponent;
  let fixture: ComponentFixture<AadharOnboardKycComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AadharOnboardKycComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AadharOnboardKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
