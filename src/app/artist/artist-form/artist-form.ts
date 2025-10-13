import {Component, inject, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ArtistService} from '../services/artist-service';
import {ArtistWritingDto} from '../models/artist';
import {HttpErrorResponse} from '@angular/common/http';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {ArtistList} from '../artist-list/artist-list';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../event/event-form/event-form';
import {Router} from '@angular/router';
@Component({
  selector: 'app-artist-form',
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule, MatButton, FormsModule, ReactiveFormsModule, MatDialogTitle, MatDialogActions, MatDialogClose
  ],
  templateUrl: './artist-form.html',
  styleUrl: './artist-form.css'
})

export class ArtistForm {
    artistApi = inject(ArtistService);
    artistDto = signal<ArtistWritingDto>({label:""});
    readonly dialogRef = inject(MatDialogRef<ArtistList>);
    error = signal<HttpErrorResponse| undefined>(undefined)
    router = inject(Router)

    eventForm = new FormGroup(
      {
        label: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
      }
    )
    matcher = new MyErrorStateMatcher();
    onCreate(){
      if (this.eventForm.controls.label.value){
        this.artistDto.set({label: this.eventForm.controls.label.value})
        this.artistApi.create(this.artistDto()).subscribe(
          {
            next: artist => this.router.navigate(['/artists/' + artist.id]).then(
                  ()=> this.dialogRef.close()
                ),
            error: (error:HttpErrorResponse) => this.error.set(error)
          }
        )
      }
    }
    onCloseDialog() {
      this.dialogRef.close();
    }
}
