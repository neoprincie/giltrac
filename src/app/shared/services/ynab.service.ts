import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class YnabService {

  constructor() { }

  async getCategories(budgetId: string, token: string): Promise<Category[]> {
    console.log(token);
    let response = await fetch(`https://api.ynab.com/v1/budgets/${budgetId}/categories`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json'
      }
    });

    let ynabCategories = await response.json();

    const categories: Category[] = ynabCategories.data.category_groups.flatMap((group: any) =>
    group.categories.map((cat: any) => ({
        id: cat.id,
        categoryGroupId: cat.category_group_id,
        categoryGroupName: cat.category_group_name,
        name: cat.name,
        assigned: cat.budgeted,
        available: cat.balance
      }))
    );

    return categories;
  }

  async assignCategories(budgetId: string, month: string, categories: Category[], token: string) {
    for(let cat of categories) {
      let response = await fetch (`https://api.ynab.com/v1/budgets/${budgetId}/months/${month}/categories/${cat.id}`, {
        method: 'PATCH',
        headers: {
        'Authorization': `Bearer ${token}`,
        'accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "category": {
            "budgeted": Math.round(cat.budgeted * 1000)
          }
        })
      })

      console.log(response);
    }
  }
}
