import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { stepperData } from 'projects/core/src/lib/interfaces/common.interface';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
@Component({
  selector: 'app-kyc-steps-mf',
  templateUrl: './kyc-steps-mf.component.html',
  styleUrls: ['./kyc-steps-mf.component.scss'],
})
export class KycStepsMFComponent implements OnInit {  
  @Input() imageList: any
  @Input() errorList: any;
  @Input() name: any;
  @Input() loginCustomerGuId: any;
  @Input() customerPanName: any;
  @Input() isKra: any; //0 means non kra  1 means
  // @Input() isKra: any = 0; //0 means non kra  1 means

  // isKra : any = localStorage.getItem('isKra');

  showSuccessMessage: any = false;
  userPanNumber: any;
  listOfKYC: any;

  _panCardKYCData: any;
  panCardKYCFlag: any;
  _bankKYCData: any;
  bankKYCFlag: any;
  _aadharKYCData: any;
  aadharKYCFlag: any;
  _selfieKYCData: any;
  selfieKYCFlag: any;
  _signatureKYCData: any;
  signatureKYCFlag: any;
  _currentModuleType: any;


  exchangeKYCFlag: any;
  _exchangeKYCData: any;

  _incomeProofKYCData: any;
  incomeProofKYCFlag: any;

  personalDetailsKYCFlag: any;
  _personalDetailsKYCData: any;

  nomineeKYCFlag: any;
  _nomineeKYCData: any;
  esignKYCFlag: any;
  _esignKYCData: any;


  uploadPanAadharFlag: any;
  _uploadPanAadharData: any;

  civilKraIpvFlag: any;
  appName: any;

  _nameAddressKYCData: any;
  nameAddressKYCFlag: any;

  get panCardKYC(): any {
    return this._panCardKYCData;
  }
  @Input() set panCardKYC(value: any) {
    if (value && value.length > 0) {
      this._panCardKYCData = value[0];
      this.panCardKYCFlag = value[0].IsCompleted
    } else {
      this._panCardKYCData = "";
      this.panCardKYCFlag = value;
    }
  }
  get bankKYC(): any {
    return this._bankKYCData;
  }
  @Input() set bankKYC(value: any) {
    if (value && value.length > 0) {
      this._bankKYCData = value[0];
      this.bankKYCFlag = value[0].IsCompleted
    } else {
      this._bankKYCData = "";
      this.bankKYCFlag = value;
    }
  }
  get aadharKYC(): any {
    return this._aadharKYCData;
  }
  @Input() set aadharKYC(value: any) {
    // console.log("civilKRA Flag "+this.civilKraIpvFlag)

    if (value && value.length > 0) {
      if (value[0].IsCompleted === "True") {
        this._aadharKYCData = value[0];
        this.aadharKYCFlag = value[0].IsCompleted
      } else {
        // if (this.civilKraIpvFlag === "005") { //005 means non kra   
        //   this._aadharKYCData = value[0];
        //   this.aadharKYCFlag = "False"
        // } else {
        //   this._aadharKYCData = value[0];
        //   this.aadharKYCFlag = value[0].IsCompleted
        // }
        if (this.isKra == 0) {
          this._aadharKYCData = value[0];
          this.aadharKYCFlag = "False"
        } else {
          this._aadharKYCData = value[0];
          this.aadharKYCFlag = "True"
        }
      }

    } else {
      this._aadharKYCData = "";
      this.aadharKYCFlag = value;
    }
  }
  get selfieKYC(): any {
    return this._selfieKYCData;
  }
  @Input() set selfieKYC(value: any) {
    if (value && value.length > 0) {
      this._selfieKYCData = value[0];
      this.selfieKYCFlag = value[0].IsCompleted
    } else {
      this._selfieKYCData = "";
      this.selfieKYCFlag = value;
    }
  }
  get nameAddressKYC(): any {
    return this._nameAddressKYCData;
  }
  @Input() set nameAddressKYC(value: any) {

    if (value && value.length > 0) {
      if (this.isKra == 0) {
        this._nameAddressKYCData = value[0];
        this.nameAddressKYCFlag = value[0].IsCompleted
      } else {
        this._nameAddressKYCData = value[0];
        this.nameAddressKYCFlag = "True"
      }
      // this._nameAddressKYCData = value[0];
      // this.nameAddressKYCFlag = value[0].IsCompleted
    } else {
      this._nameAddressKYCData = "";
      this.nameAddressKYCFlag = value;
    }
  }
  get signatureKYC(): any {
    return this._signatureKYCData;
  }
  @Input() set signatureKYC(value: any) {
    if (value && value.length > 0) {
      this._signatureKYCData = value[0];
      this.signatureKYCFlag = value[0].IsCompleted
    } else {
      this._signatureKYCData = "";
      this.signatureKYCFlag = value;
    }
  }
  get exchangeKYC(): any {
    return this._exchangeKYCData;
  }
  @Input() set exchangeKYC(value: any) {
    if (value && value.length > 0) {
      this._exchangeKYCData = value[0];
      this.exchangeKYCFlag = value[0].IsCompleted
    } else {
      this._exchangeKYCData = "";
      this.exchangeKYCFlag = value;
    }
  }
  get incomeProofData(): any {
    return this._incomeProofKYCData;
  }
  @Input() set incomeProofData(value: any) {
    if (value && value.length > 0) {
      if (value[0].IsDerivative === "True") {
        this._incomeProofKYCData = value[0];
        this.incomeProofKYCFlag = value[0].IsCompleted
      } else {
        this._incomeProofKYCData = value[0];
        this.incomeProofKYCFlag = "True"
      }
    } else {
      this._incomeProofKYCData = "";
      this.incomeProofKYCFlag = value;
    }
  }
  get personalDetailsKYC(): any {
    return this._personalDetailsKYCData;
  }
  @Input() set personalDetailsKYC(value: any) {
    if (value && value.length > 0) {
      this._personalDetailsKYCData = value[0];
      this.personalDetailsKYCFlag = value[0].IsCompleted
    } else {
      this._personalDetailsKYCData = "";
      this.personalDetailsKYCFlag = value;
    }
  }
  get nomineeKYC(): any {
    return this._nomineeKYCData;
  }
  @Input() set nomineeKYC(value: any) {
    if (value && value.length > 0) {
      this._nomineeKYCData = value[0];
      this.nomineeKYCFlag = value[0].IsCompleted
    } else {
      this._nomineeKYCData = "";
      this.nomineeKYCFlag = value;
    }
  }
  get esignKYC(): any {
    return this._esignKYCData;
  }
  @Input() set esignKYC(value: any) {
    if (value && value.length > 0) {
      this._esignKYCData = value[0];
      this.esignKYCFlag = value[0].IsCompleted
    } else {
      this._esignKYCData = "";
      this.esignKYCFlag = value;
    }
  }

