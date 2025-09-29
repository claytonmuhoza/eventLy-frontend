import {Component, inject, input, signal} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ArtistService} from '../../artist/services/artist-service';
import {Artist} from '../../artist/models/artist';
import {MatButton} from '@angular/material/button';
import {EventService} from '../event-service';
@Component({
  selector: 'app-event-details-associate-artist',
  imports: [FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule, MatButton,
  ],
  templateUrl: './event-details-associate-artist.html',
  styleUrl: './event-details-associate-artist.css'
})
export class EventDetailsAssociateArtist {
  eventId = input.required<string>();
  eventService = inject(EventService);
  artistService = inject(ArtistService);
  artists = signal<Artist[]>([])
  associateArtistForm = new FormGroup({
    artistId: new FormControl('', Validators.required),
  })

  ngOnInit() {
    this.associateArtistForm.controls.artistId.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value =>
        this.artistService.listArtists(
          { page: 0, sort: ['label'], size: 5 },
          value || ""
        )
      )
    ).subscribe({
      next: data => {
        this.artists.set(data.content);
      },
      error: err => console.error(err)
    });
  }
  getTitle(artistId: string): string {
    return this.artists().find((artist) => artist.id ===artistId)?.label || "";
  }
  fetchAssociateArtistListener() {

  }
  onSubmit() {
    if(this.associateArtistForm.valid && this.associateArtistForm.value.artistId) {
      this.eventService.associateArtisToAnEvent(this.eventId(), this.associateArtistForm.value.artistId).subscribe(
        {
          next: data => {
            console.log(data);
            this.fetchAssociateArtistListener();
          },
          error: err => {
            console.log(err);
          }
        }
      )

    }
  }
}
