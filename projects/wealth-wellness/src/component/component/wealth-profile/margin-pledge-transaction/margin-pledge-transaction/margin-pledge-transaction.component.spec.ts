import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarginPledgeTransactionComponent } from './margin-pledge-transaction.component';

describe('MarginPledgeTransactionComponent', () => {
  let component: MarginPledgeTransactionComponent;
  let fixture: ComponentFixture<MarginPledgeTransactionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MarginPledgeTransactionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarginPledgeTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
