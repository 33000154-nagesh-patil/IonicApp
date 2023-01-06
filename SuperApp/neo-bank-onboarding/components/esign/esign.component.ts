import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AllConfigDataService } from 'index';
import { CommonFunctionService } from 'index';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InAppBrowserOptions, InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NetworkService } from 'index';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { NsdlComponent } from './nsdl/nsdl.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esign',
  templateUrl: './esign.component.html',
  styleUrls: ['./esign.component.scss'],
})
export class EsignComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() name: any;
  @Input() currentModuleType: any;
  @Input() esignDetails: any;
  loggedInModal: boolean = false
  @Input() loginCustomerGuId: any;
  @Output() getESignStatus = new EventEmitter();
  ErrorMsg: any;
  environmentAPIList: any;
  appName: any;
  UserEmail: any;
  count: any = 0;
  ifChecked: any = true;
  showPopUp: any = false;
  check: any;

  fileName: string;
  fileContents: string;
  dirName: string;
  dirPath: string;
  eSignUrl: any;
  nsdlPdf: any;
  ToggalUrl: any
  pdfToggle: boolean = true;
  signNow: boolean = true;
  target: any;
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

  pdfSource: any;

  zoom = 1;
  zoomScale = 'page-width';
  zoomScales = ['page-width', 'page-fit', 'page-height'];

  zoom_to: any;
  isLoading: false;
  currentNativeNetwork: any;
  safeUrl: any;
  ToggalUrl1: any;
  PdfPath: any;
  countPdf: any = 0;
  kraVal: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  // domSanitizer: any;

  constructor(private router: Router,private modalController: ModalController, private domSanitizer: DomSanitizer, private allConfigDataService: AllConfigDataService, private loaderService: LoaderService, private loadingController: LoadingController, private commonService: CommonService, private commonFunctionService: CommonFunctionService, private networkService: NetworkService, private file: File, private http: HttpClient, private theInAppBrowser: InAppBrowser) { }

  ngOnInit() {
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Onboarding/OnboardingSteps/NeoBank';
    this.imageList = this.allConfigDataService.getConfig('images');
    // this.loaderService.hideLoader();
    this.commonService.getUserDetail().subscribe((data: any) => {
      if (data) {
        this.UserEmail = data?.EmailId
      }
    })
    this.appName = this.allConfigDataService.getConfig('appName');

    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
    this.networkService.getCurrentPlatform().subscribe((data) => {
      this.currentDevice = data;
      // console.log("Current Device", this.currentDevice)
    })

    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })

  }
  successModalClose() {
    this.loggedInModal = false
  }

  ngAfterViewInit() {
    if(localStorage.getItem("reload")!="1"){
      localStorage.setItem("reload","1");
      // window.location.reload()
    }
    this.esignPDFPreveiw();
  }
  async esignPDFPreveiw() {
    // debugger;
    
    // setTimeout(() => {
    //   this.loaderService.hideLoader();//hide loader after 9 sec for buffer, to download PDF
    // }, 9000);
    // this.loaderService.hideLoader();
    if (this.currentNativeNetwork) {
      // await this.loadingController.create({
      //   duration: 5000,
      //   message: 'Please wait...'
      // }).then(a => {
      //   a.present().then(() => {
      //     console.log('EsignPDFPreveiw presented');
      //   });
      // });

      let formData = new FormData();
      formData.append('firstName', this.name.split(" ")[0]+" "+this.name.split(" ")[1]);
      formData.append('lastName', this.name.split(" ")[2]);//to be made dynamic
      formData.append('location', "Mumbai");
      formData.append('reason', "Esign Api");
      formData.append('CustGuId', this.loginCustomerGuId);

      let headers: HttpHeaders = new HttpHeaders({
        "Token": this.environmentAPIList?.token,
      });

      // console.log("formData",formData);
      // debugger;
      this.loaderService.showLoader();
      this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.addPdfdetailsForEsign, formData)
    //  this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.EsignPDFPreveiw, formData, { headers })
    .subscribe(
        async (data: any) => {
          // working
          // this.loaderService.hideLoader();
          // this.loaderService.hideLoader();
          // console.log("EsignPDFPreveiw details", data)
          
          if (data && data?.Status) {

            // this.ToggalUrl = "https://uat.aqube.rsec.co.in/EsginePreViewPdf/EsignPreview.pdf";
            // this.ToggalUrl = this.environmentAPIList?.baseURL + this.environmentAPIList?.esignPreview;
            // this.ToggalUrl = await data.data[0][0];
            this.ToggalUrl="https://uat.aqube.rsec.co.in/EsginePreViewPdf/TOR83031508_EsignPreview.pdf"
            // this.ToggalUrl = data.PDFPreveiwUrl
            // this.ToggalUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.PDFPreveiwUrl)
            // this.pdfSource = data.PDFPreveiwUrl;
            await this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw Succes'));
            // debugger;
            setTimeout(() => {
              this.loaderService.hideLoader(); // working
            },9000);
            
            
          } else {
          this.loaderService.hideLoader(); // working

            await this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw dismissed'));
            this.errorShow(data?.Message, "getEsign -> status");
          }
        }, async (error: any) => {
          await this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw dismissed'));
          this.errorShow(error?.Message, "getEsign -> Http request");
        })
        
    } else {
      await this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw dismissed'));
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
     
    }

  //  this.kraVal = this.commonService.getKraStatus();
  //   console.log('----------- ----------',this.kraVal);
    
    
  }
  downloadPdf() {
    var save = document.createElement('a');
    save.href = this.ToggalUrl;
    save.download = "mypdf.pdf";
    save.target = '_blank';
    document.body.appendChild(save);
    save.click();
    document.body.removeChild(save);
  }
  gotoBack() {

  }
  dismiss(e) {

  }
  zoomIn() {
    this.zoom += 1;
  }

  zoomOut() {
    if (this.zoom > 1)
      this.zoom -= 1;
  }


  hide() {
    this.showPopUp = false
  }

  popUp() {
    this.showPopUp = true
  }

  terms(status: any) {
    if (!status.target.checked) {
      this.count++;
      if (this.count === 2) {
        this.ifChecked = false
      }
    } else {
      this.count--;
      this.ifChecked = true
    }
  }

  goToNsdl() {
    if (this.currentNativeNetwork) {
      this.processToNSDL();
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }

  processToNSDL() {
    this.loaderService.showLoader();
    let formData = new FormData();
    formData.append('firstName', this.name);
    formData.append('lastName', ".");
    formData.append('location', "Mumbai");
    formData.append('reason', "Esign Api");
    formData.append('CustGuId', this.loginCustomerGuId);

    let headers: HttpHeaders = new HttpHeaders({
      "Token": this.environmentAPIList?.token,
    });
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.addPdfdetailsForEsign, {})
 
    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.esign, formData, { headers })
    .subscribe(
      (data: any) => {
        console.log("Esign details", data)
        if (data && data?.Status) {
          // console.log("Esign", data);

          this.loaderService.hideLoader();
          // this.commonFunctionService.inAppBrowser(data.UrlToRedirect);
        this.router.navigate(['/neoBankOnboarding'+data['URLtoRedirect']]);
          this.safeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.UrlToRedirect)
          
      // console.log(this.safeUrl);
          this.eSignUrl = this.safeUrl;

          // this.nsdlPopUp()

          // this.target = (this.currentDevice === 'iOS' || this.currentDevice === 'iphone') ? '_blank' : '_self';

          // const browser = this.theInAppBrowser.create(data.UrlToRedirect, this.target, this.options);
          // browser.on('exit').subscribe((data) => {
          //   console.log('browser closed');
          //   this.getCustomerEsingedStatus();
          // }, err => {
          //   console.error(err);
          //   alert(err.toString());
          // })

        } else {
          this.errorShow(data?.Message, "getEsign -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "getEsign -> Http request");
      })
    // this.getESignStatus.emit("esign")
  }
  async nsdlPopUp() {
    // this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: NsdlComponent,
      componentProps: {
        // "nsdlUrl":  this.domSanitizer.bypassSecurityTrustResourceUrl(this.eSignUrl)
        "nsdlUrl": this.eSignUrl
      },
      // backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        this.getCustomerEsingedStatus()
        // if (data && data?.data) {

        // }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }
  getCustomerEsingedStatus() {
    // this.loaderService.showLoader();
    let params = {
      "CustGuId": this.loginCustomerGuId
    }
    this.http.get(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.checkCustomerEsignStatus)

    // this.commonService.getCustomerEsingedStatus(params)
    .subscribe((data: any) => {
      // console.log("Esign details", data)
      if (data && data?.Status) {
        this.loaderService.hideLoader();

        // this.getESignStatus.emit("esign")
        if (data?.EsignStatus == 1) {

          // this.processESignPostData()
          this.ToggalUrl = data.PdfPath;
          // this.ToggalUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(data.PdfPath)
          this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw nsdlSucess'));
          this.pdfToggle = false;
          this.signNow = false;
          this.showPopUp = false;
        } else {
          this.errorShow(data?.Message, "getEsign -> status");  
        }
      } else {
        this.errorShow(data?.Message, "getEsign -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "getEsign -> Http request");
    })
  }

  processESignPostData() {
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.esignDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId
    }
    // this.loaderService.showLoader();
    this.commonService.postPanDetails(localPostData)
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.addPdfdetailsForEsign, localPostData)
    // this.http.get('assets/data/getNextSteps.json')
    .subscribe((data: any) => {
      this.loaderService.hideLoader();
      if (data && data?.Status) {
        // this.getESignStatus.emit("esign")
        // this.getESignStatus.emit("esign")
        this.router.navigate(['/Onboarding'+data['UrlToRedirect']]);
      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })
  }

  errorShow(message, functionName) {
    this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw nsdlSucess'));
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
  }

  exporeApp() {
    // window.open("https://reportscug.reliancesmartmoney.com/aqubeonboarding/exploreApp/exploreApp.html")
    this.processESignPostData()
  }
}
