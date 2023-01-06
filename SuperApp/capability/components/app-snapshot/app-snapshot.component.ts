import { CommonService } from 'index';
import { SnapshotModelComponent } from './../snapshot-model/snapshot-model.component';
import { ListingComponent } from './../../../Shopping/Components/Common/listing/listing.component';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { Chart as ChartJS, Chart, registerables } from 'chart.js';
import { KeyValue } from '@angular/common';

// import { ModalController } from '@ionic/angular';
import { ExplorePortfolioComponent } from '../explore-portfolio/explore-portfolio.component';
import { GlobalSearchComponent } from 'SuperApp/Engagement/global-search/global-search.component';
Chart.register(...registerables);

@Component({
  selector: 'app-snapshot',
  templateUrl: './app-snapshot.component.html',
  styleUrls: ['./app-snapshot.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AppSnapshotComponent implements OnInit {
jsonBread={
  "Mutual Fund":"Shopping/Wealth/MF",
  "Digi Gold":"Shopping/Wealth/DG",
  "Stocks":"Shopping/Wealth/ST",
  "Lab Test":"Shopping/Health/LabTest",
  "Medicine":"Shopping/Health/Medicine",
  "Courses":"Shopping/Career/Courses",
  "Assesments":"Shopping/Career/Assessment",
  "Jobs":"Shopping/Career/Job",
}

  investValue: any;
  currentValue: any = 0;
  UnrealizedGainAndLossValue: any = 0;
  UnrealizedGainAndLossPercent: any = 0;
  todayGainAndLossValue: any = 0;
  todayGainAndLossValuePercent: any = 0;
  exploreScreen: boolean;
  environmentAPIList: any;
  totalInvestedVal: any = 0;
  getHoldings: any;
  LTPvalueOfHoldings: any;
  investedStockValue: any = 0;
  currentStockValue: any = 0;
  total: number;
  totalArr: any = [];
  currentStockValueArr: any = [];
  currentStock: any = 0;
  data: any = []
  @Input() Data: any
  @Input() objectContent: any;
  @Input() singleRowCardData: any;
  dividendsStocks: any;
  BonusStocks: any;
  stockSplits: any;
  segment
  param:any;
  imageList: any;
  snapshot: any;
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    environment: this.allConfigDataService.getConfig('environmentType'),
  };
  routing: any;
  categoryLanding: any;
  environment: boolean;
  searchData:any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private allConfigDataService: AllConfigDataService,
    private eduservice:eduService,
    private mdlctrl: ModalController,
    private ChangeDetectorRef:ChangeDetectorRef,
    private commonService: CommonService,
    private globalSearchComp:GlobalSearchComponent
  ) {
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
  }

  ngOnInit() {

    if (this.apiCatalog.environment == 'proto') {
      this.environment = true
    }



    
    this.eduservice.categoryValueForAPI.subscribe(
      (val) => {
        this.apiCatalog['breadCrumb'] =
        val['productLanding']?
         'Shopping/' + val['categoryLanding'] + '/' + val['productLanding']
         :'Shopping' ;

        this.routing = val['productLanding']
        this.categoryLanding = val['categoryLanding']
      })


      console.log(this.objectContent, "SalmanDada");


      if(this.globalSearchComp.term$)this.globalSearchComp.term$.subscribe(res=> {

        this.searchData = {
  
          search:res.target.value
  
        }
  
        console.log('xxx',this.searchData)
  
      })
      
      
    // this.getproductList();
    // this.snapshot = this.Data
    console.log(this.singleRowCardData, "xxxxxxxxxxxxx");
    this.imageList = this.allConfigDataService.getConfig('images');
    this.callApi()
    
    
    

  }
  

  toGetdetail(title) {
    let myObj = {};
    this.eduservice.categoryValueForAPI.subscribe(obj => {
      obj["productLanding"] = "ST";
      myObj = obj;
    })
    if(title!= 'Portfolio')this.router.navigate(['/Shopping/Detail'], { state: { listing: "", listing1: "" } })
  }

  callApi(){

    let param = {
      "pageNo": 0,
      "rowCount": 2,
      "typeName": '',
      "favList": '',
      "sort": '',
      "filter": this.searchData ? this.searchData:'',
      "TokenId": localStorage.getItem('id_token')
    };

    this.http
    .post(
      this.apiCatalog.baseURL[this.apiCatalog.environment] +
      this.apiCatalog['breadCrumb'] +
      this.apiCatalog.getList + "?snapShot",
      param
    )
    .subscribe(
      (data: any) => {
        this.snapshot = data.card
        console.log(this.snapshot,"Salman");
        this.ChangeDetectorRef.detectChanges()
      }
      
    )

  }

  originalOrder = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    return 0;
  }

  async explore($event){
    
    // this.router.navigate(['/'], { state: { listing: "", listing1: "" } })
    const modal = await this.mdlctrl.create({
      component: SnapshotModelComponent,
      componentProps: {
      data: $event.split("-").length>1?$event.split("-")[1]:$event,
      title:$event ,
      searchData:this.searchData,

      breadcrumb: this.jsonBread[$event]?this.jsonBread[$event]:null
      
      },
      backdropDismiss: false
    });
    

    return await modal.present();
  }

  getDetail(params,val) {
    this.commonService.setExchangeValue(val.ExchangeName)
    let obj={
    "id":(params?.id)?Number(params?.id):"",
    "title":(params?.title)?(params?.title):"",
    "favList":(params?.favList)?(params?.favList):"",
    "TokenId":localStorage.getItem('id_token')
  }
    this.eduservice.detailParams.next(obj)
    if(this.categoryLanding == 'Health'){
      this.eduservice.healthDetails.next({
        item_rate_id:params.item_rate_id,
        item_unit_id:params.item_unit_id,
        vendor_id:params.vendor_id
      })
    }
    
      this.eduservice.fromVault.next("False")
      this.eduservice.providerName.next(params.title)
      this.router.navigate(['/Shopping/Details'])
  }

  changeBookmark(val){
    val.row1.selectWatchList =! val.row1.selectWatchList
  }

}
