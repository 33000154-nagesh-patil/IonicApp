import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Navigation } from 'swiper';
import { Component, Input, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import faqDetail from '../../../src/assets/faqDetail.json'
import { Router } from '@angular/router';
// import  angular from "angular";

@Component({
  selector: 'app-faq-details',
  templateUrl: './faq-details.component.html',
  styleUrls: ['./faq-details.component.scss'],
})
export class FaqDetailsComponent implements OnInit {

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

  constructor(private http: HttpClient, private allConfigDataService: AllConfigDataService, private modalController: ModalController, private router: Router) {
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/Faq';

  }

  ngOnInit() {


    //this.data=faqDetail['Stocks-Data']    
    this.imageList = this.allConfigDataService.getConfig('images');
    this.Title = this.Header.productName;
    this.getData(this.Header.productId);
    this.convert()

  }
  goToBack() {
    this.help = true
  }
  onConfirmNo() {
    this.modalController.dismiss()
  }
  bot() {
    this.modalController.dismiss()
    this.router.navigate(['/chatbot'])
  }
  getData(val) {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });
    let prams = {
      "ProductId": val.toString()
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.productWiseFaq, prams).subscribe(
      (data: any) => {
        // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Engagement//faq/Mpost/getProductsqa", prams, { headers }).subscribe(
        //   (data: any) => {
        this.apidata = data.ProductWiseFaq
        this.allData = data.ProductWiseFaq
        console.log(data);
        console.log(this.allData);


        console.log(data['requireRedirectionURL'], "llllllllllll");



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

  searchMiss(e) {
    this.allData = this.apidata
    this.allData = this.allData.filter(item => item.question.toUpperCase().includes((e.target.value).toUpperCase().trim()))
    if (!this.allData.length) {
      this.clearAll = true
    } else {
      this.clearAll = false

    }
  }
}
