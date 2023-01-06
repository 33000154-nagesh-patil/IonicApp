import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { Component, OnInit } from '@angular/core';
import { master } from 'projects/core/src/lib/interfaces/common.interface';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CheckoutaddComponent } from '../checkoutadd/checkoutadd.component';
import { getMatIconNameNotFoundError } from '@angular/material/icon';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';



@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss'],
})
export class PatientDetailsComponent implements OnInit {
  imageList: any
  state: master[];
  city: master[];
  patientDetails = [];
  fullName: any;
  age: any;
  gender: any;
  relation: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  // modalController: any;

  constructor(
    private allconfigDataService: AllConfigDataService,
    private loaderService: LoaderService,
    public modalController: ModalController,
    private commonservice: CommonService,
    private fb: FormBuilder, private http: HttpClient) {
      this.apiCatalog={
        ...this.allconfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allconfigDataService.getConfig('environmentType');
      this.breadCrumb='Shopping/Health/Lab';
    }

  public checkError = (controlName: string, errorName: string) => {
    return this.addressForm.controls[controlName].hasError(errorName) && (this.addressForm.controls[controlName].dirty || this.addressForm.controls[controlName].touched) ? this.addressForm.controls[controlName].hasError(errorName) : ''
  }


  addressForm = this.fb.group({
    relation: ['', Validators.required],
    // addressType: ['', Validators.required],
    fullName: ['', Validators.required],
    // mobileNo: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    // addressLine1: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
    // addressLine2: [''],
    age: ['', [Validators.required, Validators.pattern("[0-9]{2}")]],
    // city: ['', Validators.required],
    // state: ['', Validators.required],
    gender: ['']
  })

  getdetails() {
    return this.addressForm.controls
  }
  getAddress() {
    return this.addressForm.controls
  }

  getAddressDetails() {
    console.log(this.addressForm.value);
    this.modalController.dismiss(this.addressForm.value);
  }

  closeAddPage() {
    this.modalController.dismiss()
  }


  getStateMasterDetails(type, selectedGuId) {
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

  getCityMasterDetails(type, selectedGuId) {

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


  // getPatientDetails(){
  //   let headers: HttpHeaders = new HttpHeaders({
  //         "Token" : "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
  //       });
  //       let params={
  //         "CustGuId":"4BE6D091-1FFA-4A59-AAA1-4D786818844D",
  //         "First_Name":"omkar",
  //         "Middle_Name":"abc",
  //         "Last_Name":"patil",
  //         "Age":20,
  //         "Gender":"Male",
  //         "Relation":"brother"
  //       }

  //       this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/AddPatientDetails",params,{headers}).subscribe((res:any)=>{


  //         console.log("product details data", res);

  //       })
  // }

  savePatientData() {

    let params = {
      "fullName": this.addressForm.value.fullName,
      "age": this.addressForm.value.age,
      "gender": this.addressForm.value.gender,
      "relation": this.addressForm.value.relation

    }

    this.fullName = params.fullName;
    this.age = params.age;
    this.gender = params.gender;
    this.relation = params.relation
    this.AddPatientDetails()
    this.openCheckOutComponent(this.fullName, this.age, this.gender)


  }

  AddPatientDetails() {

    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
    });

    let params = {
      "custGuId": localStorage.getItem('CustGuId'),
      "first_Name": this.fullName,
      "age": this.age,
      "gender": this.gender
    }

    // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/AddPatientDetails", params, { headers }).subscribe((res: any) => {
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.addPatientDetail, params).subscribe((res: any) => {

      console.log("product details data", res);
      console.log(this.relation);


    })
  }


  async openCheckOutComponent(fullName: any, age: any, gender: any) {
    console.log("name-", this.fullName);

    const modal = await this.modalController.create({
      component: CheckoutaddComponent,
      componentProps: {
        "fullName": fullName,
        "age": age,
        "gender": gender
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          console.log(data);
          if (data) {
          }
        }
      });

    return await modal.present();
  }


  onBack() {
    this.modalController.dismiss()
    //   this.loaderService.showLoader();
    //   const modal = await this.modalController.create({
    //     component: CheckoutaddComponent,
    //     componentProps: {


    //     },
    //     backdropDismiss: true
    //   });
    //   modal.onDidDismiss()

    //     .then((data) => {

    //       // this.changeBtn=true;

    //       if (data && data?.data) {
    //         console.log(data);
    //         if (data) {
    //          }
    //       }
    //     });
    //   this.loaderService.hideLoader();
    //   return await modal.present();
    // }
  }
}

