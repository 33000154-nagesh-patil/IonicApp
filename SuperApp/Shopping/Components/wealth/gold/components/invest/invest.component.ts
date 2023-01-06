import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AllConfigDataService, CommonFunctionService, LoaderService } from 'index';
import { InvestmentDeatailsComponent } from '../investment-deatails/investment-deatails.component';
import { getDigiGoldRates } from '../../../../../Services/getDigiGoldRates';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invest',
  templateUrl: './invest.component.html',
  styleUrls: ['./invest.component.scss'],
})
export class InvestComponent implements OnInit {

  GoldSilverData:any=[]
  imageList: any;
  currencyList: any;
  currencySymbol: any;


  errorList: any;
  goldFooterData: any;
  title:any="Invest";
  textName:any="Invest"

  notificationCount:any = 0;
  cartCount:any = 0;

  labelIcon:any;
  currentMode:any=0;
  wellnessFooterData:any;
  currentNativeNetwork:any;
  currentWindowNetwork:any;
  isCordovaStatus:any;
  currentLanguage:any;

  custGuId:any;
  loggedInModal:boolean=false
  ErrorMsg:any;

  type:any// rama digi
  show:boolean=false// rama digi
  mfFooterData: any;

  currentMoneySymbols:any;
  stepperData:any;
  loginCustGuId:any;
  currentFetcherModule:any;
  @Output() thisBack = new EventEmitter();

  constructor(private modctrl:ModalController,private allConfigDataService:AllConfigDataService,
    private getRates:getDigiGoldRates, private router:Router) {
    this.goldFooterData = this.allConfigDataService.getConfig('goldTab');
    }

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





  navigateTo(val) {
    this.router.navigate([this.router.url.substring(0,this.router.url.lastIndexOf('/'))+'/getDetail/'+val]);

  }



}
