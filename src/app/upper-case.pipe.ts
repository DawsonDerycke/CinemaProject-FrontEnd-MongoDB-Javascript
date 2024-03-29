import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCase'
})
export class UpperCasePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    value = value.toUpperCase();
    return value;
  }

}
