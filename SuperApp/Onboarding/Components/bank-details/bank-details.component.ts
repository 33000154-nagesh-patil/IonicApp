import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { CommonService } from 'index';
import { NetworkService } from 'index';
import { LoaderService } from 'index';
import { CommonFunctionService } from 'index'
import { ChequeOcrResponse, panDetails } from 'index';
import { AllConfigDataService } from 'index';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';

@Component({
  selector: 'lib-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.scss'],
})
export class BankDetailsComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() name: any;
  @Input() currentModuleType: any;
  @Input() bankDetails: any;
  @Input() loginCustomerGuId: any;
  @Input() userPanNumber: any;
  @Output() getBankStatus = new EventEmitter();
  showRequiredError: any = false;
  showPatternError: any = false;
  currentType: any = false;
  currentInputBank: any;
  currentInputEncoded: any;
  panName: any;
  currentImg: any;
  bankType: any = '0';
  showRequiredErrorBranch: any = false;
  showPatternErrorBranch: any = false;
  currentInputBranch: any;
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  loggedInModal: boolean = false
  ErrorMsg: any;
  filePath: any;
  searchData: any = false;
  custRegIF = /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/;
  showFirstStep: any = true;
  isValidAccount: boolean = false;
  // bankData: { Status: number; msg: { PanNumber: any; source_id: number; Name: any; LastUpdate: any; NameOnTheCard: any; STATUS: any; StatusDescription: any; Gender: any; State: any; Mobile: any; tsTransId: any; secretToken: any; captchaCode: any; "Bank Account Number": string; "IFSC Code": string; "Account Holder Name": string; "Bank Name": string; "Bank Branch - Address": { Branch: string; Address: string; City: string; State: string; District: string; Contact: string; }; name: any; age: any; dob: any; doc_id: any; doi: any; father_name: any; is_scanned: any; minor: any; scan_type: any; street_address: any; pincode: any; verificationResponse: any; }; ErrorCode: number; MessageType: string; tsTransId: any; Message: string; };
  bankData;
  // bankData: { Status: number; msg: { PanNumber: any; source_id: number; Name: any; LastUpdate: any; NameOnTheCard: any; STATUS: any; StatusDescription: any; Gender: any; State: any; Mobile: any; tsTransId: any; secretToken: any; captchaCode: any; "BankAccountNumber": string; "IFSCCode": string; "AccountHolderName": string; "BankName": string; "BankBranchAddress": { Branch: string; Address: string; City: string; State: string; District: string; Contact: string; }; name: any; age: any; dob: any; doc_id: any; doi: any; father_name: any; is_scanned: any; minor: any; scan_type: any; street_address: any; pincode: any; verificationResponse: any; }; ErrorCode: number; MessageType: string; tsTransId: any; Message: string; };
  showThirdStep: boolean;
  showSecondStep: boolean;
  appName: any;
  apiCatalog: any
  appEnviron: any;
  breadCrumb: string;
  holderName: any;
  accNo: any;
  BankAddress: any;
  BranchAddress: any;
  breadCrumbPartner: string;
  //////////////////////

  //////////////////////
  constructor(
    private http: HttpClient, private camera: Camera, private modalCtrl: ModalController, private allConfigDataService: AllConfigDataService,
    private actionSheetController: ActionSheetController, private commonService: CommonService, private networkService: NetworkService, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, private cd: ChangeDetectorRef,
    private onboardingService:OnboardingService,
    private router: Router,
  ) {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Onboarding/OnboardingSteps/BankAccount';
    this.breadCrumbPartner = 'Onboarding/OnboardingSteps/PartnerBankAccount';

  }

  ngOnInit() {
    // this.DGbankPartnerRegistration();

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
  }
  successModalClose() {
    this.loggedInModal = false
  }

  imagePreview(e) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      this.currentImg = this.filePath
      if (this.currentImg) {
        this.ChequeData(e.target.files[0])
      }
    }
    reader.readAsDataURL(file)
  }

  dismiss() {
    // let investData = {
    //   'currentAmount':this.currentAmount,
    //   'currentData':this.currentData,
    //   'currentType':this.currentTypeSIP
    // }
    this.modalCtrl.dismiss();
  }
  deleteImg() {
    this.currentImg = ''
    this.cd.detectChanges();
  }
  onKeyBank(e) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
    }
    this.showRequiredError = false;
    this.showPatternError = false;
    this.currentInputBank = e.target.value;
    this.currentInputEncoded = e.target.value;
  }
  onKeyBranch(e) {
    this.showRequiredErrorBranch = false;
    this.showPatternErrorBranch = false;
    this.currentInputBranch = (e.target.value).toUpperCase();
  }
  changeInputType() {
    this.isValidAccount = this.validateAccount();
    if (this.isValidAccount)
      this.currentType = !this.currentType;

    if (this.currentInputBank) {
      if (this.currentType) {
        this.currentInputEncoded = this.currentInputBank.replace(/.(?=.{4})/g, 'x');

      } else {
        this.currentInputEncoded = this.currentInputBank
      }
    }
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
      // console.log("imageData", imageData)
      // imageData is either a base64 encoded string or a file URI
      this.currentImg = 'data:image/jpeg;base64,' + imageData;
      this.cd.detectChanges();
      let realData = this.currentImg.split(",")[1];
      let cheque = this.b64toBlob(realData, 'image/jpeg');

      if (this.currentNativeNetwork) {
        this.ChequeData(cheque)
      } else {
        this.ErrorMsg = this.errorList?.networkError
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }

      this.cd.detectChanges();
    }, (err) => {
      console.log("err", err)
      // Handle error
    });
  }

  onVerifyBank() {
    let postBankData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.bankDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId,
      "ifsc": this.bankData?.msg['IFSCCode'],
      "BankName": this.bankData?.msg['BankName'],
      "Branch": this.bankData?.msg['BankBranchAddress']?.Branch,
      "Address": this.bankData?.msg['BankBranchAddress']?.Address,
      "City": this.bankData?.msg['BankBranchAddress']?.City,
      "State": this.bankData?.msg['BankBranchAddress']?.State,
      "AccountNumber": this.bankData?.msg['BankAccountNumber']
    }
    if (this.isCordovaStatus) {
      this.nativeNetworkPostBankData(postBankData);
    } else {
      this.windowNetworkPostBankData(postBankData);
    }
  }

  nativeNetworkPostBankData(obj) {
    if (this.currentNativeNetwork) {
      this.processBankPostData(obj);
      // this.dummyPanPOST() //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }
  windowNetworkPostBankData(obj) {
    if (this.currentWindowNetwork) {
      this.processBankPostData(obj)
      // this.dummyPanPOST() //by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }
  processBankPostData(obj) {
    this.loaderService.showLoader();
    this.commonService.postPanDetails(obj)
      .subscribe((data: panDetails) => {
        this.loaderService.hideLoader();
        if (data && data?.Status) {
          this.showThirdStep = true;
          this.showSecondStep = false;
          setInterval(() => {
            this.getBankStatus.emit('bank')
          }, 2000)

        } else {
          this.errorShow(data?.Message, "processBankVerifyPostData -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "processBankVerifyPostData -> Http request");
      })
  }
  onSubmitBank() {
    // this.DGbankPartnerRegistration()
    this.showRequiredError = false;
    this.showPatternError = false;
    this.showRequiredErrorBranch = false;
    this.showPatternErrorBranch = false;
    if ((!this.currentImg && !this.currentInputBank) || !this.currentInputBranch) {
      if (!this.currentInputBank) {
        this.showRequiredError = true;
      }
      if (!this.currentInputBranch) {
        this.showRequiredErrorBranch = true;
      }
    } else {
      this.processData();
    }
  }

  processData() {
    this.isValidAccount = this.validateAccount();
    if (this.isValidAccount && !!this.currentInputBranch && !this.custRegIF.test(this.currentInputBranch)) {
      this.showPatternErrorBranch = true;
    }
    else {
      this.showPatternErrorBranch = false;
      this.checkNetworkConnectionBank();
    }
  }

  validateAccount() {
    let custRegAccount = /^\d{9,18}$/;
    if (!this.currentInputBank && !custRegAccount.test(this.currentInputBank)) {
      this.showPatternError = true;
      return false;

    }
    else {
      this.showPatternError = false;
      return true;
    }

  }
  checkNetworkConnectionBank() {
    if (this.currentInputBank != "" && this.currentInputBranch != "") {
      let localObj = {
        "TokenId": localStorage.getItem('id_token'),
        "DocNumber": this.currentInputBank,
        "Ifsc": this.currentInputBranch
      }
      if (this.isCordovaStatus) {
        this.nativeNetworkBank(localObj);
      } else {
        this.windowNetworkBank(localObj);
      }
    } else {

      this.ErrorMsg = this.errorList.somethingWentWrong
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }

  }
  nativeNetworkBank(localObj) {
    if (this.currentNativeNetwork) {
      this.processToNextStep(localObj);
      // this.dummyStep(); //bypass

    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }
  windowNetworkBank(localObj) {
    if (this.currentWindowNetwork) {

      this.processToNextStep(localObj);
      // this.searchData = true;
      // this.bankData = {
      //   "Status": 1,
      //   "msg": {
      //     "PanNumber": null,
      //     "source_id": 0,
      //     "Name": null,
      //     "LastUpdate": null,
      //     "NameOnTheCard": null,
      //     "STATUS": null,
      //     "StatusDescription": null,
      //     "Gender": null,
      //     "State": null,
      //     "Mobile": null,
      //     "tsTransId": null,
      //     "secretToken": null,
      //     "captchaCode": null,
      //     "BankAccountNumber": "161810100233845",
      //     "IFSCCode": "UBIN0816183",
      //     "AccountHolderName": "UMESH BALAJI CHOUDEK",
      //     "BankName": "UNION BANK OF INDIA",
      //     "BankBranchAddress": {
      //       "Branch": "BHIWANDI",
      //       "Address": "LAXMI VISHNU COMPLEXCOLLAGE ROAD DHAMANKAR NAKA",
      //       "City": "THANE",
      //       "State": "MAHARASHTRA",
      //       "District": "BHIWANDI",
      //       "Contact": "2522222620"
      //     },
      //     "name": null,
      //     "age": null,
      //     "dob": null,
      //     "doc_id": null,
      //     "doi": null,
      //     "father_name": null,
      //     "is_scanned": null,
      //     "minor": null,
      //     "scan_type": null,
      //     "street_address": null,
      //     "pincode": null,
      //     "verificationResponse": null
      //   },
      //   "ErrorCode": 0,
      //   "MessageType": "I",
      //   "tsTransId": null,
      //   "Message": "Success"
      // }
      // this.showSecondStep = true;
      // this.showFirstStep = false;
      // this.dummyStep();
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }
  dummyStep() {
    this.showFirstStep = false;

    setInterval(() => {
      this.getBankStatus.emit('bank')
    }, 2000)
  }
  processToNextStep(obj) {
    this.loaderService.showLoader();
    // this.commonService.getBankDetails(obj)
    let Url
    if(localStorage.getItem("userType") =="Partner"){
      Url=this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.BankAccountValidation
    }
    else if(localStorage.getItem("userType") =="Customer"){
      Url=this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.BankAccountValidation
    }

    this.http.post(Url, obj)
      .subscribe((data: any) => {
        this.loaderService.hideLoader();
        if(data.Status){
          this.bankData = data
          this.holderName = data.msg.AccountHolderName;
          this.accNo = data.msg.BankAccountNumber;
          this.BankAddress = data.msg.BankBranchAddress.Address;
          this.BranchAddress = data.msg.BankBranchAddress.Branch
        }

        if (true) {
          let closureDetailObj = {
            "Name": "Jayesh Mishra",
            "CustGuId": this.loginCustomerGuId
          }
          // this.getPanNameMatch(closureDetailObj, data);
          // console.log(result.msg);
          this.commonService.userBankData.next(this.bankData);
          this.router.navigate(['/Onboarding/DisplayBankDetails']);
        }
        // else {
        //   this.errorShow(data?.Message, 'processToNextStep -> status');
        // }
      }, (error: any) => {
        this.loaderService.hideLoader();
        this.errorShow(error?.Message, 'processToNextStep -> Http request');
      })
  }

  // getPanNameMatch(obj, bankData): any {
  //   // this.commonService.getPanNameMatch(obj)
  //   this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb2+this.apiCatalog.panNameMatch, obj)
  //   // this.http.get('assets/data/getNextSteps.json')
  //   .subscribe((data: any) => {

  //     if (true) {
  //       // debugger

  //         // let editedText = data.msg.name_match_score.score.slice(0, -1)
  //         // if (parseFloat(editedText) > 75) {
  //         // console.log("null match");
  //         // this.bankData = bankData;
  //         this.bankData = {
  //           msg: {
  //             BankName: 'Kotak Mahindra Bank',
  //             BankAccountNumber: this.currentInputBank,
  //             IFSCCode: this.currentInputBranch,
  //             AccountHolderName: 'Jayesh Mishra',
  //             BankBranchAddress: {
  //               Branch: 'Mumbai',
  //               Address: 'Gaodevi Grant Road East',
  //               City: 'Mumbai',
  //               State: 'Maharashtra',
  //               District: 'Mumbai',
  //               Contact: '9960440708'
  //             }
  //           }
  //         }
  //         this.commonService.userBankData.next(this.bankData);
  //         // this.showSecondStep = true;
  //         // console.log(JSON.stringify(data));
  //         // this.showFirstStep = false;

  //         // this.router.navigate(['/Onboarding/DisplayBankDetails']);
  //         console.log(data, 'data');

  //       this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);

  //       // } else {
  //       //   this.errorShow("Your bank account in the name of " + data.msg.name_match_score.str2 + " is not as per the PAN", 'processToNextStep -> status');
  //       // }

  //       } else {
  //         this.errorShow(data?.Message, 'processToNextStep -> status');
  //       }
  //     }, (error: any) => {
  //       this.errorShow(error?.Message, 'processToNextStep -> Http request');
  //     })
  // }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Bank Detail Component -> ' + functionName, message, this.errorList?.okText)
  }

  searchBranch() {
    this.showRequiredErrorBranch = false;
    this.showPatternErrorBranch = false;
    if (!this.currentInputBranch || (this.currentInputBranch && !this.custRegIF.test(this.currentInputBranch))) {
      if (this.currentInputBranch && !this.custRegIF.test(this.currentInputBranch)) {
        this.showPatternErrorBranch = true;
      } else {
        this.showRequiredErrorBranch = true;
      }
    } else {
      let localObj = {
        "docNumber": this.currentInputBranch
      }
      this.checknetworkBranchSearch(localObj);
    }

  }
  checknetworkBranchSearch(e) {
    if (this.isCordovaStatus) {
      this.nativeNetworkSearchBranch(e);
    } else {
      this.windowNetworkSearchBranch(e);
    }
  }

  nativeNetworkSearchBranch(e) {
    if (this.currentNativeNetwork) {
      this.collectionOfSearchData(e);
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }
  windowNetworkSearchBranch(e) {
    if (this.currentWindowNetwork) {
      this.collectionOfSearchData(e);
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
    }
  }
  collectionOfSearchData(e) {
    this.searchData = '';
    this.commonService.getSearchBranch(e).subscribe((data: any) => {
      this.loaderService.showLoader();
      if (data && data?.status) {
        this.searchData = data;
      } else {
        this.errorShow(data?.Message, 'collectionOfSearchData -> status');
      }
    }, (error: any) => {
      this.errorShow(error?.Message, 'collectionOfSearchData -> Http request');
    }
    )
  }
  ChequeData(file) {
    const formData = new FormData();
    formData.append('front_image', file);
    formData.append('back_image', file);

    this.loaderService.showLoader();
    this.commonService.getChequeOcr(formData).subscribe((data: ChequeOcrResponse) => {
      if (data) {
        this.loaderService.hideLoader();
        // console.log(data);

        this.currentInputBank = data.msg.Cheque.acc_num.Value;
        this.currentInputBranch = data.msg.Cheque.ifsc.Value

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



  skip(val){
    // if(localStorage.getItem("userType") == "Partner"){
    //   this.onboardingService.skip(val);
    // }
    // if(localStorage.getItem("userType") == "Customer"){
    //   this.onboardingService.skip(val);
    // }
    this.onboardingService.skip(val);

  }

}
