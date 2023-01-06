import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class HealthService {
    constructor() {}
    heathProuctDetails = new BehaviorSubject({});
    healthCartItems = new BehaviorSubject([]);
}