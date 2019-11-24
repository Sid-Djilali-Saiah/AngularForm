import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let BirthYear = new Date(value).getFullYear();
    let BirthMonth = new Date(value).getMonth() + 1;
    let BirthDay = new Date(value).getDate();

    let CurrentYear = new Date().getFullYear();
    let CurrentMonth = new Date().getMonth() + 1;
    let CurrentDay = new Date().getDate();

    let month =[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (BirthDay > CurrentDay){
      CurrentMonth = CurrentMonth - 1
      CurrentDay = CurrentDay + month[BirthMonth-1]  
    } 

    if (BirthMonth > CurrentMonth){
      CurrentYear = CurrentYear - 1; 
      CurrentMonth = CurrentMonth + 12;
    }          
        
        
    // calculate date, month, year 
    let calculated_date = CurrentDay - BirthDay; 
    let calculated_month = CurrentMonth - BirthMonth; 
    let calculated_year = CurrentYear - BirthYear; 



    return calculated_year;
  }

}
