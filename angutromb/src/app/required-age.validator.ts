import { AbstractControl } from '@angular/forms';

export function RequiredAgeValidator(control: AbstractControl) {
  let currentYear = new Date().getFullYear();
  let birthYear = new Date(control.value).getFullYear();
  if ((currentYear - birthYear) < 18) {
    console.log((currentYear - birthYear));
    return { RequiredAgeNotValid: true };
  }
  return null;
}