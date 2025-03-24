import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'form/:id',
    loadComponent: () => import('./pages/form/form.page').then(v => v.FormPage),
  },
  {
    path: '_recruiter',
    loadComponent: () => import('./pages/recruiter/recruiter.page').then(v => v.RecruiterPage),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./pages/login/login.page').then(v => v.LoginPage),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.page').then(v => v.NotFoundPage),
  },
];
