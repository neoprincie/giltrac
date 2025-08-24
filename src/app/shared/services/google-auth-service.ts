import { Injectable } from '@angular/core';
import { environment } from '../environment';

@Injectable({ providedIn: 'root' })
export class GoogleAuthService {
  private tokenKey = 'goog.token';
  private expKey   = 'goog.exp';

  private tokenClient?: any;
  private tokenExpiresAt = 0;

  private readonly scope = 'https://www.googleapis.com/auth/spreadsheets';

  init() {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: environment.google.clientId,
      scope: this.scope,
      callback: (resp: any) => {
        this.tokenExpiresAt = Date.now() + (resp.expires_in - 60) * 1000; 

        sessionStorage.setItem(this.tokenKey, resp.access_token!);
        sessionStorage.setItem(this.expKey, String(this.tokenExpiresAt));

        this._pendingResolve?.(resp.access_token as string);
        this._pendingResolve = null;
      },
    });
  }

  get token(): string | null {
    const t = sessionStorage.getItem(this.tokenKey);
    const exp = Number(sessionStorage.getItem(this.expKey) || 0);
    return t && Date.now() < exp ? t : null;
  }

  isConnected(): boolean {
    return !!this.token;
  }

  private _pendingResolve: ((token: string) => void) | null = null;

  async ensureToken(promptUserIfNeeded = true): Promise<string> {
    if (this.token) return this.token;

    if (!this.tokenClient) this.init();

    const prompt = promptUserIfNeeded ? '' : 'none';
    return new Promise<string>((resolve, reject) => {
      this._pendingResolve = resolve;
      try {
        this.tokenClient!.requestAccessToken({ prompt });
      } catch (e) {
        this._pendingResolve = null;
        reject(e);
      }
    });
  }

  signOut() {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.expKey);
  }
}