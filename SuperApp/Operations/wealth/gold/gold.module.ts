import { MatExpansionModule } from '@angular/material/expansion';
import { ProfileComponent } from './profile/profile.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CapabilityModule } from 'SuperApp/capability/capability.module';

const routes: Routes = [
    {
        path: "Profile",
        component: ProfileComponent
    }
]

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        RouterModule.forChild(routes),
        CapabilityModule,
        IonicModule,
        CommonModule,
        FormsModule,
        MatExpansionModule
    ],
    providers: [],
    exports: []
})

export class GoldModule { }