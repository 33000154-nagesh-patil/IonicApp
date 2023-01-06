import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { UnsubBehaviour } from "src/app/unsubscribe.class";
import { WebSocketServiceForStocks } from "SuperApp/Shopping/Services/stockswebsocket.service";

@Component({
    selector:'app-MBP',
    template:`
    <div *ngIf="db|async as stockDB">
        <!-- <div *ngFor="let x of stockDB">  -->
          <div *ngIf="stockDB.SEC_ID==secId&&(stockDB.msgCode == 6||stockDB.fourmsgCode==2)">
            <ion-row *ngFor="let c of stockDB.MBP">
              <ion-col class="d-flex justify-content-between">
                <span class="custColorParakeetGreen">{{c[0]}} &nbsp;</span>
                <span class="custColorParakeetGreen">{{c[1].toFixed(2)}} &nbsp;</span>
                <span class="custColorParakeetGreen">{{c[2]}} &nbsp;</span>
              </ion-col>
              <span style="border-left:1px solid #000;height:25pt"></span>
              <ion-col  class="d-flex justify-content-between">
                <span class="custColorcustFadedRed">{{c[3]}} &nbsp;</span>
                <span class="custColorcustFadedRed">{{c[4].toFixed(2)}} &nbsp;</span>
                <span class="custColorcustFadedRed">{{c[5]}} &nbsp;</span>
              </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    {{stockDB.iTotalBuyQty}}
                </ion-col>
                <ion-col>
                    Total Quantity
                </ion-col>
                <ion-col>
                    {{stockDB.iTotalSellQty}}
                </ion-col>
            </ion-row>

          </div>
        <!-- </div> -->
      </div>
      `,
    styleUrls:['./detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MBPComponent extends UnsubBehaviour implements OnInit {
    @Input() secId = 3045;
  db:Observable<any>=this.stockService.currentMessage
    constructor(
        private stockService:WebSocketServiceForStocks
    ){
        super();
    }
    ngOnInit(): void {
        
    }
    
}