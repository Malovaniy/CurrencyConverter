import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl ='https://v6.exchangerate-api.com/v6/f651758e2c210c8a94cf64c0/latest/';

  constructor(private http: HttpClient) {}

  getRates(base: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${base}`);
  }
}
