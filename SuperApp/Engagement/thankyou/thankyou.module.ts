import { Shopping } from 'SuperApp/Shopping/Module/shopping.module';
import { FormsModule } from '@angular/forms';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankyouComponent } from './thankyou.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import {MatExpansionModule} from '@angular/material/expansion';




const routes: Routes = [
  { path: '', redirectTo: 'thankyou', pathMatch: 'full' },

  {
    path: 'thankyou',
    component: ThankyouComponent,
  },
];


@NgModule({
  declarations: [ThankyouComponent],
  imports: [
    CommonModule,      
     IonicModule,
     RouterModule.forChild(routes),
     CapabilityModule,
     MatExpansionModule,
     FormsModule,
     Shopping

  ],
  exports:[ThankyouComponent]
})
export class ThankyouModule { }
