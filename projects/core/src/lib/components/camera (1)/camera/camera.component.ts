import { Component, OnInit } from '@angular/core';
import { Camera,CameraOptions } from '@ionic-native/Camera/ngx';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  currentImgCamera:string;
  currentImgLibrary:string;
  constructor(private camera: Camera) { }

  ngOnInit() {

  }
  openSaved(){}
  openCamera() {

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log("imageData", imageData)
      // imageData is either a base64 encoded string or a file URI

      this.currentImgCamera = 'data:image/jpeg;base64,' + imageData;
      alert(this.currentImgCamera);
    },
      (err) => {
        console.log("err", err)
      });

  }

  openGallery(){


    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log("imageData", imageData)
      // imageData is either a base64 encoded string or a file URI

      this.currentImgLibrary = 'data:image/jpeg;base64,' + imageData;
      console.log(this.currentImgLibrary);
    },
      (err) => {
        console.log("err", err)
      });
  }




}
