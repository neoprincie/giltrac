import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class YnabAuthService {
  private tokenKey = 'ynab.token';
  private expKey   = 'ynab.exp';

  get token(): string | null {
    const t = sessionStorage.getItem(this.tokenKey);
    console.log("???" + t);
    const exp = Number(sessionStorage.getItem(this.expKey) || 0);
    return t && Date.now() < exp ? t : null;
  }

  isConnected(): boolean {
    return !!this.token;
  }

  async startLogin(): Promise<void> {
    const authUrl = `https://app.ynab.com/oauth/authorize?client_id=${environment.ynab.clientId}&redirect_uri=${environment.ynab.redirect}&response_type=token`

    window.location.assign(authUrl);
  }

  saveTokenFromHash(hash: string) {
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    
    const accessToken = params.get('access_token');
    const expiresIn = Number(params.get('expires_in') ?? 0);

    const expiresAt = Date.now() + (expiresIn - 60) * 1000;
    sessionStorage.setItem(this.tokenKey, accessToken!);
    sessionStorage.setItem(this.expKey, String(expiresAt));
    
    return true;
  }

  signOut() {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.expKey);
  }
}
