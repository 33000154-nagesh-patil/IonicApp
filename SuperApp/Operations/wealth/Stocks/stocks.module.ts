import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// import { StockProfileComponent } from './stock-profile/stock-profile.component';
const routes: Routes = [
  {
    path:"",
    // component:StockProfileComponent
  },
  {
    path:'ClientDetails',
    // component:ClientDetailsComponent
  },
  {
    path:'goToDematFunds',
    // component:DematFundsComponent
  },
  {
    path: 'goToHistoricalReports',
    // component: HistoricalReportComponent
  },
  {
    path: 'goToSetting',
    // component: SettingComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [ ]
})
export class StocksModule { }
