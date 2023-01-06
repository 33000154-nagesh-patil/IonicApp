import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import toruspopup from '../../torusclubpopup.json'

@Component({
  selector: 'app-torusbanner',
  templateUrl: './torusbanner.component.html',
  styleUrls: ['./torusbanner.component.scss'],
})
export class TorusbannerComponent implements OnInit {
  data:any;
  heading: any;
  scrollCard: any;
  card: any;
  constructor(private router: Router, private location: Location, private controller: ModalController) { }

  ngOnInit() {
    this.data = toruspopup;
    this.heading = this.data.landing;
    this.scrollCard = this.heading.scrollingCard;
    this.card = this.heading.card;
    // console.log(this.card,"card");
    // console.log(this.heading,"heading");
    // console.log(this.scrollCard,"scrolll");  
  }

  torusClub() {
    this.controller.dismiss()
    this.router.navigate(['/Engagement/EngagementTorusClub/torusclub'])
  }

  close() {
    this.controller.dismiss()
  }

}
