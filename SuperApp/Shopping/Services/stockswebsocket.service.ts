
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Buffer } from 'buffer';

@Injectable({
  providedIn: 'root',
})
export class WebSocketServiceForStocks {
  reqBody = {
    Cid: 'A00048881',
  };

  // authRequest = {
  //   BOID: 'RSEC143',
  //   CID: 'R123456',
  //   Source: 'N',
  //   UTYPE: 'G',
  // };

  // authByteArrayRequestApi = {
  //   bHeader: {
  //     iRequestCode: 41,
  //     iMsgLength: 703,
  //     sClientId: 'R123456',
  //     sAuthToken: '706d0783e47c1285',
  //   },
  //   Authorization:
  //     'UqlahWZfHv8h4e29R0AM7U/XuJC/hsEJhsharbkARzYq0GPVXvc5uwrh6jBjaYRkiv0QdjEO+2Mb921XCv/LXQ==',
  //   Bid: 'RSEC143',
  //   Cid: 'R123456',
  //   Src: 'N',
  //   Utype: 'G',
  // };

  apiBaseUrl = 'https://apixuat.heytorus.com/SuperApp/';
  sendbyteArray = new Uint8Array();
  getbyteArray = new Uint8Array();

  count: number = 0;
  fBuyprice: any;
  fSellprice: number;
  LCkt: any;
  LTPval: any;
  private messageSource = new BehaviorSubject([]);
  currentMessage = this.messageSource.asObservable();
  sendMyData = new BehaviorSubject(new Uint8Array([]));
  restart: boolean = false;
  previousClose: any[] = [];
  //////////////////
  str = '';
  arr = [];
  arr2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  array3: any = [];
  asciival: any = [];
  requestArrayofObject: any[] = [];
  Change: any;
  PerChange: any;
  percentageChange: number;
  cid;
  PClose: any;
  time
  dataBase: any=[];

  constructor(private http: HttpClient) {
    let date = new Date()
    this.time = (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds()
    this.cid = this.makeid(3)+localStorage.getItem('ClientCode').slice(3,-1);

    this.NewByteCodeAuth();
  }

  webSocket: WebSocket;

  makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    // console.log(result, 'resultCID');
    return result;
  }

