import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { HttpClient } from '@angular/common/http';
import { Component,Input,EventEmitter,Output,OnInit } from '@angular/core';
import { NetworkService } from 'projects/core/src/lib/services/network.service';
import { LoadingController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patner-detail',
  templateUrl: './patner-detail.component.html',
  styleUrls: ['./patner-detail.component.scss'],
})
export class PatnerDetailComponent implements OnInit {

  @Output() otherDetailsUploaded = new EventEmitter();
  @Input() imageList: any;
  @Input() loginCustomerGuId: any;
  foods

  ionicForm: FormGroup;

  occupation:any=[
      {name:'Private Sector Service',value:'Private Sector Service'},
      {name:'Public Sector',value:'Public Sector'},
      {name:'Governmemt Service',value:'Governmemt Service'},
      {name:'Professional',value:'Professional'},
      {name:'Agriculturist',value:'Agriculturist'},
      {name:'Retired',value:'Retired'},
  ]
  occupationStatus:any='Private Sector Service';


  userValues = {
    gender: "",
    marital: "",
    trading: "",
    Income: ""
  }

  chosenItemForGender: any;
  chosenItemForTradingExp: any;
  chosenItemForMarital: any;
  chosenItemForIncome: any;
  currentNativeNetwork: any;
    continueNextPage: boolean;
    loggedInModal: boolean;
    errorList: any;
    ErrorMsg: any;


    appEnviron: any;
    breadCrumb: string;
    apiCatalog: any;
    responseData: any;
    constructor(private http:HttpClient,private loaderService:LoaderService,private commonFunctionService: CommonFunctionService,private allConfigDataService:AllConfigDataService,private router:Router,private networkService:NetworkService,private loadingController: LoadingController, private fb: FormBuilder) {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Onboarding/OnboardingSteps/NeoBank';
    }




    ngOnInit() {
      this.imageList=this.allConfigDataService.getConfig('images')

      this.networkService.onNetworkChange().subscribe((data: any) => {
        this.currentNativeNetwork = data;

        // this.ionicForm = this.formBuilder.group({
        //   gender:['',[Validators.required]],
        //   maritalStatus:['',[Validators.required]],
        //   TradingExp:[''],
        //   Experience:['',[Validators.required]],
        //   NISMCertificate:['',[Validators.required]],
        //   Occupation:['',[Validators.required]]
        // });
      })

      this.ionicForm = this.fb.group({
        gender: [null, ([Validators.required])],
        maritalStatus: [null, ([Validators.required])],
        TradingExp: [null, ([Validators.required])],
        Experience: [null, ([Validators.required])],
        NISMCertificate: [null, ([Validators.required])],
        Occupation: [null, ([Validators.required])],

      })
    }

    // ngAfterViewInit() {
    //   this.getCountryMasterDetails('Profile', null);
    // }

    //  getCountryMasterDetails(type, value) {


    //   let params = {
    //     "Type": type
    //   }
    //   this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+'/getDetail?getProfile', params).subscribe(async (data: any) => {
    //     this.loaderService.hideLoader();

    //     if (data && data?.Status) {
    //       // console.log(data)
    //       this.responseData = data.Data;


    //     }
    //   })


    //   }




    // getGender(status: any) {
    //   this.userValues.gender = status;
    //   // console.log(this.userValues)
    //   this.submitted()
    // }

    // getMarital(status: any) {
    //   this.userValues.marital = status;
    //   // console.log(this.userValues)
    //   this.submitted()
    // }

    // getExp(status: any) {
    //   this.userValues.trading = status
    //   // console.log(this.userValues)
    //   this.submitted()
    // }

    goback(){
      window.history.back()
    }

    onSubmit(){
      console.warn(this.ionicForm.value);
      this.NavToSelfie()

    }


    // submitted() {
    //   if (this.userValues.gender && this.userValues.marital && this.userValues.trading) {
    //     if (this.currentNativeNetwork) {
    //       this.continueNextPage = false
    //     } else {
    //       this.ErrorMsg = this.errorList?.networkError
    //       this.loggedInModal = true
    //       setTimeout(() => {
    //         this.loggedInModal = false;
    //       }, 3000);
    //     }
    //   }
    // }

    // onContinue() {
    //   if (this.currentNativeNetwork) {
    //     this.loaderService.showLoader();
    //     let params = {
    //       "CustGuId": this.loginCustomerGuId,
    //       "Gender": this.userValues.gender,
    //       "Maritalstatus": this.userValues.marital,
    //       "IncomeGroup": this.userValues.Income,
    //       "TradingExperience": this.userValues.trading,
    //       "flag": "UpdateProfile"
    //     }

    //     // this.commonservice.setProfileDetails(params)
    //     this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getOtherDetail, params)
    //     .subscribe((data: any) => {
    //       // this.loaderService.hideLoader();
    //       // console.log("update", data)
    //       if (data && data.URLtoRedirect === "/Nominee") {
    //       this.router.navigate(['/neoBankOnboarding'+data['URLtoRedirect']]);
    //         // this.processPerDetailsPostData();
    //         // this.getPersonalStatus.emit('personal')
    //       } else {
    //         this.errorShow(data?.Message, "getProfileDetails -> status");
    //       }
    //     }, (error: any) => {
    //       this.errorShow(error?.Message, "getProfileDetails -> Http request");
    //     })
    //   } else {
    //     this.loaderService.hideLoader();
    //     this.ErrorMsg = this.errorList?.networkError
    //     this.loggedInModal = true
    //     setTimeout(() => {
    //       this.loggedInModal = false;
    //     }, 3000);
    //   }
    // }


    // errorShow(message, functionName) {
    //   this.loaderService.hideLoader();
    //   this.commonFunctionService.showErrorsService(this.errorList?.error, 'container-view page -> ' + functionName, message, this.errorList?.okText);
    // }

    NavToSelfie(){

// console.log(this.ionicForm[0].gender);


      this.router.navigate(['/Onboarding/Selfie'])
    }



}
