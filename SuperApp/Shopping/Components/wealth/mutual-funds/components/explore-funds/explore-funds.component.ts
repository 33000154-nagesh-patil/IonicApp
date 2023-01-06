import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import dummyInvestnowData from '../../../../src/assets/dummyInvestnowData (1).json';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';


@Component({
  selector: 'app-explore-funds',
  templateUrl: './explore-funds.component.html',
  styleUrls: ['./explore-funds.component.scss'],
})
export class ExploreFundsComponent implements OnInit {
@Input() fundData:any;
@Input() imageList:any;
@Input() currentMoneySymbols:any;
// jsonData:any = dummyInvestnowData;
@Output() sendToLib = new EventEmitter();
  bookmark: boolean;
 @Input() x: any;
  productData: any;
  errorList: any;
  constructor(private commonFunctionService:CommonFunctionService,private MFService:MFServiceService,private modalCtrl: ModalController,private http:HttpClient,private loaderService:LoaderService) { }

  ngOnInit() {
    console.log("fundData",this.fundData)

    // this.getproductList()
   
    
  }

  



  redirectTCardDetails(data){
    this.sendToLib.emit(data);
  }

  changeBookmark(){
    this.bookmark=!this.bookmark;
    if(this.bookmark)console.log(this.x+" setbookmark")
    if(!this.bookmark)console.log(this.x+" unSetbookmark")
  }
 
    async FilterItem(){
      //console.log("this.healthData",this.healthData)
        // this.loaderService.showLoader();
        // const modal = await this.modalCtrl.create({
        //   component: FilterComponent ,
        //   cssClass: 'h-100 w-100 modal-fullscreen',
        //   componentProps: {
           
        //   },
        //   backdropDismiss:false
        // });
        // modal.onDidDismiss()
        // .then((data) => {
        //   if(data){
        //     this.modalCtrl.dismiss()
        //   }
    
        // });
        // // this.loaderService.hideLoader();
        // return await modal.present();
    }
  
    getproductList(){
      let data={
        "category":"top rated fund",
      }
      this.getAllMFList();
    }

    getAllMFList() {
      // this.loaderService.showLoader();
      this.MFService.getAllMutuaFundCard().subscribe((data) => {
        if (data) {
        // this.loaderService.hideLoader();p
          this.productData=data
        } else {
        // this.loaderService.hideLoader();
          this.errorShow(data?.Message, "MutuafundUpdateOrderData -> status");
        }
      }, (error: any) => {
        // this.loaderService.hideLoader();
        this.errorShow(error?.Message, "MutuafundUpdateOrderData -> Http request");
      })
    }

    errorShow(message, functionName) {
      // this.loaderService.hideLoader();
      // this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
    }
}
