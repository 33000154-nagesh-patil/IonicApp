import { log } from 'console';
import { Component, OnInit,Input } from '@angular/core';
import { runInThisContext } from 'vm';
import jsonData from './advisorycard.json'
@Component({
  selector: 'app-advisory-card',
  templateUrl: './advisory-card.component.html',
  styleUrls: ['./advisory-card.component.scss'],
})
export class AdvisoryCardComponent implements OnInit {
data:any
@Input() advisoryCardData:any

  constructor() { }

  ngOnInit() {
    this.data=this.advisoryCardData
    // this.data=jsonData

  }
}
