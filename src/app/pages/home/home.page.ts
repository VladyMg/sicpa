import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  navEnterprises() {
    this.navCtrl.navigateForward(['/tabs/app/companies/company-list']);
  }

  navDepartments() {
    this.navCtrl.navigateForward(['/tabs/app/departments/department-list']);

  }

  navEmployees() {
    this.navCtrl.navigateForward(['/tabs/app/employees/employee-list']);

  }

}
