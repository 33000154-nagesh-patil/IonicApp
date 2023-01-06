import { InvoiceComponent } from './../../components/invoice/invoice.component';
import { PanDigiGoldComponent } from './../../components/pan-digi-gold/pan-digi-gold.component';
import { KycStepsDigiGoldComponent } from './../../components/kyc-steps-digi-gold/kyc-steps-digi-gold.component';
import { MatSelectModule } from '@angular/material/select';
import { CustomerdataComponent } from './../../components/customerdata/customerdata.component';
import { MatRadioModule } from '@angular/material/radio';
import { OrderSummeryComponent } from './../../components/order-summery/order-summery.component';
import { BuyGoldComponent } from './../../components/buy-gold/buy-gold.component';
import { InvestComponent } from './../../components/invest/invest.component';
import { SellSilverComponent } from './../../components/sell-silver/sell-silver.component';
import { SellGoldComponent } from './../../components/sell-gold/sell-gold.component';
import { BuySilverComponent } from './../../components/buy-silver/buy-silver.component';
import { DigiShopingComponent } from './digi-shoping.component';
import { IonicModule } from '@ionic/angular';
// import { NgModule } from '@angular/core';
import { CoreModule } from './../../../core/src/lib/core.module';
// import { GoldInvestmentDetailsModule } from './../../../gold-investment-details/src/lib/gold-investment-details.module';
// import { BuygoldComponent } from './../../buygold/buygold.component';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { CommonModule } from '@angular/common';

// import { IonicModule } from '@ionic/angular';
// import { DigiComponent } from './digi.component';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { currencyCommasModule } from 'projects/core/src/lib/pipe/currency-commas.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import {ErrorHandler, LOCALE_ID} from '@angular/core';
import { BankDetailsComponent } from 'projects/core/src/lib/components/bank-details/bank-details.component';
import { InvestmentDeatailsComponent } from 'projects/digi-shoping/components/investment-deatails/investment-deatails.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { PaymentConfirmationComponent } from 'projects/digi-shoping/components/payment-confirmation/payment-confirmation.component';
import { Routes, RouterModule, PreloadingStrategy } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DigiShopingDasboardModule } from 'projects/digi-shoping-dasboard/src/projects';
import { DigiProfileComponent } from 'projects/digi-profile/src/projects';


const routes: Routes = [
  {
    path: 'Invest',
    component: DigiShopingComponent
  },
  {
    path: 'Profile',
    component: DigiProfileComponent
  }
];
@NgModule({
  declarations: [InvoiceComponent, CustomerdataComponent, InvestComponent,BuyGoldComponent,PanDigiGoldComponent,SellSilverComponent,SellGoldComponent,KycStepsDigiGoldComponent,BuySilverComponent,DigiShopingComponent,InvestmentDeatailsComponent,OrderSummeryComponent,PaymentConfirmationComponent],
  
  imports: [DigiShopingDasboardModule,MatSelectModule, MatFormFieldModule,MatOptionModule, MatDatepickerModule, MatRadioModule, RouterModule.forChild(routes),IonicModule,ReactiveFormsModule,CoreModule,CommonModule,TranslateModule,MatInputModule,
    currencyCommasModule,FormsModule,currencyCommasModule,MatExpansionModule
  ], exports:[InvoiceComponent,CustomerdataComponent,InvestComponent,BuyGoldComponent,SellSilverComponent,SellGoldComponent,BuySilverComponent,DigiShopingComponent,InvestmentDeatailsComponent,OrderSummeryComponent,PaymentConfirmationComponent]
})
export class DigiShopingModule { }
