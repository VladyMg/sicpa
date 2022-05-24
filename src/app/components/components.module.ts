import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ModalDepartmentsComponent } from './modal-departments/modal-departments.component';
import { ModalEmployeesComponent } from './modal-employees/modal-employees.component';



@NgModule({
  declarations: [
    ModalDepartmentsComponent,
    ModalEmployeesComponent
  ],
  exports: [
    ModalDepartmentsComponent,
    ModalEmployeesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
  ]
})
export class ComponentsModule { }