  get uploadPanAadharKYC(): any {
    return this._uploadPanAadharData;
  }
  @Input() set uploadPanAadharKYC(value: any) {
    // debugger;
    // console.log("-----value-----",value);
    // console.log("isKra-----",this.isKra);
    if (value && value.length > 0) {
      // if (this.isKra == 0 && value[0].AadharStatus === "False") {
        if (this.isKra == 0) {
        this._uploadPanAadharData = value[0];
        // this.uploadPanAadharFlag = this.isKra
        // this.uploadPanAadharFlag = value[0].IsCompleted
      } else {
        this._uploadPanAadharData = value[0];
        this.uploadPanAadharFlag = "True"
        // this.uploadPanAadharFlag = value[0].AadharStatus
      }
      // this._uploadPanAadharData = value[0];
      // this.uploadPanAadharFlag = value[0].AadharStatus
    } else {
      this._uploadPanAadharData = "";
      this.uploadPanAadharFlag = value;
    }
    
    // console.log("uploadPanAadharFlag",this.uploadPanAadharFlag);
  }

  get currentModuleType(): any {
    return this._currentModuleType;
  }
  @Input() set currentModuleType(value: any) {
    if (value) {
      this._currentModuleType = value;
    }
    // console.log("_currentModuleType ", value);
  }
  constructor(private loaderService: LoaderService, private loadingController: LoadingController, private commonService: CommonService, private commonFunctionService: CommonFunctionService, private allConfigDataService: AllConfigDataService, public toastService: ToastService, private modalController: ModalController, private cdn: ChangeDetectorRef) { }

  async skipAdhaarUpload(val){
    this.uploadPanAadharFlag = await val;
  }




