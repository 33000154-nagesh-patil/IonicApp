import { LabtestpackagesComponent } from './components/labtestpackages/labtestpackages.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CoreModule } from 'projects/core/src/public-api';
// import { LabAppointmentsComponent } from './components/lab-appointments/lab-appointments.component';
// import { LabOverviewComponent } from './components/lab-overview/lab-overview.component';
// import { LabRecommendedComponent } from './components/lab-recommended/lab-recommended.component';
// import { LabReportsComponent } from './components/lab-reports/lab-reports.component';
import { HealthLabTestDashboardComponent } from './health-lab-test-dashboard.component';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
// import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { currencyCommasModule } from 'projects/core/src/lib/pipe/currency-commas.module';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
const routes: Routes = [
  {
    path: '',
    component: HealthLabTestDashboardComponent
  }
];

// LabOverviewComponent,LabRecommendedComponent,LabAppointmentsComponent, LabReportsComponent
@NgModule({
  declarations: [HealthLabTestDashboardComponent, LabtestpackagesComponent],
  imports: [RouterModule.forChild(routes), CoreModule, IonicModule.forRoot(),MatInputModule,MatExpansionModule,
    // NgChartsModule,
    CommonModule,
    // IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TranslateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    currencyCommasModule,
    MatSelectModule,
    MatExpansionModule,
    CommonModule,
    Ng2SearchPipeModule,

  ]
})
export class HealthLabTestDashboardModule { }
