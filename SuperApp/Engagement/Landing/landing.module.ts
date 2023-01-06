import { FabButtonModule } from './../fab-button/fab-button.module';
import { Shopping } from './../../Shopping/Module/shopping.module';
import { IonicModule } from '@ionic/angular';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './landing.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


const routes: Routes = [
  { 
    path:'',
    component: LandingComponent
  }
];

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CapabilityModule,
    IonicModule,
    FabButtonModule,
    DragDropModule
  ]
})
export class LandingModule { }
