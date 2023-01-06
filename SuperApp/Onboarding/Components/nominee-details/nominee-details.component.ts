import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AllConfigDataService } from 'index';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { master, nomineeProfileDetail } from 'index';
import { CommonService } from 'index';
import { CommonFunctionService } from 'index';
import { LoaderService } from 'index';
import { NetworkService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'app-nominee-details',
  templateUrl: './nominee-details.component.html',
  styleUrls: ['./nominee-details.component.scss'],
})
export class NomineeDetailsComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() currentModuleType: any;
  @Input() nomineeDetails: any;
  @Input() loginCustomerGuId: any;
  @Output() getNomineeStatus = new EventEmitter();

  profileData: any;
  public nomineeFormGroup: FormGroup;
  todaysDate: any;
  isShown: boolean = false;
  output: number = 0;
  isMinor: boolean = false;
  number: number = 0;
  checked: boolean = true;
  detailsOfNominee: any = [];
  totalNominee: number = 0;
  nomineeList: boolean;
  localCustGuId: string;
  state: any[];
  city: any[];
  country: any[];
  currentNativeNetwork: any;

  numberOfNominee = [];
  currentLanguage: any;
  appName: any;
  pan1: any;
  pan2: any;

  loggedInModal: boolean = false
  ErrorMsg: any
  isCordovaStatus: any;
  currentWindowNetwork: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;


  @ViewChild('countryDrop') countryDrop;
  @ViewChild('cityDrop') cityDrop;
  @ViewChild('stateDrop') stateDrop;
  breadCrumb2: string;
  params: any;
  routing: any;

  constructor(private allConfigDataService: AllConfigDataService, private loaderService: LoaderService, private commonservice: CommonService, 
    private router: Router, private commonFunctionService: CommonFunctionService, private networkService: NetworkService,
    private http:HttpClient, private onboardingService:OnboardingService,private eduService:eduService
    ) { 
      this.loaderService.hideLoader();
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Onboarding/OnboardingSteps/CustomerRegistration';
      this.breadCrumb2='Onboarding/OnboardingSteps/Nominee';
    }


  ngOnInit() {
    this.loaderService.hideLoader();

    this.imageList = this.allConfigDataService.getConfig('images');
    this.appName = this.allConfigDataService.getConfig('appName');

    this.disableFutureDate();
    this.getCountryMasterDetails('Country', null);
    this.getStateMasterDetails('State', null);
    this.getCityMasterDetails('City',null)



    setInterval(() => {
      (this.detailsOfNominee.length >= 3) ? this.nomineeList = false : this.nomineeList = true
    }, 1)

    this.imageList = this.allConfigDataService.getConfig('images');
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    if (this.currentLanguage) {
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if (allErrorList) {
        this.errorList = allErrorList[this.currentLanguage];
      }
    }
    this.nomineeFormGroup = new FormGroup({
      nomineeFullName: new FormControl(''),
      relationshipNominee: new FormControl(''),
      relationshipNomineeMinor:new FormControl(''),
      nomineeDOB: new FormControl(''),
      percentageAllocation: new FormControl(''),
      nomineePanOrAadharNumber: new FormControl(''),
      guardianPanOrAadharNumber: new FormControl(''),
      gender: new FormControl(''),
      guardianFullName: new FormControl(''),
      guardianAddress: new FormControl(''),
      guardianCity: new FormControl(''),
      guardianState: new FormControl(''),
      guardianCountry: new FormControl(''),
      guardianPincode: new FormControl('')
    });

    this.nomineeFormGroup.controls["nomineeFullName"].setValidators([Validators.required])
    this.nomineeFormGroup.controls["gender"].setValidators([Validators.required])
    this.nomineeFormGroup.controls["relationshipNominee"].setValidators([Validators.required])
    
    this.nomineeFormGroup.controls["nomineeDOB"].setValidators([Validators.required])
    this.nomineeFormGroup.controls["percentageAllocation"].setValidators([Validators.required])
    this.nomineeFormGroup.controls["nomineePanOrAadharNumber"].setValidators([Validators.required, Validators.pattern("([0-9]{12}|[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1})")])


    this.profileData = {
      Status: "",
      ErrorCode: "",
      Message: "",
      MessageType: "",
      IsInterestedInNominee: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      Gender: "",
      RelationWithNominee: "",
      DateOfBirth: "",
      PercentageAllocation: "",
      PanAadharNumber: "",
      IsNomineeMinor: "",
      Address: "",
      EmailId: "",
      MobileNo: "",
      NoOfNominee: "",
      GFullName: "",
      GPanAadharNumber: "",
      GAddress: "",
      GCityGuId: "",
      GStateGuId: "",
      Pincode: "",
      Country: ""
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
  }

  disableFutureDate() {
    var date: any = new Date();
    var maxDate: any = date.getDate();
    var maxMonth: any = date.getMonth() + 1;
    var maxYear: any = date.getFullYear();
    if (maxDate < 10) {
      maxDate = '0' + maxDate
    }
    if (maxMonth < 10) {
      maxMonth = '0' + maxMonth
    }

    this.todaysDate = maxYear + "-" + maxMonth + "-" + maxDate;

  }


  checkForGuardian(value) {
    // let dateArray = value.split("-")
    // let currentDate = new Date();

    // let age = (Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
    //   Date.UTC(dateArray[0], dateArray[1], dateArray[2])) / (1000 * 60 * 60 * 24) + 28)) * 0.00273785;

    let dateArray = value

    let currentDate = new Date();

    let age = (Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
      Date.UTC(dateArray.getFullYear(), dateArray.getMonth(), dateArray.getDate())) / (1000 * 60 * 60 * 24) + 28)) * 0.0027268;

    (age < 18) ? this.isMinor = true : this.isMinor = false;

    if (this.isMinor) {
      this.nomineeFormGroup.get("guardianFullName").setValidators(Validators.required);
      this.nomineeFormGroup.controls["guardianPanOrAadharNumber"].setValidators([Validators.required, Validators.pattern("([0-9]{12}|[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1})")])
      this.nomineeFormGroup.get("guardianAddress").setValidators(Validators.required);
      this.nomineeFormGroup.get("guardianCity").setValidators(Validators.required);
      this.nomineeFormGroup.get("guardianState").setValidators(Validators.required);
      this.nomineeFormGroup.get("guardianCountry").setValidators(Validators.required);
      this.nomineeFormGroup.get("guardianPincode").setValidators([Validators.required, Validators.pattern("[0-9]{6}")]);
      this.nomineeFormGroup.controls["relationshipNomineeMinor"].setValidators([Validators.required])
      this.nomineeFormGroup.updateValueAndValidity();

    } else {

      this.nomineeFormGroup.get('guardianFullName').setValidators(null);
      this.nomineeFormGroup.get('guardianFullName').setErrors(null);

      this.nomineeFormGroup.get('guardianPanOrAadharNumber').setValidators(null);
      this.nomineeFormGroup.get('guardianPanOrAadharNumber').setErrors(null);

      this.nomineeFormGroup.get('guardianAddress').setValidators(null);
      this.nomineeFormGroup.get('guardianAddress').setErrors(null);

      this.nomineeFormGroup.get('guardianCity').setValidators(null);
      this.nomineeFormGroup.get('guardianCity').setErrors(null);

      this.nomineeFormGroup.get('guardianState').setValidators(null);
      this.nomineeFormGroup.get('guardianState').setErrors(null);

      this.nomineeFormGroup.get('guardianCountry').setValidators(null);
      this.nomineeFormGroup.get('guardianCountry').setErrors(null);

      this.nomineeFormGroup.get('guardianPincode').setValidators(null);
      this.nomineeFormGroup.get('guardianPincode').setErrors(null);

      this.nomineeFormGroup.get('relationshipNomineeMinor').setValidators(null);
      this.nomineeFormGroup.get('relationshipNomineeMinor').setErrors(null);

      this.nomineeFormGroup.updateValueAndValidity();

    }
  }
  nullPan(i){
    if(this.detailsOfNominee.indexOf(i)==0)this.pan1=null;
    if(this.detailsOfNominee.indexOf(i)==1)this.pan2=null;
    this.detailsOfNominee.splice(i, 1)
  }

  saveForm() {

    if(this.nomineeFormGroup.value.percentageAllocation == 0){
      this.ErrorMsg = this.errorList?.error + " Percentage allocation should be more than 0"
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }
      else{

        var percentagePortion = 0;

        if (!this.nomineeFormGroup.valid) {
          // this.toastservice.showAutoToast('Invalid Credentials');
          this.ErrorMsg = "Invalid Credentials"
          this.loggedInModal = true
          setTimeout(() => {
            this.loggedInModal = false;
          }, 3000);
          return false;
        } else if ((this.pan1 != null && this.pan1 == this.nomineeFormGroup.value.nomineePanOrAadharNumber) ||
          (this.pan2 != null && this.pan2 == this.nomineeFormGroup.value.nomineePanOrAadharNumber)) {
          // this.toastservice.showAutoToast(this.errorList?.panError);
          this.ErrorMsg = this.errorList?.panError
          this.loggedInModal = true
          setTimeout(() => {
            this.loggedInModal = false;
          }, 3000);
          return false;
        }
        else if (this.nomineeFormGroup.value.percentageAllocation <= 100 && this.currentNativeNetwork) {
          this.params = {
            "CityGuId": "",
            "StateGuId": "",
            "IsInterestedInNominee": !this.isShown,
            "FirstName": this.nomineeFormGroup.value.nomineeFullName,
            "MiddleName": "",
            "LastName": "",
            "Gender": this.nomineeFormGroup.value.gender,
            "RelationWithNominee": this.nomineeFormGroup.value.relationshipNominee,
            "DateOfBirth": this.commonFunctionService.dobFormattedYYYYMMDD(this.nomineeFormGroup.value.nomineeDOB),
            "PercentageAllocation": this.nomineeFormGroup.value.percentageAllocation.toString(),
            "PanAadharNumber": this.nomineeFormGroup.value.nomineePanOrAadharNumber,
            "IsNomineeMinor": this.isMinor,
            "Address": "",
            "EmailId": "",
            "MobileNo": "",
            "NoOfNominee": this.numberOfNominee.length + 1,
            "GFirstName": this.nomineeFormGroup.value.guardianFullName,
            "GMiddleName": "",
            "GLastName": "",
            "GGender": "",
            "GRelationWithNominee": this.nomineeFormGroup.value.relationshipNomineeMinor,
            "GDateOfBirth": "2022-02-24",
            "GPercentageAllocation": "%",
            "GPanAadharNumber": this.nomineeFormGroup.value.guardianPanOrAadharNumber,
            "GAddress": this.nomineeFormGroup.value.guardianAddress,
            "GEmailId": "",
            "GMobileNo": "",
            "GCity": this.nomineeFormGroup.value.guardianCity || null,
            "GState": this.nomineeFormGroup.value.guardianState || null,
            "IsGuardianAddressSameASNominee": true
          }
          if (this.detailsOfNominee.length > 0) {
            percentagePortion = this.nomineeFormGroup.value.percentageAllocation
            for (var i = 0; i < this.detailsOfNominee.length; i++) {
              percentagePortion = this.detailsOfNominee[i].percentageAllocation + percentagePortion;
            }
            if (percentagePortion <= 100) {
              this.pan2 = this.nomineeFormGroup.value.nomineePanOrAadharNumber;
              this.detailsOfNominee.push(this.nomineeFormGroup.value);
              this.numberOfNominee.push(this.params);
              this.nomineeFormGroup.reset();
              if(percentagePortion==100)this.isShown = true;
              // this.toastservice.showAutoToast(this.errorList?.success)
            }
            else {
              // this.toastservice.showAutoToast(this.errorList?.percentageAllocationError)
              this.ErrorMsg = this.errorList?.percentageAllocationError
              this.loggedInModal = true
              setTimeout(() => {
                this.loggedInModal = false;
              }, 3000);
            }
          }
          else {
            percentagePortion = this.nomineeFormGroup.value.percentageAllocation
            if (percentagePortion == 100) {
              this.pan1 = this.nomineeFormGroup.value.nomineePanOrAadharNumber;
              this.detailsOfNominee.push(this.nomineeFormGroup.value);
              this.numberOfNominee.push(this.params);
              this.nomineeFormGroup.reset();
              this.isShown = true;
            }
            if (percentagePortion < 100) {
              this.pan1 = this.nomineeFormGroup.value.nomineePanOrAadharNumber;
              this.detailsOfNominee.push(this.nomineeFormGroup.value);
              this.numberOfNominee.push(this.params);
              this.nomineeFormGroup.reset();
            }
            this.isMinor = false;
          }
    
    
        } else {
          // this.toastservice.showAutoToast(this.errorList?.networkError)
          if(!this.currentNativeNetwork){
            this.ErrorMsg = this.errorList?.networkError
          }
          if(this.nomineeFormGroup.value.percentageAllocation > 100){
            this.ErrorMsg = this.errorList?.percentageAllocationError
          }
          this.loggedInModal = true
          setTimeout(() => {
            this.loggedInModal = false;
          }, 3000);
        }
      }

 
  }

  submitForm() {

// this.router.navigate(['/Onboarding/Selfie']);


    if (this.nomineeFormGroup.valid || this.isShown || !this.nomineeList) {
      this.isMinor = false;
    }
    let percentagePortion = 0;
    for (var i in this.detailsOfNominee) {
      percentagePortion = this.detailsOfNominee[i].percentageAllocation + percentagePortion;

      if (this.numberOfNominee.length > 0 && this.nomineeFormGroup.untouched && percentagePortion == 100) {
        this.nomineeFormGroup.get('nomineeFullName').setValidators(null);
        this.nomineeFormGroup.get('nomineeFullName').setErrors(null);
        this.nomineeFormGroup.get('gender').setValidators(null);
        this.nomineeFormGroup.get('gender').setErrors(null);
        this.nomineeFormGroup.get('relationshipNominee').setValidators(null);
        this.nomineeFormGroup.get('relationshipNominee').setErrors(null);
        this.nomineeFormGroup.get('relationshipNomineeMinor').setValidators(null);
        this.nomineeFormGroup.get('relationshipNomineeMinor').setErrors(null);
        this.nomineeFormGroup.get('nomineeDOB').setValidators(null);
        this.nomineeFormGroup.get('nomineeDOB').setErrors(null);
        this.nomineeFormGroup.get('percentageAllocation').setValidators(null);
        this.nomineeFormGroup.get('percentageAllocation').setErrors(null);
        this.nomineeFormGroup.get('nomineePanOrAadharNumber').setValidators(null);
        this.nomineeFormGroup.get('nomineePanOrAadharNumber').setErrors(null);

        this.nomineeFormGroup.reset();
      }
    }

  }

  removeNominees(event){
    this.numberOfNominee = [];
    this.detailsOfNominee = [];
    this.pan1=null;
    this.pan2=null;
  }

  pushData() {
    let percentagePortion = 0;
    if (this.detailsOfNominee.length > 0) {
      for (var i in this.detailsOfNominee) {
        percentagePortion = this.detailsOfNominee[i].percentageAllocation + percentagePortion;
      }
    }
    else {
      percentagePortion = this.nomineeFormGroup.value.percentageAllocation
    }
    if (!this.isShown) {

      if ((this.numberOfNominee.length >= 0 && percentagePortion == 100)) {

        console.log(this.numberOfNominee,'123456');
        this.insertNomineeDetails(this.numberOfNominee)

        // this.commonservice.setNomineeDetails(this.numberOfNominee).subscribe((data: nomineeProfileDetail) => {
        //   if (data && data?.Status) {

        //     console.log("update", data);
        //     this.getNomineeStatus.emit("nominee"); // call this method on success
        //   }
        //   else {
        //     this.errorShow(data?.Message, "setNomineeDetails -> status")
        //     console.log("cancel", data)
        //   }
        // }, (error: any) => {
        //   this.errorShow(error?.Message, "getEsign -> Http request");
        // })
      }
      else {
        // this.toastservice.showAutoToast(this.errorList?.error + " Percentage allocation should be equal to 100!");
        this.ErrorMsg = this.errorList?.error + " Percentage allocation should be equal to 100!"
        this.loggedInModal = true
        setTimeout(() => {
          this.loggedInModal = false;
        }, 3000);
      }
    }
    else if (this.currentNativeNetwork) {
      let params = {
        "CustGuId": localStorage.getItem("CustGuId"),
        "CityGuId": "",
        "StateGuId": "",
        "IsInterestedInNominee": false,
        "FirstName": "",
        "MiddleName": "",
        "LastName": "",
        "Gender": "",
        "RelationWithNominee": "",
        "DateOfBirth": "",
        "PercentageAllocation": "",
        "PanAadharNumber": "",
        "IsNomineeMinor": false,
        "Address": "",
        "EmailId": "",
        "MobileNo": "",
        "NoOfNominee": 0,
        "GFirstName": "",
        "GMiddleName": "",
        "GLastName": "",
        "GGender": "",
        "GRelationWithNominee": "",
        "GDateOfBirth": "",
        "GPercentageAllocation": "",
        "GPanAadharNumber": "",
        "GAddress": "",
        "GEmailId": "",
        "GMobileNo": "",
        "GCityGuId": "",
        "GStateGuId": "",
        "IsGuardianAddressSameASNominee": false
      }
      // this.numberOfNominee.push(params);
      console.log(this.numberOfNominee,'123456');
      this.insertNomineeDetails(this.numberOfNominee)
      // this.processNomineePostData();
    }
  }

  insertNomineeDetails(obj) {

      if (this.isCordovaStatus) {
        this.nativeNetworkPAN(obj);
      } else {
        this.windowNetworkPAN(obj);
      }
  }

  nativeNetworkPAN(obj) {
    if (this.currentNativeNetwork) {
      this.insertNomineeDetailsPost(obj);
    } else {
      this.ErrorMsg=this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
      
    }
  }
  windowNetworkPAN(obj) {
    if (this.currentWindowNetwork) {
      this.insertNomineeDetailsPost(obj)
      // this.dummyNextStep();//by pass
    } else {
       this.ErrorMsg=this.errorList?.networkError
       this.loggedInModal = true

       setTimeout(() => {
        this.loggedInModal = false;
       }, 3000);
       
    }
  }

  insertNomineeDetailsPost(obj){
    this.loaderService.showLoader();
    // this.commonservice.setNomineeDetails(obj)
    let myObj={
      "TokenId": localStorage.getItem('id_token'),
      'Nominee':obj
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.submitDetails, myObj)
    .subscribe((data: nomineeProfileDetail) => {
      if (data && data?.Status) {
        // console.log("update", data);
        // this.getNomineeStatus.emit("nominee"); // call this method on success
        // this.processNomineePostData();
        this.loaderService.hideLoader();
        // this.router.navigate(['/Onboarding'+data['pageUrl']]);
        this.eduService.categoryValueForAPI.subscribe(val => {
          this.routing = val['productLanding'];
      
        })
        if(this.routing=='Insurance'){
          return this.router.navigate(['/Shopping/OrderBook']);
        }else{

          this.onboardingService.nextOnSuccess('NomineeDetails')
        }

      }
      else {
        this.errorShow(data?.Message, "setNomineeDetails -> status")
        // console.log("cancel", data)
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "setNomineeDetails -> Http request");
    })
  }
  processNomineePostData() {
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.nomineeDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId
    }
    // this.loaderService.showLoader();
    // this.commonservice.postPanDetails(localPostData)
    // this.http.get('assets/data/getNextSteps.json')
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb2+this.apiCatalog.submitDetails, {})
    .subscribe((data: any) => {
      this.loaderService.hideLoader();
      if (data && data?.Status) {
        // this.getNomineeStatus.emit("nominee");
        this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, "Nominee Page" + functionName, message, this.errorList?.okText)
  }

  // onKeyOutput(value: number) {
  //   this.output = value;
  //   if (!this.output) this.output = 0;
  //   if (this.output >= 100) this.output = 100;
  // }

  // changeOutput(e) {
  //   this.output = e.target.value;
  // }

  getCountryMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+'/getDetail?Country', params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.country = data.data;
      }
this.countryDrop.open()
    })
  }

  getStateMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+'/getDetail?State', params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.state = data.data;
      console.log(this.state,"stateDrop");
      
      }
     
      this.stateDrop.open()

    })
  }

  getCityMasterDetails(type, pincode) {
    let params = {
      "Type": type,
      "PINCODE": pincode
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+'/getDetail?City', params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.city = data.data;
      }
this.cityDrop.open()
    })
  }

  successModalClose() {
    this.loggedInModal = false
  }
}
