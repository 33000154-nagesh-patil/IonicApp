import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { AllConfigDataService } from 'index';
import { NetworkService } from 'index';
import { master } from 'index';
import { CommonService } from 'index';
import { LoaderService } from 'index';
import { CommonFunctionService } from 'index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebCamComponent } from 'projects/core/src/lib/components/web-cam/web-cam.component';
import { StockOrderPadComponent } from '../order-book/stockOrderPad/stockOrderPad.component';
import { DigiGoldBottomCardComponent } from '../order-book/components/digiGoldBottomCard/digiGoldBottomCard.component';
import { HealthimgComponent } from '../healthimg/healthimg.component';

@Component({
  selector: 'app-healthdoc',
  templateUrl: './healthdoc.component.html',
  styleUrls: ['./healthdoc.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HealthdocComponent implements OnInit {
  imageList: any;
  @Input() webImage:any
  preview:any
  errorList: any;
  currentModuleType: any;
  incomeProofKYC: any;
  loginCustomerGuId: any;
  @Output() getIncomeProofStatus = new EventEmitter();
  public incomeProofForm: FormGroup;
  currentImg: string;
  selfieImage: any;
  isCordovaStatus: any;
  Healthimg: any[]=[];
  visibility: boolean;
  incomeProoftest: any;
  filePath: string;
  incomeProofList:any;
  incomeProofData: any;
  incomeProofUpload: any;
  @ViewChild('userInput') userInputViewChild: ElementRef;
  userInputElement: HTMLInputElement;
  environmentAPIList: any;
  params: object;
  appName: any;
  incomeDocVal:boolean = false;
  lookg:boolean=false;
  tryg:boolean=false;
  Continuedoc:boolean=false;
  jsonData={
    Consumer:[
      {
        name:'Akshay'
      }
    ],
    Location:[
      {
        name:"",
        value:["address1", "address2", "address3"]
      }
    ]
  }
  collectedimg: any=[];
  valueimg: any;
  val: any;
  selectImage: any;
  checked:any;
  imgval: any;
  Orderbook: any;
  Gotoorderbook: any;
  GetImg: any=[];
  constructor(private allConfigDataService: AllConfigDataService, private actionSheetController: ActionSheetController, 
    private loaderService: LoaderService, private commonFunctionService: CommonFunctionService,
    private camera: Camera, private cdn: ChangeDetectorRef, public modalController: ModalController, 
    private networkService: NetworkService, private commonService: CommonService,
     private http: HttpClient, private router:Router,private modalCtrl:ModalController) {
      // this.Orderbook=this.router.getCurrentNavigation.extras.state.orderbook;
      this.Gotoorderbook=this.router.getCurrentNavigation().extras.state.Healthdoc
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
  }
  ngAfterViewInit() {
    this.userInputElement = this.userInputViewChild.nativeElement;
  };

  apiCatalog:any={

    ...this.allConfigDataService.getConfig('apiCatalog'),

    "breadCrumb": "Shopping/Health/Medicine",
     

    "environment": this.allConfigDataService.getConfig('environmentType'),

  }

  ngOnInit() {
    
    this.appName = this.allConfigDataService.getConfig('appName');
    this.imageList = this.allConfigDataService.getConfig('images');
    // this.getIncomeProofMasterDetails('incomeProof', null);
    this.incomeProofForm = new FormGroup({
      incomeProofDetails: new FormControl(),
    });

    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })

    this.incomeProofForm.controls["incomeProofDetails"].setValidators([Validators.required])

     this.GetimgPrescription();
  }

  looksGoodimg(){
 //this.selectImage
  
  }



  gotoBack() { }
  dismiss(e) { }
 

  // incomeDoc(e) {
  //   if(e!=='' || e !== undefined){
  //     this.incomeDocVal = true;
  //   }else{
  //     alert('else')
  //   }
    
  // }

  looksGood(e) {
    this.Healthimg.push(this.selectImage)
    this.preview=false
  }
  async selectImageFn() {
   
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
            this.WebCam('Healthimg');
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
  backF(){
    window.history.back();
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
            this.WebCam('Healthimg');
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

collectionimg(){
  
  this.collectedimg.push(this.selectImage())
  console.log(this.collectedimg,"Collection")
}

  async WebCam(id) {
    let eventEmitter = new EventEmitter();
    // alert(eventEmitter)
    eventEmitter.subscribe(res => {
      // this.incomeProof.push(res);//edited
      this.selectImage=res;
      this.preview=true;
      // debugger;
      console.log(this.Healthimg,"---->")

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
      this.Healthimg.push(this.filePath)
       //this.incomeProofUpload=e.target.files;
      // this.visibility = !this.visibility;
      this.preview=!this.preview
    }
    reader.readAsDataURL(file)
   
    this.preview=true
    let params ={
      "TokenId":localStorage.getItem('id_token'),
      "SavedImg":this.Healthimg
    }
    // this.http.post("https://apixproto.heytorus.com:8443/PrototypeSuperApp/SuperApp/Onboarding/OnboardingSteps/Document/submitDetails?AddPrescription",params).subscribe((res:any) =>{
      this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'/Onboarding/OnboardingSteps/Document/submitDetails?addPrescription',params).subscribe((res:any) =>{
      this.imgval=res
      console.log(this.imgval,"Image")
     
  
  })
  }
GetimgPrescription(){
  let params1 ={
    "TokenId":localStorage.getItem('id_token'),
   
  }
   this.http.post("https://apixproto.heytorus.com:8443/PrototypeSuperApp/Operations/Health/Medicine/getPortFolioDetails?getDocument",params1).subscribe((res:any) =>{
    //this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'/Onboarding/OnboardingSteps/Document/submitDetails?addPrescription',params).subscribe((res:any) =>{
    this.GetImg=res.Prescription
    console.log(this.GetImg,"Image------>//")
   

})

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

  // getIncomeProofMasterDetails(type, selectedGuId) {
  //   let params = {
  //     "Type": type,
  //     "SelectedGuId": selectedGuId
  //   }
  //   this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'/Onboarding/OnboardingSteps/CustomerRegistration/getDetail?IncomeProof',params).subscribe(async (data: any) => {
  //     if (data && data?.Status) {
  //       this.incomeProofList = data.data;
  //       // console.log(this.incomeProofList);

  //     }

  //   })
  // }





  selectedConsumer: any=0;

  selectedLocation:any=0;
  async profileClicked(){



    const documentElement = document.documentElement;
      documentElement.style.setProperty("--hey", `${this.jsonData.Consumer.length}`);
      documentElement.style.setProperty("--world", `8em`);
      let eventEmitter = new EventEmitter();
      eventEmitter.subscribe(res => {
        this.selectedConsumer = res;
      })
   const modal =await this.modalCtrl.create({
    componentProps:{
      jsonData:this.jsonData,
      selected:this.selectedConsumer,
      SelectedProfile:eventEmitter
    },
    cssClass:"backdrop",
    backdropDismiss: true,
    component:StockOrderPadComponent,
   });
   modal.onDidDismiss().then(() => {});
   return modal.present();
  }
  async locationClicked(){
    const documentElement = document.documentElement;
      documentElement.style.setProperty("--hey", `${this.jsonData.Location.length>=2?2:this.jsonData.Location.length}`);
      documentElement.style.setProperty("--world", `16.4em`);

      let eventEmitter = new EventEmitter();
      eventEmitter.subscribe(res => {
        this.selectedLocation = res;
      })
    const modal =await this.modalCtrl.create({
      componentProps:{
        jsonData:this.jsonData,
        selected:this.selectedLocation,
        selectedLocation:eventEmitter
      },
      cssClass:"backdrop",
      backdropDismiss: true,
      component:DigiGoldBottomCardComponent,
     });
     modal.onDidDismiss().then(() => {
     });
     return modal.present();
  }
 async zoomimg(z){
    this.valueimg=z
  const modal =await this.modalCtrl.create({
    componentProps:{
     
      Selectimage:this.valueimg,

    },
    cssClass:"imgselecd",
    backdropDismiss: true,
    component:HealthimgComponent,
   });
   modal.onDidDismiss().then((data) => {
    // console.log(data,"pamk");
    
    if(data.data.status=='select'){
      // this.incomeProof.forEach((ele)=>{
      //   if(ele==data.data.img){
      //     this.checked=data.data.img
      //   }
      // })
      this.Healthimg.forEach((ele)=>{
        if(ele==data.data.img){
          this.checked.includes(data.data.img)
        }
      })

          //  this.checked=data.data.img

    }else{
     
      this.Healthimg.forEach((ele)=>{
        if(ele==data.data.img){
          this.Healthimg.splice(this.Healthimg.indexOf(ele),1)
        }
      })
    }
   });
   return modal.present();
  }
  GoToLink(){
 if(this.Gotoorderbook==true){
    this.router.navigate(['/Shopping/OrderBook'])
 } else{
  console.log(this.Gotoorderbook,"hello world")
 }
  }
}

