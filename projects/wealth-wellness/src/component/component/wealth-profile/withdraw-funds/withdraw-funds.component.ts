import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service'
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import stFunds from '../../../../../../../SuperApp/Operations/wealth/Stocks/dematfunds.json'


@Component({
  selector: 'app-withdraw-funds',
  templateUrl: './withdraw-funds.component.html',
  styleUrls: ['./withdraw-funds.component.scss'],
})
export class WithdrawFundsComponent implements OnInit {
  imageList: any = [];
  currencyList: any;
  currencySymbol: any;
  currentAmount: any;
  showError: any;
  value: number = 0;
  availableToInvest: number;
  usedFunds: number;
  totalFunds: number;
  stockFunds: any;
  constructor(private allConfigDataService: AllConfigDataService, private modalCtrl: ModalController, private http:HttpClient) { }

  ngOnInit() {
    this.stockFunds = stFunds
    console.log(this.stockFunds,"hbc");

    this.fundLimitDetailed()
    this.imageList = this.allConfigDataService.getConfig('images')
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']
  }




  public onQtrInputChange(event: any) {
    this.showError = false;
    console.log(event);
    if (event.replace(/\D/g, '') === '') {
      this.currentAmount = 0;
    } else {
      this.currentAmount = Number(event.replace(/\D/g, ''));
    }
  }


  setAmount(e) {
    this.onQtrInputChange(e);
    this.value = e;
  }
  goBack() {
    this.modalCtrl.dismiss("hello")
  }



  fundLimitDetailed() {
    let param = {
      "entity_id": "123456",
      "source": "M",
      "data": {
        "client_id": localStorage.getItem("ClientID")
      }
    }

    this.http.post('https://aqapicug.rsec.co.in/api/v1/wealth/stock/Mpost/FundLimit', param).subscribe((data: any) => {
      if(!this.availableToInvest)
      {
        this.availableToInvest=0;
      } if(!this.usedFunds)
      {
        this.usedFunds=0;
      } if(!this.totalFunds){
        this.totalFunds =0;
      }
      this.availableToInvest = data.data[0].available_balance
      this.usedFunds = data.data[0].amount_utilized
      this.totalFunds = data.data[0].total_balance
    })
  }

}
