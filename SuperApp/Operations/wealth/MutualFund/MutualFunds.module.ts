import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from './../../../Common/pipe/translate.module';
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
        path:"",
        redirectTo:"Profile"
    },
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
        MatInputModule,
        CapabilityModule,
        TranslateModule,
        MatExpansionModule
    ],
    providers: [],
    exports: []
})

export class MutualFundsModule { }