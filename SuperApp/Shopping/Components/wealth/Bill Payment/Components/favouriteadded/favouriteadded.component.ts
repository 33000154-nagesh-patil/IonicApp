import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { SetAutoPayComponent } from '../set-auto-pay/set-auto-pay.component';

@Component({
  selector: 'lib-favouriteadded',
  templateUrl: './favouriteadded.component.html',
  styleUrls: ['./favouriteadded.component.scss'],
})
export class FavouriteaddedComponent implements OnInit {
  imageList: any;
  @Input() message:any;
  button: any=true;
  button1: boolean=true;
  
  constructor(private mdlctrl :ModalController,private allConfigDataService:AllConfigDataService,private router:Router) { }

  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images')
    if(this.message=='Favourite Added Successfully'){
      this.button=true
      this.button1=false
    }else if(this.message=='Auto Pay Set Successfully'){
      this.button=false
      this.button1=true
    }
  }


   navToAutoPay(){
     this.mdlctrl.dismiss()
this.router.navigate(['bbps/setAutopay'])
   }

   cancel(){
    this.mdlctrl.dismiss()
    this.router.navigate(['bbps/bbps'])
  }

  





}
