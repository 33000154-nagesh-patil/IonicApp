import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../../src/environments/environment';
import { Router } from '@angular/router';
import { AllConfigDataService, CommonService, LoaderService } from 'index';
import { Component, Input, OnInit } from '@angular/core';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { KeyValue } from '@angular/common';
import { CommonFunctionService } from 'index';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { param } from 'jquery';
import getVaultDetail from 'src/assets/vaultDetail/getVaultDetail.json'
import getVaultConfirmation from 'src/assets/vaultConfirmation/getVaultConfirmation.json'
// import getList from 'src/assets/listing/getList.json'

@Component({
  selector: 'cap-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {

  imageList = this.allConfigDataService.getConfig("images");
  // _card: any;
  // @Input() set card(val){
  //   this._card=  JSON.parse(JSON.stringify(val).replace('â‚¹', '₹').toString());
  // }
  @Input() card: any;
  @Input() Learn: any;
  @Input() Redirect: any;
  @Input() segment: any;
  bookmark:boolean  = false;
 breadCrumb:string = 'Wealth/ST';
  environment: any;
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "environment": this.allConfigDataService.getConfig('environmentType'),
  };

  @Input() routing: string;
  Invoice: Object;
  errorList: any;
  mfList: any;
  Data: any;
  CardValue:any;
  url: any = this.router.url;
  // SelectWatchlist: boolean = false;
  objectParams:any
  categoryLanding: any;
  secId: any;
  exchangeName: any;
  msg: any;
  watchListItem: any;
  selected: any;

  constructor(
    private allConfigDataService: AllConfigDataService,
    private router: Router,
    private eduService: eduService,
    private http: HttpClient,
    private loaderService: LoaderService,
    private theInAppBrowser: InAppBrowser,
    private commonService:CommonService,
    private loderservices:LoaderService

  ) { }

  ngOnInit() {
    // let card = this.card
    // setTimeout(() => {

    //   console.log(this.card,"this.card");
    // }, 2000);

    if (this.apiCatalog.environment == 'proto') {
      this.environment = true
    }

    this.eduService.categoryValueForAPI.subscribe(val => {
      // this.apiCatalog['breadCrumb'] = 'Shopping/' + val['categoryLanding'] + '/' + val['productLanding']
      console.log("Listing")
      this.routing = val['productLanding'];
      this.categoryLanding = val['categoryLanding'];
    })
    // this.eduService.productName.subscribe(data => {
    //   console.log(data)
    //   switch (data) {
    //     case 'stock':
    //       this.routing = "stock"
    //       break;
    //   }
    // })




  }

  getDetail(params,val) {
  
    this.commonService.setExchangeValue(val.ExchangeName)

    let obj={
    "id":(params?.id)?Number(params?.id):"",
    "title":(params?.title)?(params?.title):"",
    "favList":(params?.favList)?(params?.favList):"",
    "TokenId":localStorage.getItem('id_token')
  }
    this.eduService.detailParams.next(obj)
    if(this.categoryLanding == 'Health'){
      this.eduService.healthDetails.next({
        item_rate_id:params.item_rate_id,
        item_unit_id:params.item_unit_id,
        vendor_id:params.vendor_id
      })
    }
    
    if (this.Redirect == "Detail" && this.routing!='NB') {
      this.eduService.fromVault.next("False")
      this.eduService.providerName.next(params.title)
      this.router.navigate(['/Shopping/Detail'])
    } else if (this.Redirect == "newServer") {
      
      this.eduService.fromVault.next("True")


      if (this.card?.row1?.lauchUrl) {
        // this.target = (this.currentDevice === 'iOS' || this.currentDevice === 'iphone') ? '_blank' : '';
        let target = '_self';
        let options: ""
        // const browser = this.theInAppBrowser.create(this.card?.row1?.lauchUrl, target, options);
        const browser = window.open(this.card?.row1?.lauchUrl, '', 'width=400,height=200,scrollbars=yes');
      } else if (this.card?.row1?.Redirect) {
        if(this.card?.row2?.Status=="Labtest"){
          
          this.router.navigate(['/Operation/TrackOrder'],{state:{'health':this.card?.row2}})
        }else if(this.card?.row2?.Status=="Medicine"){
          this.router.navigate(['/Operation/TrackOrdermedicine'],{state:{'health':this.card?.row2}})
        }
        else{
      this.router.navigate(['/Shopping/Detail'])
        }
      } else {
      this.router.navigate(['/Shopping/Detail'])

      }
    }else if(this.Redirect =="Order" || this.routing=="NB"){
      let obj = {
        id: 1
      }
      if(this.routing!="NB"){
    this.eduService.fromVault.next("False")
      
      }else{
    this.eduService.fromVault.next("True")

      }
      this.eduService.pricePerUnit.next(obj)

      this.eduService.providerName.next(params.title)
         this.router.navigate(['/Shopping/OrderBook'])
    }
  }
  getDetailOne(params){
    if(this.Redirect=="Detail"){

    
    let obj={
      "id":(params?.id)?Number(params?.id):"",
      "title":(params?.title)?(params?.title):"",
      "favList":(params?.favList)?(params?.favList):"",
      "TokenId":localStorage.getItem('id_token')

    }
      this.eduService.detailParams.next(obj)
      this.eduService.providerName.next(params.title)
      this.eduService.fromVault.next("False")

    this.router.navigate(['/Shopping/Detail'])
  }else{
    let obj={
      "id":(params?.id)?Number(params?.id):"",
      "title":(params?.title)?(params?.title):"",
      "favList":(params?.favList)?(params?.favList):"",
      "TokenId":localStorage.getItem('id_token')

    }
      this.eduService.detailParams.next(obj)
      this.eduService.providerName.next(params.title)
      this.eduService.fromVault.next("True")

    this.router.navigate(['/Shopping/Detail'])

  }
  }

   segmentVhanged(){
    console.log(this.segment);
  }

  originalOrder = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    return 0;
  }

  getInvoice() {
    this.router.navigate(['/Fullfilment/Gold/Invoice'], { state: { transactionId: this.card?.row2.TransactionId } })
  }

  getReedem() {
    this.router.navigate(['Operation/OperationDetail'], { state: { listing: this.card.row1, listing1: this.card.row2 } })
  }
  // emptyArrayBookmark=[]
  changeBookmark(val){

    if(this.routing == 'ST'){
      this.msg=null;
      this.secId =val.row1.id.replace(/\s/g, "");
      this.exchangeName = val.row2.ExchangeName;
      this.bookmark = true;
    }
    val.row1.selectWatchList =! val.row1.selectWatchList

    // if(this.emptyArrayBookmark.includes(val)){
    //   this.emptyArrayBookmark.splice(this.emptyArrayBookmark.indexOf(val),1)
    // }
    // else{
    //   this.emptyArrayBookmark.push(val)
    // }
  }

  radioChange(e){
    this.watchListItem = e;
  }

  addWatchList(){

    let param={
      "pageNo": "",
    "rowCount": "",
    "typeName": "",
    "favList":this.watchListItem?this.watchListItem:'',
    "sort": "",
    "filter": "Add",
    "TokenId":localStorage.getItem("id_token"),
    "OtherDetails": {
        "sec_id": this.secId,
        "exch": this.exchangeName,
        "segment": "E"
    }
    }
    this.loaderService.showLoader()
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + "Shopping/" + this.breadCrumb +this.apiCatalog.createFavListAdd,param)
    .subscribe((res: any) => {
      if(res){
        this.loderservices.hideLoader()
        this.msg = res.message;
        console.log("inserted",res.message);
      }

      //this.watchListNewName.splice(this.watchListNewName.indexOf(val),1)
    })

  }
  actionClick(e){
    this.getInvoice()
    e.stopPropagation()

  }

}
