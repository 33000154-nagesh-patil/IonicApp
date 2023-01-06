import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { AddAddressComponent } from '../add-address/add-address.component';

@Component({
    selector: 'app-digiGoldBottomCard',
    templateUrl: './digiGoldBottomCard.component.html',
    styleUrls: ['./digiGoldBottomCard.component.scss']
})
export class DigiGoldBottomCardComponent {
  valueaddress: any;
  response: any;
  apiCatalog = this.allConfigDataService.getConfig('apiCatalog');
  appEnvironment = this.allConfigDataService.getConfig('environmentType')
  constructor(private router:Router, private modelCtrl:ModalController, private alert:AlertController,private http:HttpClient,private allConfigDataService:AllConfigDataService) { }
  @Input() jsonData:any;
  @Output() selectedLocation = new EventEmitter();
    @Input()selected: any=1;
  setConsumer(x){
    this.selected=x;
  this.selectedLocation.emit(x);
  }

  addAddress(){
    this.editAddress('');
    // this.router.navigate(['Shopping/AddProfileAddress']);
    // this.modelCtrl.dismiss();
  }

  async editAddress(x) {
    const modal =await this.modelCtrl.create({
      componentProps:{
        addAddressval:x,
        updateaddress:x.AddressId
      },
      backdropDismiss: false,
      component:AddAddressComponent,
     });
     modal.onDidDismiss().then((res) => {
      setTimeout(() => {
        if(res.data)this.modelCtrl.dismiss(res.data);
      }, );
     });
     return modal.present();
  }

  deleteProfile(x,Id) {
    this.valueaddress=Id
    console.log(this.valueaddress,"-------->")
    if(x>0)this.alert.create({
      header: 'Alert!',
      subHeader: '',
      cssClass: 'custAlert',
      message: "Do You Want To Delete this Address ?",
      backdropDismiss: false,
      animated: true,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel Delete!');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.jsonData.Location.splice(x,1);
            this.DeleteAddress()
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
  DeleteAddress(){
    let params ={
      "TokenId":localStorage.getItem("id_token"),
      "AddressId":parseInt(this.valueaddress)
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnvironment]+"Onboarding/OnboardingSteps/CustomerRegistration" + this.apiCatalog.DeleteAddress,params).subscribe((res: any)=>{
      this.response=res;
     
      console.log(this.response,"Pakja");
    })
  }
}