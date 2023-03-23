import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonImportModule } from 'src/app/core/common-import.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, VerifyEmailComponent],
  imports: [
    CommonImportModule,
    AuthRoutingModule,
    AngularSvgIconModule.forRoot(),
  ],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
