
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { FormsModule } from '@angular/forms';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { MatDatepickerModule } from '@angular/material/datepicker';
// import { FooterComponent } from 'projects/core/src/lib/components/footer/footer.component';

import { MyordersComponent } from '../../myorders/myorders.component';

import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: '',
    component: MyordersComponent
  }
];


@NgModule({
  declarations: [
   ],



  imports: [RouterModule.forChild(routes),TranslateModule, MatDatepickerModule,
    ClipboardModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule,
    ReactiveFormsModule, MatExpansionModule,IonicModule.forRoot(),
    MatRadioModule,CommonModule],


  exports: []


})
export class OrderedlistModule { }
