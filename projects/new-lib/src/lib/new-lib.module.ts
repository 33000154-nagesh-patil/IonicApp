import { NgModule } from '@angular/core';
import { NewLibComponent } from './new-lib.component';
import { SipDetailComponent } from './sip-detail/sip-detail.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { RazorpayComponent } from './razorpay/razorpay.component';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MfCardComponent } from './mf-card/mf-card.component';
import { CoreModule } from 'projects/core/src/public-api';
import { AllmutualfundComponent } from './allmutualfund/allmutualfund.component';
import { RouterModule, Routes } from '@angular/router';
import { TogglePaymentsComponent } from './toggle-payments/toggle-payments.component';
import { IonicModule } from '@ionic/angular';
import { MatTabsModule } from '@angular/material/tabs';





@NgModule({
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  declarations: [
    TogglePaymentsComponent,
    NewLibComponent,
    SipDetailComponent,
    RazorpayComponent,
    MfCardComponent,
    AllmutualfundComponent,
  ],
  imports: [
    MatTabsModule,
    CommonModule,
    IonicModule.forRoot(),
    TranslateModule,
    MatStepperModule,
    MatInputModule,
    MatExpansionModule,
    MatCheckboxModule,
    CoreModule,
  ],
  exports: [
    TogglePaymentsComponent,
    NewLibComponent,
    SipDetailComponent,
    RazorpayComponent,
    AllmutualfundComponent,
  ],
})

export class NewLibModule {}
