import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AllConfigDataService } from '../../services/all-config-data.service';
@Component({
  selector: 'lib-fab-button',
  templateUrl: './fab-button.component.html',
  styleUrls: ['./fab-button.component.scss'],
})
export class FabButtonComponent implements OnInit {

  @Input() superMode:any;
  @Input() fabIcon:any;
  constructor(private router:Router, private allConfigDataService:AllConfigDataService) { }
  ngOnInit() {

  }

  toggleSuperMode(mode){
    this.allConfigDataService.setAppMode(mode)
    if(!mode){
      this.router.navigate(['/Dashboard']);
    }
    // console.log("fab",mode)

  }
}
