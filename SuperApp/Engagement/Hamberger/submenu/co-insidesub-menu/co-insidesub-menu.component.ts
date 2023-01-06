import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import myMenu from '../../../myMenu.json'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubmenuComponent } from '../../../Hamberger/submenu/submenu.component'
import { Router } from '@angular/router';
import { ThemeService } from 'projects/core/src/lib/services/theme.service';
import { AuthenticationService } from 'projects/core/src/lib/services/authentication.service';
import { CommonService } from 'index';
import { Location } from '@angular/common';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

import { AllConfigDataService, LoaderService } from 'index';
// import { LandingComponent } from 'SuperApp/Engagement/landing/landing.component';
// import { GridtypeComponent } from 'SuperApp/capability/components/gridtype/gridtype.component';


@Component({
  selector: 'app-co-insidesub-menu',
  templateUrl: './co-insidesub-menu.component.html',
  styleUrls: ['./co-insidesub-menu.component.scss'],
})
export class CoInsidesubMenuComponent implements OnInit {

  @Input() title: any;
  // @Input() nextPageDetail:any[];
  @Input() JSONdata: any;
  @Input() imageList: any
  @Output() callLogOut = new EventEmitter();
  @Output() reDirect = new EventEmitter();

  title1: any
  data: any
  goBack: boolean = true
  category: boolean = false;
  List: any;
  prp: any;
  sub: any[];
  List1: any;
  List12: any;
  MoneyMaker: boolean = false;

  money: any;
  saver: any;
  bankDetails: any[];
  bank1: any;
  insSolution: any;
  vehicle: any;
  loans: any;
  supportDetails: any;
  settingsDet: any;
  app: any;
  about: any;
  ColorMode = false
  secondLayer: any;
  firstLayer: any;

  
  apiCatelog={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "",
    "environment": this.allConfigDataService.getConfig('environmentType'),
};
  url: any;
  constructor(
    private cdn:ChangeDetectorRef,
    private themeService: ThemeService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private router: Router,
    private submenuComponent: SubmenuComponent,
    private menu: MenuController,
    private http: HttpClient,
    private commonService: CommonService,
    private eduService:eduService,
    private allConfigDataService: AllConfigDataService,
    // private gridTypeComp:GridtypeComponent
  ) { }

  ngOnInit() {
    this.title1 = this.title;
    this.secondLayer = this.JSONdata;

    // this.sub = this.SubmenuComponent.nextPageDetail;
    // this.bankDetails = this.SubmenuComponent.bankDetail;
    // this.supportDetails = this.SubmenuComponent.supportDet;
    // this.settingsDet = this.SubmenuComponent.settingsDetails


    // this.ApiCall();
    // this.moneySaver()
    // this.insurance()
    // this.instantLoans()
    // this.manageApp()
    // this.aboutUs();
    // this.insideInsurance()
  }
  changeBreadcrum(val,abc){
    console.log(abc,"akshay")
    // alert("BreadCrumb call")
    let myObj={}  
                    // method to store product value for Dynamic API calling.
    const sub=this.eduService.categoryValueForAPI.subscribe(obj=>{
      obj["productLanding"]=abc;
      
        console.log("sdaasd")
        obj["categoryLanding"]=this.title;
      
      myObj=obj;
      this.title=undefined
      sub.unsubscribe();
    })
    
    setTimeout(() => {
      this.eduService.categoryValueForAPI.next(myObj);
      this.router.navigate(['Engagement'])
    }, 100);

      


  }
  reDirectTo(e) {
    
    // this.title = e.title
    this.JSONdata = e.subMenu;
    if (e.url !== "") { 
      if(e.title == "My Issues" || e.title=="FAQs" || e.title=="Chat With Us" || e.title=="Chat with Us" ){
        this.router.navigate(["/" + e.url]) 
        this.menu.close();
      }
      else{

        switch (e.url) {
          case 'Gold':
            this.changeBreadcrum(e.url,'DG');
            break;
          case 'Mutual Fund':
            this.changeBreadcrum(e.url,'MF');
            break;
          case 'Stock':
            this.changeBreadcrum(e.url,'ST');
            break;
          case 'Courses':
            this.changeBreadcrum(e.url,'Courses');
            break;
          case 'Jobs':
            this.changeBreadcrum(e.url,'Job');
            break;
          case 'Assessment':
            this.changeBreadcrum(e.url,'Assessment');
            break;
          case 'Lab Test':
            this.changeBreadcrum(e.url,'LabTest');
            break;
          case 'Medicine':
            this.changeBreadcrum(e.url,'Medicine');
            break;
          case 'Loans':
            this.changeBreadcrum(e.url,'Las');
            break;
          case 'Bill Payment':
            this.changeBreadcrum(e.url,'BillPayment');
            break;
          case 'Insurance':
            this.changeBreadcrum(e.url,'Insurance');
            break;
            case 'Neo Bank':
              this.changeBreadcrum(e.url,'NB');
              break;
        }
  
        this.commonService.footerData.next(e.url);
        this.url = e.url;
        this.menu.close();
        
        // alert(e.title);
      //  this.gridTypeComp.changeValueForList(e.title);
        // this.changeBodyDataForCategory();
      }   
      this.submenuComponent.JSONdata = '';
      this.submenuComponent.title = '';    
      this.cdn.detectChanges()   
    }
     
    
  }

  



