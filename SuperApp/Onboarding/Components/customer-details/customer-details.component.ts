import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
;
import { AllConfigDataService, CommonFunctionService, CommonService,
   customerDataDetails, LoaderService, master, NetworkService,
   ToastService, userProfileDetail } from 'index';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
skip(arg0: string) {
  this.onboardingService.skip(arg0)
}

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  public custmerFormGroup: FormGroup;
  profileData
  @Input() data: any;
  @Input() metalType:any
  @Output() custDatastatus = new EventEmitter();
  Firstname:any
  Middlename:any
  Lastname:any
  DateOfBirth:any
  EmailId:any
  MobileNumber:any
  AddressLine1:any
  AddressLine2:any
  AddressLine3:any
  city: any;
  state: any;
  // country:master[];
  maxDate: any;

  skipMe:boolean = false;
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
  profileDetails: any;
  rama:any
  imageList:any
  clientCode: any;





// public canvasWidth = 300
// public needleValue = 65
// public centralLabel = ''
// public name = 'Gauge chart'
// public bottomLabel = '742'
// public options = {
//     hasNeedle: true,
//     needleColor: '#E1E5EA',
//     needleUpdateSpeed: 1000,
//     arcColors: ['red', '#FFC300', 'orange','green'],
//     arcDelimiters: [25,50,75],
//     rangeLabel: ['Poor', 'Average'],
//     needleStartValue: 50,
// }





  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/CustomerRegistration",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }


  constructor(private commonservice:CommonService,
    private allConfigDataService: AllConfigDataService,
    private commonFunctionService: CommonFunctionService,
    private networkService: NetworkService,
    private https:HttpClient,
    private router:Router,
    private loderservices:LoaderService,
    private onboardingService:OnboardingService
    ) { }




  ngOnInit() {
    this.futureDateDisable();
    this.getProfileData()
    this.imageList=this.allConfigDataService.getConfig('images')
// this.function();

    this.custmerFormGroup=new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      MiddleName: new FormControl(''),
      LastName: new FormControl(''),
      EmailId: new FormControl(''),
      MobileNumber: new FormControl(''),
      AddressLine1: new FormControl(''),
      AddressLine2: new FormControl(''),
      // AddressLine3: new FormControl(''),
      State: new FormControl(''),
      City: new FormControl(''),
      Pincode: new FormControl('')
    });

    this.getStateMasterDetails('State',null);

    // this.custmerFormGroup.controls["firstName"].setValidators([Validators.required])

    this.custmerFormGroup.controls["firstName"].setValidators([Validators.required])
    this.custmerFormGroup.controls["MiddleName"].setValidators([])
    this.custmerFormGroup.controls["LastName"].setValidators([Validators.required])
    // this.custmerFormGroup.controls["DateOfBirth"].setValidators([Validators.required])
    this.custmerFormGroup.controls["EmailId"].setValidators([Validators.required,Validators.pattern("[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}"),Validators.email])
    this.custmerFormGroup.controls["AddressLine1"].setValidators([Validators.required])
    this.custmerFormGroup.controls["AddressLine2"].setValidators([Validators.required])
    // this.custmerFormGroup.controls["AddressLine3"].setValidators([Validators.required])
    this.custmerFormGroup.controls["MobileNumber"].setValidators([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    this.custmerFormGroup.controls["Pincode"].setValidators([Validators.required])
    this.custmerFormGroup.controls["State"].setValidators([Validators.required])
    this.custmerFormGroup.controls["City"].setValidators([Validators.required])





    this.profileData = {
      Status: "",
      ErrorCode: "",
      Message: "",
      MessageType: "",
      // IsInterestedInNominee: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      // Gender: "",
      // RelationWithNominee: "",
      DateOfBirth: "",
      // PercentageAllocation: "",
      // PanAadharNumber: "",
      // IsNomineeMinor: "",
      Address: "",
      EmailId: "",
      MobileNo: "",
      // NoOfNominee: "",
      // GFullName: "",
      // GPanAadharNumber: "",
      GAddress: "",
      GCityGuId: "",
      GStateGuId: "",
      Pincode: "",
      Country: ""
    }
    console.log(this.profileData+"ramapro");


    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })







    if(this.custmerFormGroup.value.Pincode!='')this.insertCustomerDataPost()




  }
  futureDateDisable() {
    var date = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth();
    var year: any = date.getFullYear() - 18;
    // if (todayDate < 10) {
    //   todayDate = 0 + todayDate;
    // }
    // if (month < 10) {
    //   month = 0 + month;
    // }
    this.maxDate = year + "-" + month + "-" + todayDate;
  }

 ValidateAlpha(evt)

  {

      var keyCode = (evt.which) ? evt.which : evt.keyCode

      if ((keyCode < 65 || keyCode > 90) && (keyCode < 97 || keyCode > 123) && keyCode != 32)

      return false;

          return true;

  }

  getStateMasterDetails(type: string, selectedGuId: any) {
    let params = {
      "Type": type,
      "PINCODE": ""
    }
    // this.commonservice.getMasterDetails(params).subscribe((data: any) => {
    this.https.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog['breadCrumb']+this.apiCatalog.getDetail+'?State',params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.state = data.data;
      }
    })
  }

  getCityMasterDetails(type, pincode) {
    let params = {
      "Type": type,
      "PINCODE": pincode
    }
    // this.commonservice.getMasterDetails(params).subscribe((data: any) => {
    if(pincode.length==6)this.https.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog['breadCrumb']+this.apiCatalog.getDetail+'?City',params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.city = data.data;
      }

    })
  }

  successModalClose() {
    this.loggedInModal = false
  }

  getProfileData() {
    this.localCustGuId = localStorage.getItem('CustGuId');

    // this.loaderService.showLoader();
    let reqParams = {
      TokenId: localStorage.getItem('id_token'),
    }
    // this.commonservice.getProfileDetails(reqParams).subscribe((data:any) => {
      this.https.post(
        this.apiCatalog.baseURL[this.apiCatalog.environment]+
        this.apiCatalog['breadCrumb']+
        this.apiCatalog.getCustomerDetails,reqParams)
        .subscribe((data:any)=>{
      if (data && data?.Status) {

        this.profileDetails=data.data[0]
        console.log(JSON.stringify( this.profileDetails)+"gcudfyudg");
        this.Firstname=data.FirstName
        this.Middlename=data.MiddleName
        this.Lastname=data.LastName
        this.EmailId=data.emailId
        this.MobileNumber=
        console.log(data.MobileNo,this.MobileNumber,"MUI;FDJV")
        // this.clientCode=data.ClientCode
        // console.log(this.rama,"fyiusdyfgidg")
        // this.custmerFormGroup.setValue({
        //   Pincode: data.data[0].pincode,

        // });
      }
    })
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.custmerFormGroup.value);
    // this.navigateTobuySell();
    // this.router.navigate(['/Engagement']);
    this.insertCustomerDataPost()

  }

  // async navigateTobuySell() {






  //   // this.modctrl.dismiss()
  //   // let commodity='gold';



  // }
  errorShow(message, functionName) {
    // this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService('error', "Nominee Page" + functionName, message, 'ok')
  }

   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode != 46 && charCode > 31
            && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  insertCustomerDataPost(){

    let params = {


      "TokenId": localStorage.getItem('id_token'),
      "FirstName":this.custmerFormGroup.value.firstName,
      "MiddleName":this.custmerFormGroup.value.MiddleName,
      "LastName":this.custmerFormGroup.value.LastName,
      "AddressLine1": this.custmerFormGroup.value.AddressLine1,
      "AddressLine2":  this.custmerFormGroup.value.AddressLine2,
      "Pincode": this.custmerFormGroup.value.Pincode,
      "StateGuId": this.custmerFormGroup.value.State,
      "userCity":this.custmerFormGroup.value.City,
        }
    // this.loaderService.showLoader();
    // this.commonservice.setCustomerdata(obj).subscribe(async (data: customerDataDetails) => {
      this.loderservices.showLoader()
    this.https.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog['breadCrumb']+this.apiCatalog.updateCustomerCorrespondenceDetail_DG,params).subscribe((data: any) => {
      if (data) {
        this.loderservices.hideLoader()
        console.log(data);
        // this.router.navigate(['/Onboarding'+data.result.data['URLtoRedirect']]);
        // this.router.navigate(['/Onboarding'+ data['pageUrl']]);
        this.onboardingService.nextOnSuccess('CustomerDetails');
        // this.custDatastatus.emit("custdata")
        // this.router.navigate(['/Engagement']);
        // console.log("update", data);
        // // return true;
        // const modal = await this.modctrl.create({
        //   // component: CoursecategoryComponent,ionic
        //   component:BuyGoldComponent ,
        //   componentProps: {
        //     'imageList': this.imageList,
        //     '_type':'buy',
        //     'metalType': this.metalType,
        //     'clientCode':this.clientCode
        //   },
          // backdropDismiss: false
        // })
        // modal.onDidDismiss().then((data) => {
        //   console.log(data)
        // })
        // modal.present()
        // return await modal.present();
        // this.commonservice.hello(params).subscribe((data: any) => {
        //   console.log("done");
        //   modal.present();
        // })
        // this.getNomineeStatus.emit("nominee"); // call this method on success

        // this.loaderService.hideLoader();
        this.skipMe=true;
      }
      else {
        this.skipMe=true;
        // this.custDatastatus.emit("custdata")
        // this.loaderService.hideLoader();
        this.errorShow(data?.Message, "setCustomerdata -> status")
        // this.loaderService.hideLoader();
        // console.log("cancel", data)
      }
    }, (error: any) => {
      this.skipMe=true;
      this.errorShow(error?.Message, "setCustomerdata -> Http request");
      // this.loaderService.hideLoader();
      return false;
    })
  }






}
