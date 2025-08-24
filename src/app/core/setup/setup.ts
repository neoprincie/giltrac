import { Component, EventEmitter, Output, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SetupIntro } from './setup-intro/setup-intro';
import { SetupSheets } from './setup-sheets/setup-sheets';
import { SetupYnab } from './setup-ynab/setup-ynab';
import { SetupPayload } from './setup-payload';
import { SetupFinish } from './setup-finish/setup-finish';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SetupIntro, SetupSheets, SetupYnab, SetupFinish],
  template: `
  <div class="max-w-3xl mx-auto p-4">
    <img
      src="/giltrac.png"
      alt="Giltrac"
      class="w-2/5 mx-auto mb-2 bg-transparent shadow-none"
      loading="eager"
      decoding="async"
    />

    <ul class="steps w-full mb-6">
      <li class="step" [class.step-primary]="step() >= 0">Welcome</li>
      <li class="step" [class.step-primary]="step() >= 1">Google Sheet</li>
      <li class="step" [class.step-primary]="step() >= 2">YNAB Budget</li>
      <li class="step" [class.step-primary]="step() >= 3">Finish</li>
    </ul>

    <div class="card bg-base-300 shadow-lg">
      <div class="card-body">
        @if (step() === 0) {
          <app-setup-intro (next)="step.set(1)"></app-setup-intro>
        }

        @if (step() === 1) {
          <app-setup-sheets (next)="step.set(2)" (back)="step.set(0)" [formGroup]="form"></app-setup-sheets>
        }

        @if (step() === 2) {
          <app-setup-ynab (next)="step.set(3)" (back)="step.set(1)" [formGroup]="form"></app-setup-ynab>
        }

        @if (step() === 3) {
          <app-setup-finish (next)="finish()" (back)="step.set(2)" [form]="form"></app-setup-finish>
        }
      </div>
    </div>
  </div>
  `,
})
export class Setup {
  router = inject(Router);

  @Output() completed = new EventEmitter<SetupPayload>();

  private fb = new FormBuilder();

  step = signal(0);

  form: FormGroup = this.fb.group({
    googleSheetId: [localStorage.getItem('goog.sheetId') ?? '', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9_-]{25,80}$/),
    ]],
    ynabBudgetId: [localStorage.getItem('ynab.budgetId') ?? '', [
      Validators.required,
      Validators.pattern(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/),
    ]],
  });

  values = computed<SetupPayload>(() => ({
    googleSheetId: this.form.value.googleSheetId ?? '',
    ynabBudgetId: this.form.value.ynabBudgetId ?? '',
  }));

  canFinish(): boolean {
    return this.form.valid;
  }

  finish() {
    if (!this.canFinish()) {
      this.touchAll();
      return;
    }
    this.completed.emit(this.values());

    localStorage.setItem('ynab.budgetId', this.form.value.ynabBudgetId);
    localStorage.setItem('goog.sheetId', this.form.value.googleSheetId);

    this.router.navigate(['']);
  }

  touchAll() {
    this.form.markAllAsTouched();
    this.form.markAllAsTouched();
  }

  selectAll(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    target.select();
  }

  noop() {}
}
