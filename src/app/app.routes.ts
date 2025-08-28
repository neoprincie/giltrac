import { Routes } from '@angular/router';
import { Login } from './core/login/login';
import AuthYnab from './shared/components/auth-ynab';
import { Budget } from './features/budget/budget';
import { Setup } from './core/setup/setup';
import { Privacy } from './core/privacy/privacy';
import { YnabService } from './shared/services/ynab.service';
import { DemoYnabService } from './shared/services/demo/demo-ynab-service';
import { YnabAuthService } from './shared/services/ynab-auth-service';
import { DemoYnabAuthService } from './shared/services/demo/demo-ynab-auth-service';
import { GoogleAuthService } from './shared/services/google-auth-service';
import { DemoGoogleAuthService } from './shared/services/demo/demo-google-auth-service';
import { SheetsService } from './shared/services/sheets.service';
import { DemoSheetsService } from './shared/services/demo/demo-sheets-service';

export const routes: Routes = [
  { path: '', component: Budget },
  { path: 'login', component: Login },
  { path: 'ynab', component: AuthYnab },
  { path: 'setup', component: Setup },
  { path: 'privacy', component: Privacy },
  { 
    path: 'demo',
    component: Budget,
    providers: [
      { provide: YnabService, useClass: DemoYnabService },
      { provide: YnabAuthService, useClass: DemoYnabAuthService },
      { provide: GoogleAuthService, useClass: DemoGoogleAuthService },
      { provide: SheetsService, useClass: DemoSheetsService }
    ]
  }
];
