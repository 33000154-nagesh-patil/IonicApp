import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoldInvestmentDetailsPageRoutingModule } from './gold-investment-details-routing.module';

import { GoldInvestmentDetailsPage } from './gold-investment-details.page';
import { CoreModule } from 'projects/core/src/public-api';
import { GoldInvestmentDetailsModule } from 'projects/gold-investment-details/src/public-api';
import {TranslateModule} from 'projects/core/src/lib/pipe/translate.module'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    TranslateModule,
    GoldInvestmentDetailsPageRoutingModule,
    GoldInvestmentDetailsModule
  ],
  declarations: [GoldInvestmentDetailsPage]
})
export class GoldInvestmentDetailsPageModule {}
