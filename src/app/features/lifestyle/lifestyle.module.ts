import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LifestylePageRoutingModule } from './lifestyle-routing.module';
import { CoreModule } from 'projects/core/src/public-api';
import { LifestylePage } from './lifestyle.page';
import { LifestyleModule } from 'projects/lifestyle/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    LifestylePageRoutingModule,
    LifestyleModule
  ],
  declarations: [LifestylePage]
})
export class LifestylePageModule {}
