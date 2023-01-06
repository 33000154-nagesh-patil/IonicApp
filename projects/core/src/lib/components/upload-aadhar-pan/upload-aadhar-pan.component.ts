import { urlFetch } from 'index';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { NetworkService } from '../../services/network.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { take } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { WebCamComponent } from '../web-cam/web-cam.component';
import { CommonService } from '../../services/common.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from '../../services/loader.service';
import { CommonFunctionService } from '../../services/common-function.service';
import { master } from '../../interfaces/common.interface';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-upload-aadhar-pan',
  templateUrl: './upload-aadhar-pan.component.html',
  styleUrls: ['./upload-aadhar-pan.component.scss'],
})
export class UploadAadharPanComponent implements OnInit {
  @Input() imageList: any;
  @Input() errorList: any;
  @Input() name: any;
  @Input() currentModuleType: any;
  @Input() uploadPanAadharDetails: any;
  @Input() loginCustomerGuId: any;
  @Output() getUploadPanAadharStatus = new EventEmitter();
  appName: any;
  currentLanguage: any;
  currentNativeNetwork: any;
  isCordovaStatus: any;
  currentWindowNetwork: any;
  panAdharDetails: FormGroup;
  clickedImagePAN: string;
  pathPAN: string;
  copPAN: string;
  copAdhar: string;
  copAdharFront: string;
  incomeProof: any;
  btnDisabled: any = false;
  filePath: any
  copAdharFrontUpload: any
  copAdharBackUpload: any
  copPANUpload: any
  incomeProofUpload: any
  incomeProofList: master[];
  incomeProofData: any;
  environmentAPIList: any;
  documentList: any;
  breadCrumbPartner: string;

  loggedInModal: boolean = false
  ErrorMsg: string;
  apiCatalog:any={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/UploadPanAdhar",  
    "breadCrumbPartner":'Onboarding/OnboardingSteps/PartnerDocument',

    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  appEnviron: any;
  breadCrumb: string;



  constructor(private router:Router,private allConfigDataService: AllConfigDataService, private cd: ChangeDetectorRef, private http: HttpClient, private networkService: NetworkService, private camera: Camera, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private tstControl: ToastController, public file: File, public modalController: ModalController, private commonservice: CommonService, private toastService: ToastService) {
    this.panAdharDetails = new FormGroup({
      adharType: new FormControl()
    });

    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
    // this.getDocumentMasterDetails()
  }

  public ngOnInit(): void {
    
    this.imageList = this.allConfigDataService.getConfig('images');
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    this.appName = this.allConfigDataService.getConfig('appName');
    if (this.currentLanguage) {
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if (allErrorList) {
        this.errorList = allErrorList[this.currentLanguage];
      }
    }

    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })

    this.copPAN = this.imageList['panUserIcon']
    this.copAdhar = this.imageList['panUserIcon']
    this.copAdharFront = this.imageList['panUserIcon']
    this.incomeProof = this.imageList['panUserIcon']
    this.panAdharDetails = this.formBuilder.group({
      adharType: ['', [Validators.required]]
      // incomeProofDetails: ['', [Validators.required]]
    });
    // this.panAdharDetails.controls["incomeProofDetails"].setValidators([Validators.required])
    this.getIncomeProofMasterDetails('incomeProof', null);

