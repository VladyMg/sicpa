import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';
import { GlobalConstants } from '../common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService: StorageService,
    private navCtrl: NavController
  ) { }

  login(user: string) {
    this.storageService.set(GlobalConstants.user, user);
    this.navCtrl.navigateForward(['/tabs/app/home']);
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
