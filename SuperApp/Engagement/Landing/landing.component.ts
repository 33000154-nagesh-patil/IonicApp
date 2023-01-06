import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { Router } from '@angular/router';
import { AllConfigDataService, CommonService, LoaderService } from 'index';
import { Component, OnDestroy, OnInit } from '@angular/core';
import categoryLanding from '../Dashboard Json/getLanding.json';
import appLayout from '../Dashboard Json/getLayout.json';

import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';
import { AlertService } from 'projects/core/src/lib/services/alert.service';
import { alertController } from '@ionic/core';
import { notificationCountService } from '../Services/notificationCount.service';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  objectContent: any;
  snapshot: any;
  portFolioSummary:any
  kycContent: any;
  kycIcon: any;
  footerListData: any;
  imageList = this.allConfigDataService.getConfig('images');
  productSelected: any = 'Wealth';
  categoryLanding = categoryLanding.categoryLanding;
  category:any
  selectedIndex: any = '1';
  enableBanner: any;
  enableHeading: any;
  response: any;
  percentage:any=80;
  bannerData: any;
  headingData: any;
  appLayout = appLayout;
  headerTitle:any
  cartCount:any;
  currentMode =  "basicMode";
  
  apiCatelog={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "",
    "environment": this.allConfigDataService.getConfig('environmentType'),
};
  headerProfile: boolean;
  showStories: boolean;
  padding: number;
  notificationCount: any;
  secId = 11536;
  // db:Observable<any[]>=this.stockWebsocket.currentMessage
  userName:Observable<{firstName:string}>= this.commonService.getUserDetail()
  constructor(
    private allConfigDataService: AllConfigDataService,
    private commonService: CommonService,
    private eduService: eduService,
    public router: Router,
    public http:HttpClient,
    public loaderService:LoaderService,
    // private stockWebsocket:WebSocketServiceForStocks,
    private stockWebsocket:WebSocketServiceForStocks,
    public alertService: AlertService,
    private notiCountService: notificationCountService,

    
    
  ) {
    this.stockWebsocket.callApiAuth();
    this.footerListData = appLayout.SuperApp.footer;
    this.commonService.appLayout.next(appLayout);
   this.getNotificationUnreadCount();
  }

   //Take Notification Unread Count using BehaviorSubject
  async getNotificationUnreadCount(){
    this.notiCountService.notificationUnReadCount.subscribe(async (res:any) => {
      if(res)this.notificationCount=await res;
      // console.log( "count",res);
    }) 
  }
 
  activeLanding(val) {
    if (val == 'Wealth') this.selectedIndex = '1';
    if (val == 'Health') this.selectedIndex = '2';
    if (val == 'Career') this.selectedIndex = '3';
    if (val == 'Lifestyle') this.selectedIndex = '4';
    this.productSelected = val;
    let myObj:any=null;
    let sub = this.eduService.categoryValueForAPI.subscribe((obj) => {
      obj['categoryLanding'] = val;
      myObj = obj;
      sub.unsubscribe()
    });
    if(myObj==null)return;
    // console.log(myObj,"3");
    this.eduService.categoryValueForAPI.next(myObj);
    this.changeBodyDataForCategory(val);
    this.loaderService.showLoader()   

  }


    changeBodyDataForCategory(data){
      const sub=this.eduService.categoryValueForAPI.subscribe(val => {
        this.notiCountService.setNotification()  
        let engagementBreadcrumb;           //temporary technique to arrange breadcrumb for landing api
        
         if(val["productLanding"]){
          this.headerTitle=this.eduService.getheaderName()
          this.headerProfile=false
          this.showStories=false;
          this.padding=5;
        }else{
          this.headerTitle=this.eduService.setheaderName("");
          this.headerProfile=true
          this.showStories = false;
          this.padding = 3;
         // this.showStories=true;
          //this.padding=1;
        }
        if(val["productLanding"]){
          engagementBreadcrumb="Engagement/EngagementLanding/" + val["categoryLanding"] +"/"+ val["productLanding"];
          
        }else{
          engagementBreadcrumb="Engagement/EngagementLanding/" + val["categoryLanding"];
        }
        // console.log(val["categoryLanding"],"qazxsw");
        let param = {
          "TokenId":localStorage.getItem('id_token')
        } 
        this.http.post(
          this.apiCatelog.baseURL[this.apiCatelog.environment]
          + engagementBreadcrumb
          + this.apiCatelog.getLanding,
          param)
          .subscribe((e:any)=>{     
            this.loaderService.hideLoader();  
            this.enableBanner=true;
            this.enableHeading=true;
            this.snapshot = e.snapshot
            this.bannerData=e.banner;
            this.headingData= e.heading;
            if(e.body)this.objectContent=e.body;
            if(e.objectContent)this.objectContent=e.objectContent;
            if(e?.KYCPending){
              this.kycContent = e?.KYCPending[0]['title']
            this.kycIcon = e?.KYCPending[0]['icon']
            }
            if(val["productLanding"])this.getPortfolioSummary()

        },(err)=>{
          this.loaderService.hideLoader();
          this.loaderService.hideLoader();
          this.alertService.showAlert("Error","","Fail to render Landing","Ok")  
        })
        sub.unsubscribe()
      })
    }
    ngOnInit(){
      
       
        
   
       

        this.commonService.goToLandingHome.subscribe(data=>{
          if(data=="home"){
            
            this.homeEvent(data)
            this.commonService.goToLandingHome.next(null)
          }
        })
        /////////
        this.objectContent= this.categoryLanding[this.productSelected]['objectContent'];
        this.activeLanding(this.productSelected)
    

        this.commonService.footerData.subscribe(async (res:any) => {
        this.response = res;
        this.footerListData=appLayout[res].footer
          if(res!='SuperApp'){
            this.productSelected='dashboard';
            this.selectedIndex='2';
            this.enableHeading=false;
            this.enableBanner=false;
          }
          
          this.changeBodyDataForCategory(this.productSelected)
         
    });
    
  }

  homeEvent(val) {
    if (val == 'home') {
      let categoryLanding;
      const sub=this.eduService.categoryValueForAPI.subscribe(val => {
        delete val["productLanding"];
        categoryLanding = val["categoryLanding"];
        this.category=val["categoryLanding"];
      
        // console.log(val["categoryLanding"],'11');
        
        // sub.unsubscribe()
      })
      this.activeLanding(categoryLanding);
     
    }
    // this.changeBannerData('1')
    this.commonService.footerData.next('SuperApp');
    this.productSelected = categoryLanding;
    if (val == 'Wealth') this.selectedIndex = '1';
    if (val == 'Health') this.selectedIndex = '2';
    if (val == 'Career') this.selectedIndex = '3';
    if (val == 'Lifestyle') this.selectedIndex = '4';
  }

  ngOnDestroy() {
    this.objectContent = '';
    this.enableBanner = false;
    this.bannerData = '';
    this.enableHeading = false;
    this.headingData = '';
  }

  Kyc() {
    this.loaderService.showLoader();
    this.eduService.categoryValueForAPI.subscribe(val => {
      // console.log(val,"qwertzxcv");
      this.apiCatelog['breadCrumb'] = "Onboarding/" + val["categoryLanding"] + "/" + val['productLanding']
    })

    let param= {
      "TokenId": localStorage.getItem('id_token'),
      // offeringType: 'gold',
      // flag: 'Select'
    };

    // this.https.post("https://apixuat.heytorus.com/SuperApp/Onboarding/getAllStep",param).subscribe((response) => {
    this.http
      .post(
        this.apiCatelog.baseURL[this.apiCatelog.environment] +
          this.apiCatelog.breadCrumb +
          this.apiCatelog.getAllStep,
        param
      )
      .subscribe((response: any) => {
        if (response.Status) {
          sessionStorage.setItem('OnboardingStep',JSON.stringify(response));
          this.eduService.OnboardingStepList.next(response.data);
          this.loaderService.hideLoader();
          // console.log(response,'done');
          for(let el of response.data ){
            if((el.status=='N'||el.status==null)&&(el.OnboardingSteps!='Signup'&&el.OnboardingSteps!='CreateProfile')){
              return this.router.navigate(['Onboarding'+el.pageUrl]);
            }
            // if(el.Status=='N')this.router.navigate(['Onboarding/customerDetail']);
            
          }
          // this.router.navigate(['Onboarding'+]);
        }else{
          this.loaderService.hideLoader();
          this.alertService.showAlert("Error","","Fail to render Steps","Ok")
        }
      },
      ()=>{
        this.loaderService.hideLoader();
      });
  }

async  getPortfolioSummary(){
    let SummarybreadCrumb;
    this.eduService.categoryValueForAPI.subscribe(val => {
      // console.log(val,"qwertzxcv");
      SummarybreadCrumb = "Operations/" + val["categoryLanding"] + "/" + val['productLanding']
    })
    
    let param = {
      "TokenId":localStorage.getItem('id_token')
    } 
   await this.http.post(this.apiCatelog.baseURL[this.apiCatelog.environment] + SummarybreadCrumb + this.apiCatelog.getPortfolioSummary, param)
      .subscribe((e:any)=>{   
        if(e){
        this.eduService.PortfolioSummary.next(e);
        this.portFolioSummary=e
        
        }
    },(err)=>{
      this.loaderService.hideLoader();
      this.loaderService.hideLoader();
      this.alertService.showAlert("Error","","","Ok")  
    })
    

  }
}
