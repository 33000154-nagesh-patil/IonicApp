import { AllConfigDataService } from 'index';
import { HttpClient } from '@angular/common/http';
import { Component, Input, NgIterable, OnInit, ViewChild } from '@angular/core';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { HealthService } from 'SuperApp/Shopping/Services/health.service';
import { MFService } from 'SuperApp/Shopping/Services/mf.serrvice';
import { BasketComponent } from './basket/basket.component';
import { ExtraOptions, Router } from '@angular/router';


@Component({
  selector: 'app-global-cart',
  templateUrl: './global-cart.component.html',
  styleUrls: ['./global-cart.component.scss'],
})
export class GlobalCartComponent implements OnInit {
  globalCart={}
  imageList: any;
  apiCatalog=this.allConfigDataService.getConfig("apiCatalog")
  env=this.allConfigDataService.getConfig("environmentType")
  cartCount
title='My Cart'
  breadCrumb: string;

constructor(
  private eduService:eduService,
  private healthService:HealthService,
  private mfService:MFService,
  private http:HttpClient,
  private router:Router,
  private allConfigDataService:AllConfigDataService,
  ) {
    this.eduService.categoryValueForAPI.subscribe((obj) => {
      // val["categoryLanding"] +"/"+ val["productLanding"]
      if(obj["productLanding"])this.breadCrumb = obj["categoryLanding"] + "/" + obj["productLanding"]
      else if(obj["categoryLanding"])this.breadCrumb = obj["categoryLanding"]
      // console.log("BreadCrumb: " + this.breadCrumb)

    });
   }
  
  ngOnInit() {

    this.imageList = this.allConfigDataService.getConfig('images');
    let params ={
      "TokenId": localStorage.getItem("id_token"),
      "Flag": "Get"
  }
    this.http.post(this.apiCatalog.baseURL[this.env]+"Shopping/"+ this.breadCrumb+this.apiCatalog.getCartDetails,params)
    .subscribe(async (res:any) => {

      this.globalCart=res;

    })
  }
  removeFromCart(item){
    console.log(item);
    let params ={
      "TokenId":localStorage.getItem("id_token"),
      "OrderSetId":item.value.orderSetId.toString(),
    }
    this.http.post(this.apiCatalog.baseURL[this.env]+"Shopping/"+
     this.breadCrumb+"/placeCart?removeCart", params)
    .subscribe(async (res:any) => {})
    this.globalCart[item.name] = this.globalCart[item.name].filter(x=>x!=item.value)
    this.basketArrays()
  }
  goBack(){
    window.history.back();
  }
  allCheckout() {
    let arr = [];
    this.eduService.messageSource.next([])
    for(let x in this.globalCart){
      for(let i of this.globalCart[x]){
        arr.push(i)
      }
    }
    this.eduService.setCartData(arr)
    this.router.navigate(['Fullfilment/Checkout'])
  }
  gotoTorusClub(){
    this.router.navigate(['Engagement/EngagementTorusClub/torusclub'])
  }
  basketArrays():any{
    let arr =[];
    for(let x in this.globalCart){
      for(let s of this.globalCart[x]){
        arr.push(s)
      }
    }
    this.cartCount=arr.length;
    this.title="My Cart("+this.cartCount+" items)"
  return arr
  }

  continueShopping(){
    this.router.navigate(['Shopping/listing']);
  }

}

