import { ListingComponent } from './../Components/Common/listing/listing.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CapabilityModule } from "SuperApp/capability/capability.module";
import { CareerComponent } from "../Components/career/career.component";

const routes: Routes = [
    {
        path: "",
        component:CareerComponent
    },
    {
        path: "Courses",
        loadChildren:() => import('../Components/career/courses/courses.module').then(m => m.CoursesModule)
    },
    {
        path:"Assessments",
        loadChildren:() => import('../Components/career/assesments/assesments.module').then(m => m.AssesmentsModule)
    },
    {
        path: "Listing",
        component: ListingComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes),IonicModule,CapabilityModule,
    CommonModule,
    NgbModule
    ],
    declarations: [CareerComponent],
})
export class CareerRoutingModule {}