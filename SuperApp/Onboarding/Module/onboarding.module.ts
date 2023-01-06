// import { PartnerProfileOnboardingComponent } from './../Components/partner-profile-onboarding/partner-profile-onboarding.component';
import { AllConfigDataService } from 'index';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from 'index';
import { GreatComponent } from '../Components/great/great.component';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule, Routes } from '@angular/router';
import { NgModule, OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { WebcamModule } from 'ngx-webcam';
import { currencyCommasModule } from 'SuperApp/Common/pipe/currency-commas.module';
import { EsignComponent } from '../Components/esign/esign.component';
import { UploadAadharPanComponent } from '../Components/upload-aadhar-pan/upload-aadhar-pan.component';
import { SignatureUploadComponent } from '../Components/signature-upload/signature-upload.component';
import { SelfieVerificationComponent } from '../Components/selfie-verification/selfie-verification.component';
import { NomineeDetailsComponent } from '../Components/nominee-details/nominee-details.component';
import { PersonalDetailsComponent } from '../Components/personal-details/personal-details.component';
import { IncomeProofComponent } from '../Components/income-proof/income-proof.component';
import { ExchangeSelectionComponent } from '../Components/exchange-selection/exchange-selection.component';
import { PanCardComponent } from '../Components/pan-card/pan-card.component';
import { BankDetailsComponent } from '../Components/bank-details/bank-details.component';
import { KraComponent } from '../Components/Kra/Kra.component';
import { ConfirmPanDetailComponent } from '../Components/confirm-pan-detail/confirm-pan-detail.component';
import { NameAddressDetailsComponent } from '../Components/name-address-details/name-address-details.component';
import { DigiLockerAadharComponent } from '../Components/digi-locker-aadhar/digi-locker-aadhar.component';
import { thankYouPage } from '../Components/succesfully-Onboard/succesfully-Onboard.component';
import { PreviewImageComponent } from '../Components/income-proof/preview-image/preview-image.component';
import { ManuallySignComponent } from '../Components/signature-upload/manually-sign/manually-sign.component';
import { DisplayBankDetailsComponent } from '../Components/display-bank-details/display-bank-details.component';
import { OnboardingBareBoneComponent } from '../Components/onboarding-bare-bone/onboarding-bare-bone.component';
import { WebCamComponent } from '../Components/web-cam/web-cam.component';
import { CustomerDetailsComponent } from './../Components/customer-details/customer-details.component';
import { MpinComponent } from '../Components/mpin/mpin.component';
import { SuccessPageComponent } from '../Components/success-page/success-page.component';
import { SspageComponent } from '../Components/sspage/sspage.component';
import { NeoPersonaldetailsComponent } from '../Components/neo-personaldetails/neo-personaldetails.component';
import { OtherDetailsComponent } from '../Components/other-details/other-details.component';
import { LastsuccesspageComponent } from '../Components/lastsuccesspage/lastsuccesspage.component';
import { OtpVerificationComponent } from '../Components/otp-verification/otp-verification.component';
import { FatcaDeclarationComponent } from '../Components/fatca-declaration/fatca-declaration.component';
import { AddressAndBankProofComponent } from '../Components/address-and-bank-proof/address-and-bank-proof.component';
import { FormComponent } from '../Components/form/form.component';
import { PedFormsComponent } from '../Components/ped-forms/ped-forms.component';
import { PedQuestionsComponent } from '../Components/ped-questions/ped-questions.component';
import { PrerequisiteDetailsComponent } from '../Components/prerequisite-details/prerequisite-details.component';
import { OurServicesComponent } from '../Components/our-services/our-services.component';
import { PartnerProfileComponent } from '../Components/bank-details/partner-profile/partner-profile.component';
import { BusinessOverviewComponent } from '../Components/business-overview/business-overview.component';
import { BussinessDetailComponent } from '../Components/bussiness-detail/bussiness-detail.component';
import { SegmentFeeCalculationComponent } from '../Components/segment-fee-calculation/segment-fee-calculation.component';
import { PatnerDetailComponent } from '../Components/patner-detail/patner-detail.component';
import { NsdlComponent } from '../Components/esign/nsdl/nsdl.component';
import { CapabilityModule } from 'SuperApp/capability/capability.module';
import { NeoValidProofComponent } from '../Components/neo-valid-proof/neo-valid-proof.component';
import { NeoDetailsComponent } from '../Components/neo-details/neo-details/neo-details.component';


const routes: Routes = [
    {
        path: '',
        component: OnboardingBareBoneComponent,
        children: [
            { path: '', redirectTo: 'PAN', pathMatch: 'full' },
            {
                path: 'PAN',
                component: PanCardComponent,
                // component: BankDetailsComponent
            },
            {
                path: 'DOB',
                component: KraComponent
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
                component: BankDetailsComponent
            },
            {
                path: 'DisplayBankDetails',
                // component: ExchangeSelectionComponent // for skipping the display bank details page and directly going to the product selection page
                component:DisplayBankDetailsComponent //this is giving error for some reason in routing
            },
            {
                path: 'AadharEsign',
                component: EsignComponent
            },
            {
                path: 'IncomeProof',
                component: IncomeProofComponent
            },
            {
                path: 'Nominee',
                component: NomineeDetailsComponent
            },
            {
                path: 'PersonalDetails',
                component: PersonalDetailsComponent
            },
            {
                path: 'PanAadharUpload',
                component: UploadAadharPanComponent
            },
            {
                path: 'ProductSelection',
                component: ExchangeSelectionComponent
            },
            {
                path: 'Selfie',
                component: SelfieVerificationComponent
            },
            {
                path: 'WetSignature',
                component: SignatureUploadComponent
            },
            {
                path: 'ThankYou',
                component: thankYouPage
            },
            {
                path: 'CustomerDetails',
                component: CustomerDetailsComponent
            },
            {
                path:"mPin",
                component:MpinComponent
              },
              {
                path:"walletSuccess",
                component:SuccessPageComponent
              },
              {
                path:"simBinding",
                component:SspageComponent
              },

              {
                path:"neoPersonalDetails",
                component:NeoPersonaldetailsComponent
              },

              {
                path:"otherDetails",
                component:OtherDetailsComponent
              },
              {
                path:"neoOtpVerification",
                component:OtpVerificationComponent
              },
              {
                path:"neoSuccess",
                component:LastsuccesspageComponent
              },
              {
                path:"fatcaDeclaration",
                component:FatcaDeclarationComponent
              },
              {
                path:"addressAndBankProof",
                component:AddressAndBankProofComponent
              },
            {
                path:'prerequisite',
                component:FormComponent
            },
            {
                path:'pedQuestion',
                component:PedQuestionsComponent
            },
            {
                path:'pedForms',
                component:PedFormsComponent
            },
            {
                path:'prerequisiteDetails',
                component:PrerequisiteDetailsComponent
            },
            {
                path: 'OurServices',
                component: OurServicesComponent
            },
            {
                path: 'PartnerProfile',
                component: PartnerProfileComponent
            },
            {
                path: 'BusinessOverview',
                component: BusinessOverviewComponent
            },
            {
                path: 'BussinessDetail',
                component: BussinessDetailComponent
            },
            {
                path: 'great',
                component: GreatComponent
            },
            {
                path: 'segmentFeeCalculation',
                component: SegmentFeeCalculationComponent
            },
            {
                path: 'partnerdetail',
                component: PatnerDetailComponent
            },
            {
                path:"walletOTP",
                component:OtpVerificationComponent
            },
            {
                path:"walletDocs",
                component:NeoValidProofComponent
            },
            {
                path:"userDetails",
                component:NeoDetailsComponent
            }
            // {
            //     path: 'PartnerProfileOnboarding',
            //     component: PartnerProfileOnboardingComponent
            // },

            // { path: '**', redirectTo: 'PAN' },

        ]
    },
  
]

@NgModule({
    declarations: [
        // PartnerProfileOnboardingComponent,
        NeoDetailsComponent,
        NeoValidProofComponent,
        OurServicesComponent,
        GreatComponent,
        PatnerDetailComponent,
        SegmentFeeCalculationComponent,
        BusinessOverviewComponent,
        PartnerProfileComponent,
        BussinessDetailComponent,
        PrerequisiteDetailsComponent,
        FormComponent,
        EsignComponent,
        OtpVerificationComponent,
        UploadAadharPanComponent,
        SignatureUploadComponent,
        SelfieVerificationComponent,
        NomineeDetailsComponent,
        PersonalDetailsComponent,
        IncomeProofComponent,
        ExchangeSelectionComponent,
        PanCardComponent,
        BankDetailsComponent,
        KraComponent,
        ConfirmPanDetailComponent,
        NameAddressDetailsComponent,
        DigiLockerAadharComponent,
        thankYouPage,
        PreviewImageComponent,
        ManuallySignComponent,
        DisplayBankDetailsComponent,
        OnboardingBareBoneComponent,
        WebCamComponent,
        CustomerDetailsComponent,
        LastsuccesspageComponent,
        OtherDetailsComponent,
        NeoPersonaldetailsComponent,
        SspageComponent,
        SuccessPageComponent,
        MpinComponent,
        FatcaDeclarationComponent,
        AddressAndBankProofComponent,
        PedFormsComponent,
        PedQuestionsComponent,
        NsdlComponent,
    ],
    imports: [
        RouterModule.forChild(routes), IonicModule,
        TranslateModule,
        CapabilityModule,
        MatFormFieldModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSliderModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        currencyCommasModule,
        MatCheckboxModule,
        MatSelectModule,
        PdfViewerModule,
        PinchZoomModule,
        WebcamModule,
        MatExpansionModule
    ],
    exports: [],
    providers: [
     { provide: "windowObject", useValue: window}
    ]

})
export class Onboarding implements OnInit{

    constructor()
    {}
    ngOnInit() {

    }
}
