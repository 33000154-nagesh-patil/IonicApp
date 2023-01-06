import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit,Input } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { MyordersComponent } from '../myorders/myorders.component';
import { LabTestComponent } from 'projects/core/src/lib/components/lab-test/lab-test.component';
import { CartServiceService } from 'projects/core/src/lib/services/cart-service.service';



@Component({
  selector: 'app-success-details',
  templateUrl: './success-details.component.html',
  styleUrls: ['./success-details.component.scss'],
})
export class SuccessDetailsComponent implements OnInit {
  imageList: any;
  datas: any[];
  InitialPrice:any = 0;
  @Input() transactionId:any;
  @Input() transactonHealth:any;
  @Input() trans:any;
  abc: any;
  OrderDetailData: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;

// @Input() dataForSuccess:any
  constructor(private http: HttpClient, private router: Router, private allconfigDataService:AllConfigDataService,private clipboard: Clipboard,private modalController:ModalController,private loaderService:LoaderService,private cartService: CartServiceService) {

    this.apiCatalog={
      ...this.allconfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allconfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Health/Lab';
   }

  ngOnInit() {

    this.getOrderDetailApi();
    this.imageList=this.allconfigDataService.getConfig('images')
  console.log(this.transactionId,'=======================rgftffgfdfgbdfgfgfgfgffgfg');
  this.abc = this.trans;
  console.log(this.abc,'rgftffgfdfgbdfgfgfgfgffgfg');

this.datas = this.cartService.getCartItems();
this.totalPrice();
console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa",this.datas.length);
console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa",this.datas[1].product1[0].item_rate)
  }


  totalPrice(){
    if(this.datas.length == 1){
      this.InitialPrice += this.datas[0].itemList[0].item_rate
      console.log(this.InitialPrice);

    }
    else{
      for(var i = 0; i < this.datas.length; i++){
        this.InitialPrice += this.datas[i].itemList[0].item_rate
        }
    }

    }


  async openOrderComponent() {

    this.modalController.dismiss();
    this.router.navigate(['/trackOrder'])

  }



  copyText(textToCopy: string) {

    this.clipboard.copy(this.dataForSuccess.transactionId);
}

  dismiss(){
    this.modalController.dismiss()
  }


  dataForSuccess={
    medicineTitle:"Glucose - Fasting",
    medicineName:"by Metropolis Lab",
    purchaseDate:"13 Mar 2022, 4:55 PM via UPI",
    userName:"Swapnil Vasant Joshi",
    userAddress:"Shop No.1 to 05,Ground Floor, Kinjal Paradise, Plot No.43, Andheri west, Maharashtra 402010",
    estimatedDate:"14 Mar 2022, 01:00 PM - 02:00 PM",
    price:"₹13.00",
    transactionId:'',

    // "orderGuId": "B7905F0D-AA8E-46ED-9097-E06801B0E916",
    // "patientId": 11,
    // "addressDetailId": 67,
    // "custGuId": "671AE4D8-8627-4493-8A8E-019AEAEC60B8",
    // "amount": 656.0,
    // "cgstAmount": 2.0,
    // "sgstAmount": 3.0,
    // "igstamount": 4.0,
    // "totalamount": 700.0,
    // "discountamount": 20.0,
    // "discountpercent": 30.0,
    // "productName": null,
    // "offeringguid": "71551928-E69B-4214-9EC3-BB5431A9D61C",
    // "productid": "XXX777",
    // "units": 29.0,
    // "productimage": "Very Good",
    // "productdescription": null,
    // "vendorid": "Himbdhjd653523",
    // "vendorname": "asdfghjkl"

  }


  handleClick(){

    this.modalController.dismiss();
    this.router.navigate(['/explore-lab-health']);

  }


  getOrderDetailApi() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
    });
    let params =  {
      "OrderGuId":"B7905F0D-AA8E-46ED-9097-E06801B0E916"
      }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getOrderDetail, params).subscribe((res: any) => {
      // console.log("New product list data", res);
// this.loaderService.showLoader()
console.log("--------------------------->", res);
      // this.dataForSuccess = res;
// this.loaderService.hideLoader()

    },
    )

  }





  // async handleClick() {
  //   this.loaderService.showLoader();
  //   const modal = await this.modalController.create({
  //     component: LabTestComponent,
  //     componentProps: {
  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //       if (data && data?.data) {
  //         console.log(data);
  //         if (data) {
  //         }
  //       }
  //});
  //   this.loaderService.hideLoader();
  //   return await modal.present();
  // }

}
