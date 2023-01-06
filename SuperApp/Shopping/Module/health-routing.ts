import { ListingComponent } from './../Components/Common/listing/listing.component';
// import { BannerComponent } from './../Components/Common/banner/banner.component';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { CapabilityModule } from "SuperApp/capability/capability.module";
import { TranslateModule } from "SuperApp/Common/pipe/translate.module";
import { HealthComponent } from "../Components/health/health.component";


const routes: Routes = [
    {
        path: "",
        component:HealthComponent
    },
    {
        path: "Labtest",
        loadChildren:() => import('../Components/health/labtest/labtest.module').then(m => m.LabtestModule)
    },
    {
        path: "Listing",
        component: ListingComponent
    }
];
@NgModule({
    imports: [
        RouterModule.forChild(routes),
        IonicModule,
        CapabilityModule,
        TranslateModule,
        CommonModule
    ],
    declarations: [HealthComponent],
})
export class HealthRoutingModule {}