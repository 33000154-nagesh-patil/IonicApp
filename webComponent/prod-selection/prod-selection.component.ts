import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prod-selection',
  templateUrl: './prod-selection.component.html',
  styleUrls: ['./prod-selection.component.scss'],
})
export class ProdSelectionComponent implements OnInit {

  products=[
    {
      "title":'CRM',
      "routLink":'crm'
    },
    {
      "title":'CRM SALES',
      "routLink":''
    },
    {
      "title":'TONE',
      "routLink":''
    },
    {
      "title":'DBO',
      "routLink":''
    },
    {
      "title":'CONNECT',
      "routLink":''
    },
    {
      "title":'CRM SERVICES',
      "routLink":'crmService'
    }
  ]
  constructor(private router:Router) { }

  ngOnInit() {}
  goToProduct(value){
    this.router.navigate([value])
  }
}
