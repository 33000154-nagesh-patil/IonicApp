import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationpagePage } from './notificationpage.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationpagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationpagePageRoutingModule {}
