import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllConfigDataService, ToastService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'app-ped-questions',
  templateUrl: './ped-questions.component.html',
  styleUrls: ['./ped-questions.component.scss'],
})
export class PedQuestionsComponent implements OnInit {
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "environment": this.allConfigDataService.getConfig('environmentType')
  }
  dontShowHeader=true;
  cartCount:any
  checkIcon:any=false
  pedQuestions:any
  imageList: any;
  // questionId:any
  constructor(private allConfigDataService: AllConfigDataService, private router :Router,private eduService: eduService, private http: HttpClient) {


   }

  ngOnInit() {

    this.imageList=this.allConfigDataService.getConfig('images')
    this.getbreadCrumb()
    setTimeout(() => {
      this.getPedQuestions()
    },);
    
    // this.checkIcon=this.router.getCurrentNavigation().extras.state.checkIcon
   
    // console.log(this.checkIcon,'kkkk');
  }



  getbreadCrumb() {
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.apiCatalog['breadCrumb'] = "Onboarding/" + "OnboardingSteps" + "/" + val['productLanding']
    })
  }
  getPedQuestions() {
    let params = {

      "TokenId": localStorage.getItem('id_token'),
      // "TokenId": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXF1ZXN0X2lkIjoiOWIzZWEzNjAtYTA2Zi00OWIxLTk1ZmEtMzY5ZWJjMzQ5YTkzIiwidXNlcl9pZCI6MTM1NzcwLCJzY29wZSI6ImFhZGhhYXJfeG1sIiwiZW52IjoidGVzdCIsImNsaWVudF9pZCI6Ik5TRExfUGF5bWVfSDdDTzFFIiwic3RhZ2UiOiJ0ZXN0IiwidXNlcl90eXBlIjoib3BlbiIsImV4cGlyeV90aW1lIjoiMzAtMDktMjAyMlQxMjo1ODowNyJ9.rDvFq33sM99mIQek3X34x3muOvDr3cpAzK6A05ObPOw",


    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + this.apiCatalog.getDetail + "?" + "getPedDetails", params).subscribe((data: any) => {
if(data && data?.status==1){
  this.pedQuestions=data.pedQuesion


}

    })

  }
  onContinue(status){
    // this.questionId=status.id
    let params = {

      "TokenId": localStorage.getItem('id_token'),
       "quesId":status.id

    }
    this.eduService.questionId.next(status.id)
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + this.apiCatalog.getDetail + "?" + "getPedQuestions", params).subscribe((data:any)=>{
      if(data && data?.status){
        console.log('/Onboarding'+data.pageUrl);
        this.eduService.pedQuestionForm.next(data)

        this.router.navigate(['/Onboarding'+data.pageUrl])
      }
    })

  }
  onSubmit(){
   
    let params = {

      "TokenId": localStorage.getItem('id_token')
       

    }
    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + "/submitDetails?submitPed", params).subscribe((res:any)=>{
if(res && res?.Status==1){
  this.router.navigate(['Onboarding' + res.pageUrl]);
}
    })
  
}
}
