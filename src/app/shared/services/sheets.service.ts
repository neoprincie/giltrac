import { Injectable } from '@angular/core';
import { GoogleAuthService } from './google-auth-service';

const SHEETS_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

@Injectable({ providedIn: 'root' })
export class SheetsService {
  private sheetId = localStorage.getItem('goog.sheetId');

  constructor(private auth: GoogleAuthService) {}

  private async authedFetch(input: RequestInfo, init: RequestInit = {}) {
    const token = await this.auth.ensureToken();
    const headers = new Headers(init.headers || {});
    headers.set('Authorization', `Bearer ${token}`);
    return fetch(input, { ...init, headers });
  }

  async readRange(rangeA1: string): Promise<string[][]> {
    const url = `${SHEETS_BASE}/${this.sheetId}/values/${encodeURIComponent(rangeA1)}`;
    const res = await this.authedFetch(url);
    if (!res.ok) throw new Error(`Read failed: ${res.status} ${res.statusText}`);
    const data = await res.json();
    return data.values ?? [];
  }

  async updateRange(rangeA1: string, values: (string | number | boolean | null)[][], valueInputOption: 'RAW' | 'USER_ENTERED' = 'USER_ENTERED') {
    const url = `${SHEETS_BASE}/${this.sheetId}/values/${encodeURIComponent(rangeA1)}?valueInputOption=${valueInputOption}`;
    const res = await this.authedFetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ values }),
    });
    if (!res.ok) throw new Error(`Update failed: ${res.status} ${res.statusText}`);
    return res.json();
  }

  async appendRows(rangeA1: string, rows: (string | number | boolean | null)[][], valueInputOption: 'RAW' | 'USER_ENTERED' = 'USER_ENTERED') {
    const url = `${SHEETS_BASE}/${this.sheetId}/values/${encodeURIComponent(rangeA1)}:append?valueInputOption=${valueInputOption}&insertDataOption=INSERT_ROWS`;
    const res = await this.authedFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ values: rows }),
    });
    if (!res.ok) throw new Error(`Append failed: ${res.status} ${res.statusText}`);
    return res.json();
  }

  async readBudgetTable(maxRows = 500, maxCols = 'G') {
    return this.readRange(`Budget!A1:${maxCols}${maxRows}`);
  }

  async writeBudgetHeader(cols: string[]) {
    return this.updateRange('Budget!A1', [cols]);
  }

  async upsertBudgetRow(rowIndex1Based: number, cells: (string | number | boolean | null)[]) {
    const range = `Budget!D${rowIndex1Based}:D${rowIndex1Based}`
    return this.updateRange(range, [cells]);
  }
}
