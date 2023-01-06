import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-increase-m244',
  templateUrl: './increase-m244.component.html',
  styleUrls: ['./increase-m244.component.scss'],
})
export class IncreaseM244Component implements OnInit {
  imageList: any;

  constructor(private allConfigDataService: AllConfigDataService) { }

  ngOnInit() {
   this.imageList = this.allConfigDataService.getConfig('images')
  }

}
