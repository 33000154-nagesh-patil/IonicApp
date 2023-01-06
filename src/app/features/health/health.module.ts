import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HealthPageRoutingModule } from './health-routing.module';

import { HealthPage } from './health.page';
import { CoreModule } from 'projects/core/src/public-api';
import { HealthModule } from 'projects/health/src/public-api';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HealthPageRoutingModule,
    CoreModule,
    HealthModule
  ],
  declarations: [HealthPage]
})
export class HealthPageModule {}