  goback() {
    if (this.JSONdata !== this.secondLayer) {
      this.JSONdata = this.secondLayer;
      this.title = this.title1
    } else {
      this.submenuComponent.JSONdata = '';
      this.submenuComponent.title = '';
    }
  }

  changeAppTheme() {
    this.ColorMode = !this.ColorMode;
    if (this.ColorMode) this.themeService.setTheme('dark');
    if (!this.ColorMode) this.themeService.setTheme('torus');
    this.themeService.setThemeCSSVars()
  }

  logout() {
    this.authenticationService.logout()
  }

  // reDirectTo(e) {
  //   if (e !== "Dark Mode" && "Rate Us") {
  //     this.title1 = e
  //   }

  //   // this.title1=e


  //   if (e == 'Money Maker') {

  //     this.data = myMenu.moneyMakerData


  //   }
  //   else if(e=='CareerData'){
  //     this.data= myMenu.careerData
  //   }

  //   else if(e=='HealthData'){
  //     this.data = myMenu.healthData
  //   }

  //   else if (e == 'Money Saver') {

  //     this.data = myMenu.moneySaverData
  //   } else if (e === 'Instant Loans') {
  //     this.data = myMenu.instantLoansData
  //   }
  //   else if (e === 'Insurance Solutions') {
  //     this.data = myMenu.insuranceSolutionsData
  //     this.insSolution = this.bank1

  //   } else if (e === 'Manage App Lock') {
  //     this.data = myMenu.manageAppLockData

  //   } else if (e === 'About Us') {
  //     this.data = myMenu.aboutUsData
  //   }
  //   else if (e === 'Logout') {
  //     this.router.navigate(['/SignUp']);
  //     this.menu.close()
  //   }
  //   else if (e==='LAS'){
  //     this.router.navigate(['/'+e.UrlToRedirectForOnboarding]);

  //   }
  //   console.log("data",this.data);

  // }

  // showCategory(value,event){
  //   if(event==="Equity" || event==="Vehicle Insurance"){
  //     this.category=!value
  //   }
  // }


  // ApiCall() {
  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
  //   });

  //   let prams = {
  //     "ParentProductId": "8"
  //   }

  //   this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
  //     (name: any) => {
  //       if (name && name?.Status == 1) {
  //         this.List = name.Menu;


  //         for (let index = 0; index < this.List.length; index++) {
  //           const element = this.List[index].HasLayer;
  //           if (element == true) {
  //             this.firstPage();
  //           }
  //         }

  //       } else {

  //       }
  //     }, (error: any) => {

  //     })

  // }
  // showCategory(val) {
  //   this.commonService.footerData.next(val.url)
  //     // this.router.navigate(['/'+val.UrlToRedirectForOnboarding]);
  //     this.goback()
  //     this.gobackagain()
  //     this.menu.close()
  // }



  // firstPage() {

  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
  //   });

  //   let prams = {
  //     "ParentProductId": "30"
  //   }

  //   this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
  //     (name1: any) => {
  //       // console.log("data", name1)
  //       if (name1 && name1?.Status == 1) {
  //         this.List1 = name1.Menu;
  //         // this.cdn.detectChanges()
  //         //  console.log(this.List1,"jhdjhd");