  NewByteCodeAuth() {
    let param = {
      Cid: this.cid,
      // Cid: "S000167942",
      
    };

    this.http
      .post(
        'https://apixuat.heytorus.com/SuperApp/Onboarding/OnboardingSteps/Token/getDetail?wsAuthentication',
        param
      )
      .subscribe(async (res: any) => {
        this.sendbyteArray = res.data;
        
        // console.log(this.sendbyteArray, 'sendBytearray');

        this.openWebsocket();
        setTimeout(() => {
          // this.sendMBPRequest()
          // this.sendData(152411, "FO")//wipro dec 2022 320 pe
          // this.sendData(86411, "FO")
          // this.sendData(142662, "FO")
          // this.sendData(11536, "NSE")
          // this.sendData(500112, "BSE")
          // this.sendData(3045, "NSE")
          // this.sendTemporary(25)
        }, 1000);

      });
  }
  sendMBPRequest() {
    let me =
      [23, 129, 0, 75, 65, 76, 80, 69, 83, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 255, 255, 255, 255, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 49, 49, 53, 51, 54, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    let bytearrayvalue = new Uint8Array(me);
    this.sendMyData.next(bytearrayvalue);
  }
  callApiAuth() {
    // this.reqBody.Cid=this.cid
    // console.log(this.reqBody.Cid,"reqBody");
    // this.authRequest.CID = this.cid;
    // console.log(this.authRequest.CID, 'ciiii');
    // this.authByteArrayRequestApi.bHeader.sClientId = this.cid;
    // this.authByteArrayRequestApi.Cid = this.cid;
    // console.log(this.authByteArrayRequestApi.bHeader.sClientId, 'cid');
    // this.postApi(
    //   this.apiBaseUrl,
    //   'api/v1/wealth/stock/Mpost/Authorization',
    //   this.authRequest
    // )
    //to get authorization code
    // .pipe()
    // .subscribe(async (res: any) => {
    //   // let param = {
    //   //   ...this.authByteArrayRequestApi,
    //   //   Authorization: res.Authorization,
    //   // };
    //   this.postApi(
    //     this.apiBaseUrl,
    //     'Onboarding/OnboardingSteps/Token/getDetail?wsAuthentication',
    //     this.reqBody
    //   )
    //     //to get byte array for WS authentication
    //     .pipe()
    //     .subscribe(async (res: any) => {
    //       console.log(res, "response");
    //       this.sendbyteArray = res.data;
    //       // sending autherntication code 703 length
    //       console.log(this.sendbyteArray, 'authcode');
    //       // if(!this.webSocket)
    //       this.openWebsocket();
    //     });
    // });
  }
  
  sendData(requestCode,id,exchangeNo){
    const requestJson = {
      "bHeader": {
        "iRequestCode": requestCode,
        "iMsgLength": 129,
        "sClientId": "002",
        "sAuthToken": ""
      },
      "ExchSeg": exchangeNo,
      "secIdxCode": -1,
      "ScripCount": 1,
      "WName": "",
      "scripId": {
        "ScripCode": id?.toString()
      }
    };
    // Create a Buffer object with a capacity of 129 bytes
    const requestBuffer = Buffer.alloc(129);
    // Pack the values of each field into the buffer
    requestBuffer.writeUInt8(requestJson.bHeader.iRequestCode, 0);
    requestBuffer.writeUInt8(requestJson.bHeader.iMsgLength, 1);
    requestBuffer.write(requestJson.bHeader.sClientId, 3, 33, 'utf-8');
    requestBuffer.write(requestJson.bHeader.sAuthToken, 33,83 ,"utf-8");
    requestBuffer.writeUInt8(requestJson.ExchSeg, 83);
    requestBuffer.writeInt32LE(requestJson.secIdxCode, 84);
    requestBuffer.writeUInt8(requestJson.ScripCount, 88);
    requestBuffer.write(requestJson.WName, 89, 109, 'ascii');
    requestBuffer.write(requestJson.scripId.ScripCode, 109, 129, 'ascii');
    // Convert the buffer to an array of integers
    const requestArray: number[] = Array.from(requestBuffer);
    //send
    let bytearrayvalue = new Uint8Array(requestArray);
    this.requestArrayofObject.push(bytearrayvalue);
    this.sendMyData.next(bytearrayvalue);
  }
  

  openWebsocket() {
    this.webSocket = new WebSocket(
      'wss://rsecpubuat.reliancesmartmoney.com:8861'
    );
    this.webSocket.binaryType = 'arraybuffer';

    this.webSocket.onopen = (event) => {
      let bytearrayvalue = new Uint8Array(this.sendbyteArray);
      this.webSocket.send(bytearrayvalue);
      for (let x of this.requestArrayofObject) {
        this.webSocket.send(x);
      }
      this.sendMyData.subscribe(async (res: any) => {
        if (res.length > 0) this.webSocket.send(res);
      });
    };

    this.webSocket.onmessage = (event) => {
      
      //COMMON_RESPONSE_HEADER_STRUCTURE
      let exch = new Uint8Array(event?.data?.slice(0, 1))[0];
      let scripId = new Uint32Array(event?.data?.slice(1, 5))[0];
      // let scripId1 = new Uint32Array(event?.data?.slice(5, 9))[0];//Spread BroadCast
      let msgLength = new Int8Array(event?.data?.slice(9, 10))[0];//-Length of packet to be received
      let msgCode = new Int8Array(event?.data?.slice(10, 11))[0];
      let msgCode1 = new Int8Array(event?.data?.slice(47, 48))[0];
      let fourmsgCode = new Int8Array(event?.data?.slice(109, 110))[0];
      let fifthmsgCode = new Int8Array(event?.data?.slice(239, 240))[0];
      let sixthmsgCode = new Int8Array(event?.data?.slice(258, 259))[0];
      let sixth2222msgCode = new Int8Array(event?.data?.slice(220, 221))[0];
      let sixth222msgCode = new Int8Array(event?.data?.slice(239, 240))[0];
      let sixth22msgCode = new Int8Array(event?.data?.slice(262, 263))[0];
      let sixth2msgCode = new Int8Array(event?.data?.slice(277, 278))[0];
      // console.log(sixth2222msgCode, sixth222msgCode, sixth22msgCode)
      //-Msg code to identify what type of packet has arrived. Refer to response code table
      let LTP: number,//-Last trade of stock
        LTQ,//Last trade quantity of stock
        Volume,//Total volume traded
        ATP,//Average trade price of stock
        OI,//Open intrest of contract will be 0 for equities
        LTT,//Last trade time
        LUT,//Last update time
        iTotalSellQty,//Total Sell quantity
        iTotalBuyQty,//-Total buy quantity
        iBuyqty,//Bid quantity
        iSellqty,//Ask quantity
        fBuyprice,//Bid price
        fSellprice,//Ask price
        fOpen,//Opening price of stock
        fClose,//Closing price of Stock
        fHigh,//High price of stock for current day
        fLow,//Low price of stock for a day
        LastTradePriceDiff,//Last trade price difference of spread pair
        iBuyordno,//Number of buy orders
        iSellordno,//-Number of Sell orders
        UCkt,//Upper circuit limit
        LCkt,//Lower circuit limit
        PClose,//Previous Price of Stock
        POI,//-Previous Open Interest of Stock
        F52WKHIGH,//52 week high of Stock
        F52WKLOW//52 week low of Stock
      let MBP = []
      let obj: any = {
        exchange:exch,
        SEC_ID:scripId
      }
      if (msgCode == 1)//Trade
      {
        LTP = new Float32Array(event?.data?.slice(11, 15))[0];
        LTQ = new Int16Array(event?.data?.slice(15, 19))[0];
        Volume = new Uint8Array(event?.data?.slice(19, 21))[0];
        ATP = new Float32Array(event?.data?.slice(21, 25))[0];
        OI = new Int16Array(event?.data?.slice(25, 29))[0];
        LTT = new Int16Array(event?.data?.slice(29, 33))[0];
        LUT = new Int16Array(event?.data?.slice(33, 37))[0];
        obj.LTP =LTP; obj.LTQ =LTQ; obj.Volume =Volume;
        obj.ATP =ATP; obj.OI =OI; obj.LTT =LTT;obj.LUT =LUT;
        obj.msgCode = msgCode;
      }
      //64+35=99;//99+11=110
      if (fourmsgCode == 2) {
        for (let i = 110; i < 210; i += 20) {
          iBuyqty = new Uint32Array(event?.data?.slice(i, i + 4))[0];
          iSellqty = new Uint32Array(event?.data?.slice(i + 4, i + 8))[0];
          iBuyordno = new Uint8Array(event?.data?.slice(i + 8, i + 10))[0];
          iSellordno = new Uint8Array(event?.data?.slice(i + 10, i + 12))[0];
          fBuyprice = new Float32Array(event?.data?.slice(i + 12, i + 16))[0];
          fSellprice = new Float32Array(event?.data?.slice(i + 16, i + 20))[0];
          MBP.push([iBuyqty, fBuyprice, iBuyordno,iSellordno, fSellprice, ,iSellqty])
          if (MBP.length > 5) MBP.pop();
        }
        obj.MBP=MBP;
        obj.fourmsgCode= fourmsgCode
      }
      obj.msgCode1= msgCode1;
      obj.fifthmsgCode= fifthmsgCode;

      if (msgCode1 == 3) {
        fOpen = new Float32Array(event?.data?.slice(48, 52))[0]//37 + 11 = 48
        fClose = new Float32Array(event?.data?.slice(52, 56))[0]
        fHigh = new Float32Array(event?.data?.slice(56, 60))[0]
        fLow = new Float32Array(event?.data?.slice(60, 64))[0]
        obj.fOpen = fOpen; obj.fClose = fClose; obj.fHigh = fHigh; obj.fLow = fLow
        obj.msgCode1 = msgCode1;
      }
      //229+11=240;
      if (fifthmsgCode == 32) {
        PClose = new Float32Array(event?.data?.slice(240, 244))[0];
        POI = new Float32Array(event?.data?.slice(244, 248))[0];
        obj.PClose = PClose; obj.POI = POI;
      }
      //248+11=259
      if (sixth2msgCode == 33) {
        UCkt = new Float32Array(event?.data?.slice(221, 225))[0];
        LCkt = new Float32Array(event?.data?.slice(225, 229))[0];
        obj.UCkt = UCkt; obj.LCkt = LCkt;
        obj.sixth2msgCode=sixth2msgCode;
      }
      if (sixthmsgCode == 36) {
        F52WKHIGH = new Float32Array(event?.data?.slice(259, 263))[0];
        F52WKLOW = new Float32Array(event?.data?.slice(263, 267))[0];
        obj.F52WKHIGH = F52WKHIGH;
        obj.F52WKLOW = F52WKLOW;
        obj.sixthmsgCode=sixthmsgCode;
      }

      // else if (msgCode == 2)//MBP
      // {

      //   for (let i = 11; i < msgLength; i += 20) {
      //     iBuyqty = new Uint32Array(event?.data?.slice(i, i + 4))[0];
      //     iSellqty = new Uint32Array(event?.data?.slice(i + 4, i + 8))[0];
      //     iBuyordno = new Uint8Array(event?.data?.slice(i + 8, i + 10))[0];
      //     iSellordno = new Uint8Array(event?.data?.slice(i + 10, i + 12))[0];
      //     fBuyprice = new Float32Array(event?.data?.slice(i + 12, i + 16))[0];
      //     fSellprice = new Float32Array(event?.data?.slice(i + 16, i + 20))[0];
      //     MBP.push([iBuyqty, fBuyprice, iBuyordno, iSellqty, fSellprice, iSellordno])
      //   }
      // }
      // else if (msgCode == 4)/*SPREAD*/ { }
      if (msgCode == 5)//INDEX
      {
        LTP = new Float32Array(event?.data?.slice(11, 15))[0];
        fOpen = new Float32Array(event?.data?.slice(15, 19))[0];
        fClose = new Float32Array(event?.data?.slice(19, 23))[0]
        fHigh = new Float32Array(event?.data?.slice(23, 27))[0]
        fLow = new Float32Array(event?.data?.slice(27, 31))[0]
        obj.LTP = LTP;
        obj.fOpen = fOpen; obj.fClose = fClose; obj.fHigh = fHigh; obj.fLow = fLow
      }
      if (msgCode == 6)//TopBidAsk
      {
        iTotalSellQty = new Uint32Array(event?.data?.slice(11, 15))[0];
        iTotalBuyQty = new Uint32Array(event?.data?.slice(15, 19))[0];
        iBuyqty = new Uint32Array(event?.data?.slice(19, 23))[0];
        iSellqty = new Uint32Array(event?.data?.slice(23, 27))[0];
        fBuyprice = new Float32Array(event?.data?.slice(27, 31))[0];
        fSellprice = new Float32Array(event?.data?.slice(31, 35))[0];
        obj.iTotalSellQty= iTotalSellQty;
        obj.iTotalBuyQty= iTotalBuyQty;
        obj.msgCode=msgCode;
      }
      // else if (msgCode == 7)/*TopBidAskSp*/{ }
      // else if (msgCode == 8)/*OHLCSpd*/{}
      // else if (msgCode == 9)/*MBPSP*/{ }
      // else if (msgCode == 29)/*MKT_STATUS*/{}
      // else if (msgCode == 30)/*PRICE_TICKER*/{
      //   LTP = new Float32Array(event?.data?.slice(11, 15))[0];
      // }
      // else if (msgCode == 31)/*JNRL_MSG*/{ }
      // else if (msgCode == 32)/*PCLOSE*/{
      //   PClose = new Float32Array(event?.data?.slice(11, 15))[0];
      //   POI = new Float32Array(event?.data?.slice(15, 19))[0];
      // }
      // else if (msgCode == 33)/*CKT_LMT*/{}
      // else if (msgCode == 36)/*F52WKHIGH_LOW*/{
      //   F52WKHIGH = new Float32Array(event?.data?.slice(11, 15))[0];
      //   F52WKLOW = new Float32Array(event?.data?.slice(15, 19))[0];
      // }



      // const i = this.dataBase.findIndex(_element => _element.SEC_ID == scripId);
      // if (i > -1) {
      //   for (let x in obj) {
      //     this.dataBase[i][x] = obj[x];
      //   }
      // }
      // else {
      //   this.dataBase.push(obj);
      // }
      // console.log(this.dataBase)
      this.messageSource.next(obj);
    };
    this.webSocket.onclose = (event) => {
      // console.log('websocket', event);

      setTimeout(() => {

        // this.NewByteCodeAuth()
        // this.callApiAuth();
        this.openWebsocket();
      }, 1000);
      // else if (this.restart == true) this.restart = false;
    };
  }
  closeWebSocket() {
    this.webSocket.close();
  }
}