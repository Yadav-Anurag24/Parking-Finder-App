import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    canActivate: [AuthGuard] // Protects the main app
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    // THIS IS THE ROUTE THAT WAS LIKELY MISSING
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./pages/parking-details/parking-details.page').then( m => m.ParkingDetailsPage),
    canActivate: [AuthGuard] // Also protects the details page
  },
  {
    // This makes the login page the default page for the app
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];