import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyFormPageRoutingModule } from './company-form-routing.module';

import { CompanyFormPage } from './company-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyFormPageRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [CompanyFormPage]
})
export class CompanyFormPageModule {}
