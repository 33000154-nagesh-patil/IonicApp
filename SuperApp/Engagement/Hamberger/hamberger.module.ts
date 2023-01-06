import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { SubmenuComponent } from "./submenu/submenu.component";


const routes:Routes=[
  {
    path:"",
    component:SubmenuComponent
  }
]

@NgModule({

})

export class HambergerModule{

}
