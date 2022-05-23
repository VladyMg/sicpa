/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { UserGuard } from '../../guards/user.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'app',
        children: [
          {
            path: 'home',
            loadChildren: () => import('../../pages/home/home.module').then(m => m.HomePageModule),
            canLoad: [UserGuard]
          },
          {
            path: 'companies',
            children: [
              {
                path: 'company-list',
                loadChildren: () => import('../../pages/companies/company-list/company-list.module').then(m => m.CompanyListPageModule),
                canLoad: [UserGuard]
              },
              {
                path: 'company-form',
                loadChildren: () => import('../../pages/companies/company-form/company-form.module').then(m => m.CompanyFormPageModule),
                canLoad: [UserGuard]
              },
            ]
          },
          {
            path: 'departments',
            children: [
              {
                path: 'department-list',
                loadChildren: () => import('../../pages/departments/department-list/department-list.module').then(m => m.DepartmentListPageModule),
                canLoad: [UserGuard]
              },
              {
                path: 'department-form',
                loadChildren: () => import('../../pages/departments/department-form/department-form.module').then(m => m.DepartmentFormPageModule),
                canLoad: [UserGuard]
              },
            ]
          },
          {
            path: 'employees',
            children: [
              {
                path: 'employee-list',
                loadChildren: () => import('../../pages/employees/employee-list/employee-list.module').then(m => m.EmployeeListPageModule),
                canLoad: [UserGuard]
              },
              {
                path: 'employee-form',
                loadChildren: () => import('../../pages/employees/employee-form/employee-form.module').then(m => m.EmployeeFormPageModule),
                canLoad: [UserGuard]
              },
            ]
          },
          {
            path: '',
            redirectTo: '/tabs/app/home',
            pathMatch: 'full'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/app/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
