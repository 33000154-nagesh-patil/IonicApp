// import { HeaderComponentComponent } from './../../../../../education-library/src/lib/components/header-component/header-component.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { CheckoutaddComponent } from 'projects/orderedlist/checkoutadd/checkoutadd.component';
// import labTestData from 'src/assets/labTestData.json';
import { CartComponent } from '../cart/cart.component';
// import productList from 'src/assets/productList.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';
import { CommonService } from '../../services/common.service';
import { CommonFunctionService } from '../../services/common-function.service';
// import { CartServiceService } from '../../services/cart-service.service';
import { CartEmpComponent } from '../cart-emp/cart-emp.component';
import { retry } from 'rxjs/operators';
import { CheckoutaddComponent } from 'projects/orderedlist/checkoutadd/checkoutadd.component';
import { CartServiceService } from '../../services/cart-service.service';



@Component({
  selector: 'lib-product-desc-lab',
  templateUrl: './product-desc-lab.component.html',
  styleUrls: ['./product-desc-lab.component.scss'],
})

export class ProductDescLabComponent implements OnInit {

  imageList: any;
  data: any;
  getCurrency: any;
  rupeesSymbol: any;
  cardCount: any = 0;
  product: any;
  //  errorList: any;
  title: any;
  logo: any
  description: any;
  price: any;
  report: any;
  discountedprice: any;
  collectioncharges: any;
  certificationanme: any;
  samplerequired: any;
  preparations: any;
  summary: any;
  offers: any;
  frequentlyasked: any;
  @Input() name: any;
  @Input() productId: any;
  cartItem: boolean = false;
  res: any;
  @Input() PinCode: any;


  // @ViewChild('header') header: HeaderComponentComponent;
  id: any;
  @Input() productDetails: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;

  constructor(private modalCtrl: ModalController, private commonFunctionService: CommonFunctionService,
    private loaderService: LoaderService, private http: HttpClient, private allConfigDataService: AllConfigDataService,
  private router: Router, private cartService: CartServiceService, private commonservice: CommonService) {
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Health/Lab';
  }

  ngOnInit() {

    console.log("NAME", this.name);
    this.getProductDesc();
    // this.product = productList;
    // this.data = labTestData;
    this.imageList = this.allConfigDataService.getConfig('images');
    this.getCurrency = this.allConfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol = this.getCurrency['IND']['currencySymbol'];

  }


  goToBack() {
    this.modalCtrl.dismiss()
  }



  // async handleOnAddForCarts() {
    // this.addtoglobalCart()
    // this.cartItem = true;

    // //   if(this.cardCount == 0){
    // //   this.cardCount = this.cardCount + 1;
    // // }

    // this.cardCount++;
    // console.log(this.cardCount);

    // // else{
    // //   this.cardCount = 1;
    // // }

    // // this.cartService.addToCart(this.product);
    // // this.addtoglobalCart();


    // this.modalCtrl.dismiss()
    // const modal = await this.modalCtrl.create({
    //   component: CheckoutaddComponent,
    //   componentProps: {
    //     'imageList': this.imageList,
    //     'BuyNow': "False",
    //   },
    //   backdropDismiss: false
    // });
    // modal.onDidDismiss()
    //   .then((data) => {
    //     console.log(data);

    //   });
    // // this.loaderService.hideLoader();
    // return await modal.present();
  // }

  handleOnAdd(){
    this.cartItem = true;

  //   if(this.cardCount == 0){
  //   this.cardCount = this.cardCount + 1;
  // }

  this.cardCount++;
  console.log(this.cardCount);

  // else{
  //   this.cardCount = 1;
  // }

    this.cartService.addToCart(this.product);

  }



