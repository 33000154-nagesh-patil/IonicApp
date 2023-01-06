import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'index';
import { NetworkService } from 'index';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { WebCamComponent } from 'projects/core/src/lib/components/web-cam/web-cam.component'; 

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss'],
})
export class PreviewImageComponent implements OnInit {
  @Input() currentLanguage: any;
  @Input() caputuredImage: any;
  @Input() visibility:boolean;
  @Output() caputuredImageStatus = new EventEmitter();
  isCordovaStatus: any;
  currentImg: string;
  selfieImage: any;
  incomeProof: any;
  @ViewChild('userInput') userInputViewChild: ElementRef;
  userInputElement: HTMLInputElement;

  constructor(private allConfigDataService:AllConfigDataService,private actionSheetController: ActionSheetController,
    private networkService: NetworkService, private camera:Camera, private cdn: ChangeDetectorRef,public modalController: ModalController) { }

    ngAfterViewInit() {
      this.userInputElement = this.userInputViewChild.nativeElement;
    };
    
  ngOnInit() {
    // this.imageList = this.allConfigDataService.getConfig('images');
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
  }

  looksGood() {
    this.caputuredImageStatus.emit(this.caputuredImage)
    this.visibility = false;
    // this.checkNetworkConnectionPAN();
  }

  tryAgain() {
    this.onTakePicture();
  }

  async onTakePicture() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [
      {
        text: 'load from library',
        handler: () => {
          if(this.isCordovaStatus){
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          }else{
            this.userInputElement.click();
          }
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          if(this.isCordovaStatus){
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          }else{
            this.WebCam('incomeProof');
          }
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      // console.log("imageData", imageData)
      // imageData is either a base64 encoded string or a file URI
      this.currentImg = 'data:image/jpeg;base64,' + imageData;
      let realData = this.currentImg.split(",")[1];
      this.selfieImage = this.b64toBlob(realData, 'image/jpeg');
      this.cdn.detectChanges();

    }, (err) => {
      // console.log("err", err)
      // Handle error
    });
  }
  async WebCam(id) {
    let eventEmitter = new EventEmitter();
    eventEmitter.subscribe(res=>{
      // console.log(res);
      
      this.incomeProof=res;
      this.caputuredImage = res//edited
    })
        const modal = await this.modalController.create({
          component: WebCamComponent,
          cssClass: 'h-100 w-100 modal-fullscreen',
          componentProps: {
            'webImage':eventEmitter
          },
          backdropDismiss: false
        });
        modal.onDidDismiss()
          .then((data) => {
            // this.router.navigate(['']);
            // this.visibility = true;
          });
        return await modal.present();
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

    imagePreview(e) {
      // console.log(e);
      
      const file = this.userInputElement.files[0];
      // console.log(e.target.files);
      const reader = new FileReader();
      reader.onload = () => {
        let filePath = reader.result as string;
        this.caputuredImage= filePath;
        // this.incomeProofUpload=e.target.files;
        this.visibility=!this.visibility;
      }
      reader.readAsDataURL(file)
    }

}
