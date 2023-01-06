import { Router } from '@angular/router';
// import { CartServiceService } from './../../core/src/lib/services/cart-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { AddressDetailsComponent } from '../orderedlist/address-details/address-details.component';
import { SelectAddComponent } from '../orderedlist/select-add/select-add.component';
import { PatientDetailsComponent } from '../patient-details/patient-details.component';
import { LogarithmicScale } from 'chart.js';
import { ScheduleComponent } from '../orderedlist/schedule/schedule.component';
import { SelectPatientdetaiComponent } from '../orderedlist/select-patientdetai/select-patientdetai.component';
import { retry } from 'rxjs/operators';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { CartServiceService } from 'projects/core/src/lib/services/cart-service.service';


@Component({
  selector: 'app-checkoutadd',
  templateUrl: './checkoutadd.component.html',
  styleUrls: ['./checkoutadd.component.scss'],
})
export class CheckoutaddComponent implements OnInit {
  @Input() BuyNow:any;
  imageList: any;
  @Input() productImage:any
  currencySymbol: any;
  ifAddressAdded:any=false
  CheckAddress:any=true;
  checkUseraddress:any;
  userName:any;
  userAge:any;
  card:boolean=true;
  datas: any[];
  getCurrency:any;
  rupeesSymbol:any;
  InitialPrice:any = 0;
  dataAdd:any;
  @Input() name:any
  @Input() data:any;
  freshData:any;

  //@Input() dataForOrderSummary:any

  @Input() showQuantity:any
  @Input() fullName
  @Input() age
  @Input() gender
  @Input() city
  @Input() state
  @Input() adressForm
  userGender: any;
  cityName: any;
  stateName: any;
  dataForOrderSummorOrderSumary: any;
  line1: any;
  line2: any;
  line3: any;
  line4: any;
  line5: any;
  line6:any;
  line7:any;
  changedData: any;
   patientData: any;
    addressData: any;
  @Input() productDetails: any;
  @Input() productWithMultipleDetails: any;
  apiCatalog: any;
  breadCrumb: string;
  appEnviron: any;
  // localStorage: any;


