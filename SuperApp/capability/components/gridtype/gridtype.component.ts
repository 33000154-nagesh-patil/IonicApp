import { eduService } from 'SuperApp/Shopping/Services/edu.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AllConfigDataService, CommonService } from 'index';
import { WebSocketServiceForStocks } from 'SuperApp/Shopping/Services/stockswebsocket.service';
import { interval, Subject } from 'rxjs';
import { switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { UnsubBehaviour } from 'src/app/unsubscribe.class';


// const autocomplete = (time, selector) => (source$) =>
//   source$.pipe(
//     debounceTime(time),
//     switchMap((...args: any[]) =>
//       selector(...args)
//         .pipe(
//             takeUntil(
//                 source$
//                     .pipe(
//                         skip(1)
//                     )
//             )
//         )
//     )
//   )





@Component({
  selector: 'app-gridtype',
  templateUrl: './gridtype.component.html',
  styleUrls: ['./gridtype.component.scss'],
})
export class GridtypeComponent extends UnsubBehaviour implements OnInit, OnDestroy {
  data: any;
  @Input() set objectContent(val) {
    this.data = val;
    this.stockIndex(val)
  }
  imageList: any;
  routing: any;
  headerTitle: any;
  constructor(private allConfigDataService: AllConfigDataService,
    public commonService: CommonService,
    private router: Router,
    private eduService: eduService,

    private changeDetection: ChangeDetectorRef

  ) {
    super();
  }
  ionViewDidLeave(): void {


  }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
    this.headerTitle = this.eduService.getheaderName()

  }
  stockIndex(val) {
    // let arr = this.data.filter(val => val.type === 'grid' && val?.content)
    // this.stockWebSocket.currentMessage
    //   .pipe(takeUntil(this.UnSubscribe))
    //   .subscribe(async (res: any) => {
    //     for (let y of arr) {
    //       const found = res.some(e => e.SEC_ID == y.id)
    //       if (!found) this.stockWebSocket.sendTemporary(y.id)
    //       else {
    //         res.map(e => {

    //         })
    //       }
    //     }
    ////////////////////////
    // for(let x of this.data){
    //   if(x.type === 'grid'&& x?.content){
    //     for(let y of x?.content){
    //       if(res.previousClose&&y.id){
    //         const found = res.previousClose.some(e => e.SEC_ID == y.id)
    //         if (!found) this.stockWebSocket.sendTemporary(y.id)
    //         // console.log(res.previousClose)
    //         for(let i of res.previousClose){
    //           if (i.SEC_ID == y.id)  {
    //             if(i.LTPval>0.5){
    //               y.cardDescription = Number(i.LTPval).toFixed(2);
    //               y.lossAndGainPer = "(" + i.PerChange.toFixed(2) + "%)";
    //               y.lossAndGain = i.Change.toFixed(2);
    //               y.color=i.Change>0?'custColorParakeetGreen':i.Change<0?'custColorcustFadedRed':'custColorBattlePGry';
    //               break;
    //             }
    //           }
    //         }
    //         // console.log(res.val,res.secid,res.secid == y.id,"slice");

    //         if (res.secid == y.id)  {
    //           y.cardDescription = Number(res.val).toFixed(2);
    //           this.changeDetection.detectChanges()
    //         }
    //       }
    //       else {
    //         // if(y?.id)this.stockWebSocket.sendTemporary(y.id)
    //       }
    //     }
    //   }
    // }
    // })
    // .pipe(takeUntil(this.$destroy))
    // .subscribe(async (res:any) => {
    //   for(let x of this.data){
    //     if(x?.type=='grid'){
    //       for(let y of x?.content){
    //         if(res.previousClose){
    //           const found = res.previousClose.some(e => e.SEC_ID == y.id)
    //           if (!found) this.stockWebSocket.sendData(y.id, y.exchange)
    //           for(let i of res.previousClose){
    //             if (i.SEC_ID == y.id)  {
    //               if(i.LTPval>0.5){
    //                 y.cardDescription = Number(i.LTPval).toFixed(2);

    //               }
    //               break;
    //             }
    //             // x.listChange = x.price-

    //           }
    //         }
    //         else {
    //           this.stockWebSocket.sendData(y.id, y.exchange)
    //         }
    //       }
    //     }
    //   }
    // })

  }

  print(x, y) {
    // if(x=='Neo bank')this.router.navigate(['neoBankOnboarding/Pan'])

    // console.log(x);
    this.eduService.setheaderName(x);
    if (y == "Courses") {
      this.eduService.setheaderName(y);
      setTimeout(() => {
        this.router.navigate(['/Shopping/listing']);
        this.commonService.footerData.next(y)

      })
    }
    if (y == "Assessment") {
      this.eduService.setheaderName(y);
      setTimeout(() => {
        this.router.navigate(['/Shopping/listing']);
        this.commonService.footerData.next(y)

      })
      //HealthDoc


    }
    if (y == "Upload Now") {
      this.eduService.setheaderName(y);
      setTimeout(() => {
        this.router.navigate(['/Shopping/HealthDoc']);
        this.commonService.footerData.next(y)
      })
    }
    this.changeValueForList(x);


  }


  public changeValueForList(name) {
    switch (name) {
      case 'Gold':
        this.changeBreadcrum('DG');
        break;
      case 'Mutual Fund':
        this.changeBreadcrum('MF');
        break;
      case 'Stock':
        this.changeBreadcrum('ST');
        break;
      case 'Wealth Robo Advisory':
        this.changeBreadcrum('RoboAdvisory');
        break;
      case 'Courses':
        this.changeBreadcrum('Courses');
        break;
      case 'Jobs':
        this.changeBreadcrum('Job');
        break;
      case 'Assessment':
        this.changeBreadcrum('Assessment');
        break;
      case 'Lab Test':
        this.changeBreadcrum('LabTest');
        break;
      case 'Medicine':
        this.changeBreadcrum('Medicine');
        break;
      case 'Loans':
        this.changeBreadcrum('Las');
        break;
      case 'Bill Payments':
        this.changeBreadcrum('BillPayment');
        break;
      case 'Insurance':
        this.changeBreadcrum('Insurance');
        break;
      case 'Neo Bank':
        this.changeBreadcrum('NB');
        break;
      case 'Upload Now':
        this.changeBreadcrum('Upload Now"');
        break;
    }
    // })
    this.commonService.footerData.next(name)
  }

  changeBreadcrum(val) {
    let myObj = {}                  // method to store product value for Dynamic API calling.
    this.eduService.categoryValueForAPI.subscribe(obj => {
      obj["productLanding"] = val;
      myObj = obj;
      this.routing = "BillPayment"

    })
    this.eduService.categoryValueForAPI.next(myObj);
  }
}


