import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { ModulesModule } from './modules/modules.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AuthModule,
    ModulesModule,
    AngularSvgIconModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
