import { Injectable } from '@angular/core';
import { SheetsService } from '../sheets.service';

@Injectable({
  providedIn: 'root'
})
export class DemoSheetsService extends SheetsService {
  override readRange(rangeA1: string): Promise<string[][]> {
    return Promise.resolve([]);
  }

  override updateRange(rangeA1: string, values: (string | number | boolean | null)[][], valueInputOption?: 'RAW' | 'USER_ENTERED'): Promise<any> {
    return Promise.resolve();
  }

  override appendRows(rangeA1: string, rows: (string | number | boolean | null)[][], valueInputOption?: 'RAW' | 'USER_ENTERED'): Promise<any> {
    return Promise.resolve();
  }

  override readBudgetTable(maxRows?: number, maxCols?: string): Promise<string[][]> {
    let results = [
      [
        "Category Group/Category",
        "Category Group",
        "Category",
        "Budgeted",
        "Income"
      ],
      [
        "Bills: Mortgage",
        "Bills",
        "Mortgage",
        "1000",
        "3000"
      ],
      [
        "Bills: Utilities",
        "Bills",
        "Utilities",
        "200"
      ],
      [
        "Food: Groceries",
        "Food",
        "Groceries",
        "500"
      ],
      [
        "Food: Dining Out",
        "Food",
        "Dining Out",
        "350.5"
      ],
      [
        "Variable Obligations: Other",
        "Variable Obligations",
        "Other",
        "200"
      ],
      [
        "Variable Obligations: Games",
        "Variable Obligations",
        "Games",
        "333.33"
      ],
    ]
    return Promise.resolve(results);
  }

  override writeBudgetHeader(cols: string[]): Promise<any> {
    return Promise.resolve();
  }

  override upsertBudgetRow(rowIndex1Based: number, cells: (string | number | boolean | null)[]): Promise<any> {
    return Promise.resolve();
  }
}
