import { BillpaymentService } from 'SuperApp/Shopping/Components/wealth/Bill Payment/billpayment.service';
import { FavouriteaddedComponent } from './../favouriteadded/favouriteadded.component';
import { ModalController } from '@ionic/angular';
// import { BbpsService } from './../../bbps.service';
import {
  Component,
  OnChanges,
  Input,
  ChangeDetectionStrategy,
  SimpleChanges,
  OnInit,
} from '@angular/core';
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
  selector: 'lib-common-favourite',
  templateUrl: './common-favourite.component.html',
  styleUrls: ['./common-favourite.component.scss'],
})
export class CommonFavouriteComponent implements OnChanges {

  @Input() jsonFormData;
  message:any

  public myForm: FormGroup = this.fb.group({});
  formName: string;

  constructor(private fb: FormBuilder,private billPaymentService:BillpaymentService, private mdlctrl:ModalController) {
    this.jsonFormData=this.billPaymentService.getJSON()
    
    this.ngOnChanges(this.jsonFormData)
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (!changes.jsonFormData.firstChange) {
      this.createForm(this.jsonFormData.controls);
    // }
  }

  createForm(controls: JsonFormControls[]) {
    console.log(controls);
    
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
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }

  onSubmit() {
    
this.openViewPlan()
    console.log('Form valid: ', this.myForm.valid);
    console.log('Form values: ', this.myForm.value);
  }




  async openViewPlan(){

    const modal=await this.mdlctrl.create({
      component: FavouriteaddedComponent,
      componentProps:{
      'message':"Favourite Added Successfully"
      },
  backdropDismiss:false
    });
    modal.onDidDismiss().then((data)=>{
      
    })
  return await modal.present()
    }

}
