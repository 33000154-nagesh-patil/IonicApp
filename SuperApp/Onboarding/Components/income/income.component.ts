import { of } from 'rxjs';
import { AllConfigDataService } from 'index';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormArray,FormControl ,FormGroup} from '@angular/forms';
import jsondata from '../income/income.json'
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
  imageList: any;
  incomeFormData:any;
  formcontrolname: any;
  constructor(private allConfigDataService:AllConfigDataService,private fb:FormBuilder) { }

  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig("images");
    this.incomeFormData=jsondata.data

   
    console.log(this.incomeFormData,"this.incomeFormData");
    
  }
  incomeForm = this.fb.group({

  })
  

  goback(){
    window.history.back()
  }

}
