import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';


@Component({
  selector: 'lib-sspage',
  templateUrl: './sspage.component.html',
  styleUrls: ['./sspage.component.scss'],
})
export class SspageComponent implements OnInit {
@Input() imageList:any
@Output() simBinding = new EventEmitter();
smsSentSuccess:boolean=false
smsSentFail:boolean=false
sendingSMS: boolean;

  count: any=0;
  success:any=false
  ifChecked: boolean=true;
//   sim=[{
//     title:'Sim 1',
//     checked:true
// },{
//   title:'Sim 2',
//   checked:false
// }]

apiCatalog:any={
  ...this.allConfigDataService.getConfig('apiCatalog'),
  "breadCrumb": "Onboarding/OnboardingSteps/NB/simBinding/",
  "environment": this.allConfigDataService.getConfig('environmentType'),
}
  items: any;
  constructor(private allConfigDataService:AllConfigDataService,private http:HttpClient,private router:Router,private onboardingService:OnboardingService) { }

  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images')
    this.getDeviceDetails()
  }

  bindingFun(){
    
    this.sendingSMS=true
      
    

  }
writeToFile(){
  this.getSimBindedApi()
  // this.simBinding.emit(true)




}



getSimDetails(data){
console.log(data);

}

getSimBindedApi() {

  let data = {
    "TokenId": localStorage.getItem('id_token')
  }

    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.getSimDetails, data).subscribe(

    (data: any) => {
      if (data && data.Status==1) {
        this.smsSentSuccess=true
    this.sendingSMS=false
    
   


      }else{
        this.smsSentFail=true
    this.sendingSMS=false


      }

    }
  )
}


getDeviceDetails(){
let data={
  "TokenId": localStorage.getItem('id_token')
}
this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment]+this.apiCatalog.breadCrumb+this.apiCatalog.getDeviceInfo, data).subscribe((data:any)=>{
if(data && data.Status==1){

  this.items=data.simInfo

}

})

}

goToSelfie(){
  this.onboardingService.nextOnSuccess('simBinding')
  // this.simBinding.emit(true)

}

terms(status: any) {
  if (!status.target.checked) {
    this.count++;
    if (this.count === 2) {
      this.ifChecked = false
    }
  } else {
    this.count--;
    this.ifChecked = true
  }
}

goBack(){
this.router.navigate(['/Dashboard'])
}
}
