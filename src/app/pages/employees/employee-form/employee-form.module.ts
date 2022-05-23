import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeFormPageRoutingModule } from './employee-form-routing.module';

import { EmployeeFormPage } from './employee-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmployeeFormPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EmployeeFormPage]
})
export class EmployeeFormPageModule { }
