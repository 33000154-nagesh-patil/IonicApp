import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrmServiceService } from 'crmServices/services/crm-service.service';

@Component({
  selector: 'app-mol-table',
  templateUrl: './mol-table.component.html',
  styleUrls: ['./mol-table.component.scss'],
})
export class MolTableComponent implements OnInit {
  dataArray:any;
  displayedColumns:any=[];
  dataSource:any
  containVal:any;
  table:any;
  tableValue: any;
  val: any;
  tableHeader:any="Total Cases";
  @Output() setDetail = new EventEmitter<string>();


  constructor(private http:HttpClient,private crmService:CrmServiceService) {

  this.table=this.crmService.getTableData()

  this.tableValue=this.table['value']
  const obj2 = Object.create(this.tableValue[0]);

      for (let key in obj2) {
        this.displayedColumns.push(key)
      }
    this.dataArray =  this.tableValue
  this.dataSource = new MatTableDataSource(this.dataArray);


  }

  ngOnInit() {

  }
  getParticularDetail(value){
    this.setDetail.emit(value);
  }

}
