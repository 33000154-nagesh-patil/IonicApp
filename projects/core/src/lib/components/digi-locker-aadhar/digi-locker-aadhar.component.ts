import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonFunctionService } from '../../services/common-function.service';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { NetworkService } from '../../services/network.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
"frame-ancestors 'self' https://www.truthscreen.com//digilocker/dgl_auth_validate/MzI1NA="

@Component({
  selector: 'app-digi-locker-aadhar',
  templateUrl: './digi-locker-aadhar.component.html',
  styleUrls: ['./digi-locker-aadhar.component.scss'],
})
export class DigiLockerAadharComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() name: any;
  @Input() currentModuleType: any;
  @Input() aadharDetails: any;
  @Input() loginCustomerGuId: any;
  @Output() getAadharStatus = new EventEmitter();
  @Output() skippedAdhaar = new EventEmitter();
  // google='"https://www.google.com"+ "&output=embed"'
  appName: any;
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  loggedInModal: boolean = false
  ErrorMsg: any;
  digiLockerUrl: any;
  target: any;
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 6t
    hidden: 'no', //Or  'yes'
    hideurlbar: 'no',
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
  environmentAPIList: any;
  trangestionID: any;
  url: any;
  myurl: any;
  val: void;
  digiStatus: any;
  continue: boolean=true;
adhaarStatus:any=0
skipFlag:any
  sucess: boolean=false;
  constructor(private router: Router,private modalCtrl:ModalController, private allConfigDataService: AllConfigDataService,private cdn: ChangeDetectorRef,private http:HttpClient, private networkService: NetworkService, private commonService: CommonService, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, private cd: ChangeDetectorRef, private domSanitizer: DomSanitizer, private theInAppBrowser: InAppBrowser) {
    this.loaderService.hideLoader()

    // this.digiLockerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.truthscreen.com//digilocker/dgl_auth_validate/MjcwNQ=")

    
    // /this.digiLockerUrl = "https://www.truthscreen.com//digilocker/dgl_auth_validate/MjcwNQ=";

    this.digiLockerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl("http://uat.aqube.rsec.co.in/EsginHtmlURL/TOR15357137.html");
    

    this.appName = this.allConfigDataService.getConfig('appName');

    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })
    this.networkService.getCurrentPlatform().subscribe((data) => {
      this.currentDevice = data;
      // console.log("Current Device", this.currentDevice)
    })
  }

  ngOnInit() {
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
    this.getDigilocker();
    // this.close();
 
  }

  close(){
    //     var url = "https://www.truthscreen.com//digilocker/dgl_auth_validate/MjcwNQ=" + "&output=embed";
    // window.location.replace(url);
    
        // this.target = (this.currentDevice === 'iOS' || this.currentDevice === 'iphone') ? '_blank' : '';
        // this.target = '_blank';
    
        // const browser = this.theInAppBrowser.create("https://www.truthscreen.com//digilocker/dgl_auth_validate/MjcwNQ=", this.target, this.options);
        // const browser =window.open(this.digiLockerUrl, '', 'width=400,height=200,scrollbars=yes');
        // browser.on('exit').subscribe((data) => {
        //   console.log('browser closed');
        //   // this.getCustomerEsingedStatus();
        // }, err => {
        //   console.error(err);
        //   alert(err.toString());
        // })
      }
  gotoBack() { }
  dismiss(e) { }

  processInsertPostData(status) {
    this.loaderService.showLoader();
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.aadharDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId,
      // "docNumber": this.AadharNo,
      "AadharStatus": status
    }
    // this.loaderService.showLoader();
    if (this.aadharDetails?.DocumentGuId == "") {
      // this.showOTPModal = false;
      // this.skipFlag = false;
      this.errorShow("Something went wrong! Please try again.", "processPANPostData -> Http request");
    } else {
      this.commonService.postPanDetails(localPostData).subscribe((data: any) => {
        this.loaderService.hideLoader();
        if (data && data?.Status) {
          this.getAadharStatus.emit(status)
        } else {
          this.errorShow(data?.Message, "processPANPostData -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "processPANPostData -> Http request");
      })
    }

  }

  errorShow(message: any, functionName: string) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, 'Pan card component -> ' + functionName, message, this.errorList?.okText);
  }
  // ?????????????????????????????????????????????????

getDigilocker(){
  let headers: HttpHeaders = new HttpHeaders({
    "Token": this.environmentAPIList?.token,
  });
  let data={
    "CustGuId":this.loginCustomerGuId
  }
  // this.environmentAPIList?.baseURL + this.environmentAPIList?.UploadPanAadharMaasking, 
  // "https://uat.aqube.rsec.co.in/api/v1/Post/Onboarding/getDigiLocker/Authorization"
  this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.digiLockerAuthorization, data, { headers }).subscribe(
    (data: any) => {
      if (data) {
      //  this.digiLockerUrl = data.data.url 
      //  console.log("digilocker",this.digiLockerUrl);

      //  this.digiLockerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.data.url)
      this.digiLockerUrl = data.data.url
      // debugger;
      const browser =window.open(this.digiLockerUrl, '', 'width=600,height=600,scrollbars=yes');
      // console.log("---------------browser.closed------------------",browser.closed);
      this.loaderService.showLoader();
      // debugger;
      let  timer=  setInterval(() => {
      if(browser.closed){
          this.loaderService.hideLoader();
          this.continue=false
          clearInterval(timer);
         this.proccedDigilocker();
          
          // debugger;
        };
        
      },1000);
      this.loaderService.hideLoader();

       this.trangestionID=data.ts_trans_id
      } else {
        this.errorShow(data?.Message, "getDigilocker -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "getDigilocker -> Http request");
    })
  }


  proccedDigilocker(){
    let headers: HttpHeaders = new HttpHeaders({
      "Token": this.environmentAPIList?.token,
    });
    let data={
      "CustGuId":this.loginCustomerGuId,
      "ts_trans_id": this.trangestionID
    }

    // this.http.get("assets/data/getNextSteps.json")
    this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.fetchDigilockerDocuments, data, { headers })
    .subscribe((data: any) => {
        console.log("Digilocker", data)
        this.loaderService.showLoader()
        if(data && data.Status){
          this.digiStatus=data.Message
          // console.log(this.digiStatus);
          this.adhaarStatus= data.Status;
          this.sucess=false
          this.loaderService.hideLoader();
          setTimeout(()=>{
            this.getAadharStatus.emit(data.Message)
          this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
          },2000)
        }
        else{
          this.digiStatus=data.Message
          // console.log(data)
          // console.log("DigiLocker -->",data.Message)
          this.sucess=true
          this.loaderService.hideLoader();
        }
      }, (error: any) => {
        this.loaderService.hideLoader();
        this.errorShow(error?.Message, "getDigilocker -> Http request");

      })
  }
  getSkip() {
    this.skipFlag = true;
    this.skippedAdhaar.emit("False")
  }
  skipCancel() {
    this.skipFlag = false;
  }
  yesSkip() {
    this.skipFlag = false;
    this.skippedAdhaar.emit("False");
    // this.getAadharStatus.emit(this.adhaarStatus)
    this.http.get("assets/data/getAllSteps.json")
    .subscribe((data: any) => {
      let nextStep = data.DocumentList.filter(x => {
        return x.Status == "Pending";
      })[1].path;
      this.router.navigate(['/Onboarding'+nextStep]);
    })
  }
}
