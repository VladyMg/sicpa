import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController, ViewDidEnter, ViewWillEnter } from '@ionic/angular';
import { Enterprise } from '../../../models/Enterprice.model';
import { EnterprisesService } from '../../../services/enterprises.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.page.html',
  styleUrls: ['./company-list.page.scss'],
})
export class CompanyListPage implements OnInit, ViewWillEnter {

  fCompany: FormGroup;
  enterprises: Enterprise[] = [];

  constructor(
    private fb: FormBuilder,
    private enterpriseService: EnterprisesService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.fCompany = this.fb.group({});

  }

  ionViewWillEnter(): void {
    this.loadPageData();
  }

  async loadPageData() {
    this.enterprises = await this.enterpriseService.list();
  }

  onClickCompanyForm(id: number) {
    this.navCtrl.navigateForward(['/tabs/app/companies/company-form', { id, view: true }]);
  }

  onClickDelete() {

  }

  onClickAddCompany() {
    this.navCtrl.navigateForward(['/tabs/app/companies/company-form']);
  }

  async onClickDeleteCompany(id: number) {
    await this.enterpriseService.delete(id);
    this.loadPageData();
  }

}
