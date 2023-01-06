import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { ProductDetailsComponent } from './product-details.component';
import { KycStepsMFComponent } from 'projects/product-details/components/kyc-steps-mf/kyc-steps-mf.component';
import { CoreModule } from 'projects/core/src/lib/core.module';
@NgModule({
  declarations: [ProductDetailsComponent,KycStepsMFComponent],
  imports: [IonicModule,CommonModule,TranslateModule,CoreModule
  ],
  exports:[ProductDetailsComponent,KycStepsMFComponent]
})
export class ProductDetailsModule { }
