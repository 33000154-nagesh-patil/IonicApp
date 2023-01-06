import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { AllConfigDataService } from 'index'
import { CommonFunctionService } from 'index'
import { CommonService } from 'index'
import { LoaderService } from 'index'

@Component({
  selector: 'lib-portfolioInsigths',
  templateUrl: './portfolio-insigths.component.html',
  styleUrls: ['./portfolio-insigths.component.scss'],
})
export class PortfolioInsigthsComponent implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  @Input() footerListData:any;
  @Input() activeImg:any;
  @Input() selectedIndex:any;
  @Input() parentTab:any;

  selectedIndexNew: any;

  filterTabs: any;
  segmentModel = "";
  expFund: any;
  myLabels: any;
  myWealthLabels: any;
  startInvestments: any;
  errorList: any;
  currentLanguage: any;
  titleLabel: string ="My Wealth Portfolio";
  isLifestyle:boolean = true;
  imageList: any;

  constructor(private _router: Router, private allConfigDataService: AllConfigDataService, private commonFunctionService: CommonFunctionService, private commonService: CommonService, private loaderService: LoaderService) {
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    if (this.currentLanguage) {
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if (allErrorList) {
        this.errorList = allErrorList[this.currentLanguage];
      }

    }
    this.selectedIndexNew = "1";
    this.GetDynamicData();
  }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }

  startInvesting(){
    
  }

  GetDynamicData() {
    this.commonService.getDummyBasicModeLabelsEN().subscribe((data: any) => {
      // this.loaderService.hideLoader();
      if (data) {
        this.myLabels = data;
      } else {
        this.errorShow("Expo Fund Data", "collectionExpo -> data status")
      }

    },
      (error: any) => {
        this.errorShow(error, "collectionExpo -> Http response")
      }
    )


    this.commonService.getDummyBasicModeDataAPI().subscribe((data: any) => {
      // this.loaderService.hideLoader();
      if (data) {
        this.filterTabs = data.filterTab;
        this.expFund = data.exploreFunds;
      } else {
        this.errorShow("Expo Fund Data", "collectionExpo -> data status")
      }

    },
      (error: any) => {
        this.errorShow(error, "collectionExpo -> Http response")
      }
    )

    this.commonService.getDummyBasicModeWealthLabels().subscribe((data: any) => {
      // this.loaderService.hideLoader();
      if (data) {
        this.myWealthLabels = data;
        this.startInvestments = data.startInvestment;
      } else {
        this.errorShow("Expo Fund Data", "collectionExpo -> data status")
      }

    },
      (error: any) => {
        this.errorShow(error, "collectionExpo -> Http response")
      }
    )
  }

  tabChange(tabName){
    if(tabName === 'wealth'){
      this.titleLabel = "My Wealth Portfolio";
    } else if(tabName === 'health'){
      this.titleLabel = "My Health Portfolio";
    } else if(tabName === 'education'){
      this.titleLabel = "My Education Portfolio";
    }else if(tabName === 'Lifestyle'){
      this.titleLabel = "My Lifestyle Portfolio";
      this.selectedIndexNew = "4";
    }
  }

  selectTab(event){
    //this.loaderService.showLoader();
    // console.log("event",event)
    // console.log("index position",indexOfelement)

    if(event === 'wealth'){
      this.titleLabel = "My Wealth Portfolio";
      this.selectedIndexNew = "1";
    } else if(event === 'Health'){
      this.titleLabel = "My Health Portfolio";
      this.selectedIndexNew = "2";
    } else if(event === 'Education'){
      this.titleLabel = "My Education Portfolio";
      this.selectedIndexNew = "3";
    }else if(event === 'Lifestyle'){
      this.titleLabel = "My Lifestyle Portfolio";
      this.selectedIndexNew = "4";
    }else{
      this.titleLabel = "My Wealth Portfolio";
      this.selectedIndexNew = "1";
    }
  }

  async categoryChanged(selectedTab) {
    // const toast = await this.toastController.create({
    //   message: 'You have selected ' + this.segmentModel,
    //   duration: 2000
    // });
    // toast.present();

    if (this.segmentModel == "Mutual Fund") {
      this.segmentModel = ""
      this._router.navigate(['./BasicModeProductList']);
    } else if (this.segmentModel == "Digital Gold") {
      this.segmentModel = ""
      this._router.navigate(['./GoldProductList']);
    } else {
      // const toast = await this.toastController.create({
      //   message: 'Development in progress ' + this.segmentModel,
      //   duration: 2000
      // });
      // toast.present();
    }
  }

  errorShow(message, functionName) {
    // this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Mutual fund page -> ' + functionName, message, this.errorList?.okText);
  }
}
