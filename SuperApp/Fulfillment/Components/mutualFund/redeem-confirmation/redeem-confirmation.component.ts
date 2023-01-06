import { AllConfigDataService } from 'index';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-redeem-confirmation',
  templateUrl: './redeem-confirmation.component.html',
  styleUrls: ['./redeem-confirmation.component.scss'],
})
export class RedeemConfirmationComponent implements OnInit {
  imageList:any
  title1:any
  title2:any
  SelectedCard:any
  CurrentValueFund:any
  Currentdate: any;
  constructor(private allconfig:AllConfigDataService,private modalctrl:ModalController,private router:Router, private commonfunction: CommonFunctionService) { }

  ngOnInit() {
    this.imageList=this.allconfig.getConfig("images")
    // this.DummayAPiData = this.router.getCurrentNavigation().extras.state.DummayAPiData;
    // this.SelectedCard = this.router.getCurrentNavigation().extras.state.SelectedCard;
    // this.CurrentValueFund = this.router.getCurrentNavigation().extras.state.CurrentValueFund;
    // // this.title1 = this.router.getCurrentNavigation().extras.state.title1;
    // // this.title2 = this.router.getCurrentNavigation().extras.state.title2;
    // this.Currentdate = this.commonfunction.dobFormattedYYYYMMDD(new Date())
  }
  backF(){
    // this.modalctrl.dismiss()
    window.history.back();

  }

  async hendler(){
    this.router.navigate(['/Fullfilment/MutualFunds/transaction'], {
      state: {
        opneSegment: "All",
      }
    });
    //console.log("this.healthData",this.healthData)
      // this.loaderService.showLoader();
      // const modal = await this.modalctrl.create({
      //   component: TransactionHistoryComponent ,
      //   cssClass: 'h-100 w-100 modal-fullscreen',
      //   componentProps: {
      //     "opneSegment":"InProgress"
      //   },
      //   backdropDismiss:false
      // });
      // modal.onDidDismiss()
      // .then((data) => {
  
        
        
  
      // });
      // // this.loaderService.hideLoader();
      // return await modal.present();
  }
  openPortfolio(){
    // this.modalctrl.dismiss("1");
    this.router.navigate(['/Engagement']); 

  }
}
