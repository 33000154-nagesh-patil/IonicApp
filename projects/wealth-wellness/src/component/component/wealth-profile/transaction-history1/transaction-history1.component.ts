import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-transaction-history1',
  templateUrl: './transaction-history1.component.html',
  styleUrls: ['./transaction-history1.component.scss'],
})
export class TransactionHistory1Component implements OnInit {
  @Input() imageList: any;
  currentTextType: any = 'Yes';
  hideWithDrawals: boolean = true;
  hideAddFunds: boolean = false;
  color: boolean;
  PaymentFails: boolean = false;

  constructor(private allConfigDataService: AllConfigDataService, private modalctrl: ModalController) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images')
  }


  changeColor(e) {
    this.color = !e;
    if (this.color) {
      this.currentTextType = 'No';
      this.hideWithDrawals = false;
      this.hideAddFunds = true;
      this.PaymentFails= false;

    } else {
      this.currentTextType = 'Yes';
      this.hideWithDrawals = true;
      this.hideAddFunds = false;
      this.PaymentFails= false;

    }
  }
  back() {
    this.modalctrl.dismiss();
  }

  BankDetailsDeposits = [
    {
      "BankName": "ICICI Bank",
      "time": "17 Mar 2021, 4:55 PM",
      "Amount": "100.00",
      "Progress":"Success"
    },
    {
      "BankName": "Axis Bank",
      "time": "17 Mar 2021, 4:55 PM",
      "Amount": "100.00",
      "Progress":"Failed"
    },
    {
      "BankName": "HDFC Bank",
      "time": "17 Mar 2021, 4:55 PM",
      "Amount": "100.00",
      "Progress":"Success"

    }
  ]
  BankDetailsWithdraw = [
    {
      "BankName": "ICICI Bank",
      "time": "17 Mar 2021, 4:55 PM",
      "Amount": "100.00",
      "Progress":"In Progress"
    },
    {
      "BankName": "Axis Bank",
      "time": "17 Mar 2021, 4:55 PM",
      "Amount": "100.00",
      "Progress":"Successful"
    },
    {
      "BankName": "HDFC Bank",
      "time": "17 Mar 2021, 4:55 PM",
      "Amount": "100.00",
      "Progress":"Successful"
    }
  ]
}