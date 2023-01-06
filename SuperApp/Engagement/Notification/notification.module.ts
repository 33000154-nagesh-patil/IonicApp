import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';
import { NotificationFilterComponent } from './notification-filter/notification-filter.component';
import { NotificationNewComponent } from './notification-new/notification-new.component';
import { NotificationComponent } from './notification.component';

const routes: Routes = [
  { path: '', redirectTo: 'getAllNotification', pathMatch: 'full' },

  {
    path: 'getAllNotification',
    component: NotificationComponent,
  },
];

@NgModule({
  declarations: [NotificationNewComponent,NotificationComponent,NotificationFilterComponent],
  imports: [RouterModule.forChild(routes), CommonModule, IonicModule,CapabilityModule,FormsModule,MatInputModule,MatDatepickerModule,TranslateModule],
  exports: [NotificationNewComponent,NotificationComponent],
})
export class NotificationModule {}
