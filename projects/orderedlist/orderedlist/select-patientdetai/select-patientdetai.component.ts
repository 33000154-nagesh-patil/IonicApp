import { CheckoutaddComponent } from 'projects/orderedlist/checkoutadd/checkoutadd.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, OnInit } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { PatientDetailsComponent } from 'projects/orderedlist/patient-details/patient-details.component';

@Component({
  selector: 'app-select-patientdetai',
  templateUrl: './select-patientdetai.component.html',
  styleUrls: ['./select-patientdetai.component.scss'],
})
export class SelectPatientdetaiComponent implements OnInit {
imageList:any;
modal: any;
checkUseraddress: any;
  dataForPatientSelection: any;
  patientData: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;

constructor(private http:HttpClient, private allconfigDataService:AllConfigDataService, private modalController: ModalController, private loaderService: LoaderService) {

  this.apiCatalog={
    ...this.allconfigDataService.getConfig('apiCatalog'),
  };
  this.appEnviron = this.allconfigDataService.getConfig('environmentType');
  this.breadCrumb='Shopping/Health/Lab';
 }

//   dataForPatientSelection=[
//     {
//     ID:"1",

//   name:"Swapnil Vashant joshi",
//   age:"35",
//   gender:"male",
//   },
//   {
//     ID:"2",

//     name:"Swapnil Vashant joshi",
//     age:"34",
//     gender:"male",
//   }
// ]


  ngOnInit() {
    this.getPatientDetails();

    this.imageList=this.allconfigDataService.getConfig('images');
  }


  //  getPatientDetail(){
  //    this.http.get("http://uat.torusdigital.in/api/v1/Call/Shopping/Health/Get/PatientDetails").subscribe(async(res:any)=>{
  //     console.log("patient Detail", res);
  //     this.dataForPatientSelection = res;
  //    })
  //  }

  //  chosenItemForAddressType = this.res.first_Name;


   deleteAddress(status:any){
    this.dataForPatientSelection.forEach((element: { ID: any; },index: any) => {
      if(element.ID===status){
        // delete this.dataForPatientSelection[index];
        this.dataForPatientSelection.splice(index,1)
      }


    });
    console.log(this.dataForPatientSelection)
    console.log(status);

  }

  item(data){
    this.patientData = data
console.log("=====================>",data);

  }
  // async openSlotPage() {

  //   this.loaderService.showLoader();
  //   const modal = await this.modalController.create({
  //     component: CheckoutaddComponent,
  //     componentProps: {

  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //       if (data && data?.data) {

  //   // this.modal.dismiss(this.patientData);
  //   data = this.patientData;

  //       }
  //     });
  //   this.loaderService.hideLoader();
  //   return await modal.present();
  // }

  goToBack(){
    this.modal.dismiss();
  }

  openSlotPage(){
    this.modal.dismiss(this.patientData);
  }

  async openDetailPage() {
    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: PatientDetailsComponent,
      componentProps: {
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          console.log("Save data");
          if (data) {

            this.checkUseraddress=data.data.value

          }
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }




  getPatientDetails() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
    });
    let params = {
      "custGuId":localStorage.getItem('CustGuId')
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getPatientDetail, params, { headers }).subscribe(async (res: any) => {
      // console.log("New product list data", res);


      console.log("--------------------------------->", res.data);
      // this.data = res[0]
      this.dataForPatientSelection = res.data;

    },
    )

  }


}
