import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrackOrderComponent } from './track-order/track-order.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'checkout',
    pathMatch: 'full'
  },
  
  {
    path:"trackOrder",
    component:TrackOrderComponent
  }
]

@NgModule({
  declarations: [
    
    TrackOrderComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    TranslateModule,
    FormsModule,
    IonicModule
    
  ]
})
export class HealthModule { }
