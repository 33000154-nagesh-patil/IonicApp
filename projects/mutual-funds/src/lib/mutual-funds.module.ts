import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from "@angular/common";
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { MutualFundsComponent } from './mutual-funds.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule  } from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsModule } from 'projects/product-details/src/public-api';
import { CoreModule } from 'projects/core/src/public-api';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
 
  


];

@NgModule({
  
  declarations: [MutualFundsComponent],
  imports: [ RouterModule.forChild(routes),IonicModule,TranslateModule,MatStepperModule,MatIconModule,ReactiveFormsModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule,CommonModule
  ],
  exports:[MutualFundsComponent]
})
export class MutualFundsModule { }
