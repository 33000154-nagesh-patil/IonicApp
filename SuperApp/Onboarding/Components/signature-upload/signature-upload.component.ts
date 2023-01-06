import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ManuallySignComponent } from './manually-sign/manually-sign.component';

import { HttpClient, HttpHeaders } from '@angular/common/http';


import { NetworkService } from 'index';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { AllConfigDataService } from 'index';
import { CommonFunctionService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';


@Component({
  selector: 'app-signature-upload',
  templateUrl: './signature-upload.component.html',
  styleUrls: ['./signature-upload.component.scss'],
})
export class SignatureUploadComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() name: any;
  @Input() currentModuleType: any;
  @Input() signatureDetails: any;
  @Input() loginCustomerGuId: any;
  loggedInModal: boolean = false
  ErrorMsg: any;
  @Output() getSignatureStatus = new EventEmitter();
  currentImg: any;
  currentSign: any;
  appName: any;
  environmentAPIList: any;
  selfieImage: any;
  isCordovaStatus: any
  currentNativeNetwork: any;
  filePath: any
  btnContinueDisabled: any = false;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  breadCrumbPartner: string;


  constructor(private router:Router,
    private camera: Camera, private networkService: NetworkService,
    private allConfigDataService: AllConfigDataService, private actionSheetController: ActionSheetController,
    public modalCtrl: ModalController, private commonService: CommonService, private loaderService: LoaderService,
    private http: HttpClient, private commonFunctionService: CommonFunctionService, private cdn: ChangeDetectorRef,
    private eduService:eduService, private onboardingService:OnboardingService
    ) { }

  ngOnInit() {
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Onboarding/OnboardingSteps/WetSign';
    this.breadCrumbPartner='Onboarding/OnboardingSteps/PartnerWetSign';
    this.imageList = this.allConfigDataService.getConfig('images');
    this.btnContinueDisabled = true;
    this.appName = this.allConfigDataService.getConfig('appName');
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();

    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })
    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })

    this.loaderService.hideLoader();
  }

  successModalClose() {
    this.loggedInModal = false
  }

  imagePreview(e, status) {

    this.selfieImage = null;
    this.currentImg = null;
    this.currentSign = null;

    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      this.currentImg = this.filePath
      this.btnContinueDisabled = false;

      if (this.currentImg) {
        this.btnContinueDisabled = false;
      }
      this.selfieImage = e.target.files[0]
    }
    reader.readAsDataURL(file)

  }

  gotoBack() {
    this.modalCtrl.dismiss();
  }

  dismiss(e) {
    this.modalCtrl.dismiss();
  }


  async selectImage() {
    this.selfieImage = null;
    this.currentSign = null;
    this.btnContinueDisabled = false;
    // this.btnSignManuallyDisabled = true;
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
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // console.log("imageData", imageData)
      // imageData is either a base64 encoded string or a file URI
      this.currentImg = 'data:image/jpeg;base64,' + imageData;
      let realData = this.currentImg.split(",")[1];
      this.selfieImage = realData;
      // this.selfieImage = this.b64toBlob(realData, 'image/jpeg');
      this.cdn.detectChanges();

    }, (err) => {
      console.log("err", err)
      // Handle error
    });
  }

  async clickSignManually() {
    this.selfieImage = null;
    this.currentImg = null;
    this.btnContinueDisabled = false;
    const modal = await this.modalCtrl.create({
      component: ManuallySignComponent,
      componentProps: {
        'imageList': this.imageList,
        'errorList': this.errorList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          this.currentSign = data?.data
          let realData = this.currentSign.split(",")[1];
          this.selfieImage = realData;
          // this.selfieImage = this.b64toBlob(realData, 'image/jpeg');
          this.cdn.detectChanges();
        }
      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }

  onContinue() {
    // this.modalCtrl.dismiss();
    if (this.currentNativeNetwork) {
      if (this.selfieImage !== null || this.selfieImage === '') {
        this.getAPI(this.selfieImage);

      }
      else {
        alert('Please Select Image')
      }
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }

  getAPI(file) {

    let param =  {
      "TokenId":localStorage.getItem('id_token'),
      "docImage": file,
    }

    let Url
    if(localStorage.getItem("userType") =="Partner"){
      this.onboardingService.nextOnSuccess('WetSign')


      // Url=this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.PartnerWetSign
      // let subMethod
      // this.eduService.categoryValueForAPI.subscribe(val=>{
      //   subMethod = val['productLanding']?'?'+val['categoryLanding']+'_'+val['productLanding']:'';
      // })
      // Url=this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.wetSign+subMethod

      // this.http.post(Url, param)
      // // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.insertWetSign, formData, { headers })
      // .subscribe(
      //   (data: any) => {
      //     // console.log("Signature details", data)
      //     // debugger;
      //     // this.loaderService.hideLoader();
      //     if (data.status==='1') {
      //       // this.processSignPostData();
      //     // this.router.navigate(['/Onboarding'+data['pageUrl']]);
      //     this.onboardingService.nextOnSuccess('WetSignature')

      //       // this.getSignatureStatus.emit("signature")
      //     }
      //     else {
      //       this.errorShow(data?.Message, "getEsign -> status");
      //     }
      //   }, (error: any) => {
      //     this.errorShow(error?.Message, "getEsign -> Http request");
      //   })




    }
    else if(localStorage.getItem("userType") =="Customer"){
      // let subMethod
      // this.eduService.categoryValueForAPI.subscribe(val=>{
      //   subMethod = val['productLanding']?'?'+val['categoryLanding']+'_'+val['productLanding']:'';
      // })
      Url=this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.submitDetails

    }
    this.http.post(Url, param)
    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.insertWetSign, formData, { headers })
    .subscribe(
      (data: any) => {
        // console.log("Signature details", data)
        // debugger;
        // this.loaderService.hideLoader();
        if (data.status==='1') {
          // this.processSignPostData();
        // this.router.navigate(['/Onboarding'+data['pageUrl']]);
        this.onboardingService.nextOnSuccess('WetSignature')

          // this.getSignatureStatus.emit("signature")
        }
        else {
          this.errorShow(data?.Message, "getEsign -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "getEsign -> Http request");
      })
  }

  processSignPostData() {
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.signatureDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId
    }
    // this.loaderService.showLoader();
    // this.commonService.postPanDetails(localPostData)
    // // this.http.get('assets/data/getNextSteps.json')
    // .subscribe((data: any) => {
      this.http.get('assets/data/getNextSteps.json')
      // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'Onboarding'+this.apiCatalog.getNextStep, "reqParams")
        .subscribe((data: any) => {
          if (data) {
            // this.getNextStep.emit(data?.msg)
            this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
          } else {
            this.errorShow(data?.Message, "dummyPanPOST -> Http request");
          }
        })
    //   this.loaderService.hideLoader();
    //   if (data && data?.Status) {
    //     this.getSignatureStatus.emit("signature")
    //     // this.router.navigate(['/Onboarding'+data['UrlToRedirect']]);
    //   } else {
    //     this.errorShow(data?.Message, "processPANPostData -> status");
    //   }
    // }, (error: any) => {
    //   this.errorShow(error?.Message, "processPANPostData -> Http request");
    // })
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
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


}
