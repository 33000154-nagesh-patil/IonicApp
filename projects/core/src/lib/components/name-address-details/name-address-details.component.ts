import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { master } from '../../interfaces/common.interface';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { CommonFunctionService } from '../../services/common-function.service';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-name-address-details',
  templateUrl: './name-address-details.component.html',
  styleUrls: ['./name-address-details.component.scss'],
})
export class NameAddressDetailsComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() name: any;
  @Input() currentModuleType: any;
  @Input() nameAddressKYCData: any;
  @Input() loginCustomerGuId: any;
  @Output() getNameAddress = new EventEmitter();
  appName: any;
  languages: any;
  currentLanguage: any;
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;

  state: master[];
  city: master[];
  country: master[];
  occupation: master[]
  correspondaceAddress: boolean = false;
  ffName: boolean = true;
  sfName: boolean = false;
  mfName: boolean = false;
  salutationList: any;
  occupationList: any;
  formData: any;
  selectedRelation: string = "Father";
  loggedInModal: boolean = false;
  ErrorMsg: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;

  constructor(private router:Router,private allConfigDataService: AllConfigDataService, private networkService: NetworkService, 
    private commonService: CommonService, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, 
    private cd: ChangeDetectorRef, private modalCtrl: ModalController, private fb: FormBuilder, private http:HttpClient
    ) { 
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Onboarding/OnboardingSteps/CustomerRegistration';
    }

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

    this.getCountryMasterDetails('Country', null);
    this.getStateMasterDetails('State', null);
    this.getSalutationMasterDetails('Salutation');
    this.getOccupationMasterDetails('Occupation');

    this.formData = {
      occupation: "",
      addressType: "",
      addressLine1: "",
      addressLine2: "",
      prefix: "",
      firstName: "",
      middleName: "",
      lastName: "",
      motherFirstName: "",
      motherMiddleName: "",
      motherLastName: "",
      correspondancePinCode: "",
      correspondanceState: "",
      correspondanceCity: "",
      correspondanceCountry: "",
      district: "",
    }
  }

  gotoBack() { }
  dismiss(e) { }

  public checkError = (controlName: string, errorName: string) => {
    return this.addressForm.controls[controlName].hasError(errorName) && (this.addressForm.controls[controlName].dirty || this.addressForm.controls[controlName].touched) ? this.addressForm.controls[controlName].hasError(errorName) : ''
  }

  addressForm = this.fb.group({
    occupation: ['', Validators.required],
    addressLine1: ['', Validators.required],
    addressLine2: [''],
    prefix: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: [''],
    lastName: ['', Validators.required],
    motherFirstName: [''],
    motherMiddleName: [''],
    motherLastName: [''],
    correspondancePinCode: ['', Validators.required],
    correspondanceState: ['', Validators.required],
    correspondanceCity: ['', Validators.required],
    correspondanceCountry: ['', Validators.required],
    district: ['', Validators.required],
  })

  get details() {
    return this.addressForm.controls
  }

  spouseChange() {
    this.sfName = true;
    this.ffName = false;
    this.mfName = false;
    this.selectedRelation = "Spouse"
  }


  fatherChange() {
    this.sfName = false;
    this.ffName = true;
    this.mfName = false;

    this.selectedRelation = "Father"
  }

  // motherChange() {
  //   this.sfName = false;
  //   this.ffName = false;
  //   this.mfName = true;

  //   this.selectedRelation = "Mother"
  // }

  getAddress() {
    return this.addressForm.controls
  }

  getAddressDetails() {
    // console.log(this.addressForm.value);
    this.modalCtrl.dismiss(this.addressForm);

  }

  closeAddPage() {
    this.modalCtrl.dismiss()
  }


  getSalutationMasterDetails(type) {
    let params = {
      "Type": type
    }
    this.commonService.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.salutationList = data.Data;
        // console.log(this.salutationList);
      }
    })
  }

  getCountryMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.commonService.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.country = data.Data;
      }
      // console.log("countryList", this.country)

    })
  }

  getOccupationMasterDetails(type) {
    let params = {
      "Type": type
    }
    this.commonService.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.occupationList = data.Data;
        // console.log(this.occupationList);
      }
    })
  }

  getStateMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.commonService.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.state = data.Data;
      }
    })
    // console.log(this.state);
  }

  getCityMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.commonService.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.city = data.Data;
      }

    })
  }

  getOccupationDetails() {
    let params = {
      "Type": "Occupation"
    }
    this.commonService.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.occupation = data.Data;
      }

    })
  }

  onContinue() {
    // console.log(this.selectedRelation)
    // console.log(this.addressForm.value)


      let params = {
        "CustGuId": this.loginCustomerGuId,
        "flag": "UpdatePersonalDetail",
        "AddressLine1": this.addressForm.value.addressLine1,
        "AddressLine2": this.addressForm.value.addressLine2,
        "Pincode": this.addressForm.value.correspondancePinCode,
        "CountryGuId": this.addressForm.value.correspondanceCountry,
        "StateGuId": this.addressForm.value.correspondanceState,
        "CityGuId": this.addressForm.value.correspondanceCity,
        "District": this.addressForm.value.district,
        "occupation": this.addressForm.value.occupation,
        "salutationGuId": this.addressForm.value.prefix,
        "motherFirstName" : this.addressForm.value.motherFirstName,
        "motherMiddleName" : this.addressForm.value.motherMiddleName,
        "motherLastName" : this.addressForm.value.motherLastName,
      }
  
  
      if(this.selectedRelation === "Father"){
       params["fatherFirstName"] = this.addressForm.value.firstName;
       params["fatherMiddleName"] = this.addressForm.value.middleName;
       params["fatherLastName"] = this.addressForm.value.lastName;
      } else if (this.selectedRelation === "Spouse"){
        params["spouseFirstName"] = this.addressForm.value.firstName;
        params["spouseMiddleName"] = this.addressForm.value.middleName;
        params["spouseLastName"] = this.addressForm.value.lastName;
      }
  
  
      // console.log(params);
  
      // this.commonService.setProfileDetails(params)
      this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.updateCustomerDetail, params)
      .subscribe((data: any) => {
        // this.loaderService.hideLoader();
        // console.log("update", data)
        if (data && data?.Status) {
          this.router.navigate(['/Onboarding/Bank']);
          if(data.URLtoRedirect === "/Bank"){
            this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
          }
          // this.processInsertDocVerify();
          // this.getPersonalStatus.emit('personal')
        } else {
          this.errorShow(data?.Message, "getProfileDetails -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "getProfileDetails -> Http request");
      })
   
      // this.loggedInModal = true
      // this.ErrorMsg = "All fields are mandatory"
      // this.loggedInModal = true
      // setTimeout(() => {
      //   this.loggedInModal = false;
      // }, 3000);
      // return false;
  }

  inputValidator(event: any) {
    const pattern = /^[0-9]*$/;  
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
  }

  processInsertDocVerify(){
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.nameAddressKYCData?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId
    }

    this.http.get('assets/data/getNextSteps.json')
    // this.commonService.postPanDetails(localPostData)
    .subscribe((data: any) => {
      this.loaderService.hideLoader();
      if (data && data?.StatusCode) {
        // this.getNameAddress.emit("getNameAddress");
        this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })
  }

  successModalClose(){}

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, "Nominee Page" + functionName, message, this.errorList?.okText)
  }

}
