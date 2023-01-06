import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { AllConfigDataService } from './all-config-data.service';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NetworkService } from './network.service';
import { fileURLToPath } from 'url';
@Injectable({
  providedIn: 'root'
})
export class CommonFunctionService {

  target: any;
  cardData:any;
  headerData: any;

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: 'Close', //iOS only
    disallowoverscroll: 'yes', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'no', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'fullscreen',//iOS only
    fullscreen: 'yes',//Windows only 
    toolbarposition: 'top',
    suppressesIncrementalRendering: 'no',
    transitionstyle: 'crossdissolve',
    toolbarcolor: '#D3D3D3'
  };
  currentDevice: any;
  loggedInModal:boolean=false
  productDetails: any;
  constructor(private alertService:AlertService, private theInAppBrowser: InAppBrowser, private networkService: NetworkService) {
    this.networkService.getCurrentPlatform().subscribe((data) => {
      this.currentDevice = data;
      // console.log("Current Device",this.currentDevice)
    })
  }

  getShortName(fullName) {
    return (!!fullName && fullName!=' ')?fullName?.split(' ').map(n => n[0]).join(''):'HI';
  }

  titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  showErrorsService(header,subHeader,message,buttonText){
    this.alertService.showAlert(header, subHeader, message, "ok");
  }

  inAppBrowser(url) {
    this.target = (this.currentDevice === 'iOS' || this.currentDevice === 'iphone') ? '_blank' : '_self';
    this.theInAppBrowser.create(url, this.target, this.options);
  }

  dobFormattedDDMMYYYY(date) {
    var d = new Date(Date.parse(date));
    let getMonth=(d.getMonth()+1).toString();
    let getDate=(d.getDate()).toString();
    if ((d.getMonth()+1)< 10)getMonth = '0' + getMonth;
    if ((d.getDate()+1)< 10)getDate = '0' + getDate;
    return getDate + "-" + getMonth + "-" + d.getFullYear();
  }

  dobFormattedYYYYMMDD(date) {
    var d = new Date(Date.parse(date));
    let getMonth=(d.getMonth()+1).toString();
    let getDate=(d.getDate()).toString();
    if ((d.getMonth()+1)< 10)getMonth = '0' + getMonth;
    if ((d.getDate()+1)< 10)getDate = '0' + getDate;
    return d.getFullYear()+ "-" + getMonth + "-" + getDate;
  }

 PopUpService(){
  let loggedInModal = true

  setTimeout(() => {
    loggedInModal = false;
  }, 3000);

}

getSelectedProductDetails(){
  return this.productDetails;
}

setSelectedProductDetails(product:any){
  this.productDetails = product;
}

getClubCard() {
  return this.cardData
}

setClubCard(data: any) {
  this.cardData = data
}

setClubHeader(e) {
  this.headerData = e
}

getClubHeader() {
  return this.headerData
}




}
