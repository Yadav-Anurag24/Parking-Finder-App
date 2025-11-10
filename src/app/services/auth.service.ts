import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use a BehaviorSubject to broadcast the auth state
  private _isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    // Check local storage on startup to see if the user was already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this._isAuthenticated.next(isLoggedIn);
  }

  // Public observable that components can subscribe to
  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  // Dummy login function
  login(email: string, password: string): boolean {
    // In a real app, you'd verify credentials. Here, we just check they aren't empty.
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      this._isAuthenticated.next(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this._isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }
}
