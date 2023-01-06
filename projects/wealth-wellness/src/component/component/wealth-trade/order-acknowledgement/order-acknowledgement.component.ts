import { OrderComponent } from './../order/order.component';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { StockDetailsComponent } from '../stock-details/stock-details.component';

@Component({
  selector: 'lib-order-acknowledgement',
  templateUrl: './order-acknowledgement.component.html',
  styleUrls: ['./order-acknowledgement.component.scss'],
})
export class OrderAcknowledgementComponent implements OnInit {
@Input() stockData: any;

  isReorder:boolean=false;
  imageList: any;
  @Input() StatusCancelled:boolean;
  @Input() StatusRejected:boolean;
  @Input() StatusExecuted:boolean;
  @Input() StatusPending:boolean;
  @Input() isfailed:boolean=false;
  @Input() isSuccess:boolean=true;


  constructor(private allConfigDataService: AllConfigDataService, private router: Router, private modalCtrl:ModalController ) { }
  ngOnInit() {
    
    console.log(this.stockData);
    
    this.imageList = this.allConfigDataService.getConfig('images');

}
ReOrder(){
  // this.StatusExecuted=true;
  // this.StatusPending=false;
  this.openStockDetails(this.stockData);
  // this.isfailed=true;
  // this.isSuccess=false;
}
async openStockDetails(val){
  const modal = await this.modalCtrl.create({
    component: StockDetailsComponent,
    cssClass: 'stock-details-modal',
    componentProps: {
      stockData: val
    },
    backdropDismiss: true
  });
  modal.onDidDismiss().then((data) => {
    
  })
  modal.present();
}
Trades(){
this.isfailed=true;
this.isSuccess=false;
this.StatusCancelled=true;
console.log("hiiiiiiiiiiiii");
}
// Order(){
//   this.isfailed=true;
// this.isSuccess=false;
// this.StatusCancelled=true;
// console.log("hiiiiiiiiiiiii");
// }

// async Order(e){
//   this.modalCtrl.dismiss();
//   this.router.navigate(['/Trades',{segment:'order'}]);
// }


}
