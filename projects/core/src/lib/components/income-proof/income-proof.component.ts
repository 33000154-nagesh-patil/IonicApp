import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { AllConfigDataService } from '../../services/all-config-data.service';
import { NetworkService } from '../../services/network.service';
import { WebCamComponent } from '../web-cam/web-cam.component';
import { master } from '../../interfaces/common.interface';
import { CommonService } from '../../services/common.service';
import { LoaderService } from '../../services/loader.service';
import { CommonFunctionService } from '../../services/common-function.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-income-proof',
  templateUrl: './income-proof.component.html',
  styleUrls: ['./income-proof.component.scss'],
})
export class IncomeProofComponent implements OnInit {
  imageList: any;
  errorList: any;
  currentModuleType: any;
  incomeProofKYC: any;
  loginCustomerGuId: any;
  @Output() getIncomeProofStatus = new EventEmitter();
  public incomeProofForm: FormGroup;
  currentImg: string;
  selfieImage: any;
  isCordovaStatus: any;
  incomeProof: string;
  visibility: boolean;
  incomeProoftest: any;
  filePath: string;
  incomeProofList: master[];
  incomeProofData: any;
  incomeProofUpload: any;
  @ViewChild('userInput') userInputViewChild: ElementRef;
  userInputElement: HTMLInputElement;
  environmentAPIList: any;
  params: object;
  appName: any;
  incomeDocVal:boolean = false;
  constructor(private allConfigDataService: AllConfigDataService, private actionSheetController: ActionSheetController, 
    private loaderService: LoaderService, private commonFunctionService: CommonFunctionService,
    private camera: Camera, private cdn: ChangeDetectorRef, public modalController: ModalController, 
    private networkService: NetworkService, private commonService: CommonService, private http: HttpClient, private router:Router) {
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
  }
  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  };

  apiCatalog:any={

    ...this.allConfigDataService.getConfig('apiCatalog'),

    "breadCrumb": "Onboarding/OnboardingSteps/IncomeProof",

    "environment": this.allConfigDataService.getConfig('environmentType'),

  }

  ngOnInit() {
    
    this.appName = this.allConfigDataService.getConfig('appName');
    this.imageList = this.allConfigDataService.getConfig('images');
    this.getIncomeProofMasterDetails('incomeProof', null);
    this.incomeProofForm = new FormGroup({
      incomeProofDetails: new FormControl(),
    });

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })

    this.incomeProofForm.controls["incomeProofDetails"].setValidators([Validators.required])

    this.incomeProofData = {
      IncomeProofList: ""
    }

    // console.log("-----------------------------", this.incomeProofForm.valid);
    // console.log("incomeProofForm", this.incomeProofData.IncomeProofList.value);
  }





  gotoBack() { }
  dismiss(e) { }
  continue() {
    let realData = this.incomeProoftest.split(",")[1];
    // this.incomeProoftest = 
    // console.log("asdfghj", realData);
    // console.log()
    this.params = {
      'IncomeProofImage': this.b64toBlob(realData, 'image/jpeg'),
      // 'IncomeProofGuId': this.incomeProofKYC.DocumentGuId,
      'IncomeGuId': this.incomeProofForm.value.incomeProofDetails,
      'CustGuId': this.loginCustomerGuId
    }
    this.insertProofDetails(this.params)
  }

  incomeDoc(e) {
    if(e!=='' || e !== undefined){
      this.incomeDocVal = true;
    }else{
      alert('else')
    }
    
  }

  looksGood(e) {
    if (e) {
      this.visibility = false;
      this.incomeProoftest = e;

    }
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          if (this.isCordovaStatus) {
            this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          } else {
            this.userInputElement.click();
          }
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          if (this.isCordovaStatus) {
            this.pickImage(this.camera.PictureSourceType.CAMERA);
          } else {
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
    eventEmitter.subscribe(res => {
      this.incomeProof = res;//edited
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
        // this.router.navigate(['']);
        this.visibility = true;
      });
    return await modal.present();
  }

  imagePreview(e) {
    // console.log(e);

    const file = this.userInputElement.files[0];
    // console.log(e.target.files);
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      this.incomeProof = this.filePath
      // this.incomeProofUpload=e.target.files;
      this.visibility = !this.visibility;
    }
    reader.readAsDataURL(file)
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

  getIncomeProofMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.commonService.getMasterDetails(params).subscribe(async (data: any) => {
      if (data && data?.Status) {
        this.incomeProofList = data.Data;
        // console.log(this.incomeProofList);

      }

    })
  }


  insertProofDetails(obj) {
    this.loaderService.showLoader();


    let realData = this.incomeProoftest.split(",")[1];

    obj.IncomeProofImage = this.b64toBlob(realData, 'image/jpeg');
    const formData = new FormData();


    formData.append('IncomeProofGuId', obj.IncomeProofGuId);
    formData.append('IncomeProofImage', obj.IncomeProofImage);
    formData.append('IncomeGuId', obj.IncomeGuId);
    formData.append('CustGuId', obj.CustGuId);

    let headers: HttpHeaders = new HttpHeaders({
      "Token": this.environmentAPIList?.token,
    });

    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.incomeProofDocumentUpload, {})
    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.incomeProofDocumentUpload, formData, { headers })
    .subscribe(
      (data: any) => {
        // console.log("Income details", data)
        // this.loaderService.hideLoader();
        if (data && data?.Status == 1) {

          // this.insertDocVerify(obj)
        this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);

        } else {
          this.errorShow(data?.Message, "setIncomeDetails -> status");
        }
      }, (error: any) => {
        this.errorShow(error?.Message, "setIncomeDetails -> Http request");
      })
  }
  insertDocVerify(obj) {
    let localPostData = {
      "CustGuId": this.loginCustomerGuId,
      "DocumentGuId": this.incomeProofKYC?.DocumentGuId,
      "OfferingGuId": this.currentModuleType?.OfferingGuId
    }
    // this.loaderService.showLoader();
    // this.commonService.postPanDetails(localPostData)
    // this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.insertDocVerify, obj)
    // this.http.get('assets/data/getNextSteps.json')
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.incomeProofDocumentUpload, {})
    
    .subscribe((data: any) => {
      this.loaderService.hideLoader();
      if (data && data?.StatusCode) {
        // this.getIncomeProofStatus.emit("IncomeProofStatus");
        this.router.navigate(['/Onboarding'+data['URLtoRedirect']]);
      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })
  }


  errorShow(message, functionName) {
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, "Nominee Page" + functionName, message, this.errorList?.okText)
  }

}

