import { Component, input, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-sheets',
  imports: [ReactiveFormsModule],
  template: `
    <section class="space-y-6">
      <div class="flex items-center gap-3">
        <h2 class="card-title">Google Sheet</h2>
        <span class="badge">Required</span>
      </div>

      <p class="text-base-content/80">
        Provide the <strong>Sheet ID</strong> (the long ID in the URL):
      </p>

      <div class="mockup-code text-sm">
        <pre
          data-prefix=">"
        ><code>https://docs.google.com/spreadsheets/d/<strong class="text-info">YOUR_SHEET_ID</strong>/edit#gid=0</code></pre>
      </div>

      <form [formGroup]="formGroup()" class="space-y-4" (ngSubmit)="noop()">
        <label class="form-control">
          <div class="label">
            <span class="label-text">Google Sheet ID</span>
            <span class="label-text-alt">Paste from the URL</span>
          </div>
          <input
            type="text"
            class="input input-bordered w-full"
            placeholder="e.g. 1A2bC3dE4F5g_hIJKLmNopQRstuVWxyz123456789"
            formControlName="googleSheetId"
          />
          <div class="label h-6">
            @if (formGroup().get('googleSheetId')?.touched && formGroup().get('googleSheetId')?.invalid) {
              <span class="label-text-alt text-error">
                Please enter a valid Sheet ID (25–80 chars; letters, numbers, - or _).
              </span>
            }
          </div>
        </label>

        <details class="collapse collapse-arrow bg-base-200 mt-4">
          <summary class="collapse-title text-lg font-medium">
            How to structure your Google Sheet
          </summary>
          <div class="collapse-content space-y-4">
            <p>
              Create a tab called <span class="badge badge-outline">Budget</span> with these
              columns (exact headers):
            </p>

            <div class="overflow-x-auto">
              <table class="table table-zebra">
                <thead>
                  <tr>
                    <th>Category Group/Category</th>
                    <th>Category Group</th>
                    <th>Category</th>
                    <th>Budgeted</th>
                    <th>Income</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Home / Mortgage</td>
                    <td>Home</td>
                    <td>Mortgage</td>
                    <td>1500</td>
                    <td>3000</td>
                  </tr>
                  <tr>
                    <td>Utilities / Electricity</td>
                    <td>Utilities</td>
                    <td>Electricity</td>
                    <td>120</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Variable Obligations / Video Games</td>
                    <td>Variable Obligations</td>
                    <td>Video Games</td>
                    <td>300</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <ul class="list-disc ml-6 space-y-1 text-sm">
              <li>
                <strong>Category Group/Category</strong> is just “Category Group /
                Category” from the following two columns.
              </li>
              <li>
                <strong>Category Group</strong> and <strong>Category</strong> should match exactly
                what YNAB shows.
              </li>
              <li>
                <strong>Budgeted</strong> is the planned amount for the month (number, no currency
                symbol).
              </li>
              <li>
                <strong>Income</strong> only needs to be filled in on the first non-header row with your expected monthly income; leave the others
                blank.
              </li>
            </ul>

            <div>
              <label class="label"><span class="label-text">Copyable sample (CSV)</span></label>
              <textarea
                class="textarea textarea-bordered w-full text-xs"
                rows="6"
                readonly
                (click)="selectAll($event)"
              >
Category Group/Category,Category Group,Category,Budgeted,Income
Home / Mortgage,Home,Mortgage,1500,3000
Utilities / Electricity,Utilities,Electricity,120,
Variable Obligations / Video Games,Variable Obligations,Video Games,300,
                  </textarea
              >
              <p class="text-xs text-base-content/60 mt-2">
                Paste into a Google Sheet; Select the data and choose <span class="badge badge-outline">Data -> Split Text Into Columns</span>.
              </p>
              <p class="mt-4">
                A potentially easier way to bootstrap the sheet might be to export similar data from YNAB as a CSV
                and then to edit it. In any case, while it is necessary for the category and group names to match exactly
                with what YNAB shows, it is not necessary to duplicate every category available in YNAB. For example, a savings
                category could be left out of Giltrac if it won't receive monthly assignments.
              </p>
            </div>
          </div>
        </details>

        <div class="card-actions justify-between">
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
export class SetupSheets {
  formGroup = input.required<FormGroup>();

  next = output();
  back = output();

  selectAll(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    target.select();
  }

  noop() {}
}
