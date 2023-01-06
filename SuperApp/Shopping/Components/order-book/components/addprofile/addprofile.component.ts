import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { userProfileDetail } from 'SuperApp/Common/interfaces/common.interface';

@Component({
  selector: 'app-addprofile',
  templateUrl: './addprofile.component.html',
  styleUrls: ['./addprofile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddprofileComponent implements OnInit {
  profileData:userProfileDetail;
  gender:any
  ionicForm: FormGroup;
  firstName: any;
  otherDetails:any={};
  middleName: any;
  lastName: any;
  relation: any;
  age: any;
  apiCatalog = this.allConfigDataService.getConfig('apiCatalog');
  appEnvironment = this.allConfigDataService.getConfig('environmentType')
  DatePicker: any;
  
  @Input() set profilevalue(val: any){
    this.firstName=val.name?.split(' ')[0];
    this.middleName=val.name?.split(' ')[1]?'':val.name?.split(' ')[1];
    this.lastName=val.name?.split(' ')[1]
    this.relation=val
    this.age=val.age
    this.gender=val.gender
    console.log(val,"---->")
  };
  @Input()  UpdateProfileApi:any
  constructor(public formBuilder: FormBuilder,private router:Router, private modalCtrl:ModalController, private commonService:CommonService, private allConfigDataService:AllConfigDataService, private http:HttpClient, private toastService:ToastService) { }

  ngOnInit() {
    console.log(this.UpdateProfileApi,"dsdsdfdsf")
    // this.gender=this.controls[0].name
    this.relation=this.options[1].item
    this.ionicForm = this.formBuilder.group({
      Firstname:['',[Validators.required]],
      middleName:[''],
      LastName:['',[Validators.required]],
      Disease:['',[Validators.required]],
      Age:['',[Validators.required]]
    });
    this.ionicForm.controls["Firstname"].setValidators([Validators.required, Validators.pattern("^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z]+(?<![_.])$")]);
    this.ionicForm.controls["LastName"].setValidators([Validators.required]);
    this.ionicForm.controls["Disease"].setValidators([Validators.required]);
    this.ionicForm.controls["Age"].setValidators([Validators.required, Validators.pattern("^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$")]);
    this.commonService.userDetail.subscribe((data: any) => {
      this.profileData = data;
    })
  }

  options=[
    {item:"Spouse"},{item:"Self"},{item:"Son"},{item:"Daughter"},{item:"Sister"},{item:"Brother"},{item:"Father"},{item:"Mother"},{item:"Father - in - law"},{item:"Mother - in - law"},{item:"Others"}
  ]
  controls=[
    {name:"Male"},
    {name:"Female"},
    {name:"Others"}
  ]

  goBack(){
    // window.history.back();
    this.modalCtrl.dismiss();
  }

  onDateChange(val) {
    this.DatePicker = val.value.getDate() + '-' + val.value.getMonth() + '-' + val.value.getFullYear()
  }
Myval(){
  debugger
  this.profilevalue
}
  profileAdd() {
    // this.otherDetails.firstName = this.firstName
    // this.otherDetails.middleName = this.middleName
    // this.otherDetails.lastName = this.lastName
    // this.otherDetails.age = this.age
    // this.otherDetails.relation = this.relation
    // this.otherDetails.gender = this.gender
    let params ={
      "FirstName":this.firstName,
      "MiddleName":this.middleName,
      "LastName":this.lastName,
      "Age":this.age,
      "Relation":this.relation,
      "Gender":this.gender,
      "TokenId":localStorage.getItem('id_token')
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnvironment]+"Onboarding/OnboardingSteps/CustomerRegistration" + this.apiCatalog.addCustomer, params)
    .subscribe((response: any) => {
          // window.history.back();
          this.modalCtrl.dismiss("addprofile");
          this.toastService.showAutoToast('Your Profile has been added successfully.')
      });
    
  }
  updateProfile(){
    
    let param ={
      "FirstName":this.firstName,
      "MiddleName":this.middleName,
      "LastName":this.lastName,
      "custRelationID": this.UpdateProfileApi,
      "Age":this.age,
      "Relation":this.relation,
      "Gender":this.gender,
      "TokenId":localStorage.getItem('id_token')
    }
this.http.post(this.apiCatalog.baseURL[this.appEnvironment]+"Onboarding/OnboardingSteps/CustomerRegistration" + this.apiCatalog.addUpdateCustomer,param).subscribe((updateprofile:any)=>{
// this.UpdateProfile1=updateprofile
this.modalCtrl.dismiss("addprofile");
          this.toastService.showAutoToast('Your Profile has been added successfully.')
})
  }
//  AddandUpdateProfile(){
//   if(this.updateprofile!=true){
//       this.updateProfile()
//   }
//   else{
//     this.profileAdd()
//   }

//  }

}
