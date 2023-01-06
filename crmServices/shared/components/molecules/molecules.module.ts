import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { MolHeaderComponent } from './mol-header/mol-header.component';
import { MolProfileComponent } from './mol-profile/mol-profile.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MolMenuBarComponent } from './mol-menu-bar/mol-menu-bar.component';
import { MatListModule } from '@angular/material/list';
import { MolSubheaderComponent } from './mol-subheader/mol-subheader.component';
import { MolCardComponent } from './mol-card/mol-card.component';
import { MolSearchComponent } from './mol-search/mol-search.component';
import { MolDoughnutChartComponent } from './mol-doughnut-chart/mol-doughnut-chart.component';
import { MolBarChartComponent } from './mol-bar-chart/mol-bar-chart.component';
import { MolTableComponent } from './mol-table/mol-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MolSegmentComponent } from './mol-segment/mol-segment.component';
import { MatInputModule } from '@angular/material/input';
import { MolProdSelectionComponent } from './mol-prod-selection/mol-prod-selection.component';




@NgModule({
  declarations: [MolHeaderComponent,MolProfileComponent,MolMenuBarComponent,MolSubheaderComponent,MolCardComponent,MolSearchComponent,MolDoughnutChartComponent,MolBarChartComponent,MolTableComponent,MolSegmentComponent,MolProdSelectionComponent],
  imports: [
    CommonModule,
    AtomsModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    IonicModule
  ],
  exports:[MolHeaderComponent,MolProfileComponent,MolMenuBarComponent,MolSubheaderComponent,MolCardComponent,MolSearchComponent,MolDoughnutChartComponent,MolBarChartComponent,MolTableComponent,MolSegmentComponent,MolProdSelectionComponent]
})
export class MoleculesModule { }
