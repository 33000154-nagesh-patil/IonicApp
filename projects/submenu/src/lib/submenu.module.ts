import { AllFaqComponent } from './../../all-faq/all-faq.component';
import { NgModule } from '@angular/core';
import { SubmenuComponent } from './submenu.component';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from "@angular/common";
import {RouterModule, Routes} from '@angular/router';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { CoreModule } from 'projects/core/src/public-api';
import { CoInsidesubMenuComponent } from 'projects/submenu/co-insidesub-menu/co-insidesub-menu.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import {AutocompleteLibModule} from 'angular-ng-autocomplete'
import { FaqDetailsComponent } from 'projects/submenu/faq-details/faq-details.component';
import { FaqComponent } from 'projects/submenu/faq/faq.component';
import { MyIssueDetailComponent } from 'projects/submenu/my-issue-detail/my-issue-detail.component';
import { MyissuesComponent } from 'projects/submenu/myIssues/myissues.component';


const routes:Routes=[
  {
    path:'myissue',
    component:MyissuesComponent
  },
  {
    path:'myissueDetail',
    component:MyIssueDetailComponent
  },
  {
    path:'faq',
    component:FaqComponent
  }
]


@NgModule({
  declarations: [SubmenuComponent,CoInsidesubMenuComponent,FaqComponent,FaqDetailsComponent,AllFaqComponent,MyIssueDetailComponent,MyissuesComponent],
  imports: [BrowserModule,CommonModule,TranslateModule,IonicModule,
    // RouterModule.forRoot(routes),
    AutocompleteLibModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatRadioModule,
    Ng2SearchPipeModule,
  ],
  exports:[SubmenuComponent]
})
export class SubmenuModule { }
