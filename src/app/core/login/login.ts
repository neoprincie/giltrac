import { Component, inject } from '@angular/core';
import { YnabAuthService } from '../../shared/services/ynab-auth-service';
import { GoogleAuthService } from '../../shared/services/google-auth-service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgClass, RouterLink],
  template: `
    <div class="mx-auto max-w-xl px-4 my-20">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body items-center text-center">
          <img
            src="/giltrac.png"
            alt="Giltrac"
            class="w-28 mb-2"
            loading="eager"
            decoding="async"
          />
          <p class="text-base-content/70">
            Giltrac is a companion tool for YNAB that takes your fixed monthly income and helps you
            build a forward-looking budget plan. It makes it easier to pre-assign categories and
            amounts across future months so you can stay organized and consistent.
          </p>

          <div class="w-full">
            @if(!this.ynabService.isConnected() || !this.googleService.isConnected()) {
              <button class="btn btn-primary btn-block" (click)="signIn()">
                Sign in to get started
              </button>
            }

            @if(this.ynabService.isConnected() && this.googleService.isConnected()) {
              <a class="btn btn-primary btn-block" routerLink="/setup">Continue to Setup</a>
            }
          </div>

          <div class="divider my-2">Connections</div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
            <div class="rounded-lg border border-base-300 p-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span
                  class="h-2.5 w-2.5 rounded-full"
                  [ngClass]="this.ynabService.isConnected() ? 'bg-success' : 'bg-error'"
                ></span>
                <span class="font-medium">YNAB</span>
              </div>
              <span
                class="text-sm"
                [ngClass]="this.ynabService.isConnected() ? 'text-success' : 'text-error'"
              >
                {{ this.ynabService.isConnected() ? 'Connected' : 'Not connected' }}
              </span>
            </div>

            <div class="rounded-lg border border-base-300 p-3 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <span
                  class="h-2.5 w-2.5 rounded-full"
                  [ngClass]="this.googleService.isConnected() ? 'bg-success' : 'bg-error'"
                ></span>
                <span class="font-medium">Google</span>
              </div>
              <span
                class="text-sm"
                [ngClass]="this.googleService.isConnected() ? 'text-success' : 'text-error'"
              >
                {{ this.googleService.isConnected() ? 'Connected' : 'Not connected' }}
              </span>
            </div>
          </div>

          <div class="card-actions justify-center w-full pt-2">
            @if(this.ynabService.isConnected() && this.googleService.isConnected()) {
              <button class="btn btn-ghost btn-sm" (click)="signOut()">
                Sign out
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class Login {
  ynabService = inject(YnabAuthService);
  googleService = inject(GoogleAuthService);
  router = inject(Router);

  async signIn() {
    await this.googleService.ensureToken();
    await this.ynabService.startLogin();

    this.router.navigate(['']);
  }

  async signOut() {
    this.ynabService.signOut();
    this.googleService.signOut();
  }
}
