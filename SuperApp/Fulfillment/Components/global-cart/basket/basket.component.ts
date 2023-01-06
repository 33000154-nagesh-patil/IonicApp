import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
@Input() item :any;
@Input() name:any;
@Output() removeFromCart = new EventEmitter();
imageList = this.allConfigDataService.getConfig('images');
  subTotal: any;
  constructor(
    private allConfigDataService:AllConfigDataService,
    private router:Router,
    private eduService:eduService


  ) { }

  ngOnInit() {
    this.update();
  }
  update() {
    this.subTotal=0;
    for(let x of this.item){
      this.subTotal += x.totalAmount
    }
  }
  remove(x) {
    this.removeFromCart.emit({
      "name":this.name,
      "value":x
    })
  }
  proceedToPayment() {
    // if(this.name == 'Career'){
    //   this.router.navigate(['Fullfilment/Checkout']);
    // }
    // if(this.name == 'Health'){
    //   this.router.navigate(['Fullfilment/Health/Checkout']);
    // }
    // if(this.name == 'MutualFund'){
    //   this.router.navigate(['Fullfilment/Health/Checkout']);
    // }
    this.eduService.setCartData(this.item)
    this.router.navigate(['Fullfilment/Checkout']);
  }

}
