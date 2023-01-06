import { MatRadioModule } from '@angular/material/radio';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CapabilityModule } from "SuperApp/capability/capability.module";
import { TranslateModule } from "SuperApp/Common/pipe/translate.module";
import { WealthComponent } from "../Components/wealth/wealth.component";

const routes: Routes = [
    {
        path: "",
        component: WealthComponent
    },
    {
        path:"Stocks",//wealth/Stocks
        loadChildren:() => import('../Components/wealth/stocks/stocks.module').then(m => m.StocksModule)
    },
    {
        path:"la",//wealth/MutualFunds
        loadChildren:() => import('../Components/wealth/mutual-funds/mutual-funds.module').then(m => m.MutualFundsModule)
    },
    {
        path:"Gold",//wealth/Gold
        loadChildren:() => import('../Components/wealth/gold/gold.module').then(m => m.GoldModule)
    },
    {
        path: 'RoboAdvisory',
        loadChildren: () => import('src/app/features/wealth-robo-advisory/wealth-robo-advisory.module').then( m => m.WealthRoboAdvisoryPageModule),
    },
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        IonicModule,
        CapabilityModule,
        TranslateModule,
        CommonModule,
        MatExpansionModule,
        NgApexchartsModule,
        MatRadioModule,
        
],
    declarations: [WealthComponent

    
    ],
})
export class WealthRoutingModule {}