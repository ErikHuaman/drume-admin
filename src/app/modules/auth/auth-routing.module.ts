import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: Route[] = [
  // {
  //   path: 'auth',
  //   canActivate: [IsLoginGuard],
  //   canActivateChild: [IsLoginGuard],
  //   component: AuthPage,

  // },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/forgot-password', component: ForgotPasswordComponent },
  { path: 'auth/verify-email', component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
