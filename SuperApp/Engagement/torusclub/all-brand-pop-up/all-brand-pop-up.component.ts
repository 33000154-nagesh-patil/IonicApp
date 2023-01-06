import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'lib-all-brand-pop-up',
  templateUrl: './all-brand-pop-up.component.html',
  styleUrls: ['./all-brand-pop-up.component.scss'],
})
export class AllBrandPopUpComponent implements OnInit {
@Input() allData:any;
  constructor(private mdlctrl:ModalController,private router:Router) { }

  ngOnInit() {
    console.log(this.allData);
    
  }
  goBack(){
    this.mdlctrl.dismiss()
  }
  goToSub(data){
    this.mdlctrl.dismiss()
    this.router.navigate(['Engagement/EngagementTorusClub/subBrand'],{state:{allCard:data}})
  }
}
