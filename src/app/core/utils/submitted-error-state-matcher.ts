import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class SubmittedErrorStateMatcher implements ErrorStateMatcher {
  constructor(private submitted: () => boolean) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = this.submitted();
    return !!(
      control &&
      control.invalid &&
      (control.touched || control.dirty || isSubmitted)
    );
  }
}
