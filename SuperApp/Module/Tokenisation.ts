import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "SuperApp/Common/pipe/translate.module";
// import { LoginAuthenticationComponent } from "SuperApp/Components/login-authentication/login-authentication.component";
// import { SignInComponent } from "SuperApp/Components/sign-in/sign-in.component";
// import { UpdateProfileComponent } from "SuperApp/Components/update-profile/update-profile.component";
// import { VerificationCodeComponent } from "SuperApp/Components/verification-code/verification-code.component";

// let routes: Routes = [
//     // { path: '', redirectTo: 'SignIn', pathMatch: 'full' },
//     { path: "", component:SignInComponent }
// ]

@NgModule({
    declarations: [
        // SignInComponent,
        // LoginAuthenticationComponent,
        // VerificationCodeComponent,
        // UpdateProfileComponent
    ],
    imports: [
        // RouterModule.forChild(routes),
        IonicModule,
        TranslateModule,
        CommonModule
    ],
    providers: [],
    exports: []
})
export class TokenisationModule { }