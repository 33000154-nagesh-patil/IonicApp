import { ListingComponent } from './../../Common/listing/listing.component';
import { FundsPortfolioComponent } from './components/funds-portfolio/funds-portfolio.component';
import { AllmutualfundcardComponent } from 'projects/new-lib/src/lib/allmutualfundcard/allmutualfundcard.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule  } from '@angular/material/stepper';
import { TranslateModule } from "SuperApp/Common/pipe/translate.module";
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InvestComponent } from './components/invest/invest.component';
import { MFCardDetailComponent } from './components/mfcard-detail/mfcard-detail.component';
import { CompareFundsComponent } from './components/compare-funds/compare-funds.component';
import { CompareFundComponent } from './components/compare-fund/compare-fund.component';
import { FilterComponent } from './components/filter/filter.component';
import { MFcategoryCardComponent } from './components/mfcategory-card/mfcategory-card.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { NgModule } from '@angular/core';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { ExploreFundsComponent } from './components/explore-funds/explore-funds.component';
import { MFLandingAFCComponent } from './components/mflanding-afc/mflanding-afc.component';
import { StepeerOnbordingComponent } from './components/stepeer-onbording/stepeer-onbording.component';
import { GridcardsComponent } from './components/gridcards/gridcards.component';
import { MyPortfolioComponent } from './components/my-portfolio/my-portfolio.component';


const routes: Routes = [
    
  {
    path:"",
    component:DashboardComponent
  },
  {
    path:"Invest",
    component: InvestComponent
  },
  {
    path: 'detail',
    component: MFCardDetailComponent
    // loadChildren: () => import('./Detail.module').then( m => m.DetailModule),
},
{
    path: 'comparelist',
    component: CompareFundComponent
    // loadChildren: () => import('./Detail.module').then( m => m.DetailModule),
},
{
    path: 'compareFunds',
    component: CompareFundsComponent
    // loadChildren: () => import('./Detail.module').then( m => m.DetailModule),
},
{
    path: 'filter',
    component: FilterComponent
    // loadChildren: () => import('./Detail.module').then( m => m.DetailModule),
},
{
    path: 'category',
    component: MFcategoryCardComponent
    // loadChildren: () => import('./Detail.module').then( m => m.DetailModule),
},
{
    path: 'Watchlist',
    component: WatchlistComponent
    // loadChildren: () => import('./Detail.module').then( m => m.DetailModule),
},
{
  path: "Listing",
  component: ListingComponent
}

]

@NgModule({
  declarations: [
    StepeerOnbordingComponent,
    ExploreFundsComponent,
    FundsPortfolioComponent,
    MyPortfolioComponent,
    DashboardComponent,
    WatchlistComponent,
    MFLandingAFCComponent,
    InvestComponent,
    MFCardDetailComponent,
    GridcardsComponent,
    CompareFundComponent,
    CompareFundsComponent,
    FilterComponent,
    MFcategoryCardComponent,
    AllmutualfundcardComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    TranslateModule,
    CapabilityModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    StepeerOnbordingComponent,
    ExploreFundsComponent,
    FundsPortfolioComponent,
    MyPortfolioComponent,
    DashboardComponent,
    WatchlistComponent,
    MFLandingAFCComponent,
    InvestComponent,
    MFCardDetailComponent,
    GridcardsComponent,
    CompareFundComponent,
    CompareFundsComponent,
    FilterComponent,
    MFcategoryCardComponent,
    AllmutualfundcardComponent
  ]
})
export class MutualFundsModule { }
