import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [TransferFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
     MatDatepickerModule,
    MatSelectModule,
    FormsModule
    

  ],
  exports:[TransferFormComponent]
})
export class NeoModuleModule { }
