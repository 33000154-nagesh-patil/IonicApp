import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { WealthWellnessComponent } from './wealth-wellness.component';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { CommonModule } from '@angular/common';
// import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MatIconModule } from '@angular/material/icon'
import { Routes, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgChartsModule } from 'ng2-charts';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LongPressDirective } from './long-press.directive';
import { MatRadioModule } from '@angular/material/radio';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { NgApexchartsModule } from 'ng-apexcharts';
import { StockProfileComponent } from '../../component/component/wealth-profile/stock-profile/stock-profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FilterAllComponent } from '../../component/component/filter-all/filter-all.component';
import { FilterComponent } from '../../component/component/filter/filter.component';
import { TestComponentComponent } from '../../component/component/test-component/test-component.component';
import { ApplyIpoComponent } from '../../component/component/wealth-dashbord/apply-ipo/apply-ipo.component';
import { BlackDealComponent } from '../../component/component/wealth-dashbord/black-deal/black-deal.component';
import { EventsComponent } from '../../component/component/wealth-dashbord/events/events.component';
import { FundsPortfolioComponent } from '../../component/component/wealth-dashbord/funds-portfolio/funds-portfolio.component';
import { GoldHoldingsComponent } from '../../component/component/wealth-dashbord/gold-holdings/gold-holdings.component';
import { HoldingSummaryComponent } from '../../component/component/wealth-dashbord/holding-summary/holding-summary.component';
import { IpoComponent } from '../../component/component/wealth-dashbord/ipo/ipo.component';
import { MarketIndicesComponent } from '../../component/component/wealth-dashbord/market-indices/market-indices.component';
import { MarketMoversComponent } from '../../component/component/wealth-dashbord/market-movers/market-movers.component';
import { MyPortfolioComponent } from '../../component/component/wealth-dashbord/my-portfolio/my-portfolio.component';
import { NewportFolioComponent } from '../../component/component/wealth-dashbord/newport-folio/newport-folio.component';
import { StockSreen7Component } from '../../component/component/wealth-dashbord/stock-sreen7/stock-sreen7.component';

