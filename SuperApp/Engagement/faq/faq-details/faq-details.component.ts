import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Navigation } from 'swiper';
import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'index';
// import faqDetail from '../../../src/assets/faqDetail.json'
import { Router } from '@angular/router';
// import  angular from "angular";

@Component({
  selector: 'app-faq-details',
  templateUrl: './faq-details.component.html',
  styleUrls: ['./faq-details.component.scss'],
})
export class FaqDetailsComponent implements OnInit {

  cartCount;
  search: any;
  @Input() Header: any;
  @Input() allData: any;
  imageList: any;
  help: boolean = false;
  data: any;
  Title: any;
  clearAll: boolean = false;
  apidata: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  datas: any;
  parName: any;

  constructor(private http: HttpClient, private allConfigDataService: AllConfigDataService, private modalController: ModalController, private router: Router) {
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/EngagementFaqs';
this.Header=this.router.getCurrentNavigation().extras.state.Header;

  }

  ngOnInit() {
    console.log(this.Header,"dffjfj");

    //this.data=faqDetail['Stocks-Data']
    this.imageList = this.allConfigDataService.getConfig('images');
    this.Title = this.Header.productName;
    this.parName = this.Title.toLowerCase()
    this.getData(this.parName);
    console.log(this.parName,"lklklklk");
    
    //this.convert()

  }
  goToBack() {
    this.help = true
  }
  onConfirmNo() {
    window.history.back();
    this.modalController.dismiss()
  }
  bot() {
    // window.history.back();
    this.modalController.dismiss()
    this.router.navigate(['Engagement/EngagementChatbot'+'/chatbot'])
  }
  getData(val1) {
    console.log(val1,"yyyyyyyyyy");
    // let headers: HttpHeaders = new HttpHeaders({
    //   "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    // });
    let prams = {
        "TokenId":localStorage.getItem('id_token'),
        "FaqChatBotType": "FAQ",
        "Tags": val1
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.productWiseList, prams).subscribe(
      (data: any) => {
        // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Engagement//faq/Mpost/getProductsqa", prams, { headers }).subscribe(
        //   (data: any) => {
        this.apidata = data.ProductWiseFaq
        this.allData = data.ProductWiseFaq
        console.log(this.allData,"lmnbvcx");
        

        // console.log(data['requireRedirectionURL'], "llllllllllll");



        if (this.allData[0] == undefined) {
          this.clearAll = true
        }
        console.log();
      }, (error: any) => {
      })

  }



  toogle() {
    this.help = false
  }
  convert() {
    var angular: any
    var app = angular.module("myApp", ['ngSanitize']);
    app.controller("myCtrl", function ($scope) {
      $scope.myText = "My name is: <h1>John Doe</h1>";
    });
  }

  // searchMiss(e) {
  //   this.allData = this.apidata
  //   this.allData = this.allData.filter(item => item.question.toUpperCase().includes((e.target.value).toUpperCase().trim()))
  //   if (!this.allData.length) {
  //     this.clearAll = true
  //   } else {
  //     this.clearAll = false

  //   }
  // }

  goToAnswer(e) {
    this.datas = {
      ...e,
      header:this.Header
    }
    this.router.navigate(['Engagement/EngagementFaqs/productWiseListAnswer'],{state:{Header: this.datas}})
  }
}
