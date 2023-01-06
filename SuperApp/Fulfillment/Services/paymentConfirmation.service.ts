import { Injectable, OnInit, Input } from '@angular/core';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Clipboard } from '@angular/cdk/clipboard';

@Injectable({
  providedIn: 'root',
})
export class paymentConfirmationService implements OnInit {
  @Input() transactionData: any;
  @Input() imageList: any;
  @Input() currentCountry: any;
  @Input() errorList: any;
  @Input() commodity: any;
  @Input() goldbalance: any;
  @Input() transactionId: any;
  currencySymbol: any;
  currencyList: any;

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private allConfigDataService: AllConfigDataService,
    private toastService: ToastService,
    private clipboard: Clipboard
  ) {}
  ngOnInit() {
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry');
    this.currencySymbol = this.currencyList['IND']['currencySymbol'];
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
