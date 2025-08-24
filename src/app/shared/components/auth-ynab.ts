import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { YnabAuthService } from '../services/ynab-auth-service';

@Component({
  template: `<div class="p-6">Connecting YNAB…</div>`
})
export default class AuthYnab {
  private ynab = inject(YnabAuthService);
  private router = inject(Router);

  constructor() {
    const ok = this.ynab.saveTokenFromHash(location.hash);

    if (window.opener) {
      try { window.opener.postMessage({ type: 'ynab-connected' }, location.origin); } catch {}
      window.close();
      return;
    }

    this.router.navigateByUrl(ok ? '/' : '/');
  }
}
