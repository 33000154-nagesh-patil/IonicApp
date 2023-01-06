import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ExchangeMsgComponent } from '../exchange-msg/exchange-msg.component';
import { LinksComponent } from '../links/links.component';
import { ManagelockComponent } from '../managelock/managelock.component';
import { OptionCalcComponent } from '../option-calc/option-calc.component';
import { SebiRegistationComponent } from '../sebi-registation/sebi-registation.component';
import { STsettings1Component } from '../stsettings1/stsettings1.component';
import { ThemechangeComponent } from '../themechange/themechange.component';


@Component({
  selector: 'lib-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  imageList: any;
  checkMarket: boolean = false;
  toggleTorus: boolean = false;
  value: boolean = false;
  showMarketStatus: boolean = false;
  showMemberDetails: boolean = false;
  MarketType: any =[];
  MktStatus: any;
  status: boolean = false;
  status1: boolean;
  status2: boolean;
  status3: boolean;
  constructor(private allConfigDataService: AllConfigDataService, private router: Router,

    private modalCtrl: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.fundLimitDetailed('NL')
    this.fundLimitDetailed('NL')
    this.fundLimitDetailed('OL')
    this.fundLimitDetailed('A2')

    this.imageList = this.allConfigDataService.getConfig('images')
  }


  // async changePassword() {
  //   const modal = await this.modalCtrl.create({
  //     component: STsettings1Component,
  //     componentProps: {
  //       'imageList': this.imageList,
  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //     });
  //   return await modal.present();
  // }


  changePassword() {
    this.router.navigate(['stocks/changePassword'])
  }






  async GoToLinks() {
    const modal = await this.modalCtrl.create({
      component: LinksComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }

  async GoToThemeChange() {
    const modal = await this.modalCtrl.create({
      component: ThemechangeComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }


  async GoToManageAppLock() {
    const modal = await this.modalCtrl.create({
      component: ManagelockComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }

  async GoToSebiRegistration() {
    const modal = await this.modalCtrl.create({
      component: SebiRegistationComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }


  async GotoOptionCal() {
    const modal = await this.modalCtrl.create({
      component: OptionCalcComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }

  async GoToExchangeMsg() {
    const modal = await this.modalCtrl.create({
      component: ExchangeMsgComponent,
      componentProps: {
        'imageList': this.imageList,
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {

      });
    // this.loaderService.hideLoader();
    return await modal.present();
  }

  showMkrStatus() {
    this.showMarketStatus = !this.showMarketStatus;
  }

  backToSetting() {
    // this.modalCtrl.dismiss()
    window.history.back()
  }

  goToCheckMarket() {
    this.checkMarket = !this.checkMarket
  }


  fundLimitDetailed(val) {
    let param = {
      "entity_id": "12348",
      "source": "N",
      "token_id": "",
      "vi": "",
      "data": {
        "exchange": "BSE",
        "segment": "E",
        "mkt_type": val
      }
    }
    this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/MarketStatus', param).subscribe((res: any) => {

      this.MktStatus = res.data[0].mkt_status;
      if (this.MktStatus == "CLOSE") {
        if(val=='NL')this.status = true;
        if(val=='NL')this.status1 = true;
        if(val=='OL')this.status2 = true;
        if(val=='A2')this.status3 = true;

      }
      else {
        if(val=='NL')this.status = false;
        if(val=='NL')this.status1 = false;
        if(val=='OL')this.status2 = false;
        if(val=='A2')this.status3 = false;
      }


    })
  }


  GoToMemberDetails() {
    this.showMemberDetails = !this.showMemberDetails
  }

}

