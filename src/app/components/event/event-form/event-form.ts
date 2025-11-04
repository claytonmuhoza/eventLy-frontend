import {ChangeDetectionStrategy, Component, effect, inject, signal, SimpleChanges} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule, FormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {EventService} from '../../../services/event-service';
import {EventWritingDto} from '../../../models/event-writing-dto';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-event-form',
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatFormFieldModule, MatDatepickerModule, MatCard, MatButton],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-form.html',
  styleUrl: './event-form.css'
})
export class EventForm {
  eventApi = inject(EventService);
  router = inject(Router);
  eventForm = new FormGroup(
    {
      label: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      startDate: new FormControl<Date>(new Date(), [Validators.required]),
      endDate: new FormControl<Date>(new Date(), [Validators.required]),
    }
  )
  matcher = new MyErrorStateMatcher();
  submiting = signal(false);
  error = signal<HttpErrorResponse| undefined>(undefined);
  onCreateEvent(){
    this.submiting.set(true);
    if(this.eventForm.value.label && this.eventForm.value.startDate && this.eventForm.value.endDate){
      let eventData : EventWritingDto = new EventWritingDto(
        this.eventForm.value.label,
        this.eventForm.value.startDate,
        this.eventForm.value.endDate);
       console.log(eventData);
      this.eventApi.createEvents(eventData).subscribe(
        {
          next: eventData => {
            this.router.navigate(['events', eventData.id]);
            this.submiting.set(false);
          },
          error: (error : HttpErrorResponse) => {
            this.error.set(error);
            this.submiting.set(false);
          }
        }
      )
    }



  }
}
