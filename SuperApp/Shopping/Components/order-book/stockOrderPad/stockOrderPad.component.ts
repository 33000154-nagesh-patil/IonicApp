import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AlertService } from 'projects/core/src/lib/services/alert.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { AddprofileComponent } from '../components/addprofile/addprofile.component';


@Component({
    selector: 'app-stockOrderPad',
    templateUrl: './stockOrderPad.component.html',
    styleUrls: ['./stockOrderPad.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StockOrderPadComponent implements OnInit {
  profiledata: any;
  response: any;
  deleteval: any;
  custid: any=[];
  allcustid: any;
  value: any;
  result: any;
  apiCatalog = this.allConfigDataService.getConfig('apiCatalog');
  appEnvironment = this.allConfigDataService.getConfig('environmentType')
  constructor(private router:Router, private modelCtrl:ModalController, private alert:AlertController,private http:HttpClient,private allConfigDataService:AllConfigDataService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.custid=this.jsonData.Consumer

   


  }

@Input() jsonData:any;
@Output() SelectedProfile = new EventEmitter();
  @Input()selected: any=1;
setConsumer(x){
  this.selected=x;
this.SelectedProfile.emit(x);
}

AddProfile(){
  this.EditProfile('')
  // this.router.navigate(['Shopping/AddProfileDetails']);
  // this.modelCtrl.dismiss();
}

async EditProfile(x){

  const modal =await this.modelCtrl.create({
    componentProps:{
      
      profilevalue:x,
      UpdateProfileApi:x.custRelationID
    },
    backdropDismiss: false,
    component:AddprofileComponent,
    
   });
   modal.onDidDismiss().then(async (res) => {
    setTimeout(() => {
      if(res.data)this.modelCtrl.dismiss(res.data);
    }, );
   });
   return modal.present();
  }

  DeletAddress(x,ID) {
    this.value=ID;
    this.deleteval=x
    console.log(this.value.custRelationID,"Pankajval")
    if(x>0)this.alert.create({
      header: 'Alert!',
      subHeader: '',
      cssClass: 'custAlert',
      message: "Do You Want To Delete this Profile ?",
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
            this.jsonData.Consumer.splice(x,1);
       this.Deletevalue()
       
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  
  }
  Deletevalue(){
    let params ={
      "TokenId":localStorage.getItem("id_token"),
      "custRelationID":this.value
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnvironment]+"Onboarding/OnboardingSteps/CustomerRegistration" + this.apiCatalog.DeleteCustomer,params).subscribe((res: any)=>{
      this.response=res;
     
      console.log(this.response,"Pakja");
    })
  }
}


















