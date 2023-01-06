import { getRates } from './../../../core/src/lib/services/getRate';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { CommonFunctionService } from './../../../core/src/lib/services/common-function.service';
import { LoaderService } from './../../../core/src/lib/services/loader.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InvestmentDeatailsComponent } from './../investment-deatails/investment-deatails.component';
// import { BuygoldComponent } from './../../../digi/buygold/buygold.component';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
// import goldSilverData from 'src/assets/goldSilverData.json'
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { retry } from 'rxjs/operators';
import { interval } from 'rxjs';
@Component({
  selector: 'lib-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss'],
})
export class InvestComponent implements OnInit {


  GoldSilverData:any=[]
  imageList: any;
  currencyList: any;
  currencySymbol: any;
  
  
  errorList: any;

  constructor(private modctrl:ModalController,private allConfigDataService:AllConfigDataService,
    private loderservices :LoaderService, private commonFunctionService:CommonFunctionService, 
    private http:HttpClient,private loadingController:LoadingController,private CommonService:CommonService,
    private getRates:getRates) { }

  ngOnInit() {
    // this.loderservices.showLoader()
  //   this.CommonService.getDigiGoldRates().pipe(retry(3)).subscribe(async (res:any) => {
  //     if(res && res?.statusCode == 200){
  //       this.loderservices.hideLoader()
  //     }
  //     //this.loderservices.hideLoader()

  //   this.GoldSilverData=await res.result?.data.rates
  //   console.log(res);
  //   if(res.result?.data.rates) this.loderservices.hideLoader()
  // });

  
    this.imageList=this.allConfigDataService.getConfig('images')
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']
    // this.GoldSilverData= goldSilverData.ProductListGoldSilver;
    console.log(this.GoldSilverData)
    // this.getProductRecommends()
    const second=300;
  //   setInterval(() => {
  //    this.loderservices.showLoader()
  //   // this.CommonService.getdigigold('GoldSilverlist')
  //   this.CommonService.getDigiGoldRates().pipe(retry(3)).subscribe(async (res:any) => {
  //   this.GoldSilverData=await res.result?.data.rates
  //   console.log(res);
  //   if(res.result?.data.rates) this.loderservices.hideLoader()
  // });
    
  //   }, second*1000);
    
   this.getRates.setGoldSilverRates()
   this.getRates.goldSilverRates.subscribe(async (res:any) => {
    this.GoldSilverData=res.result?.data.rates;
    console.log(res);
    
  
   })
   
  //   const url= "http://uat.torusdigital.in/api/v1/Dummy/get/GoldSilverlist";
    
 
  // this.http.get(url).subscribe(async (res:any) => {
  //   console.log(res);
  //   this.GoldSilverData=res.ProductListGoldSilver
  // })
  }

 
ionViewDidEnter(){
 
}





  async navigateToInvestDeatailsGold() {
    const modal = await this.modctrl.create({
      // component: CoursecategoryComponent,
      component:InvestmentDeatailsComponent ,
      componentProps: {
        'imageList': this.imageList,
        'data':this.GoldSilverData,
        'Date':new Date(),
        'metalType':'gold'
      },
      backdropDismiss: false
    })
    modal.onDidDismiss().then((data) => {
      console.log(data)
    })
    return await modal.present()
  }

  async navigateToInvestDeatilsSilver() {
    const modal = await this.modctrl.create({
      // component: CoursecategoryComponent,
      component:InvestmentDeatailsComponent ,
      componentProps: {
        'imageList': this.imageList,
        'data':this.GoldSilverData,
        'Date':new Date(),
        'metalType':'silver'
      },
      backdropDismiss: false
    })
    modal.onDidDismiss().then((data) => {
      console.log(data)
    })
    return await modal.present()
  }

}
