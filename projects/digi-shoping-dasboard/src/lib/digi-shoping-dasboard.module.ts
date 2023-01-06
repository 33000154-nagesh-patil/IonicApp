import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { GoldHoldingsComponent } from './../../components/gold-holdings/gold-holdings.component';
import { DigiShopingDasboardComponent } from './digi-shoping-dasboard.component';
import { IonicModule } from '@ionic/angular';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { BenifitsComponent } from 'projects/digi-shoping-dasboard/components/benifits/benifits.component';
import { GoldInvestmentsComponent } from 'projects/digi-shoping-dasboard/components/gold-investments/gold-investments.component';
import { SilverHoldingsComponent } from 'projects/digi-shoping-dasboard/components/silver-holdings/silver-holdings.component';
import { SilverInvestmentsComponent } from 'projects/digi-shoping-dasboard/components/silver-investments/silver-investments.component';
import { MatInputModule } from '@angular/material/input';
import { CoreModule } from 'projects/core/src/public-api';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({ 
  declarations: [ DigiShopingDasboardComponent,BenifitsComponent,GoldInvestmentsComponent,SilverInvestmentsComponent,SilverHoldingsComponent,GoldHoldingsComponent],
  imports: [MatRadioModule,IonicModule,
    MatExpansionModule,CommonModule, MatInputModule,CoreModule,NgChartsModule,FormsModule,NgApexchartsModule
   
  ],exports:[DigiShopingDasboardComponent,BenifitsComponent,GoldInvestmentsComponent,GoldHoldingsComponent,SilverHoldingsComponent,SilverInvestmentsComponent,GoldHoldingsComponent]
})
export class DigiShopingDasboardModule { }
