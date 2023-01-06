import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'app-explore-lab-health',
  templateUrl: './explore-lab-health.page.html',
  styleUrls: ['./explore-lab-health.page.scss'],
})
export class ExploreLabHealthPage implements OnInit {
  [x: string]: any;
  title: string;
  imageList: any;


  // [x: string]: any;

  // title: any;
  // imageList: any;
  notificationCount: any = 0;
  cartCount: any = 0;
  textName: any;
  labelIcon: any;
  currentMode: any=1;
  // LabFooterData: any;
  // errorList:any;
  currentLanguage: any;
  currentMoneySymbols: any;
  investmentStatus: any=false;
  goldSilverData: any;
  currentFetcherModule: any;
  loginCustGuId: any;
  stepperData: any;
  goldDataList: any;
  // SilverDataList: any;
  currentFetcherModuleSilver: any;
  stepperDataSilver: any;
  currentDigiDataOrderList: any;
  // subscription: Subscription;
  // LabFooterData: any;

  constructor(private allConfigDataService: AllConfigDataService) { }

  ngOnInit() {
    this.title='Lab Tests';
    this.imageList = this.allConfigDataService.getConfig('images');
    this.LabFooterData = this.allConfigDataService.getConfig('labTest');
  }

}
