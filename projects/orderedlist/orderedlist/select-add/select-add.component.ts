import { Component, OnInit,Input } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { AddressDetailsComponent } from '../address-details/address-details.component';
import { SummaryComponent } from '../summary/summary.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-select-add',
  templateUrl: './select-add.component.html',
  styleUrls: ['./select-add.component.scss'],
})
export class SelectAddComponent implements OnInit {
  imageList:any;
  checkUseraddress: any;
  dataDetail: any;
  dataDetail1: any;
  dataDetail2: any;
  dataDetail4: any;
  dataDetail3: any;
  dataDetail5: any;
  line1: any;
  line2: any;
  line3: any;
  line4: any;
  line5: any;
  line6: any;
  line7: any;
  data:any;
  addressData: any;
  modal: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: any;
// @Input() dataForAddressSelection:any
  constructor(private http: HttpClient, private allconfigDataService:AllConfigDataService,public modalController: ModalController,private loaderService: LoaderService) {
    this.apiCatalog={
      ...this.allconfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allconfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Health/Lab';
  }


  dataForAddressSelection=[
    {
    ID:"1",
  addressType:"Home",
  name:"Swapnil Vashant joshi",
  phoneNumber:"9810806462",
  addresstoSelect:"ICC Chamber,Saki Vihar Rd, Muranjan Wadi,Marol,Powai,Mumbai,Maharashtra,400072.",
  },
  {
    ID:"2",
    addressType:"Office",
    name:"Swapnil Vashant joshi",
    phoneNumber:"9810806462",
    addresstoSelect:"ICC Chamber,Saki Vihar Rd, Muranjan Wadi,Marol,Powai,Mumbai,Maharashtra,400072.",
  }
]

chosenItemForAddressType = this.dataForAddressSelection[0].addressType;

deleteAddress(status:any){
  this.dataForAddressSelection.forEach((element,index) => {
    if(element.ID===status){
      delete this.dataForAddressSelection[index];
    }


  });
  console.log(this.dataForAddressSelection)
  console.log(status);

}

item(data){
  this.addressData = data
console.log("=====================>",data);
}

// async openSlotPage() {
//   this.loaderService.showLoader();
//   const modal = await this.modalController.create({
//     component: SummaryComponent,
//     componentProps: {

//     },
//     backdropDismiss: false
//   });
//   modal.onDidDismiss()
//     .then((data) => {
//       if (data && data?.data) {

//       }
//     });
//   this.loaderService.hideLoader();
//   return await modal.present();
// }

async openAddressPage() {
  this.loaderService.showLoader();
  const modal = await this.modalController.create({
    component: AddressDetailsComponent,
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

// openSlotPage(){
//   this.modal.dismiss(this.addressData);
// }


// getAddressDetails() {
//   let headers: HttpHeaders = new HttpHeaders({
//     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
//   });
//   let params = {
//     "CustGuId": "C83AD32B-F173-413E-9940-0C526F3560B7"
//   }
//   this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/GetPatientAddress", params, { headers }).subscribe(async (res: any) => {
//     // console.log("New product list data", res);


//     console.log("Address Detail--------------------------------->", res);

//     this.dataDetail= res[0].addressLine1;
//     this.dataDetail1= res[0].addressLine2;
//     this.dataDetail2= res[0].pincode;
//     console.log( this.dataDetail2);

//     this.dataDetail3= res[0].city;
//     this.dataDetail4= res[0].state;

//     this.dataDetail5= res[0].country;





//     // this.data = res[0]

//   }, (error: any) => {
//     this.errorShow(error?.message, "productList --> Http request");
//   }
//   )

// }
//   errorShow(message: any, arg1: string) {
//     throw new Error('Method not implemented.');
//   }


  ngOnInit() {
    this.getAddressDetails()
    this.imageList=this.allconfigDataService.getConfig('images')


  }

  closeSelectPage(){
    this.modal.dismiss();
  }


  openSlotPage(){
    this.modal.dismiss(this.addressData);
  }


  getAddressDetails(){
    let headers: HttpHeaders = new HttpHeaders({
          "Token" : "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
        });
        let params={

          "CustGuId":localStorage.getItem('CustGuId'),

        }

        // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/GetPatientAddress",params,{headers}).subscribe((res:any)=>{
        this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getPatientAddress, params).subscribe((res:any)=>{


        console.log("Address details data==========>", res.data);

        this.data = res.data;

        })
  }

}
