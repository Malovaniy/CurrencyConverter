import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CurrencyInputComponent } from '../currency-input/currency-input.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    AsyncPipe,
    MatFormFieldModule,
    CurrencyInputComponent,
  ],
  standalone: true,
  providers: [AsyncPipe],
})
export class ConverterComponent implements OnInit {
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  currencies = ['UAH', 'USD', 'EUR'];
  inputControl = this.fb.control({ amount: 0, currency: 'UAH' });
  outputControl = this.fb.control({ amount: 0, currency: 'USD' });

  constructor(
    public currencyService: CurrencyService,
    private fb: FormBuilder,
    private asyncPipe: AsyncPipe
  ) {}

  ngOnInit(): void {
    this.setupValueChangeHandler();
  }

  private setupValueChangeHandler(): void {
    this.inputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe(() => {
        this.updateAmount(this.inputControl, this.outputControl);
      });
    this.outputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        distinctUntilChanged(),
        debounceTime(400)
      )
      .subscribe(() => {
        this.updateAmount(this.outputControl, this.inputControl);
      });
  }

  private updateAmount(controlIn: FormControl, controlOut: FormControl): void {
    const rate = this.asyncPipe.transform(this.currencyService.rates$)![
      controlIn.value.currency
    ];
    controlOut.setValue(
      {
        amount: rate[controlOut.value.currency] * controlIn.value.amount,
        currency: controlOut.value.currency,
      },
      { emitEvent: false }
    );
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
