import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WealthRoboAdvisoryComponent } from './wealth-robo-advisory.component';

describe('WealthRoboAdvisoryComponent', () => {
  let component: WealthRoboAdvisoryComponent;
  let fixture: ComponentFixture<WealthRoboAdvisoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WealthRoboAdvisoryComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WealthRoboAdvisoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
