import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDisplay'
})
export class DateDisplayPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.split('T')[0];
  }

}
