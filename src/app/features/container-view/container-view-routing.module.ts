import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContainerViewPage } from './container-view.page';

const routes: Routes = [
  {
    path: '',
    component: ContainerViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContainerViewPageRoutingModule {}
