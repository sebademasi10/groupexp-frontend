import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatDate(date: Date) {
    return formatDate(date, 'YYYY/MM/dd', 'en_US')
  }
}
