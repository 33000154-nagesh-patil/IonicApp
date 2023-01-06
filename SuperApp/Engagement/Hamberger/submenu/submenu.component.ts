
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import hamburgerMenu from '../hamburgerMenu.json'
import { AllConfigDataService } from 'index';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import categoryLanding from '../../Dashboard Json/getLanding.json';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { AlertService } from 'projects/core/src/lib/services/alert.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent implements OnInit {

  @Input() submenuList: any;
  @Input() version: any;
  @Output() callLogOut = new EventEmitter();
  // @Output() reDirect = new EventEmitter();
  // @Output() getTitle = new EventEmitter();

  title: any;
  JSONdata: any;
  data: any;
  isKycCompleted: any = false;
  imageList: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  menuData: any;
  public strFirstName: string = "";
  public profileName: string = "";
  hamburgerCard: any
  hamburgerCardDetail: any;
  cardhamburger: any
  breadCrumb1: any;
  userName:Observable<{firstName:string}>= this.commonService.getUserDetail()
  // public isMenuOpen: boolean = true;
  // public isMenuSaverOpen: boolean = true;
  // public isMenuInsurenceOpen: boolean = false;

  // public EmailId: string = "";



  // goTo: boolean = false;
  // wealthData: any;
  // bank: any
  // insurance: any
  // loansdata: any
  // settingsData: any
  // aboutusdata: any
  // mainMenu: any;
  // prod: any;
  // nextPageDetail: any[];
  // subMenu: any;
  // bank1: any;
  // bankDetail: any[];
  // support: any;
  // supportDet: any;
  // dataForSettings: any;
  // settingsDetails: any;

  // currentData: any;


  constructor(private http: HttpClient, private router: Router, private menu: MenuController,
    private allConfigDataService: AllConfigDataService, private commonFunctionService: CommonFunctionService,
    private commonService: CommonService, private modalcntrl: ModalController, private alertService: AlertService,private loaderService:LoaderService,private eduService:eduService) {

    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/EngagementHamburger';
    this.breadCrumb1='Onboarding/Wealth/neoBank'
  }


  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    //this.data = hamburgerMenu.menuData;
    this.ApiCall();

    this.hamburgerCard = categoryLanding.categoryLanding.Wealth.body[0].content
    this.hamburgerCardDetail = this.hamburgerCard.filter(element => {
      return element.coloredCard == true;
    });
    this.cardhamburger = this.hamburgerCardDetail[0];



    if (this.menu.isEnabled) {
      this.menu.close();
    }
    this.commonService.getUserDetail().subscribe((data: any) => {
      if (data) {
        this.strFirstName = data?.FirstName ? data?.FirstName : 'user';
        this.profileName = this.commonFunctionService.getShortName(data?.FirstName?.replace(/\s/g, "").concat(' ', data?.LastName?.replace(/\s/g, ""))).toUpperCase();
      }
    })
  }

  ApiCall() {
    let params = {
      "TokenId": localStorage.getItem("id_token"),
      "ParentId": 0
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.hamburgerMenu, params).subscribe(
      (res: any) => {
        this.data = res.menuData;
      }, (error: any) => {
        // this.errorShow(error?.Message, "getEsign -> Http request");
      })
    // this.getESignStatus.emit("esign")

  }

  // openMenu() {
  //   this.menu.open()
  // }
  // closeMenu() {
  //   // this.menu.open('end');
  //   this.menu.close()
  // }



  reDirectTo(e) {
    this.menuData = e;
    this.title = e.title;
    this.JSONdata = this.menuData.subMenu;
    console.log("this is ...", this.JSONdata);
    if (e.url !== "") {
      this.router.navigate(["/" + e.url])
      this.menu.close();
    }

    // if (e === 'Wealth') {
    //   this.JSONdata = myMenu.wealthData
    //   this.nextPageDetail = this.subMenu;
    // } else if (e === 'Health') {
    //   this.JSONdata = myMenu.healthData;
    //   this.nextPageDetail = this.subMenu
    //   //this.router.navigate(['/Shopping/Health']);
    //   // this.menu.close();
    // } else if (e === 'Bank') {
    //   this.bankDetail = this.bank1;
    //   this.JSONdata = myMenu.bankData;
    // } else if (e === 'Customer Support') {
    //   this.JSONdata = myMenu.customerSupportData
    //   this.supportDet = this.support;
    // } else if (e === 'Refer and Earn') {
    //   this.menu.close();
    //   this.JSONdata = myMenu;
    // } else if (e == 'Torus Club') {
    //   this.router.navigate(['Engagement/EngagementTorusClub/torusclub']);
    //   this.menu.close();
    // } else if (e === 'Career') {
    //   this.JSONdata = myMenu.careerData;
    //   this.nextPageDetail = this.subMenu;
    // }
    // else if (e === 'Settings') {
    //   this.JSONdata = myMenu.settingsData
    //   this.settingsDetails = this.dataForSettings;
    // }
  }

  openWallet(){

      this.loaderService.showLoader();
      // this.eduService.categoryValueForAPI.subscribe(val => {
      //   this.apiCatalog['breadCrumb'] = "Onboarding/" + val["categoryLanding"] + "/" + val['productLanding']
      // })
  
      let param= {
        "TokenId": localStorage.getItem('id_token')
        // offeringType: 'gold',
        // flag: 'Select'
      };
  
      // this.https.post("https://apixuat.heytorus.com/SuperApp/Onboarding/getAllStep",param).subscribe((response) => {
      this.http
        .post(
  
          this.apiCatalog.baseURL[this.appEnviron]+
            this.breadCrumb1 +
            this.apiCatalog.getAllStep,
          param
        )
        .subscribe((response: any) => {
          if (response.Status) {
            this.eduService.OnboardingStepList.next(response.data);
            this.loaderService.hideLoader();
            for(let el of response.data ){
              if(el.status=='Y'){
         this.menu.close();

                return this.router.navigate(['Onboarding'+el.pageUrl])
  
                // return this.router.navigate(['Onboarding'+el.pageUrl]);
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

  // firstSubMenu() {

  //   let params = {
  //     "ParentProductId": "1"
  //   }

  //   this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.wealthMenu, params).subscribe(
  //     (name: any) => {
  //       if (name && name?.Status == 1) {
  //         this.subMenu = name.Menu;
  //         // this.nextPageDetail=this.subMenu;



  //       }

  //       //    console.log(this.List,"Nameeeeee");

  //       else {

  //         // this.errorShow(data?.Message, "getEsign -> status");
  //       }
  //     }, (error: any) => {
  //       // this.errorShow(error?.Message, "getEsign -> Http request");
  //     })
  //   // this.getESignStatus.emit("esign")

  // }

  // Bank() {
  //   let params = {
  //     "ParentProductId": "4"
  //   }
  //   this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.bankMenu, params).subscribe(
  //     (name: any) => {

  //       if (name && name?.Status == 1) {
  //         this.bank1 = name.Menu;


  //         //        for (let index = 0; index < this.List.length; index++) {
  //         //          const element = this.List[index].HasLayer;
  //         //          if(element==true){
  //         //          }
  //         //        }

  //       } else {

  //       }
  //     }, (error: any) => {

  //     })
  // }

  // customerSupport() {
  //   let params = {
  //     "ParentProductId": "5"
  //   }
  //   this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.customerSupportMenu, params).subscribe(
  //     (name: any) => {

  //       if (name && name?.Status == 1) {
  //         this.support = name.Menu;
  //       } else {
  //       }
  //     }, (error: any) => {

  //     })
  // }


  // settings() {
  //   let params = {
  //     "ParentProductId": "7"
  //   }
  //   this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.settingMenu, params).subscribe(
  //     (name: any) => {
  //       if (name && name?.Status == 1) {
  //         this.dataForSettings = name.Menu;

  //         //        for (let index = 0; index < this.List.length; index++) {
  //         //          const element = this.List[index].HasLayer;
  //         //          if(element==true){
  //         //          }
  //         //        }

  //       } else {

  //       }
  //     }, (error: any) => {

  //     })
  // }






}
