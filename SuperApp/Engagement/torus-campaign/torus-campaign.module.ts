import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TorusCampaignComponent } from './torus-campaign.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'campaign',
    pathMatch: 'full',
  },
  {
    path: 'campaign',
    component: TorusCampaignComponent,
  }
];


@NgModule({
  declarations: [TorusCampaignComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,IonicModule,MatFormFieldModule,MatInputModule,
    FormsModule,ReactiveFormsModule,MatExpansionModule,MatOptionModule,MatDatepickerModule,MatSelectModule,
  ],
  exports: [TorusCampaignComponent]
})
export class TorusCampaignModule { }
