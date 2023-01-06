import { Component, Input, OnInit } from '@angular/core';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { HealthCategoryComponent } from './components/health-category/health-category.component';
import { Router } from '@angular/router';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
@Component({
  selector: 'lib-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.scss'],
})
export class HealthComponent implements OnInit {
  userFirstName:any;
  @Input() imageList:any;
  @Input() healthData:any;
  @Input() currentMoneySymbols:any;
  @Input() errorList:any;
  @Input() StepperData:any;
  @Input() healthCategoryData:any;

  constructor(private commonFunctionService:CommonFunctionService, private commonService:CommonService,public modalController: ModalController,private loaderService:LoaderService, private router:Router) { }

  ngOnInit() {

    this.commonService.getUserDetail().subscribe((data:any)=>{
      if(data){
        this.userFirstName = this.commonFunctionService.titleCaseWord(data?.FirstName?data?.FirstName:'user');
      }
    })
   
  }

  async openHealthCategoryList(title){
    // console.log("this.healthData",this.healthData)
    // console.log("headerTitle",title)
      this.loaderService.showLoader();
      const modal = await this.modalController.create({
        component: HealthCategoryComponent,
        cssClass: 'h-100 w-100 modal-fullscreen',
        componentProps: {
          'imageList':this.imageList,
          'currentMoneySymbols':this.currentMoneySymbols,
          'healthData':this.healthData,
          'showOtherText':'true',
          'otherTextName':title
        },
        backdropDismiss:false
      });
      modal.onDidDismiss()
      .then((data) => {
        if(data && data?.data){
          // console.log("Umesh ", JSON.stringify(data))
          if(data.data != 'Health'){
            this.commonService.setProductData({productDetails:data,currentModule:'Health'});
            this.router.navigate(['/ProductDetails']);
          } 
        }
      });
      this.loaderService.hideLoader();
      return await modal.present();
  }

}
