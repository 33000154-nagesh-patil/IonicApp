import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoldPageRoutingModule } from './gold-routing.module';
import { CoreModule } from 'projects/core/src/public-api';
import { GoldPage } from './gold.page';
import { GoldModule } from 'projects/gold/src/public-api';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoldPageRoutingModule,
    CoreModule,GoldModule
  ],
  declarations: [GoldPage]
})
export class GoldPageModule {}
