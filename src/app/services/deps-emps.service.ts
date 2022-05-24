/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { UiService } from './ui.service';
import { AuthService } from './auth.service';
import { GlobalConstants } from '../common/global-constants';
import { ResponseEntity } from '../models/Response.model';

@Injectable({
  providedIn: 'root'
})
export class DepsEmpsService {

  private servicesUri = environment.baseMicroServices;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private uiService: UiService,
    private authService: AuthService
  ) { }

  // Function to delet relation ship between department and employee
  async delete(id_department: number, id_employee: number): Promise<string> {

    return new Promise<string>(async (resolve) => {

      const user: string = await this.storageService.get(GlobalConstants.user) || '';

      const url = `${this.servicesUri}/api/DepartmentsEmployees/${id_department}/${id_employee}`;

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

  // Function to create relation ship between department and employee
  async create(id_department: number, id_employee: number): Promise<string> {

    return new Promise<string>(async (resolve) => {

      const user: string = await this.storageService.get(GlobalConstants.user) || '';

      const url = `${this.servicesUri}/api/DepartmentsEmployees`;

      const headers = new HttpHeaders().set('requestingUser', user);

      const body = {
        id_department,
        id_employee
      };

      this.httpClient.post<ResponseEntity<string>>(url, body, { headers })
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
}
