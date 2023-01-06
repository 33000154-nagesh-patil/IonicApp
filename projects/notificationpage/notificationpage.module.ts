import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { NotificationFilterComponent } from './notification-filter/notification-filter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FiltercomponentComponent } from './filtercomponent/filtercomponent.component';
import { NotificationpagePageRoutingModule } from './notificationpage-routing.module';
import { NotificationScreenComponent } from './notification-screen/notification-screen.component';
import { NotificationpagePage } from './notificationpage.page';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
// import { DirectivesModule } from '../directives/directives.module';

import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  imports: [
    TranslateModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    NotificationpagePageRoutingModule
  ],
  providers:[MatDatepickerModule,MatNativeDateModule,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  declarations: [ NotificationScreenComponent, FiltercomponentComponent,NotificationFilterComponent,NotificationpagePage]
})
export class NotificationpagePageModule {}
