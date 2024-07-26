import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { Subject } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [AsyncPipe, NgIf],
  standalone: true,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.fetchAndStoreRates();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
