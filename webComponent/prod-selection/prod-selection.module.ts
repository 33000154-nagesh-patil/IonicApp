import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProdSelectionComponent } from './prod-selection.component';

const routes: Routes = [
  {
    path:'',
    component:ProdSelectionComponent
}
]

@NgModule({
  declarations: [ProdSelectionComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,
    IonicModule
  ],
  exports:[ProdSelectionComponent]
})
export class ProdSelectionModule { }
