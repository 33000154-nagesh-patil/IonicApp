import { ReedemtranscationComponent } from './../Components/mutualFund/reedemtranscation/reedemtranscation.component';
import { Shopping } from './../../Shopping/Module/shopping.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { EduCheckoutComponent } from './../Components/edu-checkout/edu-checkout.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { currencyCommasModule } from 'SuperApp/Common/pipe/currency-commas.module';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';
import { PaymentConfirmationComponent } from '../Components/payment-confirmation/payment-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { CartModule } from './Cart.module';
import { SellOrderBookComponent } from '../Components/sell-order-book/sell-order-book.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TorusbannerComponent } from '../Components/torusbanner/torusbanner.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'cart',
        loadChildren: () => import('./Cart.module').then(m => m.CartModule)
    },
    {
        path: 'Checkout',
        component: EduCheckoutComponent
    },
    {
        path: 'Payment/:status',
        component: PaymentConfirmationComponent
    },
    {
        path: 'Gold',
        loadChildren: () => import('../Components/gold/gold.module').then(m => m.GoldModule)
    },
    {
        path: 'MutualFunds',
        loadChildren: () => import('../Components/mutualFund/MutualFunds.module').then(m => m.MutualFundsModule)
    },
    {
        path: 'SellOrderBook',
        component: SellOrderBookComponent
    },
    // {
    //     path: 'RedeemOtp',
    //     component: RedeemOtpComponent
    // }


]

@NgModule({
    declarations: [
        EduCheckoutComponent,
        SellOrderBookComponent,
        PaymentConfirmationComponent,
        TorusbannerComponent,

        ReedemtranscationComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CapabilityModule,
        IonicModule,
        CommonModule,
        FormsModule,
        MatExpansionModule,
        currencyCommasModule,
        TranslateModule,
        MatButtonModule,
        CartModule,
        Shopping,
        MatExpansionModule,
        NgApexchartsModule,
        MatRadioModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        ReedemtranscationComponent

    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],

})
export class Fulfillment { }