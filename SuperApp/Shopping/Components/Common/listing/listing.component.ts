import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AllConfigDataService, CommonService, LoaderService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import appLayout from '../../../../Engagement/Dashboard Json/getLayout.json';
import { AlertService } from 'projects/core/src/lib/services/alert.service';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';
import { notificationCountService } from 'SuperApp/Engagement/Services/notificationCount.service';
import { EditWatchListComponent } from 'projects/wealth-wellness/src/component/component/wealth-watchlist/edit-watch-list/edit-watch-list.component';
import { trigger, transition, query, style, stagger, animate, keyframes } from '@angular/animations';
import { UnsubBehaviour } from 'src/app/unsubscribe.class';
import { SnapshotModelComponent } from 'SuperApp/capability/components/snapshot-model/snapshot-model.component';
import { takeUntil } from 'rxjs/operators';



@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
  animations: [
    trigger('listAnimations', [
      transition('* => active', [
        // query(':enter', style({ opacity: 0 }), { optional: true }),
        // query(':enter', stagger('100ms', [
        //   animate('100ms ease-in', keyframes([
        //     style({ opacity: 0, transform: 'translateY(-10%)', offset: 0 }),
        //     style({ opacity: .5, transform: 'translateY(10px)', offset: 0.3 }),
        //     style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
        //   ]))]), { optional: true })
      ])
    ]),
  ]
})
export class ListingComponent extends UnsubBehaviour implements OnInit, OnDestroy {
  @HostBinding('@listAnimations')
  animationState;
  imageList = this.allConfigDataService.getConfig('images');
  appEnvironment = this.allConfigDataService.getConfig('environmentType');
  coursesFooterData = this.allConfigDataService.getConfig('CourseShoppingTab');
  footerListData: any;
  success: boolean = false;
  APIWatchlistName: any;
  stwatchList: any;
  loadingPageCount: number = 0;
  infiniteLoad: any;
  emptyCart: boolean;
  create: boolean = false;
  filterIcon = false;
  breadCrumb: string = "Wealth/ST";
  hideFooter = true;
  cartCount;
  orderMessage
  headerTitle: any;
  notificationCount: any;
  @Input() gridList: boolean = false;
  @Input() cardList: boolean = true;
  @Input() dataList: any;
  @Input() DummayTitle: any;
  @Input() product: any;
  Data: any = {};
  favList = ""
  routing: any;
  // @Input() heading
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    environment: this.allConfigDataService.getConfig('environmentType'),
  };
  watchList: any = 'Nifty 50';
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  CloseValue: any;
  percentChange: string;
  changeValue: number;
  constructor(
    private allConfigDataService: AllConfigDataService,
    private http: HttpClient,
    private router: Router,
    private eduService: eduService,
    public commonService: CommonService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private stockWebsocket: WebSocketServiceForStocks,
    private notiCountService: notificationCountService,
    private modalCtrl: ModalController,
    private changeDetectorRef: ChangeDetectorRef

  ) {
    super();
    this.getNotificationUnreadCount();
  }

  ngOnInit() {
    this.commonService.footerData.subscribe(async (res: any) => {
      this.footerListData = appLayout[res].footer
    })


  }

  async getNotificationUnreadCount() {
    this.notiCountService.notificationUnReadCount.subscribe(async (res: any) => {
      if (res) this.notificationCount = await res;
    })
  }


  ionViewDidEnter() {
   this.eduService.categoryValueForAPI
    .pipe(takeUntil(this.UnSubscribe))
    .subscribe(
      (val) => {
        this.apiCatalog['breadCrumb'] =
          'Shopping/' + val['categoryLanding'] + '/' + val['productLanding'];
        this.routing = val['productLanding'];
        this.headerTitle = this.eduService.getheaderName()

        this.Data = {};
        this.arr = [];
        setTimeout(() => {
          this.callApi(0, '');
        });
        // this.loaderService.showLoader();
        // subscription.unsubscribe();
      }
    );

  }
  
  arr = []
  callApi(val, loader) {

    let filterData = this.allConfigDataService.getFilterData()
    // this.Data = {}
    let param = {
      "pageNo": val,
      "rowCount": this.loadingPageCount > 0 ? 5 : 15,
      "typeName": '',
      "favList": this.favList != 'Nifty 50' ? this.favList : '',
      "sort": '',
      "filter": filterData ? filterData : '',
      "TokenId": localStorage.getItem('id_token')
    };

    this.http
      .post(
        this.apiCatalog.baseURL[this.apiCatalog.environment] +
        this.apiCatalog['breadCrumb'] +
        this.apiCatalog.getList,
        param
      )
      .subscribe(
        (data: any) => {
          this.animationState = 'active';
          if(this.loaderService.isLoading)this.loaderService.hideLoader();

          if (this.routing == 'ST') {
            this.Data = data;
          } else if (data.grid) {
            this.Data = data;
          }

          // if(data.watchList || data.grid){
          //   this.Data = data
          // }
          else {
            // if(data.card){
            for (let x of data.card) this.arr.push(x);
            this.Data.card = this.arr;
            this.Data.heading = data.heading;
            this.Data.watchList = data.watchList;
            // this.Data.grid=data.grid;
            this.Data.pickupAndfilter = data.pickupAndfilter;
            if (this.loadingPageCount > 0) loader.target.complete();
            if (!data.HasMoreData)
              this.infiniteScroll.disabled = !this.infiniteScroll.disabled;

          }
          if(this.Data.watchList){
            
            setTimeout(()=>{
              document.getElementById(this.watchList?this.watchList:'').scrollIntoView({
                behavior: "smooth",
                block: 'center',
                inline: 'center'
              });
            },500)
          }

          this.allConfigDataService.setFilterData("");

        }, (error) => {
          this.loaderService.hideLoader();
          this.alertService.showAlert("Error", "", error.toString(), "Ok")
        })
  }
  filterPage(val) {
    this.router.navigate(['Engagement/EngagementGlobalFilter/globalFilter'], { state: { routing: val } });
  }

  homeEvent(val) {
    this.commonService.goToLandingHome.next('home');
    this.router.navigate([val]);
  }

  addWatchList() {
    this.create = true;
    console.log('create watchlist');
  }
  CreatebuttonWatchList() {

    this.create = false;
    this.success = true;
    let param = {
      "pageNo": "",
      "rowCount": "",
      "typeName": "",
      "favList": this.APIWatchlistName,
      "sort": "",
      "filter": "Create",
      "TokenId": localStorage.getItem("id_token"),
      "OtherDetails": {

      }
    }
    this.loaderService.showLoader()
    this.Data.watchList.push({ title: this.APIWatchlistName, value: this.APIWatchlistName })
    this.http.post(this.apiCatalog.baseURL[this.appEnvironment] + "Shopping/" + this.breadCrumb + this.apiCatalog['createWatchList'], param)

      .subscribe((res: any) => {

        // this.toastService.showAutoToast(res.message)
        if(res){
          this.loaderService.hideLoader()
        }
        this.orderMessage = res.message
        this.stwatchList = res.data;


      })

  }



  onScroll(val) {
    // this.infiniteLoad = val;
    setTimeout(() => {
      this.loadingPageCount++;
      this.callApi(this.loadingPageCount, val);
    }, 1000);
  }

  changeSegment() {
    
    this.favList = this.watchList;
    this.loaderService.showLoader()
    this.callApi(this.loadingPageCount, "")
  }


  longPressBoolean: boolean;
  async editWatchList(val) {
    if (!this.longPressBoolean) {
      this.longPressBoolean = true
      const modal = await this.modalCtrl.create({
        component: EditWatchListComponent,
        componentProps: {
          'imageList': this.imageList,
          data: val
        },
        backdropDismiss: true
      });
      modal.onDidDismiss()
        .then((data) => {
          this.longPressBoolean = false;
          this.loaderService.showLoader()
          this.callApi(0, '')
        });
      return await modal.present();
    }
  }

  closePopup(){
    this.create = false;
  }

  close() {
    this.success = false;
  }
  async snapShot(val) {
    const modal = await this.modalCtrl.create({
      component: SnapshotModelComponent,
      componentProps: {
      data: val

      },
      backdropDismiss: false
    });


    return await modal.present();
  }
}
