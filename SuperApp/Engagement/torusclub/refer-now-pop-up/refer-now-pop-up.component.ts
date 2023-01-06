import { Clipboard } from '@angular/cdk/clipboard';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'index';
import { ReferContactsComponent } from '../refer-contacts/refer-contacts.component';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
// import { SMS } from '@awesome-cordova-plugins/sms/ngx';

@Component({
  selector: 'lib-refer-now-pop-up',
  templateUrl: './refer-now-pop-up.component.html',
  styleUrls: ['./refer-now-pop-up.component.scss'],
})
export class ReferNowPopUpComponent implements OnInit {
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  dataDetail: any;
  steps: any;
  @Input() allData:any;
  username: string = '';
  data: any;


  list = [
    {
      title: 'facebook',
      icon: '/assets/icon/facebook icon.svg'
    },
    {
      title: 'twiter',
      icon: '/assets/icon/twitter icon.svg'
    },
    {
      title: 'insta',
      icon: '/assets/icon/instagram icon.svg'
    },
    {
      title: 'copyLink',
      icon: '/assets/icon/link icon.svg'
    }
  ]
  userMobileNumber : FormGroup;
  constructor(private socialsharing: SocialSharing,private clipboard: Clipboard, private modalCtrl: ModalController,private http:HttpClient, private allConfigDataService: AllConfigDataService,private formBuilder: FormBuilder) {
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Engagement/EngagementTorusClub';
  }

  ngOnInit() {
    this.userMobileNumber=this.formBuilder.group({
      mobileNumber:['',Validators.required,Validators.maxLength(10)]
    })

    this.getData();
  }

  socialSharing() {
    var options = {
      message: 'share this App', // not supported on some apps (Facebook, Instagram)
      files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.website.com/foo/#bar?a=b',
    };

    this.socialsharing.shareWithOptions(options);
  }

  getData() {
    let params = {
      "TokenID": ""
    }

    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getStatus + "?torusReferDetail",params).subscribe(
      (data: any) => {
        this.dataDetail = data;
        this.steps = data.allSteps;

      });
  }

   whatsappShare(e) {
    this.modalCtrl.dismiss(e);
    // this.sms.send('919444442937', 'Hello world!');
   }

  viaSubApp(data) {
    alert(data)

    var options = {
      message: 'hello',
      url:''
    }
    if (data == 'facebook') {
      // this.socailSharing.shareViaFacebook(options.url)
    }
    else if(data == 'twiter'){
      // this.socailSharing.shareViaTwitter(options.url)
    }
    else if(data == 'insta'){
      // this.socailSharing.shareViaInstagram
    }
    else if (data == 'copyLink') {
      this.clipboard.copy(options.url)
    }
  }

  copyData(e) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = e;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  // Cancel() {
  //   this.modalCtrl.dismiss();
  // }

}
