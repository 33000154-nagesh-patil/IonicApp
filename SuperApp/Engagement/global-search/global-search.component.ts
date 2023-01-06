import { async } from '@angular/core/testing';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectorRef, Input, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { AllConfigDataService, CommonService, CommonFunctionService, LoaderService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import dataJson from '../search.json'
import { trigger, state, style, animate, transition } from '@angular/animations';
import { VoicePopupComponent } from './voice-popup/voice-popup.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastService } from 'index';
import globalSearch from '../../Engagement/globalSearch.json';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil, skip } from 'rxjs/operators';

const search = (time, selector) => (source$) =>
  source$.pipe(
    debounceTime(time),
    switchMap((...args: any[]) => 
      selector(...args)
        .pipe(
            takeUntil(
                source$
                    .pipe(
                        skip(1)
                    )
            )
        )
    )
  )


@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
  animations: [
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-in'))
    ])
  ]
})
export class GlobalSearchComponent implements OnInit,OnDestroy {
  imageList: any;
  routing: any;
  data: any;
  url: any;
  tabName: any;
  subProductList: any = [];
  dataLength: any;
  dataPass: any;
  datss: any;
  state: string = 'default';
  isView: boolean = false;
  digi: any;
  test: any = '';
  placeholder: any = 'Select product to search'
  searchText: any = '';
  dataJson = dataJson
  listt: boolean = false;
  mark: any = 'bookmark-outline';
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  cardData: any;
  keyWordArray = [];
  title: any;
  allData: any
  productsData: any;
  searchHistory: any;
  quickSearch: string[];
  products: string[];
  searchIcon: boolean = false;
  snapshot: boolean = false;


  term$ = new BehaviorSubject<any>('');
  results$:any = this.term$.pipe(
        search(1000, ((term: any) => this.getList(term)))
    )
  getListBreadCrumb: string;
  selectedProduct: any;
  listCard:any;
  destroy$: any=new Subject<boolean>();
  searching: boolean;
 
  
  constructor(
    private cdn: ChangeDetectorRef,
    private commonService: CommonService,
    private allConfigDataService: AllConfigDataService,
    private location: Location,
    private router: Router,
    private eduService: eduService,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private commonfunctionservice: CommonFunctionService,
    private toastController: ToastController,
    private loaderService: LoaderService,
    private service: ToastService) {
    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/EngagementGlobalSearch'
    this.eduService.categoryValueForAPI.subscribe(obj => {
      this.getListBreadCrumb=obj["categoryLanding"] + "/"+(obj["productLanding"]?obj["productLanding"]:'') 
      this.selectedProduct= obj["productLanding"]?obj["productLanding"]:''
    })
  }
  ngOnDestroy(): void {
    this.destroy$.next()
  }
 
  ionViewDidEnter() {
    this.getGlobalSearchFromAPI()
  }
  ngOnInit() {
    this.tabName=this.selectedProduct;
    this.imageList = this.allConfigDataService.getConfig('images')
    this.results$.pipe(takeUntil(this.destroy$)).subscribe(async (res:any) => {
      this.searching=false;
      if(this.searchText)this.listCard= res; 
      else this.listCard=[];      
    })
  }

  searchBarBack() {
    this.location.back();
    this.eduService.categoryValueForAPI.next({
      categoryLanding:this.getListBreadCrumb.split("/")[0],
      productLanding:null
    })
  }
  onTabClick(e) {
    this.tabName = e.url[1];

    this.eduService.categoryValueForAPI.next({
      categoryLanding:e.url[0],
      productLanding:e.url[1]
    })

    if (this.cardData)
      this.cardData = null
    this.title = e.title
    this.searchText = ''
    this.url = e.url;
    this.placeholder = "Type here to search"
  }

  // method for go to getList page
  gotoGetListMethod(e) {
    this.allData.Products.forEach(element => {
      if (e == element.title) {
        this.changeBreadcrum(element.url[0], element.url[1]);
      }
    });
    this.commonService.footerData.next(e);
    this.cdn.detectChanges();
  }
  changeBreadcrum(val, abc) {
    let myObj = {}
    const sub = this.eduService.categoryValueForAPI.subscribe(obj => {
      obj["productLanding"] = abc;
      obj["categoryLanding"] = val;
      myObj = obj;
      sub.unsubscribe();
    })

    setTimeout(() => {
      this.eduService.categoryValueForAPI.next(myObj);
      this.router.navigate(['Shopping/listing']);
    }, 100);
  }

