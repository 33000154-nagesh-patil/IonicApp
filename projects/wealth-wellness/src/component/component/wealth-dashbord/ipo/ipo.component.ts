import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LogarithmicScale } from 'chart.js';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';
import { ApplyIpoComponent } from '../apply-ipo/apply-ipo.component';

// import { AllConfigDataService } from '../../services/all-config-data.service';

@Component({
  selector: 'lib-ipo',
  templateUrl: './ipo.component.html',
  styleUrls: ['./ipo.component.scss'],
})
export class IpoComponent implements OnInit {
  imageList: any;
  AboutCompany: boolean = false;
  segmentArray: any = ["current","upcoming","closed"];
  segments:any;
  tatvaCh: boolean = true;
  ShowMore: boolean = true;
  ShowLess: boolean = false;
  Name:any="Tata";
  constructor(private allConfigDataService: AllConfigDataService,
    private router:Router, private modalCtrl:ModalController) { }

  ngOnInit() {
    this.imageList=this.allConfigDataService.getConfig('images');
    this.segments = "current";
  }
  tatvaChintan(){
    this.tatvaCh = false;

  }
  CompanyInfo(){
    this.AboutCompany = true;
    console.log("hiiiiii");

  }
  handleOnClick(){
    console.log(this.segments);

  // this.segments = x;

  }
  showLessContent(){
    this.ShowLess=true;
  }
  goBack(){
    this.router.navigate(['Stocks/Dashboard'])
  }
 applyIpo(){
    // const modal = await this.modalCtrl.create({
    //   component: ApplyIpoComponent,
    //   componentProps: {
        // imageList: this.imageList,
        // name:this.Name
    //   }
    // })
    // modal.onDidDismiss().then((data) => {

    // })
    // modal.present();
//apply-ipo
this.router.navigate(['stocks/apply-ipo'], { state: {  imageList: this.imageList,name:this.Name } })
  }
}
