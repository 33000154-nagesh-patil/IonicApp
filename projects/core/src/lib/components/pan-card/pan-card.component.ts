import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CommonService } from '../../services/common.service';
import { NetworkService } from '../../services/network.service';
import { civilKraDetails, panDetails } from '../../interfaces/common.interface';
import { LoaderService } from '../../services/loader.service';
import { CommonFunctionService } from '../../services/common-function.service';
import { urlFetch } from 'projects/core/src/lib/enums/comman.enum';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { DomSanitizer } from '@angular/platform-browser';


import { File } from '@awesome-cordova-plugins/file/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-pan-card',
  templateUrl: './pan-card.component.html',
  styleUrls: ['./pan-card.component.scss'],
})

export class PanCardComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() currentModuleType: any;
  @Input() panDetails: any;
  @Input() loginCustomerGuId: any;
  @Output() getPanStatus = new EventEmitter();
  @Output() getPanName = new EventEmitter();
  @Output() getPanNumber = new EventEmitter();


  // @Output() getPanFirstName = new EventEmitter();
  // @Output() getPanLastName = new EventEmitter();
  @Output() getCivilKraStatus = new EventEmitter();
  currentType: any = false;
  currentInputPan: any;
  currentInputEncoded: any;
  currentImg: any;
  policyCheckBox: any = true;
  showRequiredError: any = false;
  showPatternError: any = false;
  showFirstStep: any = true;
  showNextStep: any = false;
  showConfirmNextStep: any = false;
  residentStatus: any = 'IN-Indian';
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  panDetailsData: any;
  panUserName: any;
  isValid: boolean = false;
  currentFetcherModule: any;
  currentKYCType: any;
  appName: any;
  maxDate: any;
  civilKraIpvFlag: any = "005";
  dob: string;
  filePath: any;
  loggedInModal: boolean = false
  seedingFail: boolean = false
  ErrorMsg: any;
  seeding: boolean = false;
  alreadyExist:boolean=false;
  ExistData: any;
  mobileExist:any;
  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/PanValidation",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private camera: Camera, private modalCtrl: ModalController, private allConfigDataService: AllConfigDataService, private actionSheetController: ActionSheetController, private fb: FormBuilder, private commonService: CommonService, private networkService: NetworkService, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, private cd: ChangeDetectorRef, private file: File) { }

  dobValidationForm = this.fb.group({
    dob: ['', [Validators.required]]
  })
  get errorControl() {
    return this.dobValidationForm.controls;
  }

  ngOnInit() {
    let param ={
      "customerGuId": this.loginCustomerGuId,
    }
// this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.getDocumentList,param)
// .subscribe((res:any)=>{

// })


    this.loaderService.hideLoader()
    this.futureDateDisable();
    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })

    this.appName = this.allConfigDataService.getConfig('appName');
    this.imageList = this.allConfigDataService.getConfig('images');

  }
  successModalClose() {
    this.loggedInModal = false
  }

  imagePreview(e, status) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      this.currentImg = this.filePath
      if (this.currentImg) {
        this.loaderService.showLoader()
        this.panImageData(e.target.files[0])
      }
    }
    reader.readAsDataURL(file)
  }

  futureDateDisable() {
    var date = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear() - 18;
    if (todayDate < 10) {
      todayDate = '0' + todayDate;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.maxDate = year + "-" + month + "-" + todayDate;
  }

  gotoBack() {
    if (this.showNextStep) {
      this.showNextStep = false;
      this.showFirstStep = true;
    } else {
      this.modalCtrl.dismiss();
    }
  }
  dismiss(e) {
    if (e) {
      let panAllData = {
        'panDetails': this.panDetailsData
      }
      this.modalCtrl.dismiss(panAllData);
    } else {
      this.modalCtrl.dismiss();
    }

  }
  checkboxClick(e) {
    this.policyCheckBox = !this.policyCheckBox
  }
  onSubmitPAN() {
    this.isValid = this.validatePan();
    if (this.isValid) {
      if (this.policyCheckBox) {
        this.checkNetworkConnectionPAN();
      } else {
        this.ErrorMsg = this.errorList?.tcError
        this.loggedInModal = true

        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);

      }
    }
  }

  checkNetworkConnectionPAN() {
    if (this.isCordovaStatus) {
      this.nativeNetworkPAN();
    } else {
      this.windowNetworkPAN();
    }
  }
  nativeNetworkPAN() {
    if (this.currentNativeNetwork) {
      this.processData();
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  windowNetworkPAN() {
    if (this.currentWindowNetwork) {
      this.processData()
      // this.dummyNextStep();//by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  processData() {
    this.isValid = this.validatePan();
    if (this.isValid) {
      let localObj = {
        "docNumber": this.currentInputPan
      }
      this.processToNextStep(localObj);
      // this.dummyNextStep(localObj);//by pass
    }
  }

  validatePan() {
    let custReg = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    if (!this.currentImg && !this.currentInputPan) {
      this.showRequiredError = true;
      return false;
    } else {
      this.showRequiredError = false;
      if (this.currentInputPan && !custReg.test(this.currentInputPan)) {
        this.showPatternError = true;
        return false;
      } else {
        this.showPatternError = false;
        return true;
      }
    }
  }
  dummyNextStep(val) {
    // this.showNextStep = true;
    // this.router.navigate(['Onboarding/DOB']);

    // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'Onboarding'+this.apiCatalog.getNextStep, "reqParams")
    this.http.get("assets/data/getNextSteps.json")
      .subscribe((data: any) => {
        if (data) {
          // this.getNextStep.emit(data?.msg)
          this.showFirstStep = false;
          this.commonService.userPan.next(val);
          this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
        } else { 
          this.errorShow(data?.Message, "dummyPanPOST -> Http request");
        }
      })

  }
  processToNextStep(obj) {
    this.loaderService.showLoader();
    // this.commonService.getPanDetails(obj)
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.getPanDetails, obj)
    // this.http.get("assets/data/getNextSteps.json")
    .subscribe((data: panDetails) => {
      

      if (data) {
        this.loaderService.hideLoader();
        this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
        this.panDetailsData = data;
        this.panUserName = data?.msg ? (data?.msg?.NameOnTheCard || data?.msg?.Name) : ''

        // this.commonService.getAdhaarSeeding(obj).subscribe((data: any) => {
        //   this.loaderService.hideLoader();

        //   if (data && data?.Status) {
        //     if (data.msg.AadharSeedingStatus === "Aadhaar Seeding is Successful") {
        //       this.showNextStep = true;
        //       this.showFirstStep = false;
        //     } else {
        //       this.showNextStep = false;
        //       this.seeding = true;
        //     }

        //   } else {
        //     this.showNextStep = false;
        //     this.ErrorMsg = data.Message
        //     this.loggedInModal = true
        //     setTimeout(() => {
        //       this.loggedInModal = false;
        //     }, 3000);

        //   }
        // }, (error: any) => {
        //   this.showNextStep = false;
        //   this.errorShow(error?.Message, "processToNextStep -> Http request");
        // })

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
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }
  changeInputType() {
    this.isValid = this.validatePan();
    if (this.isValid)
      this.currentType = !this.currentType;

    if (this.currentInputPan) {
      if (this.currentType) {
        this.currentInputEncoded = this.currentInputPan.replace(/.(?=.{4})/g, 'x');
      } else {
        this.currentInputEncoded = this.currentInputPan
      }
    }
  }
  onKeyPan(e) {
    this.showRequiredError = false;
    this.showPatternError = false;
    this.currentInputPan = (e.target.value).toUpperCase();
    this.currentInputEncoded = (e.target.value).toUpperCase();
    this.changeInputType()
  }
  async selectImage() {

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
      // imageData is either a base64 encoded string or a file URI
      this.currentImg = 'data:image/jpeg;base64,' + imageData;
      this.cd.detectChanges();
      let realData = this.currentImg.split(",")[1];
      let selfieImage = this.b64toBlob(realData, 'image/jpeg');

      if (this.currentNativeNetwork) {
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
      // Handle error
      this.errorShow(err, "pickImage -> getPicture");
    });
  }

  onSubmitPANOtherInfo() {
    this.postCollectionPANData();
  }

  async postCollectionPANData() {
    this.dob = this.commonFunctionService.dobFormattedYYYYMMDD(this.errorControl.dob.value)

    let localPostPanData = {
      "docNumber": this.currentInputPan,
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.panDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId,
      "Citizenship": this.residentStatus,
      "dob": this.dob,
      "CustomerPanName": this.panDetailsData?.msg?.NameOnTheCard || this.panDetailsData?.msg?.Name
    }
    if (this.isCordovaStatus) {
      this.nativeNetworkPANPost(localPostPanData);
    } else {
      this.windowNetworkPANPost(localPostPanData);
    }
  }

  nativeNetworkPANPost(obj) {
    if (this.currentNativeNetwork) {
      // this.processPANPostData(obj);
      this.dummyPanPOST()
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  windowNetworkPANPost(obj) {
    if (this.currentWindowNetwork) {
      // this.processPANPostData(obj)
      this.dummyPanPOST() //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  dummyPanPOST() {
    this.getCivilKraStatus.emit(this.civilKraIpvFlag);
    this.getPanName.emit(this.panDetailsData?.msg?.NameOnTheCard || this.panDetailsData?.msg?.Name)
    this.getPanNumber.emit(this.currentInputPan)
    this.getPanStatus.emit('bank')
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'Onboarding'+this.apiCatalog.getNextStep, "reqParams")
      .subscribe((data: any) => {
        if (data) {
          // this.getNextStep.emit(data?.msg)
          this.router.navigate(['/Onboarding'+data['URLToRedirect']]);
        } else { 
          this.errorShow(data?.Message, "dummyPanPOST -> Http request");
        }
      })
  }
  processPANPostData(obj) {
    this.loaderService.showLoader();
    this.commonService.postPanDetails(obj).subscribe((data: panDetails) => {
      this.loaderService.hideLoader();
      if (data) {
        this.getCivilKraStatus.emit(this.civilKraIpvFlag);
        this.getPanNumber.emit(this.currentInputPan)
        this.getPanName.emit(this.panDetailsData?.msg?.NameOnTheCard || this.panDetailsData?.msg?.Name || this.panUserName)
        this.getPanStatus.emit('bank')
      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })
  }
  deleteImg() {
    this.currentImg = ''
    this.currentInputEncoded = null
    this.cd.detectChanges();
  }

  clickDisclaimerURL() {
    this.commonFunctionService.inAppBrowser(urlFetch.disclaimerURL);
  }
  clickTncUrl() {
    this.commonFunctionService.inAppBrowser(urlFetch.tncURL);
  }

  onDobContinue() {
    if (this.dobValidationForm.valid) {
      this.dob = this.commonFunctionService.dobFormattedYYYYMMDD(this.errorControl.dob.value)
      let localObj = {
        "CustGuId": this.loginCustomerGuId,
        "PanNo": this.currentInputPan,
        "dob": this.dob
      }
      if (this.isCordovaStatus) {
        this.nativeNetworkCivilKraPost(localObj);
      } else {
        this.windowNetworkCivilKraPost(localObj);
      }

    } else {
      this.errorShow(this.errorList?.dobError, "onDobContinue -> dobValidationForm");
    }
  }
  nativeNetworkCivilKraPost(obj) {
    if (this.currentNativeNetwork) {
      // this.processCivilKraData(obj);
      this.dummyPanPOSTDOB() //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  windowNetworkCivilKraPost(obj) {
    if (this.currentNativeNetwork) {
      // this.processCivilKraData(obj);
      this.dummyPanPOSTDOB() //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  dummyPanPOSTDOB() {
    this.showFirstStep = false;
    this.showNextStep = false;
    this.showConfirmNextStep = true;
    this.panUserName="Akshay Patil"
  }
  processCivilKraData(obj) {
    this.loaderService.showLoader();
    this.commonService.postCivilKra(obj).subscribe((data: civilKraDetails) => {
      this.loaderService.hideLoader();
      if (data && data?.Status == 1) {
        this.civilKraIpvFlag = data.Data.Status;
        this.showNextStep = false;
        this.showConfirmNextStep = true;
      } else {
        // this.civilKraIpvFlag = data.Data.UpdateStatus;// for temp
        // this.showNextStep = false;// for temp
        // this.showConfirmNextStep = true;// for temp
        this.showConfirmNextStep = false;
        this.errorShow(data?.Message, "processCivilKraData -> status");
      }
    }, (error: any) => {
      this.showConfirmNextStep = false;
      this.errorShow(error?.Message, "processCivilKraData -> Http request");
    })
    // this.showNextStep = false;
    // this.showConfirmNextStep = true;
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
    this.loaderService.showLoader();
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
        this.onKeyPan(dummyEvent)
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
  onOK() {
    this.seeding = false
  }
  getSkip() {
    this.showNextStep = true;
    this.seeding = false;
    this.showFirstStep = false;
  }
}
