import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = '';
  position = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  async submitLogin() {
    const resp = await this.authService.login(this.user, this.position);
  }

}
