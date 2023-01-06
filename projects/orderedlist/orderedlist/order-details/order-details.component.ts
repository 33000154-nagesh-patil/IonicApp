import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ModalController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  imageList: any;
  mfFooterData: any;
  valMy
// @Input()  dataForOrderDetails:any
@Input() OrderId:any;
  name: any;
  OrderDetailId: any;
  price: any;
  UserName: any;
  UserAddress: any;
  UserAddress1: any;
  UserAddress2: any;
  UserAddress3: any;
  pincode: any;
  city: any;
  state: any;
  country: any;


  constructor(private http: HttpClient, private allconfigDataService:AllConfigDataService,public modalController: ModalController) {
    this.mfFooterData =  this.allconfigDataService.getConfig('labTest');


   }


  dismiss(){
    this.modalController.dismiss()
  }

  getHealthMainPage(e){
    this.modalController.dismiss(e);
  }

  ngOnInit() {
    console.log("=================================>",this.OrderId);

    this.getuserOrderDesc();
    this.imageList=this.allconfigDataService.getConfig('images')

  }
  dataForOrderDetails={
    medicineName:"Glucose - Fasting",
    purchaseDate:"11 Mar 2022, 4:55 PM via UPI",
    orderId:"P005047498547",
    timeSlot:"16th March, 01:00 PM - 02:00 PM",
    estimatedDate:"13 March 2022",
    price:"₹110.00",
    orderQuantity:"1",
    msg:"Yay! You've saved ₹50 on your shopping",
    transactionsID:"A-hm-FH374-Fghk-34789",
    collectionCharges:"₹10.00",
    total:"₹360.00",
    userName:"Pratik Vasant Goswami",
    userAddress:"Shop No.1 to 05,Ground Floor, Kinjal Paradise, Plot No.43, Andheri west, Maharashtra 402010",
    userMobioleNo:"9810806463"
  }


  getuserOrderDesc() {

    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
    });

    let params = {
      "OrderGuId": this.OrderId,
    }

    this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/GetOrderDetail", params, { headers }).subscribe((res: any) => {

      console.log("order detail data===================>", res);

      // this.dataForOrderDetails.medicineName = res[0].productName;
      // console.log(this.dataForOrderDetails.medicineName);

      this.name = res[0].productName;
      this.OrderDetailId =res[0].orderGuId;
      console.log(this.OrderDetailId);
       
      this.price = res[0].totalamount
      this.UserName = res[0].firstName
      this.UserAddress1 = res[0].addressLine1
      this.UserAddress2 = res[0].addressLine2
      this.UserAddress3 = res[0].addressLine3
this.pincode = res[0].pincode;
this.city = res[0].city
this.state=res[0].state
this.country = res[0].country
      // "pincode": "400071",
      // "city": "MUMBAI",
      // "state": "Maharashtra",
      // "country": "India
      
      // this.product = res;
      // this.title = res.name;
      // console.log("product details data", res.product1[0].item_rate);
      // this.price = res.product1[0].item_rate;
      // this.id=res.product1[0].item_rate_id
      // this.description = res.description;
      // this.report = res.ereportwithin;
      // this.samplerequired = res.samplerRequired;
      // this.preparations = res.preparations;
      // this.summary = res.summary;
      //  this.offers=this.product.offer;

    })
  }

}
