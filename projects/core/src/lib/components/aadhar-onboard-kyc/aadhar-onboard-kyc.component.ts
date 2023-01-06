import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { NetworkService } from '../../services/network.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Router } from '@angular/router';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { CommonFunctionService } from '../../services/common-function.service';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-aadhar-onboard-kyc',
  templateUrl: './aadhar-onboard-kyc.component.html',
  styleUrls: ['./aadhar-onboard-kyc.component.scss'],
})
export class AadharOnboardKycComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() name: any;
  @Input() currentModuleType: any;
  @Input() aadharDetails: any;
  @Input() loginCustomerGuId: any;
  @Output() getAadharStatus = new EventEmitter();
  @Output() skippedAdhaar = new EventEmitter();
  appName: any;
  currentLanguage: any;
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  loggedInModal: boolean = false
  ErrorMsg: any;
  AadharNumFb: FormGroup
  headerName: any;
  showOTPModal: any = false;
  showOTPModal1: any = false;
  aadhaarVerificationHolder: any = false;
  languageType: String = "en";
  otpLabels: any;
  PhoneVerificationForm!: FormGroup;
  currentStatus = "AccountDetails"
  digiHeader: any;
  digipara: any;
  digiSubHeader: any;
  digiSubPara: any;
  digiButtonText: any;
  progressValue: any = "0.5";
  strName: any;
  custSelfieImage: any;
  showCaptcha: boolean = false;
  captchaImg: string;
  captchaData: any;
  currentImg: any
  filePath: any
  AadharNo: any
  languages: any;
  noOTP: boolean;
  captchBlank: boolean = false;
  skipFlag: boolean = false;


  constructor(private allConfigDataService: AllConfigDataService, private actionSheetController: ActionSheetController, private networkService: NetworkService,
    private modalCtrl: ModalController, private camera: Camera, private fb: FormBuilder, private toastService: ToastService, private commonService: CommonService, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    this.languages = this.allConfigDataService.getConfig('languageList');

    this.appName = this.allConfigDataService.getConfig('appName');
    if (this.currentLanguage) {
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if (allErrorList) {
        this.errorList = allErrorList[this.currentLanguage];
      }
    }

    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })
    if (this.currentStatus === 'AccountDetails') {
      this.headerName = 'Address Proof';
    }
    if (this.currentStatus === 'Digilocker') {
      this.progressValue = '0.7'
      this.headerName = this.languages.en.setupInvestmentAccount;
      this.digiHeader = this.languages.en.digilockerDocumentKyc;
      this.digipara = this.languages.en.adhaarCardLinkMust;
      this.digiSubHeader = this.languages.en.digilockerQ;
      this.digiSubPara = this.languages.en.digilockerAuto + this.appName;
      this.digiButtonText = this.languages.en.proceedKyc;
    }
    if (this.currentStatus === 'nonDigilocker') {
      this.progressValue = '0.7'
      this.headerName = this.languages.en.setupInvestmentAccount;
      this.digiHeader = this.languages.en.digilockerDocumentKyc;
      this.digipara = this.languages.en.adhaarCardLinkMust;
      this.digiSubHeader = this.languages.en.digilockerQ;
      this.digiSubPara = this.languages.en.digilockerAuto + this.appName;
      this.digiButtonText = this.languages.en.proceedKyc;
    }
    this.AadharNumFb = this.fb.group({
      AadharNumber: ['', [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")]],
      captchaText: ['', [Validators.required]]
      // AadharNumber: ['', [Validators.required, Validators.pattern("^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$")]]
      // ^ represents the starting of the string.
      // [2-9]{1} represents the first digit should be any from 2-9.
      // [0-9]{3} represents the next 3 digits after the first digit should be any digit from 0-9.
      // \\s represents white space. (we are not using this)
      // [0-9]{4} represents the next 4 digits should be any from 0-9.
      // \\s represents white space. (we are not using this)
      // [0-9]{4} represents the next 4 digits should be any from 0-9.
      // $ represents the ending of the string.
    })

    this.PhoneVerificationForm = this.fb.group({
      otp1: [''],
      otp2: [''],
      otp3: [''],
      otp4: [''],
      otp5: [''],
      otp6: ['']
    })

  }

  goBack() {

  }
  onKeyAdhar(e) {
    // console.log("e", e.target.value)
  }

  async validateCaptcha() {
    if (!this.AadharNumFb.valid && this.AadharNumFb.controls['captchaText'].errors.required) {
      // this.toastService.showAutoToast("Please enter captcha")
      this.ErrorMsg = "Please enter captcha"
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    } else {
      // this.showOTPModal1 = true;
      if (this.currentNativeNetwork) {
        this.loaderService.showLoader();
        this.AadharNo = this.AadharNumFb.controls['AadharNumber'].value
        
        let requestParams = {
          "docNumber": this.AadharNo.toString(),
          "captchaCode": this.AadharNumFb.controls['captchaText'].value,
          "tsTransID": this.captchaData.tsTransID,
          "secretToken": this.captchaData.secretToken
        }
        // console.log("adhar captcha validation");
        // this.showOTPModal = true; //temp
        this.noOTP = false
        this.commonService.validateAadharCaptcha(requestParams).subscribe(async data => {
          this.loaderService.hideLoader();
          if (data.Status || data.Status == 1) {
            // console.log(data);
            this.showOTPModal = true;
            //this.aadhaarVerificationHolder = true;
            this.progressValue = '0.7'
          } else {
            this.loaderService.hideLoader();

            // this.processSignPostData();
            this.errorShow(data?.Message, "processToNextStep -> Http request");
            // this.commonFunctionService.showErrorsService(this.errorList?.error, '', data.Message, this.errorList?.okText);
          }
        }, async (error) => {
          this.loaderService.hideLoader();
          this.errorShow(error?.Message, "processToNextStep -> Http request");
          // this.commonFunctionService.showErrorsService(this.errorList?.error, '', error.Message, this.errorList?.okText);

        });
      }
      else {
        this.loaderService.hideLoader();
        // this.toastService.showAutoToast(this.errorList?.networkError)
        this.ErrorMsg = this.errorList?.networkError
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }
    }
  }
  errorShow(message: any, functionName: string) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }
  resendOTPButton(data) {
    // this.onSubmitAuthentication()
  }

  tryAgain() {
    this.showMobileOTP();
  }

  async showMobileOTP() {
    if (!this.AadharNumFb.valid && this.AadharNumFb.controls['AadharNumber'].errors && this.AadharNumFb.controls['AadharNumber'].errors.pattern) {
      // this.toastService.showAutoToast("Please enter valid Aadhar")
      this.ErrorMsg = "Please enter valid Aadhaar"
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    } else {
      if (this.currentNativeNetwork) {
        // console.log("App is online")

        this.loaderService.showLoader();
        this.AadharNo = this.AadharNumFb.controls['AadharNumber'].value
        let requestParams = {
          "docNumber": this.AadharNo.toString()
        }
        // console.log("adhar api call");
        //this.showOTPModal1 = true;
        this.commonService.generateAadharCaptcha(requestParams).subscribe(async data => {
          this.loaderService.hideLoader();
          if (data && data?.Status == 1) {
            // console.log(data);
            // this.showOTPModal = true;
            //this.aadhaarVerificationHolder = true;
            if (!data.msg.captchaCode && data.msg.captchaCode === "") {
              this.captchBlank = true;
            } else {
              this.captchBlank = false;
            }

            this.captchaData = data.msg;
            this.captchaImg = 'data:image/jpeg;base64,' + data.msg.captchaCode;
            if (!this.showCaptcha) {
              this.showCaptcha = true;
            }

            this.progressValue = '0.7'
          } else {
            this.loaderService.hideLoader();
            this.commonFunctionService.showErrorsService(this.errorList?.error, '', data.Message, this.errorList?.okText);

          }
        }, async (error) => {
          this.loaderService.hideLoader();
          this.commonFunctionService.showErrorsService(this.errorList?.error, '', error.Message, this.errorList?.okText);
        });
      } else {
        this.loaderService.hideLoader();
        // this.toastService.showAutoToast(this.errorList?.networkError)
        this.ErrorMsg = this.errorList?.networkError
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }

    }
  }
  showSuccess() {
    this.closeOtp();
    this.showOTPModal1 = true;
    this.progressValue = '1'
  }
  closeOtp() {
    this.progressValue = '0.5'
    this.showOTPModal = false;
  }
  successModalClose() {
    this.progressValue = '0.5'
    this.showOTPModal = false;
  }
  showSucessContainer(status) {

    this.processSignPostData("0");
  }


  showAadhaarContainer() {
    this.headerName = 'Address Proof';
    this.currentStatus = 'AccountDetails'

  }
  exploreNow() {
    // this.modalCtrl.dismiss();
    // this.router.navigate(['./Dashboard'])
    // this.getAadharStatus.emit("aadhar")
  }
  getOTP() {
    let otp;
    otp = this.PhoneVerificationForm.controls['otp1'].value + this.PhoneVerificationForm.controls['otp2'].value + this.PhoneVerificationForm.controls['otp3'].value + this.PhoneVerificationForm.controls['otp4'].value + this.PhoneVerificationForm.controls['otp5'].value + this.PhoneVerificationForm.controls['otp6'].value
    if (this.currentNativeNetwork) {
      this.loaderService.showLoader();
      let requestParams = {
        "mobileCode": otp,
        "tsTransID": this.captchaData.tsTransID,
      }

      this.commonService.validateAadharOtp(requestParams).subscribe(async data => {
        // this.loaderService.hideLoader();
        // this.showOTPModal = false;
        if (data.Status || data.Status == 1) {
          let localPostPanData = {
            // "docNumber": this.currentInputAdhar,
            "CustGuId": this.loginCustomerGuId,
            "OfferingGuId": this.currentModuleType?.OfferingGuId,
          }
          // console.log(data);
          // this.showOTPModal = false; //temp
          // this.showOTPModal1 = true; //temp

          this.processSignPostData("1");

        } else {
          this.loaderService.hideLoader();
          this.commonFunctionService.showErrorsService(this.errorList?.error, '', data.Message, this.errorList?.okText);

          // this.processSignPostData("0");
        }
      }, async (error) => {
        this.loaderService.hideLoader();
        this.commonFunctionService.showErrorsService(this.errorList?.error, '', error.Message, this.errorList?.okText);

        // this.processSignPostData("0");
      });
    } else {
      this.loaderService.hideLoader();
      // this.toastService.showAutoToast(this.errorList?.networkError)
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }

  processSignPostData(status) {
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.aadharDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId,
      "docNumber": this.AadharNo,
      "AadharStatus": status
    }
    // this.loaderService.showLoader();
    if (this.aadharDetails?.DocumentGuId == "") {
      this.showOTPModal = false;
      this.skipFlag = false;
      this.errorShow("Something went wrong! Please try again.", "processPANPostData -> Http request");
    } else {
      this.commonService.postPanDetails(localPostData).subscribe((data: any) => {
        this.loaderService.hideLoader();
        if (data && data?.Status) {

          this.currentStatus = 'successContainer'
          this.showOTPModal1 = false;
          this.getAadharStatus.emit(status)
          // this.showSucessContainer("Success");
        } else {
          this.errorShow(data?.Message, "processPANPostData -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "processPANPostData -> Http request");
      })
    }

  }

  getSkip() {
    this.skipFlag = true;
    this.skippedAdhaar.emit("False")
  }
  skipCancel() {
    this.skipFlag = false;
  }
  yesSkip() {
    this.showOTPModal = false;
    this.skipFlag = false;
    this.skippedAdhaar.emit("False")
    this.loaderService.showLoader()
    this.processSignPostData("0");
  }

  otpController(event, next, prev) {
    // if (index == 6) {
    //   console.log("submit")
    // }
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    }
    else if (next && event.target.value.length > 0) {
      next.setFocus();
    }
    else {
      return 0;
    }
  }


  gotoBack() {

  }
  dismiss(e) {

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
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // console.log("imageData", imageData)
      // imageData is either a base64 encoded string or a file URI
      this.currentImg = 'data:image/jpeg;base64,' + imageData;
      this.cd.detectChanges();
      let realData = this.currentImg.split(",")[1];
      let image = this.b64toBlob(realData, 'image/jpeg');
      if (this.currentNativeNetwork) {
        this.AadharImageData(image)
      } else {
        this.ErrorMsg = this.errorList?.networkError
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }

    }, (err) => {
      console.log("err", err)
      // Handle error
    });
  }
  AadharImageData(file) {
    const formData = new FormData();
    formData.append('front_image', file);
    formData.append('back_image', file);

    this.loaderService.showLoader();
    this.commonService.getAadharOcr(formData).subscribe((data) => {
      if (data) {
        this.loaderService.hideLoader();
        // console.log(data);
        var out = data.msg.doc_id.replace(/\s/g, "");
        this.AadharNo = parseInt(out)
        if (this.AadharNo) {
          this.showMobileOTP()
        }
      }
    }, (error: any) => {

      this.ErrorMsg = "fail1 from getSelfieUpload"
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    })
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
  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      this.currentImg = this.filePath
      if (this.currentImg) {
        this.AadharImageData(e.target.files[0])
      }
    }
    reader.readAsDataURL(file)
  }


}
