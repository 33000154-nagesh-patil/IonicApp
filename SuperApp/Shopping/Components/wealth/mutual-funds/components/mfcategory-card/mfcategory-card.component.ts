import { Router } from '@angular/router';
import { AllmutualfundcardComponent } from 'projects/new-lib/src/lib/allmutualfundcard/allmutualfundcard.component';
import { retry } from 'rxjs/operators';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { FilterComponent } from '../filter/filter.component';


@Component({
  selector: 'app-mfcategory-card',
  templateUrl: './mfcategory-card.component.html',
  styleUrls: ['./mfcategory-card.component.scss'],
})
export class MFcategoryCardComponent implements OnInit {
  imageList: any;
  @Input() headerName;any;

  SearchByCategory:any
  errorList: any;
  loadingPageCount: number=0;
  emptyCart:any
  currentMode:any=1;
  textName:any;
  DummayApi=[];
  @ViewChild('card')card:AllmutualfundcardComponent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  infiniteLoad: any;
  title: string;
  notificationCount:any = 0;
  labelIcon:any;
  cartCount:any = 0;
  constructor(private router:Router,private commonFunctionService:CommonFunctionService,private MFService:MFServiceService, private AllConfigDataService:AllConfigDataService,private modalCtrl:ModalController,private http:HttpClient) { }
   jsonData:any;
  ngOnInit() {
    this.headerName=this.router.getCurrentNavigation().extras.state.headerName;
    this.imageList=this.router.getCurrentNavigation().extras.state.imageList;
    this.title = 'mutualFunds';
   if(this.headerName==='Regular'){
    this.SearchByCategory="Regular"
   }else if(this.headerName==='Direct'){
    this.SearchByCategory="Direct"
   }else if(this.headerName==='Steady Income'){
    this.SearchByCategory="Steady Income"
   }else if(this.headerName==='Wealth Builder'){
    this.SearchByCategory="Wealth Builder"
   }else if(this.headerName==='Tax Savers'){
    this.SearchByCategory="Tax Savers"
   }else if(this.headerName==='Top Rated Fund'){
    this.SearchByCategory="Top rated fund"
   }else if(this.headerName==='Annual Return Fund'){
    this.SearchByCategory="Annual Return fund"
   }else if(this.headerName==='New Fund Offers'){
    this.SearchByCategory="New Fund Offers"
   }else{
    this.SearchByCategory="All"
   }
   this.getNewFund(this.loadingPageCount,this.SearchByCategory)

    this.imageList = this.AllConfigDataService.getConfig('images');

  }
  backF(){
    this.modalCtrl.dismiss();
    window.history.back();
  }

  async FilterItem(){
      const modal = await this.modalCtrl.create({
        component: FilterComponent ,
        cssClass: 'h-100 w-100 modal-fullscreen',
        componentProps: {

        },
        backdropDismiss:false
      });
      modal.onDidDismiss()
      .then((data) => {
        if(data && data?.data){

        }
      });
      return await modal.present();
  }

  onScroll(val){
    this.infiniteLoad=val;
setTimeout(() => {
  this.loadingPageCount++;

  this.getNewFund(this.loadingPageCount,this.SearchByCategory)

}, 1000);
  }
getNewFund(val,Type){
  let data={
  "strname": "",
"category_id":"",
"sorting":"",
"type":Type,
"pageNo":val.toString(),
"nRows":10
};
  this.getNewFund1(data);
}
getNewFund1(obj) {
  this.MFService.getAllMFListByCategory(obj).pipe(retry(9)).subscribe((data) => {
    if (data) {
      if(this.loadingPageCount>0)this.infiniteLoad.target.complete();
      if(!data.HasMoreData)this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
     if(!data.HasMoreData && this.headerName==='New Fund Offers'){
      this.emptyCart=true
     }else{
      this.emptyCart=false
     }
      
      for(let x of data.data){
        this.card.addData(x);
       }
    } else {
      this.errorShow(data?.Message, "AllMFList -> status");
    }
  }, (error: any) => {
    this.errorShow(error?.Message, "AllMFList -> Http request");
  });
}

errorShow(message, functionName) {
  this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
}


openCart(){
    
}

}
