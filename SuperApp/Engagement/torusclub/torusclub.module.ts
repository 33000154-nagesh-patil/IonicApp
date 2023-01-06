import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { AllGamesModule } from '../torusclub/all-games/all-games.module';
import { AllRewardsComponent } from '../torusclub/all-rewards/all-rewards.component';
import { MatInputModule } from '@angular/material/input';
import { ReferNowPopUpComponent } from '../torusclub/refer-now-pop-up/refer-now-pop-up.component';
import { SubBrandComponent } from './sub-brand/sub-brand.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AllBrandPopUpComponent } from './all-brand-pop-up/all-brand-pop-up.component';
import { SubBrandPopUpComponent } from './sub-brand-pop-up/sub-brand-pop-up.component';
import { TorusclubComponent } from './torusclub.component';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { RedeemPopUpComponent } from './redeem-pop-up/redeem-pop-up.component';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { ReferContactsComponent } from './refer-contacts/refer-contacts.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'torusclub',
    pathMatch: 'full',
  },
  {
    path: 'torusclub',
    component: TorusclubComponent,
  },
  {
    path: 'allrewards',
    component: AllRewardsComponent,
  },
  {
    path: 'subBrand',
    component: SubBrandComponent,
  },
];

@NgModule({
  declarations: [ReferNowPopUpComponent,ReferContactsComponent,RedeemPopUpComponent,TorusclubComponent,AllRewardsComponent,AllBrandPopUpComponent,SubBrandComponent,SubBrandPopUpComponent,ReferNowPopUpComponent],
  imports: [
    RouterModule.forChild(routes),CommonModule,AllGamesModule,IonicModule,MatFormFieldModule,MatInputModule,
    FormsModule,ReactiveFormsModule
  ],
  exports:[RouterModule],
  providers:[ SocialSharing]
})
export class TorusclubModule {}
