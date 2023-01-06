import { AllConfigDataService } from './../../../../projects/core/src/lib/services/all-config-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-digi-gold-silver',
  templateUrl: './digi-gold-silver.page.html',
  styleUrls: ['./digi-gold-silver.page.scss'],
})
export class DigiGoldSilverPage implements OnInit {
  imageList: any;
  title:any;
  goldFooterData:any
  notificationCount:any = 0;
  cartCount:any = 0;
  textName:any="Digi Gold";
  labelIcon:any;
  currentMode:any=0;
  wellnessFooterData:any;
  currentNativeNetwork:any;
  currentWindowNetwork:any;
  isCordovaStatus:any;
  currentLanguage:any;
  errorList:any;
  custGuId:any;
  loggedInModal:boolean=false
  ErrorMsg:any;
  commodity:any// rama
  type:any// rama digi
  show:boolean=false// rama digi
  mfFooterData: any;

  currentMoneySymbols:any;
  stepperData:any;
  loginCustGuId:any;
  currentFetcherModule:any;

  constructor(private allConfigDataService: AllConfigDataService) { }

  ngOnInit() {

    this.imageList = this.allConfigDataService.getConfig('images');
    this.goldFooterData = this.allConfigDataService.getConfig('goldTab');
  }

}
