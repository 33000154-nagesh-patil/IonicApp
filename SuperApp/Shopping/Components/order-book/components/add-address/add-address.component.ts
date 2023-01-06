import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ToastService } from 'projects/core/src/lib/services/toast.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddAddressComponent implements OnInit {

  ionicForm: FormGroup;
  Mobile: any;
  AddressLine1: any;
  AddressLine2: any;
  Pincode: any;
  City: any;
  Country: any;
  State: any;
  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/CustomerRegistration",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  appEnvironment = this.allConfigDataService.getConfig('environmentType')
  city: any;
  AddressFormGroup: FormGroup;
  // @Input() set addAddressval(val: any){
  //   console.log(val,"addresvalue")
  // };

  @Input() set addAddressval(val: any){
    this.Mobile=val.contact;
    this.AddressLine1=val.value?.[0]
    this.AddressLine2=val.value?.[1]
    this.city=val.value?.[2]
    this.Country=val
    this.State=val.value?.[3]
    this.Pincode=val.value?.[4]
    console.log(val,"---->")
  };
  @Input() updateaddress:any;

  constructor(public formBuilder: FormBuilder,private modalCtrl:ModalController,private https:HttpClient, private allConfigDataService:AllConfigDataService, private http:HttpClient, private toastService:ToastService) { }

  ngOnInit() {
    console.log(this.updateaddress,"--------->")
    // this.ionicForm = this.formBuilder.group({
    //   State:['',[Validators.required]],
    //   Mobile:['',[Validators.required]],
    //   Pincode:['',[Validators.required]],
    //   City:['',[Validators.required]],
    //   Country:['',[Validators.required]],
    //   Address:['',[Validators.required]]
    // });
    this.AddressFormGroup=new FormGroup({
      Country: new FormControl('',),
      Pincode: new FormControl(''),
      City: new FormControl(''),
      State: new FormControl(''),
      Mobile: new FormControl(''),
      Address: new FormControl(''),
      AddressLine1: new FormControl(''),
      AddressLine2: new FormControl(''),
    });
    this.AddressFormGroup.controls["State"].setValidators([Validators.required]);
    this.AddressFormGroup.controls["Mobile"].setValidators([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]);
    this.AddressFormGroup.controls["Pincode"].setValidators([Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]);
    this.AddressFormGroup.controls["City"].setValidators([Validators.required]);
    this.AddressFormGroup.controls["Country"].setValidators([Validators.required]);
    this.AddressFormGroup.controls["Address"].setValidators([Validators.required]);
  }

  Stateoptions=[
    {item:"Maharastra"},{item:"Andaman Nicobar"},{item:"Arunachal Pradesh"},{item:"Uttar Pradesh"},{item:"Madhya Pradesh"},{item:"Andhra Pradesh"},{item:"Jammu and Kashmir"},{item:"Telangana"},{item:"Chattisgarh"}
  ]
  Addressoptions=[
    {item:"Office"},{item:"Home"},{item:"Other"}
  ]

  goBack(){
    // window.history.back();
    this.modalCtrl.dismiss();
  }

  addAddress() {
    let params = {
      "MobNo":this.AddressFormGroup.value.Mobile,
      "AddressLine1":this.AddressFormGroup.value.AddressLine1,
      "AddressLine2":this.AddressFormGroup.value.AddressLine2,
      "Pincode":this.AddressFormGroup.value.Pincode,
      "City":this.AddressFormGroup.value.City,
      "State":this.AddressFormGroup.value.State,
      "Country":this.AddressFormGroup.value.Country,
      "OtherDetails":{
        "Mob_no": this.AddressFormGroup.value.Mobile,
        "Address_type": this.AddressFormGroup.value.Address
      },
      "TokenId":localStorage.getItem('id_token')
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnvironment]+"Onboarding/OnboardingSteps/CustomerRegistration" + this.apiCatalog.addAddress, params)
    .subscribe((response: any) => {
          // window.history.back();
          this.modalCtrl.dismiss("addaddress");
          this.toastService.showAutoToast('Your Address has been added successfully.')
      });
  }


  UpdateAdress() {
    let params = {
      "AddressId": parseInt(this.updateaddress),
      "MobNo":this.AddressFormGroup.value.Mobile,
      "AddressLine1":this.AddressFormGroup.value.AddressLine1,
      "AddressLine2":this.AddressFormGroup.value.AddressLine2,
      "Pincode":this.AddressFormGroup.value.Pincode,
      "City":this.AddressFormGroup.value.City,
      "State":this.AddressFormGroup.value.State,
      "Country":this.AddressFormGroup.value.Country,
      "OtherDetails":{
        "Mob_no": this.AddressFormGroup.value.Mobile,
        "Address_type": this.AddressFormGroup.value.Address
      },
      "TokenId":localStorage.getItem('id_token')
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnvironment]+"Onboarding/OnboardingSteps/CustomerRegistration" + this.apiCatalog.UpdateAddress, params)
    .subscribe((response: any) => {
          // window.history.back();
          this.modalCtrl.dismiss("addaddress");
          this.toastService.showAutoToast('Your Address has been added successfully.')
      });
  }

  getCityMasterDetails(type, Pincode) {
    let params = {
      "Type": type,
      "PINCODE": Pincode
    }
    if(Pincode.length==6){
    this.https.post(
      this.apiCatalog.baseURL[this.appEnvironment]+
      this.apiCatalog['breadCrumb']+
      this.apiCatalog.getDetail+
      '?City',params).subscribe(
        (data: any) => {
      if (data && data?.Status) {
        this.city = data.data;
      }
    })
    }
  }

}
