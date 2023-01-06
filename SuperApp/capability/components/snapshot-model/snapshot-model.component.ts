import { takeUntil, takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService, CommonService } from 'index';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-snapshot-model',
  templateUrl: './snapshot-model.component.html',
  styleUrls: ['./snapshot-model.component.scss'],
})
export class SnapshotModelComponent implements OnInit {
  card: any;
  environment: any;
  categoryLanding: any;


  title;
  segment;
  imageList: any;
  routing: any;
  @Input() searchData:any;
  @Input() breadcrumb: any;
  url = this.router.url
  @Input() set data(val:any){
    this.title=val
    setTimeout(() => {
      this.callApi(val)
    }, 1000);

  }
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    environment: this.allConfigDataService.getConfig('environmentType'),
  };
  constructor(
    private http : HttpClient,
    private allConfigDataService:AllConfigDataService,
    private eduservice:eduService,
    private modalCtrl: ModalController,
    private router: Router,
    private commonService: CommonService
  ) { 
    
    
  }

  ngOnInit() {
    if (this.apiCatalog.environment == 'proto') {
      this.environment = true
    }
    

    this.imageList = this.allConfigDataService.getConfig('images');
    this.eduservice.categoryValueForAPI
    .pipe(
      takeWhile(val=>this.url!="/Engagement/EngagementGobalSearch/getGlobalSearch")
      ).subscribe(
        (val) => {
      console.log(this.url);
      if(this.breadcrumb==null)this.breadcrumb ='Shopping/' + val['categoryLanding'] + '/' + val['productLanding'];
      this.categoryLanding = val['categoryLanding']
      this.routing = val['productLanding']

      // this.routing = val['productLanding']
    })
  }
  callApi(val) {
    let param = {
      "pageNo": 0,
      "rowCount": 15,
      "typeName": '',
      "favList": val,
      "sort": '',
      "filter": this.searchData?this.searchData:'',
      "TokenId": localStorage.getItem('id_token')
    };

    this.http
    .post(
      this.apiCatalog.baseURL[this.apiCatalog.environment] +
      this.breadcrumb+
      this.apiCatalog.getList,
      param
    )
    .subscribe(
      (data: any) => {
        this.card = data.card
        // this.card.forEach(element => {
        //   this.title = element.title
        // });
        console.log(this.card,"Salman");
        // this.ChangeDetectorRef.detectChanges()
      }
      
    )

  }
  navigateToDetail(){

  }

  goBack() {
    // this.modalCtrl.dismiss()
    // window.history.back()
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  originalOrder = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    return 0;
  }

  getDetail(params,val) {
    this.modalCtrl.dismiss()
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

  getDetailOne(params){
    this.modalCtrl.dismiss()

    let obj={
      "id":(params?.id)?Number(params?.id):"",
      "title":(params?.title)?(params?.title):"",
      "favList":(params?.favList)?(params?.favList):"",
      "TokenId":localStorage.getItem('id_token')

    }
      this.eduservice.detailParams.next(obj)
      this.eduservice.providerName.next(params.title)

    this.router.navigate(['/Shopping/Details'])
  }

  changeBookmark(val){
    val.row1.selectWatchList =! val.row1.selectWatchList
  }
}
