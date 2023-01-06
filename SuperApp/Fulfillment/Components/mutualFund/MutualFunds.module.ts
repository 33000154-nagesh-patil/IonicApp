import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';
import { InvestSIPComponent } from './invest-sip/invest-sip.component';
import { MFPaymentConfimationComponent } from './mfpayment-confimation/mfpayment-confimation.component';
import { MyInvestmentComponent } from './my-investment/my-investment.component';
import { PaymentConfirmationComponent } from './payment-confirmation/payment-confirmation.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { MfRedemptionComponent } from './mf-redemption/mf-redemption.component';
import { MySipComponent } from './my-sip/my-sip.component';
import { ManageSIPComponent } from './manage-sip/manage-sip.component';
import { RedeemConfirmationComponent } from './redeem-confirmation/redeem-confirmation.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: 'payment',
    },
    {
        path: 'payment',
        component: InvestSIPComponent,
    },
    {
        path: 'paymentConfimation',
        component: MFPaymentConfimationComponent,
    },
    {
        path: 'ReedemDetail',
        component:MyInvestmentComponent ,
    },
    {
        path: 'transaction',
        component:TransactionHistoryComponent ,
    },
    {
        path: 'Reedem',
        component: MfRedemptionComponent,
    },
    {
        path: 'MySip',
        component: MySipComponent,
    },
    {
        path: 'ManageSip',
        component: ManageSIPComponent,
    },
    {
        path: 'Confirmation',
        component: RedeemConfirmationComponent,
    },



]

@NgModule({

    declarations: [
        InvestSIPComponent,
        MFPaymentConfimationComponent,
        MyInvestmentComponent,
        ManageSIPComponent,
        MySipComponent,
        TransactionHistoryComponent,
        PaymentConfirmationComponent,
        MfRedemptionComponent,
        RedeemConfirmationComponent

    ],
    imports: [
        RouterModule.forChild(routes),
        IonicModule,
        CapabilityModule,
        CommonModule,
        MatSelectModule,
        MatExpansionModule,
        MatCheckboxModule,
        MatSliderModule,
        MatRadioModule,
        MatNativeDateModule,
        TranslateModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatDatepickerModule


    ],
    exports: [
        InvestSIPComponent,
        MFPaymentConfimationComponent,
        MyInvestmentComponent

    ]
})

export class MutualFundsModule { }
