import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WealthRoboAdvisoryPage } from './wealth-robo-advisory.page';

const routes: Routes = [
  {
    path: '',
    component: WealthRoboAdvisoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WealthRoboAdvisoryPageRoutingModule {}
