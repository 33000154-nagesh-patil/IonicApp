import { CommonService } from 'projects/core/src/lib/services/common.service';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { ModalController } from '@ionic/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { urlFetch } from 'projects/core/src/lib/enums/comman.enum';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-pan-digi-gold',
  templateUrl: './pan-digi-gold.component.html',
  styleUrls: ['./pan-digi-gold.component.scss'],
})
export class PanDigiGoldComponent implements OnInit {
@Output() panDetailsFilled = new EventEmitter()
 @Input() imageList :any;
 currentInputEncoded:any;
 currentType:any;
 policyCheckBox
  currentInputPan: any;
  isValid: any;
  showPatternError: boolean;
  @Input() panDetails: any;
  loginCustomerGuId: any;
  @Input() currentModuleType: any;
  panDetailsData: any;
  panUserName: any;
  showFirstStep: any = true;
  showNextStep: any = false;
  showConfirmNextStep:any=false
  dob: string;
  maxDate: any;
  constructor(private modalCtrl:ModalController,private fb: FormBuilder,private commonFunctionService:CommonFunctionService,private commonService:CommonService) { }


  dobValidationForm = this.fb.group({
    dob: ['', [Validators.required]]
  })
  ngOnInit() {
    this.loginCustomerGuId=localStorage.getItem('CustGuId')
  }
  onContinue(){
this.panDetailsFilled.emit('done')
  }
  gotoBack(){
    this.modalCtrl.dismiss();
  }
  onKeyPan(e){
    this.showPatternError = false;
    this.currentInputPan = (e.target.value).toUpperCase();
    this.currentInputEncoded = (e.target.value).toUpperCase();
    this.changeInputType()
  }
  changeInputType(){
    this.isValid = this.validatePan();
    if (this.isValid)
      this.currentType = !this.currentType;

    if (this.currentInputPan) {
      if (this.currentType) {
        this.currentInputEncoded = this.currentInputPan.replace(/.(?=.{4})/g, 'x');
      } else {
        this.currentInputEncoded = this.currentInputPan
      }
    }
  }
  validatePan(): any {
    let custReg = /[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/;
    if (!this.currentInputPan) {
      this.showPatternError = true;
      return false;
    } else {
      if (this.currentInputPan && !custReg.test(this.currentInputPan)) {
        this.showPatternError = true;
        return false;
      } else {
        
        return true;
      }
    }
  }
  checkboxClick(val){
    this.policyCheckBox = !this.policyCheckBox
  }
  clickDisclaimerURL(){
    this.commonFunctionService.inAppBrowser(urlFetch.disclaimerURL);
  }
  clickTncUrl(){
    this.commonFunctionService.inAppBrowser(urlFetch.tncURL);
  }
  onSubmitPAN(){
    this.isValid = this.validatePan();
    if (this.isValid) {
      if (this.policyCheckBox) {
        this.uploadPan();
      } else {
        console.log("error");
      }
    }
  }
  uploadPan() {
    let localObj = {
      "docNumber": this.currentInputPan
    }
    this.processToNextStep(localObj)
    // this.onContinue()
    throw new Error('Method not implemented.');
  }
  processToNextStep(obj) {
    // this.loaderService.showLoader();
    this.commonService.getPanDetails(obj).subscribe((data) => {
      // this.loaderService.hideLoader();
      console.log(this.panDetails);

      if (data && data?.Status) {
        this.panDetailsData = data;
        this.panUserName = data?.msg ? (data?.msg?.NameOnTheCard || data?.msg?.Name) : ''

        let localPostPanData = {
          "docNumber": this.currentInputPan,
          "CustGuId": this.loginCustomerGuId,
          "DocumentGuId": this.panDetails[0].DocumentGuId,
          "OfferingGuId": this.currentModuleType?.OfferingGuId,
          "Citizenship": "IN-Indian",
          'dob': "2004-6-1",
          "CustomerPanName": this.panDetailsData?.msg?.NameOnTheCard || this.panDetailsData?.msg?.Name
        }
        this.processPANPostData(localPostPanData)

      } 
    })
  }
  processPANPostData(obj) {
    this.commonService.postPanDetails(obj).subscribe((data:any) => {
      console.log(data);
      this.onContinue()
      
      if (data && data?.Status) {
      } else {
      }
    })
  }

  onDobContinue() {
    this.showNextStep=false
    this.showConfirmNextStep=true
    // this.isSubmited=true;
    if (this.dobValidationForm.valid) {
      this.dob = this.commonFunctionService.dobFormattedYYYYMMDD(this.dobValidationForm.controls.dob.value)
      // this.dob = this.commonFunctionService.dobFormattedDDMMYYYY(this.errorControl.dob.value)
      console.log(this.dob)

      let localObj = {
        "CustGuId": this.loginCustomerGuId,
        "PanNo": this.currentInputPan,
        "dob": this.dob
      }
     

    } else {
      // console.log(this.dobValidationForm.value)
    }
  }


}
