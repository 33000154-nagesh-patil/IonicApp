import { Shopping } from './../../../Module/shopping.module';
import { ListingComponent } from './../../Common/listing/listing.component';
import { MatInputModule } from '@angular/material/input';
import { currencyCommasModule } from './../../../../Common/pipe/currency-commas.module';
import { InvestmentDeatailsComponent } from '../gold/components/investment-deatails/investment-deatails.component';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvestComponent } from './components/invest/invest.component';
import { IonicModule } from '@ionic/angular';
import { BenifitsComponent } from './components/benifits/benifits.component';
import { GoldInvestmentsComponent } from './components/gold-investments/gold-investments.component';
import { GoldHoldingsComponent } from './components/gold-holdings/gold-holdings.component';
import { SilverHoldingsComponent } from './components/silver-holdings/silver-holdings.component';
import { SilverInvestmentsComponent } from './components/silver-investments/silver-investments.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { BuyGoldComponent } from './components/buy-gold/buy-gold.component';
import { OrderSummeryComponent } from './components/order-summery/order-summery.component';

const routes: Routes = [
    
  {
    path:"",
    component:DashboardComponent
  },
  {
    path:"getList",
    component:InvestComponent
  },
  {
    path:"getDetail/:metalType",
    component:InvestmentDeatailsComponent
  },
  {
    path:"OrderBook/:metalType/:txnType",
    component:BuyGoldComponent
  },
  {
    path: "Listing",
    component: ListingComponent
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    InvestComponent,
    BenifitsComponent,
    GoldHoldingsComponent,
    GoldInvestmentsComponent,
    SilverHoldingsComponent,
    SilverInvestmentsComponent,
    InvestmentDeatailsComponent,
    BuyGoldComponent,
    OrderSummeryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule,
    MatExpansionModule,
    FormsModule,
    CapabilityModule,
    MatRadioModule,
    NgApexchartsModule,
    NgChartsModule,
    TranslateModule,
    currencyCommasModule,
    MatInputModule,ReactiveFormsModule,
    
  ],
  exports: [ DashboardComponent,
    InvestComponent,
    BenifitsComponent,
    GoldHoldingsComponent,
    GoldInvestmentsComponent,
    SilverHoldingsComponent,
    SilverInvestmentsComponent,
    InvestmentDeatailsComponent,
    BuyGoldComponent,
    OrderSummeryComponent]
})
export class GoldModule { }
