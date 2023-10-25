import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'soles' })
export class SolesPipe implements PipeTransform {

  transform(value: number): string {
    return `S/ ${value.toFixed(2)}`;
  }

}
