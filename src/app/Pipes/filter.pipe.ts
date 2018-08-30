import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any, pf: number, pt: number): any[] {
    if (!items) return [];
    if (!filter) return items;
    let filterKeys = Object.keys(filter);
    var filteredItems = items.filter(item =>
      filterKeys.reduce((task, keyName) => 
          (task && 
            ((keyName === 'StartDate' || keyName === 'EndDate') ? 
            new RegExp(filter[keyName], 'gi').test(this.getDateString(new Date(item[keyName]))) :
            new RegExp(filter[keyName], 'gi').test(item[keyName]))) || filter[keyName] === "", true));
    if (pf && pt && !isNaN(pf) && !isNaN(pt)) {
      return filteredItems.filter(task =>
        task.Priority >= pf && task.Priority <= pt
      );
    } else if(pf && !isNaN(pf)) {
      return filteredItems.filter(task =>
        task.Priority >= pf
      );
    } else if(pt && !isNaN(pt)) {
      return filteredItems.filter(task =>
        task.Priority <= pt
      );
    }
    return filteredItems;
  }

  private getDateString(date: Date) : string {
    var dt = new Date(date);
    return (this.pad(date.getMonth() + 1)) + '/' + this.pad(date.getDate()) + '/' +  date.getFullYear();
  }

  private pad(s: number): string {
    return (s < 10) ? '0' + s.toString() : s.toString(); 
  }
}
