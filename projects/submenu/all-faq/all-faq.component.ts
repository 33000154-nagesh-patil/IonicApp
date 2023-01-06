import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import faqDetail from '../../../src/assets/faqDetail.json';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-all-faq',
  templateUrl: './all-faq.component.html',
  styleUrls: ['./all-faq.component.scss'],
})
export class AllFaqComponent implements OnInit {

  @Input() Question: any
  imageList: any;
  type: any
  allData: any;
  apidata: any;
  clearAll: boolean=false;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  //data: any;

  constructor(private http: HttpClient, private allConfigDataService: AllConfigDataService, private mdlctrl: ModalController, private router: Router) { 

    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/Faq';
   
  }

  ngOnInit() {
    this.getAllData()
    this.imageList = this.allConfigDataService.getConfig('images')
    //this.data = faqDetail['Stocks-Data']
    this.type = this.Question
   // console.log("gcghsac", this.type);
  }

  goToBack() {
    this.mdlctrl.dismiss()
  }

  toChatBot() {
    this.mdlctrl.dismiss()
    this.router.navigate(['/chatBot'])
  }
  getAllData() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });
    let prams = {
      "ProductId": null
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.globalMenu,prams).subscribe(
  (data: any) => {

    // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Engagement//faq/Mpost/getProductsqa", prams, { headers }).subscribe(
    //   (data: any) => {
        this.apidata=data
        this.allData = data
      }, (error: any) => {
      })

  }
  searchMiss(e){
    this.allData=this.apidata
   this.allData= this.allData.filter(item=>item.question.toUpperCase().includes((e.target.value).toUpperCase().trim()))
   if(!this.allData.length){
   this.clearAll=true
  }else{
   this.clearAll=false

  }
}

}
