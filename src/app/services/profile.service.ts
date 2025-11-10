import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
  name: string;
  avatarUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private defaultProfile: UserProfile = {
    name: 'John Doe',
    avatarUrl: 'https://unavatar.io/john.doe'
  };

  private _profile$ = new BehaviorSubject<UserProfile>(this.defaultProfile);

  constructor() {
    // Load saved profile from local storage when the service starts
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this._profile$.next(JSON.parse(savedProfile));
    }
  }

  get profile$(): Observable<UserProfile> {
    return this._profile$.asObservable();
  }

  // This is the new helper method we added
  getCurrentProfileValue(): UserProfile {
    return this._profile$.getValue();
  }

  updateProfile(newProfileData: Partial<UserProfile>) {
    const currentProfile = this._profile$.getValue();
    const updatedProfile = { ...currentProfile, ...newProfileData };
    
    this._profile$.next(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  }
}