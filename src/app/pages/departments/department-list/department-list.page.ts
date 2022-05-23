import { Component, OnInit } from '@angular/core';
import { Department } from '../../../models/Department.model';
import { FormBuilder } from '@angular/forms';
import { EnterprisesService } from '../../../services/enterprises.service';
import { NavController } from '@ionic/angular';
import { DepartmentsService } from '../../../services/departments.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.page.html',
  styleUrls: ['./department-list.page.scss'],
})
export class DepartmentListPage implements OnInit {

  departments: Department[] = [];

  constructor(
    private fb: FormBuilder,
    private departmentsService: DepartmentsService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.loadPageData();
  }

  async loadPageData() {
    this.departments = await this.departmentsService.list();
  }

  onClickDepartmentForm(id: number) {
    this.navCtrl.navigateForward(['/tabs/app/departments/department-form', { id, view: true }]);
  }

  onClickAddDepartment() {
    this.navCtrl.navigateForward(['/tabs/app/departments/department-form']);
  }

  async onClickDeleteDepartment(id: number) {
    await this.departmentsService.delete(id);
    this.loadPageData();
  }

}
