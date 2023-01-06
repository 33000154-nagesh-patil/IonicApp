// import { AdvisoryCardComponent } from './components/advisory-card/advisory-card.component';
import { SnapshotModelComponent } from './components/snapshot-model/snapshot-model.component';
import { CarouselComponent } from './../Shopping/Components/Common/carousel/carousel.component';
import { InvestmentCardComponent } from './components/investment-card/investment-card.component';
import { SectorComponent } from './../Shopping/Components/Common/sector/sector.component';
import { InfostepComponent } from './../Shopping/Components/Common/infostep/infostep.component';
import { MatRadioModule } from '@angular/material/radio';
// import { BodyComponent } from './components/body/body.component';
import { BodyComponent } from './components/body/body.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';
import { MatInputModule } from '@angular/material/input';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SemigridtypeComponent } from './components/semigridtype/semigridtype.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { BannerComponent } from './components/banner/banner.component';
import { CardComponent } from './components/card/card.component';
import { GridComponent } from './components/3x2grid/grid.component';
import { HeadingComponent } from './components/heading/heading.component';
import { cardDescription, GridtypeComponent } from './components/gridtype/gridtype.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DigiDashboardComponent } from './components/digi-dashboard/digi-dashboard.component';
import { ExplorePortfolioComponent } from './components/explore-portfolio/explore-portfolio.component';
import { CommonCharts } from 'SuperApp/Shopping/Components/Common/CommonCharts/CommonCharts.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { CommanCardComponent } from 'SuperApp/Shopping/Components/Common/common-card/common-card.component';
import { AppSnapshotComponent } from './components/app-snapshot/app-snapshot.component';
import { PortfolioSummaryComponent } from './components/portfolio-summary/portfolio-summary.component';
import { CreditscoreTrackerComponent } from 'SuperApp/Shopping/Components/Common/creditscore-tracker/creditscore-tracker.component';
import { RiskoMeterComponent } from 'SuperApp/Shopping/Components/Common/risko-meter/risko-meter.component';
import { SegmentComponent } from './components/app-snapshot/segment/segment.component';
import { GlobalSearchComponent } from 'SuperApp/Engagement/global-search/global-search.component';
import { AdvisoryCardComponent } from './components/advisory-card/advisory-card.component';
import { LineChartComponent } from 'SuperApp/Shopping/Components/Common/line-chart/line-chart.component';


@NgModule({
  declarations: [
    ExplorePortfolioComponent,
    DigiDashboardComponent,
    HeaderComponent,
    FooterComponent,
    HeadingComponent,
    GridComponent,
    CardComponent,
    BannerComponent,
    PromotionComponent,
    SemigridtypeComponent,
    BodyComponent,
    GridtypeComponent,
    AppSnapshotComponent,
    // MyPortfolioComponent,
    ExplorePortfolioComponent,
    CommonCharts,
    ProgressBarComponent,
    CommanCardComponent,
    InfostepComponent,
    SectorComponent,
    PortfolioSummaryComponent,
    InvestmentCardComponent,
    CarouselComponent,
    CreditscoreTrackerComponent,
        RiskoMeterComponent,
        SegmentComponent,
        SnapshotModelComponent,
        AdvisoryCardComponent,
        LineChartComponent,
        cardDescription

  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatInputModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatRadioModule,
    NgApexchartsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,GridComponent,
    CardComponent,
    BannerComponent,
    PromotionComponent,
    InfostepComponent,
    SemigridtypeComponent,
    HeadingComponent,
    BodyComponent,
    GridtypeComponent,
    AppSnapshotComponent,
    SectorComponent,
    CommonCharts,
    ProgressBarComponent,
    CommanCardComponent,
    PortfolioSummaryComponent,
    SnapshotModelComponent,
    SegmentComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  providers:[GlobalSearchComponent],
})
export class CapabilityModule { }
