import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { log } from 'console';
import { AllConfigDataService } from 'index';
import { ToastService } from 'projects/core/src/lib/services/toast.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

@Component({
  selector: 'app-ticketgeneration',
  templateUrl: './ticketgeneration.component.html',
  styleUrls: ['./ticketgeneration.component.scss'],
})
export class TicketgenerationComponent implements OnInit {
  optionsSelect: any = ['wealth', 'Health', 'Education', 'Lifestyle', 'Bank'];

  ionicForm: FormGroup;
  categorydetail: string[];
  productvariables: any;
  file: any;
  choosenFile: any;
  fileInfo: string;
  Data: any;
  formvalues: any;
  reader: any = { result: '' }
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;
  constructor(
    public formBuilder: FormBuilder,
    private eduService: eduService,
    private mdlctrl: ModalController,
    private router: Router,
    private http: HttpClient,
    private Toast: ToastService,
    private allConfigDataService: AllConfigDataService
  ) {

    this.apiCatalog = {
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb = 'Engagement/EngagementChatBot';

  }

  ngOnInit() {
    // let

    const sub = this.eduService.categoryValueForAPI.subscribe((val: any) => {
      console.log(val,"valuee");
      
      this.categorydetail = [(val['categoryLanding'])];
      this.productvariables = val['categoryLanding']
        ? val['productLanding']
        : '';
      console.log(this.productvariables, 'hye');
      switch (this.productvariables) {

        case 'DG':
          this.productvariables = 'Digi Gold';
          break;
        case 'MF':
          this.productvariables = 'Mutual Fund';
          break;
        case 'ST':
          this.productvariables = 'Stock';
          break;
        case 'Courses':
          this.productvariables = 'Courses';
          break;
        case 'Job':
          this.productvariables = 'Jobs';
          break;
        case 'Assessment':
          this.productvariables = 'Assessment';
          break;
        case 'LabTest':
          this.productvariables = 'Lab Test';
          break;
        case 'Medicine':
          this.productvariables = 'Medicine';
          break;
        case 'Las':
          this.productvariables = 'Loans';
          break;
        case 'BillPayment':
          this.productvariables = 'Bill Payment';
          break;
        case 'Insurance':
          this.productvariables = 'Insurance';
          break;
        case 'NB':
          this.productvariables = 'Neo Bank';
          break;
      }

      console.log(this.categorydetail, 'uigiuwgushghs');
    });

    let arr = [];
    arr.push(this.categorydetail);

    console.log(arr,"arrayValue");
    let urlSection=this.router.url
    console.log(urlSection,"URL");
    

    this.categorydetail.push(urlSection);
    this.ionicForm = this.formBuilder.group({
      // name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: [''],
      subcategory: [''],
      issuetype: [''],

      // mobile: ['', [Validators.required]]
    });
  }
  changeBreadcrum(url: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
  onFilechange(e) {
    this.file = e.target.files[0];
    console.log(this.file.name);
    this.choosenFile = this.file.name;
  }
  onFileSelect(input: HTMLInputElement): void {
    /**
     * Format the size to a human readable string
     *
     * @param bytes
     * @returns the formatted string e.g. `105 kB` or 25.6 MB
     */
    function formatBytes(bytes: number): string {
      const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const factor = 1024;
      let index = 0;

      while (bytes >= factor) {
        bytes /= factor;
        index++;
      }

      return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
    }

    // const file = input.files[0];
    // let me = this;
    let file1 = input.files[0];
    this.reader = new FileReader();
    this.reader.readAsDataURL(file1);
    this.reader.onload = function () {
      //  me.modelvalue = reader.result;
      //  console.log(this.reader.result,"lauda");
    };
    this.fileInfo = `${file1.name} (${formatBytes(file1.size)})`;
    console.log(this.fileInfo, "base64");
    console.log();


  }
  onFileSelects(input: HTMLInputElement): void {
    /**
       * Format the size to a human readable string
       *
       * @param bytes
       * @returns the formatted string e.g. `105 kB` or 25.6 MB
       */
    function formatBytes(bytes: number): string {
      const UNITS = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const factor = 1024;
      let index = 0;

      while (bytes >= factor) {
        bytes /= factor;
        index++;
      }

      return `${parseFloat(bytes.toFixed(2))} ${UNITS[index]}`;
    }

    // const file = input.files[0];
    // let me = this;
    let file2 = input.files[0];
    this.reader = new FileReader();
    this.reader.readAsDataURL(file2);
    this.reader.onload = function () {
      //  me.modelvalue = reader.result;
      //  console.log(this.reader.result,"lauda");
    };
    this.fileInfo = `${file2.name} (${formatBytes(file2.size)})`;


  }


  SubmitDetails() {
    this.formvalues = this.ionicForm.value
    let param = {
      TokenId: localStorage.getItem('id_token'),
      Photo1: this.reader.result ? this.reader.result : '',
      Photo2: '',
      Category: this.formvalues.category,
      SubCategory: this.formvalues.subcategory,
      IssueType: this.formvalues.issuetype,
      RequestType: 'Complaint',
      IssueDescription: this.formvalues.description,
    };

    this.http
      .post(
        // 'https://apixuat.heytorus.com/SuperApp/Engagement/EngagementChatBot/chatbot?insertComplaint',
        // param
        this.apiCatalog.baseURL[this.appEnviron] +
        this.breadCrumb + this.apiCatalog.chatbot + "?insertComplaint"
        ,
        param
      )
      .subscribe((data) => {
        this.Data = data;
        if (this.Data.Status == 1) {
          this.router.navigate(['Engagement/EngagementMyIssues/issues']);
          this.Toast.showAutoToast('Ticket Raised Successfully')
          this.mdlctrl.dismiss();

        } else {
          this.Toast.showAutoToast('Error In Connection')
        }
        console.log(this.Data, 'asdfghjklpoiuytrew');
      });
  }
}
