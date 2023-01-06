import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DigiLockerAadharComponent } from './digi-locker-aadhar.component';

describe('DigiLockerAadharComponent', () => {
  let component: DigiLockerAadharComponent;
  let fixture: ComponentFixture<DigiLockerAadharComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DigiLockerAadharComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DigiLockerAadharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
