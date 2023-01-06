import { FavouriteaddedComponent } from './../favouriteadded/favouriteadded.component';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-set-auto-pay',
  templateUrl: './set-auto-pay.component.html',
  styleUrls: ['./set-auto-pay.component.scss'],
})
export class SetAutoPayComponent implements OnInit {
  declairation:any=true
  ionicForm: FormGroup;
  selectBill:any
  message:any

  @Input() imageList:any
  constructor(public formBuilder: FormBuilder,private router:Router,private allConfigDataService:AllConfigDataService,private mdlctrl :ModalController) { }

  ngOnInit() {

    this.ionicForm = this.formBuilder.group({
      AmountType:['',Validators.required]
     
    })

    this.imageList=this.allConfigDataService.getConfig('images')

  }

  cancel(){
    this.router.navigate(['bbps/bbps'])
  }


  async goToAutopayAdded(){
const modal =await this.mdlctrl.create({
  component:FavouriteaddedComponent,
  componentProps:{

    'message':'Auto Pay Set Successfully'
  },
  backdropDismiss:false
});
modal.onDidDismiss().then((data)=>{
});
return await modal.present()


  }


  hide(){
    this.declairation=false
  }
}
