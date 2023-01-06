import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'index';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexPlotOptions,
  ApexStates,
  ApexTheme,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ng-apexcharts';
import appLayout from '../../../Engagement/Dashboard Json/getLayout.json';
import { ModalController } from '@ionic/angular';
import { StAddFundsComponent } from 'SuperApp/Operations/wealth/Stocks/st-add-funds/st-add-funds.component';
import { AddFundsComponent } from 'projects/wealth-wellness/src/component/component/wealth-profile/add-funds/add-funds.component';
import { ExplorePortfolioComponent } from '../explore-portfolio/explore-portfolio.component';
import { threadId } from 'worker_threads';
import { UnsubBehaviour } from 'src/app/unsubscribe.class';
import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';
import { takeUntil } from 'rxjs-compat/operator/takeUntil';
import { group } from 'console';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: any;
  // routeToEngagement: any;
  stroke: ApexStroke;
  states: ApexStates;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BodyComponent implements OnChanges {
  
  @Input() objectContent: any;
  @Input() snapshot: any;
  holding: any;
  @Input() portFolioSummary
  @Input() segment: any;
  promotionData: any;
  enableGrid: boolean;
  enablePromotionCard: any = false;
  enable3x2Grid: boolean;
  threeByTwoGridData: any;
  threeByTwoGridLabel: any;
  threeByTwoGridbtn: any;
  enableDonut: any;
  enableCard: boolean;
  cardData: any[] = [];
  stockFunds: boolean;
  enableSingleRowCard: boolean;
  enablestockcard: boolean;
  singleRowCardData: any;
  enableDigiGoldComonent: boolean;
  addFundsAction: any;
  digiBenifit: any;
  enableBar: any;
  availableFunds: any;
  public chartOptions: Partial<ChartOptions>;
  chartValue;
  toggle: any;
  chartShow: boolean;
  Donut: any;
  data: any = {
    type: 'donutChart',
  };
  routing: any;
  footerListData: any;
  footer: any;
  enabledInvestmentCard: boolean;
  colSize: any;
  availableBalance: any;
  routeToEngagement: string;
  title: any;
  action: any;
  image: any;
  investmentCardData: any;
  enableAdvisoryCard: any;
  advisoryCardData: any;
  currentTotal: number;
  investedValue: number;
  unrealisedValue: number;
  todaysGainLoss: number;

  explore() {
    this.router.navigate(['/Shopping/listing']);
  }

  @ViewChild('chartObj', { static: true }) chart: ChartComponent;

  constructor(
    private mdlctrl: ModalController,
    public commonService: CommonService,
    private router: Router,
    private stockWebsocket:WebSocketServiceForStocks,
    private eduService: eduService,
    private changeDetector:ChangeDetectorRef
  ) {
  }
  getHolding() {
    this.stockWebsocket.currentMessage
    .subscribe(async (item:any) => {
      if(!this.holding)return
      this.currentTotal=0
      this.investedValue=0
      this.unrealisedValue=0
      this.todaysGainLoss=0
      for(let x of this.holding){
        if (item.SEC_ID == x["nseSecurityId"])  {
          if (this.stockWebsocket.time> 55800&&item.msgCode1 == 3) x.fClose =  item.PClose
          else if(this.stockWebsocket.time<=55800&&item.fifthmsgCode == 32) x.fClose =  item.fClose
              

          if(item.msgCode==1){
            x.price = Number(item.LTP?.toFixed(2))
            x.priceChange = Number(x.price-(x.avgPrice?x.avgPrice:x.costPrice));
            x.percentChange=(((x.price  - Number(x.fClose))/x.price )*100)?.toFixed(2);
            x.MktUpDown=Number(x.price - x.fClose).toFixed(2);
          }
        }
        this.currentTotal+=parseFloat((x.qty*x.price).toFixed(2))
        this.investedValue+=parseFloat((x.qty*x.avgPrice).toFixed(2))
        this.unrealisedValue+=parseFloat((x.qty*x.MktUpDown).toFixed(2))
        this.todaysGainLoss+=parseFloat(((x.qty*x.price)-(x.qty*x.avgPrice)).toFixed(2))
        this.changeDetector.detectChanges()
      }
    })
  }
  ngOnChanges() {
    this.enableGrid = false;
    this.enablePromotionCard = false;
    this.enable3x2Grid = false;
    this.enableCard = false;
    this.stockFunds = false;
    this.enableSingleRowCard = false;
    this.enableDigiGoldComonent = false;
    this.enableDonut = false;
    this.enabledInvestmentCard = false;
    this.enableBar = false;
    this.cardData = [];
    this.enableAdvisoryCard = false;
    if(this.portFolioSummary?.portfolioSummary){
      this.holding= this.portFolioSummary.portfolioSummary;
      
      for(let x of this.holding){
        let name = x.symbol.split("-");
        if(["FUT","PE","CE"].includes(name[name.length - 1])){
          this.stockWebsocket.sendData(12,x["nseSecurityId"],2)
          }
        else this.stockWebsocket.sendData(12,x["nseSecurityId"],x.exchange?1:4)
        //   this.stockWebsocket.sendData(x[x.exchange.toLowerCase()+"SecurityId"],"FO")
        // }
        // else this.stockWebsocket.sendData(x[x.exchange.toLowerCase()+"SecurityId"],x.exchange)
      }
    }
    for (let x of this.objectContent) {
      // console.log(this.objectContent, "adasda");
      if (x.type == 'grid') this.enableGrid = true;
      if (x.contentType == 'promotionCard') {
        this.enablePromotionCard = true;
        this.promotionData = x?.content;
      }
      if (x.contentType === '3x2 Grid') {
        this.enable3x2Grid = true;
        this.threeByTwoGridData = x?.content;
        this.threeByTwoGridLabel = x?.Title;
        this.threeByTwoGridbtn = x?.button;
        this.colSize = x?.size;
      }
      if (x.contentType === 'cardList') {
        this.enableCard = true;
        this.cardData.splice(this.cardData.length, 0, x);
        // this.cardData.push(x);
      }
      if (x.contentType == 'singleRowCard') {
        this.enableSingleRowCard = true;
        // this.singleRowCardData = x;
        // this.holdings.ngOnInit();
      } else {
        // this.holdings.ngOnDestroy()
      }
      if (x.contentType == 'Funds') {
        this.stockFunds = true;
        this.availableFunds = x.funds.availableMargin;
        this.availableBalance = x.funds.title;
        this.addFundsAction = x.funds.action;
      }
      if (x.contentType == 'segment') {
        this.digiBenifit = {
          objectContent: this.objectContent,
          snapshot: this.snapshot,
        };
        this.enableDigiGoldComonent = true;
      }
      if (x.contentType == 'Donut') {
        this.enableDonut = true;
        this.enableBar = true;
        this.Donut = x;
      }
      if (x.contentType == 'investmentCard') {
        this.enabledInvestmentCard = true;
        this.investmentCardData = x.content;
      }
      if (x.contentType == 'advisoryCard') {
        this.enableAdvisoryCard = true;
        this.advisoryCardData = x.content;
      }
    }

    this.commonService.goToLandingHome.subscribe((data) => {
      if (data == 'home') {
        this.enable3x2Grid = false;
        this.objectContent = [];
      }
      // debugger;
    });
  }
  ngOnInit() {
   
    // console.log(this.digiBenifit)
    this.eduService.categoryValueForAPI.subscribe((val) => {
      this.routing = val['productLanding'];
    });

    const subscription = this.eduService.categoryValueForAPI.subscribe(
      (val) => {
        this.routing = val['productLanding'];
      }
    );

    this.routeToEngagement = this.router.url;
    this.getHolding()
  }
  // console.log(this.digiBenifit);

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  async addFunds() {
    // this.router.navigate(['/'], { state: { listing: "", listing1: "" } })
    const modal = await this.mdlctrl.create({
      component: AddFundsComponent,
      componentProps: {},
      backdropDismiss: false,
    });

    return await modal.present();
  }

  async explorePortfolio() {
    this.router.navigate(['/'], { state: { listing: '', listing1: '' } });
    const modal = await this.mdlctrl.create({
      component: ExplorePortfolioComponent,
      componentProps: {},
      backdropDismiss: false,
    });
    modal.onDidDismiss().then((data) => {
      if (data && data?.data) {
        this.router.navigate(['/Dashboard']);
      }
    });

    return await modal.present();
  }

  getCurrentValue(){
    if(!this.holding)return
    let currentTotal=0
    for(let x of this.holding){
    currentTotal+=parseFloat((x.qty*x.price).toFixed(2))
    }
    return currentTotal;
  }

  getInvestedvalue(){
    if(!this.holding)return
    let investedvalue=0
    for(let x of this.holding){
      investedvalue+=parseFloat((x.qty*x.avgPrice).toFixed(2))
    }
    return investedvalue;
  }


  getUnrealisedValue(){
    if(!this.holding)return
    let unrealisedValue=0
    for(let x of this.holding){
      unrealisedValue+=parseFloat(((x.qty*x.price)-(x.qty*x.avgPrice)).toFixed(2))
    }
    return unrealisedValue;
  }

  getTodaysGainLoss(){
    if(!this.holding)return
    let todaysGainLoss=0
    for(let x of this.holding){
      todaysGainLoss+=parseFloat((x.qty*x.MktUpDown).toFixed(2))
    }
    return todaysGainLoss;
  }

}
