import { retry } from 'rxjs/operators';
import { getLocaleDateFormat } from '@angular/common';
// import { BuygoldComponent } from './../../../digi/buygold/buygold.component';
import { modalController } from '@ionic/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { customerDataDetails, master, userProfileDetail } from 'projects/core/src/lib/interfaces/common.interface'; 
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ToastService } from 'projects/core/src/lib/services/toast.service'; 
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { LoaderService } from 'projects/core/src/lib/services/loader.service'; 
import { NetworkService } from 'projects/core/src/lib/services/network.service'; 
import { ModalController } from '@ionic/angular';
import { BuyGoldComponent } from '../buy-gold/buy-gold.component';


@Component({
  selector: 'lib-customerdata',
  templateUrl: './customerdata.component.html',
  styleUrls: ['./customerdata.component.scss'],
})
export class CustomerdataComponent implements OnInit {
  public custmerFormGroup: FormGroup;
  profileData
  @Input() data: any;
  @Input() metalType:any
  @Output() custDatastatus = new EventEmitter();
  Firstname:any='r'
  Middlename:any='Pro'
  Lastname:any='Bhardwaj'
  DateOfBirth:any=''
  EmailId:any='ramanandb3@gmail.com'
  MobileNumber:any='6386653468'
  AddressLine1:any=''
  AddressLine2:any=''
  AddressLine3:any=''
  city: master[];
  state: master[];
  country:master[];
  maxDate: any;

 
  public nomineeFormGroup: FormGroup;
  todaysDate: any;
  isShown: boolean = false;
  output: number = 0;
  isMinor: boolean = false;
  number: number = 0;
  checked: boolean = true;
  detailsOfNominee: any = [];
  totalNominee: number = 0;
  nomineeList: boolean;
  localCustGuId: string;
 
  currentNativeNetwork: any;

  numberOfNominee = [];
  currentLanguage: any;
  appName: any;
  pan1: any;
  pan2: any;

  loggedInModal: boolean = false
  ErrorMsg: any
  isCordovaStatus: any;
  currentWindowNetwork: any;
  profileDetails: userProfileDetail;
  rama:any
  imageList:any
  clientCode: any;


  constructor(private commonservice:CommonService,private allConfigDataService: AllConfigDataService, private loaderService: LoaderService,  private toastservice: ToastService, private commonFunctionService: CommonFunctionService, private networkService: NetworkService,private modctrl:ModalController) { }

 
  