  constructor(private router:Router, private allconfigDataService:AllConfigDataService,public modalController: ModalController,
    private loaderService: LoaderService,private http:HttpClient, private cartService: CartServiceService, private commonservice: CommonService) {

      this.apiCatalog={
        ...this.allconfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allconfigDataService.getConfig('environmentType');
      this.breadCrumb='Shopping/Health/Lab';
    }

  ngOnInit() {
    // console.log("---------------->",this.adressForm);
    // if(this.dataForOrderSummary.fullname.length>0)this.getPatientDetails();
    // if(this.dataForOrderSummary.pincode.length>0)this.getAddressDetails();
    this.getPatientDetails();
    this.getAddressDetails();
    this.stateName=this.state
    this.cityName =this.city


this.datas = this.cartService.getCartItems();


// console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa",this.datas.length);
// console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaa",this.datas[1].product1[0].item_rate)
// this.InitialPrice = this.datas[0].product1[0].item_rate;
// this.dataAdd = this.datas[0].product1[0].item_rate + this.datas[1].product1[0].item_rate


    // this.userName = this.fullName
    // console.log(this.userName);
    // this.getPatientDetails();

    // this.userGender = this.gender
    // this.userAge = this.age
    this.imageList=this.allconfigDataService.getConfig('images')
    this.getCurrency=this.allconfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol=this.getCurrency['IND']['currencySymbol'];
    console.log("Full Name & Age--> " + this.fullName + this.age);
    this.totalPrice();

    // this.http.get("http://uat.torusdigital.in/api/v1/Call/Shopping/Health/Get/PatientDetails").subscribe(async (res:any) => {
    //   this.dataForOrderSummary.fullname=res[res.length-1].name;
    //   this.dataFmary.age=res[res.length-1].age;
    //   this.dataForOrderSummorOrderSumary.gender=res[res.length-1].gender;
    // })

    // this.http.get("http://uat.torusdigital.in/api/v1/Call/Shopping/Health/Lab/Get/CustomerAddressDetails").subscribe(async (res:any) => {
    //   this.dataForOrderSummary.address1=res[res.length-1].addressLine1
    //   this.dataForOrderSummary.address2=res[res.length-1].addressLine2
    //   this.dataForOrderSummary.pincode=res[res.length-1].pincode
    //   this.dataForOrderSummary.city=res[res.length-1].city
    //   this.dataForOrderSummary.state=res[res.length-1].state
    //   this.dataForOrderSummary.phoneNumber=res[res.length-1].mobileNumber
    // })
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


  handleRemove(){

    this.datas.splice(this.datas.indexOf(this.datas), 1);
              // rerender your array
              //  this.data = [...this.data];
              //  this.cardCount = this.data.length;
           }


      getPatientDetails() {
      let headers: HttpHeaders = new HttpHeaders({
        "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
      });
      let params = {
        "CustGuId":localStorage.getItem('CustGuId')
      }
        // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/GetPatientDetails", params, { headers }).subscribe(async (res: any) => {
        this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getPatientDetail, params, { headers }).subscribe(async (res: any) => {
        console.log("patient Detail--------------------------------->", res);
              this.dataForOrderSummary.fullname=res.data[0].first_Name;
              this.dataForOrderSummary.age=res.data[0].age;
              this.dataForOrderSummary.gender=res.data[0].gender;
              // this.dataForOrderSummary.patientId = res.data[res.data.length-1].patientId;
      })
      }

  getAddressDetails(){
    let headers: HttpHeaders = new HttpHeaders({
          "Token" : "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
        });
        let params={

          "CustGuId":localStorage.getItem('CustGuId'),

        }

        // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/GetPatientAddress",params,{headers}).subscribe((res:any)=>{
        this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getPatientAddress,params,{headers}).subscribe((res:any)=>{

        console.log("Address details data==========>", res);
        this.dataForOrderSummary.address1 = res.data[0].addressLine1;
        this.dataForOrderSummary.address2 = res.data[0].addressLine2;
        this.dataForOrderSummary.address3 = res.data[0].addressLine3;
        this.dataForOrderSummary.pincode = res.data[0].pincode;
        this.dataForOrderSummary.city = res.data[0].city;
        this.dataForOrderSummary.state = res.data[0].state;
        this.dataForOrderSummary.country = res.data[0].country;

        })
  }

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

          // this.line1 =data.data.addressLine1;
          // this.line2 = data.data.addressLine2;
          // this.line3 = data.data.addressLine3;
          // this.line4 = data.data.pincode;
          // this.line5 = data.data.city;
          // this.line6 = data.data.state;
          // this.line7 = data.data.country;
          // this.dataForOrderSummary.address1=data.data.addressLine1
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  // addressTrue(){
  //   if(!this.ifAddressAdded){
  //     this.openSelectAddress()
  //   }
  // }


