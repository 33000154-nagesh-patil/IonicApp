import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubmenuComponent } from './Hamberger/submenu/submenu.component';
import { IonicModule } from '@ionic/angular';
import {AutocompleteLibModule} from 'angular-ng-autocomplete'
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { CoInsidesubMenuComponent } from './Hamberger/submenu/co-insidesub-menu/co-insidesub-menu.component';
import { NotificationModule } from './Notification/notification.module';
import { LandingModule } from './landing/landing.module';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { GlobalSearchModule } from './global-search/global-search.module';
import { FabButtonModule } from './fab-button/fab-button.module';
import { ThankyouModule } from './thankyou/thankyou.module';
import { ComingSoonModule } from './coming-soon/coming-soon.module';
import { TorusCampaignModule } from './torus-campaign/torus-campaign.module';


const routes:Routes=[
  {
    path:'',
    redirectTo:'',
    pathMatch:'full'
  },
  // {
  //   path:"EngagementFaqs",
  //   loadChildren:()=>import('./faq/faq.module').then(m=>m.FaqModule)
  // },
  // {
  //   path:"EngagementNotification",
  //   // loadChildren:()=>import('./Notification/notification.module').then(m=>m.NotificationModule)
  //   loadChildren:()=>import('./landing/landing.module').then(m=>m.LandingModule)
  // },
  {
    path:'landing',
    loadChildren:()=>import('./landing/landing.module').then(m=>m.LandingModule)
    // path:"",
    // redirectTo:"faq",
    // pathMatch:"full"
  },
  {
    path:"EngagementFaqs",
    loadChildren:()=>import('./faq/faq.module').then(m=>m.FaqModule)
  },
  {
    path:"EngagementNotification",
    loadChildren:()=>import('./Notification/notification.module').then(m=>m.NotificationModule)
  },
  {
    path:"EngagementGlobalFilter",
    loadChildren:()=>import('./global-filter/global-filter.module').then(m=>m.GlobalFilterModule)

  },
  {
    path:"EngagementTorusClub",
    loadChildren:()=>import('./torusclub/torusclub.module').then(m=>m.TorusclubModule)
  },
  {
    path:"EngagementMyIssues",
    loadChildren:()=>import('./myissues/myissues.module').then(m=>m.MyissuesModule)
  },
  {
    path:"EngagementChatbot",
    loadChildren:()=>import('./chatbot/chatbot.module').then(m=>m.ChatbotModule)
  },
  {
    path:"EngagementGobalSearch",
    loadChildren:()=>import('./global-search/global-search.module').then(m=>m.GlobalSearchModule)
  },
  {
    path:"fabButton",
    loadChildren:()=>import('./fab-button/fab-button.module').then(m=>m.FabButtonModule)
  },
  {
    path:"ThankYou",
    loadChildren:()=>import('./thankyou/thankyou.module').then(m=>m.ThankyouModule)
  },
  {
    path:"ComingSoon",
    loadChildren:()=>import('./coming-soon/coming-soon.module').then(m=>m.ComingSoonModule)
  },
  {
    path:"TorusCampaign",
    loadChildren:()=>import('./torus-campaign/torus-campaign.module').then(m=>m.TorusCampaignModule)
  }
]

@NgModule({
  declarations: [
    SubmenuComponent,
    CoInsidesubMenuComponent,

    ],
  imports: [
    CommonModule,RouterModule.forChild(routes),
    IonicModule,
    AutocompleteLibModule,MatExpansionModule,

    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    CapabilityModule,
    MatRadioModule,
    Ng2SearchPipeModule,
    LandingModule,
    NotificationModule,
    GlobalSearchModule,
    FabButtonModule,
    ThankyouModule,
    ComingSoonModule,
    TorusCampaignModule

  ],
  exports:[SubmenuComponent,CoInsidesubMenuComponent]
})
export class EngagementModule { }
