import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IRatesInterface } from '../shared/interfaces/currency-interface';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl =
    'https://v6.exchangerate-api.com/v6/f651758e2c210c8a94cf64c0/latest/';

  private _rates$ = new BehaviorSubject<IRatesInterface>({
    UAH: null,
    EUR: null,
    USD: null,
  });

  get rates$(): Observable<IRatesInterface> {
    return this._rates$.asObservable();
  }

  constructor(private http: HttpClient) {}

  getRates(base: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${base}`);
  }

  fetchAndStoreRates() {
    const currencies = ['USD', 'EUR', 'UAH'];
    currencies.forEach((currency) => {
      this.getRates(currency)
        .pipe(map((data) => ({ base: currency, rates: data.conversion_rates })))
        .subscribe((result) => {
          const currentRates = this._rates$.getValue();
          currentRates[result.base] = result.rates;
          this._rates$.next(currentRates);
        });
    });
  }
}
