import { currencyCommasModule } from './../../../Common/pipe/currency-commas.module';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';
import { FormsModule } from '@angular/forms';
import { CapabilityModule } from './../../../capability/capability.module';
import { IonicModule } from '@ionic/angular';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PaymentConfirmationComponent } from "./payment-confirmation/payment-confirmation.component";
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'vault',
    }
    ,
    {
        path: 'PaymentConfirmation',
        component: PaymentConfirmationComponent
    },
    {
        path: 'Invoice',
        component: InvoiceComponent
    }

]
@NgModule({
    
    declarations: [PaymentConfirmationComponent, InvoiceComponent],
    imports: [
        RouterModule.forChild(routes),
        IonicModule,
        CapabilityModule,
        FormsModule,
        CommonModule, 
        TranslateModule, 
        currencyCommasModule
    ],
    exports: []
})

export class GoldModule { }