import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    // This path is now EMPTY because the parent route already handles "tabs"
    path: '', 
    component: TabsPage,
    children: [
      {
        path: 'map',
        loadComponent: () =>
          import('../pages/map/map.page').then((m) => m.MapPage),
      },
      {
        path: 'bookings',
        loadComponent: () =>
          import('../pages/bookings/bookings.page').then((m) => m.BookingsPage),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        // The redirect is now relative to this path
        path: '',
        redirectTo: 'map',
        pathMatch: 'full',
      },
    ],
  },
  // This top-level redirect is no longer needed in this file
  // {
  //   path: '',
  //   redirectTo: '/tabs/map',
  //   pathMatch: 'full',
  // },
];