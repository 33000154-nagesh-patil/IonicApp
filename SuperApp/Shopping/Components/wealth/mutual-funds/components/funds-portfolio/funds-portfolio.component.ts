import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';


@Component({
  selector: 'lib-funds-portfolio',
  templateUrl: './funds-portfolio.component.html',
  styleUrls: ['./funds-portfolio.component.scss'],
})
export class FundsPortfolioComponent implements OnInit {
  imageList: any = [];
  currencySymbol: any;
  currencyList: any;
  @Input() DummayAPiData: any;
  DataForView=[]
  index: number;
  ViewAllBtn: boolean=true;

  constructor(private modalCtrl:ModalController,private allConfigDataService: AllConfigDataService,private router: Router,private http:HttpClient) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.currencyList = this.allConfigDataService.getConfig('listCodeCountry')
    this.currencySymbol = this.currencyList['IND']['currencySymbol']
    this.DataForView=[]
    let data= setInterval(()=>{
     
      if(this.DummayAPiData){
       this.ViewMore()
       clearInterval(data)
      }  
     },500)

}

ViewMore(){
  this.index=0;
 while(this.index<=2 && this.index<this.DummayAPiData.length){
   this.DataForView.push(this.DummayAPiData[this.index]);
   this.index++;
 }
 if(this.index==this.DummayAPiData.length){
   this.ViewAllBtn=false
 }

}



async ShowCardDetails(date: any) {
  this.router.navigate(['/'])
  // let eventEmitter = new EventEmitter();
  // eventEmitter.subscribe((res)=>{
  //   console.log(res);

  // })
  // const modal = await this.modalCtrl.create({
  //   component:MyInvestmentComponent,
  //   componentProps:{
  //     'imageList':this.imageList,
  //     'event':eventEmitter,
  //     'SelectedCard':date,
  //     'DummayApi':this.DummayAPiData,
  //   },
  //   backdropDismiss:false
  // });
  // modal.onDidDismiss().then((data) => {
  //   if(data.data=="1"){
  //     setTimeout(() => {
  //       this.modalCtrl.dismiss("1");
        
  //     });
  //      }
  // })
  // return await modal.present();
}

  }


