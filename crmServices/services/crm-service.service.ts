import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CrmServiceService {
searchData=new BehaviorSubject('');
createForm=new BehaviorSubject('')
  tableData:any;
  selectProduct:any;
  tableHeader: any;

  constructor() { }
  setTableData(value){
    this.tableData=value;
  }
  getTableData(){
    return this.tableData;
  }
  setProductSelection(value){
    this.selectProduct=value
  }
  getProductSelection(){
    return this.selectProduct
  }
  setTableHeader(value){
    this.tableHeader=value
    
  }
  getTableHeader(){
    return this.tableHeader
  }
}
