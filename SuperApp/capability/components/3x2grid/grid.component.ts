import { NeoServiceService } from './../../../Shopping/Components/wealth/NeoBank/neo-service.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AllConfigDataService, CommonService } from 'index';
import { BillpaymentService } from 'SuperApp/Shopping/Components/wealth/Bill Payment/billpayment.service';

@Component({
  selector: 'app-3x2grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  imageList = this.allConfigDataService.getConfig("images")
  @Input() grid : any;
  @Input() threeByTwoGridLabel : any;
  @Input() threeByTwoGridbtn:any
  @Input() colSize:any

  routing: string;
  resss: any;
  route: any;
  prodName: any;

  constructor(
    private allConfigDataService:AllConfigDataService,
    private router: Router,
    private eduService:eduService,
    private BillPaymentService:BillpaymentService,
    private NeobankService:NeoServiceService,
    private commonService: CommonService
  ) { }

  ngOnInit(){}
  ngOnChanges() {
    this.commonService.footerData.subscribe((res) => {
      console.log(res);
      this.resss = res
    })

    this.eduService.productName.subscribe(data => {
      console.log(data)
      switch (data) {
        case 'billPayment':
          this.routing = "billPayment"
          break;
      }
    })


  }

  navigateToProductList(val){   // this method is use to navigate from grid to list but in case of some wealth product we are moving to orderBook
    let obj={
      "id":(val?.id)?Number(val?.id):"",
      "title":(val?.name)?(val?.name):"",
      "favList":(val?.favList)?(val?.favList):"",
      "TokenId":localStorage.getItem('id_token')
    }
      this.eduService.detailParams.next(obj)
      this.eduService.operatorCategory.next(obj.title)
    this.commonService.footerData.subscribe((res) => {
  
      if(res=='Bill Payments'){
        this.eduService.productName.next("billPay")
        this.BillPaymentService.setJSON(val)
    this.router.navigate(['/Shopping/Details'],{state: {listing:"",listing1:"",Service:val}})

      }
      else{
        this.changeValueForList(res);
        this.router.navigate(['Shopping/listing']);
      }
    });



  }

  fetchFormForNeo(status:any){
    this.prodName=status

  status =status.split(" ")[0].toLowerCase() +'Savings';
  console.log(status);

    this.NeobankService.setFormName(status);
    this.NeobankService.setJSON(status);
    this.eduService.productName.next("neoBank")

    this.router.navigate(['/Shopping/Details'],{state: {listing:"",listing1:"",Service:this.prodName}})

  }

  changeValueForList(name){
    switch (name) {
      case 'Gold':
        this.eduService.productName.next("digiGold");
        this.changeBreadcrum('DG');
        break;
      case 'Mutual Fund':
        this.eduService.productName.next("mutualFund");
        this.changeBreadcrum('MF');
        break;
      case 'Stock':
        this.eduService.productName.next("stock");
        this.changeBreadcrum('ST');
        break;
      case 'Courses':
        this.eduService.productName.next("educationCourses");
        this.changeBreadcrum('Courses');
        break;
      case 'Jobs':
        this.eduService.productName.next("educationJob");
        this.changeBreadcrum('Job');
        break;
      case 'Assessment':
        this.eduService.productName.next("educationAssessment");
        this.changeBreadcrum('Assessment');
        break;
      case 'Lab Test':
        this.eduService.productName.next("healthLabTest");
        this.changeBreadcrum('LabTest');
        break;
      case 'Medicine':
        this.eduService.productName.next("healthMedicine");
        this.changeBreadcrum('Medicine');
        break;
      case 'Loans':
        this.eduService.productName.next("las");
        this.changeBreadcrum('Las');
        break;
      case 'Bill Payment':
        this.changeBreadcrum('BillPayment');
        break;
      case 'Insurance':
        this.changeBreadcrum('Insurance');
        break;
        case 'Neo Bank':
          this.changeBreadcrum('NB');
          break;
    }
  // })
}

changeBreadcrum(val){
  let myObj={}                  // method to store product value for Dynamic API calling.
  this.eduService.categoryValueForAPI.subscribe(obj=>{
    obj["productLanding"]=val;
    myObj=obj;
  })
  this.eduService.categoryValueForAPI.next(myObj);
}



navigateToExplore(){
  this.router.navigate(['Shopping/listing'])
}

}
