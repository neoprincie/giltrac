import { Injectable } from '@angular/core';
import { YnabService } from '../ynab.service';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class DemoYnabService extends YnabService {
  override getCategories(budgetId: string, token: string): Promise<Category[]> {
    let results = [
      {
          "id": "1",
          "categoryGroupId": "1",
          "categoryGroupName": "Bills",
          "name": "Mortgage",
          "assigned": 0,
          "available": 0
      },
      {
          "id": "2",
          "categoryGroupId": "1",
          "categoryGroupName": "Bills",
          "name": "Utilities",
          "assigned": 0,
          "available": 0
      },
      {
          "id": "3",
          "categoryGroupId": "2",
          "categoryGroupName": "Food",
          "name": "Groceries",
          "assigned": 0,
          "available": 0
      },
      {
          "id": "4",
          "categoryGroupId": "2",
          "categoryGroupName": "Food",
          "name": "Dining Out",
          "assigned": 0,
          "available": 0
      },
      {
          "id": "5",
          "categoryGroupId": "3",
          "categoryGroupName": "Variable Obligations",
          "name": "Other",
          "assigned": 0,
          "available": 0
      },
      {
          "id": "6",
          "categoryGroupId": "3",
          "categoryGroupName": "Variable Obligations",
          "name": "Games",
          "assigned": 0,
          "available": 0
      }
    ]
    return Promise.resolve(results as any);
  }

  override assignCategories(budgetId: string, month: string, categories: Category[], token: string): Promise<void> {
    return Promise.resolve();
  }
}
