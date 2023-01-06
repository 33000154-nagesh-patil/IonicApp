import { CommonFunctionService } from 'index';
import { HttpClient } from '@angular/common/http';
import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { SubBrandPopUpComponent } from '../../sub-brand-pop-up/sub-brand-pop-up.component';
import { ToastService } from 'index';

@Component({
  selector: 'lib-cash-back-spinner',
  templateUrl: './cash-back-spinner.component.html',
  styleUrls: ['./cash-back-spinner.component.scss'],
})
export class CashBackSpinnerComponent implements OnInit {
  count:any= 230;
  opace: any = 0
  lastNum: any = 0;
  popupcss: boolean = true;
  belowValue:boolean = true;
  aboveValue:boolean = false;
  gamesData: any;
  data :any;
  @Output() getslideValues=new EventEmitter()
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

  constructor(private service: ToastService,private commonFunctionService:CommonFunctionService,private modalCtrl: ModalController, private router: Router,private http:HttpClient,private allConfigDataService: AllConfigDataService) {
    this.gamesData = this.router.getCurrentNavigation().extras.state.games;
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
  }

  ngOnInit() {
    this.data = this.gamesData.cashBack;
    this.headerData = this.commonFunctionService.getClubHeader();
    this.coins = this.headerData.coins;
    this.getCardDetails=this.commonFunctionService.getClubCard();
    this.sku = this.getCardDetails.sku;
    const input = (<HTMLInputElement>document.getElementById('input'));
    const Container = (<HTMLInputElement>document.getElementById('container'));
    const Image1 = (<HTMLInputElement>document.getElementById('custImg1'));
    const Image2 = (<HTMLInputElement>document.getElementById('custImg2'));
    const Image3 = (<HTMLInputElement>document.getElementById('custImg3'));


    input.addEventListener('input', () => {
      // this.getslideValues.emit(input.value)

      if(this.coins < 1000){
        input.disabled = true;
        input.value = '0';
        this.service.showAutoToast('Not Enough Coins To Play')
      }else {
        if (input.value === '100') {
          this.prizeData(input.value);
          this.count= 307.7;
          Container.classList.add('container');
          setTimeout(()=>{
          Image1.classList.add('imgCusts1');
          Image2.classList.add('imgCusts2');
          Image3.classList.add('imgCusts3');
          },500);
          this.opace = 1;
          input.disabled = true;
        }else if(Number(input.value) == 0) {
          this.count= 230;
          this.opace = 0
        }

        if(this.lastNum < input.value && Number(input.value) > 7) {
          this.count = this.count + 1.3;
          this.opace = this.opace + 0.009;
          this.aboveValue = true;
          this.belowValue = false;
      }else {
        this.count = this.count - 1.4;
        this.opace = this.opace - 0.009;
      }
      this.lastNum = input.value;
      }

    });

  }


  prizeData(e) {
    let params =
    {
      "TokenId": "",
      "game": "cashBack",
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
        this.getslideValues.emit(this.gamePrize)
        console.log(this.rewardData,"karma");

      })
  }

}
