import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit } from "@angular/core";
import { filter, finalize, takeUntil } from "rxjs/operators";
import { UnsubBehaviour } from "src/app/unsubscribe.class";
import { WebSocketServiceForStocks } from "SuperApp/Shopping/Services/stockswebsocket.service";



@Component({
    selector:'app-stock-card',
    template: `
    <ion-row class="m-0">
          <ion-col class="custColorDark p-0  muli-14pt custFontFamilyMuliSemiBold text-nowrap">
            {{ stock.row1.title }}
          </ion-col>
          <ion-col class="custFontFamilyMuliSemiBold p-0 custLineHight20 muli-14pt custColorDark text-end text-nowrap">
            {{ stock.row1.price }}
          </ion-col>
        </ion-row>
        <ion-row class="m-0">
          <ion-col class="custFontFamilyMuliSemiBold p-0 muli-12pt custLineHight16 custColorBattlePGry text-nowrap">
            {{ stock.row2.ExchangeName }}
          </ion-col>
          <ion-col class="d-flex justify-content-end p-0 text-end">
            <span class="muli-12pt itemCol  text-end text-nowrap custGreenCol">
              <ion-icon name="caret-up" class="custGreenTick" *ngIf="stock.row2.lossAndGain > 0"></ion-icon>
              <ion-icon name="caret-down" class="custRedTick" *ngIf="stock.row2.lossAndGain < 0"></ion-icon>
              {{ stock.row2.lossAndGain }}{{stock.row2.lossAndGainPer}}
            </span>&nbsp;
          </ion-col>
        </ion-row>
    `,
    styleUrls:['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockCard extends UnsubBehaviour implements OnInit,OnDestroy {
    @Input() stock:any;
    constructor(
        private stockService: WebSocketServiceForStocks,
        private changeDetectorRef:ChangeDetectorRef
        ) {
        super()
    }
    ngOnInit(): void {
        let name = this.stock.row1.title.split("-");
        if(["FUT","PE","CE"].includes(name[name.length - 1])){
          this.stockService.sendData(12,this.stock.row1.id,2)
        }
      else this.stockService.sendData(12,this.stock.row1.id,this.stock.row2.ExchangeName=="NSE"?1:4)
        this.stockService.currentMessage
        .pipe(takeUntil(this.UnSubscribe),
        filter((res:any) => res.SEC_ID == this.stock.row1.id)
        )
        .subscribe(async (item:any) =>{
          if (this.stockService.time> 55800&&item.msgCode1 == 3) this.stock.row1.fClose = item.PClose;
          else if(this.stockService.time<=55800&&item.fifthmsgCode == 32) this.stock.row1.fClose = item.fClose;
          if(item.msgCode==1){
            this.stock.row1.price = Number(item.LTP?.toFixed(2))
            //  this.stock.row1.fClose = item.fClose
            this.stock.row1.price = Number(item.LTP?.toFixed(2));
            this.stock.row2.lossAndGainPer = "(" + (((item.LTP - Number(this.stock.row1.fClose)) / item.LTP) * 100)?.toFixed(2) + "%)";
            this.stock.row2.lossAndGain = Number((item.LTP - this.stock.row1.fClose).toFixed(2));
            this.changeDetectorRef.detectChanges()
          }
        })
    }
    @HostListener('unloaded')
    ngOnDestroy(): void {
      let name = this.stock.row1.title.split("-");
        if(["FUT","PE","CE"].includes(name[name.length - 1])){
          this.stockService.sendData(13,this.stock.row1.id,2)
          }
        else this.stockService.sendData(13,this.stock.row1.id,this.stock.row2.ExchangeName=="NSE"?1:4)
        // this.stockService.stopData(this.stock.row1.id,this.stock.row2.ExchangeName?this.stock.row2.ExchangeName:"NSE")
    }
}