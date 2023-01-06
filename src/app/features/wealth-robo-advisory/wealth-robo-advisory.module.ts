import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WealthRoboAdvisoryPageRoutingModule } from './wealth-robo-advisory-routing.module';

import { WealthRoboAdvisoryPage } from './wealth-robo-advisory.page';
import { CoreModule } from 'projects/core/src/public-api';
import { WealthRoboAdvisoryModule } from 'projects/wealth-robo-advisory/src/public-api';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    WealthRoboAdvisoryPageRoutingModule,
    WealthRoboAdvisoryModule
  ],
  declarations: [WealthRoboAdvisoryPage]
})
export class WealthRoboAdvisoryPageModule {}
