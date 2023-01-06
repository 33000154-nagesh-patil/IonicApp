import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreLabHealthPageRoutingModule } from './explore-lab-health-routing.module';

import { ExploreLabHealthPage } from './explore-lab-health.page';
import { CoreModule } from 'projects/core/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    ExploreLabHealthPageRoutingModule,
  ],
  declarations: [ExploreLabHealthPage]
})
export class ExploreLabHealthPageModule {}
