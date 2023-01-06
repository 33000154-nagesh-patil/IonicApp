import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'app-refer-contacts',
  templateUrl: './refer-contacts.component.html',
  styleUrls: ['./refer-contacts.component.scss'],
})
export class ReferContactsComponent implements OnInit {
  @Input() contact:any;
  whatsappShare: any;
  title: any;
  contacts: any;
  var: any = 'Hi! I am sending you free 1 month Subscription. Sign Up on Torus App using this link and… claim this subscription and other rewards on your first transaction. https://bit.ly/1sNZMwL'
  res: any;
  data:any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  sucessDetail: any;

  constructor(private mdlcrtl:ModalController,private router:Router,private modalCtrl:ModalController,private allConfigDataService: AllConfigDataService,private http:HttpClient) { 
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
  }

  ngOnInit() {
    // this.whatsappShare = this.whatsapp.referWhatsapp
    // this.title = this.whatsappShare.title
    // this.contacts = this.whatsappShare.contactList
    // this.data = this.sucessDetail.
    this.getData();
  }

  dataPass(e) {
    alert(e)
  }
  onCancel(){
    this.mdlcrtl.dismiss()
  }
  goToRewards(){  
    this.mdlcrtl.dismiss()
    this.router.navigate( ['Engagement/EngagementTorusClub/allrewards'])
   }

   getData() {
    alert('gggg')
    let params = {
        "name": "Ayush",
        "mobile": "9850234731",
        "email": "ayush123@gmail.com"
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getStatus + "?refercontactDetails",params).subscribe(
      (datas: any) => {
      this.sucessDetail = datas
      console.log(this.sucessDetail,"kkkkkkkkkk");
      
      })
   }
}
