import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commaToDot'
})
export class CommaToDotPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value.replace(/,/g, '.'); // Replace all commas with dots
  }

}
