import { HttpClient } from '@angular/common/http';
import { Component, OnInit,EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
// import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss'],
})
export class TransactionHistoryComponent implements OnInit {
  imageList: any;
  TransactionBuyData: any;
  @Input() opneSegment:any="All"
  segmentValue:any="All";
  errorList: any;
  index: number;
  TransectionData:any=[]
  ViewAllBtn: boolean=true;
 

  constructor(private loaderService:LoaderService,private commonFunctionService:CommonFunctionService,private MFService:MFServiceService,private router:Router,private allconfigDataService:AllConfigDataService,private http:HttpClient,private modalctrl:ModalController) { }

  ngOnInit() {
    this.opneSegment = this.router.getCurrentNavigation().extras.state.opneSegment;
    this.TransectionData=[]
    this.imageList=this.allconfigDataService.getConfig('images')
    setTimeout(() => {
  this.getBuyTransaction("all")
    }, 1);
    this.segmentValue=this.opneSegment
  }
  getdata(){
    let data= setInterval(()=>{
      if(this.TransactionBuyData){
       this.getInicialData()
       clearInterval(data)
      }  
     },500)
  }
  getInicialData(){
    this.index=0;
   while(this.index<=2 && this.index<this.TransactionBuyData.length){
    this.TransectionData.push(this.TransactionBuyData[this.index]);
     this.index++;
   }
   if(this.index==this.TransactionBuyData.length){
     this.ViewAllBtn=false
   }
  
}
getMoreData(){

  if(this.index<this.TransactionBuyData.length){
    let jump=this.index
   while(this.index<jump+4 &&  this.index<this.TransactionBuyData.length){
     this.TransectionData.push(this.TransactionBuyData[this.index]);
     this.index++;
   }
  }

  if(this.index==this.TransactionBuyData.length){
    this.ViewAllBtn=false
  }
  }




  
  dissmiss(){
    this.modalctrl.dismiss();
    window.history.back();
  }
  segmentChanged(e){
    this.TransectionData=[]
    this.segmentValue=e.detail.value;
    this.getBuyTransaction(e.detail.value)
  }


  async OrderDetail() {
    // let eventEmitter = new EventEmitter();
    // eventEmitter.subscribe((res)=>{
    //   console.log(res);
      
    // })
    // const modal = await this.modalctrl.create({
    //   component:OrderDetailsComponent,
    //   componentProps:{
    //    "imageList":this.imageList
    //   },
    //   backdropDismiss:false
    // });
    // modal.onDidDismiss().then((data) => {
    //   if(data.data){
    //     setTimeout(() => {
    //       this.modalctrl.dismiss("1");
    //     });
    //   }
    // })
    // return await modal.present();
  }

  getBuyTransaction(data) {
    this.loaderService.showLoader()
    let data1={
      // "CustGuId":localStorage.getItem('CustGuId'),
      "CustGuId":"CAA68E39-D39D-415F-881A-1071BC049527",

      "Type":data
      }

    this.MFService.getBuyTransaction(data1).subscribe((data) => {
      if (data) {
        this.TransactionBuyData=data.data
        this.loaderService.hideLoader()
         this.getdata()

      } else {
        this.errorShow(data?.Message, "AllMFList -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "AllMFList -> Http request");
    })
  }
  errorShow(message, functionName) {
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }
}
