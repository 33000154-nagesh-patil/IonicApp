import { Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatbotComponent } from './chatbot.component';
import { Routes, RouterModule } from '@angular/router';
import { CapabilityModule } from 'SuperApp/capability/capability.module';


const routes:Routes=[
  {
    path:'',
    redirectTo:'chatbot',
    pathMatch:'full'
  },
  {
    path:'chatbot',
    component:ChatbotComponent
  }
]

@NgModule({
  declarations: [ChatbotComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapabilityModule,
    RouterModule.forChild(routes)],
  exports:[ChatbotComponent]
})
export class ChatbotModule { }
