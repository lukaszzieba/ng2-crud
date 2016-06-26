import { provideRouter, RouterConfig } from '@angular/router';

// my components
import { HomeComponent } from './home/home.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryFormComponent } from './category/category-form.component';
import { CategoryListComponent } from './category/category-list.component';
import { CategoryDetailsComponent } from './category/category-details.component';

import { ProductFormComponent } from './product/product-form.component';


export const routes: RouterConfig = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
 
  { path: 'categories', component: CategoryListComponent },
  { path: 'category/:id', component: CategoryFormComponent },
  { path: 'category/parent/:parentId', component: CategoryFormComponent },

  { path: 'product/parent/:parentId', component: ProductFormComponent },

  { path: 'details/:id', component: CategoryDetailsComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];