import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { modalController } from '@ionic/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-cart-emp',
  templateUrl: './cart-emp.component.html',
  styleUrls: ['./cart-emp.component.scss'],
})
export class CartEmpComponent implements OnInit {
  imageList: any;

  getCurrency:any;
  rupeesSymbol:any;

  constructor(private allConfigDataService: AllConfigDataService, private modalController: ModalController, private router: Router) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.getCurrency=this.allConfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol=this.getCurrency['IND']['currencySymbol'];
  }

  goToBack(){
    this.modalController.dismiss();
  }

  handleOnAdd(){
    this.modalController.dismiss();
    this.router.navigate(['explore-lab-health']);
  }

}
