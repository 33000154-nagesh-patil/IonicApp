import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { WealthRoboAdvisoryComponent } from './wealth-robo-advisory.component';
import { InvestmentPlanningComponent } from './components/investment-planning/investment-planning.component';
import { InvestmentPlanningTrackComponent } from './components/investment-planning-track/investment-planning-track.component';
import { InvestmentPlanningTransactComponent } from './components/investment-planning-transact/investment-planning-transact.component';
import { currencyCommasModule } from 'projects/core/src/lib/pipe/currency-commas.module';
import { PlanningTrackModalComponent } from './components/planning-track-modal/planning-track-modal.component';
import { PlanningTranslateModalComponent } from './components/planning-translate-modal/planning-translate-modal.component';
import { PlanningRecommendedModalComponent } from './components/planning-recommended-modal/planning-recommended-modal.component';
@NgModule({
  declarations: [WealthRoboAdvisoryComponent,InvestmentPlanningComponent,InvestmentPlanningTrackComponent,InvestmentPlanningTransactComponent,PlanningTrackModalComponent,PlanningTranslateModalComponent,PlanningRecommendedModalComponent],
  imports: [CommonModule,IonicModule,TranslateModule,currencyCommasModule
  ],
  exports:[WealthRoboAdvisoryComponent,InvestmentPlanningComponent,InvestmentPlanningTrackComponent,InvestmentPlanningTransactComponent,PlanningTrackModalComponent,PlanningTranslateModalComponent,PlanningRecommendedModalComponent]
})
export class WealthRoboAdvisoryModule { }
