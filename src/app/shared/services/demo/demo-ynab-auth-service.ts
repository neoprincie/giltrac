import { Injectable } from '@angular/core';
import { YnabAuthService } from '../ynab-auth-service';

@Injectable({ providedIn: 'root' })
export class DemoYnabAuthService extends YnabAuthService {
    override get token(): string | null {
        return 'demo-token';
    }

    override isConnected(): boolean {
        return true;
    }

    override startLogin(): Promise<void> {
        return Promise.resolve();
    }

    override saveTokenFromHash(hash: string): boolean {
        return true;
    }

    override signOut(): void {
       
    }
}