import { AddFundsComponent } from '../../component/component/wealth-profile/add-funds/add-funds.component';
import { CreateUPIDComponent } from '../../component/component/wealth-profile/create-upid/create-upid.component';
import { DeclarationComponent } from '../../component/component/wealth-profile/declaration/declaration.component';
import { DematFundsComponent } from '../../component/component/wealth-profile/demat-funds/demat-funds.component';
import { DigitalSignComponent } from '../../component/component/wealth-profile/digital-sign/digital-sign/digital-sign.component';
import { Digital257Component } from '../../component/component/wealth-profile/digital257/digital257/digital257.component';
import { ExchangeMsgComponent } from '../../component/component/wealth-profile/exchange-msg/exchange-msg.component';
import { HistoricalReportComponent } from '../../component/component/wealth-profile/historical-report/historical-report.component';
import { IncreaseM244Component } from '../../component/component/wealth-profile/increase-m244/increase-m244.component';
import { IncreaseMarginComponent } from '../../component/component/wealth-profile/increase-margin/increase-margin.component';
import { LinksComponent } from '../../component/component/wealth-profile/links/links.component';
import { IncomeUpdatedComponent } from '../../component/component/wealth-profile/managelock/income-updated/income-updated.component';
import { ManagelockComponent } from '../../component/component/wealth-profile/managelock/managelock.component';
import { MarginPledgeTransactionComponent } from '../../component/component/wealth-profile/margin-pledge-transaction/margin-pledge-transaction/margin-pledge-transaction.component';
import { NewStkPledgeComponent } from '../../component/component/wealth-profile/new-stk-pledge/new-stk-pledge.component';
import { OptionCalcComponent } from '../../component/component/wealth-profile/option-calc/option-calc.component';
import { Pledge240Component } from '../../component/component/wealth-profile/pledge240/pledge240/pledge240.component';
import { Pledge241Component } from '../../component/component/wealth-profile/pledge241/pledge241/pledge241.component';
import { SebiRegistationComponent } from '../../component/component/wealth-profile/sebi-registation/sebi-registation.component';
import { SettingComponent } from '../../component/component/wealth-profile/setting/setting.component';
import { StockPledgingComponent } from '../../component/component/wealth-profile/stock-pledging/stock-pledging.component';
import { STsettings1Component } from '../../component/component/wealth-profile/stsettings1/stsettings1.component';
import { ThemechangeComponent } from '../../component/component/wealth-profile/themechange/themechange.component';
import { TransactionHistory1Component } from '../../component/component/wealth-profile/transaction-history1/transaction-history1.component';
import { UpdateEmailComponent } from '../../component/component/wealth-profile/update-email/update-email.component';
import { UpdateIncomeRangeComponent } from '../../component/component/wealth-profile/update-income-range/update-income-range.component';
import { UpdateMobileNumberComponent } from '../../component/component/wealth-profile/update-mobile-number/update-mobile-number.component';
import { UpdateNomineeDetailsComponent } from '../../component/component/wealth-profile/update-nominee-details/update-nominee-details.component';
import { WealthMarginComponent } from '../../component/component/wealth-profile/wealth-margin/wealth-margin.component';
import { WithdrawFundsComponent } from '../../component/component/wealth-profile/withdraw-funds/withdraw-funds.component';
import { BuyNsellComponent } from '../../component/component/wealth-trade/buy-nsell/buy-nsell.component';
import { CandlechartComponent } from '../../component/component/wealth-trade/candlechart/candlechart.component';
import { ConvertComponent } from '../../component/component/wealth-trade/convert/convert.component';
import { MrktOrder5Component } from '../../component/component/wealth-trade/mrkt-order5/mrkt-order5.component';
import { MrktOrder6Component } from '../../component/component/wealth-trade/mrkt-order6/mrkt-order6.component';
import { OrderAcknowledgementComponent } from '../../component/component/wealth-trade/order-acknowledgement/order-acknowledgement.component';
import { OrderComponent } from '../../component/component/wealth-trade/order/order.component';
import { StkModCancelComponent } from '../../component/component/wealth-trade/stk-mod-cancel/stk-mod-cancel.component';
import { StockDetailsComponent } from '../../component/component/wealth-trade/stock-details/stock-details.component';
import { AddWatchListComponent } from '../../component/component/wealth-watchlist/add-watch-list/add-watch-list.component';
import { CreateWatchListComponent } from '../../component/component/wealth-watchlist/create-watch-list/create-watch-list.component';
import { NewListComponent } from '../../component/component/wealth-watchlist/new-list/new-list.component';
import { WatchListNewComponent } from '../../component/component/wealth-watchlist/watch-list-new/watch-list-new.component';
import { CoreModule } from 'projects/core/src/lib/core.module';
import { WealthDashbordComponent } from '../../component/component/wealth-dashbord/wealth-dashbord.component';

//Components imports

const routes: Routes = [

  {
    path: 'WealthD',
    component: WealthDashbordComponent
  },
  {
    path: 'WatchList',
    component: WatchListNewComponent
  },
  {
    path: 'Trades',
    component: OrderComponent
  },
  {
    path: 'Account',
    component: StockProfileComponent
  },
  {
    path: 'ipo',
    component: IpoComponent
  }
  ,
  {
    path: 'wealthmargin',
    component: WealthMarginComponent
  },
  {
    path: 'apply-ipo',
    component: ApplyIpoComponent
  },
  {
    path: 'newportFolio',
    component: NewportFolioComponent
  }
  ,
  {
    path: 'updateNominiDetails',
    component: UpdateNomineeDetailsComponent
  }
  
  ,
  {
    path: 'goToDematFunds',
    component: DematFundsComponent
  }
  ,
  {
    path: 'goToSetting',
    component: SettingComponent
  }
  ,
  {
    path: 'changePassword',
    component: STsettings1Component
  }
  ,
  {
    path: 'goToHistoricalReports',
    component: HistoricalReportComponent
  },
  {
    path: 'goToStocksProfile',
    component: StockProfileComponent
  },
  {
    path: 'details',
    component: StockDetailsComponent
  }


];


