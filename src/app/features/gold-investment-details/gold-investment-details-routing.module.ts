import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoldInvestmentDetailsPage } from './gold-investment-details.page';

const routes: Routes = [
  {
    path: '',
    component: GoldInvestmentDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoldInvestmentDetailsPageRoutingModule {}
