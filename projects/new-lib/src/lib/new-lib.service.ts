import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewLibService {
  setSelectedCardData: any;

  constructor() { }
  setSelectedCard(e){
  this.setSelectedCardData=e;
  }
  getSelectedCard(){
    return this.setSelectedCardData;
  }
}
