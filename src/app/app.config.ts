import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getFrenchPaginatorIntl} from './core/utils/get-french-paginator-intl';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MatPaginatorIntl, useValue: getFrenchPaginatorIntl()},
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
