import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { ToastService } from 'projects/core/src/lib/services/toast.service';

@Component({
  selector: 'app-education-category-dashboard',
  templateUrl: './education-category-dashboard.component.html',
  styleUrls: ['./education-category-dashboard.component.scss'],
})
export class EducationCategoryDashboardComponent implements OnInit {
  @Input() imageList:any;
  @Input() educationListData:any;
  @Input() currentMoneySymbols:any;
  @Input() title:any;
  @Input() otherTextName:any;
  @Input() showOtherText:any;


  labelIcon: any;
  notificationCount: any;
  cartCount:any = 0;
  currentMode:any=1;
  mfFooterData:any;
  errorList:any;
  currentLanguage:any
  loginCustGuId:any;

  constructor(private modalCtrl: ModalController, private toastService:ToastService, private allConfigDataService:AllConfigDataService, private commonService:CommonService) {
    this.mfFooterData = this.allConfigDataService.getConfig('educationTab');
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

  getEducationMainPage(e){
    this.modalCtrl.dismiss(e);
  }
  redirectTCardDetails(e){
    this.toastService.showAutoToast('Coming soon...!')
    this.modalCtrl.dismiss(e);
  }
  dismiss(){
    this.modalCtrl.dismiss();
  }
}
