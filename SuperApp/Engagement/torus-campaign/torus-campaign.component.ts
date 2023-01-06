// import { WealthWellnessComponent } from './../../lib/wealth-wellness.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import data from '../data.json';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

interface hour {
  value: string;
  viewValue: string;
}
interface minute {
  value: string;
  viewValue: string;
}
interface period {
  value: string;
  viewValue: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-torus-campaign',
  templateUrl: './torus-campaign.component.html',
  styleUrls: ['./torus-campaign.component.scss'],
})
export class TorusCampaignComponent implements OnInit {
  productForm: FormGroup;
  emailFormControl = new FormControl('', [
    Validators.required
  ]);
  mobileFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
  ]);
  matcher = new MyErrorStateMatcher();
  panelOpenState = false;
  value:any;
  value2:any;
  value3:any;
  selected: any = false;
  imageList: any;
  username:any;
  emailid:any;
  emailId:any;
  mobileno:any;
  mobilenumber:any;
  obj: { userName: string; emailId: string; mobileNumber: string }[] = [
    { userName: '', emailId: '', mobileNumber: '' },
  ];
  hours: any;
  minutes: any;
  periods: any;
  file:any;
  choosenFile: any;
  constructor(private allConfigDataService: AllConfigDataService, private fb:FormBuilder) {
    this.imageList = this.allConfigDataService.getConfig('images');

    this.productForm = this.fb.group({
      campaignName: '',
      csvFile:'',
      smsData: ' Hi Username, Click here to download Torus Superapp. www.heytorus.com/Username/userid',
      emailData: 'Hi Username, Click here to download Torus Superapp. www.heytorus.com/Username/userid',
      quantities: this.fb.array([]) ,
      date1:'',
      date2:'',
      hour1: '',
      min1: '',
      period1: '',
      hour2:'',
      min2: '',
      period2: ''

    });


  }
  listUser = [1];
  ngOnInit() {
    this.addQuantity()
    this.hours = data.hours;
    this.minutes = data.minutes;
    this.periods = data.periods;
  }

  toggleImg() {
    this.selected = !this.selected;
    this.listUser.push(this.listUser.length + 1);
  }

  removeRow() {
    this.listUser.pop();
  }

  onFileUpload(event) {
    // let file = event.target.files[0];
  }

  clearUsername()
  {
    this.username='';
  }
  clearEmailId()
  {
    this.emailId='';
  }
  clearMobileno()
  {
    this.mobileno='';
  }

  onFilechange(e) {
   this.file = e.target.files[0]
   console.log(this.file.name)
    this.choosenFile=this.file.name
  }



  quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray;
  }

  newQuantity(): FormGroup {
    return this.fb.group({
      username: '',
      email: '',
      mobile: ''
    })
  }

  addQuantity() {
    this.quantities().push(this.newQuantity());
  }

  removeQuantity(i:number) {
    this.quantities().removeAt(i);
  }

  onSubmit() {
    console.log(this.productForm.value);
  }


  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }



}
