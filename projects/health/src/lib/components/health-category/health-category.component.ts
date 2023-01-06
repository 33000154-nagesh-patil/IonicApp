import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
@Component({
  selector: 'lib-health-category',
  templateUrl: './health-category.component.html',
  styleUrls: ['./health-category.component.scss'],
})
export class HealthCategoryComponent implements OnInit {
  @Input() imageList:any;
  @Input() healthData:any;
  @Input() currentMoneySymbols:any;
  @Input() title:any;
  @Input() otherTextName:any;
  @Input() showOtherText:any;

  labelIcon: any;
  notificationCount:any;
  cartCount:any = 0;
  currentMode:any=1;
  mfFooterData:any;
  errorList:any;
  currentLanguage:any
  loginCustGuId:any;
  constructor(private modalCtrl: ModalController, private allConfigDataService:AllConfigDataService, private commonService:CommonService) {
    this.mfFooterData = this.allConfigDataService.getConfig('healthTab');
    this.currentMoneySymbols = this.allConfigDataService.getConfig('listCodeCountry')[this.allConfigDataService.getConfig('currentAppInitialized')];
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    if(this.currentLanguage){
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if(allErrorList){
        this.errorList = allErrorList[this.currentLanguage];
      }

    }
    this.allConfigDataService.appMode.subscribe((data)=>{
      this.currentMode = data;
    })
    this.commonService.getCustomerGuID().subscribe((data:any)=>{
      if(data){
        this.loginCustGuId = data;
      }
    })
   }

  ngOnInit() {}

  getHealthMainPage(e){
    this.modalCtrl.dismiss(e);
  }
  redirectTCardDetails(e){
    this.modalCtrl.dismiss(e);
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
}
