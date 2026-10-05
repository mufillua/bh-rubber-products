import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { ActivatedRouteSnapshot, provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

/** Deepest active route — used to tell a real page change from a query-param update. */
function leaf(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  let s = snapshot;
  while (s.firstChild) s = s.firstChild;
  return s;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      // Scrolling is handled in App so filter/search changes don't jump to the top.
      withInMemoryScrolling({ scrollPositionRestoration: 'disabled', anchorScrolling: 'enabled' }),
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition, from, to }) => {
          const a = leaf(from);
          const b = leaf(to);
          const samePage = a.routeConfig === b.routeConfig && JSON.stringify(a.params) === JSON.stringify(b.params);
          if (samePage) transition.skipTransition();
        },
      }),
    ),
  ],
};
