import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  usdToUah?: number;
  eurToUah?: number;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getRates('USD').subscribe((data) => {
      this.usdToUah = data.conversion_rates.UAH;
    });

    this.currencyService.getRates('EUR').subscribe((data) => {
      this.eurToUah = data.conversion_rates.UAH;
    });
  }
}
