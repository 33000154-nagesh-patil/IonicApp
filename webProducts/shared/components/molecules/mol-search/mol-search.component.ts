import { Component, Input, OnInit } from '@angular/core';
import { CrmServiceService } from '../../../../services/crm-service.service';

@Component({
  selector: 'app-mol-search',
  templateUrl: './mol-search.component.html',
  styleUrls: ['./mol-search.component.scss'],
})
export class MolSearchComponent implements OnInit {
  @Input() searchDetail: any
  constructor() {
  }

  ngOnInit() { }

}
