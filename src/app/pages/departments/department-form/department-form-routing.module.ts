import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentFormPage } from './department-form.page';

const routes: Routes = [
  {
    path: '',
    component: DepartmentFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentFormPageRoutingModule {}
