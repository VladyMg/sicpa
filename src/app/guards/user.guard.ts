/* eslint-disable curly */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { GlobalConstants } from '../common/global-constants';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor(
    private authService: AuthService
  ) { }

  canLoad(): Promise<boolean> {
    return new Promise(async (resolve) => {
      const user = await this.authService.validateUser();
      if (user != null)
        return resolve(true);
      return resolve(false);
    });
  }

}
