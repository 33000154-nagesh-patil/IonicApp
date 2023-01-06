import { Component, OnInit } from "@angular/core";
import { eduService } from "SuperApp/Shopping/Services/edu.service";

@Component({
    selector:"app-order-pad",
    templateUrl:"./order-pad.component.html",
    styleUrls:[],
})
export class OrderPadComponent implements OnInit{
    constructor(
        private eduService:eduService
    ) {}
    ngOnInit() {

    }

}
