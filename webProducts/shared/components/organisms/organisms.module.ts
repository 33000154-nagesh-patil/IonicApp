// import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculesModule } from '../molecules/molecules.module';
import { OrgHeaderComponent } from './org-header/org-header.component';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { OrgMenuBarComponent } from './org-menu-bar/org-menu-bar.component';
import { OrgSubheaderComponent } from './org-subheader/org-subheader.component';
import { OrgDoughnutChartComponent } from './org-doughnut-chart/org-doughnut-chart.component';
import { AtomsModule } from '../atoms/atoms.module';
import { OrgBarChartComponent } from './org-bar-chart/org-bar-chart.component';
import { OrgSegmentComponent } from './org-segment/org-segment.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {IonicModule} from '@ionic/angular';

@NgModule({
  declarations: [OrgHeaderComponent,OrgMenuBarComponent,OrgSubheaderComponent,OrgDoughnutChartComponent,OrgBarChartComponent,OrgSegmentComponent],
  imports: [
    CommonModule,MoleculesModule,
    // FlexLayoutModule,
    AtomsModule,MatExpansionModule,
    IonicModule
  ],
  exports:[OrgHeaderComponent,OrgMenuBarComponent,OrgSubheaderComponent,OrgDoughnutChartComponent,OrgBarChartComponent,OrgSegmentComponent]
})
export class OrganismsModule { }
