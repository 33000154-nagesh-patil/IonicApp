import { retry } from 'rxjs/operators';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Router } from '@angular/router';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { NewLibService } from '../new-lib.service';



@Component({
  selector: 'lib-allmutualfundcard',
  templateUrl: './allmutualfundcard.component.html',
  styleUrls: ['./allmutualfundcard.component.scss'],
})
export class AllmutualfundcardComponent implements OnInit {
  @Input() currentData:any;
  @Input() imageList:any;
  @Input() currentProductDatalib: any;
  @Input() checkNeed:any
  url:any='data:image/jpeg;base64'
  @Input() MutualFundPage:any
  @Input() FundsInProdfolio:any
  @Input() x:any;
  @Input() jsonData:any
  @Input() filterWant:any
  @Input() header:any
bookmark:any=false;
clicked:boolean=false;
counter:any=0;
currentTypeSIP: any;
currentCountry: any;
mfCardData=[]
returndata: string="1Y Returns";
  index: any=0;
  i:any=0
  value: any;
  countingFilter: any;
  SearchByCategory: string;
  SelectWatchlist: boolean;

addData(val){
this.mfCardData.push(val)
}

  constructor(private NewLibService:NewLibService,
    private commonfunction:CommonFunctionService,
    private modalCtrl: ModalController,
     private allconfigedataservice:AllConfigDataService,
     private router:Router,
     private MFService:MFServiceService) { }

  ngOnInit() {
    this.currentCountry = this.allconfigedataservice.getConfig('currentCountry')
    this.mfCardData=[]
   if(this.header==='Steady Income'){
      this.SearchByCategory="Steady Income"
     }else if(this.header==='Wealth Builder'){
      this.SearchByCategory="Wealth Builder"
     }else if(this.header==='Tax Savers'){
      this.SearchByCategory="Tax Savers"
     }else if(this.header==='Top Rated Fund'){
      this.SearchByCategory="Top Rated Fund"
     }else if(this.header==='Annual Return Fund'){
      this.SearchByCategory="Annual Return fund"
     }else if(this.header==='New Fund Offers'){
      this.SearchByCategory="New Fund Offers"
     }else{
      this.SearchByCategory="All"
     }
     if(this.header!=" "){
      this.getNewFund(0,this.SearchByCategory)
     }
  }
  getNewFund(val,Type){
    let data={
 "strname": "",
"category_id":"",
"sorting":"",
"type":Type,
"pageNo":val,
"nRows":10
  };
    this.getNewFund1(data);
  }
  getNewFund1(obj) {
  
    this.MFService.getAllMFListByCategory(obj).pipe(retry(9)).subscribe((data:any) => {
      if (data) {
        // this.TopRatedDataTitle="top rated fund"
        for(let x of data?.data){
          //  console.log("MYYYY");
          this.addData(x);
         }
      }
    });
  }



  changeBookmark(e){


    // this.commonfunction.changeBookMark(e);
    this.SelectWatchlist=true

  }
  SelectedWatchList(){
    this.SelectWatchlist=false
  }


  async investsip(data) {
    await this.router.navigate(['/Shopping/Wealth/MutualFunds/detail'],  { 
       state: { imageList:this.imageList,
           x:this.x,
           selectedCard:data,
           currentCountry: this.currentCountry,  } });
   }

  dissmis() {
    this.modalCtrl.dismiss();
  }

  getMoreData(){
console.log(this.jsonData.length,this.jsonData);

  if(this.index<this.jsonData.length){
    let jump=this.index
   while(this.index<jump+4 &&  this.index<this.jsonData.length){
     this.mfCardData.push(this.jsonData[this.index]);
     this.index++;
   }
  }


  }
   async getInvestPage(data){

    await this.router.navigate(['/Shopping/Wealth/MutualFunds/category'],  { 
      state: { imageList:this.imageList,
           headerName:this.header, } });
  
    // let eventEmitter = new EventEmitter();
    //   eventEmitter.subscribe((res)=>{
    //     console.log(res);

    //   })
    //   this.mfCardData=[]
    //   const modal = await this.modalCtrl.create({
    //     component:MFcategoryCardComponent,
    //     componentProps:{
    //       'imageList':this.imageList,
    //       'event':eventEmitter,
    //       'headerName':this.header,

    //     },
    //     backdropDismiss:false
    //   });
    //   modal.onDidDismiss().then((data) => {
    //     // console.log(data);
      //   this.getNewFund(0,this.SearchByCategory)
      // })
      // return await modal.present();

  }




  checkBox(){

  }
  async FilterItem(){
    await this.router.navigate(['/Shopping/Wealth/MutualFunds/filter'])
  }
  ChangeYearlyData(){
    this.i=this.i+1;
    let data=['1Y Returns','3Y Returns','5Y Returns']
    if(this.i==data.length){
      this.i=0
    }
    this.returndata=data[this.i]

  }
  
loadData(event) {
  setTimeout(() => {
    console.log('Done');
    event.target.complete();
    if (this.jsonData.length === 10) {
      event.target.disabled = true;
    }
  }, 500);
}

}