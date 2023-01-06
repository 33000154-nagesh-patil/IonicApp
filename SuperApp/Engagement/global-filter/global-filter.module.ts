import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GlobalFilterComponent } from './global-filter.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';

const routes:Routes=[
  {
    path:"",
    redirectTo:"globalFilter",
    pathMatch:"full"
  },
  {
    path:"globalFilter",
    component:GlobalFilterComponent
  }
]

@NgModule({
  declarations: [GlobalFilterComponent],
  imports: [MatFormFieldModule,MatInputModule,MatRadioModule,MatExpansionModule,
    
    CommonModule,RouterModule.forChild(routes), IonicModule.forRoot({}),FormsModule,CapabilityModule
  ],
  exports:[GlobalFilterComponent]
})
export class GlobalFilterModule { }
