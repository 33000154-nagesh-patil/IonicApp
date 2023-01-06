import { OperationModule } from './../../SuperApp/Operations/Opration.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DefaultRouteGuard } from './guards/default-route.guard';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  {
    path: 'Tokenisation',
    loadChildren: () => import('SuperApp/Module/Tokenisation').then(m => m.TokenisationModule),
  },
  {
    path: 'Onboarding',
    // loadChildren: () => import('./features/Onboarding/onboarding.module').then(m => m.Onboarding),
    loadChildren: () => import('../../SuperApp/Onboarding/Module/onboarding.module').then(m => m.Onboarding),
    canLoad:[AuthGuard]
  },
  {
    path: 'neoBankOnboarding',
    // loadChildren: () => import('./features/Onboarding/onboarding.module').then(m => m.Onboarding),
    loadChildren: () => import('../../SuperApp/neo-bank-onboarding/module/neo-bank-onboarding.module').then(m => m.NeoBankOnboardingModule),
    canLoad:[AuthGuard]
  },
  {
    path:'mpin',
    loadChildren: () => import('SuperApp/capability/components/m-pin/m-pin.component').then(m => m.MPinModule),
    canLoad:[AuthGuard]
  },
  // {
  //   path: 'digiGoldOnboarding',
  //   // loadChildren: () => import('./features/Onboarding/onboarding.module').then(m => m.Onboarding),
  //   loadChildren: () => import('../../SuperApp/gold-onboarding/module/gold-onboarding.module').then(m => m.GoldOnboardingModule),
  //   canLoad:[AuthGuard]
  // },
  {
    path: 'Shopping',
    loadChildren: () => import('SuperApp/Shopping/Module/shopping.module').then(m => m.Shopping),
    canLoad:[AuthGuard]
  },
  {
    path: 'Fullfilment',
    loadChildren: () => import('SuperApp/Fulfillment/Module/Fullfillment.module').then(m => m.Fulfillment),
    canLoad:[AuthGuard]
  },
  {
    path: 'Engagement',
    loadChildren: () => import('SuperApp/Engagement/engagement.module').then(m => m.EngagementModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'Operation',
    loadChildren: () => import('SuperApp/Operations/Opration.module').then(m => m.OperationModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'prodSelection',
    loadChildren: () => import('../../webComponent/prod-selection/prod-selection.module').then(m => m.ProdSelectionModule),
  },
  {
    path: 'crm',
    loadChildren: () => import('../../webProducts/pages/main-contain/main-contain.module').then(m => m.MainContainModule),
  },
  {
    path: 'crmService',
    loadChildren: () => import('../../crmServices/pages/main-contain/main-contain.module').then(m => m.MainContainModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
