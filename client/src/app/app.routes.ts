import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './auth/signup/signup.component';
import { TodoListComponent } from './todo/todo.component';
import { AuthGuard } from './auth/auth.guard';
import { CategoryManagerComponent } from './category/category.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'todos',
    component: TodoListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories',
    component: CategoryManagerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
