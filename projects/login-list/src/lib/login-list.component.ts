import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoginType } from 'projects/core/src/lib/enums/comman.enum';
import { ModalController } from '@ionic/angular';
import { LoginAuthenticationComponent } from './login-authentication/login-authentication.component';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
@Component({
  selector: 'lib-loginList',
  templateUrl: './login-list.component.html',
  styleUrls: ['./login-list.component.scss'],
})
export class LoginListComponent implements OnInit {
  @Input() environmentAPILib: any;
  @Input() currentDeviceLib: any;
  @Input() imageListLib: any;
  @Input() errorListLib: any;
  @Input() gmailAuthenticationLib: any;
  @Input() mobileAuthenticationLib: any;
  @Input() faceBookAuthenticationLib: any;
  @Input() instagramAuthenticationLib: any;
  @Input() otherAuthenticationLib: any;
  @Input() currentCountryAuthenticationLib: any;
  @Input() currentLanguageLib: any;
  _LoginType = LoginType
  dataValue = {
    "type": "Mobile",
    "contains": "loginMobile"
  }

  openModalFlag : boolean = false;

  @Output() sendLoggingDataLoginPage = new EventEmitter<any>();
  @Output() sendLoggingDataMobileLoginPage = new EventEmitter<any>();
  @Output() sendLoggingDataCustMobileDetail = new EventEmitter<any>();
  @Output() sendReferralCode = new EventEmitter()
  referralCode: any;
  constructor(public modalController: ModalController, private loaderService: LoaderService) { }

  ngOnInit() {

  }

  // async OpenModal(data: any){
  //   this.loaderService.showLoader();
  //   const modal = await this.modalController.create({
  //     component: LoginAuthenticationComponent,
  //     componentProps: {
  //       'LoginType': this._LoginType,
  //       'type': data?.type,
  //       'headerName': data?.contains,
  //       'errorList': this.errorListLib,
  //       'currentCountryAuthentication': this.currentCountryAuthenticationLib
  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //       console.log("LoginAuthenticationComponent", JSON.stringify(data))
  //       if (data) {
  //         this.sendLoggingDataMobileLoginPage.emit(data)
  //       }
  //     });
  //   this.loaderService.hideLoader();
  //   return await modal.present();

  // }

  async TriggerToOpenModal(data: any) {
    this.loaderService.showLoader();
    let eventEmitter = new EventEmitter();
    eventEmitter.subscribe(res => {
      this.referralCode = res;//edited
      this.sendReferralCode.emit(this.referralCode)
      
    })
    const modal = await this.modalController.create({
      component: LoginAuthenticationComponent,
      componentProps: {
        'LoginType': this._LoginType,
        'type': data?.type,
        'headerName': data?.contains,
        'errorList': this.errorListLib,
        'currentCountryAuthentication': this.currentCountryAuthenticationLib,
        "emitReferralCode":eventEmitter
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        // console.log("LoginAuthenticationComponent", JSON.stringify(data))
        if (data) {
          this.sendLoggingDataMobileLoginPage.emit(data)
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();

  }

  sendToAppLogin(data: any) {
    this.sendLoggingDataLoginPage.emit(data)
  }
  sendToAppCustLogin(data : any){    
    this.sendLoggingDataCustMobileDetail.emit(data)
  }
}
