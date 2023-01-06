import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DigiShopingDasboardComponent } from './digi-shoping-dasboard.component';

describe('DigiShopingDasboardComponent', () => {
  let component: DigiShopingDasboardComponent;
  let fixture: ComponentFixture<DigiShopingDasboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DigiShopingDasboardComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DigiShopingDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
