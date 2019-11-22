import { AbstractControl } from '@angular/forms';

export function RequiredAgeValidator(control: AbstractControl) {
  if (parseInt(control.value) > 18) {
    return { RequiredAgeValid: true };
  }
  return {RequiredAgeValid: null};
}