import { CheckoutaddComponent } from 'projects/orderedlist/checkoutadd/checkoutadd.component';
import { Component, OnInit } from '@angular/core';
import { master } from 'projects/core/src/lib/interfaces/common.interface';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Component({
  selector: 'lib-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})

export class AddressDetailsComponent implements OnInit {
  imageList: any
  state: master[];
  city: master[];
  getStateName: any;
  getCityName: any;


  constructor(private allconfigDataService: AllConfigDataService, private modalCtrl: ModalController, private commonservice: CommonService, private fb: FormBuilder,private http:HttpClient) { }

  public checkError = (controlName: string, errorName: string) => {
    return this.addressForm.controls[controlName].hasError(errorName) && (this.addressForm.controls[controlName].dirty || this.addressForm.controls[controlName].touched) ? this.addressForm.controls[controlName].hasError(errorName) : ''
  }


  addressForm = this.fb.group({
    addressType: ['', Validators.required],
    fullName: ['', Validators.required],
    mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    addressLine1: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    addressLine2: [''],
    pincode: ['', [Validators.required, Validators.pattern("[0-9]{6}")]],
    city: ['', Validators.required],
    state: ['', Validators.required],

  })

  getdetails() {
    return this.addressForm.controls
  }
  getAddress() {
    return this.addressForm.controls
  }
// saveAddressData(){
//   this.modalCtrl.dismiss(this.addressForm.value,this.getCityName,this.getStateName)
// }
  getAddressDetails() {
  
    console.log(this.addressForm.value);
    this.modalCtrl.dismiss(this.addressForm.value);

  }
  getState(e: master[]){  
    this.state=e;
    console.log("State",this.state);
    
  }
  

  closeAddPage() {
    this.modalCtrl.dismiss()
  }
  

  getStateMasterDetails(type: string, selectedGuId: any) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.commonservice.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.state = data.Data;
      }

    })
    console.log(this.state);

  }

  getCityMasterDetails(type: string, selectedGuId: any) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.commonservice.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.city = data.Data;
      }

    })
  }

  ngOnInit() {
    this.imageList = this.allconfigDataService.getConfig('images')
    this.getStateMasterDetails('state', null)
    this.getCityMasterDetails('city', null)


  }
  getstate(e){
   this.getStateName=e
    
  }
  getcity(e){
    this.getCityName=e
  }


  async saveAddressData() {
    this.setAddressDetails();
    const modal = await this.modalCtrl.create({
      component: CheckoutaddComponent,
      componentProps: {  
            'adressForm':this.addressForm.value,
            'city':this.getCityName,
            'state':this.getStateName  
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          console.log(data.data.addressLine1);
          
          // this.dataForOrderSummary.address1=data.data.addressLine1
        }
      });
    return await modal.present();
  }


  setAddressDetails(){
    let headers: HttpHeaders = new HttpHeaders({
          "Token" : "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
        });
        let params={
          
          "CustGuId":localStorage.getItem('CustGuId'),
          "AddressLine1": this.addressForm.controls.addressLine1.value,
          "AddressLine2": this.addressForm.controls.addressLine2.value,
          "AddressLine3": "",
          "Pincode": this.addressForm.controls.pincode.value,
          "City": this.getCityName,
          "State": this.getStateName,
          "Country": "India",
          "AddressType": this.addressForm.controls.addressType.value,
          "Partner_Contact_ID": "123"
        }
        
        this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/AddPatientAddress",params,{headers}).subscribe((res:any)=>{


          console.log("product details data", res);
     
        })
  }



}

