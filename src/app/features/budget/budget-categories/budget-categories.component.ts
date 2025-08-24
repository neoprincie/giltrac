import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../shared/models/category.model';

@Component({
  selector: 'app-budget-categories',
  imports: [CurrencyPipe, FormsModule],
  template: `
    <table class="table w-full">
      <thead>
        <tr>
          <th></th>
          <th>Group</th>
          <th>Category</th>
          <th>Assigned</th>
          <th>Available</th>
          <th>Budgeted</th>
        </tr>
      </thead>
      <tbody>
        @for(cat of categories(); track $index) {
          <tr>
            <th>{{ $index }}</th>
            <td>{{ cat.categoryGroupName }}</td>
            <td>{{ cat.name }}</td>
            <td>{{ cat.assigned / 1000 | currency:'USD':'symbol':'1.2-2' }}</td>
            <td>{{ cat.available / 1000 | currency:'USD':'symbol':'1.2-2' }}</td>
            <td><input type="number" placeholder="Budgeted" [(ngModel)]="cat.budgeted" class="input input-accent" (input)="onBudgetedChanged($event)" /></td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class BudgetCategoriesComponent {
  categories = input.required<Category[]>();

  budgetedChanged = output<void>();

  async onBudgetedChanged(event: Event) {
    this.budgetedChanged.emit();
  }
}
