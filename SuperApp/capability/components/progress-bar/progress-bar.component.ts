import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit {
 @Input() progressBar:any
 @Input() inProgress:any
  constructor() { }

  ngOnInit() {
          this.progressBar.filter(res=>{
            if(res.Status=="Pending"){
              return this.inProgress=true;
            }
          })


  }

}
