import { FabButtonComponent } from './fab-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { TicketgenerationComponent } from '../ticketgeneration/ticketgeneration.component';
import { MatSelectModule } from '@angular/material/select';
// import { MatSelectModule } from '@angular/material';
@NgModule({
  declarations: [FabButtonComponent, TicketgenerationComponent],
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatOptionModule,
    CommonModule,
    IonicModule.forRoot({}),
    FormsModule,
    DragDropModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [FabButtonComponent, TicketgenerationComponent],
})
export class FabButtonModule {}
