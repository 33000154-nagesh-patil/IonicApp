import { Component, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { LoaderService } from '../../services/loader.service';
@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  @Input() footerListData: any;
  @Input() activeImg: any;
  @Input() selectedIndex: any;
  @Input() parentTab: any;

  @Output() getHealthMainPage = new EventEmitter();
  @Output() getEducationMainPage = new EventEmitter();
  getHealthLabMainPage: any;
  constructor(private router: Router, private loaderService: LoaderService) { }

  ngOnInit() {
  }
  selectTab(event) {
    //this.loaderService.showLoader();
    console.log("event", event)
    // console.log("index position",indexOfelement)
    if (this.parentTab === 'wellness') {
      this.wellnessTabEvent(event)
    }
    if (this.parentTab === 'mf' || this.parentTab === 'Mutual Fund') {
      this.mfTabEvent(event);
    }
    if (this.parentTab === 'Lifestyle') {
      this.lifeStyleTabEvent(event);
    }
    if (this.parentTab === 'Health') {
      this.healthTabEvent(event)
    }

    if (this.parentTab === 'labTest') {
      this.labTestTabEvent(event)
    }
    if (this.parentTab === 'Education') {
      this.educationTabEvent(event)
    }
    if (this.parentTab === 'wealthStocks') {
      this.wealthStocksTabEvent(event)
    }
    //this.loaderService.hideLoader();
    //this.currentIndex = event
  }

  healthTabEvent(event) {
    // console.log("healthTabEvent", event)
    if (!event) {
      // console.log("healthTabEvent1", event)
      this.router.navigate(['/Dashboard']);
    } else {
      if (event === 'Health') {
        // console.log("healthTabEvent2", event)
        this.getHealthMainPage.emit('Health')
      } else {

        // console.log("healthTabEvent3", event)
        this.router.navigate(['/' + event]);
      }
    }
  }

  educationTabEvent(event) {
    // console.log("educationTabEvent", event)
    if (!event) {
      // console.log("educationTabEvent1", event)
      this.router.navigate(['/Dashboard']);
    } else {
      if (event === 'Education') {
        // console.log("educationTabEvent2", event)
        this.getEducationMainPage.emit('Education')
      } else {
        // console.log("educationTabEvent3", event)
        this.router.navigate(['/' + event]);
      }
    }
  }

  lifeStyleTabEvent(event) {
    // console.log("lifeStyleTabEvent", event)
    if (!event) {
      this.router.navigate(['/Dashboard']);
    } else {
      this.router.navigate(['/' + event]);
    }
  }

  wellnessTabEvent(event) {
    // console.log("eventTab", event)
    if (!event) {
      // console.log("eventTab1", event)
      this.router.navigate(['/Dashboard']);
    } else {
      // console.log("eventTab2", event)
      this.router.navigate(['/' + event]);
    }
  }

  mfTabEvent(event) {
    // console.log("eventTab", event)
    if (!event) {
      return false;
    } else {
      this.router.navigate(['/' + event]);
    }
  }




  labTestTabEvent(event: any) {
    console.log("labTestTabEvent", event)
    if (!event) {
      // console.log("educationTabEvent1", event)
      this.router.navigate(['/exlore-lab-health']);
    } else {
      if (event === 'labTest') {
        this.getHealthLabMainPage.emit('labTest')
        // console.log("educationTabEvent2", event)
      } else {
        // console.log("educationTabEvent3", event)
        this.router.navigate(['/' + event]);
      }
    }
  }

  wealthStocksTabEvent(event) {
    console.log("wealthStocksTabEvent", event)
    if (!event) {
      return false;
    } else {
      this.router.navigate(['/' + event]);
    }
  }
}
