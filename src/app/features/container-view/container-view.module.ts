import { FabButtonModule } from './../../../../SuperApp/Engagement/fab-button/fab-button.module';
import { CanLoad } from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContainerViewPageRoutingModule } from './container-view-routing.module';

import { ContainerViewPage } from './container-view.page';
import { SubmenuModule } from 'projects/submenu/src/public-api';
import { IntroModule } from 'projects/intro/src/public-api';
import { LoginPageModule } from '../login/login.module';
import { LibConfigModule,DynamicComponentManifest } from 'projects/lib-config/src/public-api';
//
import { CoreModule } from 'projects/core/src/lib/core.module';
import {TranslateModule} from 'projects/core/src/lib/pipe/translate.module';
import { KycStepsMFComponent } from 'projects/product-details/components/kyc-steps-mf/kyc-steps-mf.component';
import { ProductDetailsModule } from 'projects/product-details/src/public-api';
import { EngagementModule } from 'SuperApp/Engagement/engagement.module';
import { ThankyouModule } from 'SuperApp/Engagement/thankyou/thankyou.module';
import { NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';

const manifests: DynamicComponentManifest[] = [
  {
    componentId: 'lazy-intro',
    path: 'lazy-intro', // some globally-unique identifier, used internally by the router
    loadChildren: () =>
      import('../../../../projects/intro/src/lib/intro.module').then(mod => mod.IntroModule)
  },
  {
    componentId: 'lazy-logging',
    path: 'lazy-logging', // some globally-unique identifier, used internally by the router
    loadChildren: () =>
      import('../login/login.module').then(mod => mod.LoginPageModule)
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    TranslateModule,
    ContainerViewPageRoutingModule,
    ProductDetailsModule,
    EngagementModule,
    FabButtonModule,
    ThankyouModule,
    SubmenuModule,IntroModule,LoginPageModule,LibConfigModule.forRoot(manifests),
  ],
  declarations: [ContainerViewPage],
  exports:[ContainerViewPage]
})
export class ContainerViewPageModule {}
