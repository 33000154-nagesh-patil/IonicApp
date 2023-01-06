import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { AllConfigDataService, ToastService } from 'index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
  
}

interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: [];
  required: boolean;
  validators: JsonFormValidators;
}

export interface JsonFormData {
  controls: JsonFormControls[];
}
@Component({
  selector: 'app-ped-forms',
  templateUrl: './ped-forms.component.html',
  styleUrls: ['./ped-forms.component.scss'],
})
export class PedFormsComponent implements OnInit {
  jsonData: any;
  dontShowHeader=true;
  cartCount:any
 

  todaysDate: any;
  public myForm: FormGroup = this.fb.group({});

  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    "environment": this.allConfigDataService.getConfig('environmentType')
  }
  id:any
  imageList:any
  questionArray:any
  checkIcon: any;
  formValues: any;
  pedRepeatFormsDataEditable: any;
  subInsurance: any;
  insuranceName: any;
  constructor( private eduService:eduService,private router:Router,private allConfigDataService:AllConfigDataService,private fb:FormBuilder,private http:HttpClient ) {
    this.getbreadCrumb()
    this.eduService.questionId.subscribe((data:any)=>{
      this.id=data
    })
this.eduService.pedQuestionForm.subscribe((res:any)=>{
  this.jsonData=res
  this.questionArray=this.jsonData[this.id].controls
this.createForm(this.questionArray)

})
   }




  ngOnInit() {
  
    this.disableFutureDate();
    this.imageList=this.allConfigDataService.getConfig('images')
    this.eduService.pedFormsData.subscribe(val =>{
        this.pedRepeatFormsDataEditable = val;
    })
   console.log( this.pedRepeatFormsDataEditable);
   
  }

  disableFutureDate() {
    var date: any = new Date();
    var maxDate: any = date.getDate();
    var maxMonth: any = date.getMonth() + 1;
    var maxYear: any = date.getFullYear();
    if (maxDate < 10) {
      maxDate = '0' + maxDate
    }
    if (maxMonth < 10) {
      maxMonth = '0' + maxMonth
    }

    this.todaysDate = maxYear + "-" + maxMonth + "-" + maxDate;

  }
  createForm(controls: JsonFormControls[]) {
    console.log(controls+"hey---------------------=");
    
    for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      this.myForm.addControl(
        control.label,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }



  getbreadCrumb() {
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.subInsurance=val['productLanding']=='Insurance'?this.insuranceName:''
      this.apiCatalog['breadCrumb'] = "Onboarding/" + "OnboardingSteps" + "/" + val['productLanding']+this.subInsurance
    })
  }

  onSubmit(){
    this.formValues = this.myForm.value;
   this.eduService.setPedFormsData(this.formValues)
    // this.eduService.setPrerequisitesFormsData(this.formValues)
      let params = {
        "TokenId": localStorage.getItem('id_token'),
         "quesId":this.id
  
      }
      this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + "/submitDetails?submitAnswer", params).subscribe((res:any)=>{
if(res && res?.Status==1){
  // this.eduService.pedData.next(this.formValues)
  this.router.navigate(['/Onboarding'+res.pageUrl])

}
      })
    
  }
}
