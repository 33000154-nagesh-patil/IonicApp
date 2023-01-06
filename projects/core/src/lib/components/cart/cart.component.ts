import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from '../../services/all-config-data.service';
// import { CartServiceService } from '../../services/cart-service.service';
import { CheckoutaddComponent } from 'projects/orderedlist/checkoutadd/checkoutadd.component';
import { CartServiceService } from '../../services/cart-service.service';

@Component({
  selector: 'lib-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  imageList: any;
  getCurrency:any;
  rupeesSymbol:any;
  product: any[];
  data: any[];
  modal: any;
  cardCount:any;
  @Input() name:any;
  title:any;
  price:any;

  constructor(private router: Router, private allConfigDataService:AllConfigDataService,private cartService:CartServiceService, private modalCtrl: ModalController) { }

  ngOnInit() {

    // this.data = labTestData;

    this.data = this.cartService.getCartItems();

    // console.log(this.data[0].product1[0].item_rate);

    // this.title = this.data[0].name
    // this.price = this.data[0].product1[0].item_rate

    this.cardCount = this.data.length;

    this.imageList = this.allConfigDataService.getConfig('images');
    this.getCurrency=this.allConfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol=this.getCurrency['IND']['currencySymbol'];

  }

  goToBack(){
    this.modal.dismiss();
  }


  async handleClick(){
    this.modalCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component:CheckoutaddComponent,
      componentProps: {
        'imageList': this.imageList,
        'data': this.data
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        console.log(data);

      });
    // this.loaderService.hideLoader();
    return await modal.present();


  }

  // handleRemove(id){
  //   console.log(id);

  //     this.data.forEach((value,id)=>{
  //         this.data.splice(id, 1);
  //         this.cardCount = this.data.length;

  //   });
  // }


  handleRemove(){

    this.data.splice(this.data.indexOf(this.data), 1);
               // rerender your array
        //  this.data = [...this.data];
         this.cardCount = this.data.length;
           }


  handleOnAdd(){
    this.modal.dismiss();
    this.router.navigate(['explore-lab-health']);
  }

}