@Component({
  selector: 'app-cardddynamic',
  templateUrl: './cardDynamic.html',
  styleUrls: ['./gridtype.component.scss'],
})
export class cardDescription extends UnsubBehaviour implements OnInit, OnDestroy {
  item: any;
  @Input() set data(val){
    if(val?.id)this.stockWebSocket.sendData(24,val?.id,0)
    this.item=val
  }

  constructor(
    private stockWebSocket: WebSocketServiceForStocks,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
    // let n = this.x.length;

  }
  ngOnInit(): void {
    this.stockWebSocket.currentMessage
        .pipe(takeUntil(this.UnSubscribe))
        .subscribe(async (message: any) => {
          
          if (this.item?.id == message.SEC_ID&&this.item?.id) {
            // console.log("Akshay")
            let lossAndGainPer, lossAndGain
            lossAndGainPer = (((message.LTP - message.fClose) / message.LTP) * 100).toFixed(2)
            lossAndGain = (message.LTP - message.fClose).toFixed(2);
            this.item.cardDescription = message.LTP.toFixed(2);
            this.item.lossAndGainPer = "(" + lossAndGainPer + "%)";
            this.item.lossAndGain = lossAndGain;
            this.item.color = lossAndGain > 0 ? 'custColorParakeetGreen' : lossAndGain < 0 ? 'custColorcustFadedRed' : 'custColorBattlePGry';
            this.changeDetectorRef.detectChanges()
          }
          // })

        })
  }
  
  ngOnDestroy(): void {
    if(this.item?.id)this.stockWebSocket.sendData(28,this.item?.id,0)
  }

}