  getList(e): Observable<any> {
    if(this.selectedProduct == undefined || this.selectedProduct == '') {
      this.snapshot=true;
    }      
    
      var searchData = {
        search: e?.target?.value
      }
      let params = {
        "pageNo": 0,
        "rowCount": 15,
        "typeName": '',
        "favList":  '',
        "sort": '',
        "filter": e?searchData:'',
        "TokenId": localStorage.getItem('id_token')
      }
    this.searching=true;
        return this.http.post(this.apiCatalog.baseURL[this.appEnviron]+"Shopping/"+this.getListBreadCrumb+this.apiCatalog.getList,params)
    
    //return this.http.post(this.apiCatalog.baseURL[this.appEnviron]+"Shopping/"+this.getListBreadCrumb+this.apiCatalog.getList,{})
  }

  getHistorySearch(e) {
    this.tabName = e;
    var searchData = {
      search: e
    }
    this.allConfigDataService.setFilterData(searchData)

    this.searchHistory.forEach(element => {

      if (e == element.title) {
        this.changeBreadcrum(element.url[0], element.url[1]);
      }
    });
    // this.searchText = e;
    this.tabName = '';
  }
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      color: 'dark',
      message: 'Select product to search',
      // position: 'top',
      duration: 5000,

      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  getGlobalSearchFromAPI() {
 
    let params = {
      "TokenId": localStorage.getItem('id_token')
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron] + this.breadCrumb + this.apiCatalog.globalsearch, params).subscribe(
      async (data: any) => {
        this.data = data.title;
        this.productsData = data.Products;
        this.allData = data
        console.log(this.allData, "LKLK");
        this.searchHistory = data['Search History']
        console.log(this.searchHistory, "allData");
        delete this.allData['Search History'];

      })
  }
  ViewMore(e) {
    this.isView = !this.isView
    this.state = (this.state === 'default' ? 'rotated' : 'default');

  }
  closeSubPro() {

    this.tabName = ''
    this.listt = false;
    this.placeholder = 'Search for Brands & Products...'
    this.mark = 'bookmark-outline'
    this.subProductList = dataJson.getSearchSuggestions
  }
  clearSearchIcon() {


  }
  closeSubProIn() {
    this.placeholder = 'Select product to search';
    this.tabName = null;
    this.test = '';
    this.searchText = '';
    this.mark = 'bookmark-outline';
    this.listt = false;
    this.eduService.categoryValueForAPI.next({
      categoryLanding:this.getListBreadCrumb.split("/")[0],
      productLanding:null
    })
  }

  async voice() {
    const modal = await this.modalCtrl.create({
      component: VoicePopupComponent,
      cssClass: 'all-brands-modaler',
      componentProps: {
        'Data': ""
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
        this.searchText = data.data.trim().replace(/[^\w\s]+/gi, '')
        // console.log(data.data, 'voice data');
      });
    return await modal.present();
  }

  camera() {
    this.router.navigate(['/Engagement/EngagementGobalSearch/getClickPicture'])
  }

  onInput() {

    // this.listt = true;
  }

  detail(val) {
    if (val.length < 9) {
      this.test = val;
    } else {
      this.test = val.substring(0, 9)
    }

    this.eduService.categoryValueForAPI.subscribe(obj => {
      obj["productLanding"] = this.url;
    })
    // this.eduService.productName.next("digiGold")
    this.router.navigate(['/Shopping/listing'], { state: { val: this.tabName } })
  }

  bookMark() {
    this.mark = 'bookmark'
    if (this.tabName == 'Stocks') this.service.showAutoToast('Stocks Added Succesfully')
  }

  gotoFilter(val) {
    val = '';
    this.router.navigate(['Engagement/EngagementGlobalFilter/globalFilter'], { state: { routing: val } });
  }
}
