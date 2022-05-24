/* eslint-disable curly */
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Enterprise } from '../../../models/Enterprice.model';
import { EnterprisesService } from '../../../services/enterprises.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.page.html',
  styleUrls: ['./company-form.page.scss'],
})
export class CompanyFormPage implements OnInit {

  title = '';
  view = false;
  update = false;

  company: Enterprise = {};

  fCompany: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private enterprisesService: EnterprisesService,
    private fb: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadPageData();
    this.fCompany = this.fb.group({
      name: ['', [Validators.required]],
      status: [true],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
    });
  }

  async loadPageData() {
    this.route.params.subscribe({
      next: async (res) => {

        if (res.id != null) {
          this.company = await this.enterprisesService.filter(res.id);
          this.title = `Company: ${this.company.name}`;
          this.view = true;
          this.fCompany.setValue({
            name: this.company.name,
            status: this.company.status,
            address: this.company.address,
            phone: this.company.phone
          });
          this.fCompany.disable();
        } else {
          this.title = 'Company Create';
        }
      }
    });
  }

  onClickEditCompany() {
    this.view = false;
    this.update = true;
    this.fCompany.enable();
  }

  async submitForm() {
    this.company.name = this.fCompany.value.name;
    this.company.status = this.fCompany.value.status;
    this.company.address = this.fCompany.value.address;
    this.company.phone = this.fCompany.value.phone;

    if (this.update) {
      await this.enterprisesService.update(this.company);
    } else {
      await this.enterprisesService.create(this.company);
    }
    this.navCtrl.navigateForward(['/tabs/app/companies/company-list']);
  }

  onClickCancel() {
    this.view = true;
    this.update = false;
    this.fCompany.setValue({
      name: this.company.name,
      status: this.company.status,
      address: this.company.address,
      phone: this.company.phone
    });
    this.fCompany.disable();
  }

}
