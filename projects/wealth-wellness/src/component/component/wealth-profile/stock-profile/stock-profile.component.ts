import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { DematFundsComponent } from '../demat-funds/demat-funds.component';
import { SettingComponent } from '../setting/setting.component';
import watchList from 'src/assets/watchListJson.json';
import { AddFundsComponent } from '../add-funds/add-funds.component';
import { HistoricalReportComponent } from '../historical-report/historical-report.component';
import { Route, Router } from '@angular/router';
import { ClientDetailsComponent } from '../client-details/client-details.component';
import { WatchListNewComponent } from '../../wealth-watchlist/watch-list-new/watch-list-new.component';
import { HttpClient } from '@angular/common/http';
import { NewListComponent } from '../../wealth-watchlist/new-list/new-list.component';

@Component({
  selector: 'lib-stock-profile',
  templateUrl: './stock-profile.component.html',
  styleUrls: ['./stock-profile.component.scss'],
})
export class StockProfileComponent implements OnInit {
  imageList: any;
  stocksTab: any;
  CurrentFund: number;
  hideIndex: any = false;
  json2 = watchList.index;

  constructor(
    private allConfigDataService: AllConfigDataService,
    private modalCtrl: ModalController,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fundLimitDetailed();
    this.imageList = this.allConfigDataService.getConfig('images');
    this.stocksTab = this.allConfigDataService.getConfig('stocksTab');
  }
  showIndex() {
    this.hideIndex = !this.hideIndex;
  }

  fundLimitDetailed() {
    let param = {
      entity_id: '123456',
      source: 'M',
      data: {
        client_id: localStorage.getItem('ClientID'),
      },
    };
    this.http
      .post(
        'https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/FundLimit',
        param
      )
      .subscribe((data: any) => {
        if (!this.CurrentFund) {
          this.CurrentFund = 0;
        }
        this.CurrentFund = data.data[0].available_balance;
      });
  }

  // async goToDematFunds() {
  //   const modal = await this.modalCtrl.create({
  //     component: DematFundsComponent,
  //     componentProps: {
  //     },
  //     backdropDismiss: true
  //   });
  //   modal.onDidDismiss().then((data) => {
  //   })
  //   modal.present();
  // }

  goToDematFunds() {
    this.router.navigate(['stocks/goToDematFunds']);
  }

  // async goToSetting() {
  //   const modal = await this.modalCtrl.create({
  //     component: SettingComponent,
  //     componentProps: {},
  //     backdropDismiss: true,
  //   });
  //   modal.onDidDismiss().then((data) => {});
  //   modal.present();
  // }


  goToSetting() {
    this.router.navigate(['stocks/goToSetting']);
  }





  // async goToHistoricalReports() {
  //   const modal = await this.modalCtrl.create({
  //     component: HistoricalReportComponent,
  //     componentProps: {},
  //     backdropDismiss: true,
  //   });
  //   modal.onDidDismiss().then((data) => {});
  //   modal.present();
  // }


  async goToHistoricalReports() {
    this.router.navigate(['stocks/goToHistoricalReports']);
  }



  async goToWatchlist() {
    this.router.navigate(['stocks/WatchList']);
  }

  // async goToClientDetails() {
  //   const modal = await this.modalCtrl.create({
  //     component: ClientDetailsComponent,
  //     backdropDismiss: true
  //   });
  //   modal.onDidDismiss().then((data) => {
  //   })
  //   modal.present();
  // }

  goToClientDetails() {
    this.router.navigate(['stocks/ClientDetails']);
  }




  async goToAddFunds() {
    const modal = await this.modalCtrl.create({
      component: AddFundsComponent,
      backdropDismiss: true,
    });
    modal.onDidDismiss().then((data) => {});
    modal.present();
  }

  async goToEditIndex() {
    const modal = await this.modalCtrl.create({
      component: NewListComponent,
      componentProps: {},
      backdropDismiss: true,
    });
    modal.onDidDismiss().then((data) => {});
    modal.present();
  }
}
