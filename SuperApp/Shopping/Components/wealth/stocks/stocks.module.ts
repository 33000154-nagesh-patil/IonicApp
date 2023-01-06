import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { IonicModule } from '@ionic/angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoreModule } from 'projects/core/src/public-api';
import { TranslateModule } from 'index';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { MyPortfolioComponent } from './components/my-portfolio/my-portfolio.component';
import { WatchListNewComponent } from './components/watch-list-new/watch-list-new.component';
import { CreateWatchListComponent } from './components/create-watch-list/create-watch-list.component';
import { HoldingSummaryComponent } from './components/holding-summary/holding-summary.component';
import { MarketMoversComponent } from './components/market-movers/market-movers.component';
import { EventsComponent } from './components/events/events.component';
import { BlackDealComponent } from './components/black-deal/black-deal.component';
import { CandlechartComponent } from './components/candlechart/candlechart.component';
import { CommonModule } from '@angular/common';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { BuyNsellComponent } from './components/buy-nsell/buy-nsell.component';
import { NewListComponent } from './components/new-list/new-list.component';

// import { OrderAcknowledgementComponent } from './components/order-acknowledgement/order-acknowledgement.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'Watchlist',
    component: WatchListNewComponent,
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    MyPortfolioComponent,
    WatchListNewComponent,
    CreateWatchListComponent,
    HoldingSummaryComponent,
    MarketMoversComponent,
    EventsComponent,
    BlackDealComponent,
    CandlechartComponent,
    StockDetailsComponent,
    BuyNsellComponent,
    NewListComponent
  ],
  imports: [
    MatExpansionModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MatRadioModule,
    MatTableModule,
    IonicModule,
    TranslateModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    CoreModule,
    Ng2SearchPipeModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    RouterModule.forChild(routes),
    CapabilityModule,
    CommonModule,
  ],
})
export class StocksModule {}
