import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';
// import {DeviceDetectorService} from 'ngx-device-detector'
// import { Device } from '@ionic-native/device/ngx';




@Component({
  selector: 'lib-neo-valid-proof',
  templateUrl: './neo-valid-proof.component.html',
  styleUrls: ['./neo-valid-proof.component.scss'],
})
export class NeoValidProofComponent implements OnInit {
  @Input() imageList: any;
  dontShowHeader=true;

  currentInputDoc: any;
  proceedNext: boolean = false;
  acceptTerms: boolean;
  isValid: boolean;
  @Output() validId = new EventEmitter();
  deviceInfo = null

  cordovaVersion:any
  model:any
  platform:any
  uuid:any
  platformVersion:any
  manufacturer:any
  isVirtual:any
  serial:any
  docsArray=[{
    title:"Driving License Number",
    name:"dl"
  },
  {
    title:"Passport Number",
    name:"passport"
  },
  {
    title:"Voter ID Number",
    name:"voter"
  }
]
  apiCatalog={
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "breadCrumb": "",
    "environment": this.allConfigDataService.getConfig('environmentType'),
};
  docsNumber: any;
  formValue: any;
  obj: any;
  constructor(private allConfigDataService: AllConfigDataService,private onboardingService:OnboardingService,private fb: FormBuilder, private http: HttpClient,private eduService:eduService,private router:Router) {
      this.getBreadcum()
     }


    //  getDeviceinfo(){

    //   this.cordovaVersion=this.device.cordova;
    //   this.model=this.device.model;
    //   this.platform=this.device.platform;
    //   this.uuid=this.device.uuid;
    //   this.platformVersion=this.device.version;
    //   this.manufacturer=this.device.manufacturer;
    //   this.isVirtual=this.device.isVirtual;
    //   this.serial=this.device.serial

    //   console.log('cordovaVersion',this.cordovaVersion);
    //   console.log('deviceModel',this.model);
    //   console.log('devicePlatform',this.platform);
    //   console.log('deviceUUID',this.uuid);
    //   console.log('PlatformVersion',this.platformVersion);
    //   console.log('Manufacturer',this.manufacturer);
    //   console.log('isVirtual',this.isVirtual);
    //   console.log( 'serial',this.serial);
   
      

    //  }


  validProof = this.fb.group({
    document: [[Validators.required]]
  })
  get errorControl() {
    return this.validProof.controls;
  }


  getBreadcum(){
    this.eduService.categoryValueForAPI.subscribe(val => {
      // console.log(val,"qwertzxcv");
      this.apiCatalog['breadCrumb'] = "Onboarding/" +"/OnboardingSteps" + "/" + val['productLanding']
    })
  }

    // epicFunction() {
    //   console.log('hello `Home` component');
    //   this.deviceInfo = this.deviceService.getDeviceInfo();
    //   const isMobile = this.deviceService.isMobile();
    //   const isTablet = this.deviceService.isTablet();
    //   const isDesktopDevice = this.deviceService.isDesktop();
    //   console.log(this.deviceInfo);
    //   console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    //   console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    //   console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
    // }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }
  back() {
  
  }

  onSubmit() {
    this.formValue=this.validProof.value
  
    
    this.docsNumber=this.formValue.document

    let obj = {
      "TokenId": localStorage.getItem('id_token'),
      "DocDetails":this.currentInputDoc,
      "DocumentType":this.docsNumber
    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + this.apiCatalog.documentDetails, obj).subscribe(
    
      (data: any) => {
        this.obj=data.documentDetails
        
        
    if(this.obj.Status==1){
// this.router.navigate(['/Onboarding/Bank'])
this.onboardingService.nextOnSuccess('walletDocs');

     
     
    }
      }
    )
  }

  onKeyDoc(e) {
    this.currentInputDoc = (e.target.value).toUpperCase();
    this.validateDoc(this.validProof.value.document);
  }

  validateDoc(val) {
    console.log(val,'jhjjjjb');
    
    let dl = /(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
    let passport = /^(?!^0+$)[a-zA-Z0-9]{3,20}$/;
    let voter = /^([a-zA-Z]){3}([0-9]){7}?$/
    if (val == 'dl') {
      this.isValid = dl.test(this.currentInputDoc)
    }
    else if (val == 'passport') {
      this.isValid = passport.test(this.currentInputDoc)
    }
    else if (val == 'voter') {
      this.isValid = voter.test(this.currentInputDoc)
    }
    else this.isValid = false;
  }


}
