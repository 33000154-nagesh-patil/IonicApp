import { NgModule } from '@angular/core';
import { PortfolioInsigthsComponent } from './portfolio-insigths.component';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from 'index';
import { CoreModule } from 'projects/core/src/public-api';
@NgModule({
  declarations: [PortfolioInsigthsComponent],
  imports: [CommonModule,RouterModule,IonicModule.forRoot(),TranslateModule,
     CoreModule, FormsModule,
  ],
  exports:[PortfolioInsigthsComponent]
})
export class PortfolioInsigthsModule { }
