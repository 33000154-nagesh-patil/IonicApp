import { MatInputModule } from '@angular/material/input';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { Shopping } from 'SuperApp/Shopping/Module/shopping.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaultComponent } from './vault/vault.component';
import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { DetailComponentOperation } from './Vaultdetail/Vaultdetail.component';
import { StockProfileComponent } from './wealth/Stocks/stock-profile/stock-profile.component';
import { TranslateModule } from 'index';
import { TrackOrderComponent } from './track-order/track-order.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ClientDetailsComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/client-details/client-details.component';
import { ClientdetailsComponent } from './wealth/Stocks/clientdetails/clientdetails.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { StAddFundsComponent } from './wealth/Stocks/st-add-funds/st-add-funds.component';
import { StFundsComponent } from './wealth/Stocks/st-funds/st-funds.component';
import { ReedemtranscationComponent } from 'SuperApp/Fulfillment/Components/mutualFund/reedemtranscation/reedemtranscation.component';
import { Fulfillment } from 'SuperApp/Fulfillment/Module/Fullfillment.module';
import { MedicineTrackOrderComponent } from './medicine-track-order/medicine-track-order.component';



const routes: Routes = [
    { path: '', redirectTo: 'TrackOrder', pathMatch: 'full' },
    {
        path: "Wealth",
        loadChildren: () => import('./wealth/wealth.module').then(m => m.WealthModule)
    },
    {
        path: 'Vault',
        component: VaultComponent
    },
    {
        path: 'Learn',
        component: VaultComponent
    },
    {
        path: 'Track',
        component: VaultComponent
    },
    {
        path:'Assessment',
        component: VaultComponent
    },
    {
        path:'Jobs',
        component: VaultComponent
    },
    {
        path:'Confirmation',
        component: ConfirmationComponent
    },
    {
      path:'Account',
      component:StockProfileComponent
    },
    {
        path:'TrackOrder',
        component: TrackOrderComponent
    },
    {
        path:'TrackOrdermedicine',
        component: MedicineTrackOrderComponent
    }
]
@NgModule({
    declarations: [VaultComponent,MedicineTrackOrderComponent,ConfirmationComponent,TrackOrderComponent,StockProfileComponent,ClientDetailsComponent,ClientdetailsComponent,StAddFundsComponent,StFundsComponent],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        IonicModule,
        TranslateModule,
        Shopping,
        CapabilityModule,
        MatInputModule,
        MatExpansionModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule,
        Fulfillment


    ],
    providers: [],
    exports: []
})

export class OperationModule { }
