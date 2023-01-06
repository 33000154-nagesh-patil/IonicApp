import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import transaction from 'src/assets/transaction.json';

@Component({
  selector: 'lib-margin-pledge-transaction',
  templateUrl: './margin-pledge-transaction.component.html',
  styleUrls: ['./margin-pledge-transaction.component.scss'],
})
export class MarginPledgeTransactionComponent implements OnInit {
  imageList: any;
  close: boolean = true;
  data: any;
  history: boolean = false;
  // PledgeTransactions: boolean = true;
  // UnpledgeTransactions: boolean = false;

  pledgeT: boolean=false ;
  UpledgeT: boolean=false ;
  segment='PledgeTransactions';

  constructor(private allconfigDataService: AllConfigDataService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.imageList = this.allconfigDataService.getConfig('images');
    this.data = transaction;
  }
  show() {
    console.log("hello");
    this.close = !this.close;
    this.history = true;

  }

 
  segmentChanged() {
    if(this.segment=='PledgeTransactions')
    {
      this.pledgeT=true
      this.UpledgeT=false

    }
     if(this.segment=='UnpledgeTransactions')
     {
       this.UpledgeT=true
      this.pledgeT=false

     }
   }
 

  goBack() {
    this.modalCtrl.dismiss()
  }

}
