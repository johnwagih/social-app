import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/header-interceptor';
import { provideToastr } from 'ngx-toastr';
import { errorInterceptor } from './core/interceptors/error-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration:"top"}) , withViewTransitions() , withHashLocation() ),
    provideHttpClient(withFetch() , withInterceptors([headerInterceptor, errorInterceptor])),
    provideToastr(
      {
    progressBar: true,
    progressAnimation: 'increasing',
    timeOut: 3000
      }
    ),
  ]
};
