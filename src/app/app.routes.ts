import { Routes } from '@angular/router';
import { Login } from './core/login/login';
import AuthYnab from './shared/components/auth-ynab';
import { Budget } from './features/budget/budget';
import { Setup } from './core/setup/setup';
import { Privacy } from './core/privacy/privacy';

export const routes: Routes = [
  { path: '', component: Budget },
  { path: 'login', component: Login },
  { path: 'ynab', component: AuthYnab },
  { path: 'setup', component: Setup },
  { path: 'privacy', component: Privacy }
];
