import { NgModule } from '@angular/core';
import { CommonImportModule } from './common-import.module';
import { SolesPipe } from './pipes/soles.pipe';

const BASE_MODULES = [CommonImportModule];

@NgModule({
  declarations: [SolesPipe],
  imports: [...BASE_MODULES],
  exports: [...BASE_MODULES, SolesPipe],
})
export class CoreModule {}
