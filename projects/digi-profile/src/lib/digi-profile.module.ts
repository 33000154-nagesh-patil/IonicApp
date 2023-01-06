import { MatExpansionModule } from '@angular/material/expansion';
import { CoreModule } from 'projects/core/src/public-api';
import { IonicModule } from '@ionic/angular';
import { DigiProfileComponent } from './digi-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DigiProfileComponent
  }
]


@NgModule({
  declarations: [DigiProfileComponent],
  imports: [RouterModule.forChild(routes),IonicModule,CoreModule,MatExpansionModule
  ],
  exports:[DigiProfileComponent]
})
export class DigiProfileModule { }
