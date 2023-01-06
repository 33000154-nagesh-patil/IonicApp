import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { WebCamComponent } from 'projects/core/src/lib/components/web-cam/web-cam.component';
import { HttpClient } from '@angular/common/http';

import { NetworkService } from 'index';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { AllConfigDataService } from 'index';
import { CommonFunctionService } from 'index';
import { master } from 'index';
import { ToastService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';
import { retry } from 'rxjs/operators';

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
  copEducation: string;
  copEducationUpload: string;
  copAdhar: string;
  copAdharFront: string;
  incomeProof: any;
  bankProof: any;
  educationProof:any = false;
  btnDisabled: any = false;
  filePath: any
  copAdharFrontUpload: any
  copAdharBackUpload: any
  copPANUpload: any
  incomeProofUpload: any
  educationProofUpload: any;
  incomeProofList: master[];
  incomeProofData: any;
  environmentAPIList: any;
  documentList: any;
  productLanding: any;

  loggedInModal: boolean = false
  ErrorMsg: string;
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "Onboarding/OnboardingSteps/Document",
    "environment": this.allConfigDataService.getConfig('environmentType'),
  }
  appEnviron: any;
  breadCrumb: string;
  partnerFlow: any=localStorage.getItem("userType");
  showPAN
  showAadhar
  showIncome
  showEducation
  showBank


  constructor(private router: Router, private allConfigDataService: AllConfigDataService, 
    private cd: ChangeDetectorRef, private http: HttpClient, private networkService: NetworkService, 
    private camera: Camera, private loaderService: LoaderService, private commonFunctionService: CommonFunctionService, 
    private sanitizer: DomSanitizer, private formBuilder: FormBuilder, private tstControl: ToastController, 
    public file: File, public modalController: ModalController, private commonservice: CommonService, 
    private toastService: ToastService, private eduService: eduService,
    private onboardingService:OnboardingService
    ) {
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
    this.bankProof = this.imageList['panUserIcon']
    if(this.partnerFlow==='Partner'){
      // this.educationProof = this.imageList['panUserIcon']  //why educationProof is boolean here
    }
    this.panAdharDetails = this.formBuilder.group({
      adharType: [''],
      incomeProofDetails: ['']
    });
    this.showAadhar?this.panAdharDetails.controls["adharType"].setValidators([Validators.required]):this.panAdharDetails.controls["adharType"].setValidators(null)
    this.showIncome?this.panAdharDetails.controls["adharType"].setValidators([Validators.required]):this.panAdharDetails.controls["adharType"].setValidators(null)

    this.incomeProofData = {
      IncomeProofList: ""
    }

    this.eduService.categoryValueForAPI.subscribe(val => {
      this.productLanding = val['productLanding']
    })

    this.getIncomeProofMasterDetails('IncomeProof',"");
    this.getIncomeProofMasterDetails('educationProof',null);
    this.getUploadDocumentStatus();
  }

  getUploadDocumentStatus(){
    let param= {
      "TokenId": localStorage.getItem('id_token')
    }
    this.loaderService.showLoader()
    this.http.post(
      this.apiCatalog.baseURL[this.apiCatalog.environment] +
      this.apiCatalog.breadCrumb +
      this.apiCatalog.getUploadDocumentStatus,
      param)
      .pipe(retry(3))
      .subscribe((data:any)=>{
        this.loaderService.hideLoader();
        if(data){
          this.showPAN = data.ShowPan;
        this.showIncome = data.ShowIncomeProof
        this.showAadhar = data.ShowAdhar
        this.showBank = data.ShowBank
        }
        if(this.showPAN!=true&& this.showIncome!=true && this.showAadhar!=true && this.showBank!=true)this.onboardingService.nextOnSuccess('PanAadharUpload')
        // this.showPAN = false;
        // this.showIncome = false
        // this.showAadhar = false
      })
  }


  getIncomeProofMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "PINCODE": selectedGuId
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'/Onboarding/OnboardingSteps/CustomerRegistration/getDetail?IncomeProof',params)
    .pipe(retry(3))
    .subscribe(async (data: any) => {
      if (data && data?.Status) {
        this.incomeProofList = data.data;
        // console.log(this.incomeProofList);

      }

    })
  }

  incomeDoc(e) {
    if(e!=='' || e !== undefined){
      // this.incomeDocVal = true;
    }else{
      alert('else')
    }
    
  }

  async WebCam(id) {
    let eventEmitter = new EventEmitter();
    eventEmitter.subscribe(res => {
      if (id == "pan") {
        this.copPAN = res;
        // this.copPANUpload = this.b64toBlob(res, 'image/jpeg');
        this.copPANUpload = res;
      }
      if (id == "adharFornt") {
        this.copAdharFront = res;
        // this.copAdharFrontUpload = this.b64toBlob(res, 'image/jpeg');
        this.copAdharFrontUpload = res;

      }
      if (id == "adharBack") {
        this.copAdhar = res;
        // this.copAdharBackUpload = this.b64toBlob(res, 'image/jpeg');
        this.copAdharBackUpload = res;

      }
      if (id == "incomeProof") {
        this.incomeProof = res;
        // this.incomeProofUpload = this.b64toBlob(res, 'image/jpeg');
        this.incomeProofUpload = res;

      }//edited
      if(id == "educationProof"){
        // this.educationProof = res;//educationProof is boolean value
        this.educationProofUpload = res
      }
      if(id==='BankProof'){
        this.bankProof = res;
      }

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
        // this.educationProof = this.filePath;

        this.incomeProofUpload = e.target.files[0];
        // debugger;
      } else if(status===3){
        this.bankProof = this.filePath
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
  takePicturePAN(id) {

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
          if(id==='BankProof'){
            this.bankProof = data;
          }else{
            this.copPAN = data;
            // this.copPANUpload = this.b64toBlob(this.copPAN, 'image/jpeg');
          this.copPANUpload = this.copPAN
          }              

          


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
      this.detectWebcam(id==='BankProof'?'BankProof':'pan')
    }
  }

  uploadPicturePAN(id) {
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
      let base65Image = imageData;
      if(id==='BankProof'){
       this.bankProof = base65Image
      }else{
        this.copPAN = base65Image;
        // this.copPANUpload = this.b64toBlob(this.copPAN, 'image/jpeg');
        this.copPANUpload = this.copPAN;
      }

      this.cd.detectChanges();
    }, (err) => {
      console.log(err);
    })
  }

  uploadPictureEducation() {
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
      let base65Image = imageData;
      this.copEducation = base65Image;
      // this.copPANUpload = this.b64toBlob(this.copPAN, 'image/jpeg');
      this.copEducationUpload = this.copEducation;

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
            // this.copAdharFrontUpload = this.b64toBlob(this.copAdharFront, 'image/jpeg');
            this.copAdharFrontUpload = this.copAdharFront;
          } else {
            this.copAdhar = data;
            // this.copAdharBackUpload = this.b64toBlob(this.copAdhar, 'image/jpeg');
            this.copAdharBackUpload = this.copAdhar;

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
        // this.copAdharFrontUpload = this.b64toBlob(this.copAdharFront, 'image/jpeg');
        this.copAdharFrontUpload = this.copAdharFront;

      } else {
        this.copAdhar = base64Image;
        // this.copAdharBackUpload = this.b64toBlob(this.copAdhar, 'image/jpeg');
        this.copAdharBackUpload = this.copAdhar;

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

  loggedInShowError(error){
    this.loggedInModal = true;
    this.ErrorMsg = error
    setTimeout(() => {
      this.loggedInModal = false;
    }, 3000);
    return false;
  }


  onSubmitPanAdhar() {

    if(this.partnerFlow=="Partner" ){
      this.router.navigate(['/Onboarding/segmentFeeCalculation'])
    } else{
        let param = {
          "TokenId": localStorage.getItem('id_token'),
          "Image":[]
        };
        if(this.showPAN){
          if(this.copPAN!='' && this.copPAN!= this.imageList.panUserIcon){
              let obj={
                "image": this.copPAN,
                "DocType":"PanImage"
            }
            param['Image'].push(obj);
          }
          else{
            this.loggedInShowError("Please upload image's");
            return;
          }
        }

        if(this.showAadhar){
          if(this.copAdhar!=''&&this.copAdharFront!=''
              &&this.copAdhar!=this.imageList.panUserIcon
              &&this.copAdharFront!=this.imageList.panUserIcon){
                      param['Image'].push({
                        "image": this.copAdharFront,
                        "DocType":"AdharFront"
                      });
                      param['Image'].push({
                        "image": this.copAdhar,
                        "DocType":"AdharBack"
                      });
              }
              else{
                this.loggedInShowError("Please upload image's");
                return;
              }
        }

        if(this.showIncome){
          if(this.incomeProof!=''&&this.incomeProof!=this.imageList.panUserIcon){
            let obj={
                    "image": this.incomeProof,
                    "DocType":"IncomeProof"
                }
                param['Image'].push(obj);
          }
          else{
            this.loggedInShowError("Please upload image's");
            return;
          }
        }

        if(this.showBank){
          if(this.bankProof!=''&&this.bankProof!=this.imageList.panUserIcon){
            let obj={
                    "image": this.bankProof,
                    "DocType":"BankProof"
                }
                param['Image'].push(obj);
          }
          else{
            this.loggedInShowError("Please upload image's");
            return;
          }
        }
          this.pathPAN = '';
          // this.processBankPostData(postBankData);
          this.uploadImageToServer(param);
    }
      this.file.removeFile(this.file.externalDataDirectory + "/HeyTorus", 'adhar.jpg');
      this.file.removeFile(this.file.externalDataDirectory + "/HeyTorus", 'pan.jpg');
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

  uploadImageToServer(param) {

      this.http.post(
        this.apiCatalog.baseURL[this.apiCatalog.environment] +
        this.apiCatalog.breadCrumb +
        this.apiCatalog.submitDetails, param)
        .subscribe(
          (data: any) => {
            this.loaderService.hideLoader();
            if (data) {
              this.onboardingService.nextOnSuccess('PanAadharUpload');
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
    if (type == 'educationProof') hasWebcam ? this.WebCam("educationProof") : this.toastService.showAutoToast(this.errorList?.webCamError)
    if (type == 'BankProof') hasWebcam ? this.WebCam("BankProof") : this.toastService.showAutoToast(this.errorList?.webCamError)
  }

  skip(val){
    this.onboardingService.skip(val);
  }


}