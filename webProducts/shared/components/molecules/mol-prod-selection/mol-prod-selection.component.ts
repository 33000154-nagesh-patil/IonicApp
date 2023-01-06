import { Component, OnInit } from '@angular/core';
import { CrmServiceService } from '../../../../services/crm-service.service';

@Component({
  selector: 'app-mol-prod-selection',
  templateUrl: './mol-prod-selection.component.html',
  styleUrls: ['./mol-prod-selection.component.scss'],
})
export class MolProdSelectionComponent implements OnInit {

  constructor(private crmSerice:CrmServiceService) { }
  prodSelection:any;
  ngOnInit() {
    this.prodSelection = this.crmSerice.getProductSelection()
  }

}
