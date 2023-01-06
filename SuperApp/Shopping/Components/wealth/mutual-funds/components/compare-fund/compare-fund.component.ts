import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { MFServiceService } from 'projects/core/src/lib/services/mfservice.service';
import { Button } from 'protractor';
import { CompareFundsComponent } from '../compare-funds/compare-funds.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'lib-compare-fund',
  templateUrl: './compare-fund.component.html',
  styleUrls: ['./compare-fund.component.scss'],
})
export class CompareFundComponent implements OnInit {
  @Input() imageList: any;
  @Input() selectedCard: any
  policyCheckBox: boolean;
  MoreThan3error: any
  asd: any;
  bookmarkdata: any = [];
  DummayAPiData: any = [];
  value: any;
  clicked: boolean;
  CompareList: any = [];
  selectForCompare: boolean;
  filterCardData: any;
  duplicate: any;
  ButtonDisabal: boolean = true;
  loadingPageCount: number = 0;
  infiniteLoad: any;
  emptyCart: boolean;
  infiniteScroll: any;
  SearchValue: any;
  constructor(private MFService: MFServiceService, private router: Router, private http: HttpClient, private allConfigDataService: AllConfigDataService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.imageList = this.router.getCurrentNavigation().extras.state.imageList;
    this.selectedCard = this.router.getCurrentNavigation().extras.state.selectedCard;
    this.CompareList.push(this.selectedCard)
    this.asd = this.imageList['saveIcon']
    this.getNewFund(0)
    console.log(this.CompareList);

  }



  getbookmarkData(val) {
    if (this.asd == this.imageList["saveIcon"]) {
      this.asd = this.imageList["saveIcon2"];
    }
    else this.asd = this.imageList["saveIcon"];
    this.bookmarkdata[val] = [];
  }
  redirectTo() {
    this.modalCtrl.dismiss();
    window.history.back();
  }
  async onSubmit() {
    if (this.CompareList.length > 3) {
      this.MoreThan3error = true;
    } else if (this.CompareList.length == 1) {
      this.selectForCompare = true;
      setTimeout(() => {
        this.selectForCompare = false;
      }, 1000);
    } else {
      this.router.navigate(['/Shopping/Wealth/MutualFunds/compareFunds'], {
        state: {
          imageList: this.imageList,
          CompareList: this.CompareList
        }
      });
    }
  }
  getNewFund(val) {
    let data = {
      "strname": "",
      "sorting": "",
      "type": "All",
      "pageNo": val.toString(),
      "nRows": 10,
      "category_id": String(this.CompareList[0].category_id)
    };
    this.getNewFund1(data);
  }
  getNewFund1(obj) {
    this.MFService.getAllMFListByCategory(obj).subscribe((data: any) => {
      if (data) {
        if (this.loadingPageCount > 0) this.infiniteLoad.target.complete();
        if (!data.HasMoreData) this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
        if (!data.HasMoreData) {
          this.emptyCart = true
        } else {
          this.emptyCart = false
        }
        for (let i = 1; i < data.data.length; i++) {
          this.addData(data.data[i]);
          this.duplicate = data
        }
      }
    });
  }
  addData(val) {
    this.DummayAPiData.push(val)
  }
  changeBookmark(e) {
    if (e.plan_id) {
      this.value = e.plan_id
      e.plan_id = 0;
    } else {
      e.plan_id = this.value
    }
  }
  checkBox(event, e, index) {
    this.clicked = event.detail.checked;
    if (this.clicked) {
      this.CompareList.push(e)
    } else {
      this.CompareList.splice(index, 1);
    }
    if (this.CompareList.length > 3) {
      this.MoreThan3error = true;
      event.detail.checked = !event.detail.checked;
    }
    if (this.CompareList.length < 1) {
      this.ButtonDisabal = true
    } else {
      this.ButtonDisabal = false
    }
    console.log(this.CompareList, "click");

  }

  ViewAll() {
    this.MoreThan3error = false
  }

  successModalClose() {
    this.MoreThan3error = false
  }
  getdata(e) {
    if (e?.target?.value) {
      this.SearchValue = e
      setTimeout(() => {
        this.DummayAPiData = this.DummayAPiData.filter(function (str) { return (str?.basic_name).toUpperCase().includes((e.target.value).toUpperCase()); });
      });
    }
    else {
      this.DummayAPiData = this.duplicate
    }
  }
  onScroll(val) {
    this.infiniteLoad = val;
    setTimeout(() => {
      this.loadingPageCount++;
      this.getNewFund(this.loadingPageCount)
      this.getdata(this.SearchValue)
    }, 1000);
  }
}