    this.incomeProofData = {
      IncomeProofList: ""
    }
  }


  getIncomeProofMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }


    this.commonservice.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        // console.log('proof');
        this.incomeProofList = data.Data;
      }

    })
  }

  async WebCam(id) {
    let eventEmitter = new EventEmitter();
    eventEmitter.subscribe(res => {
      if (id == "pan") {
        this.copPAN = res;
        this.copPANUpload = this.b64toBlob(res, 'image/jpeg');
      }
      if (id == "adharFornt") {
        this.copAdharFront = res;
        this.copAdharFrontUpload = this.b64toBlob(res, 'image/jpeg');

      }
      if (id == "adharBack") {
        this.copAdhar = res;
        this.copAdharBackUpload = this.b64toBlob(res, 'image/jpeg');

      }
      if (id == "incomeProof") {
        this.incomeProof = res;
        this.incomeProofUpload = this.b64toBlob(res, 'image/jpeg');

      }//edited

    })
    const modal = await this.modalController.create({
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

  get() {
    return this.panAdharDetails.controls;
  }

  gotoBack() { }
  dismiss(e) { }

  imagePreview(e, status) {
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      if (status === 1) {
        if (this.panAdharDetails.value.adharType === 'frontSide') {
          this.copAdharFront = this.filePath
          this.copAdharFrontUpload = e.target.files[0]
        } else if (this.panAdharDetails.value.adharType === 'backSide') {
          this.copAdhar = this.filePath
          this.copAdharBackUpload = e.target.files[0]
        }
      } else if (status === 2) {
        this.incomeProof = this.filePath

        this.incomeProofUpload = e.target.files[0];
      }
      else {
        this.copPAN = this.filePath
        this.copPANUpload = e.target.files[0]
      }

      this.cd.detectChanges();
    }
    reader.readAsDataURL(file)
  }
  // CaptureImage() is working
  takePicturePAN() {

    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.FRONT,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      targetHeight: 500,
      targetWidth: 500,
    }

    if (this.isCordovaStatus) {
      this.camera.getPicture(options).then((imagePath) => {
        //base64ImageData = 'data:image/jpeg;base64,' + imagePath; 
        //this.  = base64ImageData;
        var sourceDirectory = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
        var sourceFileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length);
        this.file.createDir(this.file.externalDataDirectory, "HeyTorus", true);
        this.file.copyFile(sourceDirectory, sourceFileName, this.file.externalDataDirectory + "/HeyTorus", 'pan.jpg');
        this.file.readAsDataURL(this.file.externalDataDirectory + "/HeyTorus/", 'pan.jpg').then(async (data) => {
          //let sanitized = await this.sanitizer.bypassSecurityTrustUrl(data);               
          this.copPAN = data;

          this.copPANUpload = this.b64toBlob(this.copPAN, 'image/jpeg');


          this.pathPAN = this.file.externalDataDirectory;
          if (this.copPAN == '' && this.copPAN == this.imageList['panUserIcon']) {
            this.copPAN == this.imageList['closeRoundIcon'];
          }

          this.cd.detectChanges();
        }).catch((err) => {
          console.log("error: " + JSON.stringify(err));
        });
      }, function (err) {
        console.log(err);
      })
    } else {
      this.detectWebcam("pan")
    }
  }

  uploadPicturePAN() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      targetHeight: 400,
      targetWidth: 400
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = imageData;
      this.copPAN = base64Image;
      this.copPANUpload = this.b64toBlob(this.copPAN, 'image/jpeg');

      this.cd.detectChanges();
    }, (err) => {
      console.log(err);
    })
  }

  take() {
    if (this.panAdharDetails.value.adharType === 'frontSide') {
      this.takePictureAdhar('adharFornt.jpg')
    }
    else {
      this.takePictureAdhar('adharBack.jpg')
    }
  }

  select() {
    if (this.panAdharDetails.value.adharType === 'frontSide') {
      this.uploadPictureAdhar('frontSide')
    }
    else {
      this.uploadPictureAdhar('backSide')
    }
  }

  takePictureAdhar(url) {

    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      targetHeight: 400,
      targetWidth: 400
    }
    if (this.isCordovaStatus) {
      this.camera.getPicture(options).then((imagePath) => {
        var sourceDirectory = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
        var sourceFileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length);
        this.file.createDir(this.file.externalDataDirectory, "HeyTorus", true);
        this.file.copyFile(sourceDirectory, sourceFileName, this.file.externalDataDirectory + "/HeyTorus", url);
        this.file.readAsDataURL(this.file.externalDataDirectory + "/HeyTorus/", url).then(async (data) => {

          if (url === "adharFornt.jpg") {
            this.copAdharFront = data;
            this.copAdharFrontUpload = this.b64toBlob(this.copAdharFront, 'image/jpeg');
          } else {
            this.copAdhar = data;
            this.copAdharBackUpload = this.b64toBlob(this.copAdhar, 'image/jpeg');

          }

          this.cd.detectChanges();
        }).catch((err) => {
          console.log("error: " + JSON.stringify(err));
        });
      }, function (err) {
        console.log(err);
      })
    } else {
      if (url === "adharFornt.jpg") {
        this.detectWebcam("adharFornt")
      } else if (url === "adharBack.jpg") {
        this.detectWebcam("adharBack")
      }
    }
  }

  uploadPictureAdhar(side) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      targetHeight: 400,
      targetWidth: 400
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = imageData;
      if (side === 'frontSide') {
        this.copAdharFront = base64Image;
        this.copAdharFrontUpload = this.b64toBlob(this.copAdharFront, 'image/jpeg');

      } else {
        this.copAdhar = base64Image;
        this.copAdharBackUpload = this.b64toBlob(this.copAdhar, 'image/jpeg');

      }

      this.cd.detectChanges();
    }, (err) => {
      console.log(err);
    })
  }

  //edited
  takePictureIncome() {

    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.FRONT,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      targetHeight: 500,
      targetWidth: 500,
    }

    if (this.isCordovaStatus) {
      this.camera.getPicture(options).then((imagePath) => {
        //base64ImageData = 'data:image/jpeg;base64,' + imagePath; 
        //this.  = base64ImageData;
        var sourceDirectory = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
        var sourceFileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length);
        this.file.createDir(this.file.externalDataDirectory, "HeyTorus", true);
        this.file.copyFile(sourceDirectory, sourceFileName, this.file.externalDataDirectory + "/HeyTorus", 'income.jpg');
        this.file.readAsDataURL(this.file.externalDataDirectory + "/HeyTorus/", 'income.jpg').then(async (data) => {
          //let sanitized = await this.sanitizer.bypassSecurityTrustUrl(data);               
          this.incomeProof = data;//edited

          this.pathPAN = this.file.externalDataDirectory;
          if (this.incomeProof == '' && this.incomeProof == this.imageList['panUserIcon']) {
            this.incomeProof == this.imageList['closeRoundIcon'];
          }

          this.cd.detectChanges();
        }).catch((err) => {
          console.log("error: " + JSON.stringify(err));
        });
      }, function (err) {
        console.log(err);
      })
    } else {
      this.detectWebcam("incomeProof")
    }
  }


  ngAfterViewInit() {
    // debugger
    if(localStorage.getItem("userType") =="Partner"){
      this.breadCrumb = 'Onboarding/OnboardingSteps/PartnerUploadPanAdhar';
    }
   

  }
  //edited

  // uploadImageToServer(file1,file2,file3) {
  //   const formData = new FormData();
  //   // formData.append('image', this.imageList.arrow);
  //   // formData.append('document', this.imageList.arrow);
  //   formData.append('CustGuId', 'ADVBH65433CVGHNM887')
  //   formData.append('panImage', file1);
  //   formData.append('AadharFrontImage', file2);
  //   formData.append('AadharBackImage', file3);
  //   this.commonservice.uploadPanAadhar(formData).subscribe(res=>{
  //     if(res){
  //       console.log(res);
  //     }
  //   })
  // }

   onSubmitPanAdhar() {
    if ((this.copAdhar !== '' && this.copAdhar !== this.imageList['panUserIcon']) && (this.copPAN !== '' && this.copPAN !== this.imageList['panUserIcon'] && (this.copAdharFront !== '' && this.copAdharFront !== this.imageList['panUserIcon'])) && this.incomeProof != '') {
      this.pathPAN = '';

      // this.loaderService.showLoader()
    
      this.uploadImageToServer(this.copAdharFrontUpload, this.copAdharBackUpload, this.incomeProofUpload, this.copPANUpload);

      this.file.removeFile(this.file.externalDataDirectory + "/HeyTorus", 'adhar.jpg');
      this.file.removeFile(this.file.externalDataDirectory + "/HeyTorus", 'pan.jpg');
      // alert('picture uploaded')
      
    }
    else {
      // alert('upload picture first')
      this.loggedInModal = true;
      this.ErrorMsg = "Please upload image's"
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);
      return false;
    }
  }
  successModalClose() {
    this.loggedInModal = false
  }
  getDocumentMasterDetails() {
    let params = {
      "Type": "Document"
    }
    this.commonservice.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.documentList = data.Data;
        // console.log(this.documentList);
      }
    })

  }

  getCurrentDocumentGuId(type) {
    return this.documentList ? this.documentList.filter(x => x?.TEXT == type) : []
  }

  uploadImageToServer(file1, file2, file3, file4) {
    // let panID = this.getCurrentDocumentGuId("PAN")
    // let aadharFrontImageID = this.getCurrentDocumentGuId("AadharFrontImage")
    // let aadharBackImageID = this.getCurrentDocumentGuId("AadharBackImage")
    // // console.log("docID", panID[0].ID)

    // const formData = new FormData();
    // formData.append('AadharBackDocumentGuID', aadharBackImageID[0].ID);
    // formData.append('AadharFrontImage', file1);
    // formData.append('AadharForntDocumentGuId', aadharFrontImageID[0].ID);
    // formData.append('AadharBackImage', file2);
    // formData.append('CustGuId', this.loginCustomerGuId);
    // // formData.append('IncomeProofGuID', "27758830-71A5-4AFC-B138-5153E9B1474F");
    // // formData.append('IncomeProofImage', file3);
    // formData.append('PanDocumentGuId', panID[0].ID);
    // formData.append('PanImage', file4);

    // let headers: HttpHeaders = new HttpHeaders({
    //   "Token": this.environmentAPIList?.token,
    // });
    let url
    if(localStorage.getItem("userType") =="Partner"){
      url=this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumbPartner+this.apiCatalog.PartnerUploadAadharPan
    }
    else if(localStorage.getItem("userType") =="Customer"){
   url=this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.uploadAadharPan
    }
    this.http.post(url, {})
    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.UploadPanAadharMaasking, formData, { headers })
    // this.http.get('assets/data/getNextSteps.json')
    .subscribe(
      // this.http.post("https://uat.aqube.rsec.co.in/api/v1/Post/Onboarding/Upload/AadharPan", formData, { headers }).subscribe(
      (data: any) => {
        // console.log("Signature details", data)
        this.loaderService.hideLoader();
        if (data) {
          // this.processSignPostData();
          // this.getSignatureStatus.emit("signature")
          // this.getUploadPanAadharStatus.emit("signature")
        this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
        // this.http.get('assets/data/getNextSteps.json')
        // // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'Onboarding'+this.apiCatalog.getNextStep, "reqParams")
        //   .subscribe((data: any) => {
        //     if (data) {
        //       // this.getNextStep.emit(data?.msg)
        //       this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
        //     } else { 
        //       this.errorShow(data?.Message, "dummyPanPOST -> Http request");
        //     }
        //   })
        } else {
          this.errorShow(data?.Message, "getEsign -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "getEsign -> Http request");
      })
  }
  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
  }

  b64toBlob(b64Data: string, contentType: string) {
    contentType = contentType || '';
    var sliceSize = 512;
    var byteCharacters = atob(b64Data.split(',')[1]);
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

  detectWebcam(type) {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) {
      return this.callback(false, type);
    }
    md.enumerateDevices().then(devices => {
      this.callback(devices.some(device => 'videoinput' === device.kind), type);
    })
  }

  callback(hasWebcam, type) {
    if (type == 'pan') hasWebcam ? this.WebCam("pan") : this.toastService.showAutoToast(this.errorList?.webCamError);
    if (type == 'adharFornt') hasWebcam ? this.WebCam("adharFornt") : this.toastService.showAutoToast(this.errorList?.webCamError);
    if (type == 'adharBack') hasWebcam ? this.WebCam("adharBack") : this.toastService.showAutoToast(this.errorList?.webCamError);
    if (type == 'incomeProof') hasWebcam ? this.WebCam("incomeProof") : this.toastService.showAutoToast(this.errorList?.webCamError)
  }


}