@NgModule({
  declarations: [NewportFolioComponent, BuyNsellComponent, TestComponentComponent, Digital257Component, IncreaseM244Component, WealthMarginComponent, MarginPledgeTransactionComponent, IncreaseMarginComponent, NewStkPledgeComponent, DigitalSignComponent, DeclarationComponent, Pledge241Component, Pledge240Component, FilterAllComponent, StockPledgingComponent, MrktOrder6Component, MrktOrder5Component, TransactionHistory1Component, FilterComponent, NewListComponent, ExchangeMsgComponent, OptionCalcComponent, SebiRegistationComponent, CandlechartComponent, CreateUPIDComponent, ApplyIpoComponent, UpdateMobileNumberComponent, ConvertComponent, WatchListNewComponent, UpdateIncomeRangeComponent, UpdateEmailComponent, IncomeUpdatedComponent, HistoricalReportComponent, IpoComponent, ManagelockComponent, ThemechangeComponent, LinksComponent, STsettings1Component, SettingComponent, GoldHoldingsComponent, AddFundsComponent, WithdrawFundsComponent,
    DematFundsComponent, StockProfileComponent, StkModCancelComponent, OrderAcknowledgementComponent, 
    
  
    StockDetailsComponent, LongPressDirective, AddWatchListComponent, StockSreen7Component,
    CreateWatchListComponent, HoldingSummaryComponent, WealthWellnessComponent, OrderComponent,
    WealthDashbordComponent, MarketIndicesComponent, MyPortfolioComponent, FundsPortfolioComponent, EventsComponent,
    MarketMoversComponent, BlackDealComponent, UpdateNomineeDetailsComponent, ConvertComponent
  ],
  imports: [ReactiveFormsModule, NgApexchartsModule, MatRadioModule, MatTableModule, IonicModule, TranslateModule, CommonModule, MatInputModule,
    FormsModule, MatFormFieldModule, CoreModule, Ng2SearchPipeModule, MatIconModule, MatCheckboxModule, MatRadioModule, MatSelectModule,
    MatTabsModule, RouterModule.forChild(routes), MatExpansionModule, TranslateModule, NgChartsModule, DragDropModule, MatDatepickerModule,
    [
      // NgCircleProgressModule.forRoot({
      //   "radius": 60,
      //   "space": -10,
      //   "outerStrokeGradient": true,
      //   "outerStrokeWidth": 8,
      //   "outerStrokeColor": "",
      //   "outerStrokeGradientStopColor": "#29AD00",
      //   "innerStrokeColor": "#29AD00",
      //   "innerStrokeWidth": 8,
      //   "subtitle": "",
      //   "titleFontSize": "25",
      //   "titleFontWeight": "600",
      //   "animateTitle": false,
      //   "animationDuration": 1000,
      //   "showUnits": false,
      //   "showBackground": false,
      //   "clockwise": true,
      //   "startFromZero": false,
      //   "lazy": false,
      //   // "maxPercent":5
      //   // "showProgress":false
      // }
      // )
    ]
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [WealthWellnessComponent,
    NewportFolioComponent, BuyNsellComponent, TestComponentComponent, Digital257Component, IncreaseM244Component, WealthMarginComponent, MarginPledgeTransactionComponent, IncreaseMarginComponent, NewStkPledgeComponent, DigitalSignComponent, DeclarationComponent, Pledge241Component, Pledge240Component, FilterAllComponent, StockPledgingComponent, MrktOrder6Component, MrktOrder5Component, TransactionHistory1Component, FilterComponent, NewListComponent, ExchangeMsgComponent, OptionCalcComponent, SebiRegistationComponent, CandlechartComponent, CreateUPIDComponent, ApplyIpoComponent, UpdateMobileNumberComponent, ConvertComponent, WatchListNewComponent, UpdateIncomeRangeComponent, UpdateEmailComponent, IncomeUpdatedComponent, HistoricalReportComponent, IpoComponent, ManagelockComponent, ThemechangeComponent, LinksComponent, STsettings1Component, SettingComponent, GoldHoldingsComponent, AddFundsComponent, WithdrawFundsComponent,
    DematFundsComponent, StockProfileComponent, StkModCancelComponent, OrderAcknowledgementComponent, 
    StockDetailsComponent, LongPressDirective, AddWatchListComponent, StockSreen7Component,
    CreateWatchListComponent, HoldingSummaryComponent, WealthWellnessComponent, OrderComponent,
    WealthDashbordComponent, MarketIndicesComponent, MyPortfolioComponent, FundsPortfolioComponent, EventsComponent,
    MarketMoversComponent, BlackDealComponent, UpdateNomineeDetailsComponent, ConvertComponent]
})
export class WealthWellnessModule { }
