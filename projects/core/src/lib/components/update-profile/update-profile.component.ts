import { Router } from '@angular/router';
import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { dropdown, master, userProfileDetail } from '../../interfaces/common.interface';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { CommonService } from '../../services/common.service';
import { NetworkService } from '../../services/network.service';
import { HttpClient } from '@angular/common/http';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  profileData:userProfileDetail;
  @Input() imageList: any;
  @Input() errorList: any;
  country: master[];
  state: master[];
  city: master[];
  dob: any;
  loggedInModal:boolean=false
  ErrorMsg:any;
  today = new Date();


public authenticationFormGroup: FormGroup;

@Output() closeModal = new EventEmitter();
@Output() updateRecord = new EventEmitter();
@Output() closePartnerModel=new EventEmitter()

  currentNativeNetwork: any;


  currentLanguage: any;
  currentWindowNetwork: any;
  isCordovaStatus: any;
  showRequiredError: any;
  showPatternError: any;
  IsWhatsApp: boolean=true;
  declareInfo: boolean=true;

  constructor(private router:Router,private eduService:eduService,private http:HttpClient,private allConfigDataService: AllConfigDataService,private commonService: CommonService,private modalCtrl:ModalController, private networkService: NetworkService) { }

  ngOnInit() {
    console.log("profileData",this.profileData)
    this.commonService.userDetail.subscribe((data: any) => {
      this.profileData = data;
    })
    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })

    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })

    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    if (this.currentLanguage) {
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if (allErrorList) {
        this.errorList = allErrorList[this.currentLanguage];
      }
    }


    // this.dob = this.dobFormatted(this.profileData.DateOfBirth)
    // console.log(this.profileData)
    // this.getCountryMasterDetails('Country',null);
    // this.getStateMasterDetails('State',null);
    this.authenticationFormGroup = new FormGroup({
      firstName : new FormControl(''),
      middleName : new FormControl(''),
      lastName : new FormControl(''),
      // dobirth : new FormControl(''),
      emailID : new FormControl(''),
      mobileNumber : new FormControl('')
      // addLine1 : new FormControl(''),
      // addLine2 : new FormControl(''),
      // pincode : new FormControl('')
   });
   this.authenticationFormGroup.controls["firstName"].setValidators([Validators.required]);
  //  this.authenticationFormGroup.controls["middleName"].setValidators([Validators.required]);
   this.authenticationFormGroup.controls["lastName"].setValidators([Validators.required]);
  //  this.authenticationFormGroup.controls["dobirth"].setValidators([Validators.required]);
   this.authenticationFormGroup.controls["emailID"].setValidators([Validators.required,Validators.pattern("^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$")]);
   this.authenticationFormGroup.controls["mobileNumber"].setValidators([Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),Validators.minLength(10),Validators.maxLength(10)]);
  //  this.authenticationFormGroup.controls["addLine1"].setValidators([Validators.required]);
  //  this.authenticationFormGroup.controls["pincode"].setValidators([Validators.required]);
  this.authenticationFormGroup.controls["mobileNumber"].disable()

  //  console.log("dobfound", this.dob)
  }

  maritalStatus: dropdown[] = [
    {value: 'Single', viewValue: 'Single'},
    {value: 'Married', viewValue: 'Married'},
    {value: 'Widowed', viewValue: 'Widowed'},
    {value: 'Separated', viewValue: 'Separated'},
    {value: 'Divorced', viewValue: 'Divorced'}
  ];

  gender: dropdown[] = [
    {value: 'Male', viewValue: 'Male'},
    {value: 'Female', viewValue: 'Female'},
    {value: 'Transgender', viewValue: 'Transgender'},
    {value: 'Prefer not to say', viewValue: 'Prefer not to say'},
    {value: 'Others', viewValue: 'Others'},
  ];

  dobFormatted(date) {
    var d = new Date(Date.parse(date));
    return d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
 }


  public checkError = (controlName: string, errorName: string) => {
    return this.authenticationFormGroup.controls[controlName].hasError(errorName) && (this.authenticationFormGroup.controls[controlName].dirty || this.authenticationFormGroup.controls[controlName].touched) ? this.authenticationFormGroup.controls[controlName].hasError(errorName):''
  }

  updateProfile(){

    if(this.authenticationFormGroup.valid){
      // console.log("update",this.profileData)

        // let params = {
        //   "CustGuId":localStorage.getItem('CustGuId'),
        //   "FirstName":this.authenticationFormGroup?.value?.firstName,
        //   "MiddleName":this.authenticationFormGroup?.value?.middleName,
        //   "LastName":this.authenticationFormGroup?.value?.lastName,
        //   "Gender":this.profileData.Gender,
        //   "DateOfBirth":(this.dob.getMonth()+1)+"-" + this.dob.getDate()+"-" +this.dob.getFullYear(),
        //   "EmailId":this.authenticationFormGroup?.value?.emailID,
        //   "MobileNo":this.authenticationFormGroup?.value?.mobileNumber,
        //   "Currency":"INR",
        //   "Language":"English",
        //   "AddressLine1":this.authenticationFormGroup?.value?.addLine1,
        //   "AddressLine2":this.authenticationFormGroup?.value?.addLine2,
        //   "AddressLine3":"",
        //   "Pincode":this.authenticationFormGroup?.value?.pincode,
        //   "CityGuId":this.profileData.City,
        //   "StateGuId":this.profileData.State,
        //   "AddressType":"permanent",
        //   "CountryGuId":this.profileData.Country
        //  }

        let params = {
          // "CustGuId":localStorage.getItem('CustGuId'),
          "FirstName":this.profileData.firstName,
          "MiddleName":this.profileData.middleName,
          "LastName":this.profileData.lastName,
          "contactDetails":this.profileData.emailId,
          "MobileNo":this.profileData.contactDetails,
          "IsWhatsApp":this.IsWhatsApp,

          // "Gender":this.profileData.Gender,
          // "DateOfBirth":(this.dob.getMonth()+1)+"-" + this.dob.getDate()+"-" +this.dob.getFullYear(),
          // "Currency":"INR",
          // "Language":"English",
          // "AddressLine1":this.profileData.AddressLine1,
          // "AddressLine2":this.profileData.AddressLine2,
          // "AddressLine3":"",
          // "Pincode":this.profileData.Pincode,
          // "CityGuId":this.profileData.City,
          // "StateGuId":this.profileData.State,
          // "AddressType":"permanent",
          // "CountryGuId":this.profileData.Country
        }
      //  console.log("updateParams",params)
      this.profileModalClose()
      //  this.commonService.setProfileDetails(params).subscribe((data: any) => {
      //   console.log("update",data)
      //   if (data && data?.Status) {
      //     this.modalCtrl.dismiss();
      //   }
      // })

      this.updateRecord.emit(params)
  //     this.ErrorMsg=this.errorList?.networkError
  //     this.loggedInModal = true
  // setTimeout(() => {
  //   this.loggedInModal = false;
  // }, 3000);

      }
  }

  getCountryMasterDetails(type,selectedGuId){
    let params = {
      "Type": type,
      "SelectedGuId":selectedGuId
    }
    this.commonService.getMasterDetails(params).subscribe((data: any) => {
      // console.log("master",data)
      // if (data && data?.Status) {
      if (data) {
        this.country = data.Data;
      }

    })
  }

  getStateMasterDetails(type,selectedGuId){
    let params = {
      "Type": type,
      "SelectedGuId":selectedGuId
    }
    this.commonService.getMasterDetails(params).subscribe((data: any) => {
      // console.log("master",data)
      // if (data && data?.Status) {
      if (data) {
        this.state = data.Data;
      }

    })
  }

  getCityMasterDetails(type,selectedGuId){
    // console.log("change called",selectedGuId)
    let params = {
      "Type": type,
      "SelectedGuId":selectedGuId
    }
    this.commonService.getMasterDetails(params).subscribe((data: any) => {
      // console.log("master",data)
      if (data && data?.Status) {
        this.city = data.Data;
      }

    })
  }

  profileModalClose(){
    if(this.authenticationFormGroup.valid){
        // this.modalCtrl.dismiss();
        // console.log("closed clicked")
        this.closeModal.emit('closeUpdateProfileModal')
        this.closePartnerModel.emit('closePartnerModal')

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
      // this.processData();
      console.log("network found")
    } else {
      this.ErrorMsg=this.errorList?.networkError
      this.loggedInModal = true
  setTimeout(() => {
    this.loggedInModal = false;
  }, 3000);
    }
  }
  windowNetworkPAN() {
    if (this.currentWindowNetwork) {
      // this.processData()
      // this.dummyNextStep();//by pass
      console.log("network found")
    } else {
      this.ErrorMsg=this.errorList?.networkError
      this.loggedInModal = true
  setTimeout(() => {
    this.loggedInModal = false;
  }, 3000);
    }
  }
  successModalClose(){
    this.loggedInModal=false
  }


  whatsAppUpdateCheck(e){
    if(!e.target.checked){
      this.IsWhatsApp=false
    }else{
      this.IsWhatsApp=true
    }

  }

  declareInfoCheck(e){
    if(!e.target.checked){

      this.declareInfo=false

    }else{
      this.declareInfo=true
    }


  }

}
