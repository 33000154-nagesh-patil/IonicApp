import { Component, EventEmitter, Input, OnInit, Output,ChangeDetectorRef,ChangeDetectionStrategy } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Input() environmentAPI:any;
  @Input() currentDevice:any;
  @Input() imageList:any;
  @Input() errorList:any;
  @Input() gmailAuthentication:any;
  @Input() mobileAuthentication:any;
  @Input() faceBookAuthentication:any;
  @Input() instagramAuthentication:any;
  @Input() otherAuthentication:any;
  @Input() currentCountryAuthentication:any;
  @Input() currentLanguage:any;
  @Output() sendLoggingDataContainer  = new EventEmitter<any>();
  @Output() sendLoggingDataMobile = new EventEmitter<any>();
  @Output() sendLoggingDataCustMobileDetail = new EventEmitter<any>();
  @Output() sendReferralCode = new EventEmitter<any>();

  constructor(private cdn: ChangeDetectorRef,private fb: Facebook) { }
  ngOnInit() {
  }

  ngAfterViewInit() {
   //this.cdn.detectChanges()
  }
  sendTodashboard(data){
    this.sendLoggingDataContainer.emit(data)
  }
  sendTodashboardMobile(data){
    this.sendLoggingDataMobile.emit(data)
  }
  sendToDashboardCustMobileDetail(data){
    this.sendLoggingDataCustMobileDetail.emit(data)
  }
  sendReferral(val){
    this.sendReferralCode.emit(val)
  }
}
