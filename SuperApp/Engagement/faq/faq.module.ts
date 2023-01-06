import { NgModule } from "@angular/core";
import { FaqComponent } from "./faq.component";

import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AllFaqComponent } from "./all-faq/all-faq.component";
import { FaqDetailsComponent } from "./faq-details/faq-details.component";

import {AutocompleteLibModule} from 'angular-ng-autocomplete'
import { MatSelectModule } from '@angular/material/select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { CapabilityModule } from "SuperApp/capability/capability.module";
import { FaqAnswerComponent } from "./faq-answer/faq-answer.component";



const routes:Routes=[
  {
    path:'',
    redirectTo:'getFaq',
    pathMatch:'full'
  },
  {
    path:"getFaq",
    component:FaqComponent
  },
  {
    path:"productWiseList",
    component:FaqDetailsComponent
  },
  {
    path:"productWiseListAnswer",
    component:FaqAnswerComponent
  }
]

@NgModule({
  declarations: [FaqAnswerComponent,FaqComponent,
    FaqDetailsComponent,
    AllFaqComponent,],
  imports: [RouterModule.forChild(routes),
    CommonModule, IonicModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatRadioModule,
    Ng2SearchPipeModule,
    AutocompleteLibModule,MatExpansionModule,
    CapabilityModule

  ],
  exports: [FaqAnswerComponent,FaqComponent,
    FaqDetailsComponent,
    AllFaqComponent,],
})
export class FaqModule{

}
