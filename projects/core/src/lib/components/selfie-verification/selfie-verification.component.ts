import { Router } from '@angular/router';
import { Component, Input, OnInit, ViewChild, Output, EventEmitter, ElementRef, ChangeDetectorRef, AbstractType } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonFunctionService } from '../../services/common-function.service';
import { NetworkService } from '../../services/network.service';
import { CommonService } from '../../services/common.service';
import { WebCamComponent } from '../web-cam/web-cam.component';
import * as watermark from 'watermarkjs';
@Component({
  selector: 'app-selfie-verification',
  templateUrl: './selfie-verification.component.html',
  styleUrls: ['./selfie-verification.component.scss'],
})
export class SelfieVerificationComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() name: any;
  @Input() currentModuleType: any;
  @Input() selfieDetails: any;
  @Input() loginCustomerGuId: any;
  @Output() getSelfieStatus = new EventEmitter();
  selfiUploaded: boolean = false;
  currentImg: string;
  appName: any;
  environmentAPIList: any;
  selfieImage: Blob;
  currentNativeNetwork: any;
  loggedInModal: any;
  ErrorMsg: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  @ViewChild('waterMarkedImage') waterMarkImage: ElementRef;
 
  originalImage = null;
  blobImage = null;
  locationCordinates:any;
  loadingLocation:boolean;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  

  constructor(private router:Router,private camera: Camera, private geolocation: Geolocation, private toastService: ToastService, private actionSheetController: ActionSheetController, private http: HttpClient, private commonservice: CommonService, private loaderService: LoaderService, private allConfigDataService: AllConfigDataService, private cdn: ChangeDetectorRef, private commonFunctionService: CommonFunctionService, public modalCtrl: ModalController, private networkService: NetworkService) {
    
   }

  ngOnInit() {
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Onboarding/OnboardingSteps/Selfie';
    
    this.loaderService.hideLoader()
    this.appName = this.allConfigDataService.getConfig('appName');
    this.imageList = this.allConfigDataService.getConfig('images');

    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();

    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })
    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })
  }
  successModalClose() { }

  
  getLatLong() {
    // debugger;
    this.loadingLocation = true;
    
    this.geolocation.getCurrentPosition().then((resp) => {
      // console.log(resp);
     
      this.locationCordinates = resp.coords;
      this.loadingLocation = false;
    }).catch((error) => {
      this.loadingLocation = false;
      // console.log('Error getting location', error);
    });
  }

  watermarkImage() {
    let date = new Date();
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    let hours = date.getHours();
    let second = date.getSeconds();
    let minutes = date.getMinutes();
let todayDate = dd + '/' + mm + '/' + yyyy;
    watermark([this.blobImage])
    .image(watermark.text.lowerRight("("+this.locationCordinates.latitude+", "+this.locationCordinates.longitude+")" + "("+todayDate+", "+hours+":"+minutes+":"+second+")", '18px Arial bold', '#fff',1))
    // .image(watermark.text.topRight("()", '24px Arial bold', '#fff',1))
    .then(async img => {	
      // debugger;	
      if(img)this.currentImg =await img.src;	
      
        // console.log("currentImg",this.currentImg);
        let realData = this.currentImg.split(",")[1];
        this.selfieImage = this.b64toBlob(realData, 'image/jpeg');
        // this.selfieImage== this.b64toBlob(res._imageAsDataUrl, 'image/jpeg');
        
      });
        
        // console.log("this.locationCordinates.lattitude",", " +this.locationCordinates.latitude+", "+this.locationCordinates.longitude);
    }
  

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 40,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
      // cameraDirection: this.camera.Direction.FRONT
    }
    this.camera.getPicture(options).then((imageData) => {
      // console.log("imageData", imageData)
      // imageData is either a base64 encoded string or a file URI
      this.currentImg = 'data:image/jpeg;base64,' + imageData;
      // console.log(this.currentImg);
      fetch(this.currentImg).then(res => res.blob())
      .then(blob => {
        this.blobImage = blob;
        this.watermarkImage();
      });
      this.selfiUploaded = true;

      // this.toastService.showAutoToast(this.currentImg)

      // let realData = this.currentImg.split(",")[1];
      // this.selfieImage = this.b64toBlob(realData, 'image/jpeg');

      // this.toastService.showAutoToast(selfieImage)

      this.cdn.detectChanges();

    }, (err) => {
      console.log("err", err)
      // Handle error
    });
  }
  b64toBlob(b64Data: string, contentType: string) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  selfieImageSendToServer(file) {
    // debugger;
    const formData = new FormData();
    // formData.append('image', this.imageList.arrow);
    // formData.append('document', this.imageList.arrow);
    formData.append('secretToken', '14b352c2')
    formData.append('image', file);
    formData.append('document', file);
    formData.append('CustGuId', this.loginCustomerGuId)
    formData.append('tsTransID', 'TS-YUD-961374');
    let headers: HttpHeaders = new HttpHeaders({
      "username": this.environmentAPIList?.selfieUsername,
      "Token": this.environmentAPIList?.token
    });

    // console.log("formData",formData);

    this.loaderService.showLoader();
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.Selfie, {})
    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.SelfieVerify, formData, { headers })
    .subscribe(
      (data: any) => {
        // console.log("Selfie details", data);
        if (data && data?.status) {
          // this.getSelfieStatus.emit("Selfie")
        this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);

          // this.processSelfiePostData()
        } else {
          this.errorShow(data?.Message, "getEsign -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "getEsign -> Http request");
      })

  }

  processSelfiePostData() {
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.selfieDetails?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId
    }
    // this.loaderService.showLoader();
    // this.commonservice.postPanDetails(localPostData)
    // this.http.get('assets/data/getNextSteps.json')
    // .subscribe((data: any) => {
      this.loaderService.hideLoader();
      // if (data && data?.Status) {
        // this.getSelfieStatus.emit("Selfie")
        this.http.get('assets/data/getNextSteps.json')
        // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'Onboarding'+this.apiCatalog.getNextStep, "reqParams")
          .subscribe((data: any) => {
            if (data) {
              // this.getNextStep.emit(data?.msg)
              this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
            } else { 
              this.errorShow(data?.Message, "dummyPanPOST -> Http request");
            }
          })

        // this.router.navigate(['/Onboarding'+data['UrlToRedirect']]);
    //   } else {
    //     this.errorShow(data?.Message, "processPANPostData -> status");
    //   }
    // }, (error: any) => {
    //   this.errorShow(error?.Message, "processPANPostData -> Http request");
    // })
  }

  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
  }

  async onTakePicture() {
    // alert('click');
    // debugger;
    this.detectWebcam()
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
        {
          text: 'Use Camera',
          handler: () => {
            if (this.isCordovaStatus) {
              this.pickImage(this.camera.PictureSourceType.CAMERA);
            } else {
              this.detectWebcam()
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    // debugger;
    if (!this.isCordovaStatus) {
      // navigator.permissions.query({ name: 'geolocation' }).then((permission)=>{
      //   console.log("permission",permission.state);
      //   if(permission?.state == "denied"){
      //     return this.errorShow("please enable location in your browser", "getEsign -> Http request");
      //   }else{
      //     this.getLatLong();
      //     //actionSheet.present();
      //   }
      // });
      navigator.geolocation.getCurrentPosition(
        (i)=>{
          this.loadingLocation = true;
          this.locationCordinates = i.coords;
          this.loadingLocation = false;
        },
        (i)=>{
          return this.errorShow("please enable location in your browser", "getEsign -> Http request");
        }
      )
    }else{
      await actionSheet.present();
    }
   
  }

  gotoBack() {
    if (this.selfiUploaded) {
      this.selfiUploaded = false;
    } else {
      this.modalCtrl.dismiss();
    }
  }

  dismiss(e) {
    if (this.selfiUploaded) {
      this.selfiUploaded = false;
    } else {
      this.modalCtrl.dismiss();
    }
  }

  tryAgain() {
    this.onTakePicture();
  }


  async WebCam(id) {
    let eventEmitter = new EventEmitter();
    eventEmitter.subscribe(res => {
      // if(id=="pan")this.copPAN=res;
      if (id == "selfie") {
        this.currentImg = res;
        fetch(res).then(res => res.blob())
      .then(blob => {
        this.blobImage = blob;
        this.watermarkImage();
      });
        // console.log(this.currentImg)
        // let realData = this.currentImg.split(",")[1];
        // this.selfieImage = this.b64toBlob(realData, 'image/jpeg');
        // this.selfieImage== this.b64toBlob(res._imageAsDataUrl, 'image/jpeg');
      }
      this.selfiUploaded = true
      // if(id=="adharFornt")this.copAdharFront=res;
      // if(id=="adharBack")this.copAdhar=res;
    })
    const modal = await this.modalCtrl.create({
      component: WebCamComponent,
      cssClass: 'h-100 w-100 modal-fullscreen',
      componentProps: {
        'webImage': eventEmitter
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        // this.router.navigate(['/Dashboard']);
      });
    return await modal.present();
  }

  looksGood() {
    // this.getSelfieStatus.emit("Selfie")
    
    this.checkNetworkConnectionPAN();
  }

  checkNetworkConnectionPAN() {
    if (this.isCordovaStatus) {
      this.nativeNetworkPAN();
    } else {
      this.windowNetworkPAN();
    }
  }
  nativeNetworkPAN() {
    if (this.currentNativeNetwork) {
      this.selfieImageSendToServer(this.selfieImage)
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }
  windowNetworkPAN() {
    if (this.currentWindowNetwork) {
      this.selfieImageSendToServer(this.selfieImage)

      // this.dummyNextStep();//by pass
    } else {
      this.ErrorMsg = this.errorList?.networkError
      this.loggedInModal = true

      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);

    }
  }

  detectWebcam() {
    // this.watermarkImage();
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) {
      return this.callback(false);
    }
    md.enumerateDevices().then(devices => {
      this.callback(devices.some(device => 'videoinput' === device.kind));
    })
  }

  callback(hasWebcam) {
    hasWebcam?this.WebCam("selfie"):this.toastService.showAutoToast(this.errorList?.webCamError);
  }
  


}
