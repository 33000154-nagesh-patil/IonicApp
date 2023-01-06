import { Router } from '@angular/router';
import { AllConfigDataService } from 'index';
import { eduService } from 'SuperApp/Shopping/Services/edu.service';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
    selector: 'app-segment',
    templateUrl: './segment.component.html',
    styleUrls: ['./segment.component.scss']
})
export class SegmentComponent {
    segment:any;
    data:any;
    routing: any;
    categoryLanding: any;
    apiCatalog: any = {
        ...this.allConfigDataService.getConfig('apiCatalog'),
        environment: this.allConfigDataService.getConfig('environmentType'),
      };
  environment: boolean;
    @Input() set $data(val:any){
        this.data=val
        this.segment=this.data.segmentValues[0].title
    }
    @Output() explore = new EventEmitter()
    constructor (private eduservice: eduService, private allConfigDataService : AllConfigDataService, private router: Router) {}
    Explore(x){
        this.explore.emit(x)


    }




    ngOnInit() {

        console.log(this.segment, "Salman1111");

        if (this.apiCatalog.environment == 'proto') {
            this.environment = true
          }


        this.eduservice.categoryValueForAPI.subscribe(
            (val) => {
              this.apiCatalog['breadCrumb'] =
              val['productLanding']?
               'Shopping/' + val['categoryLanding'] + '/' + val['productLanding']
               :'Shopping' ;

              this.routing = val['productLanding']
              this.categoryLanding = val['categoryLanding']
            })
    }

    originalOrder = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
        return 0;
      }


      exploreList(val){
        // console.log(val,'anad');

        this.router.navigate(['/Shopping/listing'])
        console.log(this.router.navigate(['/Shopping/listing']),'anad');

      }
}
