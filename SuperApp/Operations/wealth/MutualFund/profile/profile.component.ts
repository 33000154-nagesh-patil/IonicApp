import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { MatTabsModule } from '@angular/material/tabs';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { KycStepsMFComponent } from 'projects/product-details/components/kyc-steps-mf/kyc-steps-mf.component';
import { Router } from '@angular/router';
import { ContainerViewPage } from 'src/app/features/container-view/container-view.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  mfFooterData: any;
  imageList: any;
  currentMode:any=1;
  strFirstName: any;
  profileName: any;
  isValid: any;
  currentType: boolean;
  currentInputPan: any;
  currentInputEncoded: any;
  currentImg: any;
  showPatternError:any=false;
  showRequiredError:any = false;
  currentLanguage: any;
  errorList: any;
  customerPanName: any;
  localCustGuId: any;
  panUserName: any;
  KycComplete:any
  InvestComplete:any
  ErrorMsg: string;
  loggedInModal: boolean;
  filePath: string;
  cd: any;
  isKra: any;
  listOfKYC: any;
  stepOne: any;
  @Output() getPanNumber = new EventEmitter();

  constructor(private mfservice:MFServiceService,private ContainerViewPage:ContainerViewPage,private loaderService:LoaderService,private allConfigDataService:AllConfigDataService,private modalCtrl:ModalController, private actionSheetController: ActionSheetController, private camera: Camera, private commonFunctionService: CommonFunctionService, private commonService:CommonService,private router:Router) { }

  ngOnInit() {

   
    if(localStorage.getItem('mfInvest')=='1'){
      this.InvestComplete=true
    }
    this.currentLanguage = this.allConfigDataService.getCurrentLanguage();
    if (this.currentLanguage) {
      let allErrorList = this.allConfigDataService.getConfig('errorList');
      if (allErrorList) {
        this.errorList = allErrorList[this.currentLanguage];
      }
    }
    this.imageList = this.allConfigDataService.getConfig('images');
    this.mfFooterData = this.allConfigDataService.getConfig('mfTab');
    this.commonService.getUserDetail().subscribe((data:any)=>{
      if(data){
        this.strFirstName = data?.FirstName?data?.FirstName:'user';
        this.profileName = this.commonFunctionService.getShortName(data?.FirstName?.replace(/\s/g, "").concat(' ', data?.LastName?.replace(/\s/g, "")));
      }
    })
  }

  changeInputType(){
    this.isValid = this.validatePan();
    if(this.isValid)
      this.currentType = !this.currentType;

    if(this.currentInputPan){
      if(this.currentType){

        this.currentInputEncoded = this.currentInputPan.replace(/.(?=.{4})/g, 'x');
       localStorage.setItem('pan',this.currentInputPan);

      }else{
       this.currentInputEncoded = this.currentInputPan
      }
    }
  }
  OrderStatus(){
    let params = {
      "CustGuId": localStorage.getItem("CustGuId"),
    }
    this.mfservice.getBuyStatus(params).subscribe((data:any) => {
      if (data && data.Status=='1') {
       
        // this.kycComplete=false
        this.KycComplete=true

      

      } else {
        this.errorShow(data?.Message, "processPANPostData -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "processPANPostData -> Http request");
    })

  }
  Back(){
    window.history.back();
  }
  errorShow(message, functionName) {
    // this.loadingController.dismiss().then(() => console.log('EsignPDFPreveiw nsdlSucess'));
    this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);
  }
  validatePan(){
    let custReg = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    if (!this.currentImg && !this.currentInputPan){
      this.showRequiredError = true;
      return false;
    }else{
      this.showRequiredError = false;
      if(this.currentInputPan && !custReg.test(this.currentInputPan)){
        this.showPatternError = true;
        return false;
      }else{
        this.showPatternError = false;
        return true;
      }
    }
  }

  onKeyPan(e){
    console.log("e",e.target.value)
    this.getPanNumber.emit(e.target.value);
    this.showRequiredError = false;
    this.showPatternError = false;
    this.currentInputPan = (e.target.value).toUpperCase();
    this.currentInputEncoded = (e.target.value).toUpperCase();
    this.changeInputType()
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
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
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      console.log("imageData",imageData)
      // imageData is either a base64 encoded string or a file URI
      this.currentImg = 'data:image/jpeg;base64,' + imageData;
      //this.cd.detectChanges();
    }, (err) => {
      console.log("err",err)
      // Handle error
    });
  }

  async mysip() {
    this.router.navigate(['/Fullfilment/MutualFunds/MySip'])
    // this.router.navigate(['Invest/MySip']);
    // let eventEmitter = new EventEmitter();
    // eventEmitter.subscribe((res)=>{
    //   console.log(res);

    // })
    // const modal = await this.modalCtrl.create({
    //   component:MySipComponent,
    //   componentProps:{
    //     'imageList':this.imageList,
    //     'event':eventEmitter
    //   },
    //   backdropDismiss:false
    // });
    // modal.onDidDismiss().then((data) => {
    //   // console.log(data);
    //   setTimeout(() => {
    //     if(data.data=='explore')this.modalCtrl.dismiss('explore')
    //   }, 1);
    // })
    // return await modal.present();
  }

  async upcomming() {
    this.router.navigate(['/Fullfilment/MutualFunds/ManageSip'])

  }



  async OnBoardningJurny(kyc) {
 this.ContainerViewPage.openKYCModal()
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

  panImageData(file) {
    const formData = new FormData();
    formData.append('front_image', file);
    formData.append('back_image', file);
    formData.append('CustGuId', this.localCustGuId)
    // this.loaderService.showLoader();

    this.commonService.getPanOcr(formData).subscribe((data: any) => {
      if (data) {

        // console.log(data.msg);
        this.panUserName = data.msg.name;

        // this.showNextStep = true;
        // this.showFirstStep = false;
        this.currentInputPan = data.msg.doc_id;
        let dummyEvent = {
          "target": {
            "value": this.currentInputPan
          }
        }
        // this.onKeyPan(dummyEvent)
        this.loaderService.hideLoader();
        // this.getPanName.emit(data.msg.name)
        // this.changeInputType();
      }
    }, (error: any) => {
      this.ErrorMsg = "fail1 from getSelfieUpload"
      this.loggedInModal = true
      setTimeout(() => {
        this.loggedInModal = false;
      }, 3000);


    })
  }
  loginCustomerGuId(arg0: string, loginCustomerGuId: any) {
    throw new Error('Method not implemented.');
  }
  imagePreview(e, status) {
    // console.log("cordova scan", this.isCordovaStatus);
    const file = (e.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      // console.log("filepath", this.filePath)
      this.currentImg = this.filePath
      if (this.currentImg) {
        this.loaderService.showLoader()
        this.panImageData(e.target.files[0])
        // console.log("filepath", this.filePath)
        // this.panImageData(
        //   this.b64toBlob(this.filePath, 'image/jpeg'));
      }
    }
    reader.readAsDataURL(file)
  }
  deleteImg() {
    this.currentImg = ''
    this.currentInputEncoded = null
    this.cd.detectChanges();
  }



  async AllOrderData() {
    this.router.navigate(['/Fullfilment/MutualFunds/transaction'], {
      state: {
        opneSegment: "All",
      }
    });

  }
  StarInvesting(){
    this.modalCtrl.dismiss();
    this.router.navigate(['Shopping/Wealth/MutualFunds/Invest']);

  }


}
