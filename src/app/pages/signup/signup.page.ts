import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignupPage {
  email = '';
  password = '';
  confirmPassword = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {}

  signup() {
    // Basic validation
    if (!this.email || !this.password) {
      this.presentAlert('Error', 'Email and password cannot be empty.');
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.presentAlert('Error', 'Passwords do not match.');
      return;
    }

    // Simulate successful signup and auto-login
    if (this.authService.login(this.email, this.password)) {
      this.presentAlert('Success', 'Account created successfully!');
      this.router.navigate(['/tabs/map']);
    } else {
      this.presentAlert('Error', 'An unexpected error occurred.');
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}