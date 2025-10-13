import {Component, inject, signal} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {ArtistService} from '../services/artist-service';
import {ArtistWritingDto} from '../models/artist';
import {HttpErrorResponse} from '@angular/common/http';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ArtistList} from '../artist-list/artist-list';
@Component({
  selector: 'app-artist-form',
  imports: [
    MatFormFieldModule, MatInputModule, MatIconModule, MatButton
  ],
  templateUrl: './artist-form.html',
  styleUrl: './artist-form.css'
})

export class ArtistForm {
    artistApi = inject(ArtistService);
    artistDto = signal<ArtistWritingDto>({label:""});
    readonly dialogRef = inject(MatDialogRef<ArtistList>);
    onCreate(artistDto: ArtistWritingDto){
      this.artistApi.create(artistDto).subscribe(
        {
          next: artist => console.log(artist),
          error: (error:HttpErrorResponse) => console.log(error)
        }
      )
    }

}
