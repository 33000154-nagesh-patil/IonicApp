import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/Camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from 'projects/core/src/lib/pipe/translate.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FabButtonComponent } from './components/fab-button/fab-button.component';
import { CustomModalComponent } from './components/custom-modal/custom-modal.component';
import { PanCardComponent } from './components/pan-card/pan-card.component';
import { BankDetailsComponent } from './components/bank-details/bank-details.component';
import { currencyCommasModule } from './pipe/currency-commas.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { SelfieVerificationComponent } from './components/selfie-verification/selfie-verification.component';
import { SignatureUploadComponent } from './components/signature-upload/signature-upload.component';
import { ExchangeSelectionComponent } from './components/exchange-selection/exchange-selection.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { NomineeDetailsComponent } from './components/nominee-details/nominee-details.component';
import { EsignComponent } from './components/esign/esign.component';
import { WebcamModule } from 'ngx-webcam';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { AadharOnboardKycComponent } from './components/aadhar-onboard-kyc/aadhar-onboard-kyc.component';
import { UploadAadharPanComponent } from './components/upload-aadhar-pan/upload-aadhar-pan.component';
import { WebCamComponent } from './components/web-cam/web-cam.component';
import { IncomeProofComponent } from './components/income-proof/income-proof.component';
import { PreviewImageComponent } from './components/income-proof/preview-image/preview-image.component';
import { NsdlComponent } from './components/esign/nsdl/nsdl.component';
import { NameAddressDetailsComponent } from './components/name-address-details/name-address-details.component';
import { DigiLockerAadharComponent } from './components/digi-locker-aadhar/digi-locker-aadhar.component'
import { CameraComponent } from './components/camera (1)/camera/camera.component';
import { CartEmpComponent } from './components/cart-emp/cart-emp.component';
import { HealthWellnessComponent } from './components/health-wellness/health-wellness.component';
import { LabTestComponent } from './components/lab-test/lab-test.component';
import { TestLocationComponent } from './components/test-location/test-location.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDescLabComponent } from './components/product-desc-lab/product-desc-lab.component';
import { CheckoutaddComponent } from 'projects/orderedlist/checkoutadd/checkoutadd.component';
import { AddressDetailsComponent } from 'projects/orderedlist/orderedlist/address-details/address-details.component';
import { MyordersComponent } from 'projects/orderedlist/orderedlist/myorders/myorders.component';
import { OrderDetailsComponent } from 'projects/orderedlist/orderedlist/order-details/order-details.component';
import { ScheduleComponent } from 'projects/orderedlist/orderedlist/schedule/schedule.component';
import { SelectAddComponent } from 'projects/orderedlist/orderedlist/select-add/select-add.component';
import { SelectPatientdetaiComponent } from 'projects/orderedlist/orderedlist/select-patientdetai/select-patientdetai.component';
import { OrderedlistComponent } from 'projects/orderedlist/orderedlist/src/projects';
import { SuccessDetailsComponent } from 'projects/orderedlist/orderedlist/success-details/success-details.component';
import { SummaryComponent } from 'projects/orderedlist/orderedlist/summary/summary.component';
import { PatientDetailsComponent } from 'projects/orderedlist/patient-details/patient-details.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DOBComponent } from './components/dob/dob.component';
import { ConfirmPanDetailComponent } from './components/confirm-pan-detail/confirm-pan-detail.component';
import { DisplayBankDetailsComponent } from './components/display-bank-details/display-bank-details.component';
import { thankYouPage } from './components/succesfully-Onboard/succesfully-Onboard.component';

// import { SignInComponent } from '../../../login-list/src/lib/sign-in/sign-in.component'
// import { LoginListComponent } from 'projects/login-list/src/lib/login-list.component'

@NgModule({
  declarations: [VerificationCodeComponent,
     HeaderComponent, FooterComponent, FabButtonComponent, CustomModalComponent, PanCardComponent,
     AadharOnboardKycComponent, BankDetailsComponent, ProductListComponent,
     UpdateProfileComponent, SignatureUploadComponent, SelfieVerificationComponent,
     ExchangeSelectionComponent, PersonalDetailsComponent, NomineeDetailsComponent, EsignComponent,
     UploadAadharPanComponent, WebCamComponent, IncomeProofComponent, PreviewImageComponent, NsdlComponent,
     NameAddressDetailsComponent, DigiLockerAadharComponent,CameraComponent,DOBComponent,ConfirmPanDetailComponent,
     DisplayBankDetailsComponent,

     CartComponent,
     CartEmpComponent,
     HealthWellnessComponent,
     TestLocationComponent,
     LabTestComponent,
     ProductDescLabComponent,
     thankYouPage,

     CheckoutaddComponent,SelectPatientdetaiComponent,
     OrderedlistComponent, AddressDetailsComponent, MyordersComponent, OrderDetailsComponent, ScheduleComponent, SelectAddComponent, PatientDetailsComponent,SuccessDetailsComponent,SummaryComponent
    ],
  imports: [CommonModule, RouterModule, IonicModule.forRoot(), FormsModule, ReactiveFormsModule, MatInputModule, MatSliderModule, 
    TranslateModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule, currencyCommasModule, MatCheckboxModule, MatSelectModule, PdfViewerModule, PinchZoomModule
    , WebcamModule,
    MatExpansionModule
  ],
  providers: [Camera, Geolocation, File, MatDatepickerModule,
    MatNativeDateModule, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  exports: [CameraComponent,
    CartEmpComponent,
    thankYouPage,
    TranslateModule,
    HealthWellnessComponent,
    TestLocationComponent,
    LabTestComponent,DOBComponent,ConfirmPanDetailComponent,
    ProductDescLabComponent,VerificationCodeComponent, HeaderComponent, FooterComponent, FabButtonComponent, 
    CustomModalComponent, PanCardComponent, AadharOnboardKycComponent, BankDetailsComponent, ProductListComponent, 
    UpdateProfileComponent, SignatureUploadComponent, SelfieVerificationComponent, ExchangeSelectionComponent, 
    PersonalDetailsComponent, NomineeDetailsComponent, EsignComponent, UploadAadharPanComponent, WebCamComponent, IncomeProofComponent, 
    PreviewImageComponent, NsdlComponent, NameAddressDetailsComponent, DigiLockerAadharComponent,
    DisplayBankDetailsComponent,
    CheckoutaddComponent,SelectPatientdetaiComponent,
    OrderedlistComponent, AddressDetailsComponent, MyordersComponent, OrderDetailsComponent, ScheduleComponent, SelectAddComponent, PatientDetailsComponent,SuccessDetailsComponent,SummaryComponent]
  // ]
})
export class CoreModule { }
