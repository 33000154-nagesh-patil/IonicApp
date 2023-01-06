
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-edit-watch-list',
  templateUrl: './edit-watch-list.component.html',
  styleUrls: ['./edit-watch-list.component.scss'],
})
export class EditWatchListComponent implements OnInit {
  @Input() imageList: any;
  WatchlistNameValue = [];
  nse = ['NSE'];
  confirmation: any = false
  ClientCode: any;
  watchlistRename: any;
  Rename: any = false;
  delete: boolean=false;
  removeWl: any;
  create: boolean = true;
  breadCrumb: string="Wealth/ST";
  newWatchList: any;
  @Input() set data(val){
    console.log(val,"--------editWatchList2022-----",);
    this.getWatchList(val.value)
  }
  apiCatalog: any = {
    ...this.allConfigDataService.getConfig('apiCatalog'),
    environment: this.allConfigDataService.getConfig('environmentType'),
  };
  appEnvironment = this.allConfigDataService.getConfig('environmentType');
  @Input() APIWatchlistName: any
  watchListNewName: any;
  // APIWatchlistName: any
  deleteData: any;
  watchlistRemoveMsg: any;
  deletedSuccessFully: any = false;
  environmentAPIList: any;
  GetList:any
  drop(event) {
    moveItemInArray(
      this.WatchlistNameValue,
      event.previousIndex,
      event.currentIndex
    );
  }
  constructor(
    private modalctrl: ModalController,
    private http: HttpClient,
    private allConfigDataService: AllConfigDataService,
    private router: Router
  ) {
    this.environmentAPIList = this.allConfigDataService.getCurrentApiList();
  }
  ngOnInit() {
    this.ClientCode = localStorage.getItem('ClientID');

    this.imageList = this.allConfigDataService.getConfig('images');
  }

  dismiss() {
    this.router.navigate(['/stocks/WatchList']);
    this.modalctrl.dismiss();
  }
  deleteWatchlistName(){}
  updateWatchList(){
    let param={
      "pageNo": "",
    "rowCount": "",
    "typeName": "",
    "favList":this.newWatchList,
    "sort": "",
    "filter": "Rename",
    "TokenId": localStorage.getItem("id_token"),
    "OtherDetails": {
      "wl_id" :  this.WatchlistNameValue
  }

}
this.http.post(this.apiCatalog.baseURL[this.appEnvironment] + "Shopping/" + this.breadCrumb +this.apiCatalog.editFavListModify,param).subscribe((res: any) => {
  this.watchlistRename= res.message
  console.log( this.watchlistRename,"---------------editWatchList22----------");


this.modalctrl.dismiss();
})
  }
  removeStock(val){
    let param={
      "pageNo": "",
    "rowCount": "",
    "typeName": "",
    "favList": this.WatchlistNameValue,
    "sort": "",
    "filter": "DeleteSymbol",
    "TokenId":localStorage.getItem("id_token"),
    "OtherDetails": {
        "sec_id": val.row1.id,
        "exch": val.row2.ExchangeName,
        "segment": "E"
    }
    }
    this.http.post(this.apiCatalog.baseURL[this.appEnvironment] + "Shopping/" + this.breadCrumb +this.apiCatalog.editFavListModify,param)
    .subscribe((res: any) => {
      this.watchListNewName.splice(this.watchListNewName.indexOf(val),1)
    })
  }

  dismissmessage() {
    this.modalctrl.dismiss();
  }

getWatchList(val){
  this.WatchlistNameValue=val;

  let param = {
    "pageNo": 0,
    "rowCount": 15,
    "typeName": "",
    "favList": val,
    "sort": "",
    "filter": "",
    "TokenId": localStorage.getItem("id_token"),
  }
  this.http.post(this.apiCatalog.baseURL[this.appEnvironment] + "Shopping/" + this.breadCrumb +this.apiCatalog.getList,param).subscribe((res: any) => {

    this.watchListNewName = res.card;
    console.log(this.watchListNewName,"---------mission2023--------");

  })

}
setNewName(event){
  this.newWatchList=event.target.value
}

removeStockFromWL(){

  let param = {
      "pageNo": "",
      "rowCount": "",
      "typeName": "",
      "favList":this.WatchlistNameValue,
      "sort": "",
      "filter": "Delete",
      "TokenId": localStorage.getItem("id_token"),
      "OtherDetails": {}

  }
  this.http.post(this.apiCatalog.baseURL[this.appEnvironment] + "Shopping/" + this.breadCrumb +this.apiCatalog.editFavListModify,param).subscribe((res: any) => {
  this.removeWl = res.message
  console.log(this.removeWl,"---------------hnbxhjbxh-----------");
  this.confirmation=true;
  this.delete = true;
  this.create = false;
  // this.modalctrl.dismiss();
  })
}

}

