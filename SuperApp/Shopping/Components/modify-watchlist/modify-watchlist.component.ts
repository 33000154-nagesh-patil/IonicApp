import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';

@Component({
  selector: 'app-modify-watchlist',
  templateUrl: './modify-watchlist.component.html',
  styleUrls: ['./modify-watchlist.component.scss'],
})
export class ModifyWatchlistComponent implements OnInit {

  @Input() imageList: any;
  WatchlistNameValue = [];
  nse = [
    'NSE'
  ];
  ClientCode: any;
  create: boolean = true
  @Input() watchList: any;
  watchListNewName: any;
  deleteData: any;
  watchlistRemoveMsg: any;
  deletedSuccessFully: any = false;
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.WatchlistNameValue, event.previousIndex, event.currentIndex);
  }

  constructor(private modalctrl: ModalController, private http: HttpClient, private allconfig: AllConfigDataService, private router: Router) { }


  ngOnInit() {}

}
