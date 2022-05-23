/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from '../../../models/Department.model';
import { Enterprise } from '../../../models/Enterprice.model';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../../services/departments.service';
import { EmployeesService } from '../../../services/employees.service';
import { NavController } from '@ionic/angular';
import { Employee } from '../../../models/Employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.page.html',
  styleUrls: ['./employee-form.page.scss'],
})
export class EmployeeFormPage implements OnInit {

  title = '';
  view = false;
  update = false;

  fEmployee: FormGroup;
  employee: Employee = {};
  departments: Department[] = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private employeesService: EmployeesService,
    private departamentsService: DepartmentsService
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.fEmployee = this.fb.group({
      name: ['', [Validators.required]],
      surnam: ['', [Validators.required]],
      user: [''],
      mail: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      position: ['', [Validators.required]],
      status: [true],
    });
  }

  async loadPageData() {
    this.departments = await this.departamentsService.list();
    this.route.params.subscribe({
      next: async (res) => {
        if (res.id != null) {
          this.employee = await this.employeesService.filter(res.id);
          this.title = `Employee: ${this.employee.name}`;
          this.view = true;
          this.fEmployee.setValue({
            name: this.employee.name,
            surnam: this.employee.surnam,
            user: this.employee.user,
            mail: this.employee.mail,
            age: this.employee.age,
            position: this.employee.position,
            status: this.employee.status,
          });
          this.fEmployee.disable();
        } else {
          this.title = 'Employee Create';
        }
      }
    });
  }

  onClickEditEmployee() {
    this.view = false;
    this.update = true;
    this.fEmployee.enable();
  }

  async submitForm() {
    this.employee.name = this.fEmployee.value.name;
    this.employee.surnam = this.fEmployee.value.surnam;
    this.employee.user = this.fEmployee.value.user;
    this.employee.mail = this.fEmployee.value.mail;
    this.employee.status = this.fEmployee.value.status;
    this.employee.age = this.fEmployee.value.age;
    this.employee.position = this.fEmployee.value.position;

    if (this.update) {
      await this.employeesService.update(this.employee);
    } else {
      await this.employeesService.create(this.employee);
    }

    this.navCtrl.navigateForward(['/tabs/app/employees/employee-list']);
  }

  onClickCancel() {
    this.view = true;
    this.update = false;
    this.fEmployee.setValue({
      name: this.employee.name,
      surnam: this.employee.surnam,
      user: this.employee.user,
      mail: this.employee.mail,
      age: this.employee.age,
      position: this.employee.position,
      status: this.employee.status,
    });
    this.fEmployee.disable();
  }

}