  ngOnInit() {
    if (!this.loginCustomerGuId) {
      this.loginCustomerGuId = localStorage.getItem('CustGuId');
    }

    this.appName = this.allConfigDataService.getConfig('appName');

    // console.log("isKra",this.isKra, this.uploadPanAadharFlag);
  }
  currentPANStatus(e) {
    if (e) {
      this.panCardKYCFlag = true;
    }
    this.getDocumentList("esign");
  }
  async currentBankStatus(e) {
    if (e) {
      this.bankKYCFlag = true
      this.showSuccessMessage = true;
    }
    // await this.getDocumentList("esign");
  }
  currentAadharStatus(e) {
    // if (e) {
    //   this.aadharKYCFlag = true
    //   this.showSuccessMessage = true;
    // }
    // this.loaderService.showLoader();
    this.getDocumentList("uploadPanAadharFlag");
    if (e == "Success") {
      // this.uploadPanAadharFlag = "True"
      this.aadharKYCFlag = true
      this.showSuccessMessage = true;
      this.uploadPanAadharFlag = 'True';
    } else {
      // this.uploadPanAadharFlag = "False"
      this.aadharKYCFlag = true
      this.showSuccessMessage = true;
      this.uploadPanAadharFlag = 'False';

    }
  }
  currentExchangeStatus(e) {
    if (e == "Selected") {
      // this.uploadPanAadharFlag = "False"
      this.exchangeKYCFlag = true
      this.showSuccessMessage = true;
    } else {
      // this.uploadPanAadharFlag = "True"
      this.exchangeKYCFlag = true
      this.showSuccessMessage = true;
    }
    // this.loaderService.showLoader();
    this.getDocumentList("IncomeProof");
  }
  currentIncomeProofStatus(e) {
    if (e) {
      this.incomeProofKYCFlag = true;
      this.showSuccessMessage = true;
    }

    // await this.getDocumentList("esign");
  }
  currentPersonalStatus(e) {
    if (e) {
      this.personalDetailsKYCFlag = true
      this.showSuccessMessage = true;
    }
    // await this.getDocumentList("esign");
  }
  currentNomineeStatus(e) {
    if (e) {
      this.nomineeKYCFlag = true
      this.showSuccessMessage = true;
    }
    // await this.getDocumentList("esign");
  }
  currentSelfieStatus(e) {
    if (e) {
      this.selfieKYCFlag = true
      this.showSuccessMessage = true;
      this.cdn.detectChanges();
    }
    // await this.getDocumentList("esign");
  }
  currentSignatureStatus(e) {
    if (e) {
      this.signatureKYCFlag = true
      this.showSuccessMessage = true;
      this.cdn.detectChanges();
    }
    // this.getDocumentList("esign");
  }
  currentESignStatus(e) {
    if (e) {
      this.esignKYCFlag = true
      this.showSuccessMessage = true;
      this.cdn.detectChanges();
    }
    // await this.getDocumentList("esign");
  }
  currentUploadPanAadharStatus(e) {
    if (e) {
      this.uploadPanAadharFlag = true
      this.showSuccessMessage = true;
      this.cdn.detectChanges();
    }
    // this.getDocumentList("esign");
  }
  currentNameAddressStatus(e) {
    if (e) {
      this.nameAddressKYCFlag = true
      this.showSuccessMessage = true;
      this.cdn.detectChanges();
    }
    // await this.getDocumentList("esign");
  }

  sendToMF() {
    if (this.appName === "Aqube") {
      this.modalController.dismiss({ data: 'done' })
      // window.open("https://reportscug.reliancesmartmoney.com/aqubeonboarding/exploreApp/exploreApp.html")
    } else {
      this.modalController.dismiss({ data: 'done' })
      
    }
  }

  panName(e) {
    this.name = e;
  }
  panNumber(e) {
    this.userPanNumber = e;
    // console.log(this.userPanNumber);
  }
  getCivilKraStatus(e) {
    this.civilKraIpvFlag = e;

    // console.log("civilKRA Flag " + this.civilKraIpvFlag)
    if (this.civilKraIpvFlag === "005") { //005 means non kra
      this._aadharKYCData = this._aadharKYCData
      this.aadharKYCFlag = "False";
      // console.log("civilKRA Flag Non " + this.civilKraIpvFlag)
      
      this.isKra = 0;

    } else {
      this._aadharKYCData = "";
      this.aadharKYCFlag = "True"
      // console.log("civilKRA Flag Yes " + this.civilKraIpvFlag)
      this.isKra = 1;
    }
  }

 async getDocumentList(type) {
    // this.loaderService.showLoader();

    // await this.loadingController.create({
    //   // duration: 5000,
    //   message: 'Please wait...'
    // }).then(a => {
    //   a.present().then(() => {
    //     console.log('KYCSteps presented');
    //   });
    // });
    
    let reqParams = {
      "CustGuId": this.loginCustomerGuId,
      "OfferingGuId": this.currentModuleType.OfferingGuId
    }
    this.commonService.getDocumentList(reqParams).subscribe(async (data: stepperData) => {
      if (data && data?.Status) {
        // console.log("kycDocData", data)


        // this.commonService.setKraStatus(data.IsKra);

       // setTimeout(async () => {
          // localStorage.setItem('isKra', data.IsKra);
          this.isKra = data.IsKra;
          // isKra = localStorage.getItem('isKra');
          
        

          this.customerPanName = data.CustomerPanName;
          this.listOfKYC = data.DocumentList;
          this.loaderService.hideLoader();
          if (type === "IncomeProof") {
            this.incomeProofData = this.getCurrentKYCData("IncomeProof")
          }
  
          if (type === "uploadPanAadharFlag") {
            this.uploadPanAadharKYC = this.getCurrentKYCData("Aadhar")
          }
  
          this.nameAddressKYC = this.getCurrentKYCData("NameAddressDetail")
         
  
        //   this.loaderService.hideLoader();
          // await this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw dismissed'));
        // }, 1000);
        
      } 
      else {
        // await this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw dismissed'));
        this.errorShow(data?.Message, "GetOfferingDocList -> status");
      }
    }, async (error: any) => {
      // await this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw dismissed'));
      this.errorShow(error?.Message, "GetOfferingDocList -> Http request");
    })
  }

  getCurrentKYCData(type) {
    return this.listOfKYC ? this.listOfKYC.filter(x => x?.Document == type) : []
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'container-view page -> ' + functionName, message, this.errorList?.okText);
  }

  
}
