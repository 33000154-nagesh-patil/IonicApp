import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SubBrandPopUpComponent } from '../../sub-brand-pop-up/sub-brand-pop-up.component';
import { AllConfigDataService, CommonService, CommonFunctionService } from 'index';
import { HttpClient } from '@angular/common/http';
import { ToastService } from 'index';


@Component({
  selector: 'lib-voucher-spinner',
  templateUrl: './voucher-spinner.component.html',
  styleUrls: ['./voucher-spinner.component.scss'],
})
export class VoucherSpinnerComponent implements OnInit {
widthVal:number=400
box: any;
api: any;
deg: any;
spin: any;
gamesData: any;
data :any;
btnDis: any = false;
apiCatalog: any;
appEnviron: any;
breadCrumb: string;
rewardData: any;
gamePrize: any;
@Output() getslideValue=new EventEmitter();
coins: any;
getCardDetails: any;
sku: any;
error: any;


  constructor(private service: ToastService,private commonFunctionService:CommonFunctionService, private modalCtrl:ModalController, private router: Router,private common:CommonService,private allConfigDataService: AllConfigDataService,private http:HttpClient) {
    this.gamesData = this.router.getCurrentNavigation().extras.state.games;
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
  }

  ngOnInit() {
    this.data = this.gamesData.voucher;
    this.getCardDetails=this.commonFunctionService.getClubCard()
    this.sku = this.getCardDetails.sku;
   }

  startSpin(){

    if(this.coins < 1000){
      this.btnDis = true;
      this.service.showAutoToast('Not Enough Coins To Play')
    }else{
      let params =
      {
        "sku": this.sku,
        "TokenId": "PC0kNQ8zF7fa5x08cXNggERCRBA/1ak9FpuPp//G9X6os3piQ0BAObhQBOH3CQO5e2YbacrfdPr4NBtpxGy/oj8wuhhp9J5qKcbZTwoVxlHSIOZdbWyo2Qhw7HI2PYXse/XWeSqvmQ2H",
        "game": "voucher"
      }
      // this.rewards=torusClubDashBoard.allData
      this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getStatus + "?torusWinnerPrize",params).subscribe(
        (data: any) => {
          if(data.errorCode == '0') {
            console.log('error')
               this.error = 'Something went wrong'
               this.gamePrize = {
                reward: " ",
                spinOn: " ",
                error: this.error
               }
             this.getslideValue.emit(this.gamePrize)
          }else if(data){
            this.rewardData = data.voucher;      
            console.log(this.rewardData,"karma");
  
            if(this.rewardData.prize == '40% off') {
              this.api = 92
              this.spin = "spinned";
            }else if(this.rewardData.prize == '10% off') {
              this.api = 94.7
              this.spin = "spinned";
            }else if(this.rewardData.prize == '30% off') {
              this.api = 89.5
              this.spin = "spinned";
            }else if(this.rewardData.prize == '0'){
                 this.api = 100
                 this.spin = "spinned";
            }else if(this.rewardData.prize == '20% off'){
                 this.api = 110.7
                 this.spin = "spinned";
            }
  
            this.gamePrize = {
              reward: this.rewardData,
              spinOn: this.spin,
              error: this.error
             }
             this.getslideValue.emit(this.gamePrize)
            this.deg = this.api * 27
            document.getElementById('box').style.transform = "rotate("+this.deg+"deg)";
            document.getElementById('btn').style.opacity = "0.5";
          }
        });

    }
    }
}
