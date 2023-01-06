// import { GlobalCartService } from './../global-cart/global-cart.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

// eslint-disable-next-line @typescript-eslint/naming-convention
export class eduService {
  dummy = [
    {
      id: '1',
      name: 'home',
      url: 'Education/home',
      icon: 'assets/icon/homeIcon.svg',
    },
    {
      id: '2',
      name: 'dashboard',
      url: 'Education/dashboard',
      icon: 'assets/icon/dashboardIcon.svg',
    },
    {
      id: '3',
      name: 'explore',
      url: 'Education/explore/course',
      icon: 'assets/icon/investIcon.svg',
    },
    {
      id: '4',
      name: 'learn',
      url: 'Education/learn',
      icon: 'assets/icon/investIcon.svg',
    },
    {
      id: '5',
      name: 'profile',
      url: 'Education/profile',
      icon: 'assets/icon/mfUserIcon.svg',
    },
  ];
 

  public messageSource = new BehaviorSubject([]);
  cartData = this.messageSource.asObservable();
  headerName;
  any;

  private _footerData = new BehaviorSubject(this.dummy);
  footerData = this._footerData.asObservable();
  private _razorpay_payment_id = new BehaviorSubject('');
  razorpay_payment_id = this._razorpay_payment_id.asObservable();

  public Patner=new BehaviorSubject("Customer");

  private _filterData = new BehaviorSubject({});
  filterData = this._filterData.asObservable();

  productName = new BehaviorSubject('MF');
  detailParams = new BehaviorSubject({});
  fromVault = new BehaviorSubject('False');
  fromVaultDetail = new BehaviorSubject({});
  PortfolioSummary=new BehaviorSubject({});


  public categoryValueForAPI :any = new BehaviorSubject({
    // categoryLanding:"Wealth",
    // productLanding:"ST"
  }); //Category BreadCrum value for API call.
  public OnboardingStepList = new BehaviorSubject({}); //containes getAllSteps
  pricePerUnit = new BehaviorSubject(null);
  arr: any[] = [];
  selectedData: any;


  public orderConfirm:any = new BehaviorSubject({
    "heading": "Confirmation",
    "confirmationTitle": "Your order has been placed successfully",
    "actionButton": "Explore",
    "card": {
      "heading": "Basic Information",
      "description": "",
      "sub_heading": "Tata Steel LTD",
      "image": "",
      "row": [

        {
          "Invesment Amount": "5000",
          "Quantity": 1

        },
        {
          "Date&Time": new Date(),
          "Order ID": "A-dfrg-HGUGHJ-derff-dsdff"

        }
      ]
    }
  });
  public providerName = new BehaviorSubject(null);
  public formsData = new BehaviorSubject(null);
  public cardData=new BehaviorSubject(null)
  public amountValue = new BehaviorSubject(null);
  public pedQuestionForm = new BehaviorSubject(null);
  public operatorCategory = new BehaviorSubject(null);
  public operatorCode=new BehaviorSubject(null)
  public questionId = new BehaviorSubject(null);
  public pedData = new BehaviorSubject(null);
  public pedFormsData = new BehaviorSubject({});
  public prerequisiteDetailsData = new BehaviorSubject({});
  public diseaseprerequisiteDetailsData = new BehaviorSubject({});
  PrerequisitesFormsData: any = [];
  pedForm:any=[]
  indexValue: number = 0;
  healthDetails: any=new BehaviorSubject(null);
  
  constructor() {}

  setIndex(val) {
 
    this.indexValue = val;
    let i=0;
    for (let key in this.PrerequisitesFormsData[this.indexValue]) {
     let value = this.PrerequisitesFormsData[this.indexValue][key];
     
     this.arr[i++]=value;
   }
  }

  
  getIndex() {
    return this.indexValue;
  }
  setPrerequisitesFormsData(val) {
    this.PrerequisitesFormsData[this.indexValue] = val;
  }
  setPedFormsData(val) {
    this.pedForm[this.indexValue] = val;
  }

  getArray(){
    return this.arr;
  }

  getPrerequisitesFormsData() {
    return this.PrerequisitesFormsData;
  }
  getPedFormsData() {
    return this.pedForm;
  }
  setFooterData(val) {
    this._footerData.next(val);
  }

  setheaderName(val) {
    this.headerName = val;
  }
  getheaderName() {
    return this.headerName;
  }
  getCartData(): any {
    return this.cartData;
  }
  setCartData(val: any) {
    // console.log(val);
    val.forEach((x) => {
      x.type = 'course';
      x.price = x.price;
    });
    this.messageSource.next(val); // this.cartData = val;
  }

  setRazorpayId(razorpay_payment_id: any) {
    this._razorpay_payment_id.next(razorpay_payment_id);
  }
  setFilterData(arr) {
    // console.log(arr);

    this._filterData.next(arr);
  }



  ////////////////////////////////////////////////////////////////////
  private elementsMap = new Map<string, IElementPositioning>();
  createSharedElementTransition(identifier: string, element: Element) {
    const positioning = this.getElementPositioning(element);
    this.elementsMap.set(identifier, positioning);
  }
  getSharedElementData(identifier: string): IElementPositioning {
    return this.elementsMap.get(identifier);
  }
  getElementPositioning(el: Element): IElementPositioning {
    const rect = el.getBoundingClientRect();
    const elementPositioning: IElementPositioning = {
      width: rect.width,
      height: rect.height,
      left: rect.left,
      top: rect.top
    };
    return elementPositioning;
  }
  ////////////////////////////////////////////////////////////////////
}
interface IElementPositioning {
  top: number;
  left: number;
  width: number;
  height: number;
}