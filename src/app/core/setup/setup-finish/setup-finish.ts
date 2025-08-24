import { Component, computed, input, output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SetupPayload } from '../setup-payload';

@Component({
  selector: 'app-setup-finish',
  imports: [],
  template: `
    <section class="space-y-6">
      <h2 class="card-title">Review</h2>
      <div class="stats stats-vertical lg:stats-horizontal shadow">
        <div class="stat">
          <div class="stat-title">Google Sheet ID</div>
          <div class="stat-value text-sm truncate max-w-[56ch]" [title]="values().googleSheetId">
            {{ values().googleSheetId }}
          </div>
        </div>
        <div class="stat">
          <div class="stat-title">YNAB Budget ID</div>
          <div class="stat-value text-sm truncate max-w-[56ch]" [title]="values().ynabBudgetId">
            {{ values().ynabBudgetId }}
          </div>
        </div>
      </div>

      <div class="alert alert-info">
        <span>
          Looks good? Click <strong>Finish</strong> to emit your setup values. You can store them,
          test connections, or move on to your dashboard.
        </span>
      </div>

      <div class="card-actions justify-between">
        <button class="btn btn-ghost" (click)="back.emit()">Back</button>
        <button class="btn btn-success" (click)="next.emit()" [disabled]="!canFinish()">Finish</button>
      </div>
    </section>
  `,
})
export class SetupFinish {
  form = input.required<FormGroup>();

  next = output();
  back = output();

  values = computed<SetupPayload>(() => this.form().getRawValue() as SetupPayload);

  canFinish = () => this.form().valid;
}
