import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { DashboardPage } from './dashboard.page';
import { PortfolioInsigthsModule } from 'projects/portfolio-insigths/src/public-api';
import { WealthWellnessModule } from 'projects/wealth-wellness/src/public-api';
import { CoreModule } from 'projects/core/src/public-api';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    CoreModule ,
    PortfolioInsigthsModule ,
    WealthWellnessModule ,

  ],
  declarations: [DashboardPage],
  exports:[DashboardPage]
})
export class DashboardPageModule {}
