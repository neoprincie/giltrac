import { Component, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-ynab',
  imports: [ReactiveFormsModule],
  template: `
    <section class="space-y-6">
      <div class="flex items-center gap-3">
        <h2 class="card-title">YNAB Budget</h2>
        <span class="badge">Required</span>
      </div>

      <p class="text-base-content/80">
        Enter your <strong>YNAB Budget ID</strong> (a UUID). You can find this in YNAB’s URL when a
        budget is open.
      </p>

      <div class="mockup-code text-sm">
        <pre
          data-prefix=">"
        ><code>https://app.ynab.com/<strong class="text-info">BUDGET_ID</strong>/budget</code></pre>
      </div>

      <form [formGroup]="formGroup()" class="space-y-4" (ngSubmit)="noop()">
        <label class="form-control">
          <div class="label">
            <span class="label-text">YNAB Budget ID</span>
            <span class="label-text-alt">Looks like 123e4567-e89b-12d3-a456-426614174000</span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            formControlName="ynabBudgetId"
          />
          <div class="label h-6">
            @if (formGroup().get('ynabBudgetId')?.touched && formGroup().get('ynabBudgetId')?.invalid) {
              <span class="label-text-alt text-error">
                Please enter a valid UUID (lower/uppercase allowed).
              </span>
            }
          </div>
        </label>

        <div class="card-actions justify-between mt-4">
          <button type="button" class="btn btn-ghost" (click)="back.emit()">Back</button>
          <button
            type="button"
            class="btn btn-primary"
            (click)="next.emit()"
          >
            Continue
          </button>
        </div>
      </form>
    </section>
  `,
})
export class SetupYnab {
  formGroup = input.required<FormGroup>();
  
  next = output();
  back = output();

  noop() {}
}
