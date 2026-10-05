import { Routes } from '@angular/router';

/** Every page is lazy-loaded so the first visit only downloads what it needs. */
export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
  { path: 'products', loadComponent: () => import('./pages/products/products').then((m) => m.Products) },
  {
    path: 'products/:slug',
    loadComponent: () => import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
  },
  { path: 'categories', loadComponent: () => import('./pages/categories/categories').then((m) => m.Categories) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.About) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact) },
  { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
];
