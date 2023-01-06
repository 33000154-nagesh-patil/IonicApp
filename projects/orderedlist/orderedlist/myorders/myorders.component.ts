import { Component, OnInit,Input } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ModalController } from '@ionic/angular';
import { LoaderService } from 'projects/core/src/lib/services/loader.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import myOrder from  'src/assets/myOrder.json'
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.scss'],
})
export class MyordersComponent implements OnInit {
  [x: string]: any;
  imageList: any;
  mfFooterData: any;
  data:any;
@Input() Medicines:any
@Input() productImage:any


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
currentMode:any=1;
goldFooterData:any;


  constructor(private http: HttpClient, private allConfigDataService: AllConfigDataService, private router: Router, public modalController: ModalController, private loaderService: LoaderService) {
    this.apiCatalog={
      ...this.allConfigDataService.getConfig('apiCatalog'),
    };
    this.appEnviron = this.allConfigDataService.getConfig('environmentType');
    this.breadCrumb='Shopping/Health/Lab';
   }

  async openCardDetails(orderId:any) {

    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: OrderDetailsComponent,
      componentProps: {
      "OrderId":orderId,

      },
      backdropDismiss: false
    });
    modal.onDidDismiss()
      .then((data) => {
        if (data && data?.data) {
          console.log("Save data");

        }
      });
    this.loaderService.hideLoader();
    return await modal.present();
  }


  dismiss(){
    this.modalController.dismiss()
  }

  ngOnInit() {
    this.getUserOrderDetailsApi();
    // this.mfFooterData =  this.allConfigDataService.getConfig('labTest');

    this.goldFooterData = this.allConfigDataService.getConfig('labTest');
    this.imageList = this.allConfigDataService.getConfig('images')
    this.data=myOrder;
  }


  toggleID() {
    this.showSerchBar = !this.showSerchBar;
    this.showHeader = false;
    this.filterIcon = false;
  }

  searchBarBack() {
    this.showHeader = true;
    this.showSerchBar = false;
    this.filterIcon = true;
  }

  clearSearchIcon() {
    this.searchIcon = false;
    this.closeIcon = true;
  }

  getUserOrderDetailsApi() {
    // this.loaderService.showLoader()
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
    });

    let params = {
      "CustGuId": localStorage.getItem('CustGuId')
    }

    // this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/getOrderByUser", params, { headers }).subscribe(async (res: any) => {
    this.http.post(this.apiCatalog.baseURL[this.appEnviron]+this.breadCrumb+this.apiCatalog.getOrderByUser, params).subscribe(async (res: any) => {

      console.log("New Order details list data", res);

      this.data = res.data;

    },

    )

  }

}