  async addressTrue(){
   this.modalController.dismiss()

    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: ScheduleComponent,
      componentProps: {
        // patientData:this.changedData,
        // addressData:this.data.data,
        // "FreshData": this.freshData,
        // "FreshPatientData": this.changedData,
        "FreshData": this.dataForOrderSummary,
        // "FreshPatientData1": this.
        "productDetails":this.productDetails,
        "productWithMultipleDetails":this.productWithMultipleDetails
      },
      backdropDismiss: false
    });

    modal.onDidDismiss()
      .then((data) => {
        console.log(data);
        if (data && data?.data) {
          console.log(data);
          if (data) {
           }
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  async openPatientDetails(){
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
          console.log("FullName",data.data.fullName);
          this.dataForOrderSummary.fullname=data.data.fullName
          this.dataForOrderSummary.age=data.data.age
          this.dataForOrderSummary.gender=data.data.gender
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  async openPatientDetailsChage(){
    this.loaderService.showLoader();
    const modal = await this.modalController.create({

      component: SelectPatientdetaiComponent,
      componentProps: {
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {

       this.changedData=data.data
      //  this.dataForOrderSummary=this.changedData

    this.dataForOrderSummary.fullname=this.changedData.first_Name

      //  console.log("llllllllllllllllllllllllllllllllllll",this.changedData);

      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  async openPatientAddress(){
    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: AddressDetailsComponent,
      componentProps: {
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
       {

          // console.log(data.data.addressLine1);
          // this.dataForOrderSummary.address1=data.data.addressLine1
          // this.dataForOrderSummary.address2=data.data.addressLine2
          // this.dataForOrderSummary.phoneNumber=data.data.mobileNo
          // this.dataForOrderSummary.pincode=data.data.pincode
          // this.dataForOrderSummary.city=data.data.city
          // this.dataForOrderSummary.state=data.data.state
          // this.checkUseraddress.pincode=data.data.pincode

        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  async openPatientAddressChange() {

    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: SelectAddComponent,
      componentProps: {
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          console.log("Save data", data.data);
          this.freshData = data.data;
          this.dataForOrderSummary.address1 =data.data.addressLine1;
          this.dataForOrderSummary.address2 =data.data.addressLine2;
          this.dataForOrderSummary.address3 =data.data.addressLine3;
          this.dataForOrderSummary.pincode =data.data.pincode;
          this.dataForOrderSummary.city =data.data.city;
          this.dataForOrderSummary.state = data.data.state;
          this.dataForOrderSummary.country = data.data.country;

          if (data) {

          //   this.CheckAddress=false
          //   this.checkUseraddress=data.data.value
          //   this.ifAddressAdded=false

           }
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  dismiss(){
this.modalController.dismiss()
this.router.navigate(['explore-lab-health'])
  }

  dataForOrderSummary={
    id:"1",
    medicineName:"Glucose - Fasting",
    provider:"Also known as Fasting Blood Sugar",
    provider1:"By Metropolis Healthcare Ltd. • Pathology Test",
    purchaseDate:"11 Mar 2022, 4:55 PM via UPI",
    orderId:"P005047498547",
    timeSlot:"16th March, 01:00 PM - 02:00 PM",
    estimatedDate:"20-40 hrs",
    testNo:"1",
    price:"₹120.00",
    orderQuantity:"1",
    msg:"Yay! You've saved ₹50 on your shopping",
    transactionsID:"A-hm-FH374-Fghk-34789",
    shippingCharge:"₹10.00",
    total:"₹360.00",
    remove:"Remove",
    userMobioleNo:"9810806463",
    address1:"",
    address2:"",
    phoneNumber:"",
    country:"",
    // patientName:this.fullName,
    // age:this.age,
    gender:"",
    state:"",
    city:"",
    pincode:"",
    fullname:"",
    age:"",
    address3:"",
    quantity:"",
    patientId:"",
    item_rate_id:"",
  }

  removeElement(){
this.card=false;
  }


  addtoglobalCart() {
    let params = {
      // "TokenId": this.commonservice.getToken(),
      // "productType": "Health",
      // "ProductSchemeID": "",
      // "ProductName": this.title,
      // "OrderType": "buy",
      // "Quantity": 1,
      // "UnitPrice": this.product.product1[0].item_rate,
      // "TotalAmount": this.product.product1[0].item_rate,
      // "OfferID": 2,
      // "Discount": 12.12,
      // "CGST": 5.1,
      // "SGST": 5.1,
      // "IGST": 1.1,
      // "FinalAmount": this.product.product1[0].item_rate + this.product.product1[1].item_rate + this.product.product1[2].item_rate,
      // "IsActive": 1,
      // "DataScource": "",
      // "DeviceIP": "",
      // "DeviceID": "",
      // "Flag": "ADD",
      // "ImageURL": this.imageList?.thyroCare,
      // 'DiscountAmount':"",
      // 'OrderStatus':"",
      // 'Patient_id':"",
      // 'DiscountPercent':"18%",
      // 'ScheduleEvent':"",
      // 'PartnerContactID':"",
      // 'BranchId':"",
      // 'BranchName':"",
    }

    // this.http.post('https://apixdev.heytorus.com/api/v1/Dummy/general/operate/cart', params).pipe(retry(8)).subscribe(async (res: any) => {
      // this.commonservice.globalCart(params).pipe(retry(8)).subscribe(async (res: any) => {
      // console.log(res);
      // this.header.cartData++;
    // })
  }

}

