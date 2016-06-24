import { RouterConfig }          from '@angular/router';
import { CategoryFormComponent }     from './category-form.component';


export const CategoriesRoutes: RouterConfig = [
  { path: 'category/:id',  component: CategoryFormComponent }  
];


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/