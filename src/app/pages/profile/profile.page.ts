import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, AlertController, ActionSheetController } from '@ionic/angular';
import { carSportOutline, createOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ProfileService, UserProfile } from '../../services/profile.service';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service'; // Make sure this import is here

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProfilePage {
  public profile$: Observable<UserProfile>;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private profileService: ProfileService,
    private authService: AuthService // THIS LINE WAS MISSING
  ) {
    this.profile$ = this.profileService.profile$;
    addIcons({ carSportOutline, createOutline });
  }

  async editName() {
    const alert = await this.alertController.create({
      header: 'Edit Name',
      inputs: [
        {
          name: 'newName',
          type: 'text',
          placeholder: 'Enter your new name',
          value: this.profileService.getCurrentProfileValue().name
        },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: (data) => {
            if (data.newName) {
              this.profileService.updateProfile({ name: data.newName });
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async changeAvatar() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose an Avatar',
      buttons: [
        {
          text: 'Jane Smith',
          handler: () => {
            this.profileService.updateProfile({ avatarUrl: 'https://unavatar.io/jane.smith' });
          }
        },
        {
          text: 'Peter Jones',
          handler: () => {
            this.profileService.updateProfile({ avatarUrl: 'https://unavatar.io/peter.jones' });
          }
        },
        { text: 'Cancel', role: 'cancel' }
      ],
    });
    await actionSheet.present();
  }

  async logout() {
    this.authService.logout(); // This will now work correctly

    const toast = await this.toastController.create({
      message: 'You have been logged out.',
      duration: 2000,
      color: 'medium',
      position: 'top'
    });
    toast.present();
  }
}