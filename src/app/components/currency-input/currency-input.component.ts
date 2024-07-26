import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { ICurrencyInterface } from '../../shared/interfaces/currency-interface';

@Component({
  selector: 'app-currency-input',
  templateUrl: './currency-input.component.html',
  styleUrls: ['./currency-input.component.scss'],
  imports: [NgFor, MatInputModule, MatSelectModule, MatFormFieldModule],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
})
export class CurrencyInputComponent implements ControlValueAccessor {
  @Input() currencies: string[] = [];
  amount!: number;
  currency!: string;
  onTouched!: Function;
  onChange!: Function;
  private cd = inject(ChangeDetectorRef);

  writeValue(value: ICurrencyInterface): void {
    if (value) {
      this.amount = value.amount;
      this.currency = value.currency;
      this.cd.detectChanges();
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  onAmountChange(element: HTMLInputElement): void {
    this.amount = parseFloat(element.value);
    this.updateParent();
  }

  onCurrencyChange(value: string): void {
    this.currency = value;
    this.updateParent();
  }

  private updateParent(): void {
    this.onChange({ amount: this.amount, currency: this.currency });
    this.onTouched();
  }
}