  // addtoglobalCart(){
  //   let params = {
  //     "TokenId": this.commonservice.getToken(),
  //     "ProductSchemeID": parseInt(this.id),
  //     "ProductName":  this.title,
  //     "OrderType": "buy",
  //     "Quantity": 1,
  //     "UnitPrice":this.price.toFixed(2).toString(),
  //     "TotalAmount": this.price.toFixed(2).toString(),
  //     "OfferID": 2,
  //     "Discount": 12.12.toFixed(2).toString(),
  //     "CGST": 5.1.toFixed(2).toString(),
  //     "SGST": 5.1.toFixed(2).toString(),
  //     "IGST": 1.1.toFixed(2).toString(),
  //     "FinalAmount": this.price.toFixed(2).toString(),
  //     "IsActive": 1,
  //     "DataScource": "",
  //     "DeviceIP": "",
  //     "DeviceID": "",
  //     "ImageURL": this.imageList?.thyroCare,
  //     "author": "",
  //     "rating": 4.5.toFixed(2).toString(),
  //     "level": "",
  //     "EducationType": "",
  //     "productType": "Health",
  //     "Flag": "ADD",
  //     "OrderDetailGuId": "",
  //     "OrderGuId": "",
  //     "DiscountAmount": "0.0",
  //     "OfferingGuId": "",
  //     "ProductId": 1,
  //     "OrderStatus": "",
  //     "Patient_id": 0,
  //     "DiscountPercent": "0.0",
  //     "ScheduleEvent": "",
  //     "PartnerContactID": "",
  //     "BranchId": 1,
  //     "BranchName": "",
  //     "Remarks": "",
  //     "Units": "0.0",
  //     "MetalType": "",
  //     "Weight": "0.0",
  //     "PricePerGram": "0.0",
  //     "BlockId": "",
  //     "Purity": "",
  //     "InvoiceNumber": ""
  //   }
  //   var paramsPayload = JSON.parse(JSON.stringify(params));
  //   this.commonservice.globalCart(paramsPayload).pipe(retry(3)).subscribe(async (res:any) => {
  //   this.header.cartData++;
  //   })
  // }





  // async CartCompo() {
  //   this.modalCtrl.dismiss();
  //   this.commonservice.setPath(this.router.url);
  //   this.router.navigate(['/cart'])

  // }







  async handleOnClick() {

    this.modalCtrl.dismiss()
    const modal = await this.modalCtrl.create({
      component: CartComponent,
      componentProps: {

        'imageList': this.imageList,
        // 'name': this.title
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);

      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }

  async handleClick() {

    this.modalCtrl.dismiss()

    const modal = await this.modalCtrl.create({
      component: CheckoutaddComponent,
      componentProps: {
        'imageList': this.imageList,
        'BuyNow': "True",
        'productDetails':this.productDetails,
        'productWithMultipleDetails':this.product
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);

      });
    // this.loaderService.hideLoader();
    this.cartService.addToCart(this.product);
    this.modalCtrl.dismiss()
    return setTimeout(() => {
       modal.present();
    }, 500);
  }

  async handleEmpty() {
    this.modalCtrl.dismiss()
    const modal = await this.modalCtrl.create({
      component: CartEmpComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);

      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }


  // getProductDesc(){

  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token" : "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
  //   });
  //   let params={
  //     "productid":this.id
  //   }

  //   this.http.post("http://uat.torusdigital.in/api/v1/Call/Shopping/Health/Lab/LabTestProduct/Descriptions",params,{headers}).subscribe(
  //     (res: any) => {
  //         console.log("Product description details", res)
  //        this.product=res;
  //        this.title=this.product.title;
  //      this.logo=this.product.log;
  //      this.name=this.product.name;
  //      this.price=this.product.price;
  //      this.discountedprice=this.product.discountedprice;
  //      this.collectioncharges=this.product.collectioncharges;
  //      this.certificationanme=this.product.certificationanme;
  //      this.frequentlyasked=this.product.frequentlyasked;
  //        console.log("title",);
  //       }, (error: any) => {
  //         this.errorShow(error?.Message, "productList -> Http request");
  //       })
  //     }

  // errorShow(message, functionName) {
  //   this.loaderService.hideLoader();
  //   this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
  // }


  getProductDesc() {

    let itemDetail = {
    "name": "FASTING BLOOD SUGAR",
    "description": "Also Known as Fasting Blood Sugar",
    "ereportwithin": "20-40 hours",
    "samplerRequired": "Blood",
    "preparations": "Do not eat drink anything other than water for 8-12 hours before the test",
    "summary": "Fasting Blood Sugar,aslo called the Fasting Plasma Gluose test,measures your fasting blood glucose level.Fasting means you should not eat or drink for 8 hours",
    "offer": "Flat 18% Off on all Lab Test booking"
    }

    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
    });
    let params = {

      "app": "BHealthy",
      "action": "LoadLogics",
      "url": "apps/ShoppersSpot/Items/item.frm",
      "p1": "name",
      "v1": this.name,
      "session_id": "81703207"
    }

    // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/ProductDetails", params, { headers }).subscribe((res: any) => {
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getDetail, params).subscribe((res: any) => {


      console.log("product details data", res);
      this.product = res;
      this.title = this.name;
      console.log("product details data", res.itemList[0].item_rate);
      this.price = res.itemList[0].item_rate;
      this.id=res.itemList[0].item_rate_id
      this.description = itemDetail.description;
      this.report = itemDetail.ereportwithin;
      this.samplerequired = itemDetail.samplerRequired;
      this.preparations = itemDetail.preparations;
      this.summary = itemDetail.summary;
      //  this.offers=this.product.offer;
    })
  }

}
