import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'opportunities' },
  { path: 'opportunities', loadComponent: () => import('./features/opportunities/opportunity-list/opportunity-list').then(m => m.OpportunityListComponent), title: 'Explore Opportunities | CodeConnect' },
  { path: 'opportunities/:id', loadComponent: () => import('./features/opportunities/opportunity-details/opportunity-details').then(m => m.OpportunityDetailsComponent), title: 'Opportunity Details | CodeConnect' },
  { path: 'favorites', loadComponent: () => import('./features/favorites/favorites').then(m => m.FavoritesComponent), title: 'Favorites | CodeConnect' },
  { path: 'register/:id', loadComponent: () => import('./features/registration/registration-wizard/registration-wizard').then(m => m.RegistrationWizardComponent), title: 'Register | CodeConnect' },
  { path: 'registrations', loadComponent: () => import('./features/registrations/my-registrations/my-registrations').then(m => m.MyRegistrationsComponent), title: 'My Registrations | CodeConnect' },
  { path: '**', loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFoundComponent), title: 'Page Not Found | CodeConnect' }
];
