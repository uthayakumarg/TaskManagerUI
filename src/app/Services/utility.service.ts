import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getStringifiedDate(date: Date) : any {
    return (date.getFullYear() + '-' + this.pad(date.getMonth() + 1)) + '-' + this.pad(date.getDate()) + 'T00:00:00Z';
  }

  private pad(s: number): string {
    return (s < 10) ? '0' + s.toString() : s.toString(); 
  }
}
