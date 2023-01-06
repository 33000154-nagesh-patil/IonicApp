import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
cartItems=[]
cartData$ = new BehaviorSubject(null)
cartData=this.cartData$.asObservable();
  constructor() { }
  addToCart(val){
    this.cartItems.push(val);
    this.cartData$.next(this.cartItems);
  }
  getCartItems(){
    return this.cartItems;
  }
}
