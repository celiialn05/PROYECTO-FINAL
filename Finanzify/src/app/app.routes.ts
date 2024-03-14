import { Routes } from '@angular/router';

export const routes: Routes = [
 {path : 'login', loadComponent:() => import('./login/login.page').then(m=>m.LoginPage)},
  {
    path: 'crear-cuenta',
    loadComponent: () => import('./crear-cuenta/crear-cuenta.page').then( m => m.CrearCuentaPage)
  },
];
