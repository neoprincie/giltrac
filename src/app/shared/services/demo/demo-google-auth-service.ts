import { Injectable } from '@angular/core';
import { GoogleAuthService } from '../google-auth-service';

@Injectable({
  providedIn: 'root'
})
export class DemoGoogleAuthService extends GoogleAuthService {
  override init(): void {
    
  }

  override get token(): string | null {
    return 'demo-token';
  }

  override isConnected(): boolean {
    return true;
  }

  override ensureToken(promptUserIfNeeded?: boolean): Promise<string> {
    return Promise.resolve('');
  }

  override signOut(): void {
    
  }
  
}
