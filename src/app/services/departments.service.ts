/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { UiService } from './ui.service';
import { AuthService } from './auth.service';
import { ResponseEntity } from '../models/Response.model';
import { Department } from '../models/Department.model';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  private servicesUri = environment.baseMicroServices;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private uiService: UiService,
    private authService: AuthService
  ) { }

  // Function to filter enterprises by id
  async delete(id: number): Promise<string> {

    return new Promise<string>(async (resolve) => {

      const user = await this.authService.validateUser();

      if (user == null) return Promise.resolve('');

      const url = `${this.servicesUri}/api/Departments/${id}`;

      const headers = new HttpHeaders().set('requestingUser', user);

      this.httpClient.delete<ResponseEntity<string>>(url, { headers })
        .subscribe(
          async (data) => {
            resolve(data.resp);
          },
          async (error) => {
            console.log(error);
            let message = '¡Opps!, se ha detectado un problema. Por favor intentelo más tarde.';

            if (error.error?.message != null)
              message = error.error?.message;

            await this.uiService.presentToast(message, 'danger');
            resolve('');
          });
    });
  }

  // Function to filter enterprises by id
  async filter(id: number): Promise<Department> {

    return new Promise<Department>(async (resolve) => {

      const user = await this.authService.validateUser();

      if (user == null) return Promise.resolve({});

      const url = `${this.servicesUri}/api/Departments/${id}`;

      const headers = new HttpHeaders().set('requestingUser', user);

      this.httpClient.get<ResponseEntity<Department>>(url, { headers })
        .subscribe(
          async (data) => {
            resolve(data.resp);
          },
          async (error) => {
            console.log(error);
            let message = '¡Opps!, se ha detectado un problema. Por favor intentelo más tarde.';

            if (error.error?.message != null)
              message = error.error?.message;

            await this.uiService.presentToast(message, 'danger');
            resolve({});
          });
    });
  }

  // Function to create enterprises
  async update(department: Department): Promise<string> {

    return new Promise<string>(async (resolve) => {

      const user: string = await this.storageService.get(GlobalConstants.user) || '';

      const url = `${this.servicesUri}/api/Departments`;

      const headers = new HttpHeaders().set('requestingUser', user);

      this.httpClient.put<ResponseEntity<string>>(url, department, { headers })
        .subscribe(
          async (data) => {
            resolve(data.resp);
          },
          async (error) => {
            console.log(error);
            let message = '¡Opps!, se ha detectado un problema. Por favor intentelo más tarde.';

            if (error.error?.message != null)
              message = error.error?.message;

            await this.uiService.presentToast(message, 'danger');
            resolve('');
          });
    });
  }

  // Function to create enterprises
  async create(department: Department): Promise<string> {

    return new Promise<string>(async (resolve) => {

      const user: string = await this.storageService.get(GlobalConstants.user) || '';

      const url = `${this.servicesUri}/api/Departments`;

      const headers = new HttpHeaders().set('requestingUser', user);

      this.httpClient.post<ResponseEntity<string>>(url, department, { headers })
        .subscribe(
          async (data) => {
            resolve(data.resp);
          },
          async (error) => {
            console.log(error);
            let message = '¡Opps!, se ha detectado un problema. Por favor intentelo más tarde.';

            if (error.error?.message != null)
              message = error.error?.message;

            await this.uiService.presentToast(message, 'danger');
            resolve('');
          });
    });
  }

  // Function to list enterprises
  async list(): Promise<Department[]> {

    return new Promise<Department[]>(async (resolve) => {

      const user = await this.authService.validateUser();

      if (user == null) return Promise.resolve([]);

      const url = `${this.servicesUri}/api/Departments`;

      const headers = new HttpHeaders().set('requestingUser', user);

      this.httpClient.get<ResponseEntity<Department[]>>(url, { headers })
        .subscribe(
          async (data) => {
            resolve(data.resp);
          },
          async (error) => {
            console.log(error);
            let message = '¡Opps!, se ha detectado un problema. Por favor intentelo más tarde.';

            if (error.error?.message != null)
              message = error.error?.message;

            await this.uiService.presentToast(message, 'danger');
            resolve([]);
          });
    });
  }
}
