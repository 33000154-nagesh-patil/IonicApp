import { ChangeDetectorRef, Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import { ThankyouComponent } from '../thankyou/thankyou.component';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { WebCamComponent } from 'projects/core/src/lib/components/web-cam/web-cam.component';
import { NetworkService } from 'projects/core/src/lib/services/network.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { EsignComponent } from 'projects/core/src/lib/components/esign/esign.component';


@Component({
  selector: 'app-address-and-bank-proof',
  templateUrl: './address-and-bank-proof.component.html',
  styleUrls: ['./address-and-bank-proof.component.scss'],
})
export class AddressAndBankProofComponent implements OnInit {
  copAddress: string;
  copBankStatment:string;
  copAddressUpload:any;
  copBankStatementUpload:any;
  @Input() imageList: any;
  @Output() getUploadPanAadharStatus = new EventEmitter();
  @Input() errorList: any;
  isCordovaStatus: any;
  filePath: any
  currentNativeNetwork: any;
  currentWindowNetwork: any;
  // pathPAN: string;
  pathaddress: string;
  currentLanguage: any;

  appName: any;
  panAdharDetails: any;
  copAdharFront: any;
  copAdharFrontUpload: any;
  copAdhar: any;
  copAdharBackUpload: any;
  incomeProof: any;
  incomeProofUpload: any;
  addressAndBankForm:FormGroup
  constructor(private allConfigDataService: AllConfigDataService,private modalCtrl:ModalController, private commonFunctionService: CommonFunctionService,private loaderService: LoaderService,private toastService: ToastService,private cd: ChangeDetectorRef,private networkService: NetworkService, public file: File,public modalController: ModalController,private camera: Camera) { }

  public ngOnInit(): void {
  this.imageList = this.allConfigDataService.getConfig("images");

  this.addressAndBankForm = new FormGroup({
    address: new FormControl(''),
    bank:new FormControl(''),
   



  });

  
  // })
  this.addressAndBankForm.controls["address"].setValidators([Validators.required])
  this.addressAndBankForm.controls["bank"].setValidators([Validators.required])
  


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

    
    this.copAddress = this.imageList['panUserIcon']
    this.copBankStatment = this.imageList['panUserIcon']

  }

  async WebCam(id) {

    let eventEmitter = new EventEmitter();
    eventEmitter.subscribe(res => {
      if (id == "address") {
        console.log("ducati");
        this.copAddress = res;
        this.copAddressUpload = this.b64toBlob(res, 'image/jpeg');
      }  if (id == "bankstatement") {
        this.copBankStatment = res;
        this.copBankStatementUpload = this.b64toBlob(res, 'image/jpeg');
      }

      })
     
      //edited

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

    dismiss(e){ }

    imagePreview(e, status) {
        
        const file = (e.target as HTMLInputElement).files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.filePath = reader.result as string;
          if (status ===1 ) {
            console.log("Neeraj Sir");
            this.copBankStatment = this.filePath
            this.copBankStatementUpload = e.target.files[0]
          } 
          else{
            console.log('hi');
            this.copAddress = this.filePath
            this.copAddressUpload = e.target.files[0]
          }
   
          this.cd.detectChanges();
        }
        reader.readAsDataURL(file)
      }

      takePictureAddress() {
       

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
              this.copAddress = data;
   
              this.copAddressUpload = this.b64toBlob(this.copAddress, 'image/jpeg');
   
   
              this.pathaddress = this.file.externalDataDirectory;
              if (this.copAddress == '' && this.copAddress == this.imageList['panUserIcon']) {
                this.copAddress == this.imageList['closeRoundIcon'];
              }
   
              this.cd.detectChanges();
            }).catch((err) => {
              console.log("error: " + JSON.stringify(err));
            });
          }, function (err) {
            console.log(err);
          })
        } else {
          this.detectWebcam("address")
        }
      }

      uploadPictureAddress() {
      //  alert("lauda")s
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
          this.copAddress = base64Image;
          this.copAddressUpload = this.b64toBlob(this.copAddress, 'image/jpeg');
   
          this.cd.detectChanges();
        }, (err) => {
          console.log(err);
        })
        console.log(this.copAddressUpload)
      }


      takePictureBankStatement() {
       

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
              this.copBankStatment = data;
   
              this.copBankStatementUpload = this.b64toBlob(this.copBankStatment, 'image/jpeg');
   
   
              this.pathaddress = this.file.externalDataDirectory;
              if (this.copBankStatment == '' && this.copBankStatment == this.imageList['panUserIcon']) {
                this.copBankStatment == this.imageList['closeRoundIcon'];
              }
   
              this.cd.detectChanges();
            }).catch((err) => {
              console.log("error: " + JSON.stringify(err));
            });
          }, function (err) {
            console.log(err);
          })
        } else {
          this.detectWebcam("bankstatement")
      }  
      }

      uploadPictureBankStatement() {
       alert("hey")
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
          this.copBankStatment = base64Image;
          this.copBankStatementUpload = this.b64toBlob(this.copBankStatment, 'image/jpeg');
   
          this.cd.detectChanges();
        }, (err) => {
          console.log(err);
        })
        console.log(this.copBankStatementUpload)
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
        if (type == 'address') hasWebcam ? this.WebCam("address") : this.toastService.showAutoToast(this.errorList?.webCamError);
        if (type == 'bankstatement') hasWebcam ? this.WebCam("bankstatement") : this.toastService.showAutoToast(this.errorList?.webCamError)
      }


      async navTothankyou(){
        const modal = await this.modalCtrl.create({
          component: EsignComponent,
          componentProps: {
            'imageList': this.imageList,
          },
          backdropDismiss: false
        })
        modal.onDidDismiss().then((data) => {
          console.log(data)
        })
        return await modal.present()
      }

}
