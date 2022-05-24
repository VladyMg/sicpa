/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { Department } from '../../models/Department.model';
import { DepsEmpsService } from '../../services/deps-emps.service';

@Component({
  selector: 'app-modal-departments',
  templateUrl: './modal-departments.component.html',
  styleUrls: ['./modal-departments.component.scss'],
})
export class ModalDepartmentsComponent implements OnInit {

  @Input() id_employee = 0;
  @Input() departments: Department[] = [];

  constructor(
    private depsempsService: DepsEmpsService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  async onClickSelectDepartment(id_department: number) {
    await this.depsempsService.create(id_department, this.id_employee);
    this.modalCtrl.dismiss();
  }

}
