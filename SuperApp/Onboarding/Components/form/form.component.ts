import { HttpClient } from '@angular/common/http';
import { CommonService } from 'index';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { AllConfigDataService, ToastService } from 'index';
import { log } from 'console';
import { OnboardingService } from 'SuperApp/Onboarding/Services/Onboarding.service';

interface JsonFormValidators {
  minValue?: number;
  maxValue?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  minValue?: string;
  maxValue?: string;
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
  disable: boolean;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControls[];
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  dontShowHeader=true;
  cartCount
  count:any=0
  formdata: any;
  public myForm: FormGroup = this.fb.group({});
  JsonFormData: any;
  buttonName: any;
  selected: any;
  formValues: any;
  title:any
  amountFilled: any;
  todaysDate: any;
  radioVal: any;
  imageList = this.allConfigDataService.getConfig('images')

  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    environment: this.allConfigDataService.getConfig('environmentType'),
  };
  operatorArray: any;
  insurance: any;
  values: number;
  provider: any;
  prerequisite:any
  // options: any;

  frompre:any
  operator: any;
  insuranceName: any;
  opCode: any;
  subInsurance: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private allConfigDataService: AllConfigDataService,
    private eduService: eduService,
    private router: Router,
   private onboardingService:OnboardingService
  ) {
    this.frompre=this.router.getCurrentNavigation().extras.state.frompre
    this.eduService.operatorCategory.subscribe(val=>{
      this.operator=val
      this.insuranceName =val.replace(" ", "")
    })

    this.getbreadCrumb();
   

    this.eduService.fromVault.subscribe((data:any)=>{
      
    })
    setTimeout(() => {
      this.eduService.providerName.subscribe((res: any) => {
        this.selected = res;
      });
      this.getPrerequisite()

    }, 500);


    this.values=this.eduService.getIndex();
    console.log(this.values);
  }


  onChange(event){
console.log(event,"gggg");

let params = {
  "TokenId": localStorage.getItem('id_token'),
  // "TokenId": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXF1ZXN0X2lkIjoiOWIzZWEzNjAtYTA2Zi00OWIxLTk1ZmEtMzY5ZWJjMzQ5YTkzIiwidXNlcl9pZCI6MTM1NzcwLCJzY29wZSI6ImFhZGhhYXJfeG1sIiwiZW52IjoidGVzdCIsImNsaWVudF9pZCI6Ik5TRExfUGF5bWVfSDdDTzFFIiwic3RhZ2UiOiJ0ZXN0IiwidXNlcl90eXBlIjoib3BlbiIsImV4cGlyeV90aW1lIjoiMzAtMDktMjAyMlQxMjo1ODowNyJ9.rDvFq33sM99mIQek3X34x3muOvDr3cpAzK6A05ObPOw",
  "OperatorName": this.operator

}
this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + this.apiCatalog.prerequisiteDetails +this.prerequisite, params).subscribe((data: any) => {

this.operatorArray=data.aggregatorlist;
this.buttonName=data?.nextStep
  for(let x of data.aggregatorlist){
    if(x?.operatorName==event){
      this.JsonFormData = x?.controls
      this.opCode=x?.operator_code
      this.eduService.operatorCode.next(this.opCode)
    }
  }
   if(this.frompre=="True"){
   let ar = this.eduService.getArray()
   console.log(ar);
  for(let i=0;i<this.JsonFormData.length;i++){
    this.JsonFormData[i].value=ar[i];
    console.log(this.JsonFormData[i].value);
  }
  this.createForm(this.JsonFormData)

}
  
 this.createForm(this.JsonFormData)
})

  }
  ngOnInit() {

    this.disableFutureDate();
  }

  disableFutureDate() {
    var date: any = new Date();
    var maxDate: any = date.getDate();
    var maxMonth: any = date.getMonth() + 1;
    var maxYear: any = date.getFullYear();
    if (maxDate < 10) {
      maxDate = '0' + maxDate;
    }
    if (maxMonth < 10) {
      maxMonth = '0' + maxMonth;
    }
    this.todaysDate = maxYear + '-' + maxMonth + '-' + maxDate;
  }

  getPrerequisite() {
    let params = {
      "TokenId": localStorage.getItem('id_token'),
      // "TokenId": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXF1ZXN0X2lkIjoiOWIzZWEzNjAtYTA2Zi00OWIxLTk1ZmEtMzY5ZWJjMzQ5YTkzIiwidXNlcl9pZCI6MTM1NzcwLCJzY29wZSI6ImFhZGhhYXJfeG1sIiwiZW52IjoidGVzdCIsImNsaWVudF9pZCI6Ik5TRExfUGF5bWVfSDdDTzFFIiwic3RhZ2UiOiJ0ZXN0IiwidXNlcl90eXBlIjoib3BlbiIsImV4cGlyeV90aW1lIjoiMzAtMDktMjAyMlQxMjo1ODowNyJ9.rDvFq33sM99mIQek3X34x3muOvDr3cpAzK6A05ObPOw",
      "OperatorName": this.operator
    }

    this.http.post(this.apiCatalog.baseURL[this.apiCatalog.environment] + this.apiCatalog.breadCrumb + this.apiCatalog.prerequisiteDetails +this.prerequisite +this.subInsurance, params).subscribe((data: any) => {

   this.operatorArray=data.aggregatorlist;
   this.buttonName=data?.nextStep
      for(let x of this.operatorArray){
        if(x?.operatorName==this.selected){
          this.JsonFormData = x?.controls
          this.opCode=x?.operator_code
          this.eduService.operatorCode.next(this.opCode)
          
        }
      }
       if(this.frompre=="True"){
       let ar = this.eduService.getArray()
       console.log(ar);
      for(let i=0;i<this.JsonFormData.length;i++){
        this.JsonFormData[i].value=ar[i];
        console.log(this.JsonFormData[i].value);
      }
      this.createForm(this.JsonFormData)

    }
      
     this.createForm(this.JsonFormData)
    })
  }      

  getbreadCrumb() {
    this.eduService.categoryValueForAPI.subscribe(val => {
      this.subInsurance=val['productLanding']=='Insurance'?'_'+this.insuranceName:''
      this.apiCatalog['breadCrumb'] = "Onboarding/" + "OnboardingSteps" + "/" + val['productLanding']
      this.prerequisite= val['productLanding']?'_'+val['productLanding']:'';
      this.insurance = val['productLanding'];
    
    })
  }
  createForm(controls: JsonFormControls[]) {
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
              // console.log(Validators.required,"req");
            }
            break;
          // case 'email':
          //   if (value) {
          //     validatorsToAdd.push(Validators.email);
          //   }
          //   break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          // case 'nullValidator':
          //   if (value) {
          //     validatorsToAdd.push(Validators.nullValidator);
          //   }
          //   break;
          default:
            break;
        }
      }

      this.myForm.addControl(
        control.label,
        // this.fb.control( control.value,validatorsToAdd)
        this.fb.control(
          {
            value: control.value,
            disabled: control.disable,
          },
          validatorsToAdd
        )
      );
    }
  }

  onSubmit(val) {
    this.formValues = this.myForm.value;
    this.eduService.formsData.next(this.formValues)
    this.radioVal = this.formValues['Are you suffering from Ped'];


    if (this.radioVal == 'Yes') {
      this.eduService.setPrerequisitesFormsData(this.formValues)

      this.router.navigate(['Onboarding/pedQuestion']);
      this.myForm.reset()

    } else {
      let params = {
        TokenId: localStorage.getItem('id_token'),
        // "TokenId": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXF1ZXN0X2lkIjoiOWIzZWEzNjAtYTA2Zi00OWIxLTk1ZmEtMzY5ZWJjMzQ5YTkzIiwidXNlcl9pZCI6MTM1NzcwLCJzY29wZSI6ImFhZGhhYXJfeG1sIiwiZW52IjoidGVzdCIsImNsaWVudF9pZCI6Ik5TRExfUGF5bWVfSDdDTzFFIiwic3RhZ2UiOiJ0ZXN0IiwidXNlcl90eXBlIjoib3BlbiIsImV4cGlyeV90aW1lIjoiMzAtMDktMjAyMlQxMjo1ODowNyJ9.rDvFq33sM99mIQek3X34x3muOvDr3cpAzK6A05ObPOw",
        formData: this.myForm.value,
        operator_code:this.opCode,
        BillerType: this.operator

      };
      this.formValues = this.myForm.value;
      

      // this.amountFilled=this.formValues.amount
      this.eduService.setPrerequisitesFormsData(this.formValues)
      this.amountFilled = this.formValues.amount;

      // this.commonService.setBillAmount(this.amountFilled)
      this.eduService.amountValue.next(this.amountFilled);
      this.http
        .post(
          this.apiCatalog.baseURL[this.apiCatalog.environment] +
            this.apiCatalog.breadCrumb +
            '/submitDetails?'+this.prerequisite,
          params
        )
        .subscribe((res: any) => {
          if (res && res?.Status == 1) {
            console.log([res.pageUrl]);
            this.myForm.reset()
  // this.onboardingService.nextOnSuccess('prerequisiteDetails');
            return this.router.navigate(['Onboarding' + res.pageUrl]);
            
          }
  
        });
        
    }
  }
}
