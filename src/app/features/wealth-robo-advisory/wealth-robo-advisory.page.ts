import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
@Component({
  selector: 'app-wealth-robo-advisory',
  templateUrl: './wealth-robo-advisory.page.html',
  styleUrls: ['./wealth-robo-advisory.page.scss'],
})
export class WealthRoboAdvisoryPage implements OnInit {
  title:any='wealthRoboAdvisory'
  currentLanguage: any;
  errorList: any;
  imageList: any;
  currentMoneySymbols:any;
  currentMode:any=1
  constructor(private allConfigDataService:AllConfigDataService) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    this.currentMoneySymbols = this.allConfigDataService.getConfig('listCodeCountry')[this.allConfigDataService.getConfig('currentAppInitialized')];
    if(this.currentLanguage){
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if(allErrorList){
        this.errorList = allErrorList[this.currentLanguage];
      }
      
    }
    this.allConfigDataService.appMode.subscribe((data)=>{
      this.currentMode = data;
    })
  }

}
