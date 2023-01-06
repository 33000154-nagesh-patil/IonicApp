import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContainComponent } from './main-contain.component';
import { TemplatesModule } from '../../shared/components/templates/templates.module';
import { OrganismsModule } from '../../shared/components/organisms/organisms.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MoleculesModule } from '../../shared/components/molecules/molecules.module';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { AtomsModule } from 'webProducts/shared/components/atoms/atoms.module';

const routes: Routes = [
  {
    path:'',
   component:MainContainComponent
  },
  
];
@NgModule({
  declarations: [MainContainComponent],
  imports: [
    CommonModule,
    TemplatesModule,
    OrganismsModule,
    MatSidenavModule,
    MoleculesModule,
    IonicModule,
    AtomsModule,
    RouterModule.forChild(routes),
    MatDialogModule
  ],
  exports:[MainContainComponent]
})
export class MainContainModule { }
