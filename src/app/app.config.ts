import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    importProvidersFrom([BrowserAnimationsModule]),
  ],
};
