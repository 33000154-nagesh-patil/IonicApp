import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'app-healthuploadimg',
  templateUrl: './healthuploadimg.component.html',
  styleUrls: ['./healthuploadimg.component.scss'],
})
export class HealthuploadimgComponent implements OnInit {
  val: any;

  constructor(private http:HttpClient,private allConfigDataService: AllConfigDataService) { 
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();

  }
  @Output() looksGood=new EventEmitter(false);
  @Output() retry=new EventEmitter(false)
  @Input()picture:any
  environmentAPIList: any;
  ngOnInit() {
    console.log(this.picture);
  }
  apiCatalog:any={

    ...this.allConfigDataService.getConfig('apiCatalog'),

    "breadCrumb": "Shopping/Health/Medicine",
     

    "environment": this.allConfigDataService.getConfig('environmentType'),

  }
looks(){

  this.looksGood.emit()
}
tryagain(){
  this.retry.emit()
}

looksGoodimg(){
 
  let params ={
    "TokenId":localStorage.getItem('id_token'),
    "SavedImg":this.picture
  }
  // this.http.post("https://apixproto.heytorus.com:8443/PrototypeSuperApp/SuperApp/Onboarding/OnboardingSteps/Document/submitDetails?addPrescription",params).subscribe((res:any) =>{
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+'/Onboarding/OnboardingSteps/Document/submitDetails?addPrescription',params).subscribe((res:any) =>{

    this.val=res
    console.log(this.val,"Apires")

})
}
}
