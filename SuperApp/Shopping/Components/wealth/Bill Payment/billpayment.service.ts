import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillpaymentService {

  formName:string;
  json: any;
  datavalue: any;
  txnValue: any;

  constructor(private http:HttpClient) { }


getFormName(){
  return this.formName["name"];
}



 setJSON(formName: string){
  this.formName=formName;
  this.http.get('assets/neo-bank/neobankingAlldata.json').subscribe(async (res:any) => {
    this.json=await res
    console.log(this.json);
   
  })

}

getName(){
  return this.formName;
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



 
}
