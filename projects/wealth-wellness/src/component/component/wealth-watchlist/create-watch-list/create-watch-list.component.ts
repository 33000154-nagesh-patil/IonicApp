import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-create-watch-list',
  templateUrl: './create-watch-list.component.html',
  styleUrls: ['./create-watch-list.component.scss'],
})
export class CreateWatchListComponent implements OnInit {
  APIWatchlistName: any;
  message: any;
  create: any = true;
  ClientCode: string;
  imageList: any;
  constructor(private http: HttpClient, private modalCtrl: ModalController, private allConfigDataService:AllConfigDataService ) {
    this.imageList = this.allConfigDataService.getConfig('images');

  }

  ngOnInit() { }


  CreatebuttonWatchList() {
    this.ClientCode = localStorage.getItem('ClientID');
    let data = {
      "entity_id": "123456",
      "source": "A",
      "token_id": "b72d763f83bb8393a493",
      "iv": "o5507uAmo3eDCZ1ZJ2Q+gA==]",
      "data": {
        "client_id": this.ClientCode,
        "wl_name": this.APIWatchlistName
      }
    }

    this.http.post("https://apixuat.heytorus.com/api/v1/wealth/stock/Mpost/CreateWatchList", data).subscribe(
    //   (res: any) => {
    //     this.create = !this.create
    //     if (res) {
    //       this.message = res.message;
    //     }

    //     if (this.APIWatchlistName == '') {
    //       this.message = res.message;
    //     }
    //   })


    // this.http.post(this.environmentAPIList?.baseURL + this.environmentAPIList?.CreateWatchList, data).subscribe(
      (res: any) => {
        this.create = !this.create
        if (res) {
          this.message = res.message;
        }

        if (this.APIWatchlistName == '') {
          this.message = res.message;
        }
      }
    )
  }

  dismiss() {
    this.modalCtrl.dismiss(this.APIWatchlistName);
  }
}
