import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import myMenu from '../../../src/assets/myMenu.json'
// import { SubmenuComponent } from '../src/public-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SubmenuComponent } from '../../../projects/submenu/src/lib/submenu.component'
import { Router } from '@angular/router';
import { FaqComponent } from '../faq/faq.component';


@Component({
  selector: 'lib-co-insidesub-menu',
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

  changeAppTheme(){
    this.ColorMode = !this.ColorMode;
console.log(this.ColorMode);

  }

  constructor(private router: Router, private SubmenuComponent: SubmenuComponent, private menu: MenuController, private http: HttpClient, private cdn: ChangeDetectorRef, private modalctrl: ModalController) { }

  ngOnInit() {
    this.sub = this.SubmenuComponent.nextPageDetail;
    this.bankDetails = this.SubmenuComponent.bankDetail;
    this.supportDetails = this.SubmenuComponent.supportDet;
    this.settingsDet = this.SubmenuComponent.settingsDetails


    // this.ApiCall();
    // this.moneySaver()
    // this.insurance()
    // this.instantLoans()
    // this.manageApp()
    // this.aboutUs();
    // this.insideInsurance()
  }



  reDirectTo(e) {
    if (e !== "Dark Mode" && "Rate Us") {
      this.title1 = e
    }

    // this.title1=e


    if (e == 'Money Maker') {

      this.data = myMenu.MoneyMakerData


    } else if (e == 'Money Saver') {

      this.data = myMenu.MoneySaverData
    } else if (e === 'Instant Loans') {
      this.data = myMenu.InstantLoansData
    }
    else if (e === 'Insurance Solutions') {
      this.data = myMenu.InsuranceSolutionsData
      this.insSolution = this.bank1

    } else if (e === 'Manage App Lock') {
      this.data = myMenu.ManageAppLockData

    } else if (e === 'About Us') {
      this.data = myMenu.AboutUsData
    }
    else if (e === 'Logout') {
      this.router.navigate(['/SignUp']);
      this.menu.close()
    }
    console.log("data",this.data);

  }

  // showCategory(value,event){
  //   if(event==="Equity" || event==="Vehicle Insurance"){
  //     this.category=!value
  //   }
  // }


  ApiCall() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });

    let prams = {
      "ParentProductId": "8"
    }

    this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
      (name: any) => {
        if (name && name?.Status == 1) {
          this.List = name.Menu;


          for (let index = 0; index < this.List.length; index++) {
            const element = this.List[index].HasLayer;
            if (element == true) {
              this.firstPage();
            }
          }

        } else {

        }
      }, (error: any) => {

      })

  }
  showCategory(val) {
      this.router.navigate(['/'+val.UrlToRedirect]);
      this.goback()
      this.gobackagain()
      this.menu.close()
  }



  firstPage() {

    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });

    let prams = {
      "ParentProductId": "30"
    }

    this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
      (name1: any) => {
        // console.log("data", name1)
        if (name1 && name1?.Status == 1) {
          this.List1 = name1.Menu;
          // this.cdn.detectChanges()
          //  console.log(this.List1,"jhdjhd");


        } else {
          // this.errorShow(data?.Message, "getEsign -> status");
        }
      }, (error: any) => {
        // this.errorShow(error?.Message, "getEsign -> Http request");
      })
    // this.getESignStatus.emit("esign")

  }



  moneySaver() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });

    let prams = {
      "ParentProductId": "9"
    }

    this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
      (name1: any) => {
        if (name1 && name1?.Status == 1) {
          this.List12 = name1.Menu;



        } else {
          // this.errorShow(data?.Message, "getEsign -> status");
        }
      }, (error: any) => {
        // this.errorShow(error?.Message, "getEsign -> Http request");
      })
    // this.getESignStatus.emit("esign")
  }


  insurance() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });
    0
    let prams = {
      "ParentProductId": "10"
    }

    this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
      (name: any) => {
        if (name && name?.Status == 1) {
          this.bank1 = name.Menu;
          for (let index = 0; index < this.List.length; index++) {
            const element = this.List[index].HasLayer;
            if (element === true) {
              this.insideInsurance()
            }
          }
        } else {
        }
      },

    )
  }


  insideInsurance() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });

    let prams = {
      "ParentProductId": "43"
    }

    this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
      (name: any) => {
        if (name && name?.Status == 1) {
          this.vehicle = name.Menu;

        } else {

        }
      }, (error: any) => {

      })
  }


  instantLoans() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });

    let prams = {
      "ParentProductId": "11"
    }

    this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
      (name: any) => {
        if (name && name?.Status == 1) {
          this.loans = name.Menu;

        } else {

        }
      }, (error: any) => {

      })
  }


  manageApp() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });

    let prams = {
      "ParentProductId": "16"
    }

    this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
      (name: any) => {
        if (name && name?.Status == 1) {
          this.app = name.Menu;


          //  for (let index = 0; index < this.List.length; index++) {
          //    const element = this.List[index].HasLayer;
          //    if(element === true){
          //    this.insideInsurance()
          //    }
          //  }

        } else {

        }
      }, (error: any) => {

      })

  }

  aboutUs() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi",
    });

    let prams = {
      "ParentProductId": "18"
    }

    this.http.post("http://uat.torusdigital.in/api/v1/Call/Engagement/Hamburger/getProducts", prams, { headers }).subscribe(
      (name: any) => {

        if (name && name?.Status == 1) {
          this.about = name.Menu;


        } else {

        }
      }, (error: any) => {

      })

  }




  goback() {
    this.SubmenuComponent.JSONdata = ''
    this.SubmenuComponent.title = ''
  }
  gobackagain() {
    this.title1 = ''
  }

  public navigateTo(path) {
    if (this.menu.isEnabled) {
      this.menu.close();
    }
    if (path == "Logout") {

      this.callLogOut.emit('logout')
    } else {
      this.reDirect.emit(path);
    }
  }

  logout() {
    this.callLogOut.emit('logout')
  }
  async gotoFAQ(e) {

    this.menu.close();
    if (e === "FAQs") {
      // const modal = await this.modalctrl.create({
      //   // component: CoursecategoryComponent,
      //   component: FaqComponent,
      //   componentProps: {

      //   },
      //   backdropDismiss: false
      // })
      // modal.onDidDismiss().then((data) => {
      //   console.log(data)
      // })
      // return await modal.present()
      this.router.navigate(['faq'])
    }
    else if (e === "My Issues") {

      this.router.navigate(['myissue'])
    }

  }



}



