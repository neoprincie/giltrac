import { Component, output } from '@angular/core';

@Component({
  selector: 'app-setup-intro',
  imports: [],
  template: `
    <section class="space-y-4">
      <h2 class="card-title">Welcome!</h2>
      <p>
        This quick setup gathers your <span class="badge badge-outline">Google Sheet ID</span> and
        <span class="badge badge-outline">YNAB Budget ID</span>, then you’ll be ready to start planning. 
        Giltrac integrates with YNAB and uses a Google sheet to store planning data.
      </p>

      <div class="alert">
        <span>
          You can revisit this wizard anytime. Your entries are validated and saved locally.
        </span>
      </div>

      <div class="card-actions justify-end">
        <button class="btn btn-primary" (click)="next.emit()">Get started</button>
      </div>
    </section>
  `
})
export class SetupIntro {
  next = output();
}
