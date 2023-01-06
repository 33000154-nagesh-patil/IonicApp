import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-healthLabTestDashboard',
  templateUrl: './health-lab-test-dashboard.component.html',
  styleUrls: ['./health-lab-test-dashboard.component.scss'],
})
export class HealthLabTestDashboardComponent implements OnInit {
  mfFooterData: any;
  imageList: any;
  title:any;
  notificationCount:any = 0;
  cartCount:any = 0;
  textName:any;
  labelIcon:any;
  currentMode:any=0;
  // textName:any;
  // // wellnessFooterData:any;
  // currentNativeNetwork:any;
  // currentWindowNetwork:any;
  // isCordovaStatus:any;
  // currentLanguage:any;
  // errorList:any;
  // custGuId:any;
  constructor(private allConfigDataService: AllConfigDataService) { }

  ngOnInit() {
   this.title = "labTest"
    this.mfFooterData =  this.allConfigDataService.getConfig('labTest');
    this.imageList =  this.allConfigDataService.getConfig('images');

  }

}
