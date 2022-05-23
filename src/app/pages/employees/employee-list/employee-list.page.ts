import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../models/Employee.model';
import { FormBuilder } from '@angular/forms';
import { DepartmentsService } from '../../../services/departments.service';
import { NavController } from '@ionic/angular';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.page.html',
  styleUrls: ['./employee-list.page.scss'],
})
export class EmployeeListPage implements OnInit {

  employees: Employee[] = [];

  constructor(
    private navCtrl: NavController,
    private employeesService: EmployeesService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.loadPageData();
  }

  async loadPageData() {
    this.employees = await this.employeesService.list();
  }

  onClickDepartmentForm(id: number) {
    this.navCtrl.navigateForward(['/tabs/app/employees/employee-form', { id, view: true }]);
  }

  onClickAddEmployee() {
    this.navCtrl.navigateForward(['/tabs/app/employees/employee-form']);
  }

  async onClickDeleteDepartment(id: number) {
    await this.employeesService.delete(id);
    this.loadPageData();
  }

}
