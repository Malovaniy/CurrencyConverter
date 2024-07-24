import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  imports: [
    NgFor,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  standalone: true,
})
export class ConverterComponent implements OnInit {
  currencies = ['UAH', 'USD', 'EUR'];
  conversionForm!: FormGroup;
  result?: number;

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.conversionForm = this.fb.group({
      input: this.fb.group({
        amount: [''],
        currency: ['UAH'],
      }),
      output: this.fb.group({
        amount: [''],
        currency: ['UAH'],
      }),
    });

    this.conversionForm
      .get('input')!
      .valueChanges.pipe(
        switchMap((value) => this.currencyService.getRates(value.currency))
      )
      .subscribe((data) => {
        const input = this.conversionForm.get('input')!;
        const output = this.conversionForm.get('output')!;
        const rate = data.conversion_rates[output.get('currency')!.value];
        const amount2 = input.get('amount')!.value * rate;
        output.get('amount')!.setValue(amount2, { emitEvent: false });
      });

    this.conversionForm
      .get('output')!
      .valueChanges.pipe(
        switchMap((value) => this.currencyService.getRates(value.currency))
      )
      .subscribe((data) => {
        const input = this.conversionForm.get('input')!;
        const output = this.conversionForm.get('output')!;
        const rate = data.conversion_rates[input.get('currency')!.value];
        const amount1 = output.get('amount')!.value * rate;
        input.get('amount')!.setValue(amount1, { emitEvent: false });
      });
  }
}
