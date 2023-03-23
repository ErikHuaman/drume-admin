import { NgModule } from '@angular/core';
import { CommonImportModule } from './common-import.module';

const BASE_MODULES = [CommonImportModule];

@NgModule({
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES],
})
export class CoreModule {}
