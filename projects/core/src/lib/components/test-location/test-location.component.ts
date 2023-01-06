import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { userProfileDetail } from 'projects/core/src/lib/interfaces/common.interface';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import datas from 'src/assets/datas.json'
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-location',
  templateUrl: './test-location.component.html',
  styleUrls: ['./test-location.component.scss'],
})
export class TestLocationComponent implements OnInit {
  imageList: any;
  pinCode: any;
  pinNew:any;

  pinTrue:boolean=true;

  data:any;
  currencyList:any;
  currencySymbol:any;
  modal: any;
  constructor(private http: HttpClient, private allConfigDataService: AllConfigDataService, private loaderService: LoaderService,private commonService: CommonService,private allconfigDataService:AllConfigDataService) { }

  ngOnInit() {
    this.getAddressDetails();
    this.pinNew = this.pinCode;

    this.imageList=this.allconfigDataService.getConfig('images')
    this.data = datas,
    this.currencyList = this.allconfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']

   }
   dataForAddressSelection=[
    {
    ID:"1",
  addressType:"Home",
  name:"Swapnil Vashant joshi",
  phoneNumber:"9810806462",
  addresstoSelect:"ICC Chamber,Saki Vihar Rd, Muranjan Wadi,Marol,Powai,Mumbai,Maharashtra,400072.",
  },


  {
    ID:"2",
    addressType:"Office",
    name:"Swapnil Vashant joshi",
    phoneNumber:"9810806462",
    addresstoSelect:"ICC Chamber,Saki Vihar Rd, Muranjan Wadi,Marol,Powai,Mumbai,Maharashtra,400072.",
  }
]
handlePincode(data){
  this.pinTrue = false;
this.pinCode = data.pincode;
}
handleBack(){
  this.modal.dismiss(this.pinCode)
}

getAddressDetails(){
  let headers: HttpHeaders = new HttpHeaders({
        "Token" : "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
      });
      let params={

        "CustGuId":localStorage.getItem('CustGuId'),

      }

      this.http.post("http://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/GetPatientAddress",params,{headers}).subscribe((res:any)=>{


      console.log("Address details data==========>", res);

      this.data = res;
      // this.pinCode = res.pincode;


      })
}


}
