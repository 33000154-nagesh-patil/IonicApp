import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'projects/core/src/lib/services/common.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss'],
})
export class HeadingComponent implements OnInit {
  @Input() heading:any;
  userName:Observable<{firstName:string}>=this.commonService.getUserDetail()
  constructor(
    private commonService:CommonService,
  ) { }

  ngOnInit() {}

}
