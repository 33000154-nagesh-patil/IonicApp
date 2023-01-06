import { CommonFunctionService } from 'index';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, HostListener  } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { SubBrandPopUpComponent } from '../../sub-brand-pop-up/sub-brand-pop-up.component';
import { ToastService } from 'index';

@Component({
  selector: 'lib-gift-card-spinner',
  templateUrl: './gift-card-spinner.component.html',
  styleUrls: ['./gift-card-spinner.component.scss'],
})
export class GiftCardSpinnerComponent implements OnInit {

  aboveValue: boolean = false;
  belowValue: boolean = true;
  winner: boolean = true;
  looser:boolean = false;
  count: any = 70;
  lastNum: any = 0;
  gamesData: any;
  data: any;
  @Output() getslideValue=new EventEmitter()
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string
  rewardData: any;
  gamePrize: any;
  spin: any;
  headerData: any;
  coins: any;
  getCardDetails: any;
  sku: any;

  constructor(private service: ToastService,private commonFunctionService:CommonFunctionService,private modalCtrl:ModalController, private router: Router,private http:HttpClient,private allConfigDataService: AllConfigDataService) {
    this.gamesData = this.router.getCurrentNavigation().extras.state.games;
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
  }

  ngOnInit() {
    this.data = this.gamesData.giftCard;
    this.headerData = this.commonFunctionService.getClubHeader();
    this.coins = this.headerData.coins;
    this.getCardDetails=this.commonFunctionService.getClubCard();
    this.sku = this.getCardDetails.sku;
    const input = (<HTMLInputElement>document.getElementById("input"))

      input.addEventListener("input", () => {
        // this.getslideValue.emit(input.value)

        if(this.coins < 1000){
           input.disabled = true;
           input.value = '0';
          this.service.showAutoToast('Not Enough Coins To Play')
        }else{
          if(Number(input.value) == 0) {
            this.count = 70;
          }else if(Number(input.value) == 100) {
            this.prizeData(input.value);
            this.count = -200;
            this.winner = false;
            this.looser = true;
            input.disabled = true;
          }

          if(Number(input.value) > 50){
            input.className = 'MyClass-1';
          }else if(Number(input.value) < 50){
            input.className = ' '
          }


        if(this.lastNum < input.value && Number(input.value) > 1) {
            this.count = this.count - 4;
            this.aboveValue = true;
            this.belowValue = false;
        }else {
            this.count = this.count + 4;
        }
        this.lastNum = input.value;
        }
      })

  }

  onInput1(val){
    if(this.lastNum < val) {
      console.log("increasing");
  } else {
      console.log("decreasing");
  }
  this.lastNum = val;
  }

  prizeData(e) {
    let params =
    {
      "TokenId": "",
      "game": "gift",
      "sku": this.sku
    }
    // this.rewards=torusClubDashBoard.allData
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getStatus + "?torusWinnerPrize",params).subscribe(
      (data: any) => {
        this.rewardData = data.giftBox;
        this.spin = e;
        this.gamePrize = {
         reward: this.rewardData,
         spinOn: this.spin
        }
        this.getslideValue.emit(this.gamePrize)
        console.log(this.rewardData,"karma");

      })
  }

}
