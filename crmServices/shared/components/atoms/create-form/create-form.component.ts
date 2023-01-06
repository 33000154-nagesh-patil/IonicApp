import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrmServiceService } from '../../../../services/crm-service.service';



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
  title: string;
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
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})


export class CreateFormComponent implements OnInit {

  @Input() searchDetails:any[]
  todaysDate: any;
  public myForm: FormGroup = this.fb.group({});
  inputValue: any;

  constructor(private fb:FormBuilder,private crmService:CrmServiceService){
    this.crmService.createForm.subscribe((res)=>{
      this.inputValue=res;
       this.createForm(this.inputValue);
    });
   
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
      maxDate = '0' + maxDate
    }
    if (maxMonth < 10) {
      maxMonth = '0' + maxMonth
    }

    this.todaysDate = maxYear + "-" + maxMonth + "-" + maxDate;

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
        control.title,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }
  getFormValue(value){
      if(value=='Submit'|| value=='Apply'){
        this.myForm.value;
        console.log(this.myForm.value,"PPPPPP"); 
      }
  }

}









 





