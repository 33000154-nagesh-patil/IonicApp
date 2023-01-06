import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss'],
})
export class PromotionComponent implements OnInit {

  @Input() promotion = [{
    "promoName": "In the Spotlight",
    "promoDesc": "Explore deals,offers, health updates and more",
    "promoTitle": "Health Card & Discounts",
    "promoTitleDesc": "Up to 50% discount MRI, CT scan,insurance cover",
    "promoIcon": "assets/Images/Mask Group 99.png",
    "promoAction": "Buy Now"
  }]

  constructor() { }

  ngOnInit() { }

}
