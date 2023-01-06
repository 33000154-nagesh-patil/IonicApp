import { Component, Input, OnInit, Output,EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { KycStepsMFComponent } from 'projects/product-details/components/kyc-steps-mf/kyc-steps-mf.component';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { ContainerViewPage } from 'src/app/features/container-view/container-view.page';
@Component({
  selector: 'app-stepeer-onbording',
  templateUrl: './stepeer-onbording.component.html',
  styleUrls: ['./stepeer-onbording.component.scss'],
})
export class StepeerOnbordingComponent implements OnInit {
  panFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  stepItems: any = [];

  @Input() imageList: any;
  @Input() stepData: any; //from api
  @Output() getPanNumber = new EventEmitter();


@Input() panCardKYC:any;
@Input() loginCustomerGuId: any;
@Input() aadharKYC:any;
@Input() bankKYC:any;
  isPanCardKYCComplete: any;
  isAadharKYCComplete: any;
  isBankDetailsKYCComplete: any;
@Input()  errorList: any;
  currentImg: any;
  currentInputPan: any;
  showRequiredError: boolean;
  showPatternError: boolean;
  isValid: boolean;
  currentType: boolean;
  currentInputEncoded: any;
  cd: any;
  currentNativeNetwork: any;
  ErrorMsg: any;
  loggedInModal: boolean;
  panUserName: any;
  filePath: string;
  panDetailsData: any;
  showNextStep: boolean;
  showFirstStep: boolean;
  seeding: boolean;

  constructor(private ContainerViewPage:ContainerViewPage,private commonFunctionService:CommonFunctionService,private commonService:CommonService,private actionSheetController: ActionSheetController,private camera:Camera,private router:Router,private fb: FormBuilder,public modalController: ModalController,private loaderService:LoaderService) { }

  ngOnInit() {
    this.setValidationPattern();
    this.addStepperItems();
  }

  setValidationPattern() {
    this.panFormGroup = this.fb.group({
      PanNumber: ['', [Validators.required, Validators.pattern("[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$")]]
    });
  }

  public checkErrorPAN = (controlName: string, errorName: string) => {
    return this.panFormGroup.controls[controlName].hasError(errorName) && (this.panFormGroup.controls[controlName].dirty || this.panFormGroup.controls[controlName].touched) ? this.panFormGroup.controls[controlName].hasError(errorName) : ''
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }

  onSubmitPAN() {

  }
  openCamra() {

  }
  addStepperItems() {
    this.stepItems = [
      {
        stepNos: "Step 1",
        stepImg: this.imageList?.detailIcon,
        stepName: "Give PAN Details"
      },
      {
        stepNos: "Step 2",
        stepImg: this.imageList?.uploadIcon,
        stepName: "Upload Aadhar Card"
      },
      {
        stepNos: "Step 3",
        stepImg: this.imageList?.linkIcon,
        stepName: "Link Bank Account"
      }
    ]
  }

  currentPANStatus(e){
    if(e){
      this.panCardKYC = true;
    }
  }

  currentAadharStatus(e){
    if(e){
      this.aadharKYC = true;
    }
  }

  currentBankStatus(e){
    if(e){
      this.bankKYC = true;
    }
  }


  validatePan(){
    let custReg = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    if (!this.currentImg && !this.currentInputPan){
      this.showRequiredError = true;
      return false;
    }else{
      this.showRequiredError = false;
      if(this.currentInputPan && !custReg.test(this.currentInputPan)){
        this.showPatternError = true;
        return false;
      }else{
        this.showPatternError = false;
        return true;
      }
    }
  }

  changeInputType(){

    this.isValid = this.validatePan();
    if(this.isValid)
      this.currentType = !this.currentType;


    if(this.currentInputPan){
      if(this.currentType){
        this.currentInputEncoded = this.currentInputPan.replace(/.(?=.{4})/g, 'X');
        localStorage.setItem('pan',this.currentInputPan);
      }else{
       this.currentInputEncoded = this.currentInputPan
      }
    }
  }

  onKeyPan(e){
    this.getPanNumber.emit(e);
    this.showRequiredError = false;
    this.showPatternError = false;
    this.currentInputPan = (e.target.value).toUpperCase();
    this.currentInputEncoded = (e.target.value).toUpperCase();
    this.changeInputType()
  }


  // async openKYCModal() {

  //   this.loaderService.hideLoader();
  //   let panData = [{
  //     "DocumentGuId": "4afad26b-1ee6-4de3-bf13-c2d4b4ffeefd",
  //     "Document": "PAN",
  //     "Offering": "Onboarding",
  //     "IsCompleted": "False",
  //     "AadharStatus": "False",
  //     "IsDerivative": "0"
  //   }]
  //   let aadharData = [
  //     {
  //       "DocumentGuId": "74dc49aa-cbc1-4321-a7e2-2541fb60abfa",
  //       "Document": "Aadhar",
  //       "Offering": "Onboarding",
  //       "IsCompleted": "False",
  //       "AadharStatus": "False",
  //       "IsDerivative": "0"
  //     }
  //   ]
  //   let nameAddressData = [
  //     {
  //       "DocumentGuId": "b196712c-bba5-4e17-931b-37ed23fffb77",
  //       "Document": "NameAddressDetail",
  //       "Offering": "Onboarding",
  //       "IsCompleted": "False",
  //       "AadharStatus": "False",
  //       "IsDerivative": "0"
  //     }
  //   ]
  //   let bankData = [{
  //     "DocumentGuId": "0dbf360e-340b-4416-828c-244d8cf8f452",
  //     "Document": "Cheque",
  //     "Offering": "Onboarding",
  //     "IsCompleted": "False",
  //     "AadharStatus": "False",
  //     "IsDerivative": "0"
  //   }]
  //   let exchangeData = [
  //     {
  //       "DocumentGuId": "43ce03d2-dc5c-4962-b15f-14ea88247ec1",
  //       "Document": "Exchange",
  //       "Offering": "Onboarding",
  //       "IsCompleted": "False",
  //       "AadharStatus": "False",
  //       "IsDerivative": "0"
  //     }
  //   ]
  //   let incomeProofData = [{
  //     "DocumentGuId": "0dbf360e-340b-4416-828c-244d8cf8f452",
  //     "Document": "IncomeProof",
  //     "Offering": "Onboarding",
  //     "IsCompleted": "False",
  //     "AadharStatus": "False",
  //     "IsDerivative": "0"
  //   }]
  //   let personalDetailsData = [
  //     {
  //       "DocumentGuId": "4aecd238-aa1b-45b2-bab6-98c336510107",
  //       "Document": "PersonalDetails",
  //       "Offering": "Onboarding",
  //       "IsCompleted": "False",
  //       "AadharStatus": "False",
  //       "IsDerivative": "0"
  //     }
  //   ]
  //   let nomineeData = [
  //     {
  //       "DocumentGuId": "a6ccddbe-8c87-410f-a139-b0c269fdc693",
  //       "Document": "Nominee",
  //       "Offering": "Onboarding",
  //       "IsCompleted": "False",
  //       "AadharStatus": "False",
  //       "IsDerivative": "0"
  //     }
  //   ]
  //   let selfieData = [
  //     {
  //       "DocumentGuId": "60ddfd1a-5f48-4bb9-a6a7-2df1cb3d33ab",
  //       "Document": "Selfie",
  //       "Offering": "Onboarding",
  //       "IsCompleted": "",
  //       "AadharStatus": "False",
  //       "IsDerivative": "0"
  //     }
  //   ]
  //   let signatureData = [
  //     {
  //       "DocumentGuId": "bce5674b-711e-4ac5-a2ef-9329e9d4527a",
  //       "Document": "WetSign",
  //       "Offering": "Onboarding",
  //       "IsCompleted": "False",
  //       "AadharStatus": "False",
  //       "IsDerivative": "0"
  //     }
  //   ]

  //   let uploadDocData = [
  //     {
  //       "DocumentGuId": "0dbf360e-340b-4416-828c-244d8cf8f452",
  //       "Document": "UploadPanAadhar",
  //       "Offering": "Onboarding",
  //       "IsCompleted": "False",
  //       "AadharStatus": "False",
  //       "IsDerivative": "0"
  //     }
  //   ]
  //   let esignData = [
  //     {
  //       "DocumentGuId": "ee66199c-7807-4483-8dda-016163c59ba9",
  //       "Document": "Esgin",
  //       "Offering": "Onboarding",
  //       "IsCompleted": "False",
  //       "AadharStatus": "False",
  //       "IsDerivative": "0"
  //     }
  //   ]

  //   let currentFetcherModule = {
  //     // "OfferingGuId": "a3d10040-02b0-44de-a0cc-37bb59ea2966",
  //     "OfferingGuId": "d46461be-da40-4b5c-bae0-3bcbbfb5afcf",
  //     "Offering": "Onboarding"
  //   }

  //   // this.loaderService.showLoader();

  //   this.loaderService.hideLoader();
  //   const modal = await this.modalController.create({
  //     component: KycStepsMFComponent,
  //     componentProps: {
  //       'currentInputPan':this.currentInputPan,
  //       'panCardKYC': panData,
  //       'aadharKYC': aadharData,
  //       'nameAddressKYC' : nameAddressData,
  //       'bankKYC': bankData,
  //       'exchangeKYC': exchangeData,
  //       'incomeProofData': incomeProofData,
  //       'personalDetailsKYC': personalDetailsData,
  //       'nomineeKYC': nomineeData,
  //       'selfieKYC': selfieData,
  //       'signatureKYC': signatureData,
  //       'uploadPanAadharKYC': uploadDocData,
  //       'esignKYC': esignData,
  //       'imageList': this.imageList,
  //       'errorList': this.errorList,
  //       "OnboardingProfile":true,

  //       // 'panCardKYC': this.getCurrentKYCData("PAN"),
  //       // 'aadharKYC': this.getCurrentKYCData("Aadhar"),
  //       // 'uploadPanAadharKYC': this.getCurrentKYCData("Aadhar"),
  //       // 'nameAddressKYC': this.getCurrentKYCData("NameAddressDetail"),
  //       // 'bankKYC': this.getCurrentKYCData("Cheque"),
  //       // 'exchangeKYC': this.getCurrentKYCData("ExchangeSelection"),
  //       // 'incomeProofData': this.getCurrentKYCData("IncomeProof"),
  //       // 'personalDetailsKYC': this.getCurrentKYCData("PersonalDetail"),
  //       // 'nomineeKYC': this.getCurrentKYCData("Nominee"),
  //       // 'selfieKYC': this.getCurrentKYCData("Selfie"),
  //       // 'signatureKYC': this.getCurrentKYCData("WetSign"),
  //       // 'esignKYC': this.getCurrentKYCData("Esign"),

  //       // 'imageList': this.imageList,
  //       // 'errorList': this.errorList,
  //       // 'currentModuleType': currentFetcherModule,
  //       // 'loginCustomerGuId': this.localCustGuId,
  //       // "customerPanName": this.customerPanName,
  //       // 'isKra': this.isKra,
  //       'isKra': 1,

  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //       if (data && data?.data) {
  //         this.router.navigate(['/Dashboard']);
  //       }
  //     });
  //   this.loaderService.hideLoader();
  //   return await modal.present();
  // }

  async selectImage() {
    // console.log("cordova scan", this.isCordovaStatus);

    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();

    // if (this.isCordovaStatus) {
    //   const actionSheet = await this.actionSheetController.create({
    //     header: "Select Image source",
    //     buttons: [{
    //       text: 'Load from Library',
    //       handler: () => {
    //         this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
    //       }
    //     },
    //     {
    //       text: 'Use Camera',
    //       handler: () => {
    //         this.pickImage(this.camera.PictureSourceType.CAMERA);
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel'
    //     }
    //     ]
    //   });
    //   await actionSheet.present();
    // } else {
    //   this.imagePreview("test", 1)
    // }

  }

  pickImage(sourceType) {

    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
      // cameraDirection: this.camera.Direction.FRONT
    }
    this.camera.getPicture(options).then((imageData) => {
      // console.log("imageData", imageData)
      // imageData is either a base64 encoded string or a file URI
      this.currentImg = 'data:image/jpeg;base64,' + imageData;
      this.cd.detectChanges();
      let realData = this.currentImg.split(",")[1];
      let selfieImage = this.b64toBlob(realData, 'image/jpeg');

      if (this.currentNativeNetwork) {
        // this.loaderService.showLoader()
        this.panImageData(selfieImage)

        this.cd.detectChanges();
      } else {
        this.ErrorMsg = this.errorList?.networkError
        this.loggedInModal = true

        setTimeout(() => {
          this.loggedInModal = false;

        }, 3000);

      }
    }, (err) => {
      // console.log("err", err)
      // Handle error
    });
  }


  b64toBlob(b64Data: string, contentType: string) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  panImageData(file) {
    const formData = new FormData();
    formData.append('front_image', file);
    formData.append('back_image', file);
    formData.append('CustGuId', this.loginCustomerGuId)
    // this.loaderService.showLoader();

    this.commonService.getPanOcr(formData).subscribe((data: any) => {
      if (data) {

        // console.log(data.msg);
        this.panUserName = data.msg.name;

        // this.showNextStep = true;
        // this.showFirstStep = false;
        this.currentInputPan = data.msg.doc_id;
        let dummyEvent = {
          "target": {
            "value": this.currentInputPan
          }
        }
        // this.onKeyPan(dummyEvent)
        this.loaderService.hideLoader();
        // this.getPanName.emit(data.msg.name)
        this.changeInputType();
      }
    }, (error: any) => {
      this.ErrorMsg = "fail1 from getSelfieUpload"
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);


    })
  }
  imagePreview(e, status) {
    // console.log("cordova scan", this.isCordovaStatus);
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      // console.log("filepath", this.filePath)
      this.currentImg = this.filePath
      if (this.currentImg) {
        this.loaderService.showLoader()
        this.panImageData(e.target.files[0])
        // console.log("filepath", this.filePath)
        // this.panImageData(
        //   this.b64toBlob(this.filePath, 'image/jpeg'));
      }
    }
    reader.readAsDataURL(file)
  }
  deleteImg() {
    this.currentImg = ''
    this.currentInputEncoded = null
    this.cd.detectChanges();
  }
  // OpneOnbarding(){
  // this.openKYCModal();
 
  // }





  // ////////////////////////////////////////////////////////////////////////////

  processToNextStep(obj) {
    this.loaderService.showLoader();
    this.commonService.getPanDetails(obj).subscribe((data:any) => {
      // this.loaderService.hideLoader();
      // console.log(data);

      if (data && data?.Status) {
        this.panDetailsData = data;
        this.panUserName = data?.msg ? (data?.msg?.NameOnTheCard || data?.msg?.Name) : ''
        // this.panUserName = data?.msg ? (data?.msg?.Name || data?.msg?.NameOnTheCard) : ''

        this.commonService.getAdhaarSeeding(obj).subscribe((data: any) => {
          this.loaderService.hideLoader();
          // console.log("adhaarSEEDING", data);
           this.showNextStep = true;
          if (data && data?.Status) {
            if (data.msg.AadharSeedingStatus === "Aadhaar Seeding is Successful") {

              this.showNextStep = true;
              this.showFirstStep = false;

            } else {
              this.showNextStep = false;
              this.seeding = true;
            }

          } else {
            this.showNextStep = false;
            this.ErrorMsg = data.Message
            this.loggedInModal = true
            setTimeout(() => {
              this.loggedInModal = false;
            }, 3000);

          }
        }, (error: any) => {
          this.showNextStep = false;
          this.errorShow(error?.Message, "processToNextStep -> Http request");
        })

      } else {
        this.showNextStep = false;
        this.errorShow(data?.Message, "processToNextStep -> status");
      }
    }, (error: any) => {
      this.showNextStep = false;
      this.errorShow(error?.Message, "processToNextStep -> Http request");
    })
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    // this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }
  OpneOnbarding(){
    // this.loaderService.showLoader()
    // this.ContainerViewPage.openKYCModal();
    this.ContainerViewPage.getDocumentList(localStorage.getItem('CustGuId'));
  }

}
