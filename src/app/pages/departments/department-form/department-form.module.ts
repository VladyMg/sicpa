import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentFormPageRoutingModule } from './department-form-routing.module';

import { DepartmentFormPage } from './department-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepartmentFormPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [DepartmentFormPage]
})
export class DepartmentFormPageModule { }