  //       } else {
  //         // this.errorShow(data?.Message, "getEsign -> status");
  //       }
  //     }, (error: any) => {
  //       // this.errorShow(error?.Message, "getEsign -> Http request");
  //     })
  //   // this.getESignStatus.emit("esign")

  // }



  // moneySaver() {
  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
  //   });

  //   let prams = {
  //     "ParentProductId": "9"
  //   }

  //   this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
  //     (name1: any) => {
  //       if (name1 && name1?.Status == 1) {
  //         this.List12 = name1.Menu;



  //       } else {
  //         // this.errorShow(data?.Message, "getEsign -> status");
  //       }
  //     }, (error: any) => {
  //       // this.errorShow(error?.Message, "getEsign -> Http request");
  //     })
  //   // this.getESignStatus.emit("esign")
  // }


  // insurance() {
  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
  //   });
  //   0
  //   let prams = {
  //     "ParentProductId": "10"
  //   }

  //   this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
  //     (name: any) => {
  //       if (name && name?.Status == 1) {
  //         this.bank1 = name.Menu;
  //         for (let index = 0; index < this.List.length; index++) {
  //           const element = this.List[index].HasLayer;
  //           if (element === true) {
  //             this.insideInsurance()
  //           }
  //         }
  //       } else {
  //       }
  //     },

  //   )
  // }


  // insideInsurance() {
  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
  //   });

  //   let prams = {
  //     "ParentProductId": "43"
  //   }

  //   this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
  //     (name: any) => {
  //       if (name && name?.Status == 1) {
  //         this.vehicle = name.Menu;

  //       } else {

  //       }
  //     }, (error: any) => {

  //     })
  // }


  // instantLoans() {
  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
  //   });

  //   let prams = {
  //     "ParentProductId": "11"
  //   }

  //   this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
  //     (name: any) => {
  //       if (name && name?.Status == 1) {
  //         this.loans = name.Menu;

  //       } else {

  //       }
  //     }, (error: any) => {

  //     })
  // }


  // manageApp() {
  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
  //   });

  //   let prams = {
  //     "ParentProductId": "16"
  //   }

  //   this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
  //     (name: any) => {
  //       if (name && name?.Status == 1) {
  //         this.app = name.Menu;


  //         //  for (let index = 0; index < this.List.length; index++) {
  //         //    const element = this.List[index].HasLayer;
  //         //    if(element === true){
  //         //    this.insideInsurance()
  //         //    }
  //         //  }

  //       } else {

  //       }
  //     }, (error: any) => {

  //     })

  // }

  // aboutUs() {
  //   let headers: HttpHeaders = new HttpHeaders({
  //     "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
  //   });

  //   let prams = {
  //     "ParentProductId": "18"
  //   }

  //   this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
  //     (name: any) => {

  //       if (name && name?.Status == 1) {
  //         this.about = name.Menu;


  //       } else {

  //       }
  //     }, (error: any) => {

  //     })

  // }


  // gobackagain() {
  //   this.title1 = ''
  // }

  // public navigateTo(path) {
  //   if (this.menu.isEnabled) {
  //     this.menu.close();
  //   }
  //   if (path == "Logout") {

  //     this.callLogOut.emit('logout')
  //   } else {
  //     this.reDirect.emit(path);
  //   }
  // }


  // async gotoFAQ(e) {
  //   if (e === "FAQs") {
  //     this.menu.close();
  //     // const modal = await this.modalctrl.create({
  //     //   // component: CoursecategoryComponent,
  //     //   component: FaqComponent,
  //     //   componentProps: {
  //     //   },
  //     //   backdropDismiss: false
  //     // })
  //     // modal.onDidDismiss().then((data) => {
  //     //   console.log(data)
  //     // })
  //     // return await modal.present()
  //     //this.router.navigate(['faq'])
  //     this.router.navigate(['Engagement/EngagementFaqs/getFaq'])
  //   }
  //   else if (e === "My Issues") {
  //     this.menu.close();
  //     this.router.navigate(['Engagement/EngagementMyIssues/issues'])
  //   }
  //   else if(e==="Chat with Us"){
  //     this.menu.close();
  //     this.router.navigate(['Engagement/EngagementChatbot/chatbot'])

  //   }

  //   // else if (e === "My Issues") {

  //   //   this.router.navigate(['myissue'])
  //   // }


  // }



}
