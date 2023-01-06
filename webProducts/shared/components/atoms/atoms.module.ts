import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from './buttons/buttons.component';
import { IconsComponent } from './icons/icons.component';
import { LabelComponent } from './label/label.component';
import { TextComponent } from './text/text.component';
import { ListComponent } from './list/list.component';
import { InputElementsComponent } from './input-elements/input-elements.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ColorsComponent } from './colors/colors.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { SegmentComponent } from './segment/segment.component';
import { StepperComponent } from './stepper/stepper.component';
import { CreateFormComponent } from './create-form/create-form.component';




@NgModule({
  declarations: [ButtonsComponent,IconsComponent,LabelComponent,TextComponent,ListComponent,InputElementsComponent,DoughnutChartComponent,ColorsComponent,BarChartComponent,SegmentComponent,StepperComponent,CreateFormComponent],
  imports: [
    CommonModule,MatInputModule,MatDatepickerModule,MatSelectModule,ReactiveFormsModule,FormsModule,NgApexchartsModule,
    IonicModule
  ],
  exports:[ButtonsComponent,IconsComponent,LabelComponent,TextComponent,ListComponent,InputElementsComponent,DoughnutChartComponent,ColorsComponent,BarChartComponent,SegmentComponent,StepperComponent,CreateFormComponent]
})
export class AtomsModule { }
