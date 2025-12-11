import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  AbstractControl,
  ValidationErrors
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
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {EventList} from '../event-list/event-list';
import {MatSnackBar} from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

// Validateur personnalisé pour vérifier que la date est future
function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selectedDate = new Date(control.value);
  selectedDate.setHours(0, 0, 0, 0);
  
  return selectedDate < today ? { pastDate: true } : null;
}

// Validateur personnalisé pour vérifier que la date de fin est après la date de début
function dateRangeValidator(group: AbstractControl): ValidationErrors | null {
  const startDate = group.get('startDate')?.value;
  const endDate = group.get('endDate')?.value;
  
  if (!startDate || !endDate) {
    return null;
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return start > end ? { invalidDateRange: true } : null;
}

@Component({
  selector: 'app-event-form',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCard,
    MatButton
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './event-form.html',
  styleUrl: './event-form.css'
})
export class EventForm {
  eventApi = inject(EventService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);
  readonly dialogRef = inject(MatDialogRef<EventList>);
  data = inject(MAT_DIALOG_DATA);
  
  eventForm = new FormGroup(
    {
      label: new FormControl<string>(
        this.data?.eventDetails?.label || '', 
        [Validators.required, Validators.minLength(3)]
      ),
      startDate: new FormControl<Date>(
        this.data?.eventDetails?.startDate ? new Date(this.data.eventDetails.startDate) : new Date(),
        [Validators.required, futureDateValidator]
      ),
      endDate: new FormControl<Date>(
        this.data?.eventDetails?.endDate ? new Date(this.data.eventDetails.endDate) : new Date(),
        [Validators.required, futureDateValidator]
      ),
    },
    { validators: dateRangeValidator }
  );
  
  matcher = new MyErrorStateMatcher();
  submitting = signal(false);
  errorMessage = signal<string | null>(null);

  onCreateEvent() {
    // Marquer tous les champs comme touched pour afficher les erreurs
    this.eventForm.markAllAsTouched();
    
    if (this.eventForm.invalid) {
      this.showToast('Veuillez corriger les erreurs du formulaire', 'error');
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set(null);

    const eventData = new EventWritingDto(
      this.eventForm.value.label!,
      this.eventForm.value.startDate!,
      this.eventForm.value.endDate!
    );

    const isUpdate = this.data?.eventId;
    const operation = isUpdate
      ? this.eventApi.updateEvents(eventData, this.data.eventId)
      : this.eventApi.createEvents(eventData);

    operation.subscribe({
      next: (responseData) => {
        const message = isUpdate 
          ? 'Événement mis à jour avec succès !' 
          : 'Événement créé avec succès !';
        
        this.showToast(message, 'success');
        
        this.router.navigate(['events', responseData.id]).then(() => {
          this.dialogRef.close(responseData);
        });
        
        this.eventForm.reset();
        this.submitting.set(false);
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
        this.submitting.set(false);
      }
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = '';
    
    switch (error.status) {
      case 0:
        errorMsg = 'La connexion n\'a pas pu être établie avec le serveur';
        break;
      case 400:
        errorMsg = 'Données invalides. Veuillez vérifier le formulaire.';
        break;
      case 404:
        errorMsg = 'L\'événement n\'a pas été trouvé';
        break;
      case 409:
        errorMsg = 'Un événement avec ce nom existe déjà';
        break;
      case 500:
        errorMsg = 'Une erreur serveur s\'est produite';
        break;
      default:
        errorMsg = `Une erreur s'est produite (Code: ${error.status})`;
    }
    
    this.errorMessage.set(errorMsg);
    this.showToast(errorMsg, 'error');
  }

  private showToast(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Fermer', {
      duration: type === 'success' ? 3000 : 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? 'toast-success' : 'toast-error'
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}