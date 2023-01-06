import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn:'root'
})
export class MFService{
    constructor() {}
    cartData = new BehaviorSubject([])
}