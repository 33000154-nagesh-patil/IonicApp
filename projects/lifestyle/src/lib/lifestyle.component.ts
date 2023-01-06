import { Component, Input, OnInit } from '@angular/core';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { NetworkService } from 'projects/core/src/lib/services/network.service';

@Component({
  selector: 'lib-lifestyle',
  templateUrl: './lifestyle.component.html',
  styleUrls: ['./lifestyle.component.scss'],
})
export class LifestyleComponent implements OnInit {
  userFirstName:any;
  @Input() imageList:any;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no'
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'yes', //iOS only
    toolbar : 'yes', //iOS only
    enableViewportScale : 'no', //iOS only
    allowInlineMediaPlayback : 'no',//iOS only
    presentationstyle : 'fullscreen',//iOS only
    fullscreen : 'yes',//Windows only 
  toolbarposition: 'top',
  suppressesIncrementalRendering: 'no',
  transitionstyle: 'crossdissolve',
  toolbarcolor:'#D3D3D3'
};
  currentDevice: any;
  constructor(private commonFunctionService:CommonFunctionService,private networkService: NetworkService, private commonService:CommonService, private theInAppBrowser: InAppBrowser) { }

  ngOnInit() {

    this.commonService.getUserDetail().subscribe((data:any)=>{
      if(data){
        this.userFirstName = this.commonFunctionService.titleCaseWord(data?.FirstName?data?.FirstName:'user');
      }
    })

    this.networkService.getCurrentPlatform().subscribe((data) => {
      this.currentDevice = data;
      // console.log("Current Device",this.currentDevice)
    })
  }

  goToAmazon(){
    // window.open("https://www.amazon.in/");
    // console.log("lifestyle amazon",e)
    let target = '_self'; //CordovaBrowser
    // let target = "_system"; //system browser
    // let target = '_blank'; //InAppBrowser
    if(this.currentDevice === 'iOS' || this.currentDevice === 'iphone'){
      target = '_blank';
    }
    let url = 'https://affiliate-program.amazon.in/home/productlinks/search?ac-ms-src=ac-nav'
    this.theInAppBrowser.create(url,target,this.options);
  }
}
