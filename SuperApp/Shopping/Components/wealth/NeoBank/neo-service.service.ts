import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NeoServiceService {
  formName: any;
  json: any;
  txnValue: any;
  SendMoneyjson: any;
  constructor(private http:HttpClient) { }

  getFormName(){
    return this.formName;
  }
  
  
  setFormName(val){
    this.formName=val;
  }
  
  
   setJSON(formName: string){
    this.http.get('assets/neo-bank/'+formName+ '.json').subscribe(async (res:any) => {
      this.json=await res;
      console.log(this.json);
      
    })
  }
  
   getJSON(){
   return this.json
  }
   
  
  setData(val){
    this.txnValue=val
  }
  
  
  
  
  getData(){
   return this.txnValue
  }



  setSendMOneyJson(){
    
    this.http.get('assets/neo-bank/sendMoney.json').subscribe(async (res:any) => {
      this.SendMoneyjson=await res;
      console.log('money',this.SendMoneyjson);
      
    })
  }
  
  getSendMOneyJson(){

    return this.SendMoneyjson

  }
   





}
