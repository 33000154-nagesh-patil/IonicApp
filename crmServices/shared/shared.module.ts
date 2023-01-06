import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganismsModule } from './components/organisms/organisms.module';
import { MoleculesModule } from './components/molecules/molecules.module';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[
  {
    path:'',
    loadChildren:()=>import('./../shared/components/organisms/organisms.module').then(m=>m.OrganismsModule)
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,OrganismsModule,MoleculesModule
  ]
})
export class SharedModule { }
