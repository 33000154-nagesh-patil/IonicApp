import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CrmServiceService } from 'webProducts/services/crm-service.service';

@Component({
  selector: 'app-mol-segment',
  templateUrl: './mol-segment.component.html',
  styleUrls: ['./mol-segment.component.scss'],
})
export class MolSegmentComponent implements OnInit {
  @Input() indiviualDetail:any;
  @Input() segmentValue:any;
  @Output() segmentData=new EventEmitter<String>()
  accordianData:any;
  allData: Object;
  constructor(private http:HttpClient,private crmService:CrmServiceService) { }

  ngOnInit() {

    this.crmService.checkMenu.subscribe((res)=>{
      if(res=='L123456'){
        this.http.get('/assets/crmJsons/crmIndiviDetail.json').subscribe(async (res)=>{
          this.accordianData=await res['crmCaseInfo'];      
        })
      }else{
        this.accordianData=null
      }      
    })
   
  }
 

  getSegmentValue(value){
    this.http.get('/assets/crmJsons/crmIndiviDetail.json').subscribe(async (res)=>{
      this.accordianData=await res[value.url];
    });
    this.segmentData.emit(value.url)
  }
}
