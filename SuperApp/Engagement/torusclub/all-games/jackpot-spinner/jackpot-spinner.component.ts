import { CommonFunctionService } from './../../../../../projects/core/src/lib/services/common-function.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'index';
import { AllConfigDataService } from 'index';
// import * as confetti from 'canvas-confetti';

@Component({
  selector: 'lib-jackpot-spinner',
  templateUrl: './jackpot-spinner.component.html',
  styleUrls: ['./jackpot-spinner.component.scss'],
  animations: [
    trigger('letterOne', [
      state('0', style({ transform: 'translateY(0%)', offset: 1.0 })),
      transition('* => 0', animate(0)),
      state('1', style({ transform: 'translateY(-1200%)', offset: 1.0 })),
      transition('* => 1', animate(1500)),
      transition('1 => *', animate(1500)),
      state('2', style({ transform: 'translateY(-1300%)', offset: 1.0 })),
      transition('* => 2', animate(1500)),
      transition('2 => *', animate(1500)),
      state('3', style({ transform: 'translateY(-1400%)', offset: 1.0 })),
      transition('* => 3', animate(1500)),
      transition('3 => *', animate(1500)),
      state('4', style({ transform: 'translateY(-1500%)', offset: 1.0 })),
      transition('* => 4', animate(1500)),
      transition('4 => *', animate(1500)),
      state('5', style({ transform: 'translateY(-1600%)', offset: 1.0 })),
      transition('* => 5', animate(1500)),
      transition('5 => *', animate(1500)),
      state('6', style({ transform: 'translateY(-1700%)', offset: 1.0 })),
      transition('* => 6', animate(1500)),
      transition('6 => *', animate(1500))
    ]),
    trigger('letterTwo', [
      state('0', style({ transform: 'translateY(0%)', offset: 1.0 })),
      transition('* => 0', animate(0)),
      // transition('0 => *', animate(0)),
      state('1', style({ transform: 'translateY(-1200%)', offset: 1.0 })),
      transition('* => 1', animate(1900)),
      transition('1 => *', animate(1900)),
      state('2', style({ transform: 'translateY(-1300%)', offset: 1.0 })),
      transition('* => 2', animate(1900)),
      transition('3 => *', animate(1900)),
      state('3', style({ transform: 'translateY(-1400%)', offset: 1.0 })),
      transition('* => 3', animate(1900)),
      transition('3 => *', animate(1900)),
      state('4', style({ transform: 'translateY(-1500%)', offset: 1.0 })),
      transition('* => 4', animate(1900)),
      transition('4 => *', animate(1900)),
      state('5', style({ transform: 'translateY(-1600%)', offset: 1.0 })),
      transition('* => 5', animate(1900)),
      transition('5 => *', animate(1900)),
      state('6', style({ transform: 'translateY(-1700%)', offset: 1.0 })),
      transition('* => 6', animate(1900)),
      transition('6 => *', animate(1900))
    ]),
    trigger('letterThree', [
      state('0', style({ transform: 'translateY(0%)', offset: 1.0 })),
      transition('* => 0', animate(0)),
      // transition('0 => *', animate(0)),
      state('1', style({ transform: 'translateY(-1200%)', offset: 1.0 })),
      transition('* => 1', animate(1700)),
      transition('1 => *', animate(1700)),
      state('2', style({ transform: 'translateY(-1300%)', offset: 1.0 })),
      transition('* => 2', animate(1700)),
      transition('2 => *', animate(1700)),
      state('3', style({ transform: 'translateY(-1400%)', offset: 1.0 })),
      transition('* => 3', animate(1700)),
      transition('3 => *', animate(1700)),
      state('4', style({ transform: 'translateY(-1500%)', offset: 1.0 })),
      transition('* => 4', animate(1700)),
      transition('4 => *', animate(1700)),
      state('5', style({ transform: 'translateY(-1600%)', offset: 1.0 })),
      transition('* => 5', animate(1700)),
      transition('5 => *', animate(1700)),
      state('6', style({ transform: 'translateY(-1700%)', offset: 1.0 })),
      transition('* => 6', animate(1700)),
      transition('6 => *', animate(1700))
    ]),
  ],
})
export class JackpotSpinnerComponent implements OnInit {
  imageList: any;
  spin: any;
  spinned: any;
  gamesData: any;
  data: any;
  jackpotIcons: any;
  @Output() getslideValue = new EventEmitter()
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  rewardData: any;
  gamePrize: any;
  btnDis: any = false;
  coins: any;
  getCardDetails: any;
  sku: any;
  letterOne: any;
  letterTwo: any;
  letterThree: any;
  slotVal: any;


  constructor(private commonFunctionService:CommonFunctionService,private service: ToastService,private allconfig: AllConfigDataService, private router: Router, private allConfigDataService: AllConfigDataService, private http: HttpClient) {
    this.gamesData = this.router.getCurrentNavigation().extras.state.games;
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/EngagementTorusClub';
  }

  ngOnInit() {
    this.data = this.gamesData.jackpot
    this.jackpotIcons = this.gamesData.jackpot.jackpotIcons
    this.spin = this.gamesData.jackpot.spinCount
    this.imageList = this.allconfig.getConfig('images')
    this.getCardDetails=this.commonFunctionService.getClubCard();
    this.sku = this.getCardDetails.sku;
    console.log(this.data,"jjjj")
  }

  spinFun() {
    // confetti.create()({
    //   particleCount: 600,
    //   spread: 100,
    //   origin: { y: 4,x: 1 }
    // });
    if(this.coins < 1000){
      this.btnDis = true;
      this.service.showAutoToast('Not Enough Coins To Play')
    }else{
      this.letterOne  = 0;
      this.letterTwo = 0;
      this.letterThree = 0;
    let params =
    {
      "TokenId": "PC0kNQ8zF7fa5x08cXNggERCRBA/1ak9FpuPp//G9X6os3piQ0BAObhQBOH3CQO5e2YbacrfdPr4NBtpxGy/oj8wuhhp9J5qKcbZTwoVxlHSIOZdbWyo2Qhw7HI2PYXse/XWeSqvmQ2H",
      "game": "jackPot",
      "sku": this.sku
    }
    // this.rewards=torusClubDashBoard.allData
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.getStatus + "?torusWinnerPrize", params).subscribe(
      (data: any) => {
        this.rewardData = data.jackPot
        this.slotVal = this.rewardData.slotVal
        this.spinned = "jackpot"
        this.gamePrize = {
          reward: this.rewardData,
          spinOn: this.spinned
        }
        this.getslideValue.emit(this.gamePrize)
         this.letterOne  = this.slotVal[0];
         this.letterTwo = this.slotVal[1]
         this.letterThree = this.slotVal[2]

      })
    // this.getslideValue.emit(this.spinned)
    setTimeout(() => {
      this.spin = this.spin - 1;
    },1900)
    if(this.spin == 0 ){ this.btnDis = true;}
  }

}
}

