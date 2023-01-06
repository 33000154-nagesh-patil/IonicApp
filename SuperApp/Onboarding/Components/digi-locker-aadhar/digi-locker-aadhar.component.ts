import { environment } from 'src/environments/environment';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';



import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AllConfigDataService } from 'index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonFunctionService } from 'index';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { NetworkService } from 'index';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
// "frame-ancestors 'self' https://www.truthscreen.com//digilocker/dgl_auth_validate/MzI1NA="
declare var Digio: any;
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
success: boolean=false;
  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/DigiLockerAdhar",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  aadharData: any;
  constructor(private router: Router,private allConfigDataService: AllConfigDataService,
    private http:HttpClient, private networkService: NetworkService, private commonService: CommonService, 
    private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, 
    private domSanitizer: DomSanitizer,
    private onboardingService:OnboardingService
    ) {
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
   
    // this.getDigilocker();
    // this.close();
 
  }
ionViewDidEnter(){
  this.startDigioProcess();
  // this.getSkip();
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
  dismiss() { }

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

// getDigilocker(){
//   let headers: HttpHeaders = new HttpHeaders({
//     "Token": this.environmentAPIList?.token,
//   });
//   let data={
//     "CustGuId":this.loginCustomerGuId
//   }
//   // this.environmentAPIList?.baseURL + this.environmentAPIList?.UploadPanAadharMaasking, 
//   // "https://uat.aqube.rsec.co.in/api/v1/Post/Onboarding/getDigiLocker/Authorization"
//   this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.digiLockerAuthorization, data, { headers }).subscribe(
//     (data: any) => {
//       if (data) {
//       //  this.digiLockerUrl = data.data.url 
//       //  console.log("digilocker",this.digiLockerUrl);

//       //  this.digiLockerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.data.url)
//       this.digiLockerUrl = data.data.url
//       // debugger;
//       const browser =window.open(this.digiLockerUrl, '', 'width=600,height=600,scrollbars=yes');
//       // console.log("---------------browser.closed------------------",browser.closed);
//       this.loaderService.showLoader();
//       // debugger;
//       let  timer=  setInterval(() => {
//       if(browser.closed){
//           this.loaderService.hideLoader();
//           this.continue=false
//           clearInterval(timer);
//          this.proccedDigilocker();
          
//           // debugger;
//         };
        
//       },1000);
//       this.loaderService.hideLoader();

//        this.trangestionID=data.ts_trans_id
//       } else {
//         this.errorShow(data?.Message, "getDigilocker -> status");
//       }
//     }, (error: any) => {
//       this.errorShow(error?.Message, "getDigilocker -> Http request");
//     })
//   }


  proccedDigilocker(val,otherDetails){
    let data={
      "TokenId":localStorage.getItem("id_token"),
      adhaarStatus:val,
      otherDetails:otherDetails
      // "ts_trans_id": this.trangestionID
    }

    // this.http.get("assets/data/getNextSteps.json")
    this.loaderService.showLoader()
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog['environment']]+this.apiCatalog['breadCrumb']+this.apiCatalog.submitDetails,data)
    .subscribe((data: any) => {
      this.loaderService.hideLoader();
        console.log("Digilocker", data)
        if(data && data.Status){
          this.digiStatus=data.Message
          // console.log(this.digiStatus);
          this.adhaarStatus= data.Status;
          this.success=false
          
            // this.getAadharStatus.emit(data.Message)
          
          // this.router.navigate(['/Onboarding'+data['pageUrl']]);
          // this.router.navigate(['/Onboarding/NameAddressDetails']);
          
          this.onboardingService.nextOnSuccess('Aadhar');
          
        }
        else{
          this.digiStatus=data.Message
          // console.log(data)
          // console.log("DigiLocker -->",data.Message)
          this.success=true
          this.onboardingService.nextOnSuccess('Aadhar');
        }
      }, (error: any) => {
        this.loaderService.hideLoader();
        this.onboardingService.skip('Aadhar');
        // this.errorShow(error?.Message, "getDigilocker -> Http request");

      })
  }
  getSkip(val) {
    this.skipFlag = val;
    // this.skippedAdhaar.emit("False")
  }
  skipCancel() {
    this.skipFlag = false;
    this.startDigioProcess()
  }
  yesSkip() {
    this.skipFlag = false;
    // this.skippedAdhaar.emit("False");
    // this.getAadharStatus.emit(this.adhaarStatus)
    this.proccedDigilocker(false,undefined)
  }

  startDigioProcess(){

    let param={
      "TokenId":localStorage.getItem('id_token')
    }
    this.loaderService.showLoader()
    this.http.post(
      this.apiCatalog.baseURL[this.apiCatalog.environment]
      +this.apiCatalog.breadCrumb
      +this.apiCatalog.getDetail,
      param)
      .subscribe((res:any)=>{
        this.loaderService.hideLoader()
        if(res.Status){
          this.aadharData = res.data
          var self=this;
          var options = {
            environment : (this.apiCatalog.environment=='prod'|| this.apiCatalog.environment=='cug')?'production':'sandbox',
            callback : function (response){
            if(response.hasOwnProperty("error_code")){
              self.getSkip(res)
            return console.log("error occurred in process");
            }
            self.proccedDigilocker(true,res.data)
            console.log("Signing completed successfully");
            },
            logo : "https://www.mylogourl.com/image.jpeg",
            theme : {
            primaryColor : "#1146B0",
            secondaryColor : "#D2DAEA"
            }
            
              };
          var digio =new Digio(options)
          digio.init()
          digio.submit(res.Kid,res.EmailId,res.TokenId);
          // digio.submit("KID2210281648164699QUPEF9EWIPL8S","jayeshmishra92@gmail.com","GWT221028164816519MW8RP871ODAO9V");
        }else{
          this.getSkip(res)
        }
      },(err)=>{
        this.loaderService.hideLoader();
        this.commonFunctionService.showErrorsService('','','Call is not proper','Ok');
      });    
  }
}

  //ignore this part 
// var scriptElement=document.createElement('script');
// scriptElement.type = 'javascript';
// scriptElement.src = "https://app.digio.in/sdk/v10/digio.js";

// function loadScript(src) {
//   return new Promise(function (resolve, reject) {
//         var script = document.createElement('script');
//         script.onload = function () {
//             // resolve();
//             console.log('loaded');
            
//         };
//         script.onerror = function () {
//             reject();
//         };
//         script.src = src;
//         document.body.appendChild(script);
// });
// }

  


// loadScript("https://app.digio.in/sdk/v10/digio.js").then(function(){
//   // Do whatever you want to do after script load
//   var options = {
//     environment : "production",
//     callback : function (response){
//     if(response.hasOwnProperty("error_code")){
//     return console.log("error occurred in process");
//     }
    
//     console.log("Signing completed successfully");
//     },
//     logo : "https://www.mylogourl.com/image.jpeg",
//     theme : {
//     primaryColor : "#AB3498",
//     secondaryColor : "#000000"
//     }
//     }
//   var digio = new Digio(options);
//   console.log('loaded');
//   // digio.init();
// });

// class Digio{

//   constructor(options){

//   }
// }