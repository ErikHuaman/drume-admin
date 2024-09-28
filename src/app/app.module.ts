import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './modules/auth/auth.module';
import { ModulesModule } from './modules/modules.module';
import { TokenInterceptorProvider } from './core/interceptors/token.interceptor';
import { SettingsService } from './core/services/settings.service';

function initSettings(settings: SettingsService) {
  return (): Promise<any> => {
    return settings.loadInfo();
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AuthModule,
    ModulesModule,
    AngularSvgIconModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    TokenInterceptorProvider,
    Title,
    {
      provide: APP_INITIALIZER,
      useFactory: initSettings,
      deps: [SettingsService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
