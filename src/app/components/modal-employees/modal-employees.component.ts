/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../../models/Employee.model';
import { DepsEmpsService } from '../../services/deps-emps.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-employees',
  templateUrl: './modal-employees.component.html',
  styleUrls: ['./modal-employees.component.scss'],
})
export class ModalEmployeesComponent implements OnInit {

  @Input() id_department = 0;
  @Input() employees: Employee[] = [];

  constructor(
    private depsempsService: DepsEmpsService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  async onClickSelectEmployee(id_employee: number) {
    await this.depsempsService.create(this.id_department, id_employee);
    this.modalCtrl.dismiss();
  }

}
