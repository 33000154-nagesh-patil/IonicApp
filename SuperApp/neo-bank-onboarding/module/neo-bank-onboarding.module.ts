import { currencyCommasModule } from 'SuperApp/Common/pipe/currency-commas.module';


import { TranslateModule } from 'index';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { SelfieVerificationComponent } from '../components/selfie-verification/selfie-verification.component';
import { SignatureUploadComponent } from '../components/signature-upload/signature-upload.component';
import { NomineeDetailsComponent } from '../components/nominee-details/nominee-details.component';
import { EsignComponent } from '../components/esign/esign.component';
import { WebCamComponent } from '../components/web-cam/web-cam.component';

import { WebcamModule } from 'ngx-webcam';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatInputModule } from '@angular/material/input';
import { PanCardComponent } from '../components/pan-card/pan-card.component';
import { IonicModule } from '@ionic/angular';
import { MatSelectModule } from '@angular/material/select';
import { ManuallySignComponent } from 'projects/core/src/lib/components/signature-upload/manually-sign/manually-sign.component';
import { NsdlComponent } from '../components/esign/nsdl/nsdl.component';





const routes: Routes =[

  {
    path:"",
    redirectTo:"Pan",
    pathMatch:'full'
  },
  {
    path:"Pan",
    component:PanCardComponent
  },
  {
    path:"Selfie",
    component:SelfieVerificationComponent
  },
  {
    path:"WetSign",
    component:SignatureUploadComponent
  },
  {
    path:"Nominee",
    component:NomineeDetailsComponent
  },
  {
    path:"AadharEsign",
    component:EsignComponent
  }
  

]

@NgModule({
  declarations: [
PanCardComponent,
WebCamComponent,
SelfieVerificationComponent,
SignatureUploadComponent,
EsignComponent,
NomineeDetailsComponent,ManuallySignComponent,
NsdlComponent


  ],
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    CommonModule,
    TranslateModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    WebcamModule,
    PinchZoomModule,
    PdfViewerModule,
    currencyCommasModule,
    MatInputModule,
    MatSelectModule
   


    
  ],
  exports:[]


})
export class NeoBankOnboardingModule { }
