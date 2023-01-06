import { TestLocationComponent } from './../test-location/test-location.component';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
// import labTestData from 'src/assets/labTestData.json';
import { LoaderService } from '../../services/loader.service';
// import { FilterComponent } from '../filter/filter.component';
import { ProductDescLabComponent } from '../product-desc-lab/product-desc-lab.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CommonFunctionService } from '../../services/common-function.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'lib-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.scss'],
})

export class LabTestComponent implements OnInit {

  @Input() filterVal = [];
  @Input() filter: any = {};

  imageList: any;
  data: any;
  getCurrency: any;
  rupeesSymbol: any;
  cardCount: any;
  notificationCount: any;
  placeholder: any;
  filterTerm: string;
  search: any;
  modal: any;
  showSerchBar: boolean = false;
  showHeader: boolean = true;
  searchIcon: boolean = true;
  closeIcon: boolean = false;
  searchBar: any;
  filterIcon: boolean = true;
  environmentAPIList: any;
  errorList: any;
  currentMode: any = 1;
  goldFooterData: any;
  modalCtrl: any;

  topLimit: number = 15;
  dataList: any = []
  pinCode: any;
  apiCatalog: any;
  appEnviron: any;
  breadCrumb: string;

  constructor(private loaderservice: LoaderService, private commonService: CommonService, private http: HttpClient, private commonFunctionService: CommonFunctionService, private allConfigDataService: AllConfigDataService, private router: Router,
    public modalController: ModalController, private loaderService: LoaderService) {
      this.apiCatalog={
        ...this.allConfigDataService.getConfig('apiCatalog'),
      };
      this.appEnviron = this.allConfigDataService.getConfig('environmentType');
      this.breadCrumb='Shopping/Health/Lab';
    }

  ngOnInit() {
    // this.data = labTestData;


    console.log(this.filter.length);
    console.log(this.filterVal.length);
    this.getProductApi();


    this.imageList = this.allConfigDataService.getConfig('images');
    this.getCurrency = this.allConfigDataService.getConfig('listCodeCountry');
    this.rupeesSymbol = this.getCurrency['IND']['currencySymbol'];
    this.goldFooterData = this.allConfigDataService.getConfig('labTest');

    // if (this.filter.length == 0) {
    //   this.commonService.getCourseListAll().subscribe(async (res: any) => {
    //     this.data = await res;
    //     console.log("courselist data",this.data[0].level);
    //     console.log(res);

    //   })
    // } else {
    //     let param= this.filter
    //     this.commonService.postfilterAll(param).subscribe(async (res:any) => {
    //     this.data = await res;
    //     console.log(res);

    //   })
    //   console.log(this.filterVal);

    // }

  }



  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.topLimit += 10;
      this.dataList = this.data.slice(0, this.topLimit)

      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      // if (data.length === 1000) {
      //   event.target.disabled = true;
      // }
    }, 500);
  }

  toggleID() {
    this.showSerchBar = !this.showSerchBar;
    this.showHeader = false;
    this.filterIcon = false;
  }

  searchBarBack(): void {
    this.showHeader = true;
    this.showSerchBar = false;
    this.filterIcon = true;
  }

  clearSearchIcon(val: any) {
    this.searchBar = val;
    this.searchIcon = false;
    this.closeIcon = true;
  }


  async handleLocation() {
    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: TestLocationComponent,
      componentProps: {

      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {

          console.log("Save data pinnnnnnnnnnnnnnnnnn", data.data);
          this.pinCode = data.data;
          if (data) {

          }
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }


  async handleClick(name:any,product:any) {
    // this.modalController.dismiss();
    this.loaderService.showLoader();
    this.commonFunctionService.setSelectedProductDetails(product);
    const modal = await this.modalController.create({
      component: ProductDescLabComponent,
      componentProps: {
        "name": name,
        "productDetails":product,
        "PinCode": this.pinCode
      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          // console.log("Save data");
          if (data) {

          }
        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }

  // async handleFilter() {

  //   this.loaderService.showLoader();
  //   const modal = await this.modalController.create({
  //     component: FilterComponent,
  //     componentProps: {
  //     },
  //     backdropDismiss: false
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //       if (data && data?.data) {
  //         // console.log(data);
  //         if (data) {
  //         }
  //       }
  //     });
  //   this.loaderService.hideLoader();
  //   return await modal.present();
  // }

  getProductApi() {
    this.loaderService.showLoader()
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
    });
    let params = {
      "app": "BHealthy",
      "action": "LoadLogics",
      "url": "apps/ShoppersSpot/Items/ItemVendorMap.vws",
      "item_type_name": "Investigation",
      "session_id": " 81703207"
    }
    // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/ProductList", params, { headers }).subscribe(async (res: any) => {
      this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getList, params).subscribe(async (res: any) => {
      console.log("New product list data", res);


      this.data = await res.itemList;
      this.dataList = this.data.slice(0, this.topLimit)
      console.log(this.data);
      this.loaderService.hideLoader()

    },

    )

  }

  // errorShow(message: any, functionName: string) {
  //   this.loaderService.hideLoader();
  //   this.commonFunctionService.showErrorsService(this.errorList?.error, null, message, this.errorList?.okText);

  async handleCart() {
    // this.loaderService.showLoader();
    // const modal = await this.modalController.create({
    //   component: CartComponent,
    //   componentProps: {
    //   },
    //   backdropDismiss: false
    // });
    // modal.onDidDismiss()
    //   .then((data) => {
    //     if (data && data?.data) {
    //       console.log(data);
    //       if (data) {
    //       }
    //     }
    //   });
    // this.loaderService.hideLoader();
    // return await modal.present();

    // this.commonService.setPath(this.router.url);
    // this.router.navigate(['/cart'])
  }




  // async filterComponent() {
  //   const modal = await this.modalController.create({
  //     component: FilterComponent,
  //     componentProps: {
  //       'imageList': this.imageList,
  //       // 'filter':this.filter
  //     }
  //   });
  //   modal.onDidDismiss()
  //     .then((data) => {
  //       console.log(data);
  //       let headers: HttpHeaders = new HttpHeaders({
  //         "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
  //       });

  //       if (data.data) this.filter = data.data
  //       let param = {
  //         // "categoryid":"",
  //         // "level":"",
  //         // "lowprice":"",
  //         // "highprice":"",
  //         // "rating":""
  //         "sortBy": ""
  //       }
  //       param['sortBy'] = this.filter.Level[0]
  //       // param['rating']=this.filter.Ratings[0]
  //       this.commonService.getFilterDetails(param).subscribe(async (res: any) => {
  //         this.data = await res;
  //         console.log("filtered data", res);
  //       });

  //     });
  //   return await modal.present();
  // }

}


