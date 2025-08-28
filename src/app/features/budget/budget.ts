import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { YnabAuthService } from '../../shared/services/ynab-auth-service';
import { GoogleAuthService } from '../../shared/services/google-auth-service';
import { BudgetCategoriesComponent } from './budget-categories/budget-categories.component';
import { YnabService } from '../../shared/services/ynab.service';
import { SheetsService } from '../../shared/services/sheets.service';
import { Category } from '../../shared/models/category.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-budget',
  imports: [BudgetCategoriesComponent, CurrencyPipe],
  template: `
    @if (error()) {
      <div class="text-red-600">{{ error() }}</div>
    }

    <div class="mx-auto w-4/5 grid grid-cols-6 gap-6">
      <div class="col-span-4 overflow-x-auto">
        <app-budget-categories [categories]="categories()" (budgetedChanged)="onBudgetedChanged()"></app-budget-categories>
      </div>
      <div class="col-span-2">
        <div class="sticky top-4">
          <div class="bg-transparent shadow-none">
            <img
              src="/giltrac.png"
              alt="Giltrac"
              class="w-1/2 mx-auto mb-2 bg-transparent shadow-none"
              loading="eager"
              decoding="async"
            />
          </div>
          <div class="p-2 bg-base-200 rounded-lg shadow">
            <h2 class="mt-2">Expected Monthly Income</h2>
            <input type="text" [value]="income() | currency:'USD'" placeholder="$6250.00" class="input input-ghost input-accent input-lg my-2" />
            <p class="mt-4">Remaining to Budget</p>
            <input type="text" [value]="remaining() | currency:'USD'" placeholder="$6250.00" [class]="'input input-ghost input-lg my-2 ' + remainingClass()" disabled />
          </div>
          <div class="mt-2 p-2 bg-base-200 rounded-lg shadow">
            <h2 class="font-bold">Budget Controls</h2>
            <button class="btn btn-soft btn-primary w-full my-2" (click)="saveBudget()">Save</button>
          </div>
          <div class="mt-2 p-2 bg-base-200 rounded-lg shadow">
            <h2 class="font-bold">YNAB Controls</h2>
            <!-- <button class="btn btn-soft btn-primary w-full my-2">Assign to Current Month</button> -->
            <button class="btn btn-soft btn-secondary w-full my-2" (click)="assignNextMonth()">Assign to Next Month</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class Budget {
  router = inject(Router);

  budgetId: string = '';

  constructor() {
    if (!inject(YnabAuthService).isConnected() || ! inject(GoogleAuthService).isConnected()) {
      this.router.navigate(['login']);
    } else if(!localStorage.getItem('ynab.budgetId') || !localStorage.getItem('goog.sheetId')) {
      this.router.navigate(['setup']);
    } else {
      this.budgetId = localStorage.getItem('ynab.budgetId')!;
      this.loadBudget();
    }
  }

  ynabService = inject(YnabService);
  googleAuth = inject(GoogleAuthService);
  ynabAuth = inject(YnabAuthService);
  sheets = inject(SheetsService);

  categories = signal<Category[]>([]);
  error = signal<string | null>(null);

  income = signal<number>(3333.33);
  budgeted = signal<number>(0);
  remaining = computed(() => this.income() - this.budgeted());

  remainingClass = computed(() => {
    const r = this.remaining();
    return r > 0
      ? '!text-green-300'
      : r < 0
      ? '!text-red-300'
      : '';
  });

  async loadBudget() {
    this.error.set(null);
    try {
      const data = await this.sheets.readBudgetTable(200, 'F');
      console.log(data);
      const ynabData = await this.ynabService.getCategories(this.budgetId, this.ynabAuth.token!);
      console.log(ynabData);
      
      let cats: Category[] = [];
      for(let row of data.slice(1)) {
        let ynabCat = ynabData.find(
          c => c.name === row[2] && 
          c.categoryGroupName === row[1]);
        
        cats.push({
          id: ynabCat?.id ?? '',
          categoryGroupId: ynabCat?.categoryGroupId ?? '',
          name: row[2],
          categoryGroupName: row[1],
          budgeted: Number(row[3]),
          assigned: Number(ynabCat?.assigned),
          available: Number(ynabCat?.available),
        })
      }

      this.categories.set(cats);
      this.income.set(Number(data[1][4]));
      this.sumRemaining();
    } catch (e: any) {
      this.error.set(e?.message ?? String(e));
    }
  }

  async onBudgetedChanged() {
    this.sumRemaining();
  }

  async sumRemaining() {
    let sum = this.categories().reduce((sum, cat) => sum + cat.budgeted, 0);
    this.budgeted.set(sum);
  }

  async saveBudget() {
    for(let i = 0; i < this.categories().length; i++) {
      await this.sheets.upsertBudgetRow(i + 2, [this.categories()[i].budgeted]);
    }
  }

  async assignNextMonth() {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
      .toISOString()
      .split('T')[0];
      
    await this.ynabService.assignCategories(this.budgetId, nextMonth, this.categories(), this.ynabAuth.token!);
  }
}
