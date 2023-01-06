import { NgModule } from '@angular/core';
import { GoldComponent } from './gold.component';
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { GoldDashboardComponent } from './components/gold-dashboard/gold-dashboard.component';
import { GoldInvestmentDashboardComponent } from './components/gold-investment-dashboard/gold-investment-dashboard.component';
import { currencyCommasModule } from 'projects/core/src/lib/pipe/currency-commas.module';
import { CoreModule } from 'projects/core/src/public-api';
@NgModule({
  declarations: [GoldComponent,GoldDashboardComponent,GoldInvestmentDashboardComponent],
  imports: [IonicModule,CommonModule,TranslateModule,currencyCommasModule,CoreModule
  ],
  exports:[GoldComponent,GoldDashboardComponent,GoldInvestmentDashboardComponent]
})
export class GoldModule { }
