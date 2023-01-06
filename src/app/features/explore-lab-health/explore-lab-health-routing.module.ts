import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreLabHealthPage } from './explore-lab-health.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreLabHealthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreLabHealthPageRoutingModule {}
