import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { StockProfileComponent } from "./Stocks/stock-profile/stock-profile.component";

const routes: Routes = [
    {
        path: "Gold",
        loadChildren: () => import('./gold/gold.module').then(m => m.GoldModule)
    },
    {
        path: "MutualFunds",
        loadChildren: () => import('../wealth/MutualFund/MutualFunds.module').then(m => m.MutualFundsModule)
    },
    {
        path: "Stocks",
        loadChildren: () => import('../wealth/Stocks/stocks.module').then(m => m.StocksModule)
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    providers: [],
    exports: []
})

export class WealthModule { }
