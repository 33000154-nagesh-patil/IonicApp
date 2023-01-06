// import { LineChartComponent } from './../Components/Common/line-chart/line-chart.component';
import { AddprofileComponent } from './../Components/order-book/components/addprofile/addprofile.component';
import { AddAddressComponent } from './../Components/order-book/components/add-address/add-address.component';
import { LandingComponent } from './../Components/landing/landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { NeobankingModule } from './../Components/wealth/Neo-banking/neobanking.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
// import { CardComponent } from './../../capability/components/card/card.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
// import { SkeletonElementComponent } from './../../../src/app/features/education/components/skeleton-element/skeleton-element.component';
import { ListingComponent } from '../Components/Common/listing/listing.component';
import { TranslateModule } from './../../Common/pipe/translate.module';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InfostepComponent } from '../Components/Common/infostep/infostep.component';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardComponent } from 'SuperApp/Shopping/Components/Common/card/card.component';
import {CommanCardComponent} from '../Components/Common/common-card/common-card.component';
import { MediaComponent } from '../Components/Common/media/media.component';
import { StatichtmlComponent } from '../Components/Common/statichtml/statichtml.component';
import { DigiGoldBottomCardComponent } from '../Components/order-book/components/digiGoldBottomCard/digiGoldBottomCard.component';
import { OrderBookComponent } from '../Components/order-book/order-book.component';
import { DetailComponent } from '../Components/Common/detail/detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BillpaymentModule } from '../Components/wealth/Bill Payment/billpayment.module';
import { NeoModuleModule } from '../Components/wealth/NeoBank/neo-module.module';
import { StockOrderPadComponent } from '../Components/order-book/stockOrderPad/stockOrderPad.component';
import { DetailComponentOperation } from 'SuperApp/Operations/Vaultdetail/Vaultdetail.component';
import { LongPressDirective } from 'SuperApp/Shopping/Module/long-press.directive'
import { EditWatchListComponent } from 'projects/wealth-wellness/src/component/component/wealth-watchlist/edit-watch-list/edit-watch-list.component';
import { MarketIndicesComponent } from '../Components/wealth/stocks/components/market-indices/market-indices.component';
import { AddWatchListComponent } from '../Components/wealth/stocks/components/add-watch-list/add-watch-list.component';
import { HealthdocComponent } from '../Components/healthdoc/healthdoc.component';
import { HealthimgComponent } from '../Components/healthimg/healthimg.component';
import { HealthuploadimgComponent } from '../Components/healthuploadimg/healthuploadimg.component';
import { StockCard } from '../Components/Common/card/stockCard';
import { MBPComponent } from '../Components/Common/detail/marketDepth.component';




const routes: Routes = [
    {
    path: '',
    redirectTo: 'Wealth',
    pathMatch: 'full'
    },
    {
        path: 'Wealth',
        loadChildren:() => import('./wealth-routing').then(m => m.WealthRoutingModule)
    },
    {
        path: 'Landing',
        loadChildren:() => import('../../Engagement/landing/landing.module').then(m => m.LandingModule)
    },{
        path: 'listing',
        // loadChildren:() => import('./health-routing').then(m => m.HealthRoutingModule)
        component: ListingComponent
    },
    {
        path:'OrderBook',
        component:OrderBookComponent
    },
    {
        path:'Detail',
        component:DetailComponent
    },
    {
        path:'Details',
        component:DetailComponentOperation
    },
    {
        path:'AddProfileDetails',
        component:AddprofileComponent
    },
    {
        path:'AddProfileAddress',
        component:AddAddressComponent
    },
    {
        path:'HealthDoc',
        component:HealthdocComponent
    }




];

@NgModule({
    declarations: [
        ListingComponent,
        // SkeletonElementComponent,
        CardComponent,
        MediaComponent,
        StatichtmlComponent,
        OrderBookComponent,
        DigiGoldBottomCardComponent,
        DetailComponent,
        LandingComponent,
        LongPressDirective,
        AddAddressComponent,
        AddprofileComponent,
        StockOrderPadComponent,
        DetailComponentOperation,
        EditWatchListComponent,MarketIndicesComponent,
        AddWatchListComponent,HealthdocComponent,HealthimgComponent,HealthuploadimgComponent,

        StockCard,MBPComponent
        // LineChartComponent
    ],
    imports: [

        RouterModule.forChild(routes),
         BillpaymentModule,
         NeoModuleModule,
        IonicModule,
        TranslateModule,
        NgbModule,
        CommonModule,
        CapabilityModule,
        MatExpansionModule,
        NgApexchartsModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDatepickerModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatProgressSpinnerModule

    ],

    exports: [
        ListingComponent,
        CardComponent,
        MediaComponent,
        StatichtmlComponent,
        DetailComponentOperation,HealthdocComponent,
        // LineChartComponent
    ],

    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],

})
export class Shopping{

}
