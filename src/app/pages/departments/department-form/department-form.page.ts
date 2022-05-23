/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from '../../../models/Department.model';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../../services/departments.service';
import { NavController } from '@ionic/angular';
import { Enterprise } from '../../../models/Enterprice.model';
import { EnterprisesService } from '../../../services/enterprises.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.page.html',
  styleUrls: ['./department-form.page.scss'],
})
export class DepartmentFormPage implements OnInit {

  title = '';
  view = false;
  update = false;

  fDepartment: FormGroup;
  department: Department = {};
  companies: Enterprise[] = [];

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private enterprisesService: EnterprisesService
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.fDepartment = this.fb.group({
      name: ['', [Validators.required]],
      status: [true],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      description: ['', [Validators.required]],
      id_enterprise: ['', [Validators.required]]
    });
  }

  async loadPageData() {
    this.companies = await this.enterprisesService.list();
    this.route.params.subscribe({
      next: async (res) => {
        if (res.id != null) {
          this.department = await this.departmentsService.filter(res.id);
          this.title = `Department: ${this.department.name}`;
          this.view = true;
          this.fDepartment.setValue({
            name: this.department.name,
            status: this.department.status,
            description: this.department.description,
            phone: this.department.phone,
            id_enterprise: this.department.id_enterprise
          });
          this.fDepartment.disable();
        } else {
          this.title = 'Department Create';
        }
      }
    });
  }

  onClickEditDepartment() {
    this.view = false;
    this.update = true;
    this.fDepartment.enable();
  }

  async submitForm() {
    this.department.name = this.fDepartment.value.name;
    this.department.status = this.fDepartment.value.status;
    this.department.description = this.fDepartment.value.description;
    this.department.phone = this.fDepartment.value.phone;
    this.department.id_enterprise = this.fDepartment.value.id_enterprise[0];

    if (this.update) {
      await this.departmentsService.update(this.department);
    } else {
      await this.departmentsService.create(this.department);
    }

    this.navCtrl.navigateForward(['/tabs/app/departments/department-list']);
  }

  onClickCancel() {
    this.view = true;
    this.update = false;
    this.fDepartment.setValue({
      name: this.department.name,
      status: this.department.status,
      description: this.department.description,
      phone: this.department.phone,
      id_enterprise: this.department.id_enterprise
    });
    this.fDepartment.disable();
  }

}
