import {Component, inject, input, output, signal} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, startWith, switchMap} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ArtistService} from '../../../services/artist-service';
import {Artist} from '../../../models/artist';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {EventService} from '../../../services/event-service';
import {SubmittedErrorStateMatcher} from '../../../core/utils/submitted-error-state-matcher';

@Component({
  selector: 'app-event-details-associate-artist',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule, 
    MatButton,
    MatIcon
  ],
  templateUrl: './event-details-associate-artist.html',
  styleUrl: './event-details-associate-artist.css'
})
export class EventDetailsAssociateArtist {
  //inputs
  eventId = input.required<string>();
  //signals
  selectedArtist = signal<Artist | undefined>(undefined)
  artists = signal<Artist[]>([]);
  //services
  private readonly eventService = inject(EventService);
  private readonly artistService = inject(ArtistService);
  //output
  onArtistAdded = output<Artist>();
  //utils variable
  submitted = false;
  submittedErrorStateMatcher = new SubmittedErrorStateMatcher(() => this.submitted);

  private artistAlreadyLinkedValidator = (
    artistsProvider: () => Artist[],
    eventIdProvider: () => string
  ): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const artistId = control.value as string | null;
      if (!artistId) return null;

      const list = artistsProvider();
      const evId = eventIdProvider();
      const artist = list.find(a => a.id === artistId);

      if (artist && artist.events?.some(e => e.id === evId)) {
        return { artistAlreadyLinked: true };
      }
      if (!artist) {
        return { ArtistIdInvalid: true };
      }
      return null;
    };
  };

  associateArtistForm = new FormGroup({
    artistId: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        this.artistAlreadyLinkedValidator(() => this.artists(), () => this.eventId())
      ]
    })
  });

  get artistIdControl() {
    return this.associateArtistForm.controls.artistId;
  }

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
    if (!artistId) return "";
    const artist = this.artists().find((a) => a.id === artistId);
    if (artist) {
      this.selectedArtist.set(artist);
    }
    return artist?.label || "";
  }

  onSubmit() {
    this.submitted = true;

    if (this.associateArtistForm.invalid) {
      this.associateArtistForm.markAllAsTouched();
      return;
    }

    if (this.associateArtistForm.valid && this.associateArtistForm.value.artistId) {
      this.eventService.associateArtisToAnEvent(
        this.eventId(), 
        this.associateArtistForm.value.artistId
      ).subscribe({
        next: data => {
          const artist = this.selectedArtist();
          if (artist) {
            this.onArtistAdded.emit(artist);
            // Réinitialiser le formulaire après succès
            this.associateArtistForm.reset();
            this.submitted = false;
          }
        },
        error: err => {
          console.error('Erreur lors de l\'association:', err);
        }
      });
    }
  }
}