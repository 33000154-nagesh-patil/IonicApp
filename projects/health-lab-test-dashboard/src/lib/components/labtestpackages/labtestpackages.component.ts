import { LoaderService } from './../../../../../core/src/lib/services/loader.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Component, OnInit } from '@angular/core';
import labpackages  from 'src/assets/labpackages.json';
import labpackagesimg from 'src/assets/labpackagesimg.json';
import explorelabdata from 'src/assets/labreports.json'
import { CameraComponent } from 'projects/core/src/lib/components/camera (1)/camera/camera.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProductDescLabComponent } from 'projects/core/src/lib/components/product-desc-lab/product-desc-lab.component';

@Component({
  selector: 'lib-labtestpackages',
  templateUrl: './labtestpackages.component.html',
  styleUrls: ['./labtestpackages.component.scss'],
})
export class LabtestpackagesComponent implements OnInit {
  data:any;
  data3: any;
  data1: any;
  data2 : any;
  rupeesSymbol: any;
  getCurrency: any;
  imageList: any;
  dataList: any;
  topLimit:number=5;

  constructor(private loaderService: LoaderService, private modalController: ModalController,  private allConfigDataService: AllConfigDataService, private http: HttpClient, private modalCtrl:ModalController, private allconfigdataservice: AllConfigDataService, private router: Router, private modalcontroller: ModalController) { }

  ngOnInit() {
    // this. getProductApi();
    this.data3 = labpackages;
    this.data1 = labpackagesimg;
    this.data2 = explorelabdata;
    this.getCurrency = this.allconfigdataservice.getConfig('listCodeCountry');
    this.rupeesSymbol = this.getCurrency['IND']['currencySymbol'];
    this.imageList = this.allConfigDataService.getConfig('images');
  }

  async handleCamera(){
    this.modalCtrl.dismiss()
     const modal = await this.modalCtrl.create({
       component:CameraComponent,
       componentProps: {
         'imageList': this.imageList,
         // 'name': this.title
       },
       backdropDismiss: false
     });
     modal.onDidDismiss()
       .then((data) => {
         console.log(data);

       });
     // this.loaderService.hideLoader();
     return await modal.present();
  }

  handleExplore(){
    this.router.navigate(['explore-lab-health'])
  }

  getProductApi() {
    let headers: HttpHeaders = new HttpHeaders({
      "Token": "MzNkYTg3ZGYtYzkwNS00OTk2LTllZmItMWI2ZTM4OGU1YTNi"
    });
    let params = {
      "app": "BHealthy",
      "action": "LoadLogics",
      "url": "apps/ShoppersSpot/Items/ItemVendorMap.vws",
      "item_type_name": "Pop",
      "session_id": " 81703207"
    }
    this.http.post("https://apixuat.heytorus.com/api/v1/Call/Shopping/Health/Lab/ProductList", params, { headers }).subscribe((res: any) => {
      // console.log("New product list data", res);
// this.loaderService.showLoader()

      this.data = res.productlist;
      this.dataList = this.data.slice(0, this.topLimit)
      console.log("Data==============>",this.dataList );
// this.loaderService.hideLoader()

    },
    )

  }

  async handleClick(name: any) {

    this.loaderService.showLoader();
    const modal = await this.modalController.create({
      component: ProductDescLabComponent,
      componentProps: {
        "name": name
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


}
