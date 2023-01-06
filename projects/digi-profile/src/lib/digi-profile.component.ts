import { CommonService } from './../../../core/src/lib/services/common.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { HttpClient } from '@angular/common/http';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-DigiProfile',
  templateUrl: './digi-profile.component.html',
  styleUrls: ['./digi-profile.component.scss'],
})
export class DigiProfileComponent implements OnInit {
  [x: string]: any;
  imageList:any
  panelOpenState = false;
  custId:any=localStorage.getItem('ClientCode')
  mobileNo:any=localStorage.getItem('SocialClientId')
  bankId: any;
  bankAcc: any;
  bankName: any;
  profileDetails:any
  dateofbirth:any
  MobileNumber:any
  EmailId:any
  name:any
  mfFooterData:any
  constructor(private modctrl:ModalController,private allConfigDataService:AllConfigDataService ,private http:HttpClient,private loderService:LoaderService,private commonService:CommonService,private router:Router) { }

  ngOnInit() {
    this.getBankDetails()
    this.callProfileData()
    this.imageList=this.allConfigDataService.getConfig('images')
    this.mfFooterData = this.allConfigDataService.getConfig('goldTab');
  }

  dismiss(){
    this.modctrl.dismiss()
    this.router.navigateByUrl('./InvestGold/Dashboard')

  }



  getBankDetails(){
    this.commonService.getDigiBankData().pipe(retry(3)).subscribe(async (res:any) => {
          // if(res.message!= "No results"){

          this.bankId=  res.result[0].userBankId
          this.bankAcc=res.result[0].accountNumber
          this.bankName=res.result[0].accountName
          // console.log(this.bankId);
          // this.enableContinueButton = false;
          // this.enablebtn = true;
          // debugger;
          // }else{
          //   this.enableContinueButton = true;
          //   this.enablebtn = true;
          //   // debugger;
          // }
          if(res.message=='No results'){
            // this.bankdataerrorpopup=true
          }

        })
  }

  callProfileData() {
    console.log("local custguid");
    this.localCustGuId = localStorage.getItem('CustGuId');
    if (this.localCustGuId) {
      let reqParams = {
        CustGuId: this.localCustGuId,
      }
      this.getProfileData(reqParams);
    }

  }

  getProfileData(reqParams) {
    //this.loaderService.showLoader();
    this.commonService.getProfileDetails(reqParams).subscribe((data: any) => {
      if (data && data?.Status) {
        //this.loaderService.hideLoader();
        this.profileDetails = data;
        this.dateofbirth=this.profileDetails.DateOfBirth
        this.MobileNumber=this.profileDetails.MobileNo
        this.EmailId=this.profileDetails.EmailId
        this.name=this.profileDetails.FirstName+" "+this.profileDetails.MiddleName+" "+this.profileDetails.LastName
        localStorage.setItem('SocialClientId',this.profileDetails.SocialClientId);
        localStorage.setItem('ClientCode', data.data[0].clientCode);

        console.log("hihihihihihihihihihihihihihihihihihihihihihih")

        console.log(JSON.stringify(data));
        this.commonService.setUserDetail(data);
      } else {
        this.errorShow(data?.Message, "getProfileDetails -> status");
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "getProfileDetails -> Http request");
    })
  }
}
