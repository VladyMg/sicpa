/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';
import { GlobalConstants } from '../common/global-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ResponseEntity } from '../models/Response.model';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private servicesUri = environment.baseMicroServices;

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private navCtrl: NavController,
    private uiService: UiService,
  ) { }

  logout() {
    this.storageService.clearAll();
    this.navCtrl.navigateRoot(['/auth/login']);
  }

  login(user: string, position: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {

      const url = `${this.servicesUri}/api/Auth`;

      const body = {
        user,
        position
      };

      this.httpClient.post<ResponseEntity<string>>(url, body)
        .subscribe(
          async (data) => {
            this.storageService.set(GlobalConstants.user, user);
            this.navCtrl.navigateRoot(['/tabs/app/home']);
            resolve(true);
          },
          async (error) => {
            console.log(error);
            let message = '¡Opps!, se ha detectado un problema. Por favor intentelo más tarde.';

            if (error.error?.message != null)
              message = error.error?.message;

            await this.uiService.presentToast(message, 'danger');
            resolve(false);
          });
    });
  }

  // Function to validate user loged
  validateUser(): Promise<string> {
    return new Promise<string>(async (resolve) => {
      const user: string = await this.storageService.get(GlobalConstants.user);

      if (user == null) {
        this.navCtrl.navigateRoot(['/auth/login']);
        return resolve(null);
      } else {
        return resolve(user);
      }
    });
  }
}
