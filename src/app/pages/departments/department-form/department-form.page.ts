/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Department } from '../../../models/Department.model';
import { ActivatedRoute } from '@angular/router';
import { DepartmentsService } from '../../../services/departments.service';
import { NavController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { Enterprise } from '../../../models/Enterprice.model';
import { EnterprisesService } from '../../../services/enterprises.service';
import { DepsEmpsService } from '../../../services/deps-emps.service';
import { ModalEmployeesComponent } from '../../../components/modal-employees/modal-employees.component';
import { Employee } from '../../../models/Employee.model';
import { EmployeesService } from '../../../services/employees.service';

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
  employees: Employee[] = [];

  constructor(
    private route: ActivatedRoute,
    private departmentsService: DepartmentsService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private enterprisesService: EnterprisesService,
    private routerOutlet: IonRouterOutlet,
    private modalCrtl: ModalController,
    private depsempsService: DepsEmpsService,
    private employeesService: EmployeesService
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
    this.employees = await this.employeesService.list();
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
    this.department.id_enterprise = this.fDepartment.value.id_enterprise[0] || this.department.id_enterprise;

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

  async onClickAddEmployee() {
    const modal = await this.modalCrtl.create({
      component: ModalEmployeesComponent,
      canDismiss: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: {
        id_department: this.department.id,
        employees: this.employees
      }
    });

    modal.onDidDismiss().then(() => {
      this.loadPageData();
    });

    return await modal.present();
  }

  onClickEmployeeForm(id: number) {
    this.navCtrl.navigateForward(['/tabs/app/employees/employee-form', { id, view: true }]);
  }

  async onClickDeleteEmployeeDepartment(id_employee: number) {
    await this.depsempsService.delete(this.department.id, id_employee);
    this.loadPageData();
  }

}
