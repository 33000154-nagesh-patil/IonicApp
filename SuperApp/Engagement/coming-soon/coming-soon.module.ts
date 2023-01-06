import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComingSoonComponent } from './coming-soon.component';


const routes:Routes=[
  {
    path:'',
    redirectTo:'comingSoon',
    pathMatch:'full'
  },
  {
    path:"comingSoon",
    component:ComingSoonComponent
}]

@NgModule({
  declarations: [ComingSoonComponent],
  imports: [
    IonicModule,
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports:[ComingSoonComponent]
})
export class ComingSoonModule { }
