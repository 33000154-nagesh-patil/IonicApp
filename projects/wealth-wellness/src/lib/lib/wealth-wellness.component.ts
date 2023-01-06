import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { SignInComponent } from 'projects/login-list/src/lib/sign-in/sign-in.component';
import {
  InAppBrowser,
  InAppBrowserOptions,
} from '@ionic-native/in-app-browser/ngx';
import { NetworkService } from 'projects/core/src/lib/services/network.service';

@Component({
  selector: 'lib-wealthWellness',
  templateUrl: './wealth-wellness.component.html',
  styleUrls: ['./wealth-wellness.component.scss'],
})
export class WealthWellnessComponent implements OnInit {
  userFirstName:any;
  userMobile:any;
  @Input() imageList:any;
  @Output() reDirectMutualFund = new EventEmitter();
  options: InAppBrowserOptions = {
    location: 'yes', //Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes', //Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'yes', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no', //iOS only
    presentationstyle: 'fullscreen', //iOS only
    fullscreen: 'yes', //Windows only
    toolbarposition: 'top',
    suppressesIncrementalRendering: 'no',
    transitionstyle: 'crossdissolve',
    toolbarcolor: '#D3D3D3',
  };
  loginData:any;
  currentDevice: string;
  MobileNo: string;
  constructor(private commonFunctionService:CommonFunctionService, private commonService:CommonService, private modalctrl:ModalController, private router:Router, private http:HttpClient,
    private networkService: NetworkService,
    private theInAppBrowser: InAppBrowser,
    ) { }

  ngOnInit() {
    this.commonService.getUserDetail().subscribe((data:any)=>{
      if(data){
        this.userFirstName = this.commonFunctionService.titleCaseWord(data?.FirstName?data?.FirstName:'user')
      }
    })

    this.commonService.getUserDetail().subscribe((data: any) => {
      if (data) {
        this.userMobile = data?.MobileNo
      }
    })
  }
  // gotoDashBoard(){
  //   this.router.navigate(['stocks/WealthD'])
  // }

  gotoDashBoard(e: any) {
    if (e == 'Stocks/WealthD') {
      this.checkOnboarding(e);
    }
    else{
      this.reDirectMutualFund.emit(e)
    }

  }

  checkOnboarding(e) {
    let param = {
      mobile: this.userMobile,
    };

    this.http
      .post(
        'https://apixuat.heytorus.com/api/v1/wealth/stock/Mpost/getClient',
        param
      )
      .subscribe(async (res: any) => {
        if (res.status === 1) {
          localStorage.setItem('ClientID', res.data[0].clientId);
          console.log(res.data[0].clientId, 'client ID genrated');
          // this.reDirectMutualFund.emit(e);

          this.router.navigate(['Stocks/Dashboard']);

        } else {
          // window.open("https://www.amazon.in/");
          // let target = '_self'; //CordovaBrowser
          // let target = "_system"; //system browser
          let target = '_blank'; //InAppBrowser
          if (this.currentDevice === 'iOS' || this.currentDevice === 'iphone') {
            target = '_blank';
          }
          let url = 'https://aq.reliancesmartmoney.com/';
          this.theInAppBrowser.create(url, target, this.options);

          localStorage.getItem('ClientID');
        }
      });
  }

  async navigateToStocks() {
      this.router.navigate(['stocks/WealthD']);

  }


//   addStock() {
//     for(const x of this.addNifty50){
//       const params={
//         // eslint-disable-next-line @typescript-eslint/naming-convention
//         entity_id: '100000',
//         source: 'A',
//         // eslint-disable-next-line @typescript-eslint/naming-convention
//         token_id: 'b72d763f83bb8393a493',
//         iv: 'o5507uAmo3eDCZ1ZJ2Q+gA==]',
//         data: {
//             // eslint-disable-next-line @typescript-eslint/naming-convention
//             client_id: 'A00116465',
//             // eslint-disable-next-line @typescript-eslint/naming-convention
//             wl_name: 'Nifty 50',
//             // eslint-disable-next-line @typescript-eslint/naming-convention
//             sec_id:x,
//             exch: 'NSE',
//             segment: 'E'
//         }
//     };
//       this.http.post('http://uat.torusdigital.in:5000/api/v1/wealth/stock/Mpost/AddMktWatchList',params).subscribe(res=>{});
//     }
//   }




// addNifty50: any = [
//     15083, 1134, 236, 541006, 540923, 16669, 317, 16675, 526, 10604, 547, 694,
//     20374, 10940, 881, 910, 1232, 7229, 1333, 467, 1348, 1363, 1394, 1330,
//     10201, 1660, 5258, 1594, 17869, 1922, 11483, 2031, 10999, 11630, 17963,
//     2475, 14977, 2885, 21808, 3103, 3045, 3351, 11536, 3432, 3456, 3499, 13538,
//     3506, 11287, 11532, 3787,
//   ];





}