  ngOnInit() {
    this.futureDateDisable();

    this.imageList=this.allConfigDataService.getConfig('images')
    
    
    this.custmerFormGroup=new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      MiddleName: new FormControl(''),
      LastName: new FormControl(''),
      DateOfBirth: new FormControl(''),
      EmailId: new FormControl(''),
      MobileNumber: new FormControl(''),
      AddressLine1: new FormControl(''),
      AddressLine2: new FormControl(''),
      AddressLine3: new FormControl(''),
      State: new FormControl(''),
      City: new FormControl(''),
      Pincode: new FormControl('')
    });

    this.getStateMasterDetails('State',null);

    // this.custmerFormGroup.controls["firstName"].setValidators([Validators.required])

    // this.custmerFormGroup.controls["firstName"].setValidators([Validators.required])
    // this.custmerFormGroup.controls["MiddleName"].setValidators([Validators.required])
    this.custmerFormGroup.controls["LastName"].setValidators([Validators.required])
    this.custmerFormGroup.controls["DateOfBirth"].setValidators([Validators.required])
    this.custmerFormGroup.controls["EmailId"].setValidators([Validators.required,Validators.pattern(/^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])
    this.custmerFormGroup.controls["AddressLine1"].setValidators([Validators.required])
    this.custmerFormGroup.controls["AddressLine2"].setValidators([Validators.required])
    this.custmerFormGroup.controls["AddressLine3"].setValidators([Validators.required])
    this.custmerFormGroup.controls["MobileNumber"].setValidators([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
    this.custmerFormGroup.controls["Pincode"].setValidators([Validators.required])



    

    this.profileData = {
      Status: "",
      ErrorCode: "",
      Message: "",
      MessageType: "", 
      // IsInterestedInNominee: "",
      FirstName: "",
      MiddleName: "",
      LastName: "",
      // Gender: "",
      // RelationWithNominee: "",
      DateOfBirth: "",
      // PercentageAllocation: "",
      // PanAadharNumber: "",
      // IsNomineeMinor: "",
      Address: "",
      EmailId: "",
      MobileNo: "",
      // NoOfNominee: "",
      // GFullName: "",
      // GPanAadharNumber: "",
      GAddress: "",
      GCityGuId: "",
      GStateGuId: "",
      Pincode: "",
      Country: ""
    }
    console.log(this.profileData+"ramapro");
    

    this.networkService.onNetworkChange().subscribe((data: any) => {
      this.currentNativeNetwork = data;
    })
    
    this.networkService.getCordovaStatus().subscribe((data) => {
      this.isCordovaStatus = data;
    })
    this.networkService.updateNetworkStatusbrowserchange().subscribe((data) => {
      this.currentWindowNetwork = data;
    })

    


this.getProfileData()

    
    if(this.custmerFormGroup.value.Pincode!='')this.navigateTobuySell()
  


  
  }
  futureDateDisable() {
    var date = new Date();
    var todayDate: any = date.getDate();
    var month: any = date.getMonth() + 1;
    var year: any = date.getFullYear() - 18;
    if (todayDate < 10) {
      todayDate = '0' + todayDate;
    }
    if (month < 10) {
      month = '0' + month;
    }
    this.maxDate = year + "-" + month + "-" + todayDate;
  }
  
  getCountryMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.commonservice.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.country = data.Data;
      }

    })
  }

  getStateMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.commonservice.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.state = data.Data;
      }

    })
  }

  getCityMasterDetails(type, selectedGuId) {
    let params = {
      "Type": type,
      "SelectedGuId": selectedGuId
    }
    this.commonservice.getMasterDetails(params).subscribe((data: any) => {
      if (data && data?.Status) {
        this.city = data.Data;
      }

    })
  }

  successModalClose() {
    this.loggedInModal = false
  }

  getProfileData() {
    this.localCustGuId = localStorage.getItem('CustGuId');

    // this.loaderService.showLoader();
    let reqParams = {
      CustGuId: this.localCustGuId,
    }
    this.commonservice.getProfileDetails(reqParams).subscribe((data:any) => {
      if (data && data?.Status) {
     console.log(JSON.stringify(data)+"himansi");
     this.profileDetails=data
        console.log(JSON.stringify( this.profileDetails)+"gcudfyudg");
        
        this.Firstname=data.FirstName
        this.Middlename=data.MiddleName
        this.Lastname=data.LastName
        this.EmailId=data.EmailId
        this.MobileNumber=data.MobileNo
        this.clientCode=data.ClientCode
        console.log(this.rama,"fyiusdyfgidg")
        this.custmerFormGroup.setValue({
          Pincode: data.Pincode, 
          
        });
      } 
    })
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.custmerFormGroup.value);
    
  }
  dismiss(){
    this.modctrl.dismiss()
    
  }

  async navigateTobuySell() {
    
    let params = {
      // "CustGuId":localStorage.getItem('CustGuId'),
      "userName":this.custmerFormGroup.value.firstName +" "+ this.custmerFormGroup.value.MiddleName +" "+ this.custmerFormGroup.value.LastName,
      "emailId":this.custmerFormGroup.value.EmailId,
      "mobileNumber":this.custmerFormGroup.value.MobileNumber,
      "dateOfBirth": this.commonFunctionService.dobFormattedYYYYMMDD(this.custmerFormGroup.value.DateOfBirth),
      "userAddress":this.custmerFormGroup.value.AddressLine1 +" "+ this.custmerFormGroup.value.AddressLine2 +" "+ this.custmerFormGroup.value.AddressLine3,
      "userPincode":this.custmerFormGroup.value.Pincode,
      "userCity":this.custmerFormGroup.value.City,
      "userState":this.custmerFormGroup.value.State,
      // "uniqueId":this.clientCode
      "uniqueId":localStorage.getItem('ClientCode')
    }

  
    
    // this.modctrl.dismiss()
    let commodity='gold';
    this.insertCustomerDataPost(params)
    
    
  }
  errorShow(message, functionName) {
    // this.loaderService.hideLoader();
    this.commonFunctionService.showErrorsService('error', "Nominee Page" + functionName, message, 'ok')
  }

   numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode != 46 && charCode > 31 
            && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  insertCustomerDataPost(obj){
    // this.loaderService.showLoader();
    this.commonservice.setCustomerdata(obj).pipe(retry(3)).subscribe(async (data: customerDataDetails) => {
      if (data&&data.Status==1) {
        console.log(data);
        this.custDatastatus.emit("custdata")
        // console.log("update", data);
        // // return true;
        // const modal = await this.modctrl.create({
        //   // component: CoursecategoryComponent,ionic
        //   component:BuyGoldComponent ,
        //   componentProps: {
        //     'imageList': this.imageList,
        //     '_type':'buy',
        //     'metalType': this.metalType,
        //     'clientCode':this.clientCode
        //   },
          // backdropDismiss: false
        // })
        // modal.onDidDismiss().then((data) => {
        //   console.log(data)
        // })
        // modal.present()
        // return await modal.present();
        // this.commonservice.hello(params).subscribe((data: any) => {
        //   console.log("done");
        //   modal.present();
        // })
        // this.getNomineeStatus.emit("nominee"); // call this method on success
       
        // this.loaderService.hideLoader();
      }
      else {
        // this.custDatastatus.emit("custdata")
        // this.loaderService.hideLoader();
        this.errorShow(data?.Message, "setCustomerdata -> status")
        // this.loaderService.hideLoader();
        // console.log("cancel", data)
      }
    }, (error: any) => {
      this.errorShow(error?.Message, "setCustomerdata -> Http request");
      // this.loaderService.hideLoader();
      return false;
    })
  }

  


  
  

}
