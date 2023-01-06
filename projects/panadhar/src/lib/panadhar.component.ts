import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

// import { File } from '@ionic-native/file/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { take } from 'rxjs/operators';


@Component({
  selector: 'lib-panadhar',
  templateUrl: './panadhar.component.html',
  styleUrls: ['./panadhar.component.scss'],
})
export class PanadharComponent implements OnInit {
  imageList: any;
  panAdharDetails: FormGroup;
  clickedImagePAN: string;
  pathPAN: string;
  copPAN: string;
  copAdhar: string;
  copAdharFront:string;
  btnDisabled: any = false;
  

  constructor(private allconfigDataServices: AllConfigDataService,
    private camera: Camera, private sanitizer: DomSanitizer, 
    private formBuilder: FormBuilder, private tstControl: ToastController, public file: File
  ) {
    this.panAdharDetails = new FormGroup({
      adharType: new FormControl()
    });
  }

  ngOnInit() {
   
    this.imageList = this.allconfigDataServices.getConfig('images');
    
    this.copPAN = this.imageList['panUserIcon']
    this.copAdhar = this.imageList['panUserIcon']
    this.copAdharFront = this.imageList['panUserIcon']
    // assets/icon/panUserIcon.svg
    this.panAdharDetails = this.formBuilder.group({
      adharType: ['', [Validators.required]]
    });
  }
  get() {
    return this.panAdharDetails.controls;
  }

  //CaptureImage() is working
  takePicturePAN() {
    
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,  
      cameraDirection:this.camera.Direction.FRONT,
      correctOrientation:true,
      saveToPhotoAlbum: false,
      targetHeight: 500,
      targetWidth: 500,     
    }
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
        
        this.pathPAN = this.file.externalDataDirectory;
        if(this.copPAN == '' && this.copPAN ==  this.imageList['panUserIcon']){
          this.copPAN == this.imageList['closeRoundIcon'];
        }
        
      }).catch((err) => {
        console.log("error: " + JSON.stringify(err));
      });
    }, function (err) {
      console.log(err);
    })
   
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
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.copPAN = base64Image;
    }, (err) => {
      console.log(err);
    })
  }


  take(){      
    if(this.panAdharDetails.value.adharType ==='frontSide'){
      this.takePictureAdhar('adharFornt.jpg')      
    }
    else{
      this.takePictureAdhar('adharBack.jpg')
    }
  }

  select(){
    if(this.panAdharDetails.value.adharType ==='frontSide'){
      this.uploadPictureAdhar('frontSide')      
    }
    else{
      this.uploadPictureAdhar('backSide')
    }
  }



  takePictureAdhar(url) {      
      let options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        sourceType: this.camera.PictureSourceType.CAMERA,
        encodingType: this.camera.EncodingType.JPEG,
        saveToPhotoAlbum: false,
        targetHeight: 400,
        targetWidth: 400
      }
      this.camera.getPicture(options).then((imagePath) => {     
        var sourceDirectory = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
        var sourceFileName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.length);
        this.file.createDir(this.file.externalDataDirectory, "HeyTorus", true);
        this.file.copyFile(sourceDirectory, sourceFileName, this.file.externalDataDirectory + "/HeyTorus", url);
        this.file.readAsDataURL(this.file.externalDataDirectory + "/HeyTorus/", url).then(async (data) => {                  
          if(url === "adharFornt.jpg"){
          this.copAdharFront = data;               
          }else{
            this.copAdhar = data;
          }

        }).catch((err) => {
          console.log("error: " + JSON.stringify(err));
        });
      }, function (err) {
        console.log(err);
      })
    
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
      let base64Image = 'data:image/jpeg;base64,' + imageData;     
      if(side === 'frontSide'){
        this.copAdharFront = base64Image;               
        }else{
          this.copAdhar = base64Image;
        }


    }, (err) => {
      console.log(err);
    })
    
  }

  

  onSubmitPanAdhar() {    
   if((this.copAdhar != '' && this.copAdhar != this.imageList['panUserIcon']) && (this.copPAN != '' && this.copPAN != this.imageList['panUserIcon'])){
    let storeAdharPath = this.copAdhar;
    let storePANPath = this.copPAN; 
    this.copAdhar = this.imageList['panUserIcon'];
    this.copPAN = this.imageList['panUserIcon']; 
    this.pathPAN ='';  
    this.file.removeFile(this.file.externalDataDirectory + "/HeyTorus", 'adhar.jpg');
    this.file.removeFile(this.file.externalDataDirectory + "/HeyTorus", 'pan.jpg');
    alert('picture uploaded')      
    }
    else{      
      alert('upload picture first')
    }
    
  }

































  async showToast(msg) {
    await this.tstControl.create({
      message: msg,
      duration: 4000,
      position: 'middle',
      buttons: [{
        text: 'Ok',
        handler: () => {
          // console.log("ok clicked");
        }
      }]
    }).then(res => res.present());
  }












}




