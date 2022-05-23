import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyListPageRoutingModule } from './company-list-routing.module';

import { CompanyListPage } from './company-list.page';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyListPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CompanyListPage]
})
export class CompanyListPageModule { }
