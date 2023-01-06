import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MyIssueDetailComponent } from './my-issue-detail/my-issue-detail.component';
import { MyissuesComponent } from './myissues.component';
import { CapabilityModule } from 'SuperApp/capability/capability.module';



const routes:Routes=[
  {
    path:'',
    redirectTo:'issues',
    pathMatch:'full'
  },
  {
    path:'issues',
    component: MyissuesComponent 
  },
  {
    path:'myissuedetails',
    component: MyIssueDetailComponent
  }
]

@NgModule({
  declarations: [MyIssueDetailComponent,MyissuesComponent],
  imports: [
    RouterModule.forChild(routes),CommonModule,IonicModule,MatFormFieldModule,MatInputModule,CapabilityModule
  ],
  exports:[RouterModule,MyissuesComponent],
  providers:[]
})
export class MyissuesModule { }
