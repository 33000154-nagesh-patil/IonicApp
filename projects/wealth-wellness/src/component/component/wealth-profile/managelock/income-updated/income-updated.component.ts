import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-income-updated',
  templateUrl: './income-updated.component.html',
  styleUrls: ['./income-updated.component.scss'],
})
export class IncomeUpdatedComponent implements OnInit {
  imageList: any;

  constructor(private allConfigDataService: AllConfigDataService) { }

  ngOnInit() {
    this.imageList = this.allConfigDataService.getConfig('images');
  }

}

