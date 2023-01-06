import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalController } from '@ionic/angular';
import { Console } from 'console';
import { CrmServiceService } from '../../../../services/crm-service.service';
import { CreateFormComponent } from '../../atoms/create-form/create-form.component';
import { InputElementsComponent } from '../../atoms/input-elements/input-elements.component';

@Component({
  selector: 'app-mol-subheader',
  templateUrl: './mol-subheader.component.html',
  styleUrls: ['./mol-subheader.component.scss'],
})
export class MolSubheaderComponent implements OnInit {
  @Input() menuTitleDetils:any
  constructor(private dailog:MatDialog,private mdlcrtl:ModalController,private crmService:CrmServiceService,private http:HttpClient) {
   }

  ngOnInit() {

  }
 getcreateForm(value){
  let params={
    create:value
  }
  this.http.get('/assets/crmServiceJson/'+value.url+'.json').subscribe(async (res) => {
    this.crmService.createForm.next(res['search'].value);
    const dialogRef = this.dailog.open(CreateFormComponent,{
      'width':'524px'
    })
    dialogRef.afterClosed().subscribe((res)=>{
    })

   } )}

}


