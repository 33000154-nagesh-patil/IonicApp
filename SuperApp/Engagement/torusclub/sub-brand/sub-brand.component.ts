import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AllConfigDataService } from 'projects/core/src/lib/services/all-config-data.service';

@Component({
  selector: 'lib-sub-brand',
  templateUrl: './sub-brand.component.html',
  styleUrls: ['./sub-brand.component.scss'],
})
export class SubBrandComponent implements OnInit {
  imageList: any;
  allCard: any;
  getCardData: any;
  constructor(private router: Router,private location: Location,private allConfig: AllConfigDataService) {
    this.getCardData = this.router.getCurrentNavigation().extras.state.allCard;
  }

  ngOnInit() {
    this.imageList = this.allConfig.getConfig('images');
  }
  goBack() {
    this.location.back();
  }
}
