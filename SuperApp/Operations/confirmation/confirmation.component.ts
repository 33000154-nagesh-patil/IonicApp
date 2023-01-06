import { AllConfigDataService, LoaderService } from 'index';
import { CommonFunctionService } from 'projects/core/src/lib/services/common-function.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'projects/core/src/lib/services/alert.service';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { TorusbannerComponent } from 'SuperApp/Fulfillment/Components/torusbanner/torusbanner.component';

// import { PausableObservable} from 'rxjs-pausable';
@Component({
  selector: 'ope-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  imageList:any
  title1:any
  title2:any
  Params:any
  Data: any = {}  
  routing: any = "";
  listing: any;
  listing1: any;
  SelectedCard:any
  ConfirmtionValue:any
  Currentdate: any;
  apiCatalog: any = {
    ...this.allconfig.getConfig('apiCatalog'),
    "environment": this.allconfig.getConfig('environmentType'),
    // "breadCrumb": "Onboarding"
  };
  @Input() data:any
  name = 'Angular';
  paused = true;
  // pausable: PausableObservable<number>;
  constructor(private allconfig:AllConfigDataService,
    private modalctrl:ModalController,
    private commonfunction: CommonFunctionService,
    private loaderService:LoaderService,
    private alertService:AlertService,
    private eduService: eduService, private router: Router, private http: HttpClient,) { }

  ngOnInit() {
    this.imageList=this.allconfig.getConfig("images")
    setTimeout(() => {
      this.getvalue()
    });
    setTimeout(() => {
      this.toruspopup();
    },2500)
    // var intervsl = setInterval(() => {this.click()}, 1000)
    // setTimeout(() => {
    //   clearInterval(intervsl)
    // }, 15000);
  }
  async toruspopup() {
    const modal = await this.modalctrl.create({
      component: TorusbannerComponent,
      cssClass: 'all-brands-modal',
      componentProps:{
        'allData':""
      },
      backdropDismiss: true
    });
    modal.onDidDismiss()
      .then((data) => {
       
      });
    return await modal.present();
 }
  
  click() {
    this.shoot();
  }

  shoot() {
    try {
      this.confetti({
        startVelocity:50,
        particleCount: 200,
        angle: 85,
        spread: 120,
        origin: { x: 0,y:0 },
        // colors: this.colors,
      });
      this.confetti({
        startVelocity:50,
        particleCount: 100,
        angle: 95,
        spread: 120,
        origin: { x: 1,y:0 },
        gravity:0.3
        // colors: this.colors,
      });
    } catch(e) {
      // noop, confettijs may not be loaded yet
    }
  }
  confetti(args: any) {
    return window['confetti'].apply(this, arguments);
  }
  async getvalue() {
    this.eduService.orderConfirm.subscribe(async (res:any) => {
      this.ConfirmtionValue = res;
    })
  }


  backF(){
    // this.modalctrl.dismiss()
    window.history.back();

  }


  openPortfolio(){
    // this.modalctrl.dismiss("1");
    this.router.navigate(['/Operation/Vault']);

  }
}
