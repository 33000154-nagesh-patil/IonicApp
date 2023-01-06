import { BillPaymentComponent } from './Components/bill-payment/bill-payment.component';
import { AddFavouriteComponent } from './Components/add-favourite/add-favourite.component';
import { CommonFavouriteComponent } from './Components/common-favourite/common-favourite.component';
import { DatacardComponent } from './Components/datacard/datacard.component';
import { SetAutoPayComponent } from './Components/set-auto-pay/set-auto-pay.component';
import { ConfirmationScreenComponent } from './Components/confirmation-screen/confirmation-screen.component';
import { ViewPlanComponent } from './Components/view-plan/view-plan.component';
import { Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { currencyCommasModule } from 'SuperApp/Common/pipe/currency-commas.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from 'SuperApp/Common/pipe/translate.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { FavouriteaddedComponent } from './Components/favouriteadded/favouriteadded.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



const routes: Routes =[

  {
    path:"",
    component:BillPaymentComponent
  },
  {
    path:'favourite',
    component: AddFavouriteComponent

  },
  {
    path:'commonfavourite',
    component:CommonFavouriteComponent

  },
  {
    path:'setAutopay',
    component:SetAutoPayComponent

  },
  {
    path:'dataCard/:type',
    component:DatacardComponent

  },


];





@NgModule({
  declarations: [
    AddFavouriteComponent,
    BillPaymentComponent,
    CommonFavouriteComponent,
    ConfirmationScreenComponent,
    DatacardComponent,
    SetAutoPayComponent,
    ViewPlanComponent,
    FavouriteaddedComponent

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CommonModule, RouterModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule,
    MatInputModule, TranslateModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule,
    currencyCommasModule, MatSelectModule, MatFormFieldModule, MatIconModule,Ng2SearchPipeModule
  ],
  exports:[DatacardComponent]
})
export class BillpaymentModule { }
