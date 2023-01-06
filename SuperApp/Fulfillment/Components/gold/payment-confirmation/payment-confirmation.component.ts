import { getDigiGoldRates } from 'SuperApp/Shopping/Services/getDigiGoldRates';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard'
// import { CartUpdateService } from 'projects/core/src/lib/services/cart-update.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.scss'],
})
export class PaymentConfirmationComponent implements OnInit {
 transactionData:any;
 imageList:any;
@Input() currentCountry:any;
@Input() errorList:any;
@Input() commodity:any
@Input() goldbalance:any
currencySymbol:any
currencyList:any

@Input() transectionId:any
  constructor(private modalCtrl:ModalController,
     private router:Router,
     private allConfigDataService:AllConfigDataService,
     private toastService:ToastService,
     private clipboard:Clipboard,
     private getDigiGoldRates:getDigiGoldRates) {

     }

  ngOnInit() {

    console.log(this.transactionData);
    // this.CartUpdateService.RemoveCart(0);
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.imageList = this.allConfigDataService.getConfig('images')
    this.currencySymbol = this.currencyList['IND']['currencySymbol'];
    this.getDigiGoldRates.transactionData.subscribe((data:any)=>{
      this.transactionData=data.transactionData
      console.log(this.transactionData,'transactionData');

    })

  }
  dismiss(){

    this.modalCtrl.dismiss('data')
    this.navigateTovault()


  }


  trackOrder(){
    this.modalCtrl.dismiss('successful')
  }

  async navigateTovault() {
    this.router.navigate(['Fullfilment/Gold/vault'])
//     setTimeout(() => {
//   this.modalCtrl.dismiss('vault');

// }, 10);
    // const modal = await this.modalCtrl.create({
    //   // component: CoursecategoryComponent,
    //   component: DigigoldVaultPage ,
    //   componentProps: {
    //     'goldbalance':this.goldbalance

    //   },
    //   backdropDismiss: false
    // })
    // modal.onDidDismiss().then((data) => {
    //   console.log(data)
    // })
    // this.modalCtrl.dismiss()
    // return await modal.present()
  }

  copyToClipboard(){
    let me = this.allConfigDataService.getConfig('languageList');
    this.clipboard.copy(this.transactionData);
    this.toastService.showAutoToast("Copyed on clipboard")

  }


  }

