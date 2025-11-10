import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router'; // 1. Import RouterLink here
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink] // 2. Add RouterLink here
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  login() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/tabs/map']);
    } else {
      this.presentLoginError();
    }
  }

  async presentLoginError() {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Please check your email and password.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}