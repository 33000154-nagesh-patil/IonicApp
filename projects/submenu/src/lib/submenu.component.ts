import { getLocaleDateFormat } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import myMenu from '../../../../src/assets/myMenu.json'
import { AllConfigDataService } from 'index';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';


@Component({
  selector: 'lib-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent implements OnInit {
  @Input() submenuList: any;
  @Input() version: any;
  // @Output() callLogOut = new EventEmitter();
  // @Output() reDirect = new EventEmitter();
  // @Output() getTitle = new EventEmitter();
  title: any
  JSONdata: any

  public isMenuOpen: boolean = true;
  public isMenuSaverOpen: boolean = true;
  public isMenuInsurenceOpen: boolean = false;
  public strFirstName: string = "";
  public profileName: string = "";
  public EmailId: string = "";
  isKycCompleted: any = false;
  data: any;
  imageList: any;
  goTo: boolean = false;
  wealthData: any;
  bank: any
  insurance: any
  loansdata: any

  settingsData: any
  aboutusdata: any
  mainMenu: any;
  prod: any;
  nextPageDetail: any[];
  subMenu: any;
  bank1: any;
  bankDetail: any[];
  support: any;
  supportDet: any;
  dataForSettings: any;
  settingsDetails: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  constructor(private http: HttpClient, private router: Router, private menu: MenuController,
    private allConfigDataService: AllConfigDataService, private commonFunctionService: CommonFunctionService,
    private commonService: CommonService, private modalcntrl: ModalController) {

      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Engagement/HamburgerMenu';

  }


  ngOnInit() {
    this.modalcntrl.dismiss();
    // this.ApiCall()
    this.data = myMenu.data;

    this.imageList = this.allConfigDataService.getConfig('images');
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

  // openMenu() {  
  //   this.menu.open()    
  // }
  // closeMenu() {
  //   // this.menu.open('end');
  //   this.menu.close()
  // }


  reDirectTo(e: any) {
    this.title = e;

    if (e === 'Wealth') {
      this.JSONdata = myMenu.wealthData
      this.nextPageDetail = this.subMenu;
    } else if (e === 'Health') {
      this.router.navigate(['/Health']);
      this.menu.close();
    } else if (e === 'Bank') {
      this.bankDetail = this.bank1;

      this.JSONdata = myMenu.Bank
    } else if (e === 'Customer Support') {
      this.JSONdata = myMenu.CustomerSupportData
      this.supportDet = this.support;
    } else if (e === 'Refer and Earn') {
      this.JSONdata = myMenu;
    } else if (e === 'Education') {
      this.router.navigate(['/Education']);
      this.menu.close();
      // this.router.navigate[('Education')]
    }
    else if (e === 'Settings') {
      this.JSONdata = myMenu.SettingsData
      this.settingsDetails = this.dataForSettings;
    }
  }




  ApiCall() {
    

    let params = {
      "ParentProductId": "0"
    }
    

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.globalMenu,params).subscribe(
      (name: any) => {

        if (name && name?.Status == 1) {
          this.mainMenu = name.Menu;

          for (let index = 0; index < this.mainMenu.length; index++) {
            const element = this.mainMenu[index].ProductName;
            this.title = element;
            this.prod = this.mainMenu[index].ProductId;
            if (this.prod === 1) {
              this.firstSubMenu();
            } 
            else if (this.prod === 4) {
              this.Bank();
            } 
            else if (this.prod === 5) {
              this.customerSupport();
            } 
            else if (this.prod === 7) {
              this.settings();
            }
          }

        }

        else {

          // this.errorShow(data?.Message, "getEsign -> status");
        }
      }, (error: any) => {
        // this.errorShow(error?.Message, "getEsign -> Http request");
      })
    // this.getESignStatus.emit("esign")

  }





  firstSubMenu() {

    let params = {
      "ParentProductId": "1"
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.wealthMenu,params).subscribe(
      (name: any) => {
        if (name && name?.Status == 1) {
          this.subMenu = name.Menu;
          // this.nextPageDetail=this.subMenu;



        }

        //    console.log(this.List,"Nameeeeee");

        else {

          // this.errorShow(data?.Message, "getEsign -> status");
        }
      }, (error: any) => {
        // this.errorShow(error?.Message, "getEsign -> Http request");
      })
    // this.getESignStatus.emit("esign")

  }

  Bank() {


    let params = {
      "ParentProductId": "4"
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.bankMenu,params).subscribe(
      (name: any) => {

        if (name && name?.Status == 1) {
          this.bank1 = name.Menu;


    //        for (let index = 0; index < this.List.length; index++) {
    //          const element = this.List[index].HasLayer;
    //          if(element==true){
    //          }
    //        }

        } else {

        }
      }, (error: any) => {

      })

  }


  customerSupport() {


    let params = {
      "ParentProductId": "5"
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.customerSupportMenu,params).subscribe(
      (name: any) => {

        if (name && name?.Status == 1) {
          this.support = name.Menu;
        } else {
        }
      }, (error: any) => {

      })
  }


  settings() {


    let params = {
      "ParentProductId": "7"
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.settingMenu,params).subscribe(
      (name: any) => {
        if (name && name?.Status == 1) {
          this.dataForSettings = name.Menu;



    //        for (let index = 0; index < this.List.length; index++) {
    //          const element = this.List[index].HasLayer;
    //          if(element==true){
    //          }
    //        }

        } else {

        }
      }, (error: any) => {

      })

  }





}
