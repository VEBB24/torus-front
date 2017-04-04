import { Pipe, PipeTransform } from '@angular/core';
export type ByteUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';
function isNumber(value: any): value is number { return typeof value === 'number'; }
function isNumberFinite(value: any): value is number { return isNumber(value) && isFinite(value); }
function isPositive(value: number): boolean { return value >= 0; }
function isInteger(value: number): boolean { return (value % 1) === 0; }
function toDecimal(value: number, decimal: number): number { return Math.round(value * Math.pow(10, decimal)) / Math.pow(10, decimal); }

@Pipe({
  name: 'byte'
})
export class BytePipe implements PipeTransform {

  static formats: { [key: string]: { max: number, prev?: ByteUnit } } = {
    'B': { max: 1024 },
    'KB': { max: Math.pow(1024, 2), prev: 'B' },
    'MB': { max: Math.pow(1024, 3), prev: 'KB' },
    'GB': { max: Math.pow(1024, 4), prev: 'MB' },
    'TB': { max: Number.MAX_SAFE_INTEGER, prev: 'GB' }
  };


  transform(input: any, decimal: number = 0, from: ByteUnit = 'B'): any {

    if (!(isNumberFinite(input) &&
      isNumberFinite(decimal) &&
      isInteger(decimal) &&
      isPositive(decimal))) {
      return input;
    }

    let bytes = input;
    let unit = from;
    while (unit != 'B') {
      bytes *= 1024;
      unit = BytePipe.formats[unit].prev;
    }

    for (const key in BytePipe.formats) {
      const format = BytePipe.formats[key];
      if (bytes < format.max) {

        const prev = BytePipe.formats[format.prev];

        const result = prev ?
          toDecimal(bytes / prev.max, decimal) :
          toDecimal(bytes, decimal);

        return `${result} ${key}`;
      }
    }
  }
}