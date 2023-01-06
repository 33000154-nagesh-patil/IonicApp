import { Router } from '@angular/router';

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModalController, MenuController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Observable } from 'rxjs';
import faq from '../../../src/assets/faq.json'
import { FaqDetailsComponent } from '../faq-details/faq-details.component';
import faqDetail from '../../../src/assets/faqDetail.json'
import { AllFaqComponent } from '../all-faq/all-faq.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { Location } from '@angular/common';




@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
   dataStocks:any
 DataStocks:any=faqDetail['Stocks-Data']
  question: any;
  environmentAPIList: any;
  category: any;
  health: any;
  imageList: any;
  search: any;
  showStocks: boolean = false;
  title: string[];
  all: any;
  name: any;
  noData: boolean = true
  keyword = 'Question'
  allData: any;
  Title: any = [];
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;



  constructor(private menu:MenuController, 
    private router:Router, 
    private http:HttpClient, 
    private loaderService:LoaderService, 
    private allConfigDataService:AllConfigDataService,
    private modalController:ModalController,
    private location:Location) {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Engagement/Faq';
     }

  ngOnInit() {
    this.all=faq
    this.imageList = this.allConfigDataService.getConfig('images')
    this.getCategory()
    // this.getQuestions()
  
  }



  async getData(val){
  
    this.modalController.dismiss()
    const modal = await this.modalController.create({
      component: FaqDetailsComponent,
      componentProps: {
        'Header': val,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
      });
    return await modal.present();

 
    // this.name=val
    // console.log(val);
    // if(val=="Stocks"){
    //   this.openDetailPage()
    // }

  }



  // async openDetailPage() {
  //   // this.loaderService.showLoader();
  //   this.modalController.dismiss();
  //   const modal = await this.modalController.create({
  //     component:  FaqDetailsComponent,
  //     componentProps: {
  //       'Header':this.name
       
  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
       
  //     });
  //   // this.loaderService.hideLoader();
  //   return await modal.present();
  // }


  async selectEvent(item){
 this.question=item.question
 this.modalController.dismiss()
 const modal = await this.modalController.create({
  component: AllFaqComponent,
  componentProps: {
 'Question':this.question
   
  },
  backdropDismiss: false
});
modal.onDidDismiss()
  .then((data) => {  
});
return await modal.present(); 
}

onFocused(e){

}

//  nextPage() {
//   // this.loaderService.showLoader();
//  console.log(this.question);

 
// }


getCategory() {
  
  let params={
    "CFT": "Engagement",
    "Product": "FAQs",
    "FileName": "getCategoryRes.json"
}
//   this.http.post("http://uat.torusdigital.in/api/v1/Dummy/get/generalApi", params).subscribe(
//     (data: any) => {
//     this.category=data
//     console.log("A------------------------->",this.category);
//     this.all=this.category    
//     }, (error: any) => {     
//     })

this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getFaqList,params).subscribe(
  (data: any) => {
console.log(data,"Faq");

// this.http.get("https://apixuat.heytorus.com/api/v1/Call/Engagement//faq/Mget/getProductbyparentname").subscribe(
//   (data: any) => {
    this.all = data
    const obj2 = Object.create(this.all);
    for (let key in obj2) {
      this.Title.push(key)
    }
  }, (error: any) => {
      })  
}

goToBack(){
  this.location.back();
   this.menu.open();
  this.modalController.dismiss()
}

onChangeSearch(val) {
   
  let headers: HttpHeaders = new HttpHeaders({
    "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
  });

  let prams = {
    "question": val,
     "productName":"",
    "searchType":"globalSearchFAQ"
   
}
this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getAllFaq,prams).subscribe(
  (data: any) => {

  // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Engagement/faq/Mpost/getFAQSearch", prams, { headers }).subscribe(
  //   (data: any) => {
      this.keyword = "question";
      this.dataStocks = data.AllFaq;
      //this.keyword = this.dataStocks.question
    //  this.Questions=this.dataStocks.map((e)=>{
    //   return  e.question
    //   })
     
      console.log(this.dataStocks, "api");


    }, (error: any) => {

    })

}


}

// getSubCategory() {
//   // this.loaderService.showLoader();
//   let params={
//     "CFT": "Engagement",
//     "Product": "FAQs",
//     "FileName": this.
// }


//   this.http.post("http://uat.torusdigital.in/api/v1/Dummy/get/generalApi", params).subscribe(
//     (data: any) => {
//     this.category=data
//     console.log("A------------------------->",this.category);
//     this.all=this.category
     
//     }, (error: any) => {
//       // this.errorShow(error?.Message, "getEsign -> Http request");
//     })
//   // this.getESignStatus.emit("esign")
// }


