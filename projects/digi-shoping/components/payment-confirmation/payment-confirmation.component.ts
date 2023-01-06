import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { DigigoldVaultPage } from './../../../../src/app/features/digigold-vault/digigold-vault.page';
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
@Input() transactionData:any;
@Input() imageList:any;
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
     private clipboard:Clipboard) { }

  ngOnInit() {
   
    console.log(this.transactionData);
    // this.CartUpdateService.RemoveCart(0);
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol'];
    
  }
  dismiss(){

    this.modalCtrl.dismiss('data')
    this.navigateTovault()

    
  }
  

  trackOrder(){
    this.modalCtrl.dismiss('successful')
  }

  async navigateTovault() {
    this.router.navigate(['/VaultBoard/Vault'])
    setTimeout(() => {
  this.modalCtrl.dismiss('vault');
  
}, 10);
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
    this.clipboard.copy(this.transactionData.transactionId);
    this.toastService.showAutoToast("Copyed on clipboard")
   
  }

    
  }

