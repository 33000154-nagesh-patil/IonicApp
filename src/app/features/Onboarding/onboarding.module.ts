
import { EsignComponent } from './../../../../projects/core/src/lib/components/esign/esign.component';
import { UploadAadharPanComponent } from './../../../../projects/core/src/lib/components/upload-aadhar-pan/upload-aadhar-pan.component';
import { SignatureUploadComponent } from 'projects/core/src/lib/components/signature-upload/signature-upload.component';
import { SelfieVerificationComponent } from 'projects/core/src/lib/components/selfie-verification/selfie-verification.component';
import { NomineeDetailsComponent } from './../../../../projects/core/src/lib/components/nominee-details/nominee-details.component';
import { PersonalDetailsComponent } from './../../../../projects/core/src/lib/components/personal-details/personal-details.component';
import { IncomeProofComponent } from './../../../../projects/core/src/lib/components/income-proof/income-proof.component';
import { ExchangeSelectionComponent } from './../../../../projects/core/src/lib/components/exchange-selection/exchange-selection.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanCardComponent } from 'projects/core/src/lib/components/pan-card/pan-card.component';
import { BankDetailsComponent } from 'projects/core/src/lib/components/bank-details/bank-details.component';
import { DOBComponent } from 'projects/core/src/lib/components/dob/dob.component';
import { ConfirmPanDetailComponent } from 'projects/core/src/lib/components/confirm-pan-detail/confirm-pan-detail.component';
import { DisplayBankDetailsComponent } from 'projects/core/src/lib/components/display-bank-details/display-bank-details.component';
import { NameAddressDetailsComponent } from 'projects/core/src/lib/components/name-address-details/name-address-details.component';
import { DigiLockerAadharComponent } from 'projects/core/src/lib/components/digi-locker-aadhar/digi-locker-aadhar.component';
import { HttpClient } from '@angular/common/http';
import { thankYouPage } from 'projects/core/src/lib/components/succesfully-Onboard/succesfully-Onboard.component';



const routes: Routes = [
    {
        path: '',
        children:[
            {path: '', redirectTo: 'Bank', pathMatch: 'full'},
            {
                path: 'PAN',
                component: PanCardComponent,
            },
            {
                path: 'DOB',
                component: DOBComponent
            },
            {
                path: 'ConfirmPanDetail',
                component: ConfirmPanDetailComponent
            },
            {
                path: 'DigiLockerAadhar',
                component: DigiLockerAadharComponent
            },
            {
                path: 'NameAddressDetails',
                component: NameAddressDetailsComponent
            },
            {
                path: 'Bank',
                component:BankDetailsComponent
            },
            {
                path: 'DisplayBankDetails',
                component:ExchangeSelectionComponent // for skipping the display bank details page and directly going to the product selection page
                // component:DisplayBankDetailsComponent //this is giving error for some reason in routing
            },
            {
                path: 'AadharEsign',
                component:EsignComponent
            },
            {
                path: 'IncomeProof',
                
                component:IncomeProofComponent
            },
            
            {
                path: 'nameAddressDetails',
                component:NameAddressDetailsComponent
            },
            {
                path: 'Nominee',
                component:NomineeDetailsComponent
            },
            {
                path: 'PersonalDetails',
                component:PersonalDetailsComponent
            },
            {
                path: 'PanAadharUpload',
                component:UploadAadharPanComponent
            },
            {
                path: 'ProductSelection',
                component:ExchangeSelectionComponent
            },
            {
                path: 'Selfie',
                component:SelfieVerificationComponent
            },
            {
                path: 'WetSign',
                component:SignatureUploadComponent
            },
            {
                path: 'thankYouPage',
                component:thankYouPage
            },
            {path: '**', redirectTo: 'PAN'},

        ]
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [],
    
})
export class Onboarding{ 
    
}