import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import dummyInvestnowData from '../../../../../src/assets/mockData/dummyInvestnowData.json';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sip-detail',
  templateUrl: './sip-detail.component.html',
  styleUrls: ['./sip-detail.component.scss'],
})
export class SipDetailComponent implements OnInit {
  @Input() imageList:any;
  isLinear = false;
  x = dummyInvestnowData.Mfcard;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  message:any;
  arr=[];
  CancelPopUp: boolean;
  currentCountry: any;
  SIPDetailData: any;
  SIPJourney: any;
  

  constructor(private router:Router,private http:HttpClient,private _formBuilder: FormBuilder, private modalCtrl:ModalController, private AllConfigDataService: AllConfigDataService, private commonService: CommonService) {}

  ngOnInit() {
    this.getDummayApi()
    this.imageList=this.AllConfigDataService.getConfig('images')
    fetch('assets/mockData/dummySipData.json').then(async (res) => {
    this.message=await res.json();
    this.message=this.message.exploreFund["Result"]
    let prevItem :any;
    for(let i of this.message){
      if(i['Title'] == 'NEXT DUE'){
        this.arr.push(prevItem)
        this.arr.push(i)
      }
      prevItem = i;
    }
  })
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  async onSubmit() {
    this.modalCtrl.dismiss("1");
    this.router.navigate(['/Invest']);
  }
  onCancelSIP() {
    this.modalCtrl.dismiss();
  }
  CancelConfirmaion(){
    this.CancelPopUp=true
  }
  NotCancel(){
    this.CancelPopUp=false
  }

  async EditSIPData() {
    // return await modal.present();
  }


  getDummayApi(){
    let data={
      "CFT":"Shopping",
      "Product":"MF",
      "FileName":"getSIPdetails"   
    }
  this.http.post("http://uat.torusdigital.in/api/v1/Dummy/get/generalApi",data).subscribe(
    (data: any) => {
      this.SIPDetailData=data
      this.SIPJourney=data.SIPJourney
 
    

      })
  
  }
}
