import { Routes } from '@angular/router';
import { PrincipalPage } from './principal/principal.page';
import { DashboardPage } from './dashboard/dashboard.page';
import { ContabilidadPage } from './contabilidad/contabilidad.page';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
 {path : 'login', loadComponent:() => import('./login/login.page').then(m=>m.LoginPage)},
  {
    path: 'crear-cuenta',
    loadComponent: () => import('./crear-cuenta/crear-cuenta.page').then( m => m.CrearCuentaPage)
  },
  {
    path: 'principal',
    component: PrincipalPage,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
      },
      {
        path: 'contabilidad',
        loadComponent: () => import('./contabilidad/contabilidad.page').then( m => m.ContabilidadPage)
      },
      {
        path: '',
        redirectTo: 'dashboard', // Redirigir a dashboard por defecto
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'contabilidad',
    loadComponent: () => import('./contabilidad/contabilidad.page').then( m => m.ContabilidadPage)
  },

];
